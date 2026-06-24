const QUESTIONS = [
  {
    q: "What is the core failure that defines Excessive Agency (LLM06:2025)?",
    options: [
      "The LLM generates inaccurate or hallucinated responses",
      "An AI system is granted more functionality, permissions, or autonomy than its task requires",
      "The LLM's system prompt is leaked to external users",
      "The LLM processes more tokens than its context window allows"
    ],
    correct: 1,
    right: "Correct. LLM06 is specifically about the system around the model — not the model's accuracy. An agent with more power than its task requires becomes dangerous the moment an attacker (or a bad prompt) steers it.",
    wrong: "LLM06 is not about accuracy or leakage. It's about an AI system having more functionality, permissions, or autonomy than its task requires — so that when something goes wrong, the damage is far greater than it should be."
  },
  {
    q: "CVE-2025-53773 (GitHub Copilot) demonstrated what attack chain?",
    options: [
      "SQL injection via LLM-generated queries run against the developer's local database",
      "Indirect prompt injection in source files → agent disables confirmations → downloads malware → C2 connection",
      "Training data poisoning that caused Copilot to suggest vulnerable code patterns",
      "OAuth token theft via Copilot's autocomplete feature"
    ],
    correct: 1,
    right: "Correct. The attack chain: malicious instructions hidden in a code comment → Copilot adds 'chat.tools.autoApprove': true to VS Code settings (disabling all confirmations) → Copilot downloads malware and connects to a C2 server. Invisible Unicode characters hid the payload from human review.",
    wrong: "CVE-2025-53773 was an indirect injection → excessive autonomy chain. A code comment told Copilot to disable its own confirmation dialogs, then execute shell commands. Once confirmations were off, every subsequent action required no human approval — full RCE with no user interaction beyond the initial file open."
  },
  {
    q: "In the MCPoison vulnerability (CVE-2025-54136), where were malicious instructions hidden?",
    options: [
      "Inside encrypted model weights downloaded from a compromised repository",
      "Within MCP server tool descriptions that were injected directly into the agent's context window",
      "Inside the system prompt of the orchestrating LLM application",
      "In API response headers that the agent logged but did not display to users"
    ],
    correct: 1,
    right: "Correct. MCP servers register tools by sending names and descriptions to the agent. Those descriptions land directly in the model's context window as trusted instructions. An attacker controlling an MCP server embeds malicious directives in those descriptions — invisible to the user in the tool list, but fully visible and executable by the model.",
    wrong: "MCPoison exploited MCP tool descriptions. When an MCP server registers a tool, it sends a description that goes straight into the model's context window. An attacker controlling the server embeds malicious instructions there — the agent treats them as system commands and executes them with full ambient authority."
  },
  {
    q: "What is the 'confused deputy' attack pattern in the context of Excessive Agency?",
    options: [
      "An LLM that gives contradictory answers to the same question asked in different ways",
      "A low-privilege user instructs the agent to perform actions the user cannot do directly, exploiting the agent's elevated credentials",
      "An agent that fails to distinguish between user messages and system prompt instructions",
      "A multi-agent pipeline where one agent misinterprets instructions from another"
    ],
    correct: 1,
    right: "Correct. The confused deputy problem: a low-privilege user tells the agent to take an action. The agent uses its own admin-scoped credentials to do it. The downstream system sees a request from the agent (trusted, admin) — not from the user (untrusted, low-privilege). Access controls are bypassed because authorization was delegated to the agent.",
    wrong: "Confused deputy: the agent has higher privileges than the user directing it. The user instructs the agent to do something the user's own account couldn't do. The agent, with admin credentials, complies. The downstream system never checks whether the actual user was permitted — it only sees the agent's trusted credentials."
  },
  {
    q: "The Slack AI data exfiltration (August 2024) is an example of which Excessive Agency failure?",
    options: [
      "Excessive permissions — the agent used admin OAuth tokens instead of read-only scope",
      "Excessive functionality — the model had access to the full channel history when the task only required the current channel",
      "Excessive autonomy — Slack AI sent messages without user confirmation",
      "MCP tool poisoning — an attacker modified Slack's tool descriptions"
    ],
    correct: 1,
    right: "Correct. Slack AI had access to the user's full channel history — far more data than summarizing a single conversation requires. An attacker planted instructions in any public channel message. When Slack AI processed the context, it had private DMs and secrets available, encoded them into clickable URLs, and sent them to the attacker. Scope the data, scope the blast radius.",
    wrong: "The Slack AI incident is primarily excessive functionality: the model had access to all channels when it only needed the current one. That broad data access is what the attacker exploited via indirect injection — planting instructions in a public message, then harvesting private data the model had no business touching."
  },
  {
    q: "OWASP's first official LLM06 scenario involves an email plugin. What is the root fix?",
    options: [
      "Add rate limiting so the agent can only send 10 emails per hour",
      "Use a read-only email plugin and authenticate with a read-only OAuth scope — making send physically impossible",
      "Add a system prompt instruction telling the agent never to forward emails",
      "Scan outgoing emails for sensitive content before allowing them to send"
    ],
    correct: 1,
    right: "Correct. The fix is architectural, not instructional. A system prompt saying 'don't send emails' can be overridden by a sufficiently crafted prompt injection. The only reliable fix is using a plugin that physically cannot send, backed by an OAuth scope that physically cannot send. You cannot prompt-engineer your way out of excessive functionality.",
    wrong: "Telling the agent not to send via a system prompt is not a reliable fix — prompt injection can override instructions. OWASP's recommended fix is to use a plugin that only implements mail-reading and authenticate with a read-only OAuth scope. That way, send is architecturally impossible, not just instructed away."
  },
  {
    q: "Why should sub-agents in a multi-agent pipeline NOT inherit the orchestrator's full credentials?",
    options: [
      "Sub-agents cannot process credentials securely due to context length limitations",
      "A single compromised orchestrator would give the attacker admin access across all sub-agents and their connected systems simultaneously",
      "Passing credentials between agents violates OAuth specifications",
      "Sub-agents use different authentication protocols than orchestrators"
    ],
    correct: 1,
    right: "Correct. Credential inheritance means one compromise becomes many. If an attacker hijacks the orchestrator (via injection or supply chain), they inherit its credentials — and can direct sub-agents to act across all connected systems at once. Each agent junction should be a privilege boundary: sub-agents receive task-scoped credentials, not parent credentials.",
    wrong: "Credential inheritance is an Excessive Agency amplifier. One compromised orchestrator with inherited admin credentials can direct sub-agents to act across all connected systems simultaneously. Each agent junction should be a privilege boundary — sub-agents receive only the minimum credentials needed for their specific task."
  },
  {
    q: "M4 (External Authorization Enforcement) says downstream systems must independently verify access. Which scenario does this prevent?",
    options: [
      "An agent that generates SQL queries with syntax errors that the database rejects",
      "A low-privilege user directing the agent to delete records the user cannot delete directly, because the agent's admin credentials are used",
      "An agent that exceeds its rate limit on a downstream API",
      "An agent that reads sensitive data and includes it verbatim in its response"
    ],
    correct: 1,
    right: "Correct. External authorization enforcement prevents confused-deputy attacks: even if the agent decides an action is authorized, the downstream system independently checks whether the requesting user's account is permitted. The agent's admin credentials are irrelevant — the downstream system evaluates the user's entitlements, not the agent's.",
    wrong: "M4 targets the confused-deputy pattern: an agent using its elevated credentials to perform actions a low-privilege user directed. External authorization enforcement means the downstream system checks the user's permissions independently — it ignores the agent's own credential level and asks 'is this user allowed to do this?'"
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
    msg.textContent = 'Excellent. You know LLM06 cold.';
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
