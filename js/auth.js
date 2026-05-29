/**
 * Gestion de l'authentification
 */
const Auth = {
  login(user) {
    localStorage.setItem('user', JSON.stringify(user));
  },

  logout() {
    localStorage.removeItem('user');
    window.location.href = '/login.html';
  },

  getUser() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  isLoggedIn() {
    return !!this.getUser();
  },

  getRole() {
    const user = this.getUser();
    return user ? user.role : null;
  }
};
