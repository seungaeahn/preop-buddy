import { useState } from 'react'
import SearchInput from './components/SearchInput'
import ResultCard from './components/ResultCard'
import Buddy from './components/Buddy'
import { fetchSurgeryInfo } from './services/groqApi'
import { cleanKoreanOnly } from './services/cleanResponse'

export default function App() {
  const [surgeryName, setSurgeryName] = useState('')
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  async function handleSearch() {
    if (!surgeryName.trim()) return
    setLoading(true)
    setError(null)
    setResult(null)
    try {
      const parsed = cleanKoreanOnly(await fetchSurgeryInfo(surgeryName))
      setResult(parsed)
    } catch (err) {
      console.error(err)
      setError(err.message || '정보를 불러오지 못했습니다. 다시 시도해주세요.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="h-screen overflow-hidden flex flex-col" style={{ backgroundColor: '#EAF3DE' }}>

      {/* 헤더 */}
      <header style={{ backgroundColor: '#fff', borderBottom: '1px solid #D4E8BF' }}
        className="sticky top-0 z-20 shadow-sm">
        <div className="max-w-2xl mx-auto px-5 py-4 flex items-center gap-3">
          <div className="w-9 h-9 rounded-2xl flex items-center justify-center text-white text-base font-bold shadow-sm"
            style={{ backgroundColor: '#3B6D11' }}>+</div>
          <div>
            <h1 className="text-base font-semibold leading-none" style={{ color: '#2D3A1F' }}>PreOp Buddy</h1>
            <p className="text-xs mt-0.5" style={{ color: '#639922' }}>수술 전 AI 안내 서비스</p>
          </div>
        </div>
      </header>

      {/* 히어로 (결과 없을 때만) */}
      {!result && !loading && (
        <section className="px-5 pt-8 pb-2" style={{ backgroundColor: '#EAF3DE' }}>
          <div className="max-w-2xl mx-auto flex items-end justify-between gap-4">
            <div className="pb-4">
              <p className="text-sm font-semibold mb-2" style={{ color: '#639922' }}>안녕하세요 👋</p>
              <h2 className="text-2xl font-medium leading-snug mb-3" style={{ color: '#2D3A1F' }}>
                수술, 걱정 마세요<br />제가 도와드릴게요
              </h2>
              <p className="text-base" style={{ color: '#5A6E44', lineHeight: 1.8 }}>
                수술명을 입력하면 준비사항부터<br />
                회복까지 알기 쉽게 알려드려요
              </p>
            </div>
            <Buddy size={180} className="flex-shrink-0 drop-shadow-lg" />
          </div>
        </section>
      )}

      <main className="flex-1 overflow-y-scroll w-full px-5 py-6">
        <div className="max-w-2xl mx-auto space-y-5">

          {/* 검색 카드 */}
          <div className="rounded-3xl p-6 shadow-sm"
            style={{ backgroundColor: '#fff', border: '1px solid #D4E8BF' }}>
            <SearchInput value={surgeryName} onChange={setSurgeryName} onSearch={handleSearch} loading={loading} />
          </div>

          {/* 로딩 */}
          {loading && (
            <div className="rounded-3xl p-10 flex flex-col items-center gap-4 shadow-sm"
              style={{ backgroundColor: '#fff', border: '1px solid #D4E8BF' }}>
              <Buddy size={110} className="animate-bounce drop-shadow-md" />
              <div className="text-center">
                <p className="font-medium text-base" style={{ color: '#2D3A1F' }}>열심히 찾아보고 있어요!</p>
                <p className="text-sm mt-1" style={{ color: '#8FA870' }}>잠깐만 기다려 주세요...</p>
              </div>
            </div>
          )}

          {/* 에러 */}
          {error && (
            <div className="rounded-3xl p-5 flex items-start gap-3"
              style={{ backgroundColor: '#FAEEDA', border: '1px solid #F5D49A' }}>
              <span className="text-xl flex-shrink-0">😅</span>
              <div>
                <p className="text-base font-medium" style={{ color: '#8B5E0A' }}>{error}</p>
                <button onClick={handleSearch}
                  className="mt-2 text-sm underline" style={{ color: '#EF9F27' }}>
                  다시 시도
                </button>
              </div>
            </div>
          )}

          {/* 결과 */}
          {result && !loading && <ResultCard result={result} />}
        </div>
      </main>
    </div>
  )
}
