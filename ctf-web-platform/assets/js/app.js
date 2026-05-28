const challenges = getData(STORAGE_KEYS.challenges);
const users = getData(STORAGE_KEYS.users);
const submissions = getData(STORAGE_KEYS.submissions).filter(s => s.correct);
document.getElementById('totalChallenges').textContent = challenges.length;
document.getElementById('totalUsers').textContent = users.length;
document.getElementById('totalSolved').textContent = submissions.length;
const user = currentUser();
if (user && document.getElementById('loginLink')) document.getElementById('loginLink').textContent = user.name;
