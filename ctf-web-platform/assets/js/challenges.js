let selectedChallenge = null;
const list = document.getElementById('challengeList');
const search = document.getElementById('search');
const categoryFilter = document.getElementById('categoryFilter');
const challenges = getData(STORAGE_KEYS.challenges);
const categories = [...new Set(challenges.map(c => c.category))];
categories.forEach(cat => categoryFilter.innerHTML += `<option value="${cat}">${cat}</option>`);
function renderChallenges(){
  const term = search.value.toLowerCase();
  const cat = categoryFilter.value;
  const filtered = challenges.filter(c => (!cat || c.category === cat) && (c.title.toLowerCase().includes(term) || c.description.toLowerCase().includes(term)));
  list.innerHTML = filtered.map(c => `<article class="challenge-card" onclick="openChallenge('${c.id}')"><span class="badge">${c.category}</span><span class="badge">${c.difficulty}</span><h2>${c.title}</h2><p>${c.description}</p><p class="points">${c.points} pontos</p></article>`).join('');
}
function openChallenge(id){
  selectedChallenge = challenges.find(c => c.id === id);
  document.getElementById('challengeDetail').innerHTML = `<h2>${selectedChallenge.title}</h2><p><span class="badge">${selectedChallenge.category}</span><span class="badge">${selectedChallenge.difficulty}</span></p><p>${selectedChallenge.description}</p><p class="points">${selectedChallenge.points} pontos</p>`;
  document.getElementById('flagResult').textContent = '';
  document.getElementById('flagInput').value = '';
  document.getElementById('challengeDialog').showModal();
}
document.getElementById('flagForm').addEventListener('submit', e => {
  e.preventDefault();
  const user = currentUser();
  if (!user) { document.getElementById('flagResult').innerHTML = '<span class="bad">Faça login antes de enviar flags.</span>'; return; }
  const sent = normalizeFlag(document.getElementById('flagInput').value);
  const correct = sent === selectedChallenge.flag;
  const submissions = getData(STORAGE_KEYS.submissions);
  const alreadySolved = submissions.some(s => s.userId === user.id && s.challengeId === selectedChallenge.id && s.correct);
  if (correct && alreadySolved) { document.getElementById('flagResult').innerHTML = '<span class="ok">Você já resolveu este desafio.</span>'; return; }
  submissions.push({ id: crypto.randomUUID(), userId:user.id, userName:user.name, userEmail:user.email, challengeId:selectedChallenge.id, points:selectedChallenge.points, flag:sent, correct, createdAt:new Date().toISOString() });
  setData(STORAGE_KEYS.submissions, submissions);
  document.getElementById('flagResult').innerHTML = correct ? '<span class="ok">Flag correta! Pontuação registrada.</span>' : '<span class="bad">Flag incorreta. Tente novamente.</span>';
});
search.addEventListener('input', renderChallenges);
categoryFilter.addEventListener('change', renderChallenges);
renderChallenges();
