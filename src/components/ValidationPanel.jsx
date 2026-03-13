import { useState } from 'react'

/* ─────────────────────────────────────────
   VAS 불안도 슬라이더 (검색 전 → 결과 후 비교)
───────────────────────────────────────── */
export function VasBefore({ value, onChange }) {
  return (
    <div className="rounded-3xl p-5" style={{ backgroundColor: '#FDF6E8', border: '1px solid #F5D49A' }}>
      <div className="flex items-center gap-2 mb-3">
        <span className="text-lg">😰</span>
        <p className="text-sm font-semibold" style={{ color: '#8B5E0A' }}>
          지금 수술에 대해 얼마나 불안하신가요?
        </p>
      </div>
      <VasSlider value={value} onChange={onChange} color="#EF9F27" />
      <p className="text-xs text-center mt-2" style={{ color: '#B86E00' }}>
        정보를 확인한 후 다시 측정해서 변화를 확인해 드릴게요
      </p>
    </div>
  )
}

export function VasAfter({ before, value, onChange }) {
  const diff = before !== null && value !== null ? before - value : null

  return (
    <div className="space-y-4">
      <div className="rounded-2xl p-5" style={{ backgroundColor: '#F4F9EF', border: '1px solid #C4DBA0' }}>
        <div className="flex items-center gap-2 mb-3">
          <span className="text-lg">😌</span>
          <p className="text-sm font-semibold" style={{ color: '#3B6D11' }}>
            정보를 보고 나서 지금은 얼마나 불안하신가요?
          </p>
        </div>
        <VasSlider value={value} onChange={onChange} color="#639922" />
      </div>

      {/* 비교 결과 */}
      {diff !== null && value !== null && (
        <div className="rounded-2xl p-4 flex items-center gap-4"
          style={{
            backgroundColor: diff > 0 ? '#F4F9EF' : diff < 0 ? '#FEF3F0' : '#F5F5F5',
            border: `1px solid ${diff > 0 ? '#C4DBA0' : diff < 0 ? '#FECDBA' : '#E0E0E0'}`,
          }}>
          <span style={{ fontSize: 36 }}>{diff > 0 ? '🎉' : diff < 0 ? '😔' : '😐'}</span>
          <div>
            <p className="text-base font-semibold" style={{ color: diff > 0 ? '#3B6D11' : diff < 0 ? '#C2410C' : '#666' }}>
              {diff > 0
                ? `불안도가 ${diff}점 낮아졌어요!`
                : diff < 0
                ? `불안도가 ${Math.abs(diff)}점 높아졌어요`
                : '불안도 변화가 없어요'}
            </p>
            <p className="text-sm mt-0.5" style={{ color: '#8FA870' }}>
              {before}점 → {value}점
              {diff > 0 && ` (${Math.round((diff / before) * 100)}% 감소)`}
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

function VasSlider({ value, onChange, color }) {
  const labels = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10']
  return (
    <div>
      <div className="flex justify-between text-xs mb-1 px-1" style={{ color: '#8FA870' }}>
        <span>전혀 불안하지 않음</span>
        <span>매우 불안함</span>
      </div>
      <input
        type="range"
        min={0} max={10} step={1}
        value={value ?? 5}
        onChange={e => onChange(Number(e.target.value))}
        className="w-full"
        style={{ accentColor: color, height: 6, cursor: 'pointer' }}
      />
      <div className="flex justify-between text-xs mt-1 px-0.5" style={{ color: '#AAAAAA' }}>
        {labels.map(l => <span key={l}>{l}</span>)}
      </div>
      <p className="text-center text-2xl font-bold mt-2" style={{ color }}>
        {value ?? '—'}
        <span className="text-sm font-normal ml-1" style={{ color: '#8FA870' }}>/ 10</span>
      </p>
    </div>
  )
}

/* ─────────────────────────────────────────
   이해도 퀴즈
───────────────────────────────────────── */
export function QuizPanel({ quiz }) {
  // 각 문항별 선택한 답 인덱스 (null = 미선택)
  const [answers, setAnswers] = useState(Array(quiz.length).fill(null))
  const [submitted, setSubmitted] = useState(false)

  function select(qIdx, optIdx) {
    if (submitted) return
    setAnswers(prev => prev.map((a, i) => i === qIdx ? optIdx : a))
  }

  const allAnswered = answers.every(a => a !== null)
  const score = submitted
    ? answers.filter((a, i) => a === quiz[i].answer).length
    : null
  const pct = score !== null ? Math.round((score / quiz.length) * 100) : null

  return (
    <div className="space-y-4">
      {/* 안내 */}
      <p className="text-sm" style={{ color: '#5A6E44', lineHeight: 1.7 }}>
        수술 정보를 얼마나 이해하셨는지 확인해보세요. 부담 없이 풀어보세요 😊
      </p>

      {/* 문항 목록 */}
      {quiz.map((q, qi) => {
        const chosen = answers[qi]
        return (
          <div key={qi} className="rounded-2xl p-4" style={{ backgroundColor: '#F7FAF3', border: '1px solid #E0EDD0' }}>
            <p className="text-base font-semibold mb-3" style={{ color: '#2D3A1F', lineHeight: 1.6 }}>
              Q{qi + 1}. {q.question}
            </p>
            <ul className="space-y-2">
              {q.options.map((opt, oi) => {
                const isChosen  = chosen === oi
                const isCorrect = submitted && oi === q.answer
                const isWrong   = submitted && isChosen && oi !== q.answer

                let bg = '#fff', border = '#D4E8BF', color = '#2D3A1F'
                if (isCorrect)      { bg = '#F4F9EF'; border = '#639922'; color = '#2D5509' }
                else if (isWrong)   { bg = '#FFF0F0'; border = '#FECACA'; color = '#B91C1C' }
                else if (isChosen)  { bg = '#EAF3DE'; border = '#639922'; color = '#2D3A1F' }

                return (
                  <li key={oi}>
                    <button
                      onClick={() => select(qi, oi)}
                      className="w-full text-left px-4 py-3 rounded-xl text-base transition-all flex items-center gap-3"
                      style={{ backgroundColor: bg, border: `1.5px solid ${border}`, color }}
                    >
                      <span className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
                        style={{ backgroundColor: isChosen || isCorrect ? border : '#E8F5DC', color: isChosen || isCorrect ? '#fff' : '#639922' }}>
                        {oi + 1}
                      </span>
                      {opt}
                      {isCorrect && <span className="ml-auto text-sm">✓</span>}
                      {isWrong   && <span className="ml-auto text-sm">✗</span>}
                    </button>
                  </li>
                )
              })}
            </ul>
            {/* 해설 */}
            {submitted && (
              <p className="mt-3 text-sm px-1" style={{ color: '#5A6E44', lineHeight: 1.7 }}>
                💡 {q.explanation}
              </p>
            )}
          </div>
        )
      })}

      {/* 제출 버튼 / 결과 */}
      {!submitted ? (
        <button
          onClick={() => setSubmitted(true)}
          disabled={!allAnswered}
          className="w-full py-3.5 rounded-2xl text-base font-semibold transition-all"
          style={{
            backgroundColor: allAnswered ? '#3B6D11' : '#C4DBA0',
            color: '#fff',
            cursor: allAnswered ? 'pointer' : 'not-allowed',
          }}
        >
          {allAnswered ? '결과 확인하기' : `${answers.filter(a => a !== null).length} / ${quiz.length} 답변 완료`}
        </button>
      ) : (
        <div className="rounded-2xl p-5 text-center"
          style={{
            backgroundColor: pct >= 75 ? '#F4F9EF' : pct >= 50 ? '#FDF6E8' : '#FFF0F0',
            border: `1px solid ${pct >= 75 ? '#C4DBA0' : pct >= 50 ? '#F5D49A' : '#FECACA'}`,
          }}>
          <p className="text-3xl font-bold mb-1" style={{ color: pct >= 75 ? '#3B6D11' : pct >= 50 ? '#B86E00' : '#B91C1C' }}>
            {score} / {quiz.length}
          </p>
          <p className="text-base font-semibold mb-1" style={{ color: '#2D3A1F' }}>
            {pct >= 75 ? '훌륭해요! 수술을 잘 이해하셨어요 🎉'
              : pct >= 50 ? '잘 하셨어요! 다시 한번 읽어보면 더 좋아요 😊'
              : '괜찮아요! 앞의 내용을 다시 살펴보세요 💪'}
          </p>
          <p className="text-sm" style={{ color: '#8FA870' }}>정답률 {pct}%</p>
        </div>
      )}
    </div>
  )
}
