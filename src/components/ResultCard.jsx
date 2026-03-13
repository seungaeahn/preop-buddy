import { useState } from 'react'
import Checklist from './Checklist'
import { BuddyNarrator } from './Buddy'

export default function ResultCard({ result }) {
  const { surgeryName, overview, process, preparation, recovery, faq, disclaimer } = result

  return (
    <div className="space-y-4">

      {/* 수술명 배너 */}
      <div className="rounded-3xl px-6 py-5 relative overflow-hidden flex items-end justify-between gap-4"
        style={{ backgroundColor: '#3B6D11', color: '#fff' }}>
        <div className="absolute -right-6 -top-6 w-36 h-36 rounded-full opacity-10"
          style={{ backgroundColor: '#fff' }} />
        <div>
          <p className="text-sm font-semibold mb-1" style={{ color: '#A8D878' }}>AI 수술 안내</p>
          <h2 className="text-2xl font-medium">{surgeryName}</h2>
          <p className="text-sm mt-2" style={{ color: '#C8E8A8', lineHeight: 1.8 }}>
            아래에서 자세한 내용을 확인해보세요
          </p>
        </div>
        <img
          src="/buddy.png"
          alt=""
          aria-hidden="true"
          style={{ width: 100, height: 100, objectFit: 'contain', flexShrink: 0 }}
        />
      </div>

      {/* 수술 개요 */}
      <NarratorCard
        message={`${surgeryName}이 어떤 수술인지 쉽게 설명해 드릴게요! 걱정 마세요 😊`}
        expression="smile" icon="📋" title="수술 개요" accent="green"
      >
        <p className="text-base leading-relaxed" style={{ color: '#3D4D2A', lineHeight: 1.8 }}>{overview}</p>
      </NarratorCard>

      {/* 수술 과정 */}
      {process?.length > 0 && (
        <NarratorCard
          message="수술이 어떻게 진행되는지 순서대로 알려드릴게요. 한 단계씩 살펴봐요!"
          expression="wink" icon="🔬" title="수술 과정" accent="amber"
        >
          <ol className="relative">
            {process.map(({ step, title, description }, idx) => {
              const isLast = idx === process.length - 1
              return (
                <li key={step} className="flex gap-4 relative">
                  {/* 타임라인 선 + 번호 */}
                  <div className="flex flex-col items-center flex-shrink-0" style={{ width: 32 }}>
                    <div
                      className="w-8 h-8 rounded-full text-sm font-bold flex items-center justify-center z-10 flex-shrink-0"
                      style={{ backgroundColor: '#EF9F27', color: '#fff', boxShadow: '0 0 0 4px #FDF6E8' }}
                    >
                      {step}
                    </div>
                    {!isLast && (
                      <div className="flex-1 w-0.5 my-1" style={{ backgroundColor: '#F5D49A', minHeight: 24 }} />
                    )}
                  </div>
                  {/* 내용 */}
                  <div className={`flex-1 rounded-2xl p-4 ${isLast ? 'mb-0' : 'mb-2'}`}
                    style={{ backgroundColor: '#FFFBF3', border: '1px solid #F5E4B0' }}>
                    <p className="text-sm font-bold mb-1" style={{ color: '#B86E00' }}>STEP {step}</p>
                    <p className="text-base font-semibold" style={{ color: '#2D3A1F' }}>{title}</p>
                    <p className="text-sm mt-1.5" style={{ color: '#6B5B35', lineHeight: 1.8 }}>{description}</p>
                  </div>
                </li>
              )
            })}
          </ol>
        </NarratorCard>
      )}

      {/* 수술 전 준비사항 */}
      {preparation?.length > 0 && (
        <NarratorCard
          message="수술 전에 이것들을 미리 준비해두면 훨씬 마음이 편해요! 하나씩 체크해봐요 ✅"
          expression="cheer" icon="✅" title="수술 전 준비사항" accent="green"
        >
          <Checklist items={preparation} />
        </NarratorCard>
      )}

      {/* 회복 과정 */}
      {recovery && (
        <NarratorCard
          message="수술 후 회복 과정이에요. 잘 쉬시면 생각보다 금방 나아지실 거예요 💪"
          expression="smile" icon="🌿" title="회복 과정" accent="green"
        >
          <div className="flex gap-3 mb-5">
            {recovery.hospitalDays && <RecoveryBadge label="입원 기간" value={recovery.hospitalDays} />}
            {recovery.returnToDaily && <RecoveryBadge label="일상 복귀" value={recovery.returnToDaily} />}
            {recovery.fullRecovery && <RecoveryBadge label="완전 회복" value={recovery.fullRecovery} />}
          </div>
          {recovery.precautions?.length > 0 && (
            <ul className="space-y-3">
              {recovery.precautions.map((p, i) => (
                <li key={i} className="flex items-start gap-2.5 text-base" style={{ color: '#3D4D2A', lineHeight: 1.8 }}>
                  <span className="mt-2.5 w-1.5 h-1.5 rounded-full flex-shrink-0"
                    style={{ backgroundColor: '#639922' }} />
                  {p}
                </li>
              ))}
            </ul>
          )}
        </NarratorCard>
      )}

      {/* FAQ */}
      {faq?.length > 0 && (
        <NarratorCard
          message="많은 분들이 궁금해하시는 질문들을 모아봤어요! 클릭해서 답변을 확인해보세요."
          expression="wink" icon="💬" title="자주 묻는 질문" accent="amber"
        >
          <FaqList items={faq} />
        </NarratorCard>
      )}

      {/* 면책 조항 */}
      <div className="rounded-3xl p-5 flex items-start gap-3"
        style={{ backgroundColor: '#F1EFE8', border: '1px solid #E0DCCC' }}>
        <span className="text-xl flex-shrink-0 mt-0.5">📌</span>
        <div>
          <p className="text-sm font-semibold mb-1" style={{ color: '#5A5040' }}>꼭 확인해주세요</p>
          <p className="text-sm leading-relaxed" style={{ color: '#7A7060', lineHeight: 1.8 }}>
            {disclaimer || '이 정보는 일반적인 참고 자료이며 의학적 조언을 대체하지 않습니다. 반드시 담당 의료진과 상담하세요.'}
          </p>
        </div>
      </div>

      {/* 마무리 응원 */}
      <NarratorCard
        message="끝까지 읽어주셨군요! 정말 잘 하셨어요. 수술 잘 되실 거예요, 항상 응원할게요! 🌿"
        expression="cheer" accent="green" noBorder
      />
    </div>
  )
}

/* ── 서브 컴포넌트 ── */

const ACCENT = {
  green: {
    headerBg: '#F4F9EF', headerColor: '#3B6D11', headerBorder: '#D4E8BF',
    bubble: { bg: '#F4F9EF', border: '#C4DBA0', text: '#3B6D11' },
  },
  amber: {
    headerBg: '#FDF6E8', headerColor: '#8B5E0A', headerBorder: '#F5D49A',
    bubble: { bg: '#FDF6E8', border: '#F5D49A', text: '#8B5E0A' },
  },
}

function NarratorCard({ message, expression, icon, title, accent = 'green', children, noBorder }) {
  const a = ACCENT[accent] || ACCENT.green

  return (
    <div className="rounded-3xl overflow-hidden"
      style={noBorder ? {} : { backgroundColor: '#fff', border: '1px solid #D4E8BF' }}>
      {/* 버디 말풍선 */}
      <BuddyNarrator message={message} expression={expression} accentStyle={a.bubble} />

      {/* 섹션 제목 */}
      {title && (
        <div className="flex items-center gap-2 mx-5 mt-3 px-4 py-2.5 rounded-2xl"
          style={{ backgroundColor: a.headerBg, border: `1px solid ${a.headerBorder}` }}>
          <span className="text-base">{icon}</span>
          <h3 className="text-sm font-semibold" style={{ color: a.headerColor }}>{title}</h3>
        </div>
      )}

      {children && <div className="px-5 pb-6 pt-4">{children}</div>}
    </div>
  )
}

function RecoveryBadge({ label, value }) {
  return (
    <div className="flex-1 rounded-2xl p-4 text-center"
      style={{ backgroundColor: '#F4F9EF', border: '1px solid #D4E8BF' }}>
      <p className="text-xs font-semibold mb-1" style={{ color: '#639922' }}>{label}</p>
      <p className="text-sm font-semibold leading-snug" style={{ color: '#2D3A1F' }}>{value}</p>
    </div>
  )
}

function FaqList({ items }) {
  const [open, setOpen] = useState(null)

  return (
    <ul className="space-y-2">
      {items.map(({ question, answer }, i) => (
        <li key={question} className="rounded-2xl overflow-hidden"
          style={{ border: '1px solid #EDE8D8' }}>
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="w-full text-left px-4 py-4 flex items-start justify-between gap-3 transition-colors"
            style={{ backgroundColor: open === i ? '#FDF6E8' : '#fff' }}
          >
            <span className="text-base font-medium" style={{ color: '#2D3A1F', lineHeight: 1.6 }}>
              Q. {question}
            </span>
            <span className="flex-shrink-0 text-sm transition-transform duration-200"
              style={{ color: '#8FA870', transform: open === i ? 'rotate(180deg)' : 'rotate(0)' }}>▼</span>
          </button>
          {open === i && (
            <div className="px-4 pb-4 pt-2 text-base leading-relaxed"
              style={{ color: '#5A6E44', backgroundColor: '#FDFBF5', borderTop: '1px solid #EDE8D8', lineHeight: 1.8 }}>
              {answer}
            </div>
          )}
        </li>
      ))}
    </ul>
  )
}
