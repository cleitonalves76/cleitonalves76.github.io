const STORAGE_KEYS = {
  users: 'ctf_users',
  currentUser: 'ctf_current_user',
  challenges: 'ctf_challenges',
  submissions: 'ctf_submissions'
};

const seedChallenges = [
  { id:'win-001', title:'Windows RDP Suspeito', category:'Windows Logs', difficulty:'Fácil', points:100, description:'Analise os eventos Windows e identifique a flag relacionada a um acesso RDP suspeito.', flag:'CTF{rdp_event_4624}' },
  { id:'linux-001', title:'SSH Brute Force', category:'Linux Logs', difficulty:'Médio', points:150, description:'Investigue tentativas de autenticação SSH e encontre o padrão de ataque.', flag:'CTF{ssh_bruteforce_detected}' },
  { id:'pdf-001', title:'PDF com JavaScript', category:'Forense PDF', difficulty:'Difícil', points:250, description:'Identifique objetos suspeitos, OpenAction e JavaScript ofuscado em um PDF.', flag:'CTF{openaction_js_stream}' }
];

function getData(key, fallback = []) {
  return JSON.parse(localStorage.getItem(key)) || fallback;
}
function setData(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}
function initData() {
  if (!localStorage.getItem(STORAGE_KEYS.challenges)) setData(STORAGE_KEYS.challenges, seedChallenges);
  if (!localStorage.getItem(STORAGE_KEYS.users)) setData(STORAGE_KEYS.users, []);
  if (!localStorage.getItem(STORAGE_KEYS.submissions)) setData(STORAGE_KEYS.submissions, []);
}
function currentUser() {
  return JSON.parse(localStorage.getItem(STORAGE_KEYS.currentUser));
}
function normalizeFlag(flag) {
  return String(flag || '').trim();
}
initData();
