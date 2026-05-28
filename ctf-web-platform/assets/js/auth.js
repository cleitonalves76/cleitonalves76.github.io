document.getElementById('loginForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim().toLowerCase();
  const users = getData(STORAGE_KEYS.users);
  let user = users.find(u => u.email === email);
  if (!user) {
    user = { id: crypto.randomUUID(), name, email, createdAt: new Date().toISOString() };
    users.push(user);
    setData(STORAGE_KEYS.users, users);
  }
  localStorage.setItem(STORAGE_KEYS.currentUser, JSON.stringify(user));
  window.location.href = 'challenges.html';
});
