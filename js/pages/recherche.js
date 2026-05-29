async function doSearch() {
  const q       = document.getElementById('search-input')?.value.trim().toLowerCase() || '';
  const domaine = document.getElementById('filtre-domaine')?.value || '';
  const annee   = document.getElementById('filtre-annee')?.value   || '';
  const tri     = document.getElementById('filtre-tri')?.value     || 'recent';
  const grid    = document.getElementById('memoire-grid');
  const count   = document.getElementById('results-count');

  grid.innerHTML = '<p style="grid-column:1/-1;text-align:center;padding:40px;color:var(--gris-texte)">Chargement…</p>';

  // Simulation d'un délai réseau
  await new Promise(resolve => setTimeout(resolve, 500));

  const allMemoires = [
    { id: 1, titre: "Intelligence Artificielle et Santé", auteur: "Jean Dupont", domaine: "Informatique", annee: "2023", likes: 12, commentaires: 4, statut: "valide" },
    { id: 2, titre: "Blockchain et Sécurité", auteur: "Marie Curie", domaine: "Informatique", annee: "2022", likes: 8, commentaires: 2, statut: "valide" },
    { id: 3, titre: "Impact du Télétravail sur la Productivité", auteur: "Lucie Bernard", domaine: "Gestion", annee: "2023", likes: 15, commentaires: 7, statut: "valide" },
    { id: 4, titre: "Energies Renouvelables au Bénin", auteur: "Koffi Mensah", domaine: "Environnement", annee: "2021", likes: 20, commentaires: 10, statut: "valide" },
    { id: 5, titre: "Optimisation des Algorithmes de Tri", auteur: "Alice Martin", domaine: "Informatique", annee: "2023", likes: 5, commentaires: 1, statut: "en_attente" }
  ];

  let filtered = allMemoires.filter(m => {
    const matchQ = !q || m.titre.toLowerCase().includes(q) || m.auteur.toLowerCase().includes(q);
    const matchDomaine = !domaine || m.domaine === domaine;
    const matchAnnee = !annee || m.annee === annee;
    return matchQ && matchDomaine && matchAnnee;
  });

  if (tri === 'popularite') {
    filtered.sort((a, b) => (b.likes + b.commentaires) - (a.likes + a.commentaires));
  } else {
    filtered.sort((a, b) => b.annee.localeCompare(a.annee));
  }

  if (!filtered.length) {
    grid.innerHTML = '<p style="grid-column:1/-1;text-align:center;padding:40px;color:var(--gris-texte)">Aucun mémoire trouvé.</p>';
    if (count) count.textContent = '';
    return;
  }

  if (count) count.textContent = `${filtered.length} mémoire(s) trouvé(s)`;
  grid.innerHTML = filtered.map(m => renderCard(m)).join('');
}

function renderCard(m) {
  return `
    <div class="memoire-card">
      <div class="memoire-card-header">
        <h4>${m.titre || 'Sans titre'}</h4>
      </div>
      <div class="memoire-card-body">
        <div class="memoire-meta">
          <span>Auteur : ${m.auteur   || '—'}</span>
          <span>Domaine : ${m.domaine  || '—'}</span>
          <span>Année : ${m.annee    || '—'}</span>
          <span>${m.likes    ?? 0} likes · ${m.commentaires ?? 0} comms</span>
        </div>
      </div>
      <div class="memoire-card-footer">
        <a href="consulter-memoire.html?id=${m.id}" class="btn btn-primary btn-sm">Consulter</a>
        <span class="badge ${m.statut === 'valide' ? 'badge-success' : 'badge-warning'}" style="margin-left:auto;align-self:center">
          ${m.statut === 'valide' ? 'Validé' : 'En attente'}
        </span>
      </div>
    </div>
  `;
}
