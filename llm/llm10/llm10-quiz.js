const QUESTIONS = [
  {
    q: "What is the official OWASP LLM10:2025 category name?",
    options: ["Model Denial of Service","Unbounded Consumption","Excessive Agency","Insecure Output Handling"],
    correct: 1,
    right: "Correct. LLM10:2025 is Unbounded Consumption — evolved from the 2023 list's narrower 'Model Denial of Service' to cover financial ruin, model theft, and degradation, not just crashes.",
    wrong: "LLM10:2025 is Unbounded Consumption. 'Model Denial of Service' was the 2023 name for this category — the 2025 version broadens it to cover Denial of Wallet, model extraction, and agentic loop exploitation, not just availability attacks."
  },
  {
    q: "In the Sourcegraph August 2023 incident, how did the attacker gain access to Sourcegraph's LLM API?",
    options: ["By exploiting a SQL injection vulnerability","By phishing a Sourcegraph employee","By using an admin access token accidentally committed to a public GitHub repository","By purchasing stolen credentials on a dark web market"],
    correct: 2,
    right: "Correct. A site-admin access token was accidentally committed to a public GitHub repo in July 2023 and sat there for roughly six weeks. The attacker found it, used it to build a free LLM proxy, and drove ~2 million API calls before Sourcegraph detected the spike.",
    wrong: "The attacker didn't use SQL injection or phishing. A site-admin access token was accidentally committed to a public GitHub repo and sat there for six weeks. That token gave admin-level access, which was used to build a proxy offering free LLM access to anyone."
  },
  {
    q: "What is the key difference between Denial of Service and Denial of Wallet in the context of LLM10?",
    options: ["DoS targets availability; Denial of Wallet targets financial cost without necessarily disrupting availability","DoS is illegal; Denial of Wallet is not","DoS only applies to self-hosted models; Denial of Wallet only applies to cloud APIs","There is no difference — both terms describe the same attack"],
    correct: 0,
    right: "Correct. DoS aims to crash or overwhelm the service so it becomes unavailable. Denial of Wallet leaves the service running but drives up the victim's API bill — often undetected until the invoice arrives.",
    wrong: "The key difference is the goal, not legality or hosting model. DoS targets availability — crash the server. Denial of Wallet leaves the service running but runs up the bill, often going undetected by availability monitoring."
  },
  {
    q: "Why is request-count rate limiting alone insufficient to prevent Denial of Wallet?",
    options: ["Because rate limiting is only effective against authenticated users","Because a small number of requests can each consume enormous token counts, generating massive costs within the allowed request budget","Because LLM providers ignore rate limits set by application developers","Because Denial of Wallet only works on APIs that don't support rate limiting"],
    correct: 1,
    right: "Correct. Ten requests per minute sounds reasonable — until each request submits a 50,000-token context window and forces a 10,000-token response. The request count is within limits; the token consumption is not. Token-aware rate limiting is required.",
    wrong: "The issue isn't authentication or provider behavior. Ten allowed requests per minute can each consume 60,000 tokens — the request rate is fine; the token consumption is catastrophic. Effective rate limiting must be tied to cumulative token usage, not just request count."
  },
  {
    q: "CVE-2019-20634 (Proof Pudding) demonstrated which LLM10 attack type?",
    options: ["Context window flooding via oversized input","Reasoning loop exploitation in an agentic pipeline","Model extraction via systematic API probe queries","Denial of Wallet via crafted output-maximizing prompts"],
    correct: 2,
    right: "Correct. Pearce and Landers queried Proofpoint's email filter API systematically, collecting input/output pairs (email content and filter scores), and used them to train a copy-cat model that could bypass the real filter. The unlimited probe queries were the LLM10 element.",
    wrong: "Proof Pudding (CVE-2019-20634) was a model extraction attack — not flooding or a DoW prompt. Researchers queried Proofpoint's email filter API in bulk, collected enough input/output pairs to train a copy-cat classifier, then used it to craft emails that bypassed the real filter. Unbounded query volume made this possible."
  },
  {
    q: "What did Nasr et al.'s repeated-token research (arXiv:2311.17035) demonstrate about resource consumption?",
    options: ["That token costs are always proportional to request complexity","That repeating a single token caused ChatGPT to enter an atypical generation mode, consuming disproportionate tokens per query","That output token limits are enforced automatically by all major LLM providers","That model extraction requires at least 100,000 queries to be effective"],
    correct: 1,
    right: "Correct. Repeating a token like 'poem' caused ChatGPT to diverge from aligned behavior and generate far more output than a normal query — including verbatim training data. The disproportionate token consumption per query was a key finding, not just the data leakage.",
    wrong: "Nasr et al. showed that sustained repetition of a single token caused ChatGPT to enter an atypical generation mode: more tokens per query than normal, and verbatim training data in the output. The resource consumption was disproportionate to the simplicity of the input — a key LLM10 finding."
  },
  {
    q: "Which mitigation specifically addresses runaway agentic pipelines?",
    options: ["M1 — Input Validation and Token Limits","M3 — Resource Consumption Quotas","M6 — Agentic Safeguards (step limits and execution timeouts)","M4 — API Gateway Controls and Budget Alerts"],
    correct: 2,
    right: "Correct. M6 — Agentic Safeguards — addresses the specific failure mode of agentic systems: no maximum step count, no execution timeout, no termination condition independent of the model's own decision to stop. A hard step limit (e.g., 20 steps) and wall-clock timeout are the primary controls.",
    wrong: "M6 — Agentic Safeguards — is the targeted control for runaway agentic pipelines. Input validation (M1) and quotas (M3) help but don't address the core problem: an agent with no step limit or timeout can loop forever on a single crafted task. M6 adds a hard termination condition independent of the model's own judgment."
  },
  {
    q: "Why does OWASP specify six mitigation categories for LLM10 instead of one definitive control?",
    options: ["Because OWASP requires a minimum of six controls per category","Because each attack type exploits a different missing ceiling — no single control covers all four attack patterns","Because the six controls are redundant and any one is sufficient on its own","Because six is the industry standard number of security controls for financial risk categories"],
    correct: 1,
    right: "Correct. Context window flooding needs an input ceiling (M1). Denial of Wallet needs a token-aware rate limit (M2) and budget alert (M4). Reasoning loop exploitation needs a step limit (M6). Model extraction needs a cumulative quota (M3). No one control covers all four — layered defenses are required.",
    wrong: "The six categories aren't redundant or a formatting convention. Each attack type exploits a different missing ceiling: M1 stops flooding but not agentic loops; M6 stops agentic loops but not DoW prompts. Effective defense requires closing all the ceilings — which is exactly what the six categories do."
  }
];
let answers = new Array(QUESTIONS.length).fill(null);
let quizScore = 0;
function buildQuiz(){
  const container = document.getElementById('quiz-container');
  container.innerHTML = '';
  quizScore = 0;
  answers = new Array(QUESTIONS.length).fill(null);
  QUESTIONS.forEach((q, qi) => {
    const card = document.createElement('div');
    card.className = 'question-card';
    card.id = 'q-' + qi;
    const optHtml = q.options.map((opt, oi) =>
      `<button class="option" id="opt-${qi}-${oi}" onclick="answer(${qi},${oi})">${opt}</button>`
    ).join('');
    card.innerHTML = `<div class="question-num">Question ${qi+1} of ${QUESTIONS.length}</div>
      <div class="question-text">${q.q}</div>
      <div class="options">${optHtml}</div>
      <div class="feedback" id="fb-${qi}"></div>`;
    container.appendChild(card);
  });
}
function answer(qi, oi){
  if(answers[qi] !== null) return;
  answers[qi] = oi;
  const q = QUESTIONS[qi];
  const isRight = oi === q.correct;
  if(isRight) quizScore++;
  document.querySelectorAll(`[id^="opt-${qi}-"]`).forEach(o => o.disabled = true);
  document.getElementById(`opt-${qi}-${oi}`).classList.add(isRight ? 'correct' : 'wrong');
  if(!isRight) document.getElementById(`opt-${qi}-${q.correct}`).classList.add('correct');
  const fb = document.getElementById(`fb-${qi}`);
  fb.className = `feedback show ${isRight ? 'correct' : 'wrong'}`;
  fb.textContent = (isRight ? '✓ ' : '✗ ') + (isRight ? q.right : q.wrong);
  if(answers.every(a => a !== null)) setTimeout(showQuizResult, 600);
}
function showQuizResult(){
  document.getElementById('quiz-container').style.display = 'none';
  document.getElementById('quiz-result').style.display = 'block';
  document.getElementById('score-display').textContent = quizScore + '/8';
  const msg = document.getElementById('score-msg');
  const btn = document.getElementById('btn-finish');
  if(quizScore >= 7){
    msg.style.cssText = 'background:rgba(16,185,129,.08);border:1px solid rgba(16,185,129,.2);color:var(--green)';
    msg.textContent = 'Excellent. You know LLM10 cold.';
    btn.style.display = 'block';
  } else if(quizScore >= 5){
    msg.style.cssText = 'background:rgba(245,158,11,.08);border:1px solid rgba(245,158,11,.2);color:var(--yellow)';
    msg.textContent = 'Good. Review the questions you missed, then move on.';
    btn.style.display = 'block';
  } else {
    msg.style.cssText = 'background:rgba(244,63,94,.08);border:1px solid rgba(244,63,94,.2);color:var(--red)';
    msg.textContent = 'Go back through Parts 1–4 and retake when ready.';
  }
}
function retakeQuiz(){
  document.getElementById('quiz-container').style.display = 'block';
  document.getElementById('quiz-result').style.display = 'none';
  buildQuiz();
}

buildQuiz();
