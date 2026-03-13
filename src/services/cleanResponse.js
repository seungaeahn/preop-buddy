/**
 * API 응답에서 한자·일본어·영문 혼용을 제거하는 후처리 유틸리티
 */

// 한국어에서 보편화된 의학 약어 (제거 제외)
const ALLOWED_ABBR = new Set(['CT', 'MRI', 'X선', 'PCR'])

function cleanText(text) {
  if (typeof text !== 'string') return text

  return text
    // 영문이 포함된 괄호 내용 통째로 제거: (Laparoscopy), (NPO) 등
    .replace(/\([^)]*[a-zA-Z]{2,}[^)]*\)/g, '')
    // 한자 제거 (CJK 전체 범위)
    .replace(/[\u4E00-\u9FFF\u3400-\u4DBF\uF900-\uFAFF\u2E80-\u2EFF]/g, '')
    // 일본어 히라가나·가타카나 제거
    .replace(/[\u3040-\u309F\u30A0-\u30FF]/g, '')
    // 허용 약어가 아닌 영문 단어 제거 (단어 경계 기준)
    .replace(/\b[a-zA-Z]+\b/g, match => ALLOWED_ABBR.has(match.toUpperCase()) ? match : '')
    // 남은 단독 알파벳 제거
    .replace(/(?<![a-zA-Z])[a-zA-Z](?![a-zA-Z])/g, '')
    // 연속 공백 정리
    .replace(/\s{2,}/g, ' ')
    .trim()
}

function cleanDeep(obj) {
  if (typeof obj === 'string') return cleanText(obj)
  if (Array.isArray(obj)) return obj.map(cleanDeep)
  if (obj && typeof obj === 'object') {
    return Object.fromEntries(
      Object.entries(obj).map(([k, v]) => [k, cleanDeep(v)])
    )
  }
  return obj
}

export function cleanKoreanOnly(parsed) {
  return cleanDeep(parsed)
}
