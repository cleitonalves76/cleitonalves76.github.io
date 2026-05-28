const users = getData(STORAGE_KEYS.users);
const submissions = getData(STORAGE_KEYS.submissions).filter(s => s.correct);
const scores = users.map(u => {
  const solved = submissions.filter(s => s.userId === u.id);
  return { ...u, points: solved.reduce((sum, s) => sum + Number(s.points || 0), 0), flags: solved.length };
}).sort((a,b) => b.points - a.points || b.flags - a.flags);
document.getElementById('rankingBody').innerHTML = scores.map((u,i) => `<tr><td>${i+1}</td><td>${u.name}</td><td>${u.email}</td><td>${u.points}</td><td>${u.flags}</td></tr>`).join('') || '<tr><td colspan="5">Nenhum usuário pontuou ainda.</td></tr>';
