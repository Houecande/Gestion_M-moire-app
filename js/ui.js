/**
 * JS pour les interactions visuelles uniquement (Version 2026 Statique)
 */
document.addEventListener('DOMContentLoaded', () => {
  // 1. Menu Actif dans la sidebar
  const currentPath = window.location.pathname;
  const sidebarLinks = document.querySelectorAll('.sidebar a');
  sidebarLinks.forEach(link => {
    if (currentPath.includes(link.getAttribute('href'))) {
      link.classList.add('active');
    }
  });

  // 2. Toggle Password visuel
  window.togglePassword = (btn) => {
    const input = btn.parentElement.querySelector('input');
    if (input) {
      input.type = input.type === 'password' ? 'text' : 'password';
      btn.textContent = input.type === 'password' ? '👁️' : '🙈';
    }
  };

  // 3. Like Chip Style Facebook (Toggle visuel)
  window.toggleLike = (chip) => {
    chip.classList.toggle('active');
    const countSpan = chip.querySelector('.like-count');
    if (countSpan) {
      let count = parseInt(countSpan.textContent);
      count = chip.classList.contains('active') ? count + 1 : count - 1;
      countSpan.textContent = count;
    }
  };

  // 4. Scroll Reveal Simple
  const revealElements = document.querySelectorAll('.card, .hero-content, .feature-card');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.1 });

  revealElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'all 0.6s ease-out';
    observer.observe(el);
  });
});
