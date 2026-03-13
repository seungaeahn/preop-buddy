import { useState } from 'react'

export default function Checklist({ items }) {
  const [checked, setChecked] = useState({})

  function toggle(index) {
    setChecked(prev => ({ ...prev, [index]: !prev[index] }))
  }

  const doneCount = Object.values(checked).filter(Boolean).length

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-semibold text-gray-900">✅ 수술 전 준비사항</h2>
        <span className="text-base text-gray-500">{doneCount} / {items.length} 완료</span>
      </div>
      <ul className="space-y-2">
        {items.map((item, i) => (
          <li key={i}>
            <label className="flex items-start gap-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={!!checked[i]}
                onChange={() => toggle(i)}
                className="mt-1 w-5 h-5 rounded border-gray-300 text-blue-600 cursor-pointer"
              />
              <span className={`text-base leading-relaxed ${checked[i] ? 'line-through text-gray-400' : 'text-gray-700'}`}>
                {item.item}
                {item.category && (
                  <span className="ml-2 text-sm text-gray-400">[{item.category}]</span>
                )}
              </span>
            </label>
          </li>
        ))}
      </ul>
    </div>
  )
}
