const Router = {
  // Pages accessibles par rôle
  routes: {
    informaticien: '/pages/informaticien/dashboard.html',
    etudiant:      '/pages/etudiant/dashboard.html',
    diplome:       '/pages/diplome/dashboard.html',
    professeur:    '/pages/professeur/dashboard.html',
  },

  // Vérifier accès à la page courante
  guard(roleRequis) {
    if (!Auth.isLoggedIn()) {
      window.location.href = '/login.html';
      return false;
    }
    const role = Auth.getRole();
    if (roleRequis && role !== roleRequis) {
      window.location.href = this.routes[role] || '/login.html';
      return false;
    }
    return true;
  },

  // Rediriger vers le dashboard selon le rôle
  redirectToDashboard() {
    const role = Auth.getRole();
    const dest = this.routes[role];
    if (dest) window.location.href = dest;
    else window.location.href = '/login.html';
  }
};
