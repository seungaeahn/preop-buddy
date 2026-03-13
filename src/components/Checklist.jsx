import { useState, useMemo, useEffect, useRef } from 'react'

const CONFETTI_COLORS = ['#639922', '#EF9F27', '#A8D878', '#F5D49A', '#3B6D11', '#FAEEDA']

function generateConfetti(count = 24) {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
    size: 6 + Math.random() * 6,
    delay: `${Math.random() * 0.5}s`,
    duration: `${0.8 + Math.random() * 0.6}s`,
  }))
}

const CATEGORY_STYLES = {
  '식이':  { bg: '#FFF7E6', color: '#B86E00' },
  '약물':  { bg: '#F0F7E6', color: '#3B6D11' },
  '준비물':{ bg: '#FDF4E7', color: '#9B6000' },
  '기타':  { bg: '#F1EFE8', color: '#6B6558' },
}

export default function Checklist({ items }) {
  const [checked, setChecked] = useState({})
  const [showConfetti, setShowConfetti] = useState(false)
  const prevDoneRef = useRef(0)
  const confetti = useMemo(() => generateConfetti(24), [])

  function toggle(i) {
    setChecked(prev => ({ ...prev, [i]: !prev[i] }))
  }

  const doneCount = Object.values(checked).filter(Boolean).length
  const progress = items.length > 0 ? Math.round((doneCount / items.length) * 100) : 0
  const allDone = doneCount === items.length && items.length > 0

  useEffect(() => {
    if (allDone && prevDoneRef.current < items.length) {
      setShowConfetti(true)
      const t = setTimeout(() => setShowConfetti(false), 1400)
      return () => clearTimeout(t)
    }
    prevDoneRef.current = doneCount
  }, [allDone, doneCount, items.length])

  return (
    <div className="relative overflow-hidden">
      {/* 컨페티 */}
      {showConfetti && confetti.map(p => (
        <div
          key={p.id}
          style={{
            position: 'absolute',
            top: 0,
            left: p.left,
            width: p.size,
            height: p.size,
            borderRadius: p.id % 3 === 0 ? '50%' : 2,
            backgroundColor: p.color,
            animation: `confettiFall ${p.duration} ${p.delay} ease-in forwards`,
            pointerEvents: 'none',
            zIndex: 10,
          }}
        />
      ))}

      {/* 진행률 */}
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-semibold" style={{ color: '#3B6D11' }}>
          {doneCount === items.length && doneCount > 0 ? '모두 완료했어요! 🎉' : `${doneCount} / ${items.length} 완료`}
        </span>
        <span className="text-sm" style={{ color: '#8FA870' }}>{progress}%</span>
      </div>
      <div className="w-full h-2 rounded-full mb-4" style={{ backgroundColor: '#D4E8BF' }}>
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{ width: `${progress}%`, backgroundColor: '#639922' }}
        />
      </div>

      {/* 목록 */}
      <ul className="space-y-2">
        {items.map((item, i) => (
          <li key={`${item.item}-${item.category}`}>
            <div
              role="checkbox"
              aria-checked={!!checked[i]}
              onClick={() => toggle(i)}
              className="flex items-start gap-3 cursor-pointer p-3 rounded-2xl transition-colors"
              style={{ backgroundColor: checked[i] ? '#F4F9EF' : 'transparent' }}
              onMouseEnter={e => { if (!checked[i]) e.currentTarget.style.backgroundColor = '#F7FAF3' }}
              onMouseLeave={e => { if (!checked[i]) e.currentTarget.style.backgroundColor = 'transparent' }}
            >
              {/* 커스텀 체크박스 */}
              <div
                className="mt-0.5 w-5 h-5 rounded-lg flex-shrink-0 flex items-center justify-center transition-all"
                style={{
                  backgroundColor: checked[i] ? '#639922' : '#fff',
                  border: `2px solid ${checked[i] ? '#639922' : '#C4DBA0'}`,
                }}
              >
                {checked[i] && (
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>
              <div className="flex-1 flex items-start justify-between gap-2">
                <span className="text-base leading-relaxed transition-colors"
                  style={{ color: checked[i] ? '#8FA870' : '#2D3A1F', textDecoration: checked[i] ? 'line-through' : 'none' }}>
                  {item.item}
                </span>
                {item.category && (() => {
                  const s = CATEGORY_STYLES[item.category] || CATEGORY_STYLES['기타']
                  return (
                    <span className="flex-shrink-0 text-xs font-semibold px-2.5 py-1 rounded-full"
                      style={{ backgroundColor: s.bg, color: s.color }}>
                      {item.category}
                    </span>
                  )
                })()}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
