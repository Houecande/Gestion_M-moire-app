/**
 * Routeur simplifié pour la navigation par rôles.
 */
const Router = {
  routes: {
    informaticien: '/pages/informaticien/dashboard.html',
    etudiant:      '/pages/etudiant/dashboard.html',
    diplome:       '/pages/diplome/dashboard.html',
    professeur:    '/pages/professeur/dashboard.html',
  },

  guard(roleRequis) {
    if (!Auth.isLoggedIn()) {
      window.location.href = '/login.html';
      return false;
    }
    return true;
  },

  redirectToDashboard() {
    const role = Auth.getRole();
    const dest = this.routes[role] || '/index.html';
    window.location.href = dest;
  }
};
