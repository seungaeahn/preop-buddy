const DIFFICULTIES = [
  { value: 'easy', label: '쉽게' },
  { value: 'detailed', label: '자세하게' },
  { value: 'medical', label: '의학 용어 포함' },
]

export default function DifficultySelector({ value, onChange }) {
  return (
    <div>
      <p className="text-base font-medium text-gray-700 mb-2">설명 난이도</p>
      <div className="flex gap-2 flex-wrap">
        {DIFFICULTIES.map(({ value: v, label }) => (
          <button
            key={v}
            onClick={() => onChange(v)}
            aria-pressed={value === v}
            className={`min-h-[44px] px-5 rounded-xl text-base font-medium border transition-colors
              ${value === v
                ? 'bg-blue-600 text-white border-blue-600'
                : 'bg-white text-gray-600 border-gray-300 hover:border-blue-400'
              }`}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  )
}
