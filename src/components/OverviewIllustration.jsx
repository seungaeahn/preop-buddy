/**
 * 수술명 키워드로 카테고리 분류
 */
function getCategory(name = '') {
  if (/(담낭|쓸개|담도|담관)/.test(name)) return 'gallbladder'
  if (/(심장|관상|심근|판막|스텐트|우회)/.test(name)) return 'heart'
  if (/(무릎|슬관절|고관절|관절|인공관절)/.test(name)) return 'joint'
  if (/(척추|디스크|허리|경추|요추|추간판)/.test(name)) return 'spine'
  if (/(눈|백내장|녹내장|망막|각막)/.test(name)) return 'eye'
  if (/(위|위장|위절제|위암)/.test(name)) return 'stomach'
  if (/(대장|소장|맹장|직장|결장|충수)/.test(name)) return 'intestine'
  if (/(갑상선|갑상샘)/.test(name)) return 'thyroid'
  if (/(신장|콩팥|신우|결석)/.test(name)) return 'kidney'
  if (/(자궁|난소|제왕|출산)/.test(name)) return 'uterus'
  if (/(편도|편도선)/.test(name)) return 'tonsil'
  if (/(유방)/.test(name)) return 'breast'
  if (/(전립선)/.test(name)) return 'prostate'
  if (/(탈장|치질|항문|직장)/.test(name)) return 'abdomen'
  return 'general'
}

/* ── 공통 배경 + 장식 ── */
function BgDeco() {
  return <>
    <circle cx="20" cy="145" r="45" fill="#C8E8A8" opacity="0.2" />
    <circle cx="305" cy="18" r="40" fill="#A8D878" opacity="0.18" />
  </>
}
function Sparkles() {
  return <>
    <text x="268" y="32" fontSize="13" opacity="0.7">✨</text>
    <text x="44"  y="42" fontSize="11" opacity="0.55">⭐</text>
    <text x="290" y="115" fontSize="10" opacity="0.5">💚</text>
  </>
}

/* ── 담낭 ── */
function Gallbladder() {
  return (
    <svg viewBox="0 0 320 160" width="100%" height="160">
      <BgDeco />
      {/* 간 (단순화) */}
      <ellipse cx="175" cy="60" rx="55" ry="28" fill="#C8A882" opacity="0.6" />
      <ellipse cx="170" cy="58" rx="50" ry="24" fill="#DDB992" opacity="0.7" />
      {/* 담관 */}
      <path d="M152 82 Q148 95 145 105" stroke="#B8955A" strokeWidth="4" fill="none" strokeLinecap="round" />
      {/* 담낭 (귀여운 물방울/배 모양) */}
      <ellipse cx="140" cy="118" rx="20" ry="26" fill="#C8E870" stroke="#9BBF30" strokeWidth="2" />
      <ellipse cx="140" cy="112" rx="11" ry="9" fill="#D8F070" />
      {/* 담낭 얼굴 */}
      <circle cx="135" cy="118" r="2.5" fill="#5A7A10" />
      <circle cx="145" cy="118" r="2.5" fill="#5A7A10" />
      <path d="M134 124 Q140 129 146 124" stroke="#5A7A10" strokeWidth="1.8" fill="none" strokeLinecap="round" />
      <ellipse cx="131" cy="121" rx="4" ry="2.5" fill="#FFB6A3" opacity="0.5" />
      <ellipse cx="149" cy="121" rx="4" ry="2.5" fill="#FFB6A3" opacity="0.5" />
      {/* 복강경 도구 (얇은 막대, 귀여운 느낌) */}
      <line x1="90" y1="55" x2="130" y2="108" stroke="#7BBF3A" strokeWidth="3.5" strokeLinecap="round" />
      <circle cx="90" cy="54" r="7" fill="#3B6D11" />
      <circle cx="90" cy="54" r="4" fill="#7BBF3A" />
      <line x1="195" y1="48" x2="160" y2="112" stroke="#7BBF3A" strokeWidth="3.5" strokeLinecap="round" />
      <circle cx="195" cy="47" r="7" fill="#3B6D11" />
      <circle cx="195" cy="47" r="4" fill="#7BBF3A" />
      {/* 작은 하트 */}
      <text x="215" y="130" fontSize="16" opacity="0.7">💛</text>
      <Sparkles />
    </svg>
  )
}

/* ── 심장 ── */
function Heart() {
  return (
    <svg viewBox="0 0 320 160" width="100%" height="160">
      <BgDeco />
      {/* 심장 */}
      <path d="M160 130 C160 130 95 95 95 58 C95 38 110 28 125 28 C138 28 148 36 160 48 C172 36 182 28 195 28 C210 28 225 38 225 58 C225 95 160 130 160 130Z"
        fill="#FFB3BA" stroke="#FF8FA3" strokeWidth="2" />
      <path d="M160 118 C160 118 108 88 108 60 C108 46 118 40 128 40 C139 40 148 48 160 60 C172 48 181 40 192 40 C202 40 212 46 212 60 C212 88 160 118 160 118Z"
        fill="#FFCCD5" opacity="0.6" />
      {/* 얼굴 */}
      <circle cx="148" cy="65" r="4" fill="#C0535A" />
      <circle cx="172" cy="65" r="4" fill="#C0535A" />
      <circle cx="149.5" cy="63.5" r="1.8" fill="#fff" />
      <circle cx="173.5" cy="63.5" r="1.8" fill="#fff" />
      <path d="M148 76 Q160 85 172 76" stroke="#C0535A" strokeWidth="2.2" fill="none" strokeLinecap="round" />
      <ellipse cx="140" cy="73" rx="6" ry="3.5" fill="#FFB6A3" opacity="0.55" />
      <ellipse cx="180" cy="73" rx="6" ry="3.5" fill="#FFB6A3" opacity="0.55" />
      {/* 심박수 선 */}
      <polyline points="55,80 80,80 90,55 100,105 112,80 135,80" stroke="#FF8FA3" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <polyline points="185,80 208,80 218,55 228,105 240,80 265,80" stroke="#FF8FA3" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <text x="268" y="32" fontSize="13" opacity="0.7">✨</text>
      <text x="44" y="42" fontSize="11" opacity="0.55">⭐</text>
      <text x="142" y="148" fontSize="14" opacity="0.7">💗</text>
    </svg>
  )
}

/* ── 관절/무릎 ── */
function Joint() {
  return (
    <svg viewBox="0 0 320 160" width="100%" height="160">
      <BgDeco />
      {/* 위쪽 뼈 (대퇴골) */}
      <rect x="135" y="18" width="50" height="58" rx="18" fill="#F5F0E8" stroke="#D4C9A0" strokeWidth="2" />
      <ellipse cx="160" cy="76" rx="32" ry="14" fill="#F5F0E8" stroke="#D4C9A0" strokeWidth="2" />
      {/* 연골 쿠션 */}
      <ellipse cx="160" cy="88" rx="30" ry="9" fill="#C8E8A8" stroke="#9BBF70" strokeWidth="1.5" />
      <ellipse cx="160" cy="88" rx="22" ry="6" fill="#D8F0B8" opacity="0.7" />
      {/* 아래쪽 뼈 (경골) */}
      <ellipse cx="160" cy="100" rx="28" ry="11" fill="#F5F0E8" stroke="#D4C9A0" strokeWidth="2" />
      <rect x="140" y="100" width="40" height="48" rx="14" fill="#F5F0E8" stroke="#D4C9A0" strokeWidth="2" />
      {/* 뼈 하이라이트 */}
      <rect x="148" y="26" width="14" height="30" rx="7" fill="#fff" opacity="0.5" />
      <rect x="148" y="106" width="14" height="24" rx="7" fill="#fff" opacity="0.5" />
      {/* 인공관절 금속 느낌 (부드럽게) */}
      <ellipse cx="160" cy="88" rx="30" ry="9" fill="none" stroke="#7BBF3A" strokeWidth="1" strokeDasharray="4 3" opacity="0.6" />
      {/* 별 장식 — 치유 */}
      <text x="70"  y="72" fontSize="20" opacity="0.7">⭐</text>
      <text x="228" y="68" fontSize="18" opacity="0.65">✨</text>
      <text x="64"  y="110" fontSize="14" opacity="0.5">💚</text>
      <text x="234" y="112" fontSize="13" opacity="0.5">🌿</text>
      <Sparkles />
    </svg>
  )
}

/* ── 척추 ── */
function Spine() {
  return (
    <svg viewBox="0 0 320 160" width="100%" height="160">
      <BgDeco />
      {/* 척추뼈 5개 (마카롱처럼 귀엽게) */}
      {[20, 46, 72, 98, 124].map((y, i) => (
        <g key={i}>
          {/* 디스크 (쿠션) */}
          {i > 0 && <ellipse cx="160" cy={y - 4} rx="22" ry="6" fill="#C8E8A8" stroke="#9BBF70" strokeWidth="1.2" />}
          {/* 뼈 */}
          <rect x="135" y={y} width="50" height="22" rx="11" fill="#F5F0E8" stroke="#D4C9A0" strokeWidth="2" />
          <rect x="143" y={y + 4} width="34" height="14" rx="7" fill="#fff" opacity="0.5" />
          {/* 돌기 */}
          <rect x="122" y={y + 6} width="13" height="10" rx="5" fill="#F0EAD8" stroke="#D4C9A0" strokeWidth="1.5" />
          <rect x="185" y={y + 6} width="13" height="10" rx="5" fill="#F0EAD8" stroke="#D4C9A0" strokeWidth="1.5" />
        </g>
      ))}
      <text x="68"  y="75" fontSize="20" opacity="0.65">✨</text>
      <text x="232" y="60" fontSize="18" opacity="0.6">⭐</text>
      <text x="68"  y="110" fontSize="14" opacity="0.5">💚</text>
      <text x="234" y="115" fontSize="13" opacity="0.5">🌿</text>
    </svg>
  )
}

/* ── 눈 ── */
function Eye() {
  return (
    <svg viewBox="0 0 320 160" width="100%" height="160">
      <BgDeco />
      {/* 눈 흰자 */}
      <ellipse cx="160" cy="82" rx="88" ry="52" fill="#fff" stroke="#C4DBA0" strokeWidth="2" />
      {/* 홍채 */}
      <circle cx="160" cy="82" r="34" fill="#7BB8D4" />
      <circle cx="160" cy="82" r="34" fill="url(#irisGrad)" />
      <defs>
        <radialGradient id="irisGrad" cx="40%" cy="35%">
          <stop offset="0%" stopColor="#A8D8EA" />
          <stop offset="100%" stopColor="#5090B0" />
        </radialGradient>
      </defs>
      {/* 동공 */}
      <circle cx="160" cy="82" r="16" fill="#2A2A2A" />
      {/* 하이라이트 */}
      <circle cx="168" cy="74" r="7" fill="#fff" opacity="0.85" />
      <circle cx="154" cy="87" r="3.5" fill="#fff" opacity="0.45" />
      {/* 속눈썹 위 */}
      {[-60,-40,-20,0,20,40,60].map((dx, i) => (
        <line key={i} x1={160+dx} y1="30" x2={160+dx*0.9} y2="20" stroke="#4A3728" strokeWidth="2.5" strokeLinecap="round" />
      ))}
      {/* 눈 아랫쪽 곡선 */}
      <path d="M72 82 Q160 140 248 82" stroke="#C4DBA0" strokeWidth="1.5" fill="none" />
      {/* 반짝임 장식 */}
      <text x="52"  y="55" fontSize="16" opacity="0.7">✨</text>
      <text x="252" y="50" fontSize="14" opacity="0.65">⭐</text>
      <text x="268" y="130" fontSize="13" opacity="0.6">💫</text>
      <text x="40"  y="125" fontSize="12" opacity="0.55">🌟</text>
    </svg>
  )
}

/* ── 위장 ── */
function Stomach() {
  return (
    <svg viewBox="0 0 320 160" width="100%" height="160">
      <BgDeco />
      {/* 위 (C자 모양) */}
      <path d="M120 45 Q85 45 80 80 Q75 115 95 130 Q120 145 155 140 Q195 135 205 115 Q215 95 200 75 Q190 55 175 50 Q155 43 140 48 Q130 50 120 45Z"
        fill="#FFB3C6" stroke="#FF85A1" strokeWidth="2" />
      <path d="M122 58 Q92 60 88 88 Q85 115 105 128 Q125 138 155 134 Q185 130 193 112 Q200 95 188 78 Q178 63 162 60 Q145 56 130 60Z"
        fill="#FFCCD8" opacity="0.65" />
      {/* 음식 들어오는 관 (식도) */}
      <rect x="112" y="22" width="20" height="28" rx="10" fill="#FFD0DC" stroke="#FF85A1" strokeWidth="1.8" />
      {/* 귀여운 얼굴 */}
      <circle cx="145" cy="96" r="4" fill="#C05070" />
      <circle cx="165" cy="96" r="4" fill="#C05070" />
      <circle cx="146.5" cy="94.5" r="1.8" fill="#fff" />
      <circle cx="166.5" cy="94.5" r="1.8" fill="#fff" />
      <path d="M140 108 Q155 118 170 108" stroke="#C05070" strokeWidth="2.2" fill="none" strokeLinecap="round" />
      <ellipse cx="136" cy="103" rx="6" ry="3.5" fill="#FFB6A3" opacity="0.55" />
      <ellipse cx="174" cy="103" rx="6" ry="3.5" fill="#FFB6A3" opacity="0.55" />
      <text x="58" y="58" fontSize="15" opacity="0.65">✨</text>
      <text x="242" y="50" fontSize="14" opacity="0.6">⭐</text>
      <text x="224" y="138" fontSize="14" opacity="0.65">💗</text>
    </svg>
  )
}

/* ── 맹장/대장 ── */
function Intestine() {
  return (
    <svg viewBox="0 0 320 160" width="100%" height="160">
      <BgDeco />
      {/* 대장 구불구불한 모양 */}
      <path d="M80 40 Q80 28 95 28 Q145 28 145 55 Q145 75 120 75 Q95 75 95 95 Q95 115 120 115 Q150 115 155 95 Q158 78 180 78 Q205 78 205 100 Q205 125 180 128 Q155 130 145 115"
        stroke="#FFB3BA" strokeWidth="22" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M80 40 Q80 28 95 28 Q145 28 145 55 Q145 75 120 75 Q95 75 95 95 Q95 115 120 115 Q150 115 155 95 Q158 78 180 78 Q205 78 205 100 Q205 125 180 128 Q155 130 145 115"
        stroke="#FFCCD5" strokeWidth="16" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      {/* 맹장 (귀여운 꼬리) */}
      <ellipse cx="88" cy="52" rx="12" ry="18" fill="#FFB3BA" stroke="#FF85A1" strokeWidth="1.8" />
      <ellipse cx="88" cy="50" rx="7" ry="11" fill="#FFCCD5" opacity="0.7" />
      {/* 맹장 얼굴 */}
      <circle cx="85" cy="50" r="2.5" fill="#C05070" />
      <circle cx="92" cy="50" r="2.5" fill="#C05070" />
      <path d="M84 57 Q88 61 93 57" stroke="#C05070" strokeWidth="1.8" fill="none" strokeLinecap="round" />
      <text x="232" y="48" fontSize="15" opacity="0.65">✨</text>
      <text x="50"  y="130" fontSize="14" opacity="0.6">⭐</text>
      <text x="240" y="138" fontSize="14" opacity="0.65">💗</text>
    </svg>
  )
}

/* ── 갑상선 ── */
function Thyroid() {
  return (
    <svg viewBox="0 0 320 160" width="100%" height="160">
      <BgDeco />
      {/* 나비 모양 갑상선 */}
      {/* 왼쪽 엽 */}
      <ellipse cx="130" cy="85" rx="42" ry="32" fill="#DDA8C8" stroke="#C07898" strokeWidth="2" transform="rotate(-12,130,85)" />
      <ellipse cx="130" cy="83" rx="30" ry="22" fill="#EEC8DE" opacity="0.6" transform="rotate(-12,130,83)" />
      {/* 오른쪽 엽 */}
      <ellipse cx="190" cy="85" rx="42" ry="32" fill="#DDA8C8" stroke="#C07898" strokeWidth="2" transform="rotate(12,190,85)" />
      <ellipse cx="190" cy="83" rx="30" ry="22" fill="#EEC8DE" opacity="0.6" transform="rotate(12,190,83)" />
      {/* 협부 (가운데 연결) */}
      <rect x="150" y="78" width="20" height="16" rx="8" fill="#DDA8C8" stroke="#C07898" strokeWidth="1.5" />
      {/* 왼쪽 얼굴 */}
      <circle cx="120" cy="82" r="3.5" fill="#7A4060" />
      <circle cx="138" cy="82" r="3.5" fill="#7A4060" />
      <path d="M117 91 Q129 98 141 91" stroke="#7A4060" strokeWidth="2" fill="none" strokeLinecap="round" />
      <ellipse cx="114" cy="88" rx="5.5" ry="3" fill="#FFB6A3" opacity="0.5" />
      <ellipse cx="145" cy="88" rx="5.5" ry="3" fill="#FFB6A3" opacity="0.5" />
      {/* 오른쪽 얼굴 */}
      <circle cx="180" cy="82" r="3.5" fill="#7A4060" />
      <circle cx="198" cy="82" r="3.5" fill="#7A4060" />
      <path d="M177 91 Q189 98 201 91" stroke="#7A4060" strokeWidth="2" fill="none" strokeLinecap="round" />
      <ellipse cx="174" cy="88" rx="5.5" ry="3" fill="#FFB6A3" opacity="0.5" />
      <ellipse cx="205" cy="88" rx="5.5" ry="3" fill="#FFB6A3" opacity="0.5" />
      <text x="148" y="38" fontSize="16" opacity="0.7">🦋</text>
      <text x="50"  y="48" fontSize="14" opacity="0.55">✨</text>
      <text x="248" y="52" fontSize="13" opacity="0.55">⭐</text>
      <text x="148" y="150" fontSize="14" opacity="0.65">💗</text>
    </svg>
  )
}

/* ── 신장 ── */
function Kidney() {
  return (
    <svg viewBox="0 0 320 160" width="100%" height="160">
      <BgDeco />
      {/* 오른쪽 신장 */}
      <path d="M88 42 Q62 42 58 80 Q54 118 80 132 Q98 140 110 128 Q125 114 118 95 Q128 88 128 72 Q128 42 108 38 Q98 36 88 42Z"
        fill="#C8A0D8" stroke="#A070B8" strokeWidth="2" />
      <path d="M88 54 Q70 55 67 82 Q64 110 84 122 Q97 128 107 118 Q118 107 112 92 Q120 85 120 72 Q120 52 103 50Z"
        fill="#DEC0E8" opacity="0.65" />
      {/* 오른쪽 얼굴 */}
      <circle cx="84" cy="85" r="3.5" fill="#6030A0" />
      <circle cx="100" cy="85" r="3.5" fill="#6030A0" />
      <path d="M82 95 Q92 103 104 95" stroke="#6030A0" strokeWidth="2" fill="none" strokeLinecap="round" />
      <ellipse cx="78" cy="92" rx="5.5" ry="3" fill="#FFB6A3" opacity="0.5" />
      <ellipse cx="107" cy="92" rx="5.5" ry="3" fill="#FFB6A3" opacity="0.5" />
      {/* 왼쪽 신장 */}
      <path d="M232 42 Q258 42 262 80 Q266 118 240 132 Q222 140 210 128 Q195 114 202 95 Q192 88 192 72 Q192 42 212 38 Q222 36 232 42Z"
        fill="#C8A0D8" stroke="#A070B8" strokeWidth="2" />
      <path d="M232 54 Q250 55 253 82 Q256 110 236 122 Q223 128 213 118 Q202 107 208 92 Q200 85 200 72 Q200 52 217 50Z"
        fill="#DEC0E8" opacity="0.65" />
      {/* 왼쪽 얼굴 */}
      <circle cx="216" cy="85" r="3.5" fill="#6030A0" />
      <circle cx="236" cy="85" r="3.5" fill="#6030A0" />
      <path d="M214 95 Q226 103 238 95" stroke="#6030A0" strokeWidth="2" fill="none" strokeLinecap="round" />
      <ellipse cx="211" cy="92" rx="5.5" ry="3" fill="#FFB6A3" opacity="0.5" />
      <ellipse cx="241" cy="92" rx="5.5" ry="3" fill="#FFB6A3" opacity="0.5" />
      {/* 가운데 결석 → 사라지는 별로 표현 */}
      <text x="148" y="78" fontSize="18" opacity="0.7">✨</text>
      <text x="52"  y="40" fontSize="13" opacity="0.55">⭐</text>
      <text x="254" y="40" fontSize="13" opacity="0.55">💜</text>
    </svg>
  )
}

/* ── 자궁 ── */
function Uterus() {
  return (
    <svg viewBox="0 0 320 160" width="100%" height="160">
      <BgDeco />
      {/* 자궁 몸통 */}
      <path d="M160 130 C160 130 108 120 102 85 C97 55 118 38 140 40 C148 40 155 44 160 50 C165 44 172 40 180 40 C202 38 223 55 218 85 C212 120 160 130 160 130Z"
        fill="#FFB3C6" stroke="#FF85A1" strokeWidth="2" />
      <path d="M160 118 C160 118 118 110 114 82 C110 58 126 46 142 48 C150 48 156 52 160 58 C164 52 170 48 178 48 C194 46 210 58 206 82 C202 110 160 118 160 118Z"
        fill="#FFCCD8" opacity="0.6" />
      {/* 나팔관 */}
      <path d="M102 72 Q75 65 62 52 Q55 44 60 38" stroke="#FFB3C6" strokeWidth="5" fill="none" strokeLinecap="round" />
      <circle cx="60" cy="36" r="9" fill="#FFD0DC" stroke="#FF85A1" strokeWidth="1.5" />
      <path d="M218 72 Q245 65 258 52 Q265 44 260 38" stroke="#FFB3C6" strokeWidth="5" fill="none" strokeLinecap="round" />
      <circle cx="260" cy="36" r="9" fill="#FFD0DC" stroke="#FF85A1" strokeWidth="1.5" />
      {/* 귀여운 얼굴 */}
      <circle cx="148" cy="82" r="4" fill="#C05070" />
      <circle cx="172" cy="82" r="4" fill="#C05070" />
      <circle cx="149.5" cy="80.5" r="1.8" fill="#fff" />
      <circle cx="173.5" cy="80.5" r="1.8" fill="#fff" />
      <path d="M147 94 Q160 103 173 94" stroke="#C05070" strokeWidth="2.2" fill="none" strokeLinecap="round" />
      <ellipse cx="140" cy="90" rx="6.5" ry="3.5" fill="#FFB6A3" opacity="0.5" />
      <ellipse cx="180" cy="90" rx="6.5" ry="3.5" fill="#FFB6A3" opacity="0.5" />
      <text x="142" y="152" fontSize="14" opacity="0.7">💗</text>
      <text x="52"  y="42" fontSize="13" opacity="0.55">✨</text>
      <text x="252" y="42" fontSize="13" opacity="0.55">⭐</text>
    </svg>
  )
}

/* ── 편도선 ── */
function Tonsil() {
  return (
    <svg viewBox="0 0 320 160" width="100%" height="160">
      <BgDeco />
      {/* 목구멍 배경 */}
      <path d="M110 30 Q80 35 75 80 Q72 120 100 140 Q130 155 160 155 Q190 155 220 140 Q248 120 245 80 Q240 35 210 30 Z"
        fill="#FFE0E8" stroke="#FFB3C0" strokeWidth="2" opacity="0.5" />
      {/* 왼쪽 편도선 */}
      <ellipse cx="118" cy="88" rx="28" ry="36" fill="#FFB3C6" stroke="#FF85A1" strokeWidth="2" />
      <ellipse cx="116" cy="85" rx="18" ry="24" fill="#FFCCD8" opacity="0.65" />
      {/* 왼쪽 얼굴 */}
      <circle cx="112" cy="84" r="3.5" fill="#C05070" />
      <circle cx="125" cy="84" r="3.5" fill="#C05070" />
      <path d="M110 95 Q118.5 102 128 95" stroke="#C05070" strokeWidth="2" fill="none" strokeLinecap="round" />
      <ellipse cx="107" cy="91" rx="5" ry="3" fill="#FFB6A3" opacity="0.5" />
      <ellipse cx="131" cy="91" rx="5" ry="3" fill="#FFB6A3" opacity="0.5" />
      {/* 오른쪽 편도선 */}
      <ellipse cx="202" cy="88" rx="28" ry="36" fill="#FFB3C6" stroke="#FF85A1" strokeWidth="2" />
      <ellipse cx="204" cy="85" rx="18" ry="24" fill="#FFCCD8" opacity="0.65" />
      {/* 오른쪽 얼굴 */}
      <circle cx="195" cy="84" r="3.5" fill="#C05070" />
      <circle cx="208" cy="84" r="3.5" fill="#C05070" />
      <path d="M193 95 Q201.5 102 212 95" stroke="#C05070" strokeWidth="2" fill="none" strokeLinecap="round" />
      <ellipse cx="190" cy="91" rx="5" ry="3" fill="#FFB6A3" opacity="0.5" />
      <ellipse cx="214" cy="91" rx="5" ry="3" fill="#FFB6A3" opacity="0.5" />
      <text x="148" y="58" fontSize="16" opacity="0.65">✨</text>
      <text x="50"  y="50" fontSize="14" opacity="0.55">⭐</text>
      <text x="252" y="50" fontSize="13" opacity="0.55">💗</text>
    </svg>
  )
}

/* ── 유방 ── */
function Breast() {
  return (
    <svg viewBox="0 0 320 160" width="100%" height="160">
      <BgDeco />
      {/* 분홍 리본 (유방암 인식 리본) */}
      <path d="M160 28 C148 28 132 38 132 52 C132 62 142 68 160 78 C178 68 188 62 188 52 C188 38 172 28 160 28Z" fill="#FF85A1" opacity="0.85" />
      <path d="M132 52 C120 62 118 80 128 90 C138 100 148 95 160 85" stroke="#FF85A1" strokeWidth="8" fill="none" strokeLinecap="round" />
      <path d="M188 52 C200 62 202 80 192 90 C182 100 172 95 160 85" stroke="#FF85A1" strokeWidth="8" fill="none" strokeLinecap="round" />
      <circle cx="160" cy="86" r="10" fill="#FF85A1" />
      {/* 리본 반짝임 */}
      <circle cx="148" cy="48" r="4" fill="#fff" opacity="0.5" />
      <circle cx="160" cy="34" r="3" fill="#fff" opacity="0.4" />
      {/* 치유 메시지 */}
      <text x="50"  y="130" fontSize="22" opacity="0.7">💗</text>
      <text x="242" y="130" fontSize="22" opacity="0.7">💗</text>
      <text x="148" y="148" fontSize="14" opacity="0.65">함께할게요</text>
      <text x="52"  y="48" fontSize="14" opacity="0.55">✨</text>
      <text x="252" y="48" fontSize="13" opacity="0.55">⭐</text>
    </svg>
  )
}

/* ── 전립선 ── */
function Prostate() {
  return (
    <svg viewBox="0 0 320 160" width="100%" height="160">
      <BgDeco />
      {/* 전립선 (밤/도토리 모양) */}
      <ellipse cx="160" cy="82" rx="58" ry="52" fill="#C8A882" stroke="#A07848" strokeWidth="2" />
      <ellipse cx="160" cy="78" rx="45" ry="38" fill="#DDB992" opacity="0.65" />
      {/* 가운데 요도 */}
      <ellipse cx="160" cy="82" rx="8" ry="20" fill="#F5E8D0" stroke="#C09050" strokeWidth="1.5" />
      {/* 귀여운 얼굴 */}
      <circle cx="145" cy="76" r="4" fill="#7A5030" />
      <circle cx="175" cy="76" r="4" fill="#7A5030" />
      <circle cx="146.5" cy="74.5" r="1.8" fill="#fff" />
      <circle cx="176.5" cy="74.5" r="1.8" fill="#fff" />
      <path d="M144 88 Q160 97 176 88" stroke="#7A5030" strokeWidth="2.2" fill="none" strokeLinecap="round" />
      <ellipse cx="137" cy="85" rx="6.5" ry="3.5" fill="#FFB6A3" opacity="0.5" />
      <ellipse cx="183" cy="85" rx="6.5" ry="3.5" fill="#FFB6A3" opacity="0.5" />
      <text x="52"  y="45" fontSize="14" opacity="0.55">✨</text>
      <text x="252" y="45" fontSize="13" opacity="0.55">⭐</text>
      <text x="148" y="152" fontSize="14" opacity="0.65">💛</text>
    </svg>
  )
}

/* ── 복부/탈장/치질 ── */
function Abdomen() {
  return (
    <svg viewBox="0 0 320 160" width="100%" height="160">
      <BgDeco />
      {/* 배 실루엣 */}
      <ellipse cx="160" cy="90" rx="85" ry="60" fill="#FFE8C8" stroke="#F0C898" strokeWidth="2" />
      <ellipse cx="160" cy="85" rx="65" ry="44" fill="#FFF0DC" opacity="0.7" />
      {/* 배꼽 */}
      <ellipse cx="160" cy="88" rx="10" ry="8" fill="#F0C898" stroke="#D4A878" strokeWidth="1.5" />
      <ellipse cx="160" cy="88" rx="6" ry="5" fill="#E8B888" />
      {/* 귀여운 얼굴 */}
      <circle cx="140" cy="72" r="5" fill="#C08030" />
      <circle cx="180" cy="72" r="5" fill="#C08030" />
      <circle cx="141.5" cy="70.5" r="2.2" fill="#fff" />
      <circle cx="181.5" cy="70.5" r="2.2" fill="#fff" />
      <path d="M138 84 Q160 96 182 84" stroke="#C08030" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <ellipse cx="130" cy="80" rx="7.5" ry="4" fill="#FFB6A3" opacity="0.5" />
      <ellipse cx="190" cy="80" rx="7.5" ry="4" fill="#FFB6A3" opacity="0.5" />
      <text x="52"  y="42" fontSize="14" opacity="0.55">✨</text>
      <text x="252" y="42" fontSize="13" opacity="0.55">⭐</text>
      <text x="148" y="158" fontSize="14" opacity="0.65">💛</text>
    </svg>
  )
}

/* ── 일반 (기본) ── */
function General() {
  return (
    <svg viewBox="0 0 320 160" width="100%" height="160">
      <BgDeco />
      {/* 의료 가방 */}
      <rect x="110" y="55" width="100" height="80" rx="16" fill="#fff" stroke="#C4DBA0" strokeWidth="2.5" />
      <rect x="130" y="44" width="60" height="22" rx="11" fill="#EAF3DE" stroke="#C4DBA0" strokeWidth="2" />
      {/* 십자 */}
      <rect x="148" y="76" width="24" height="7" rx="3.5" fill="#7BBF3A" />
      <rect x="155.5" y="68.5" width="7" height="24" rx="3.5" fill="#7BBF3A" />
      {/* 청진기 */}
      <path d="M228 42 Q248 42 248 62 Q248 82 228 82 Q215 82 215 95" stroke="#3B6D11" strokeWidth="3.5" fill="none" strokeLinecap="round" />
      <circle cx="215" cy="100" r="9" fill="#3B6D11" />
      <circle cx="215" cy="100" r="5.5" fill="#7BBF3A" />
      <circle cx="228" cy="38" r="6" fill="#3B6D11" />
      <circle cx="248" cy="38" r="6" fill="#3B6D11" />
      {/* 하트 */}
      <text x="62"  y="75" fontSize="20" opacity="0.7">💚</text>
      <text x="268" y="32" fontSize="13" opacity="0.7">✨</text>
      <text x="44"  y="42" fontSize="11" opacity="0.55">⭐</text>
    </svg>
  )
}

/* ── 메인 컴포넌트 ── */
const ILLUSTRATIONS = {
  gallbladder: Gallbladder,
  heart: Heart,
  joint: Joint,
  spine: Spine,
  eye: Eye,
  stomach: Stomach,
  intestine: Intestine,
  thyroid: Thyroid,
  kidney: Kidney,
  uterus: Uterus,
  tonsil: Tonsil,
  breast: Breast,
  prostate: Prostate,
  abdomen: Abdomen,
  general: General,
}

export default function OverviewIllustration({ surgeryName }) {
  const key = getCategory(surgeryName)
  const Illustration = ILLUSTRATIONS[key]

  return (
    <div className="w-full rounded-2xl overflow-hidden"
      style={{ backgroundColor: '#F4F9EF', border: '1px solid #D4E8BF', height: 160 }}>
      <Illustration />
    </div>
  )
}
