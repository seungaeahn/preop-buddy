import { useState, useEffect, useRef, useMemo } from 'react'
import { SURGERY_LIST } from '../constants/surgeryList'

export default function SearchInput({ value, onChange, onSearch, loading }) {
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [focused, setFocused] = useState(false)
  const timerRef = useRef(null)

  // 컴포넌트 언마운트 시 타이머 정리
  useEffect(() => {
    return () => { if (timerRef.current) clearTimeout(timerRef.current) }
  }, [])

  // 검색어 필터 메모이제이션 (토큰 분리 부분 매칭)
  const suggestions = useMemo(() => {
    const q = value.trim()
    if (!q) return SURGERY_LIST.slice(0, 6)
    const tokens = q.split(/\s+/).filter(Boolean)
    return SURGERY_LIST.filter(s => tokens.every(token => s.includes(token)))
  }, [value])

  function handleBlur() {
    timerRef.current = setTimeout(() => setShowSuggestions(false), 150)
  }

  function handleFocus() {
    if (timerRef.current) clearTimeout(timerRef.current)
    setShowSuggestions(true)
    setFocused(true)
  }

  function handleBlurCapture() {
    setFocused(false)
  }

  function handleSelect(name) {
    onChange(name)
    setShowSuggestions(false)
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter' && value.trim()) onSearch()
  }

  return (
    <div className="relative">
      <label htmlFor="surgery-input"
        className="block text-sm font-semibold mb-2"
        style={{ color: '#3B6D11' }}>
        수술명을 입력하세요
      </label>
      <div className="flex gap-2">
        <input
          id="surgery-input"
          type="text"
          value={value}
          onChange={e => { onChange(e.target.value); setShowSuggestions(true) }}
          onKeyDown={handleKeyDown}
          onBlur={handleBlur}
          onFocus={handleFocus}
          onBlurCapture={handleBlurCapture}
          placeholder="예: 맹장 수술, 담낭절제술, 무릎 수술"
          className="flex-1 rounded-2xl px-4 py-3.5 text-base outline-none transition-all"
          style={{
            border: `2px solid ${focused ? '#639922' : '#D4E8BF'}`,
            backgroundColor: '#F7FAF3',
            color: '#2D3A1F',
            fontSize: '16px',
          }}
        />
        <button
          onClick={onSearch}
          disabled={!value.trim() || loading}
          className="min-h-[52px] px-6 rounded-2xl text-base font-semibold text-white transition-all shadow-sm"
          style={{
            backgroundColor: !value.trim() || loading ? '#A8C98A' : '#3B6D11',
            cursor: !value.trim() || loading ? 'not-allowed' : 'pointer',
          }}
        >
          {loading ? '생성 중' : '검색'}
        </button>
      </div>

      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute z-10 w-full mt-2 rounded-2xl shadow-xl overflow-hidden"
          style={{ backgroundColor: '#fff', border: '1px solid #D4E8BF' }}>
          <p className="px-4 py-2.5 text-xs font-semibold"
            style={{ color: '#8FA870', borderBottom: '1px solid #EAF3DE' }}>
            {value.trim() ? '검색 결과' : '자주 찾는 수술'}
          </p>
          <ul>
            {suggestions.map(name => (
              <li key={name}>
                <button
                  onMouseDown={() => handleSelect(name)}
                  className="w-full text-left px-4 py-3.5 text-base flex items-center gap-2 transition-colors"
                  style={{ color: '#2D3A1F' }}
                  onMouseEnter={e => e.currentTarget.style.backgroundColor = '#F4F9EF'}
                  onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                  <span style={{ color: '#A8C98A' }}>🔍</span>
                  {name}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
