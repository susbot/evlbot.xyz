const QUESTIONS = [
  {
    q: "In Mata v. Avianca (2023), what happened when the attorneys asked ChatGPT to confirm the fabricated cases were real?",
    options: [
      "ChatGPT admitted it had fabricated the cases",
      "ChatGPT reaffirmed the cases and generated additional fabricated supporting detail",
      "ChatGPT refused to answer follow-up questions",
      "ChatGPT provided the correct real cases instead"
    ],
    correct: 1,
    right: "Correct. This is the overreliance loop in action: the model doubled down rather than expressing uncertainty, generating more fabricated material to support its original false output. The attorneys then filed that additional fabricated content too.",
    wrong: "ChatGPT reaffirmed the fabricated cases and produced more fabricated supporting detail when asked to confirm. This is the overreliance loop: model fabricates, user asks model to verify, model confirms the fabrication, user acts. It never admitted the cases were invented."
  },
  {
    q: "What is 'slopsquatting'?",
    options: [
      "A prompt injection technique that bypasses content filters",
      "Registering the package names LLMs consistently hallucinate in order to deliver malware",
      "A method for extracting training data from LLMs via repetition",
      "A SQL injection attack against LLM vector databases"
    ],
    correct: 1,
    right: "Correct. Slopsquatting is registering the names of packages that LLMs hallucinate consistently, turning a model quality failure into a supply-chain attack vector. Documented by Bar Lanyado at Vulcan Cyber in 2024.",
    wrong: "Slopsquatting (Vulcan Cyber, 2024) is registering hallucinated package names before developers can install what the LLM recommended. It converts LLM09 (Misinformation) into LLM03 (Supply Chain) with no technical exploit required."
  },
  {
    q: "What was the BC Civil Resolution Tribunal's ruling in Moffatt v. Air Canada (2024)?",
    options: [
      "Air Canada was not liable because the chatbot is a separate legal entity",
      "Air Canada was liable for the chatbot's incorrect policy information",
      "The ruling was dismissed for lack of jurisdiction",
      "The case settled before a ruling was issued"
    ],
    correct: 1,
    right: "Correct. The tribunal rejected Air Canada's 'separate legal entity' argument entirely. Air Canada is responsible for all information on its website, including chatbot output. This established precedent for LLM chatbot liability.",
    wrong: "The tribunal ruled Air Canada liable and rejected the 'separate legal entity' argument. You own every output your deployed LLM produces. Air Canada was awarded the fare difference plus fees to Moffatt."
  },
  {
    q: "According to Pearce et al. (2022, IEEE S&P), approximately what percentage of GitHub Copilot's security-sensitive code suggestions contained vulnerabilities?",
    options: ["5%", "40%", "15%", "75%"],
    correct: 1,
    right: "Correct. The NYU study found approximately 40% of Copilot's outputs for security-sensitive coding scenarios contained vulnerabilities — with no warning signal to the developer that the suggestion was dangerous.",
    wrong: "Pearce et al. found approximately 40% of Copilot's security-sensitive outputs were vulnerable. The study covered 89 security-relevant scenarios including SQL queries, memory management, and authentication patterns."
  },
  {
    q: "Why did OWASP merge 'Overreliance' into 'Misinformation' in the 2025 edition?",
    options: [
      "To reduce the total number of categories from 11 to 10",
      "Because they are two sides of the same problem: the model generates false output, and the user trusts it without verifying",
      "Because overreliance was reclassified as a UX problem, not a security risk",
      "Because newer models eliminated hallucination as a concern"
    ],
    correct: 1,
    right: "Correct. The 2025 edition merged them because they are interdependent: hallucination produces the false output, overreliance causes it to cause harm. Addressing only one leaves the other active. You need to address both halves.",
    wrong: "OWASP merged Overreliance into Misinformation because they are two halves of the same problem. The model produces false content (hallucination), the user acts on it without checking (overreliance). Neither alone explains the harm — both are required."
  },
  {
    q: "What single verification step breaks the slopsquatting attack path for npm packages?",
    options: [
      "Running a full malware scan on the package after install",
      "Running 'npm info <package-name>' before installing to confirm the package exists",
      "Only installing packages recommended by at least two different LLMs",
      "Reviewing the LLM's training data for the package name"
    ],
    correct: 1,
    right: "Correct. 'npm info <package-name>' confirms the package exists, shows its creation date, download count, and publisher — red flags are immediately visible for attacker-planted packages registered the week the LLM hallucinated the name.",
    wrong: "The defense is 'npm info <package-name>' before install — confirming the package actually exists. A package registered last week with zero downloads and no README is a red flag. A post-install malware scan would be too late."
  },
  {
    q: "Which OWASP mitigation most directly addresses the Air Canada chatbot incident?",
    options: [
      "M4 — Uncertainty Disclosure",
      "M1 — RAG grounded in the live policy database",
      "M5 — User Education",
      "M6 — SAST on generated code"
    ],
    correct: 1,
    right: "Correct. The Air Canada chatbot answered a policy question from model memory instead of the actual policy database. RAG grounding it to the live policy source would have returned the correct answer instead of an interpolated, wrong one.",
    wrong: "M1 (RAG) most directly addresses Air Canada: the chatbot gave wrong policy information because it answered from model memory rather than the live policy database. Grounding it to the actual policy document would have returned the correct bereavement fare policy."
  },
  {
    q: "What is the mechanistic reason LLMs hallucinate rather than admitting they don't know something?",
    options: [
      "LLMs are deliberately programmed to always produce an answer",
      "LLMs predict the most statistically likely next token, with no mechanism to distinguish learned facts from interpolated output",
      "LLMs suppress uncertainty to protect vendor reputation",
      "LLMs hallucinate only when prompted adversarially"
    ],
    correct: 1,
    right: "Correct. LLMs predict the next token from statistical patterns. They have no internal mechanism that distinguishes 'I know this from training data' from 'I am interpolating because I don't have this information.' Both produce the same confident-sounding output.",
    wrong: "LLMs hallucinate because they predict statistically likely next tokens, with no ground-truth lookup and no internal mechanism to flag uncertainty. The model cannot distinguish learned facts from interpolation — so both produce the same confident output."
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
    card.innerHTML = '<div class="question-num">Question ' + (qi+1) + ' of ' + QUESTIONS.length + '</div>'
      + '<div class="question-text">' + q.q + '</div>'
      + '<div class="options">' + optHtml + '</div>'
      + '<div class="feedback" id="fb-' + qi + '"></div>';
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
    msg.textContent = 'Excellent. You know LLM09 cold.';
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
