// Tri-Topic Quiz App
// - 30 questions per topic: html, css, js
// - Login (name + email) + per-email+topic localStorage save/resume
// - Theme toggle persisted
// - Next/Prev, jump grid, submit, review, export, reset

// ---------- DOM ----------
const loginSection = document.getElementById('loginSection');
const topicSection = document.getElementById('topicSection');
const quizSection = document.getElementById('quizSection');
const resultSection = document.getElementById('resultSection');

const nameInput = document.getElementById('nameInput');
const emailInput = document.getElementById('emailInput');
const startBtn = document.getElementById('startBtn');
const resumeBtn = document.getElementById('resumeBtn');

const greeting = document.getElementById('greeting');
const userEmailText = document.getElementById('userEmailText');
const topicButtons = document.querySelectorAll('.topic-btn');
const clearAllBtn = document.getElementById('clearAllBtn');

const topicTitle = document.getElementById('topicTitle');
const qIndexEl = document.getElementById('qIndex');
const qTotalEl = document.getElementById('qTotal');
const progressFill = document.getElementById('progressFill');
const scorePreview = document.getElementById('scorePreview');

const questionText = document.getElementById('questionText');
const optionsList = document.getElementById('optionsList');

const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const submitBtn = document.getElementById('submitBtn');

const jumpGrid = document.getElementById('jumpGrid');

const logoutBtn = document.getElementById('logoutBtn');
const themeToggle = document.getElementById('themeToggle');

const resultSummary = document.getElementById('resultSummary');
const resultBreakdown = document.getElementById('resultBreakdown');
const reviewBtn = document.getElementById('reviewBtn');
const backTopicsBtn = document.getElementById('backTopicsBtn');
const exportBtn = document.getElementById('exportBtn');

// ---------- Data (30 questions each) ----------
const QUESTIONS = {
  js: [
    {q:"Which keyword declares a block-scoped variable in modern JavaScript?", opts:["var","let","function","constant"], a:1},
    {q:"What will typeof NaN return?", opts:["\"nan\"","\"number\"","\"undefined\"","\"object\""], a:1},
    {q:"Which method adds one or more elements to the end of an array?", opts:["push","pop","shift","unshift"], a:0},
    {q:"What is the output of 1 + '2' + 3 ?", opts:["'33'","6","'123'","'15'"], a:2},
    {q:"Which is NOT a primitive in JavaScript?", opts:["Symbol","Object","Null","String"], a:1},
    {q:"How do you write an arrow function that returns x * 2?", opts:["function(x) => x*2","(x) => { return x*2 }","x => x*2","-> x*2"], a:2},
    {q:"What does Promise.all() do?", opts:["Returns first resolved promise only","Waits for all promises to resolve or any to reject","Cancels all promises","Executes promises sequentially"], a:1},
    {q:"Which property accesses the length of a string s ?", opts:["s.size","s.length","s.len","s.count"], a:1},
    {q:"What does === check for?", opts:["Value equality after coercion","Reference only","Strict equality without type conversion","Inequality"], a:2},
    {q:"Which method parses a JSON string to an object?", opts:["JSON.parse","JSON.stringify","String.parse","Parse.json"], a:0},
    {q:"Which operator returns remainder after division?", opts:["/","%","mod","^"], a:1},
    {q:"Which array method creates a new array by calling a function on every element?", opts:["forEach","map","filter","reduce"], a:1},
    {q:"Which method filters elements based on a condition?", opts:["map","filter","reduce","forEach"], a:1},
    {q:"What value does typeof null return?", opts:["'null'","'object'","'undefined'","'number'"], a:1},
    {q:"Which statement schedules a function to run after some milliseconds?", opts:["setInterval","sleep","setTimeout","delay"], a:2},
    {q:"Which keyword prevents re-assignment of a variable reference?", opts:["let","var","const","final"], a:2},
    {q:"How to create a shallow copy of an array?", opts:["slice()","copy()","assign()","clone()"], a:0},
    {q:"Which method turns an object into JSON string?", opts:["JSON.stringify","JSON.parse","String.json","Object.toJSON"], a:0},
    {q:"Which loop iterates while a condition is true and checks condition before iteration?", opts:["do...while","while","for","for...in"], a:1},
    {q:"Which symbol starts a template literal?", opts:["'","\"","`","~"], a:2},
    {q:"What does 'this' refer to in arrow functions?", opts:["Function's own this","Enclosing lexical this","Global object","Undefined"], a:1},
    {q:"Which operator checks both value and type equality?", opts:["==","===","!=","!=="], a:1},
    {q:"Which built-in object deals with dates and times?", opts:["Clock","Calendar","Date","Time"], a:2},
    {q:"How to convert '3' to number 3 ?", opts:["Number('3')","parseNumber('3')","'3'.toNumber()","int('3')"], a:0},
    {q:"Which method adds an element at the beginning of an array?", opts:["push","pop","shift","unshift"], a:3},
    {q:"Which method returns a promise that resolves after all input promises settle (both fulfilled & rejected)?", opts:["Promise.all","Promise.race","Promise.allSettled","Promise.any"], a:2},
    {q:"Which method runs when a promise resolves?", opts:["then","catch","finally","resolve"], a:0},
    {q:"How to test if a value is NaN?", opts:["value === NaN","Number.isNaN(value)","isNaN === value","typeof value === 'NaN'"], a:1},
    {q:"Which construct handles exceptions thrown in try block?", opts:["catch","finally","throw","handle"], a:0}
  ],

  html: [
    {q:"Which tag creates a hyperlink?", opts:["<link>","<a>","<href>","<url>"], a:1},
    {q:"Correct tag for line break?", opts:["<lb>","<break>","<br>","<newline>"], a:2},
    {q:"Attribute for alternative text on images?", opts:["alt","title","desc","srcset"], a:0},
    {q:"Element for numbered list?", opts:["<ol>","<ul>","<li>","<list>"], a:0},
    {q:"Where should <meta charset='utf-8'> be placed?", opts:["Inside <head>","Inside <body>","Before <!DOCTYPE>","After </html>"], a:0},
    {q:"Which attribute makes an input readonly?", opts:["disabled","readonly","immutable","blocked"], a:1},
    {q:"Semantic element for main page content?", opts:["<section>","<article>","<main>","<content>"], a:2},
    {q:"Correct way to add a favicon?", opts:["<link rel='icon' href='/favicon.ico'>","<meta favicon='/favicon.ico'>","<script src='favicon.ico'>","<link icon='favicon.ico'>"], a:0},
    {q:"Attribute required for accessible form labeling?", opts:["aria-label","title","label","placeholder"], a:0},
    {q:"Which tag for page headings?", opts:["<h1> to <h6>","<header>","<head>","<title>"], a:0},
    {q:"Self-closing tag in HTML5", opts:["<div>","<img>","<p>","<section>"], a:1},
    {q:"How do you comment in HTML?", opts:["// comment","/* comment */","<!-- comment -->","# comment"], a:2},
    {q:"Which element defines a row in a table?", opts:["<td>","<tr>","<th>","<table>"], a:1},
    {q:"What element collects user input controls?", opts:["<input>","<form>","<fieldset>","<label>"], a:1},
    {q:"Element for embedding another HTML page?", opts:["<iframe>","<embed>","<object>","<frame>"], a:0},
    {q:"Semantic element for navigation links?", opts:["<nav>","<menu>","<section>","<aside>"], a:0},
    {q:"Which element for preformatted text?", opts:["<pre>","<format>","<code>","<samp>"], a:0},
    {q:"Tag for code snippets?", opts:["<code>","<pre>","<kbd>","<samp>"], a:0},
    {q:"Correct doctype for HTML5?", opts:["<!DOCTYPE html>","<!DOCTYPE HTML5>","<!DOCTYPE html5>","<DOCTYPE>"], a:0},
    {q:"Which element should be used for site header?", opts:["<header>","<head>","<hgroup>","<banner>"], a:0},
    {q:"How to declare language of document?", opts:["lang","locale","xml:lang","language"], a:0},
    {q:"Which element for important text (bold)?", opts:["<strong>","<b>","<em>","<mark>"], a:0},
    {q:"Which element for emphasized (italic) text?", opts:["<i>","<b>","<em>","<strong>"], a:2},
    {q:"Which input type for file upload?", opts:["file","upload","choose","attachment"], a:0},
    {q:"Which attribute on <script> defers execution until after parsing?", opts:["async","defer","load","onready"], a:1},
    {q:"Which element is used for the document title?", opts:["<title>","<h1>","<head>","<meta>"], a:0},
    {q:"Which property controls visible tooltip for an element?", opts:["title attribute","alt attribute","tooltip attribute","aria-label"], a:0},
    {q:"Which tag displays a thematic break (horizontal line)?", opts:["<br>","<hr>","<sep>","<line>"], a:1},
    {q:"Which element represents a section with related content?", opts:["<div>","<section>","<span>","<container>"], a:1}
  ],

  css: [
    {q:"What does CSS stand for?", opts:["Colorful Style Sheets","Cascading Style Sheets","Creative Style Syntax","Computer Style Sheets"], a:1},
    {q:"Which property changes text color?", opts:["font-color","text-color","color","fill"], a:2},
    {q:"How to make text bold?", opts:["text: bold","font-weight: bold","font: bold","weight: bold"], a:1},
    {q:"Which selector targets id='main'?", opts:[".main","#main","main","*main"], a:1},
    {q:"Which selector targets class 'btn'?", opts:["btn",".btn","#btn","*btn"], a:1},
    {q:"How to set a background image?", opts:["background-image:url('a.jpg')","bg:url('a.jpg')","image:background('a.jpg')","background:img('a.jpg')"], a:0},
    {q:"Property for internal spacing inside element?", opts:["margin","padding","gap","spacing"], a:1},
    {q:"Property for space outside element?", opts:["margin","padding","border","spacing"], a:0},
    {q:"Default display of <div> is?", opts:["inline","block","inline-block","flex"], a:1},
    {q:"Which unit is relative to root font-size?", opts:["px","em","rem","vw"], a:2},
    {q:"Which property controls the space between lines?", opts:["letter-spacing","line-height","word-spacing","text-indent"], a:1},
    {q:"How to create rounded corners?", opts:["corner-radius","border-radius","radius","round"], a:1},
    {q:"Which pseudo-class applies on hover?", opts:[":focus",":active",":hover",":visited"], a:2},
    {q:"Which property stacks elements along z axis?", opts:["order","z-index","stack","layer"], a:1},
    {q:"How to make text bold via CSS?", opts:["font-weight:bold","text-weight:bold","font:bold","font-style:bold"], a:0},
    {q:"Which property adds space inside element?", opts:["margin","padding","gap","spacing"], a:1},
    {q:"Which rule groups styles for different screen sizes?", opts:["@keyframes","@media","@supports","@import"], a:1},
    {q:"How to create CSS variable?", opts:["--main: #000;","var(--main): #000;","$main: #000;","@var main: #000"], a:0},
    {q:"How to use a CSS variable?", opts:["var(--main-color)","--main-color","$main-color","var(main-color)"], a:0},
    {q:"Which property makes element semi-transparent?", opts:["transparent","opacity","alpha","filter"], a:1},
    {q:"Which property controls font-size?", opts:["text-size","font-size","size","type"], a:1},
    {q:"What does box-sizing: border-box do?", opts:["Includes padding & border in width","Excludes padding","Removes border","Sets box shadow"], a:0},
    {q:"Which unit equals 1% of viewport width?", opts:["vh","vw","vmin","rem"], a:1},
    {q:"Which property animates between two values?", opts:["animation","transition","transform","motion"], a:1},
    {q:"Which property rotates an element?", opts:["rotate:45deg","transform: rotate(45deg)","spin:45deg","rotateTransform:45deg"], a:1},
    {q:"How to include external CSS file in HTML?", opts:["<link rel='stylesheet' href='styles.css'>","<script src='styles.css'>","@import 'styles.css';","<style src='styles.css'>"], a:0},
    {q:"Which pseudo-class selects first child?", opts:[":first",":first-of-type",":first-child",":nth-first"], a:2},
    {q:"Which property centers elements horizontally using flex?", opts:["justify-content","align-items","align-content","flex-direction"], a:0},
    {q:"Which value for display creates grid layout?", opts:["display:flex;","display:grid;","display:block;","display:inline;"], a:1}
  ]
};

// ---------- App state ----------
let state = {
  user: null,           // { name, email }
  topic: null,          // 'html' | 'css' | 'js'
  pool: [],             // current questions
  current: 0,           // index in pool (0-based)
  answers: {},          // questionIndex -> selectedIndex
  completed: false
};

// ---------- Utilities ----------
function $(id){ return document.getElementById(id); }
function showSection(sectionEl){ [loginSection, topicSection, quizSection, resultSection].forEach(s => s.classList.add('hidden')); sectionEl.classList.remove('hidden'); }
function saveTheme(theme){
  if(theme === 'dark') document.documentElement.setAttribute('data-theme','dark');
  else document.documentElement.removeAttribute('data-theme');
  localStorage.setItem('quiz_theme', theme);
}
function loadTheme(){
  const t = localStorage.getItem('quiz_theme') || 'light';
  if(t === 'dark'){ themeToggle.checked = true; saveTheme('dark'); }
  else { themeToggle.checked = false; saveTheme('light'); }
}
function storageKey(email, topic){ return `quiz::${email}::${topic}`; }
function saveProgress(){
  if(!state.user || !state.topic) return;
  const payload = {
    user: state.user,
    topic: state.topic,
    current: state.current,
    answers: state.answers,
    completed: state.completed,
    savedAt: new Date().toISOString()
  };
  try{ localStorage.setItem(storageKey(state.user.email, state.topic), JSON.stringify(payload)); }
  catch(e){ console.warn('Save failed', e); }
}
function loadProgress(email, topic){
  const raw = localStorage.getItem(storageKey(email, topic));
  if(!raw) return null;
  try{ return JSON.parse(raw); } catch(e){ return null; }
}
function clearAllForEmail(email){
  if(!email) return;
  const prefix = `quiz::${email}::`;
  Object.keys(localStorage).forEach(k => { if(k.startsWith(prefix)) localStorage.removeItem(k); });
}

// ---------- UI initialization ----------
loadTheme();
showSection(loginSection);

// Prebuild jump grid buttons for up to 30
function buildJumpGrid(n){
  jumpGrid.innerHTML = '';
  for(let i=0;i<n;i++){
    const btn = document.createElement('button');
    btn.textContent = i+1;
    btn.addEventListener('click', ()=> { state.current = i; renderQuestion(); saveProgress(); });
    jumpGrid.appendChild(btn);
  }
}

// ---------- Render functions ----------
function renderQuestion(){
  if(!state.pool.length) return;
  const qTotal = state.pool.length;
  const idx = state.current;
  const qObj = state.pool[idx];

  topicTitle.textContent = (state.topic === 'js') ? 'JavaScript' : state.topic.toUpperCase();
  qIndexEl.textContent = idx+1;
  qTotalEl.textContent = qTotal;

  // progress fill
  const pct = Math.round(((idx+1)/qTotal)*100);
  progressFill.style.width = pct + '%';

  // question text (use textContent to avoid HTML parsing issues)
  questionText.textContent = qObj.q;

  // options
  optionsList.innerHTML = '';
  qObj.opts.forEach((opt, i) => {
    const div = document.createElement('div');
    div.className = 'option';
    div.tabIndex = 0;
    div.textContent = `${String.fromCharCode(65+i)}. ${opt}`;
    // apply selected style if present
    if(state.answers[idx] === i) div.classList.add('selected');
    div.addEventListener('click', () => {
      state.answers[idx] = i;
      Array.from(optionsList.children).forEach(c => c.classList.remove('selected'));
      div.classList.add('selected');
      computeScorePreview();
      saveProgress();
    });
    optionsList.appendChild(div);
  });

  // enable/disable nav buttons
  prevBtn.disabled = idx === 0;
  nextBtn.disabled = idx === qTotal-1;

  // mark jump grid buttons answered state
  Array.from(jumpGrid.children).forEach((b, i) => {
    if(state.answers[i] !== undefined) { b.style.background = 'linear-gradient(90deg,var(--accent),#06b6d4)'; b.style.color = '#fff'; }
    else { b.style.background = ''; b.style.color = ''; }
    b.style.opacity = (i <= idx) ? '1' : '0.7';
  });

  // If completed reveal correct/wrong on current question
  if(state.completed){
    Array.from(optionsList.children).forEach((el, optionIdx) => {
      el.classList.remove('correct','wrong');
      if(optionIdx === qObj.a) el.classList.add('correct');
      if(typeof state.answers[idx] !== 'undefined' && state.answers[idx] === optionIdx && state.answers[idx] !== qObj.a) el.classList.add('wrong');
    });
  }
}

function computeScorePreview(){
  let sc = 0; let answered = 0;
  state.pool.forEach((q, i) => {
    if(typeof state.answers[i] !== 'undefined'){ answered++; if(state.answers[i] === q.a) sc++; }
  });
  scorePreview.textContent = `Score: ${sc}`;
}

// ---------- Event handlers ----------
startBtn.addEventListener('click', () => {
  const name = nameInput.value.trim();
  const email = emailInput.value.trim().toLowerCase();
  if(!name || !/^\S+@\S+\.\S+$/.test(email)){ alert('Enter valid name and email'); return; }
  state.user = { name, email };
  // persist last user info for convenience
  localStorage.setItem('quiz_last_user', JSON.stringify(state.user));
  greeting.textContent = `Hi, ${name}`;
  userEmailText.textContent = email;
  showSection(topicSection);
});

resumeBtn.addEventListener('click', () => {
  const email = emailInput.value.trim().toLowerCase();
  if(!/^\S+@\S+\.\S+$/.test(email)) return alert('Enter valid email to resume');
  // find any saved topic for that email (prefer last used)
  const topics = ['html','css','js'];
  let found = null;
  for(const t of topics){
    const p = loadProgress(email, t);
    if(p){ found = p; break; }
  }
  if(!found){ return alert('No saved progress found for this email'); }
  // set state.user from last_user if available
  const lastUserRaw = localStorage.getItem('quiz_last_user');
  if(lastUserRaw) state.user = JSON.parse(lastUserRaw);
  else state.user = { name: found.user?.name || 'User', email };
  greeting.textContent = `Hi, ${state.user.name}`;
  userEmailText.textContent = state.user.email;
  showSection(topicSection);
});

topicButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    if(!state.user) { alert('Please sign in first'); return; }
    const t = btn.dataset.topic;
    startTopic(t);
  });
});

function startTopic(topicKey){
  state.topic = topicKey;
  // copy pool from QUESTIONS
  state.pool = QUESTIONS[topicKey].slice();
  // try load saved progress
  const saved = loadProgress(state.user.email, topicKey);
  if(saved){
    if(confirm('Saved progress found for this topic. Resume?')) {
      state.current = saved.current || 0;
      state.answers = saved.answers || {};
      state.completed = !!saved.completed;
    } else {
      state.current = 0; state.answers = {}; state.completed = false;
    }
  } else {
    state.current = 0; state.answers = {}; state.completed = false;
  }
  buildJumpGrid(state.pool.length);
  computeScorePreview();
  renderQuestion();
  showSection(quizSection);
}

prevBtn.addEventListener('click', () => { if(state.current>0){ state.current--; renderQuestion(); saveProgress(); } });
nextBtn.addEventListener('click', () => { if(state.current < state.pool.length-1){ state.current++; renderQuestion(); saveProgress(); } });

submitBtn.addEventListener('click', () => {
  if(!confirm('Submit quiz and finish? You can still export results.')) return;
  // grade
  let sc=0;
  state.pool.forEach((q,i) => { if(state.answers[i] === q.a) sc++; });
  state.completed = true;
  saveProgress();
  // show result section
  resultSummary.textContent = `You scored ${sc} out of ${state.pool.length} (${Math.round(sc/state.pool.length*100)}%).`;
  // breakdown (small)
  resultBreakdown.innerHTML = '';
  state.pool.forEach((q,i) => {
    const row = document.createElement('div');
    row.style.padding='8px 0';
    row.style.borderBottom='1px dashed rgba(0,0,0,0.04)';
    const userAns = (typeof state.answers[i] !== 'undefined') ? q.opts[state.answers[i]] : '<em>Not answered</em>';
    const correctAns = q.opts[q.a];
    row.innerHTML = `<strong>Q${i+1}.</strong> ${q.q} <div class="small">Your: ${userAns} • Correct: ${correctAns}</div>`;
    resultBreakdown.appendChild(row);
  });
  showSection(resultSection);
});

backTopicsBtn.addEventListener('click', () => {
  showSection(topicSection);
});

reviewBtn.addEventListener('click', () => {
  // return to quiz view with completed true and render first question
  showSection(quizSection);
  state.current = 0;
  renderQuestion();
});

exportBtn.addEventListener('click', () => {
  if(!state.user || !state.topic) return alert('No progress to export');
  const raw = localStorage.getItem(storageKey(state.user.email, state.topic));
  if(!raw) return alert('Nothing saved for this topic');
  const blob = new Blob([raw], {type:'application/json'});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${state.user.email}_${state.topic}_quiz_progress.json`;
  document.body.appendChild(a); a.click(); a.remove(); URL.revokeObjectURL(url);
});

// Clear all progress for signed-in email
clearAllBtn.addEventListener('click', () => {
  if(!state.user) return alert('Sign in first');
  if(!confirm('Clear ALL saved quiz progress for this email from this browser?')) return;
  clearAllForEmail(state.user.email);
  alert('Cleared.');
});

// logout
logoutBtn.addEventListener('click', () => {
  if(!confirm('Logout? Your progress remains saved locally.')) return;
  state.user = null;
  state.topic = null;
  showSection(loginSection);
});

// theme
themeToggle.addEventListener('change', (e) => {
  saveTheme(e.target.checked ? 'dark' : 'light');
});

// keyboard navigation
document.addEventListener('keydown', (e)=> {
  if(!state.pool.length) return;
  if(e.key === 'ArrowRight') nextBtn.click();
  if(e.key === 'ArrowLeft') prevBtn.click();
  if(e.key === 'Enter' && (e.ctrlKey || e.metaKey)) submitBtn.click();
});

// auto-save periodically
setInterval(saveProgress, 3000);
window.addEventListener('beforeunload', saveProgress);

// restore last user if present
(function restoreLastUser(){
  const last = localStorage.getItem('quiz_last_user');
  if(last){
    try{
      const u = JSON.parse(last);
      if(u && u.name && u.email){
        nameInput.value = u.name;
        emailInput.value = u.email;
        // optionally auto-open topics (commented out)
        // state.user = u; greeting.textContent = `Hi, ${u.name}`; userEmailText.textContent = u.email; showSection(topicSection);
      }
    }catch(e){}
  }
})();

// initialize theme checkbox
loadTheme();

// ---------- END ----------
