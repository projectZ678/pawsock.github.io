// Dashboard JS

// ── Platform definitions (same as profile.js) ─────────────────────────────────
const PLATFORMS = {
  twitter:   { label: 'Twitter / X',  placeholder: 'https://twitter.com/username', icon: `<svg viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.766l7.73-8.835L2.013 2.25H8.08l4.259 5.622L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>` },
  instagram: { label: 'Instagram',    placeholder: 'https://instagram.com/username', icon: `<svg viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>` },
  tiktok:    { label: 'TikTok',       placeholder: 'https://tiktok.com/@username', icon: `<svg viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.34 6.34 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.27 8.27 0 004.84 1.56V6.82a4.85 4.85 0 01-1.07-.13z"/></svg>` },
  youtube:   { label: 'YouTube',      placeholder: 'https://youtube.com/@channel', icon: `<svg viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>` },
  discord:   { label: 'Discord',      placeholder: 'https://discord.gg/invite', icon: `<svg viewBox="0 0 24 24"><path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028 14.09 14.09 0 001.226-1.994.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03z"/></svg>` },
  github:    { label: 'GitHub',       placeholder: 'https://github.com/username', icon: `<svg viewBox="0 0 24 24"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>` },
  twitch:    { label: 'Twitch',       placeholder: 'https://twitch.tv/username', icon: `<svg viewBox="0 0 24 24"><path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714z"/></svg>` },
  spotify:   { label: 'Spotify',      placeholder: 'https://open.spotify.com/user/...', icon: `<svg viewBox="0 0 24 24"><path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/></svg>` },
  steam:     { label: 'Steam',        placeholder: 'https://steamcommunity.com/id/...', icon: `<svg viewBox="0 0 24 24"><path d="M11.979 0C5.678 0 .511 4.86.022 11.037l6.432 2.658c.545-.371 1.203-.59 1.912-.59.063 0 .125.004.188.006l2.861-4.142V8.91c0-2.495 2.028-4.524 4.524-4.524 2.494 0 4.524 2.031 4.524 4.527s-2.03 4.525-4.524 4.525h-.105l-4.076 2.911c0 .052.004.105.004.159 0 1.875-1.515 3.396-3.39 3.396-1.635 0-3.016-1.173-3.331-2.727L.436 15.27C1.862 20.307 6.486 24 11.979 24c6.627 0 11.999-5.373 11.999-12S18.606 0 11.979 0z"/></svg>` },
  linkedin:  { label: 'LinkedIn',     placeholder: 'https://linkedin.com/in/username', icon: `<svg viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>` },
  snapchat:  { label: 'Snapchat',     placeholder: 'https://snapchat.com/add/username', icon: `<svg viewBox="0 0 24 24"><path d="M12.206.793c.99 0 4.347.276 5.93 3.821.529 1.193.403 3.219.317 4.48.072.036.205.107.375.107.166 0 .375-.107.513-.107.794 0 1.323.521 1.323 1.071 0 .728-.639 1.125-1.238 1.263-.23.05-.551.104-.811.124-.3 1.131-.95 2.124-1.851 2.914C16.5 14.5 17.5 16 18.5 17.5c-1.5.5-3.5.5-6.5.5s-5-.5-6.5-.5c1-1.5 2-3 2.5-3.5-.9-.79-1.55-1.783-1.85-2.914-.26-.02-.58-.074-.81-.124-.6-.138-1.24-.535-1.24-1.263 0-.55.53-1.071 1.32-1.071.14 0 .35.107.51.107.17 0 .31-.071.38-.107-.09-1 .21-3.028.32-3.821C5.447 1.069 8.803.793 12.206.793z"/></svg>` },
  website:   { label: 'Website',      placeholder: 'https://yourwebsite.com', icon: `<svg viewBox="0 0 24 24" stroke="currentColor" fill="none" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg>` },
};

// ── State ─────────────────────────────────────────────────────────────────────
let userData = null;
let pendingData = null;
let hasChanges = false;
let currentSection = 'profile';

// ── Init ──────────────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', async () => {
  await loadUser();
  initSidebar();
  initSaveBar();
  initAvatarEditor();
  initBioCounter();
  initThemePicker();
  initBgPicker();
  initSocialLinks();
  initStats();
  initSettings();
  initLogout();
});

async function loadUser() {
  try {
    const res = await fetch('/api/me');
    if (res.status === 401) {
      window.location.href = '/login';
      return;
    }
    userData = await res.json();
    pendingData = deepClone(userData);
    populateFields();
  } catch {
    window.location.href = '/login';
  }
}

function populateFields() {
  const u = userData;

  // Sidebar
  document.getElementById('sidebar-username').textContent = u.username;
  document.getElementById('sidebar-uid').textContent = `#${u.uid} of ${u.total_users}`;
  renderSidebarAvatar(u);

  // View profile link
  document.getElementById('view-profile-btn').href = `/${u.username}`;

  // Profile section
  document.getElementById('display-name').value = u.display_name || '';
  document.getElementById('bio').value = u.bio || '';
  document.getElementById('bio-count').textContent = (u.bio || '').length;

  // Avatar
  const avatarUrlInput = document.getElementById('avatar-url-input');
  avatarUrlInput.value = u.avatar_url || '';
  renderAvatarPreview(u.avatar_url, u.display_name || u.username);

  // Appearance
  document.getElementById('accent-color').value = u.accent_color || '#7c3aed';
  document.getElementById('bg-color').value = u.bg_type === 'color' ? (u.bg_value || '#0a0a14') : '#0a0a14';
  document.getElementById('bg-gradient').value = u.bg_type === 'gradient' ? u.bg_value : '';
  document.getElementById('bg-image').value    = u.bg_type === 'image' ? u.bg_value : '';

  // Theme
  selectTheme(u.theme || 'glass');

  // BG type tabs
  activateBgTab(u.bg_type || 'color');

  // Social links
  renderSocialList();
}

function renderSidebarAvatar(u) {
  const el = document.getElementById('sidebar-avatar-el');
  if (u.avatar_url) {
    el.innerHTML = `<img src="${u.avatar_url}" alt="Avatar" onerror="this.parentElement.textContent='${initials(u.display_name || u.username)}'">`;
  } else {
    el.textContent = initials(u.display_name || u.username);
  }
}

function renderAvatarPreview(url, name) {
  const el = document.getElementById('avatar-preview-el');
  if (url) {
    el.innerHTML = `<img src="${url}" alt="Avatar" onerror="this.parentElement.innerHTML='${initials(name)}'">`;
  } else {
    el.textContent = initials(name);
  }
}

function initials(name) {
  return (name || '?').split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase();
}

function deepClone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

// ── Sidebar navigation ────────────────────────────────────────────────────────
function initSidebar() {
  const toggle  = document.getElementById('sidebar-toggle');
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('sidebar-overlay');
  const saveBar = document.getElementById('save-bar');

  const titles = {
    profile:    'Edit profile',
    links:      'Social links',
    appearance: 'Appearance',
    stats:      'Stats',
    settings:   'Settings',
  };

  document.querySelectorAll('.sidebar-item[data-section]').forEach(btn => {
    btn.addEventListener('click', () => {
      const section = btn.dataset.section;
      switchSection(section);
      document.querySelectorAll('.sidebar-item').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      document.getElementById('topbar-title').textContent = titles[section] || 'Dashboard';

      // Mobile: close sidebar
      sidebar.classList.remove('open');
      overlay.classList.remove('open');

      // Hide save bar on stats/settings
      const showSaveBar = ['profile','links','appearance'].includes(section);
      saveBar.style.display = showSaveBar ? 'flex' : 'none';
    });
  });

  // Mobile toggle
  toggle.addEventListener('click', () => {
    sidebar.classList.toggle('open');
    overlay.classList.toggle('open');
  });
  overlay.addEventListener('click', () => {
    sidebar.classList.remove('open');
    overlay.classList.remove('open');
  });
}

function switchSection(name) {
  currentSection = name;
  document.querySelectorAll('.dash-section').forEach(s => s.classList.remove('active'));
  const sec = document.getElementById(`section-${name}`);
  if (sec) sec.classList.add('active');

  if (name === 'stats') refreshStats();
}

// ── Save bar ──────────────────────────────────────────────────────────────────
function initSaveBar() {
  const saveBtn    = document.getElementById('save-btn');
  const discardBtn = document.getElementById('discard-btn');
  const saveBar    = document.getElementById('save-bar');

  // Hide by default, show when changes made
  saveBar.style.display = 'none';

  // Track changes on all inputs
  document.addEventListener('input', markChanged);
  document.addEventListener('change', markChanged);

  saveBtn.addEventListener('click', saveChanges);
  discardBtn.addEventListener('click', discardChanges);
}

function markChanged() {
  if (!hasChanges) {
    hasChanges = true;
    const saveBar = document.getElementById('save-bar');
    const showSaveBar = ['profile','links','appearance'].includes(currentSection);
    if (showSaveBar) saveBar.style.display = 'flex';
  }
}

async function saveChanges() {
  const saveBtn    = document.getElementById('save-btn');
  const spinner    = document.getElementById('save-spinner');
  const saveStatus = document.getElementById('save-status');

  saveBtn.disabled = true;
  spinner.classList.add('show');

  collectPendingData();

  try {
    const res = await fetch('/api/me', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        display_name: pendingData.display_name,
        bio: pendingData.bio,
        avatar_url: pendingData.avatar_url,
        theme: pendingData.theme,
        bg_type: pendingData.bg_type,
        bg_value: pendingData.bg_value,
        accent_color: pendingData.accent_color,
        social_links: pendingData.social_links,
      })
    });

    if (res.ok) {
      userData = deepClone(pendingData);
      hasChanges = false;
      saveStatus.textContent = 'All changes saved';
      saveStatus.style.color = 'var(--success)';
      setTimeout(() => {
        saveStatus.textContent = 'Unsaved changes';
        saveStatus.style.color = '';
        document.getElementById('save-bar').style.display = 'none';
      }, 2000);
      renderSidebarAvatar(userData);
    } else {
      const data = await res.json();
      saveStatus.textContent = data.error || 'Save failed';
      saveStatus.style.color = 'var(--error)';
    }
  } catch {
    saveStatus.textContent = 'Network error';
    saveStatus.style.color = 'var(--error)';
  } finally {
    saveBtn.disabled = false;
    spinner.classList.remove('show');
  }
}

function discardChanges() {
  pendingData = deepClone(userData);
  hasChanges = false;
  populateFields();
  document.getElementById('save-bar').style.display = 'none';
  document.getElementById('save-status').textContent = 'Unsaved changes';
  document.getElementById('save-status').style.color = '';
}

function collectPendingData() {
  pendingData.display_name = document.getElementById('display-name').value.trim();
  pendingData.bio          = document.getElementById('bio').value.trim();
  pendingData.avatar_url   = document.getElementById('avatar-url-input').value.trim();
  pendingData.accent_color = document.getElementById('accent-color').value;

  // BG
  const activeBgTab = document.querySelector('.bg-type-tab.active');
  if (activeBgTab) {
    const bgType = activeBgTab.dataset.bgType;
    pendingData.bg_type = bgType;
    if (bgType === 'color')    pendingData.bg_value = document.getElementById('bg-color').value;
    if (bgType === 'gradient') pendingData.bg_value = document.getElementById('bg-gradient').value;
    if (bgType === 'image')    pendingData.bg_value = document.getElementById('bg-image').value;
  }

  // Social links from DOM
  pendingData.social_links = collectSocialLinks();
}

// ── Avatar editor ─────────────────────────────────────────────────────────────
function initAvatarEditor() {
  const fileInput = document.getElementById('avatar-file');
  const urlInput  = document.getElementById('avatar-url-input');

  fileInput.addEventListener('change', async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('avatar', file);

    try {
      const res = await fetch('/api/me/avatar', { method: 'POST', body: formData });
      const data = await res.json();
      if (data.ok) {
        urlInput.value = data.url;
        pendingData.avatar_url = data.url;
        renderAvatarPreview(data.url, userData.display_name || userData.username);
        markChanged();
      }
    } catch { /* ignore */ }
  });

  urlInput.addEventListener('input', () => {
    const url = urlInput.value.trim();
    pendingData.avatar_url = url;
    renderAvatarPreview(url, userData.display_name || userData.username);
  });
}

// ── Bio counter ───────────────────────────────────────────────────────────────
function initBioCounter() {
  const bio = document.getElementById('bio');
  bio.addEventListener('input', () => {
    document.getElementById('bio-count').textContent = bio.value.length;
  });
}

// ── Theme picker ──────────────────────────────────────────────────────────────
function initThemePicker() {
  document.querySelectorAll('.theme-option').forEach(opt => {
    opt.addEventListener('click', () => {
      const theme = opt.dataset.theme;
      selectTheme(theme);
      if (!pendingData) pendingData = deepClone(userData);
      pendingData.theme = theme;
      markChanged();
    });
  });
}

function selectTheme(theme) {
  document.querySelectorAll('.theme-option').forEach(o => o.classList.remove('selected'));
  const opt = document.querySelector(`.theme-option[data-theme="${theme}"]`);
  if (opt) opt.classList.add('selected');
}

// ── Background picker ─────────────────────────────────────────────────────────
function initBgPicker() {
  document.querySelectorAll('.bg-type-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      activateBgTab(tab.dataset.bgType);
    });
  });
}

function activateBgTab(type) {
  document.querySelectorAll('.bg-type-tab').forEach(t => t.classList.remove('active'));
  const tab = document.querySelector(`.bg-type-tab[data-bg-type="${type}"]`);
  if (tab) tab.classList.add('active');

  document.getElementById('bg-color-picker').style.display    = type === 'color'    ? 'flex' : 'none';
  document.getElementById('bg-gradient-picker').style.display = type === 'gradient' ? 'block' : 'none';
  document.getElementById('bg-image-picker').style.display    = type === 'image'    ? 'block' : 'none';
}

// ── Social links ──────────────────────────────────────────────────────────────
function initSocialLinks() {
  renderAddSocialGrid();
}

function renderSocialList() {
  const list = document.getElementById('social-list');
  const links = pendingData?.social_links || [];

  if (links.length === 0) {
    list.innerHTML = `<div style="font-size:13px;color:var(--text-3);padding:8px 0;">No links added yet. Add a platform below.</div>`;
    return;
  }

  list.innerHTML = '';
  links.forEach((link, i) => {
    const platform = PLATFORMS[link.platform] || PLATFORMS.website;
    const item = document.createElement('div');
    item.className = 'social-item';
    item.innerHTML = `
      <div class="social-item-icon">${platform.icon}</div>
      <span class="social-item-label">${platform.label}</span>
      <input type="url" value="${link.url || ''}" placeholder="${platform.placeholder}" data-index="${i}">
      <button class="social-remove" data-index="${i}" aria-label="Remove">
        <svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
        </svg>
      </button>
    `;
    list.appendChild(item);
  });

  // Events
  list.querySelectorAll('input[data-index]').forEach(input => {
    input.addEventListener('input', () => {
      pendingData.social_links[+input.dataset.index].url = input.value.trim();
      markChanged();
    });
  });

  list.querySelectorAll('.social-remove[data-index]').forEach(btn => {
    btn.addEventListener('click', () => {
      pendingData.social_links.splice(+btn.dataset.index, 1);
      renderSocialList();
      markChanged();
    });
  });
}

function renderAddSocialGrid() {
  const grid = document.getElementById('add-social-grid');
  grid.innerHTML = '';
  Object.entries(PLATFORMS).forEach(([key, p]) => {
    const btn = document.createElement('button');
    btn.className = 'add-social-btn';
    btn.title = p.label;
    btn.innerHTML = `${p.icon}<span>${p.label.split(' ')[0]}</span>`;
    btn.addEventListener('click', () => {
      if (!pendingData.social_links) pendingData.social_links = [];
      const already = pendingData.social_links.find(l => l.platform === key);
      if (already) return;
      pendingData.social_links.push({ platform: key, url: '', label: p.label });
      renderSocialList();
      markChanged();
      // Scroll to list
      document.getElementById('social-list').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });
    grid.appendChild(btn);
  });
}

function collectSocialLinks() {
  return (pendingData.social_links || []).filter(l => l.url && l.url.trim() !== '');
}

// ── Stats ─────────────────────────────────────────────────────────────────────
function initStats() {
  const copyBtn = document.getElementById('copy-link-btn');
  copyBtn?.addEventListener('click', async () => {
    const link = `${window.location.origin}/${userData.username}`;
    try {
      await navigator.clipboard.writeText(link);
      copyBtn.textContent = 'Copied';
      setTimeout(() => { copyBtn.textContent = 'Copy'; }, 2000);
    } catch { /* ignore */ }
  });
}

function refreshStats() {
  if (!userData) return;
  document.getElementById('stat-views').textContent = (userData.views || 0).toLocaleString();
  document.getElementById('stat-links').textContent = (userData.social_links?.length || 0);
  document.getElementById('stat-uid').textContent = `#${userData.uid}`;
  document.getElementById('stat-total').textContent = (userData.total_users || userData.uid).toLocaleString();

  const link = `${window.location.origin}/${userData.username}`;
  document.getElementById('profile-link-display').textContent = link;
}

// ── Settings ──────────────────────────────────────────────────────────────────
function initSettings() {
  const pwForm  = document.getElementById('pw-form');
  const pwAlert = document.getElementById('pw-alert');
  const pwBtn   = document.getElementById('pw-btn');

  pwForm?.addEventListener('submit', async (e) => {
    e.preventDefault();
    pwAlert.className = 'alert';

    const current = document.getElementById('current-pw').value;
    const next    = document.getElementById('new-pw').value;

    pwBtn.disabled = true;
    try {
      const res = await fetch('/api/me/password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ current_password: current, new_password: next })
      });
      const data = await res.json();
      if (res.ok) {
        pwAlert.textContent = 'Password updated successfully.';
        pwAlert.className = 'alert alert-success show';
        pwForm.reset();
      } else {
        pwAlert.textContent = data.error || 'Failed to update password.';
        pwAlert.className = 'alert alert-error show';
      }
    } catch {
      pwAlert.textContent = 'Network error.';
      pwAlert.className = 'alert alert-error show';
    } finally {
      pwBtn.disabled = false;
    }
  });
}

// ── Logout ────────────────────────────────────────────────────────────────────
function initLogout() {
  const logout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    window.location.href = '/';
  };
  document.getElementById('logout-btn')?.addEventListener('click', logout);
  document.getElementById('logout-btn-2')?.addEventListener('click', logout);
}
