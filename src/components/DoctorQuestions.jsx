import { useState } from 'react'

export default function DoctorQuestions({ questions }) {
  const [copied, setCopied] = useState(null) // index or 'all'

  function copyText(text, key) {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(key)
      setTimeout(() => setCopied(null), 1500)
    }).catch(() => {
      // fallback for older browsers
      const el = document.createElement('textarea')
      el.value = text
      document.body.appendChild(el)
      el.select()
      document.execCommand('copy')
      document.body.removeChild(el)
      setCopied(key)
      setTimeout(() => setCopied(null), 1500)
    })
  }

  function copyAll() {
    const text = questions.map((q, i) => `${i + 1}. ${q}`).join('\n')
    copyText(text, 'all')
  }

  return (
    <div>
      {/* 안내 문구 + 전체 복사 */}
      <div className="flex items-center justify-between mb-3">
        <p className="text-sm" style={{ color: '#5A6E44', lineHeight: 1.6 }}>
          수술 전 진료 시 아래 질문들을 의사에게 해보세요.
        </p>
        <button
          onClick={copyAll}
          className="flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-2xl text-xs font-semibold transition-all ml-3"
          style={{
            backgroundColor: copied === 'all' ? '#639922' : '#F4F9EF',
            color: copied === 'all' ? '#fff' : '#3B6D11',
            border: '1.5px solid #C4DBA0',
          }}
        >
          {copied === 'all' ? '✓ 복사됨' : '📋 전체 복사'}
        </button>
      </div>

      <ul className="space-y-2">
        {questions.map((q, i) => (
          <li
            key={i}
            className="flex items-start gap-3 p-3.5 rounded-2xl group"
            style={{ backgroundColor: '#F7FAF3', border: '1px solid #E0EDD0' }}
          >
            {/* 번호 */}
            <span
              className="flex-shrink-0 w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center mt-0.5"
              style={{ backgroundColor: '#3B6D11', color: '#fff' }}
            >
              {i + 1}
            </span>

            {/* 질문 텍스트 */}
            <span className="flex-1 text-base leading-relaxed" style={{ color: '#2D3A1F', lineHeight: 1.7 }}>
              {q}
            </span>

            {/* 개별 복사 버튼 */}
            <button
              onClick={() => copyText(q, i)}
              className="flex-shrink-0 mt-0.5 p-1.5 rounded-xl transition-all opacity-60 group-hover:opacity-100"
              style={{
                backgroundColor: copied === i ? '#639922' : 'transparent',
                color: copied === i ? '#fff' : '#8FA870',
              }}
              title="복사"
            >
              {copied === i ? (
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <rect x="9" y="9" width="13" height="13" rx="2" />
                  <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
                </svg>
              )}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
