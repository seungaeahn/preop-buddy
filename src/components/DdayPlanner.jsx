const DDAY_COLORS = {
  'D-14': { bg: '#F4F9EF', border: '#C4DBA0', dot: '#8FA870', label: '#639922' },
  'D-7':  { bg: '#FDF6E8', border: '#F5D49A', dot: '#EF9F27', label: '#B86E00' },
  'D-3':  { bg: '#FEF3F0', border: '#FECDBA', dot: '#F97316', label: '#C2410C' },
  'D-1':  { bg: '#FFF0F0', border: '#FECACA', dot: '#EF4444', label: '#B91C1C' },
  'D-0':  { bg: '#EAF3DE', border: '#A8D878', dot: '#3B6D11', label: '#2D5509' },
}

function getDaysInMonth(year, month) {
  return new Date(year, month, 0).getDate()
}

function getDdayNumber(year, month, day) {
  if (!year || !month || !day) return null
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const target = new Date(year, month - 1, day)
  target.setHours(0, 0, 0, 0)
  return Math.ceil((target - today) / (1000 * 60 * 60 * 24))
}

function getDdayLabel(n) {
  if (n > 0) return `D-${n}`
  if (n === 0) return 'D-DAY'
  return `D+${Math.abs(n)}`
}

function getDdayColor(n) {
  if (n <= 0) return { banner: '#3B6D11', text: '#fff', sub: '#A8D878' }
  if (n <= 1) return { banner: '#B91C1C', text: '#fff', sub: '#FECACA' }
  if (n <= 3) return { banner: '#C2410C', text: '#fff', sub: '#FECDBA' }
  if (n <= 7) return { banner: '#B86E00', text: '#fff', sub: '#F5D49A' }
  return { banner: '#639922', text: '#fff', sub: '#C8E8A8' }
}

function isTimelineItemActive(dDayKey, daysLeft) {
  const map = { 'D-14': 14, 'D-7': 7, 'D-3': 3, 'D-1': 1, 'D-0': 0 }
  const itemDay = map[dDayKey]
  if (itemDay === undefined) return true
  return daysLeft <= itemDay
}

const selectStyle = {
  border: '2px solid #C4DBA0',
  backgroundColor: '#F7FAF3',
  color: '#2D3A1F',
  borderRadius: 14,
  padding: '10px 10px',
  fontSize: 16,
  outline: 'none',
  cursor: 'pointer',
  appearance: 'auto',
}

export default function DdayPlanner({ timeline, surgeryDate, onDateChange }) {
  const now = new Date()
  const currentYear  = now.getFullYear()
  const currentMonth = now.getMonth() + 1
  const currentDay   = now.getDate()

  // surgeryDate: { year, month, day }
  const date = surgeryDate || {}
  const { year = '', month = '', day = '' } = date

  function update(field, value) {
    const next = { ...date, [field]: Number(value) }
    // day 범위 보정
    if (next.year && next.month) {
      const maxDay = getDaysInMonth(next.year, next.month)
      if (next.day > maxDay) next.day = maxDay
    }
    onDateChange(next)
  }

  const daysLeft = getDdayNumber(year, month, day)
  const colors   = daysLeft !== null ? getDdayColor(daysLeft) : null
  const maxDay   = (year && month) ? getDaysInMonth(year, month) : 31

  const years  = [currentYear, currentYear + 1, currentYear + 2]
  const months = Array.from({ length: 12 }, (_, i) => i + 1)
  const days   = Array.from({ length: maxDay }, (_, i) => i + 1)

  return (
    <div>
      {/* 날짜 선택 */}
      <p className="text-sm font-semibold mb-3" style={{ color: '#3B6D11' }}>수술 예정일을 선택하세요</p>
      <div className="flex items-center gap-2 mb-4">
        <select value={year} onChange={e => update('year', e.target.value)} style={{ ...selectStyle, flex: 2 }}>
          <option value="">년도</option>
          {years.map(y => <option key={y} value={y}>{y}년</option>)}
        </select>
        <select value={month} onChange={e => update('month', e.target.value)} style={{ ...selectStyle, flex: 1.5 }}>
          <option value="">월</option>
          {months.map(m => <option key={m} value={m}>{m}월</option>)}
        </select>
        <select value={day} onChange={e => update('day', e.target.value)} style={{ ...selectStyle, flex: 1.5 }}>
          <option value="">일</option>
          {days.map(d => <option key={d} value={d}>{d}일</option>)}
        </select>
      </div>

      {/* D-day 배너 */}
      {daysLeft !== null && (
        <div className="rounded-2xl px-5 py-4 mb-5 flex items-center justify-between"
          style={{ backgroundColor: colors.banner }}>
          <div>
            <p className="text-sm font-semibold mb-0.5" style={{ color: colors.sub }}>
              {daysLeft > 0 ? '수술까지 남은 날' : daysLeft === 0 ? '오늘이 수술 날이에요!' : '수술 후 경과'}
            </p>
            <p className="text-3xl font-bold" style={{ color: colors.text }}>
              {getDdayLabel(daysLeft)}
            </p>
          </div>
          <span style={{ fontSize: 40 }}>
            {daysLeft > 0 ? '📅' : daysLeft === 0 ? '🏥' : '🌿'}
          </span>
        </div>
      )}

      {/* 준비 타임라인 */}
      {timeline?.length > 0 && (
        <div className="space-y-3">
          {timeline.map(item => {
            const c = DDAY_COLORS[item.dDay] || DDAY_COLORS['D-14']
            const isPast = daysLeft !== null && !isTimelineItemActive(item.dDay, daysLeft)
            return (
              <div key={item.dDay} className="rounded-2xl p-4 transition-all"
                style={{
                  backgroundColor: isPast ? '#F5F5F5' : c.bg,
                  border: `1px solid ${isPast ? '#E0E0E0' : c.border}`,
                  opacity: isPast ? 0.55 : 1,
                }}>
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2.5 py-1 rounded-full text-xs font-bold"
                    style={{ backgroundColor: isPast ? '#E0E0E0' : c.dot, color: isPast ? '#999' : '#fff' }}>
                    {item.dDay}
                  </span>
                  <span className="text-sm font-semibold" style={{ color: isPast ? '#999' : c.label }}>
                    {item.title}
                    {isPast && <span className="ml-1.5 text-xs font-normal" style={{ color: '#bbb' }}>완료</span>}
                  </span>
                </div>
                <ul className="space-y-2 pl-1">
                  {item.tasks.map((task, ti) => {
                    const [main, reason] = task.split(/\s*—\s*/)
                    return (
                      <li key={ti} className="flex items-start gap-2 text-sm">
                        <span className="mt-[7px] w-1.5 h-1.5 rounded-full flex-shrink-0"
                          style={{ backgroundColor: isPast ? '#ccc' : c.dot }} />
                        <span>
                          <span style={{ color: isPast ? '#aaa' : '#2D3A1F', fontWeight: 500, lineHeight: 1.7 }}>
                            {main}
                          </span>
                          {reason && (
                            <span className="block text-xs mt-0.5" style={{ color: isPast ? '#bbb' : '#7A9A5A', lineHeight: 1.6 }}>
                              {reason}
                            </span>
                          )}
                        </span>
                      </li>
                    )
                  })}
                </ul>
              </div>
            )
          })}
        </div>
      )}

      {(!year || !month || !day) && (
        <p className="text-sm text-center mt-3" style={{ color: '#A8C98A' }}>
          날짜를 선택하면 D-day와 준비 일정을 확인할 수 있어요
        </p>
      )}
    </div>
  )
}
