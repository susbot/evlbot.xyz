const QUESTIONS = [
  {
    q: "What is the core failure that defines Improper Output Handling (LLM05:2025)?",
    options: [
      "The LLM produces biased or incorrect answers",
      "LLM output is passed to a downstream system without validation or sanitization for that context",
      "The system prompt leaks through model responses",
      "Users send more requests than the system can handle"
    ],
    correct: 1,
    right: "Correct. LLM05 is specifically about what happens to LLM output after it's generated — when it reaches a browser, database, shell, or API without being made safe for that context first.",
    wrong: "LLM05 is not about model accuracy or system prompts. It's about the application's failure to validate or sanitize LLM output before passing it to a downstream system like a browser, database, or shell."
  },
  {
    q: "CVE-2023-29374 affected LangChain and received a CVSS score of 9.8. What was the root cause?",
    options: [
      "LangChain's training data contained malware",
      "LLM-generated Python expressions were passed to exec() without sandboxing",
      "LangChain's API keys were exposed in logs",
      "The LLM hallucinated SQL queries that dropped database tables"
    ],
    correct: 1,
    right: "Correct. LangChain's LLMMathChain passed model output directly to Python's exec() to evaluate math expressions. A prompt injection attack caused the model to produce malicious code instead, achieving full RCE on the host.",
    wrong: "CVE-2023-29374 was an exec() vulnerability: LangChain passed LLM-generated text to Python's exec() without sandboxing. An attacker manipulated the model's output to include OS commands, achieving CVSS 9.8 RCE."
  },
  {
    q: "In CVE-2024-5565 (Vanna.AI, CVSS 9.2), what attack chain did JFrog researchers demonstrate?",
    options: [
      "SQL injection → training data poisoning → model backdoor",
      "Prompt injection → LLM generates malicious Plotly code → exec() → OS command execution",
      "SSRF → cloud metadata exfiltration → API key theft",
      "XSS → cookie theft → account takeover in Vanna.AI's web dashboard"
    ],
    correct: 1,
    right: "Correct. Vanna.AI's ask() function generated SQL then generated Plotly visualization code from the results. Both outputs were injectable, and the Plotly code was passed to exec(). JFrog chained prompt injection → SQL → Plotly Python → exec() to achieve full RCE.",
    wrong: "Vanna.AI's vulnerability was a multi-step chain: prompt injection caused the LLM to generate malicious Plotly Python code, which was then executed via exec() — achieving OS-level RCE on the host. This is a textbook LLM05 failure: multiple downstream outputs, none sanitized."
  },
  {
    q: "A developer renders LLM responses using innerHTML instead of textContent. Which mitigation does this violate?",
    options: [
      "M4 — Sandbox Execution",
      "M2 — Context-Aware Output Encoding",
      "M7 — Least Privilege",
      "M3 — Parameterized Queries"
    ],
    correct: 1,
    right: "Correct. M2 (Context-Aware Output Encoding) requires that HTML output be encoded or sanitized before DOM insertion. Using innerHTML on LLM text directly inserts it as HTML, allowing any script tags or event handlers the model produced to execute.",
    wrong: "This violates M2 — Context-Aware Output Encoding. innerHTML treats LLM text as HTML, running any embedded scripts. The fix is textContent (escapes everything) or DOMPurify (allows safe HTML while stripping dangerous elements)."
  },
  {
    q: "An attacker prompts an LLM to generate a request to http://169.254.169.254/latest/meta-data/. The server fetches it. What attack is this?",
    options: [
      "SQL injection",
      "Cross-Site Scripting (XSS)",
      "Server-Side Request Forgery (SSRF)",
      "Path traversal"
    ],
    correct: 2,
    right: "Correct. This is SSRF — the attacker steers the LLM to generate an internal URL, and the server fetches it from inside the cloud environment. The AWS metadata endpoint at 169.254.169.254 returns temporary IAM credentials when fetched from within an EC2 instance.",
    wrong: "This is SSRF (Server-Side Request Forgery). The attacker uses the LLM as an amplifier to make the server fetch an internal URL — the AWS metadata endpoint at 169.254.169.254 — that would be inaccessible from outside the cloud environment."
  },
  {
    q: "Why does OWASP recommend SELECT-only database roles for LLM-connected services?",
    options: [
      "SELECT queries are faster and reduce server load",
      "LLMs can only understand SELECT syntax",
      "It limits blast radius: even if SQL injection succeeds, the attacker cannot write, delete, or escalate to shell execution via the DB role",
      "SELECT-only roles prevent the LLM from generating invalid SQL"
    ],
    correct: 2,
    right: "Correct. Least privilege (M7) limits what an attacker achieves even when output sanitization fails. If the DB role can only SELECT, an injected UNION attack leaks data but cannot delete records or — critically — use database-host command execution features like PostgreSQL's COPY FROM PROGRAM.",
    wrong: "SELECT-only roles implement least privilege (M7). Even if SQL injection succeeds, restricting the DB role prevents writes, deletes, and most critically, prevents escalation to RCE via database-host command execution (PostgreSQL COPY FROM PROGRAM, MSSQL xp_cmdshell, etc.) — exactly what made CVE-2024-5565 a CVSS 9.2."
  },
  {
    q: "How does LLM05 (Improper Output Handling) differ from LLM01 (Prompt Injection)?",
    options: [
      "They are the same vulnerability described from different perspectives",
      "LLM01 is about manipulating the model's input behavior; LLM05 is about the application's failure to handle the model's output safely",
      "LLM05 only applies to code-generation models; LLM01 applies to chat models",
      "LLM01 requires attacker access to the system prompt; LLM05 does not"
    ],
    correct: 1,
    right: "Correct. LLM01 targets the model's behavior — making it do something it shouldn't. LLM05 targets the application layer — what happens after the model outputs something. A prompt injection (LLM01) might produce a malicious output that then exploits an LLM05 weakness, but LLM05 can trigger without any injection at all.",
    wrong: "LLM01 is an input-side failure: attacker manipulates what the model does. LLM05 is an output-side failure: the application doesn't sanitize what the model produces before passing it downstream. They often chain together but are distinct failure points requiring different defenses."
  },
  {
    q: "A Content Security Policy (CSP) header helps defend against LLM05. Which attack does it primarily mitigate?",
    options: [
      "SQL injection via LLM-generated queries",
      "RCE via exec() on LLM-generated code",
      "XSS — by instructing the browser not to execute inline scripts even if they appear in rendered LLM output",
      "SSRF — by blocking server-side requests to internal IPs"
    ],
    correct: 2,
    right: "Correct. CSP is a browser-side control. A policy like script-src 'self' blocks inline script execution, meaning that even if an attacker's payload slips through server-side output encoding and appears in the HTML, the browser refuses to run it. It's defense-in-depth for XSS from LLM output.",
    wrong: "CSP targets XSS specifically. It's a browser-enforced policy that blocks inline script execution — so even if a <script> tag or onerror= handler appears in LLM output and reaches the HTML, the browser won't run it. CSP doesn't help with SQL injection, RCE via exec(), or SSRF, which are server-side vulnerabilities."
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
      '<button class="option" id="opt-' + qi + '-' + oi + '" onclick="answer(' + qi + ',' + oi + ')">' + opt + '</button>'
    ).join('');
    card.innerHTML = '<div class="question-num">Question ' + (qi+1) + ' of ' + QUESTIONS.length + '</div>' +
      '<div class="question-text">' + q.q + '</div>' +
      '<div class="options">' + optHtml + '</div>' +
      '<div class="feedback" id="fb-' + qi + '"></div>';
    container.appendChild(card);
  });
}
function answer(qi, oi){
  if(answers[qi] !== null) return;
  answers[qi] = oi;
  const q = QUESTIONS[qi];
  const isRight = oi === q.correct;
  if(isRight) quizScore++;
  document.querySelectorAll('[id^="opt-' + qi + '-"]').forEach(o => o.disabled = true);
  document.getElementById('opt-' + qi + '-' + oi).classList.add(isRight ? 'correct' : 'wrong');
  if(!isRight) document.getElementById('opt-' + qi + '-' + q.correct).classList.add('correct');
  const fb = document.getElementById('fb-' + qi);
  fb.className = 'feedback show ' + (isRight ? 'correct' : 'wrong');
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
    msg.textContent = 'Excellent. You know LLM05 cold.';
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
