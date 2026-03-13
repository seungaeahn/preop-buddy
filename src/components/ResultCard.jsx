import Checklist from './Checklist'

export default function ResultCard({ result }) {
  const { surgeryName, overview, process, preparation, recovery, faq, disclaimer } = result

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-gray-900">{surgeryName} 정보</h2>

      {/* 수술 개요 */}
      <Section title="📋 수술 개요">
        <p className="text-base text-gray-700 leading-relaxed">{overview}</p>
      </Section>

      {/* 수술 과정 */}
      {process?.length > 0 && (
        <Section title="🔬 수술 과정">
          <ol className="space-y-3">
            {process.map(({ step, title, description }) => (
              <li key={step} className="flex gap-3">
                <span className="flex-shrink-0 w-7 h-7 rounded-full bg-blue-100 text-blue-700 text-sm font-bold flex items-center justify-center">
                  {step}
                </span>
                <div>
                  <p className="text-base font-medium text-gray-800">{title}</p>
                  <p className="text-base text-gray-600 mt-0.5">{description}</p>
                </div>
              </li>
            ))}
          </ol>
        </Section>
      )}

      {/* 수술 전 준비사항 */}
      {preparation?.length > 0 && (
        <Section>
          <Checklist items={preparation} />
        </Section>
      )}

      {/* 회복 과정 */}
      {recovery && (
        <Section title="🏥 회복 과정">
          <div className="space-y-2">
            <p className="text-base text-gray-700">
              <span className="font-medium">입원 기간:</span> {recovery.hospitalDays}
            </p>
            <p className="text-base text-gray-700">
              <span className="font-medium">일상 복귀:</span> {recovery.returnToDaily}
            </p>
            {recovery.precautions?.length > 0 && (
              <ul className="mt-2 space-y-1 list-disc list-inside">
                {recovery.precautions.map((p, i) => (
                  <li key={i} className="text-base text-gray-700">{p}</li>
                ))}
              </ul>
            )}
          </div>
        </Section>
      )}

      {/* FAQ */}
      {faq?.length > 0 && (
        <Section title="❓ 자주 묻는 질문">
          <div className="space-y-4">
            {faq.map(({ question, answer }, i) => (
              <div key={i}>
                <p className="text-base font-medium text-gray-800">Q. {question}</p>
                <p className="text-base text-gray-600 mt-1">A. {answer}</p>
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* 면책 조항 */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 text-sm text-yellow-800">
        ⚠️ {disclaimer || '이 정보는 일반적인 참고 자료이며 의학적 조언을 대체하지 않습니다. 반드시 담당 의료진과 상담하세요.'}
      </div>
    </div>
  )
}

function Section({ title, children }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      {title && <h3 className="text-lg font-semibold text-gray-900 mb-3">{title}</h3>}
      {children}
    </div>
  )
}
