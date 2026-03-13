import { buildSystemPrompt, buildUserPrompt } from '../prompts/surgeryPrompt'

const API_URL = 'https://api.groq.com/openai/v1/chat/completions'
const MODEL = 'llama-3.3-70b-versatile'

export async function fetchSurgeryInfo(surgeryName) {
  const apiKey = import.meta.env.VITE_GROQ_API_KEY
  if (!apiKey) throw new Error('API 키가 설정되지 않았습니다. .env 파일을 확인해주세요.')

  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: MODEL,
      temperature: 0.3,
      max_tokens: 4000,
      response_format: { type: 'json_object' },
      messages: [
        { role: 'system', content: buildSystemPrompt() },
        { role: 'user', content: buildUserPrompt(surgeryName) },
      ],
    }),
  })

  if (!response.ok) {
    const err = await response.json().catch(() => ({}))
    throw new Error(err.error?.message || '정보를 불러오지 못했습니다. 다시 시도해주세요.')
  }

  const data = await response.json()
  const text = data.choices?.[0]?.message?.content

  if (!text) throw new Error('응답 내용이 비어 있습니다. 다시 시도해주세요.')

  const clean = text.replace(/```json\s*/g, '').replace(/```\s*/g, '').trim()

  try {
    return JSON.parse(clean)
  } catch {
    throw new Error('응답 형식이 올바르지 않습니다. 다시 시도해주세요.')
  }
}
