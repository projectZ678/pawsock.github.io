// Landing page JS

document.addEventListener('DOMContentLoaded', () => {
  // Sticky nav on scroll
  const nav = document.getElementById('nav');
  const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 20);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Footer year
  const yearEl = document.getElementById('footer-year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Fetch member count and animate
  fetchStats();
});

async function fetchStats() {
  try {
    const res = await fetch('/api/stats');
    if (!res.ok) return;
    const data = await res.json();
    const total = data.total_users ?? 0;

    // Badge text
    const badgeEl = document.getElementById('hero-member-count');
    if (badgeEl) badgeEl.textContent = total.toLocaleString();

    // Animate counter
    animateCount(document.getElementById('stat-members'), total);
  } catch {
    const badgeEl = document.getElementById('hero-member-count');
    if (badgeEl) badgeEl.textContent = '0';
  }
}

function animateCount(el, target) {
  if (!el) return;
  const duration = 1200;
  const start = performance.now();
  const from = 0;

  const tick = (now) => {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.round(from + (target - from) * eased).toLocaleString();
    if (progress < 1) requestAnimationFrame(tick);
  };

  requestAnimationFrame(tick);
}
