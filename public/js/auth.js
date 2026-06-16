// Auth JS — used by signup.html and login.html

// ── Signup ───────────────────────────────────────────────────────────────────

function initSignup() {
  const form     = document.getElementById('signup-form');
  const usernameInput = document.getElementById('username');
  const passwordInput = document.getElementById('password');
  const alert    = document.getElementById('signup-alert');
  const btn      = document.getElementById('signup-btn');
  const spinner  = document.getElementById('signup-spinner');
  const btnText  = document.getElementById('signup-btn-text');
  const statusEl = document.getElementById('username-status');

  let checkTimeout = null;
  let usernameOk = false;

  // Live username availability check
  usernameInput.addEventListener('input', () => {
    const val = usernameInput.value.trim();
    usernameOk = false;
    clearTimeout(checkTimeout);

    if (!val) {
      setStatus('', '');
      return;
    }

    if (!/^[a-zA-Z0-9_-]{3,24}$/.test(val)) {
      setStatus('taken', 'Invalid');
      return;
    }

    setStatus('checking', 'Checking...');

    checkTimeout = setTimeout(async () => {
      try {
        const res = await fetch(`/api/check/${encodeURIComponent(val)}`);
        const data = await res.json();
        if (data.available) {
          setStatus('available', 'Available');
          usernameOk = true;
        } else {
          setStatus('taken', data.reason || 'Taken');
        }
      } catch {
        setStatus('', '');
      }
    }, 400);
  });

  function setStatus(type, text) {
    statusEl.className = 'username-status';
    if (!type) { statusEl.innerHTML = ''; return; }
    statusEl.classList.add(type);
    statusEl.innerHTML = `<span class="username-status-dot"></span>${text}`;
  }

  // Password strength
  passwordInput.addEventListener('input', () => {
    updateStrength(passwordInput.value);
  });

  function updateStrength(pw) {
    const bars = ['bar1','bar2','bar3','bar4'];
    let score = 0;
    if (pw.length >= 8)  score++;
    if (/[A-Z]/.test(pw)) score++;
    if (/[0-9]/.test(pw)) score++;
    if (/[^A-Za-z0-9]/.test(pw)) score++;

    bars.forEach((id, i) => {
      const el = document.getElementById(id);
      el.className = 'strength-bar';
      if (i < score) {
        if (score <= 1) el.classList.add('weak');
        else if (score <= 2) el.classList.add('fair');
        else el.classList.add('strong');
      }
    });
  }

  // Form submit
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    hideAlert(alert);

    const username = usernameInput.value.trim();
    const email    = document.getElementById('email').value.trim();
    const password = passwordInput.value;

    if (!usernameOk) {
      showAlert(alert, 'Please choose an available username.');
      return;
    }

    setLoading(btn, spinner, btnText, true);
    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password })
      });
      const data = await res.json();

      if (!res.ok) {
        showAlert(alert, data.error || 'Something went wrong.');
        return;
      }

      // Redirect to dashboard
      window.location.href = '/dashboard';
    } catch {
      showAlert(alert, 'Network error. Please try again.');
    } finally {
      setLoading(btn, spinner, btnText, false);
    }
  });
}

// ── Login ────────────────────────────────────────────────────────────────────

function initLogin() {
  const form    = document.getElementById('login-form');
  const alert   = document.getElementById('login-alert');
  const btn     = document.getElementById('login-btn');
  const spinner = document.getElementById('login-spinner');
  const btnText = document.getElementById('login-btn-text');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    hideAlert(alert);

    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;

    if (!username || !password) {
      showAlert(alert, 'Please fill in all fields.');
      return;
    }

    setLoading(btn, spinner, btnText, true);
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      const data = await res.json();

      if (!res.ok) {
        showAlert(alert, data.error || 'Invalid credentials.');
        return;
      }

      window.location.href = '/dashboard';
    } catch {
      showAlert(alert, 'Network error. Please try again.');
    } finally {
      setLoading(btn, spinner, btnText, false);
    }
  });
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function showAlert(el, msg) {
  el.textContent = msg;
  el.className = 'alert alert-error show';
}

function hideAlert(el) {
  el.className = 'alert';
  el.textContent = '';
}

function setLoading(btn, spinner, text, loading) {
  btn.disabled = loading;
  spinner.classList.toggle('show', loading);
  text.style.opacity = loading ? '0.5' : '1';
}
