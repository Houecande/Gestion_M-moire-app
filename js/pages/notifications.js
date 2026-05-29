/* NOTIFICATIONS.JS - Gestion des notifications in-app */

const Notifications = {
  // Charger le nombre de notifs non lues (pour le badge navbar)
  async loadCount() {
    // Données statiques
    const count = 2;
    if (count > 0) {
      const badge = document.getElementById('notif-count');
      if (badge) badge.textContent = count;
    }
  },

  // Charger la liste complète
  async loadList(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    // Simulation d'un délai
    await new Promise(resolve => setTimeout(resolve, 300));

    const data = [
      { id: 1, type: 'validation', titre: 'Mémoire validé', message: 'Votre mémoire "IA et Santé" a été validé par le professeur.', date: 'Il y a 2h', lu: false },
      { id: 2, type: 'rejet', titre: 'Action requise', message: 'Veuillez corriger la bibliographie de votre soumission.', date: 'Hier', lu: false },
      { id: 3, type: 'info', titre: 'Nouveau message', message: 'Votre directeur de mémoire a laissé un commentaire.', date: 'Il y a 3 jours', lu: true }
    ];

    if (!data || !data.length) {
      container.innerHTML = '<p style="color:var(--gris-texte);text-align:center;padding:20px">Aucune notification.</p>';
      return;
    }
    container.innerHTML = data.map(n => `
      <div class="recent-item ${n.lu ? '' : 'notif-unread'}" style="${!n.lu ? 'border-left:3px solid var(--bleu);' : ''}">
        <div class="recent-icon">${n.type === 'validation' ? '[V]' : n.type === 'rejet' ? '[X]' : '[!]'}</div>
        <div class="recent-info">
          <strong>${n.titre}</strong>
          <span>${n.message}</span>
        </div>
        <span class="recent-date">${n.date}</span>
      </div>
    `).join('');
  },

  // Marquer toutes comme lues
  async markAllRead() {
    const badge = document.getElementById('notif-count');
    if (badge) badge.textContent = '';
    // On pourrait aussi recharger la liste en marquant tout comme lu localement
    const unreadItems = document.querySelectorAll('.notif-unread');
    unreadItems.forEach(item => {
      item.classList.remove('notif-unread');
      item.style.borderLeft = 'none';
    });
  }
};
