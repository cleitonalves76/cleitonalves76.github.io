const form = document.getElementById('challengeForm');
const adminList = document.getElementById('adminChallengeList');
function renderAdmin(){
  const challenges = getData(STORAGE_KEYS.challenges);
  adminList.innerHTML = challenges.map(c => `<div class="admin-item"><strong>${c.title}</strong><br><span class="badge">${c.category}</span><span class="badge">${c.difficulty}</span><p>${c.points} pontos</p><button class="btn secondary" onclick="removeChallenge('${c.id}')">Remover</button></div>`).join('');
}
form.addEventListener('submit', e => {
  e.preventDefault();
  const challenges = getData(STORAGE_KEYS.challenges);
  challenges.push({ id: crypto.randomUUID(), title:title.value, category:category.value, difficulty:difficulty.value, points:Number(points.value), description:description.value, flag:flag.value });
  setData(STORAGE_KEYS.challenges, challenges);
  form.reset(); points.value = 100;
  renderAdmin();
});
function removeChallenge(id){
  setData(STORAGE_KEYS.challenges, getData(STORAGE_KEYS.challenges).filter(c => c.id !== id));
  renderAdmin();
}
renderAdmin();
