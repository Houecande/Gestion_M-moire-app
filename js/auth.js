const Auth = {
  login(token, user) {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
  },

  // Supprimer la session et rediriger vers login
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login.html';
  },

  // Récupérer le token
  getToken() {
    return localStorage.getItem('token');
  },

  // Récupérer les infos utilisateur
  getUser() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  // Vérifier si connecté
  isLoggedIn() {
    return !!this.getToken();
  },

  // Récupérer le rôle
  getRole() {
    const user = this.getUser();
    return user ? user.role : null;
  }
};
