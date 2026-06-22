const QUESTIONS = [
  {
    q: "In the December 2022 torchtriton attack, why did the malicious package install instead of PyTorch's real one?",
    options: ["The attacker stole PyTorch's signing key","pip preferred the public PyPI package because it shared the name and had a higher version number","PyTorch's servers were breached and the source code was modified","A PyTorch maintainer's account was phished"],
    correct: 1,
    right: "Correct. This is dependency confusion: a same-named package on public PyPI with a higher version number was chosen by pip over the legitimate one on PyTorch's private index. No breach, no stolen key — just a name collision the installer resolved the wrong way.",
    wrong: "Nothing was breached, signed, or phished. The attacker uploaded a package with the same name (torchtriton) to public PyPI with a high version number; pip's default resolution preferred it. That's dependency confusion — exploiting how the installer chooses between two same-named packages."
  },
  {
    q: "How did the attacker get malicious code into the official Ultralytics release in December 2024?",
    options: ["They edited the source code on GitHub directly","They compromised the build pipeline via a GitHub Actions script-injection, so poisoned code was injected during the release after review","They uploaded a typosquatted copy to PyPI","They bribed a maintainer"],
    correct: 1,
    right: "Correct. The source on GitHub looked clean. The compromise lived in the CI/CD pipeline — a GitHub Actions script injection triggered by crafted pull-request branch names — which injected an XMRig cryptominer into the published package.",
    wrong: "The GitHub source stayed clean and it wasn't a separate typosquat. The attacker exploited a GitHub Actions script-injection flaw in the build workflow, so the malicious cryptominer code was added during the release process — the part of the supply chain almost no consumer audits."
  },
  {
    q: "Why can simply loading a model file (e.g. torch.load on a pickle) be dangerous?",
    options: ["Pickle files are always huge and exhaust memory","Deserializing a pickle can execute arbitrary code, so the model file itself can be a payload","Loading a model always sends telemetry to the host","Model files can only contain numbers, so it's actually safe"],
    correct: 1,
    right: "Correct. Python's pickle format can execute code during deserialization (e.g. via __reduce__). JFrog found ~100 models on Hugging Face abusing this for reverse shells and credential theft. The model file is unverified code, not just data.",
    wrong: "The risk isn't size or telemetry — and model files are not just numbers. Pickle deserialization can run arbitrary code on load, which is why JFrog found ~100 malicious models on Hugging Face. Prefer non-executable formats like safetensors."
  },
  {
    q: "What made CVE-2025-10155 (the PickleScan bypass, CVSS 9.3) so serious?",
    options: ["It deleted scanned model files","A malicious pickle given a PyTorch-style extension slipped past the scanner and was reported clean","It only affected private model repos","It required physical access to the server"],
    correct: 1,
    right: "Correct. PickleScan chose its parser by file extension; a plain malicious pickle with a PyTorch-style extension made the PyTorch parser fail, and the scanner returned an error without falling back to standard analysis — so the dangerous file passed as safe. Fixed in 0.0.31.",
    wrong: "It didn't delete files, wasn't limited to private repos, and needed no physical access. The flaw let a malicious pickle disguised with a PyTorch-style extension evade scanning entirely and be reported safe — a security tool handing out false confidence."
  },
  {
    q: "What made PoisonGPT hard to detect?",
    options: ["It crashed on most prompts","It scored within 0.1% of the original model on a standard benchmark, so targeted edits were invisible to normal testing","It only worked offline","It required a special GPU"],
    correct: 1,
    right: "Correct. Mithril Security used ROME to surgically edit a few facts; the model behaved normally everywhere else and scored within ~0.1% of the original on a benchmark. Benchmarks and casual testing simply can't see a targeted edit — only provenance can.",
    wrong: "PoisonGPT didn't crash, need special hardware, or only work offline. The point was stealth: it scored within ~0.1% of the original on a standard benchmark, so the planted falsehood was invisible to ordinary evaluation. Detection needs provenance, not just benchmarks."
  },
  {
    q: "What is the supply-chain risk in LeftoverLocals (CVE-2023-4969)?",
    options: ["A poisoned PyPI package","Leaked GPU local memory on shared hardware lets one process recover another's data — including LLM outputs","A backdoored mobile app","A malicious browser extension"],
    correct: 1,
    right: "Correct. GPUs don't always clear local memory between processes, so on a multi-tenant cloud GPU a malicious workload can read another tenant's leftover data — enough to reconstruct their LLM responses. The infrastructure you rent is part of your supply chain. Affected Apple, Qualcomm, AMD, and Imagination GPUs.",
    wrong: "LeftoverLocals isn't about packages, apps, or extensions — it's hardware. Shared GPUs may not clear local memory between processes, letting one tenant recover another's data (including LLM output). It affected Apple, Qualcomm, AMD, and Imagination GPUs (CVSS 6.5)."
  },
  {
    q: "Research showed a LoRA adapter could be backdoored with only a small fraction of poisoned examples. Why is that especially dangerous?",
    options: ["The adapter stops working on clean inputs, so it's obvious","The backdoor preserves clean-task accuracy and fires only on a hidden trigger, so normal evaluation never catches it","LoRA adapters can't be scanned at all","It only affects models you train yourself"],
    correct: 1,
    right: "Correct. The poisoned adapter preserves clean-task accuracy and passes safety benchmarks, misbehaving only on a secret trigger. 'It passed our eval' isn't safety — catching a trigger-gated backdoor needs weight-level tools (e.g. PEFTGuard), not just behavior tests.",
    wrong: "The danger is the opposite of obvious: the backdoored adapter behaves normally on clean inputs and only misbehaves on a secret trigger, so behavior testing misses it. And since most teams consume third-party adapters, the artifact you must vet is often the adapter itself."
  },
  {
    q: "What's the strongest defense against name-based trust attacks like torchtriton and the fake-OpenAI Hugging Face repo?",
    options: ["Trust components with the most downloads","Pin to a specific verified publisher and a known-good hash/signature — never resolve by name alone","Only use models with a detailed model card","Rename your own packages to avoid collisions"],
    correct: 1,
    right: "Correct. Download counts are faked and model cards are copied verbatim. Pinning to a verified publisher plus a hash or signature checks the actual bytes — an imposter with the same name produces a different hash and fails verification.",
    wrong: "Download counts are trivially inflated (the fake-OpenAI repo hit 244K and briefly #1), and its model card was copied nearly verbatim — so neither popularity nor a nice card proves anything. The fix is pinning to a verified publisher and a known-good hash/signature, not a name."
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
    msg.textContent = 'Excellent. You know LLM03 cold.';
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
