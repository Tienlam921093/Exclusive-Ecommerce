(() => {
  const container = document.querySelector('.google-auth');
  if (!container) return;

  const status = document.querySelector('.auth-status');
  const mode = container.dataset.mode === 'login' ? 'signin' : 'signup';
  let initialized = false;

  function showStatus(message, error = false) {
    status.textContent = message;
    status.classList.toggle('is-error', error);
  }

  function friendlyGoogleError(message) {
    if (/origin is not allowed|403|not allowed for the given client id|origin_mismatch/i.test(message)) {
      return `Google từ chối Client ID cho địa chỉ hiện tại (${window.location.origin}). Thêm đúng origin này vào JavaScript origins của chính OAuth Client ID đang cấu hình rồi lưu thay đổi.`;
    }
    if (/Could not reach Google to verify/i.test(message)) {
      return 'Máy chủ không kết nối được tới Google để xác minh tài khoản. Hãy kiểm tra kết nối Internet hoặc quyền truy cập mạng của Node.js.';
    }
    if (/Could not load Google signing keys|signing key service returned/i.test(message)) {
      return 'Google đang gặp lỗi khi xác minh. Vui lòng thử lại sau ít phút.';
    }
    return message;
  }

  async function handleGoogleCredential(response) {
    showStatus('Verifying your Google account…');
    try {
      const result = await fetch('/api/auth/google', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        credentials: 'same-origin',
        body: JSON.stringify({ credential: response.credential }),
      });
      const data = await result.json();
      if (!result.ok) throw new Error(data.error || 'Google sign-in failed.');
      showStatus(`Signed in as ${data.user.name}.`);
      window.location.assign('index.html');
    } catch (error) {
      showStatus(friendlyGoogleError(error.message || 'Could not sign in with Google. Please try again.'), true);
    }
  }

  function loadGoogleScript() {
    if (window.google?.accounts?.id) return Promise.resolve();
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = 'https://accounts.google.com/gsi/client';
      script.async = true;
      script.defer = true;
      script.onload = resolve;
      script.onerror = () => reject(new Error('Google Sign-In could not load. Check your internet connection.'));
      document.head.append(script);
    });
  }

  async function initialize() {
    if (initialized) return;
    initialized = true;
    container.setAttribute('aria-busy', 'true');
    showStatus('Loading Google Sign-In…');
    try {
      const configResponse = await fetch('/api/config', { credentials: 'same-origin' });
      const config = await configResponse.json();
      if (!config.googleClientId) {
        throw new Error('Google Sign-In needs a Google OAuth Client ID. Set GOOGLE_CLIENT_ID and restart the server.');
      }
      container.dataset.clientId = config.googleClientId;
      container.dataset.origin = window.location.origin;
      await loadGoogleScript();
      window.google.accounts.id.initialize({ client_id: config.googleClientId, callback: handleGoogleCredential, ux_mode: 'popup' });
      window.google.accounts.id.renderButton(container, { type: 'standard', theme: 'outline', size: 'large', text: mode, shape: 'rect', width: Math.round(container.getBoundingClientRect().width) });
      showStatus('');
    } catch (error) {
      showStatus(error.message || 'Google Sign-In could not be initialized.', true);
      container.classList.add('google-auth-disabled');
    } finally {
      container.removeAttribute('aria-busy');
    }
  }

  initialize();
})();
