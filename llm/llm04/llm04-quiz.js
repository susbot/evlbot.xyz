const QUESTIONS = [
  {
    q: "What is the official OWASP LLM04:2025 category name?",
    options: ["Supply Chain","Data and Model Poisoning","Prompt Injection","Sensitive Information Disclosure"],
    correct: 1,
    right: "Correct. LLM04:2025 is Data and Model Poisoning — manipulating training, fine-tuning, or embedding data to introduce vulnerabilities, backdoors, or biases.",
    wrong: "LLM04:2025 is Data and Model Poisoning. Supply Chain is LLM03, Prompt Injection is LLM01, and Sensitive Information Disclosure is LLM02 — related, but not this category."
  },
  {
    q: "How did PoisonGPT get its false facts into the GPT-J-6B model?",
    options: ["A SQL injection against Hugging Face","ROME — surgically editing specific facts in the model's weights","A jailbreak prompt sent at runtime","Stealing OpenAI's training data"],
    correct: 1,
    right: "Correct. Mithril Security used ROME (Rank-One Model Editing) to rewrite targeted facts directly in the weights, then re-uploaded the model under a typosquatted publisher name.",
    wrong: "PoisonGPT used ROME (Rank-One Model Editing) to edit facts directly in the model's weights — not a SQL injection, a runtime jailbreak, or stolen data. The poison was baked into the model, then distributed via a typosquatted Hugging Face repo."
  },
  {
    q: "In Anthropic's 2025 study, roughly how many malicious documents were enough to backdoor models up to 13B parameters?",
    options: ["About 250","About 250,000","25% of the dataset","It scaled with model size"],
    correct: 0,
    right: "Correct. As few as ~250 documents (about 0.00016% of training tokens) reliably planted the backdoor — 100 was not enough, 250 was.",
    wrong: "The number was about 250 documents — a near-constant absolute count, not a percentage and not something that grew with model size. That's exactly what made the finding alarming."
  },
  {
    q: "What was the key, counterintuitive finding of Anthropic's poisoning study?",
    options: ["Bigger models need proportionally more poison","The amount of poison needed is near-constant regardless of model size","Poisoning only works on models under 1B parameters","Poison is automatically filtered out at scale"],
    correct: 1,
    right: "Correct. The number of poison documents needed stayed near-constant from 600M to 13B parameters — a 13B model trained on 20x more data was no harder to poison.",
    wrong: "The finding was that the poison count is near-constant regardless of model size. A larger model and larger dataset did NOT require proportionally more poisoned documents — which is why 'our dataset is huge' is no defense."
  },
  {
    q: "Carlini's 'split-view' poisoning exploits which fact about web-scale datasets?",
    options: ["They are encrypted at rest","They store URLs, not the actual content, so the data behind a link can change","They are never updated after release","They require a password to download"],
    correct: 1,
    right: "Correct. Datasets reference URLs rather than storing content. Buy an expired domain a dataset still points to, swap the content, and later downloaders get your poison — for around $60 to hit 0.01% of LAION-400M.",
    wrong: "Split-view poisoning works because datasets store URLs, not the content itself. An attacker who controls a domain the dataset references can change what's served — so the data downloaded later differs from what was originally indexed."
  },
  {
    q: "Why is Microsoft Tay (2016) considered a poisoning incident?",
    options: ["Its source code was stolen and modified","It learned in real time from malicious user interactions, which corrupted its behavior","Attackers replaced its model file on a server","It was trained on a typosquatted dataset"],
    correct: 1,
    right: "Correct. Tay learned from live Twitter replies. A coordinated group fed it toxic content, and because that was its training signal, it began producing the same — poisoned in about 16 hours.",
    wrong: "Nobody breached Microsoft's servers or stole code. Tay was poisoned through its own learning loop: malicious user input was its training signal, so feeding it toxic content corrupted its outputs."
  },
  {
    q: "Why can't you simply test a model to confirm it isn't poisoned?",
    options: ["Testing is too expensive to run","A backdoored model behaves normally until the secret trigger appears, so it passes ordinary tests","Poisoning always crashes the model, so any working model is clean","Tests can only check for prompt injection"],
    correct: 1,
    right: "Correct. A backdoor stays dormant on every input without the trigger, so benchmarks and QA all come back green. This is the 'sleeper agent' problem — you must prevent poison going in, not test it out.",
    wrong: "The problem is that a backdoored model behaves normally on every input that lacks the trigger — so it passes ordinary tests cleanly. Detection requires adversarial, trigger-hunting testing plus prevention at the data layer."
  },
  {
    q: "Which OWASP LLM04 mitigation is specifically about tracking where data and models came from?",
    options: ["Retrieval-Augmented Generation","Data provenance — ML-BOM / CycloneDX / DVC","Red-team campaigns","Differential privacy"],
    correct: 1,
    right: "Correct. Provenance tracking — ML-BOM, OWASP CycloneDX, and Data Version Control — records origins and changes, which is what would have exposed PoisonGPT's fake lineage.",
    wrong: "Provenance tracking (ML-BOM, CycloneDX, DVC) is the origin-tracking mitigation. RAG grounds answers at inference, red-teaming hunts for triggers, and differential privacy protects training data — useful, but not about provenance."
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
    msg.textContent = 'Excellent. You know LLM04 cold.';
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
