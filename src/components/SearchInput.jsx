import { useState } from 'react'
import { SURGERY_LIST } from '../constants/surgeryList'

export default function SearchInput({ value, onChange, onSearch, loading }) {
  const [showSuggestions, setShowSuggestions] = useState(false)

  const suggestions = value.length > 0
    ? SURGERY_LIST.filter(s => s.includes(value))
    : []

  function handleSelect(name) {
    onChange(name)
    setShowSuggestions(false)
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter' && value.trim()) onSearch()
  }

  return (
    <div className="relative">
      <label htmlFor="surgery-input" className="block text-base font-medium text-gray-700 mb-2">
        수술명을 입력하세요
      </label>
      <div className="flex gap-2">
        <input
          id="surgery-input"
          type="text"
          value={value}
          onChange={e => { onChange(e.target.value); setShowSuggestions(true) }}
          onKeyDown={handleKeyDown}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
          onFocus={() => value.length > 0 && setShowSuggestions(true)}
          placeholder="예: 맹장 수술, 담낭절제술"
          className="flex-1 border border-gray-300 rounded-xl px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={onSearch}
          disabled={!value.trim() || loading}
          aria-label="수술 정보 검색"
          className="min-h-[44px] px-6 bg-blue-600 text-white rounded-xl text-base font-medium disabled:opacity-40 disabled:cursor-not-allowed hover:bg-blue-700 transition-colors"
        >
          {loading ? '생성 중...' : '검색'}
        </button>
      </div>

      {showSuggestions && suggestions.length > 0 && (
        <ul className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden">
          {suggestions.map(name => (
            <li key={name}>
              <button
                onMouseDown={() => handleSelect(name)}
                className="w-full text-left px-4 py-3 text-base hover:bg-blue-50 transition-colors"
              >
                {name}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
