# CLAUDE.md — PreOp Buddy AI 컨텍스트

> 이 파일은 AI 코딩 어시스턴트(Claude, Cursor 등)가 이 프로젝트를 이해하고 효과적으로 기여할 수 있도록 작성된 컨텍스트 파일입니다.

---

## AI 어시스턴트 역할 정의

이 프로젝트에서 AI 코딩 어시스턴트는 다음 역할을 수행한다:

| 역할 | 설명 | 범위 |
|---|---|---|
| **기능 구현자** | 요청된 컴포넌트/기능을 React + Tailwind로 구현 | 전체 |
| **리팩터링 파트너** | 컴포넌트 크기 최적화, 중복 제거 | 요청 시 |
| **프롬프트 엔지니어** | Groq API 프롬프트 품질 개선 | surgeryPrompt.js |
| **문서 작성자** | PRD, ROADMAP, VALIDATION 문서 최신화 | docs/ |
| **품질 검증자** | 빌드 확인, 접근성 체크, 한국어 출력 품질 검증 | 전체 |

### 이 프로젝트에서 AI가 하지 말아야 할 것

- 특정 의사/병원 추천 기능 추가
- 환자 개인정보 수집 (이름, 주민번호 등)
- 진단/처방 기능 추가
- 의료 DB API 연동 (해커톤 범위 초과)
- API 키 하드코딩

---

## 프로젝트 개요

**PreOp Buddy**는 수술 예정 환자를 위한 AI 교육 어시스턴트입니다. 수술명을 입력하면 환자가 이해할 수 있는 수준의 수술 설명, 준비사항, 회복 과정, FAQ를 자동 생성합니다.

- **타겟 사용자:** 수술 예정 환자 및 보호자 (40~70대, 디지털 리터러시 낮음)
- **핵심 가치:** 의학 정보의 환자 친화적 번역
- **제약 조건:** 의학적 조언 제공 불가, 면책 조항 필수 표시
- **배포 URL:** https://preop-buddy.vercel.app

---

## 기술 스택 및 아키텍처

### 스택
- **프론트엔드:** React 18 + Vite + Tailwind CSS v4
- **AI:** Groq API (llama-3.3-70b-versatile, JSON mode, temperature 0.3)
- **배포:** Vercel (https://preop-buddy.vercel.app)
- **백엔드:** 없음 (프론트엔드에서 Groq API 직접 호출)

### 핵심 데이터 흐름
```
사용자 입력 (수술명 + 난이도)
  → claudeApi.js에서 프롬프트 조립
  → Claude API 호출 (streaming)
  → JSON 응답 파싱
  → ResultCard 컴포넌트에 렌더링
```

### 디렉토리 구조
```
src/
├── App.jsx                  # 라우팅 없음, 단일 페이지 앱
├── components/
│   ├── SearchInput.jsx      # 수술명 입력 + 자동완성
│   ├── ResultCard.jsx       # 수술 정보 5개 섹션 표시
│   ├── Checklist.jsx        # 인터랙티브 체크리스트
│   └── DifficultySelector.jsx  # "쉽게/자세하게/의학용어" 선택
├── services/
│   └── claudeApi.js         # Claude API 호출 + 스트리밍 처리
├── prompts/
│   └── surgeryPrompt.js     # 프롬프트 템플릿 (난이도별 분기)
└── constants/
    └── surgeryList.js       # 자주 쓰는 수술명 목록 (자동완성용)
```

---

## 코딩 컨벤션 및 규칙

### 일반 규칙
- 한국어 UI, 영문 코드 (변수명·함수명은 영문)
- 컴포넌트: PascalCase (`ResultCard.jsx`)
- 함수/변수: camelCase (`handleSubmit`, `surgeryName`)
- 상수: UPPER_SNAKE_CASE (`DEFAULT_DIFFICULTY`)
- CSS: Tailwind 유틸리티 클래스 사용, 커스텀 CSS 최소화

### React 규칙
- 함수형 컴포넌트 + Hooks만 사용 (클래스 컴포넌트 금지)
- Props는 구조분해 할당으로 받기
- 상태는 useState로 관리 (별도 상태 라이브러리 사용 안 함)
- 컴포넌트 파일 하나에 하나의 export default

### API 호출 규칙
- Claude API 키는 환경변수 `VITE_CLAUDE_API_KEY`로 관리
- 모든 API 호출은 try-catch로 에러 핸들링
- 스트리밍 응답 사용 (사용자 체감 속도 향상)
- API 응답은 반드시 JSON으로 파싱 후 사용

---

## 프롬프트 설계 가이드

### 핵심 원칙
1. **출력 포맷 강제:** JSON Schema를 system prompt에 명시하여 파싱 안정성 확보
2. **난이도별 분기:** "쉽게" / "자세하게" / "의학용어 포함" 3가지 프롬프트 변형
3. **안전장치:** 특정 수술에 대해 모르는 경우 "정보가 충분하지 않습니다" 응답 유도
4. **면책 포함:** 모든 응답에 "이 정보는 참고용이며 담당 의료진과 상담하세요" 포함

### 기대 JSON 출력 구조
```json
{
  "surgeryName": "복강경 담낭절제술",
  "overview": "담낭을 제거하는 수술로...",
  "process": [
    { "step": 1, "title": "마취", "description": "..." },
    { "step": 2, "title": "수술", "description": "..." }
  ],
  "preparation": [
    { "item": "수술 8시간 전부터 금식", "category": "식이" },
    { "item": "혈액 희석제 복용 중단", "category": "약물" }
  ],
  "recovery": {
    "hospitalDays": "1~2일",
    "returnToDaily": "1~2주",
    "precautions": ["...", "..."]
  },
  "faq": [
    { "question": "수술 후 식사는 언제 가능한가요?", "answer": "..." }
  ],
  "disclaimer": "이 정보는 일반적인 참고 자료입니다..."
}
```

---

## 주의사항 (AI 어시스턴트용)

### 반드시 지켜야 할 것
- 모든 의학 정보 옆에 면책 조항 표시 로직 유지
- 환자 개인정보 입력 필드 추가 금지 (이름, 주민번호 등)
- 에러 발생 시 사용자에게 친절한 한국어 메시지 표시
- 고령 사용자 고려: 최소 폰트 16px, 버튼 터치 영역 44px 이상

### 하지 말아야 할 것
- 특정 의사/병원 추천 기능 추가 금지
- 진단 또는 처방 기능 추가 금지
- API 키를 코드에 하드코딩 금지
- 외부 의학 DB API 연동 시도 금지 (해커톤 범위 초과)

### 알아두면 좋은 것
- 타겟 사용자가 고령층이므로 UI 접근성이 매우 중요
- 수술명은 한국어/영문 모두 입력 가능해야 함
- 자주 쓰는 수술명은 `constants/surgeryList.js`에 정의되어 있음
- 난이도 기본값은 "쉽게"

---

## 개발 명령어

```bash
npm run dev      # 개발 서버 실행 (localhost:5173)
npm run build    # 프로덕션 빌드
npm run preview  # 빌드 결과 미리보기
```

---

## 관련 문서

- [PRD](./docs/PRD.md) — 제품 요구사항 전체
- [README](./README.md) — 프로젝트 소개 및 실행 방법
