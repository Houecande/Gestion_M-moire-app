/* ================================================
   NOTIFICATIONS.JS - Gestion des notifications in-app
   ================================================ */

const Notifications = {
  // Charger le nombre de notifs non lues (pour le badge navbar)
  async loadCount() {
    try {
      const data = await Api.get('/notifications/count');
      if (data && data.count > 0) {
        const badge = document.getElementById('notif-count');
        if (badge) badge.textContent = data.count;
      }
    } catch(e) { /* silencieux */ }
  },

  // Charger la liste complète
  async loadList(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    try {
      const data = await Api.get('/notifications');
      if (!data || !data.length) {
        container.innerHTML = '<p style="color:var(--gris-texte);text-align:center;padding:20px">Aucune notification.</p>';
        return;
      }
      container.innerHTML = data.map(n => `
        <div class="recent-item ${n.lu ? '' : 'notif-unread'}" style="${!n.lu ? 'border-left:3px solid var(--bleu);' : ''}">
          <div class="recent-icon">${n.type === 'validation' ? '✅' : n.type === 'rejet' ? '❌' : '🔔'}</div>
          <div class="recent-info">
            <strong>${n.titre}</strong>
            <span>${n.message}</span>
          </div>
          <span class="recent-date">${n.date}</span>
        </div>
      `).join('');
    } catch(e) {
      container.innerHTML = '<p style="color:var(--gris-texte);text-align:center;padding:20px">Erreur de chargement.</p>';
    }
  },

  // Marquer toutes comme lues
  async markAllRead() {
    try {
      await Api.put('/notifications/lues', {});
      const badge = document.getElementById('notif-count');
      if (badge) badge.textContent = '';
    } catch(e) { /* silencieux */ }
  }
};
