import { useState } from 'react'

function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

function splitByTerms(text, glossary) {
  if (!glossary?.length || !text) return [{ type: 'text', content: text }]
  const sorted = [...glossary].sort((a, b) => b.term.length - a.term.length)
  const pattern = new RegExp(`(${sorted.map(g => escapeRegex(g.term)).join('|')})`, 'g')
  return text.split(pattern)
    .filter(s => s)
    .map(part => ({
      type: sorted.some(g => g.term === part) ? 'term' : 'text',
      content: part,
    }))
}

export default function MedicalText({ text, glossary, className, style }) {
  const [activeIdx, setActiveIdx] = useState(null)

  const parts = splitByTerms(text, glossary)
  const hasTerms = parts.some(p => p.type === 'term')

  if (!hasTerms) {
    return <span className={className} style={style}>{text}</span>
  }

  const seenTerms = new Set()

  return (
    <span className={className} style={style}>
      {parts.map((part, i) => {
        if (part.type === 'text') return <span key={i}>{part.content}</span>

        // 이미 등장한 단어는 일반 텍스트로 렌더링
        if (seenTerms.has(part.content)) {
          return <span key={i}>{part.content}</span>
        }
        seenTerms.add(part.content)

        const entry = glossary.find(g => g.term === part.content)
        const isOpen = activeIdx === i

        return (
          <span key={i} style={{ position: 'relative', display: 'inline' }}>
            <button
              onClick={() => setActiveIdx(isOpen ? null : i)}
              style={{
                borderBottom: '2px dotted #639922',
                color: '#2D5509',
                fontWeight: 600,
                cursor: 'pointer',
                background: isOpen ? '#EAF3DE' : 'none',
                borderRadius: 3,
                padding: '0 2px',
                fontSize: 'inherit',
                lineHeight: 'inherit',
              }}
            >
              {part.content}
            </button>
            {isOpen && entry && (
              <span
                onClick={() => setActiveIdx(null)}
                style={{
                  position: 'absolute',
                  bottom: 'calc(100% + 6px)',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  backgroundColor: '#2D3A1F',
                  color: '#fff',
                  padding: '7px 11px',
                  borderRadius: 10,
                  fontSize: 13,
                  lineHeight: 1.5,
                  whiteSpace: 'normal',
                  width: 180,
                  zIndex: 50,
                  boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                  cursor: 'pointer',
                  display: 'block',
                  textAlign: 'left',
                }}
              >
                <span style={{ display: 'block', fontWeight: 700, marginBottom: 2, color: '#A8D878' }}>
                  {entry.term}
                </span>
                {entry.explanation}
                {/* 툴팁 꼬리 */}
                <span style={{
                  position: 'absolute',
                  top: '100%',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: 0,
                  height: 0,
                  borderLeft: '6px solid transparent',
                  borderRight: '6px solid transparent',
                  borderTop: '6px solid #2D3A1F',
                }} />
              </span>
            )}
          </span>
        )
      })}
    </span>
  )
}
