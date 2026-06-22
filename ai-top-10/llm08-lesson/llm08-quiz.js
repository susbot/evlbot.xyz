const QUESTIONS = [
  {
    q: "What did PoisonedRAG (USENIX Security 2025) demonstrate about retrieval poisoning?",
    options: [
      "You need administrator access to the vector database to execute the attack",
      "Injecting just 5 malicious documents into a million-document knowledge base achieved a 90% attack success rate",
      "RAG systems are only vulnerable when the LLM model weights are also compromised",
      "Retrieval poisoning requires modifying the model's training data"
    ],
    correct: 1,
    right: "Correct. PoisonedRAG showed that 5 adversarially crafted documents injected into a knowledge base of millions was enough to achieve 90% success at making the LLM return the attacker's chosen answer — no admin access, no model access required.",
    wrong: "PoisonedRAG required no admin access and no access to the model. Penn State and IIT researchers demonstrated that injecting just 5 malicious documents into a million-document knowledge base achieved 90% success at controlling the LLM's answers — the entire attack happens through normal document contribution."
  },
  {
    q: "What does Vec2Text reveal about stored text embeddings?",
    options: [
      "Embeddings are one-way transformations — mathematical reconstruction is provably impossible",
      "Embeddings can only be inverted if the attacker also has access to the original model weights",
      "Text embeddings can be inverted to reconstruct source text with ~92% accuracy for 32-token inputs",
      "Embedding inversion only works on embeddings from open-source models, not commercial APIs"
    ],
    correct: 2,
    right: "Correct. Cornell researchers demonstrated that OpenAI's text-embedding-ada-002 embeddings could be inverted to reconstruct source text with ~92% accuracy for 32-token inputs. Passwords, patient notes, private contracts — all recoverable from vectors alone.",
    wrong: "Vec2Text showed that text embeddings from commercial APIs including OpenAI's ada-002 can be inverted with ~92% accuracy for 32-token inputs. No access to model weights is required — 2025 zero-shot variants work entirely offline from just the stored vectors."
  },
  {
    q: "Why did ConfusedPilot responses persist even after the malicious document was deleted?",
    options: [
      "The LLM permanently cached the false answer in its own weights",
      "The attacker continuously re-uploaded the document in the background",
      "The attack modified the embedding model's fine-tuning parameters",
      "The document's embedding remained in the vector store cache until the system performed a full reindex"
    ],
    correct: 3,
    right: "Correct. ConfusedPilot demonstrated that deleting the source document does not delete its embedding. The poisoned vector persisted in the cache and continued influencing AI responses until a full reindex was performed — long after the document was gone.",
    wrong: "Deleting the source document doesn't delete its embedding. ConfusedPilot showed that the poisoned vector persisted in the vector store cache, continuing to influence responses until the system reindexed. This is exactly why M6 (Limit Embedding Persistence) calls for cascade deletion from source to embedding."
  },
  {
    q: "In the hidden resume injection attack, what made the attack work?",
    options: [
      "The attacker had direct access to modify the AI's system prompt",
      "The ingestion pipeline embedded the full document text, including invisible hidden content not stripped by text extraction",
      "The attacker exploited a SQL injection vulnerability in the HR database",
      "The AI model was fine-tuned on the attacker's resume prior to the attack"
    ],
    correct: 1,
    right: "Correct. The ingestion pipeline extracted and embedded the full document text without stripping hidden content. White-on-white text containing 'ignore all previous instructions' became part of the embedding — invisible to humans, but fully readable to the retrieval system.",
    wrong: "The attack worked because the ingestion pipeline embedded the full extracted text without normalizing or stripping invisible content. White-on-white hidden text became part of the document's embedding. No system prompt access, no SQL injection — just a document upload through normal channels."
  },
  {
    q: "What is the key difference between LLM08 (Vector & Embedding Weaknesses) and LLM04 (Data & Model Poisoning)?",
    options: [
      "LLM04 only affects open-source models; LLM08 only affects commercial cloud models",
      "LLM08 requires physical server access; LLM04 does not",
      "They describe the same vulnerability — OWASP separated them for organizational reasons only",
      "LLM04 poisons model weights during training; LLM08 poisons the live retrieval knowledge base at runtime"
    ],
    correct: 3,
    right: "Correct. LLM04 targets the model's parameters during training or fine-tuning — requiring deep pipeline access. LLM08 targets the knowledge base queried at runtime — requiring only the ability to contribute a document. Same word 'poisoning', very different attack surfaces.",
    wrong: "The difference is where and when the attack happens. LLM04 poisons model weights during training — requiring access to the training pipeline. LLM08 poisons the live knowledge base at runtime — requiring only the ability to add a document to an indexed folder. The bar for LLM08 is dramatically lower."
  },
  {
    q: "In the cross-tenant leakage scenario, why did an HR query surface confidential clinical documents?",
    options: [
      "The clinical team had intentionally shared their documents with HR in the system settings",
      "The retrieval system ranked documents by semantic similarity without enforcing authorization tags at query time",
      "The vector database was using the wrong distance metric, mixing unrelated document groups",
      "The HR user had been accidentally assigned admin permissions they were unaware of"
    ],
    correct: 1,
    right: "Correct. Cosine similarity measures semantic closeness — not access rights. The retrieval system found that 'medical leave documentation' was semantically similar to clinical notes, and returned them without checking whether the HR user was authorized to see them.",
    wrong: "The retrieval system only asked 'which documents are most similar?' — it did not also ask 'which of those is this user authorized to see?' Access controls were applied at upload time but not enforced at retrieval time. The fix is permission-aware retrieval that filters by authorization before ranking by similarity."
  },
  {
    q: "Which mitigation most directly blocks the PoisonedRAG attack mechanism?",
    options: [
      "Encrypting vectors at rest (M4)",
      "Applying retrieval controls beyond cosine similarity — including provenance checks and per-contributor limits (M3)",
      "Cascading deletion from source documents to embeddings (M6)",
      "Scheduling weekly full reindexes of the knowledge base"
    ],
    correct: 1,
    right: "Correct. PoisonedRAG works by maximizing cosine similarity — that is its entire mechanism. M3 (Retrieval Controls Beyond Similarity) breaks it by adding provenance checks: flagging newly contributed documents from low-trust accounts that suddenly rank #1, and limiting how many top results can come from a single contributor.",
    wrong: "PoisonedRAG's attack mechanism is maximizing cosine similarity to outrank legitimate documents. M3 (Retrieval Controls Beyond Similarity) is what breaks this — by adding provenance validation and contribution limits so that high cosine similarity alone is not sufficient to reach the LLM's context."
  },
  {
    q: "Why are LLM08 embedding attacks harder to detect than LLM01 prompt injection attacks?",
    options: [
      "LLM08 attackers are more technically sophisticated, producing subtler attack artifacts",
      "LLM08 only affects closed-source systems that don't expose retrieval logs by default",
      "Embedding attacks operate through the retrieval layer and leave no visible trace in user prompts or standard application logs",
      "LLM08 attacks always succeed on the first attempt, leaving no repeated patterns to detect"
    ],
    correct: 2,
    right: "Correct. LLM01 prompt injection appears in user-submitted text — visible to input validation, rate limiting, and content moderation. LLM08 attacks arrive as documents in the knowledge base days or weeks before any query, and are invisible in user prompts, standard logs, and output moderation systems.",
    wrong: "LLM08 attacks enter through the knowledge base ingestion pipeline — not through user prompts. By the time a user submits a query that retrieves a poisoned document, the attacker may be long gone. The attack appears nowhere in user-facing logs. Only retrieval-layer monitoring — logging what was retrieved, from whom, for which query — can detect it."
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
    msg.textContent = 'Excellent. You know LLM08 cold.';
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
