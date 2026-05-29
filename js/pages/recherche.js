/* ================================================
   RECHERCHE.JS - Recherche + affichage des mémoires
   ================================================ */

async function doSearch() {
  const q       = document.getElementById('search-input')?.value.trim() || '';
  const domaine = document.getElementById('filtre-domaine')?.value || '';
  const annee   = document.getElementById('filtre-annee')?.value   || '';
  const tri     = document.getElementById('filtre-tri')?.value     || 'recent';
  const grid    = document.getElementById('memoire-grid');
  const count   = document.getElementById('results-count');

  grid.innerHTML = '<p style="grid-column:1/-1;text-align:center;padding:40px;color:var(--gris-texte)">Chargement…</p>';

  try {
    const params = new URLSearchParams();
    if (q)       params.append('q', q);
    if (domaine) params.append('domaine', domaine);
    if (annee)   params.append('annee', annee);
    params.append('sort', tri);

    const data = await Api.get(`/memoires?${params.toString()}`);

    if (!data || !data.length) {
      grid.innerHTML = '<p style="grid-column:1/-1;text-align:center;padding:40px;color:var(--gris-texte)">Aucun mémoire trouvé.</p>';
      if (count) count.textContent = '';
      return;
    }

    if (count) count.textContent = `${data.length} mémoire(s) trouvé(s)`;
    grid.innerHTML = data.map(m => renderCard(m)).join('');

  } catch(e) {
    grid.innerHTML = '<p style="grid-column:1/-1;text-align:center;padding:40px;color:var(--gris-texte)">Erreur de chargement. Vérifiez la connexion.</p>';
  }
}

function renderCard(m) {
  return `
    <div class="memoire-card">
      <div class="memoire-card-header">
        <h4>${m.titre || 'Sans titre'}</h4>
      </div>
      <div class="memoire-card-body">
        <div class="memoire-meta">
          <span>👤 ${m.auteur   || '—'}</span>
          <span>📁 ${m.domaine  || '—'}</span>
          <span>📅 ${m.annee    || '—'}</span>
          <span>❤️ ${m.likes    ?? 0} · 💬 ${m.commentaires ?? 0}</span>
        </div>
      </div>
      <div class="memoire-card-footer">
        <a href="consulter-memoire.html?id=${m.id}" class="btn btn-primary btn-sm">📖 Consulter</a>
        <span class="badge ${m.statut === 'valide' ? 'badge-success' : 'badge-warning'}" style="margin-left:auto;align-self:center">
          ${m.statut === 'valide' ? 'Validé' : 'En attente'}
        </span>
      </div>
    </div>
  `;
}
