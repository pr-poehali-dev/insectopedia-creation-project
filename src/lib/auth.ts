const ALLOWED_USERS = [
  { email: 'andreiperelitza@gmail.com', name: 'Андрей Перелица', role: 'admin' }
];

export const isValidUser = (email: string): boolean => {
  return ALLOWED_USERS.some(user => user.email.toLowerCase() === email.toLowerCase());
};

export const getUserByEmail = (email: string) => {
  return ALLOWED_USERS.find(user => user.email.toLowerCase() === email.toLowerCase());
};

export const isAdmin = (email: string): boolean => {
  const user = getUserByEmail(email);
  return user?.role === 'admin';
};

export const getCurrentUser = () => {
  const userJson = localStorage.getItem('currentUser');
  return userJson ? JSON.parse(userJson) : null;
};

export const setCurrentUser = (user: any) => {
  localStorage.setItem('currentUser', JSON.stringify(user));
};

export const logout = () => {
  localStorage.removeItem('currentUser');
};
