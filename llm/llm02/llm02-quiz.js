const QUESTIONS = [
  {
    q: "What is the official OWASP LLM02:2025 category name?",
    options: ["Insecure Output Handling","Sensitive Information Disclosure","Prompt Injection","Data and Model Poisoning"],
    correct: 1,
    right: "Correct. LLM02:2025 is Sensitive Information Disclosure — the unintended exposure of private data, proprietary algorithms, or confidential details through an LLM's output.",
    wrong: "LLM02:2025 is Sensitive Information Disclosure. Interestingly, OWASP's own URL slug for this page still reads \"insecure-output-handling\" — a leftover from how the 2023/24 list was organized — but the current title and content are unambiguous about what this category covers."
  },
  {
    q: "OpenAI's March 2023 Redis bug exposed payment info for what share of ChatGPT Plus subscribers active during the affected window?",
    options: ["12%","1.2%","0.12%","25%"],
    correct: 1,
    right: "Correct. OpenAI's own disclosure put the number at 1.2% of ChatGPT Plus subscribers active during a specific nine-hour window — first/last name, email, payment address, and the last four digits of a card.",
    wrong: "OpenAI's disclosure put the number at 1.2% of ChatGPT Plus subscribers active during the nine-hour window — not 12%, and not a quarter of all users. The bug was real but narrowly scoped, and full card numbers were never exposed."
  },
  {
    q: "What did the Proof Pudding researchers (Pearce & Landers) actually do?",
    options: ["Stole Proofpoint's source code directly","Built a copy-cat ML model using exposed email scores to bypass spam filtering","Used SQL injection to access Proofpoint's database","Phished Proofpoint employees for credentials"],
    correct: 1,
    right: "Correct. By collecting scores from Proofpoint's email headers, Pearce and Landers trained their own classifier that mimicked Proofpoint's — then crafted emails engineered to score well against the real filter.",
    wrong: "Proof Pudding didn't touch Proofpoint's source code, database, or employees. It used exposed scoring output (model extraction) to build a copy-cat classifier — a textbook model inversion attack, which is exactly why OWASP cites it under Proprietary Algorithm Exposure."
  },
  {
    q: "Samsung's three 2023 ChatGPT leak incidents happened how long after the company lifted its internal ChatGPT ban?",
    options: ["About 6 months","About 20 days","Over a year","The ban was never lifted"],
    correct: 1,
    right: "Correct. Samsung's semiconductor division lifted its ChatGPT ban, and within roughly 20 days, three separate engineers had pasted confidential source code, defect-detection code, and meeting transcripts into the tool.",
    wrong: "Samsung's ban was lifted, and within about 20 days — not months — three separate engineers had already leaked confidential material. The speed is the lesson: without guidance in place immediately, the gap closes fast."
  },
  {
    q: "In the \"repeat the word poem forever\" attack, what actually made the technique work?",
    options: ["A jailbreak prompt that bypassed content filters","A SQL injection against OpenAI's database","Sustained repetition caused the model to diverge from aligned chat behavior into raw, memorized text","A stolen API key with elevated permissions"],
    correct: 2,
    right: "Correct. Repeating a single token caused ChatGPT to diverge from its normal aligned responses and start emitting verbatim text from its training data — no jailbreak prompt, no stolen credentials, just repetition.",
    wrong: "There was no SQL injection or stolen API key involved. The technique worked because sustained repetition caused the model to diverge from its aligned chat behavior, lapsing into raw, memorized training text — for about $200 in queries, researchers extracted 10,000+ verbatim examples."
  },
  {
    q: "How did the Slack AI attacker (PromptArmor, August 2024) exfiltrate data from a private channel they had no access to?",
    options: ["By guessing the channel's password","By posting a hidden instruction in a public channel that Slack AI later followed for a victim with private access","By exploiting a buffer overflow in Slack's servers","By impersonating a Slack administrator"],
    correct: 1,
    right: "Correct. The attacker planted an instruction in a public channel. When a victim with private-channel access later asked Slack AI to summarize messages, the model followed the planted instruction and rendered a link that exfiltrated private data through its query string.",
    wrong: "There's no password-guessing, buffer overflow, or impersonation here. The attacker planted an instruction in a public channel; Slack AI later followed it on behalf of a victim who did have private access — the model did the cross-boundary work for the attacker."
  },
  {
    q: "Which OWASP LLM02 mitigation category does differential privacy belong to?",
    options: ["Sanitization","Access Controls","Federated Learning and Privacy Techniques","Advanced Techniques"],
    correct: 2,
    right: "Correct. OWASP groups differential privacy with federated learning under \"Federated Learning and Privacy Techniques\" — both add distance between raw data and what the model can be queried for.",
    wrong: "Differential privacy sits under OWASP's \"Federated Learning and Privacy Techniques\" category, alongside federated learning itself — not Sanitization, Access Controls, or Advanced Techniques (which covers homomorphic encryption and tokenization instead)."
  },
  {
    q: "Why does OWASP list six mitigation categories instead of one definitive fix?",
    options: ["Because the categories are redundant and any one would suffice","Because sensitive info disclosure has multiple distinct failure points — app bugs, training pipelines, access scope, and user behavior — and no single control covers all of them","Because OWASP requires a minimum of six controls per category for formatting consistency","Because six is the average across all ten LLM risk categories"],
    correct: 1,
    right: "Correct. The incidents in this lesson show why: a caching bug, a model inversion attack, an employee paste, a training-data leak, and a prompt injection are five different failure mechanisms. One control — say, just input validation — would have stopped none of the other four.",
    wrong: "The six categories aren't redundant or a formatting convention. Sensitive info disclosure has distinct failure points across infrastructure, training pipelines, access scope, and user behavior — covering all of them requires layered, not single-point, defenses."
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
    msg.textContent = 'Excellent. You know LLM02 cold.';
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
