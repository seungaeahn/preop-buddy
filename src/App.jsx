import { useState } from 'react'
import SearchInput from './components/SearchInput'
import DifficultySelector from './components/DifficultySelector'
import ResultCard from './components/ResultCard'
import { fetchSurgeryInfo } from './services/claudeApi'

const DEFAULT_DIFFICULTY = 'easy'

export default function App() {
  const [surgeryName, setSurgeryName] = useState('')
  const [difficulty, setDifficulty] = useState(DEFAULT_DIFFICULTY)
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  async function handleSearch() {
    if (!surgeryName.trim()) return

    setLoading(true)
    setError(null)
    setResult(null)

    let rawText = ''

    try {
      await fetchSurgeryInfo(surgeryName, difficulty, (chunk) => {
        rawText += chunk
      })

      const parsed = JSON.parse(rawText)

      if (parsed.error) {
        setError(parsed.error)
      } else {
        setResult(parsed)
      }
    } catch (err) {
      console.error(err)
      setError(err.message || '정보를 불러오지 못했습니다. 다시 시도해주세요.')
    } finally {
      setLoading(false)
    }
  }

  function handleDifficultyChange(newDifficulty) {
    setDifficulty(newDifficulty)
    if (result) handleSearch()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-4 py-6">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-900">🏥 PreOp Buddy</h1>
          <p className="mt-1 text-gray-500 text-base">수술이 무섭지 않도록, AI가 미리 알려드립니다</p>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-8 space-y-6">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-4">
          <SearchInput
            value={surgeryName}
            onChange={setSurgeryName}
            onSearch={handleSearch}
            loading={loading}
          />
          <DifficultySelector value={difficulty} onChange={handleDifficultyChange} />
        </div>

        {loading && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center">
            <p className="text-gray-500 text-base animate-pulse">AI가 수술 정보를 생성하고 있습니다...</p>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-red-700 text-base">
            {error}
            <button
              onClick={handleSearch}
              className="ml-3 underline text-red-600 hover:text-red-800"
            >
              다시 시도
            </button>
          </div>
        )}

        {result && !loading && <ResultCard result={result} />}
      </main>
    </div>
  )
}
