import { useState, useMemo, useRef, useEffect } from 'react'
import Checklist from './Checklist'
import { BuddyNarrator } from './Buddy'
import OverviewIllustration from './OverviewIllustration'
import MedicalText from './MedicalText'
import DdayPlanner from './DdayPlanner'

export default function ResultCard({ result }) {
  const [currentIdx, setCurrentIdx]     = useState(0)
  const [animKey, setAnimKey]           = useState(0)
  const [direction, setDirection]       = useState('next')
  const [surgeryDate, setSurgeryDate]   = useState(null)

  const { surgeryName, overview, process, preparation, preparationTimeline, recovery, faq, disclaimer } = result

  const glossary = useMemo(() =>
    Array.isArray(result.glossary)
      ? result.glossary.filter((g, i, arr) => arr.findIndex(x => x.term === g.term) === i)
      : []
  , [result.glossary])

  const sections = useMemo(() => {
    const s = [
      { id: 'overview',     icon: '📋', label: '수술 개요',      accent: 'green', expression: 'smile',
        message: `${surgeryName}이 어떤 수술인지 쉽게 설명해 드릴게요! 걱정 마세요 😊` },
    ]
    if (process?.length > 0)
      s.push({ id: 'process', icon: '🔬', label: '수술 과정', accent: 'amber', expression: 'wink',
        message: '수술이 어떻게 진행되는지 순서대로 알려드릴게요. 한 단계씩 살펴봐요!' })
    if (preparationTimeline?.length > 0)
      s.push({ id: 'dday', icon: '📅', label: 'D-day 플래너', accent: 'amber', expression: 'cheer',
        message: '수술 날짜를 입력하면 D-day와 날짜별 준비 일정을 알려드릴게요! 📅' })
    if (preparation?.length > 0)
      s.push({ id: 'preparation', icon: '✅', label: '수술 전 준비사항', accent: 'green', expression: 'cheer',
        message: '수술 전에 이것들을 미리 준비해두면 훨씬 마음이 편해요! 하나씩 체크해봐요 ✅' })
    if (recovery)
      s.push({ id: 'recovery', icon: '🌿', label: '회복 과정', accent: 'green', expression: 'smile',
        message: '수술 후 회복 과정이에요. 잘 쉬시면 생각보다 금방 나아지실 거예요 💪' })
    if (faq?.length > 0)
      s.push({ id: 'faq', icon: '💬', label: '자주 묻는 질문', accent: 'amber', expression: 'wink',
        message: '많은 분들이 궁금해하시는 질문들을 모아봤어요! 클릭해서 답변을 확인해보세요.' })
    if (glossary?.length > 0)
      s.push({ id: 'glossary', icon: '📖', label: '용어 사전', accent: 'green', expression: 'smile',
        message: '어려운 의학 용어를 쉽게 설명해 드릴게요!' })
    return s
  }, [surgeryName, process, preparationTimeline, preparation, recovery, faq, glossary])

  function navigate(dir) {
    const next = currentIdx + dir
    if (next < 0 || next >= sections.length) return
    setDirection(dir > 0 ? 'next' : 'prev')
    setAnimKey(k => k + 1)
    setCurrentIdx(next)
  }

  function goTo(i) {
    if (i === currentIdx) return
    setDirection(i > currentIdx ? 'next' : 'prev')
    setAnimKey(k => k + 1)
    setCurrentIdx(i)
  }

  const section = sections[currentIdx]
  const isFirst = currentIdx === 0
  const isLast  = currentIdx === sections.length - 1

  function renderContent(id) {
    switch (id) {
      case 'overview':
        return (
          <>
            <OverviewIllustration surgeryName={surgeryName} />
            <MedicalText text={overview} glossary={glossary}
              className="text-base leading-relaxed mt-4 block"
              style={{ color: '#3D4D2A', lineHeight: 1.8 }} />
          </>
        )
      case 'process':
        return (
          <ol>
            {process.map(({ step, title, description }, idx) => {
              const isLastStep = idx === process.length - 1
              return (
                <li key={step} className="flex gap-4">
                  <div className="flex flex-col items-center flex-shrink-0" style={{ width: 32 }}>
                    <div className="w-8 h-8 rounded-full text-sm font-bold flex items-center justify-center z-10"
                      style={{ backgroundColor: '#EF9F27', color: '#fff', boxShadow: '0 0 0 4px #FDF6E8' }}>
                      {step}
                    </div>
                    {!isLastStep && <div className="flex-1 w-0.5 my-1" style={{ backgroundColor: '#F5D49A', minHeight: 24 }} />}
                  </div>
                  <div className={`flex-1 rounded-2xl p-4 ${isLastStep ? 'mb-0' : 'mb-2'}`}
                    style={{ backgroundColor: '#FFFBF3', border: '1px solid #F5E4B0' }}>
                    <p className="text-sm font-bold mb-1" style={{ color: '#B86E00' }}>STEP {step}</p>
                    <p className="text-base font-semibold" style={{ color: '#2D3A1F' }}>{title}</p>
                    <MedicalText text={description} glossary={glossary}
                      className="text-sm mt-1.5 block"
                      style={{ color: '#6B5B35', lineHeight: 1.8 }} />
                  </div>
                </li>
              )
            })}
          </ol>
        )
      case 'dday':
        return <DdayPlanner timeline={preparationTimeline} surgeryDate={surgeryDate} onDateChange={setSurgeryDate} />
      case 'preparation':
        return <Checklist items={preparation} />
      case 'recovery':
        return (
          <>
            <div className="flex gap-3 mb-5">
              {recovery.hospitalDays && <RecoveryBadge label="입원 기간" value={recovery.hospitalDays} />}
              {recovery.returnToDaily && <RecoveryBadge label="일상 복귀" value={recovery.returnToDaily} />}
              {recovery.fullRecovery  && <RecoveryBadge label="완전 회복" value={recovery.fullRecovery} />}
            </div>
            {recovery.precautions?.length > 0 && (
              <ul className="space-y-3">
                {recovery.precautions.map((p, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-base" style={{ color: '#3D4D2A', lineHeight: 1.8 }}>
                    <span className="mt-2.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: '#639922' }} />
                    {p}
                  </li>
                ))}
              </ul>
            )}
          </>
        )
      case 'faq':
        return <FaqList items={faq} />
      case 'glossary':
        return (
          <ul className="space-y-3">
            {glossary.map(({ term, explanation }) => (
              <li key={term} className="flex gap-2 text-base" style={{ lineHeight: 1.7 }}>
                <span className="font-bold flex-shrink-0" style={{ color: '#2D5509' }}>{term}</span>
                <span style={{ color: '#5A6E44' }}>— {explanation}</span>
              </li>
            ))}
          </ul>
        )
      default:
        return null
    }
  }

  return (
    <div className="space-y-4">

      {/* 수술명 배너 */}
      <div className="rounded-3xl px-6 py-5 relative overflow-hidden flex items-end justify-between gap-4"
        style={{ backgroundColor: '#3B6D11', color: '#fff' }}>
        <div className="absolute -right-6 -top-6 w-36 h-36 rounded-full opacity-10" style={{ backgroundColor: '#fff' }} />
        <div>
          <p className="text-sm font-semibold mb-1" style={{ color: '#A8D878' }}>AI 수술 안내</p>
          <h2 className="text-2xl font-medium">{surgeryName}</h2>
          <p className="text-sm mt-1" style={{ color: '#C8E8A8' }}>
            {currentIdx + 1} / {sections.length} — {section.label}
          </p>
        </div>
        <img src="/buddy.png" alt="" aria-hidden="true"
          style={{ width: 80, height: 80, objectFit: 'contain', flexShrink: 0 }} />
      </div>

      {/* 섹션 인디케이터 */}
      <div className="flex items-center justify-center gap-1.5 no-print">
        {sections.map((s, i) => (
          <button
            key={s.id}
            onClick={() => goTo(i)}
            style={{
              width: i === currentIdx ? 22 : 8,
              height: 8,
              borderRadius: 4,
              backgroundColor: i === currentIdx ? '#3B6D11' : '#C4DBA0',
              transition: 'all 0.3s ease',
            }}
            title={s.label}
          />
        ))}
      </div>

      {/* 섹션 카드 */}
      <div key={animKey} className={direction === 'next' ? 'animate-slide-next' : 'animate-slide-prev'}>
        <NarratorCard
          message={section.message}
          expression={section.expression}
          icon={section.icon}
          title={section.label}
          accent={section.accent}
        >
          {renderContent(section.id)}
        </NarratorCard>
      </div>

      {/* 이전 / 다음 네비게이션 */}
      <div className="flex items-center gap-3 no-print">
        <button
          onClick={() => navigate(-1)}
          disabled={isFirst}
          className="flex items-center justify-center rounded-2xl text-lg font-bold transition-all"
          style={{
            width: 52, height: 52,
            backgroundColor: isFirst ? '#F5F5F5' : '#fff',
            border: `1.5px solid ${isFirst ? '#E8E8E8' : '#C4DBA0'}`,
            color: isFirst ? '#CCCCCC' : '#3B6D11',
          }}
        >
          ←
        </button>

        <div className="flex-1 text-center">
          <p className="text-sm font-semibold" style={{ color: '#2D3A1F' }}>{section.label}</p>
          <p className="text-xs mt-0.5" style={{ color: '#8FA870' }}>{currentIdx + 1} / {sections.length}</p>
        </div>

        <button
          onClick={() => navigate(1)}
          disabled={isLast}
          className="flex items-center justify-center rounded-2xl text-lg font-bold transition-all"
          style={{
            width: 52, height: 52,
            backgroundColor: isLast ? '#F5F5F5' : '#3B6D11',
            border: `1.5px solid ${isLast ? '#E8E8E8' : '#3B6D11'}`,
            color: isLast ? '#CCCCCC' : '#fff',
          }}
        >
          →
        </button>
      </div>

      {/* 마지막 섹션: 면책 + 인쇄 */}
      {isLast && (
        <>
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
          <button
            onClick={() => window.print()}
            className="no-print w-full py-4 rounded-3xl text-base font-semibold flex items-center justify-center gap-2 transition-all shadow-sm"
            style={{ backgroundColor: '#3B6D11', color: '#fff' }}
            onMouseEnter={e => e.currentTarget.style.backgroundColor = '#2D5509'}
            onMouseLeave={e => e.currentTarget.style.backgroundColor = '#3B6D11'}
          >
            🖨️ 인쇄 / PDF 저장
          </button>
        </>
      )}
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

function NarratorCard({ message, expression, icon, title, accent = 'green', children }) {
  const a = ACCENT[accent] || ACCENT.green
  return (
    <div className="rounded-3xl"
      style={{ backgroundColor: '#fff', border: '1px solid #D4E8BF' }}>
      <BuddyNarrator message={message} expression={expression} accentStyle={a.bubble} />
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

function FaqItem({ question, answer, isOpen, onToggle }) {
  const bodyRef = useRef(null)
  const [height, setHeight] = useState(0)

  useEffect(() => {
    if (bodyRef.current) setHeight(isOpen ? bodyRef.current.scrollHeight : 0)
  }, [isOpen])

  return (
    <li className="rounded-2xl overflow-hidden" style={{ border: '1px solid #EDE8D8' }}>
      <button
        onClick={onToggle}
        className="w-full text-left px-4 py-4 flex items-start justify-between gap-3 transition-colors"
        style={{ backgroundColor: isOpen ? '#FDF6E8' : '#fff' }}
      >
        <span className="text-base font-medium" style={{ color: '#2D3A1F', lineHeight: 1.6 }}>
          Q. {question}
        </span>
        <span className="flex-shrink-0 text-sm"
          style={{ color: '#8FA870', transform: isOpen ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.25s ease' }}>▼</span>
      </button>
      <div ref={bodyRef} style={{ maxHeight: height, overflow: 'hidden', transition: 'max-height 0.3s ease' }}>
        <div className="px-4 pb-4 pt-2 text-base leading-relaxed"
          style={{ color: '#5A6E44', backgroundColor: '#FDFBF5', borderTop: '1px solid #EDE8D8', lineHeight: 1.8 }}>
          {answer}
        </div>
      </div>
    </li>
  )
}

function FaqList({ items }) {
  const [open, setOpen] = useState(null)
  return (
    <ul className="space-y-2">
      {items.map(({ question, answer }, i) => (
        <FaqItem key={question} question={question} answer={answer}
          isOpen={open === i} onToggle={() => setOpen(open === i ? null : i)} />
      ))}
    </ul>
  )
}
