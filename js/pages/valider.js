/* ================================================
   VALIDER.JS - Helpers pour la validation côté professeur
   ================================================ */

// Confirmer et valider rapidement depuis la liste
async function validerRapide(id) {
  if (!confirm('Valider ce mémoire ? L\'auteur sera notifié par email.')) return;
  try {
    const res = await Api.put(`/soumissions/${id}/valider`, {});
    if (res) {
      showToast('✅ Mémoire validé !', 'success');
      // Retirer la ligne du tableau sans recharger
      const row = document.getElementById(`row-${id}`);
      if (row) {
        row.style.transition = 'opacity 0.4s';
        row.style.opacity = '0';
        setTimeout(() => row.remove(), 400);
      }
    }
  } catch(e) {
    showToast('Erreur lors de la validation.', 'error');
  }
}

// Rejeter rapidement depuis la liste
async function rejeterRapide(id) {
  if (!confirm('Rejeter ce mémoire ? L\'auteur sera notifié par email.')) return;
  try {
    const res = await Api.put(`/soumissions/${id}/rejeter`, {});
    if (res) {
      showToast('Mémoire rejeté.', 'success');
      const row = document.getElementById(`row-${id}`);
      if (row) {
        row.style.transition = 'opacity 0.4s';
        row.style.opacity = '0';
        setTimeout(() => row.remove(), 400);
      }
    }
  } catch(e) {
    showToast('Erreur lors du rejet.', 'error');
  }
}

// Mini toast notification
function showToast(msg, type = 'success') {
  const toast = document.createElement('div');
  toast.className = `alert alert-${type}`;
  toast.style.cssText = 'position:fixed;bottom:24px;right:24px;z-index:999;min-width:260px;box-shadow:0 4px 16px rgba(0,0,0,.15)';
  toast.textContent = msg;
  document.body.appendChild(toast);
  setTimeout(() => { toast.style.opacity='0'; toast.style.transition='opacity 0.4s'; setTimeout(()=>toast.remove(),400); }, 3000);
}
