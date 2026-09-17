// Authentication module

const SESSION_KEY = 'gurukripa_session';

export function getSession() {
  try {
    const s = sessionStorage.getItem(SESSION_KEY);
    return s ? JSON.parse(s) : null;
  } catch {
    return null;
  }
}

export function setSession(user) {
  const session = {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    loginAt: new Date().toISOString()
  };
  sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));
  return session;
}

export function clearSession() {
  sessionStorage.removeItem(SESSION_KEY);
}

export function isAuthenticated() {
  return !!getSession();
}

export function login(email, password, users) {
  const user = users.find(u =>
    (u.email === email || u.email === email.toLowerCase()) &&
    u.password === password &&
    u.status === 'active'
  );
  if (!user) return { success: false, error: 'Invalid email or password' };
  setSession(user);
  return { success: true, user };
}

export function logout() {
  clearSession();
}

export function isAdmin() {
  const s = getSession();
  return s && s.role === 'admin';
}

export function isManager() {
  const s = getSession();
  return s && s.role === 'manager';
}

export function getCurrentUser() {
  return getSession();
}
