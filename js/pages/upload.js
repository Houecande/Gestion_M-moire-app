/* ================================================
   UPLOAD.JS - Gestion upload fichier + soumission
   ================================================ */

let selectedFile = null;

// Drag & Drop
const zone = document.getElementById('upload-zone');
if (zone) {
  zone.addEventListener('dragover',  e => { e.preventDefault(); zone.classList.add('dragover'); });
  zone.addEventListener('dragleave', () => zone.classList.remove('dragover'));
  zone.addEventListener('drop', e => {
    e.preventDefault();
    zone.classList.remove('dragover');
    const file = e.dataTransfer.files[0];
    if (file) setFile(file);
  });
}

// Sélection via input
const fileInput = document.getElementById('file-input');
if (fileInput) {
  fileInput.addEventListener('change', e => {
    if (e.target.files[0]) setFile(e.target.files[0]);
  });
}

function setFile(file) {
  if (file.type !== 'application/pdf') {
    showAlert('Seuls les fichiers PDF sont acceptés.', 'error'); return;
  }
  if (file.size > 50 * 1024 * 1024) {
    showAlert('Fichier trop volumineux (max 50 Mo).', 'error'); return;
  }
  selectedFile = file;
  document.getElementById('file-name').textContent = file.name;
  document.getElementById('file-size').textContent = formatSize(file.size);
  document.getElementById('file-preview').style.display = 'flex';
  document.getElementById('upload-zone').style.display   = 'none';
}

function removeFile() {
  selectedFile = null;
  document.getElementById('file-input').value = '';
  document.getElementById('file-preview').style.display = 'none';
  document.getElementById('upload-zone').style.display  = '';
}

function formatSize(bytes) {
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' Ko';
  return (bytes / (1024 * 1024)).toFixed(1) + ' Mo';
}

function showAlert(msg, type = 'error') {
  const box = document.getElementById('alert-box');
  if (!box) return;
  box.className = `alert alert-${type}`;
  box.textContent = msg;
  box.style.display = 'flex';
  setTimeout(() => { box.style.display = 'none'; }, 5000);
}

async function submitMemoire() {
  const titre    = document.getElementById('titre')?.value.trim();
  const auteur   = document.getElementById('auteur')?.value.trim();
  const annee    = document.getElementById('annee')?.value;
  const domaine  = document.getElementById('domaine')?.value;

  if (!titre || !auteur || !annee || !domaine) {
    showAlert('Veuillez remplir les champs obligatoires (*).'); return;
  }
  if (!selectedFile) {
    showAlert('Veuillez joindre un fichier PDF.'); return;
  }

  const btn = document.getElementById('submit-btn');
  btn.disabled = true; btn.textContent = 'Envoi en cours…';

  // Barre de progression simulée (remplacer par XHR si upload réel)
  const wrap = document.getElementById('progress-wrap');
  const fill  = document.getElementById('progress-fill');
  const label = document.getElementById('progress-label');
  wrap.style.display = '';
  let pct = 0;
  const interval = setInterval(() => {
    pct = Math.min(pct + 10, 90);
    fill.style.width  = pct + '%';
    label.textContent = pct + '%';
  }, 200);

  try {
    // Simulation d'un délai pour l'upload
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    clearInterval(interval);
    fill.style.width = '100%'; label.textContent = '100%';

    showAlert('Mémoire uploadé avec succès (simulation) !', 'success');
    setTimeout(() => window.location.href = 'dashboard.html', 1500);
  } catch(e) {
    clearInterval(interval);
    showAlert('Erreur lors de la soumission.');
    btn.disabled = false; btn.textContent = 'Publier le mémoire';
  }
}
