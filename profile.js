// Profile page JS — renders user profile dynamically

(async () => {
  const username = window.location.pathname.replace(/^\//, '').split('/')[0];
  if (!username) return;

  try {
    const res = await fetch(`/api/users/${encodeURIComponent(username)}`);
    if (!res.ok) {
      showNotFound();
      return;
    }
    const user = await res.json();
    renderProfile(user);
  } catch {
    showNotFound();
  }
})();

// ── Social platform definitions ────────────────────────────────────────────────
const PLATFORMS = {
  twitter:   { label: 'Twitter / X',  icon: `<svg viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.766l7.73-8.835L2.013 2.25H8.08l4.259 5.622L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>`,  color: '#1DA1F2' },
  instagram: { label: 'Instagram',    icon: `<svg viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>`, color: '#E1306C' },
  tiktok:    { label: 'TikTok',       icon: `<svg viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.34 6.34 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.27 8.27 0 004.84 1.56V6.82a4.85 4.85 0 01-1.07-.13z"/></svg>`,  color: '#69C9D0' },
  youtube:   { label: 'YouTube',      icon: `<svg viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>`, color: '#FF0000' },
  discord:   { label: 'Discord',      icon: `<svg viewBox="0 0 24 24"><path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028 14.09 14.09 0 001.226-1.994.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/></svg>`, color: '#5865F2' },
  github:    { label: 'GitHub',       icon: `<svg viewBox="0 0 24 24"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>`, color: '#ffffff' },
  twitch:    { label: 'Twitch',       icon: `<svg viewBox="0 0 24 24"><path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714z"/></svg>`, color: '#9146FF' },
  spotify:   { label: 'Spotify',      icon: `<svg viewBox="0 0 24 24"><path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/></svg>`, color: '#1DB954' },
  steam:     { label: 'Steam',        icon: `<svg viewBox="0 0 24 24"><path d="M11.979 0C5.678 0 .511 4.86.022 11.037l6.432 2.658c.545-.371 1.203-.59 1.912-.59.063 0 .125.004.188.006l2.861-4.142V8.91c0-2.495 2.028-4.524 4.524-4.524 2.494 0 4.524 2.031 4.524 4.527s-2.03 4.525-4.524 4.525h-.105l-4.076 2.911c0 .052.004.105.004.159 0 1.875-1.515 3.396-3.39 3.396-1.635 0-3.016-1.173-3.331-2.727L.436 15.27C1.862 20.307 6.486 24 11.979 24c6.627 0 11.999-5.373 11.999-12S18.606 0 11.979 0zM7.54 18.21l-1.473-.61c.262.543.714.999 1.314 1.25 1.297.539 2.793-.076 3.332-1.375.263-.63.264-1.319.005-1.949s-.75-1.121-1.377-1.383c-.624-.26-1.297-.249-1.913-.052l1.522.63c.956.4 1.409 1.5 1.009 2.455-.397.957-1.497 1.41-2.454 1.034h.029zM17.333 8.91c0-1.659-1.351-3.01-3.01-3.01-1.658 0-3.009 1.351-3.009 3.01 0 1.658 1.351 3.009 3.009 3.009 1.659 0 3.01-1.351 3.01-3.009zm-5.274-.009c0-1.232 1.003-2.234 2.234-2.234s2.232 1.002 2.232 2.234c0 1.229-1.001 2.231-2.232 2.231-1.231 0-2.234-1.002-2.234-2.231z"/></svg>`, color: '#1b2838' },
  linkedin:  { label: 'LinkedIn',     icon: `<svg viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>`, color: '#0077B5' },
  snapchat:  { label: 'Snapchat',     icon: `<svg viewBox="0 0 24 24"><path d="M12.206.793c.99 0 4.347.276 5.93 3.821.529 1.193.403 3.219.317 4.Baron.072.036.205.107.375.107.166 0 .375-.107.513-.107.794 0 1.323.521 1.323 1.071 0 .728-.639 1.125-1.238 1.263-.23.05-.551.104-.811.124-.3 1.131-.95 2.124-1.851 2.914C16.5 14.5 17.5 16 18.5 17.5c-1.5.5-3.5.5-6.5.5s-5-.5-6.5-.5c1-1.5 2-3 2.5-3.5-.9-.79-1.55-1.783-1.85-2.914-.26-.02-.58-.074-.81-.124-.6-.138-1.24-.535-1.24-1.263 0-.55.53-1.071 1.32-1.071.14 0 .35.107.51.107.17 0 .31-.071.38-.107-.09-1 .21-3.028.32-3.821C5.447 1.069 8.803.793 12.206.793z"/></svg>`, color: '#FFFC00' },
  website:   { label: 'Website',      icon: `<svg viewBox="0 0 24 24" stroke="currentColor" fill="none" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg>`, color: '#888' },
};

// ── Render profile ─────────────────────────────────────────────────────────────

function renderProfile(user) {
  const loadingEl = document.getElementById('profile-loading');
  const pageEl    = document.getElementById('profile-page');

  // Set theme
  document.body.setAttribute('data-theme', user.theme || 'glass');

  // Apply background
  const bgEl = document.getElementById('profile-bg');
  const glowEl = document.getElementById('profile-glow');

  if (user.bg_type === 'color') {
    bgEl.style.background = user.bg_value || '';
  } else if (user.bg_type === 'gradient') {
    bgEl.style.background = user.bg_value || '';
  } else if (user.bg_type === 'image') {
    bgEl.style.backgroundImage = `url(${user.bg_value})`;
    bgEl.style.backgroundSize = 'cover';
    bgEl.style.backgroundPosition = 'center';
  }

  // Apply accent color
  if (user.accent_color) {
    const hex = user.accent_color;
    const r = parseInt(hex.slice(1,3),16);
    const g = parseInt(hex.slice(3,5),16);
    const b = parseInt(hex.slice(5,7),16);
    document.documentElement.style.setProperty('--profile-accent', hex);
    document.documentElement.style.setProperty('--profile-accent-glow', `rgba(${r},${g},${b},0.3)`);
    if (glowEl) {
      glowEl.style.background = `radial-gradient(ellipse at center, rgba(${r},${g},${b},0.25) 0%, transparent 65%)`;
    }
  }

  // Page title
  const displayName = user.display_name || user.username;
  document.getElementById('page-title').textContent = `${displayName} — cxt.lol`;
  document.getElementById('page-description').setAttribute('content', user.bio || `View ${displayName}'s profile on cxt.lol`);

  // Avatar
  const avatarContainer = document.getElementById('avatar-container');
  if (user.avatar_url) {
    const img = document.createElement('img');
    img.src = user.avatar_url;
    img.alt = displayName;
    img.className = 'profile-avatar';
    img.onerror = () => { avatarContainer.innerHTML = initialsEl(displayName); };
    avatarContainer.appendChild(img);
  } else {
    avatarContainer.innerHTML = initialsEl(displayName);
  }

  // Name & username
  document.getElementById('profile-name').textContent = displayName;
  document.getElementById('profile-username-display').textContent = `cxt.lol/${user.username}`;

  // Bio
  if (user.bio) {
    const bioEl = document.getElementById('profile-bio');
    bioEl.textContent = user.bio;
    bioEl.style.display = 'block';
  }

  // UID
  document.getElementById('uid-num').textContent = `#${user.uid}`;
  document.getElementById('uid-total').textContent = `of ${(user.total_users || user.uid).toLocaleString()} members`;

  // Social links
  const linksEl = document.getElementById('profile-links');
  const links = Array.isArray(user.social_links) ? user.social_links : [];
  if (links.length > 0) {
    links.forEach(link => {
      if (!link.url) return;
      const platform = PLATFORMS[link.platform] || PLATFORMS.website;
      const a = document.createElement('a');
      a.href = link.url.startsWith('http') ? link.url : `https://${link.url}`;
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
      a.className = 'profile-link';

      a.innerHTML = `
        <div class="profile-link-icon" style="background:${platform.color}18;">
          ${platform.icon}
        </div>
        <span class="profile-link-label">${link.label || platform.label}</span>
        <svg class="profile-link-arrow" viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M7 17L17 7M7 7h10v10"/>
        </svg>
      `;
      linksEl.appendChild(a);
    });
  } else {
    linksEl.innerHTML = `<div style="text-align:center;color:var(--text-3);font-size:13px;padding:16px 0;">No links added yet.</div>`;
  }

  // Views
  document.getElementById('views-count').textContent = (user.views || 0).toLocaleString();

  // Show page
  loadingEl.style.display = 'none';
  pageEl.style.display = 'flex';
}

function initialsEl(name) {
  const initials = (name || '?').split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase();
  return `<div class="profile-avatar-initials">${initials}</div>`;
}

function showNotFound() {
  document.getElementById('profile-loading').style.display = 'none';
  document.body.innerHTML = `
    <div style="min-height:100vh;display:flex;align-items:center;justify-content:center;text-align:center;padding:24px;flex-direction:column;font-family:'Inter',sans-serif;background:#07070e;color:#f4f4ff;">
      <div style="font-family:'Space Grotesk',sans-serif;font-size:5rem;font-weight:700;letter-spacing:-0.06em;background:linear-gradient(135deg,#a78bfa,#7c3aed);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;line-height:1;margin-bottom:16px;">404</div>
      <h2 style="font-size:1.4rem;color:#c4c4d4;margin-bottom:10px;">User not found</h2>
      <p style="color:#8888a8;font-size:15px;margin-bottom:32px;">This profile doesn't exist — but yours could.</p>
      <div style="display:flex;gap:10px;flex-wrap:wrap;justify-content:center;">
        <a href="/" style="padding:10px 20px;border-radius:8px;border:1px solid rgba(255,255,255,0.1);color:#c4c4d4;text-decoration:none;font-size:14px;">Go home</a>
        <a href="/signup" style="padding:10px 20px;border-radius:8px;background:linear-gradient(135deg,#7c3aed,#a78bfa);color:#fff;text-decoration:none;font-size:14px;font-weight:500;">Claim your username</a>
      </div>
    </div>
  `;
}
