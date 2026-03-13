/**
 * PreOp Buddy 마스코트 — 실제 캐릭터 이미지 사용
 */
export default function Buddy({ size = 160, className = '' }) {
  return (
    <img
      src="/buddy.png"
      alt="PreOp Buddy 캐릭터"
      width={size}
      height={size}
      className={className}
      style={{ objectFit: 'contain', mixBlendMode: 'multiply' }}
    />
  )
}

/**
 * 캐릭터 + 말풍선 내레이터
 */
export function BuddyNarrator({ message, accentStyle }) {
  const s = accentStyle || { bg: '#F4F9EF', border: '#C4DBA0', text: '#3B6D11' }

  return (
    <div className="flex items-end gap-3 px-5 pt-5 pb-0">
      <img
        src="/buddy.png"
        alt="버디"
        width={72}
        height={72}
        style={{ objectFit: 'contain', flexShrink: 0, mixBlendMode: 'multiply' }}
      />
      <div
        className="relative flex-1 rounded-3xl px-4 py-3.5"
        style={{ backgroundColor: s.bg, border: `1.5px solid ${s.border}` }}
      >
        <p className="text-sm font-medium" style={{ color: s.text, lineHeight: 1.7 }}>
          {message}
        </p>
        {/* 말풍선 꼬리 — 버블 왼쪽 하단에서 캐릭터 방향으로 */}
        <div
          className="absolute"
          style={{
            bottom: 10,
            left: -9,
            width: 16,
            height: 16,
            backgroundColor: s.bg,
            borderBottom: `1.5px solid ${s.border}`,
            borderLeft: `1.5px solid ${s.border}`,
            transform: 'rotate(45deg)',
            borderRadius: '0 0 0 3px',
          }}
        />
      </div>
    </div>
  )
}
