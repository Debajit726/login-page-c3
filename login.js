document.addEventListener('DOMContentLoaded', () => {
  const passwordInput = document.getElementById('passwordInput');
  const togglePassword = document.getElementById('togglePassword');
  const loginForm = document.getElementById('loginForm');
  const loginBtn = document.getElementById('loginBtn');
  const usernameInput = document.getElementById('usernameInput');

  // Password visibility toggle
  if (passwordInput && togglePassword) {
    if (togglePassword.tagName.toLowerCase() === 'button') {
      togglePassword.type = 'button';
    }

    togglePassword.addEventListener('click', function () {
      const isHidden = passwordInput.type === 'password';
      passwordInput.type = isHidden ? 'text' : 'password';

      // Toggle eye/eye-slash icon
      const icon = this.querySelector('i');
      if (icon) {
        icon.classList.toggle('fa-eye');
        icon.classList.toggle('fa-eye-slash');
      }

      // Update accessibility attributes
      this.setAttribute('aria-pressed', isHidden ? 'true' : 'false');
      this.setAttribute('aria-label', isHidden ? 'Hide password' : 'Show password');
    });
  }

  // Form validation with jello animation on submit
  if (loginForm && loginBtn) {
    const usernameError = document.getElementById('usernameError');
    const passwordError = document.getElementById('passwordError');

    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const username = usernameInput ? usernameInput.value.trim() : '';
      const password = passwordInput ? passwordInput.value.trim() : '';

      let hasError = false;

      // Validate username
      if (!username) {
        usernameInput.classList.add('input-error');
        if (usernameError) usernameError.classList.add('show');
        hasError = true;
      } else {
        usernameInput.classList.remove('input-error');
        if (usernameError) usernameError.classList.remove('show');
      }

      // Validate password
      if (!password) {
        passwordInput.classList.add('input-error');
        if (passwordError) passwordError.classList.add('show');
        hasError = true;
      } else {
        passwordInput.classList.remove('input-error');
        if (passwordError) passwordError.classList.remove('show');
      }

      // If there are errors, show jello animation
      if (hasError) {
        loginBtn.classList.add('jello');
        setTimeout(() => {
          loginBtn.classList.remove('jello');
        }, 900);
        return; // Don't submit
      }

      // If validation passes, apply shadow-inset-lr transition
      loginBtn.classList.add('shadow-inset-lr');

      // Optional: Reset the animation class after it completes
      setTimeout(() => {
        loginBtn.classList.remove('shadow-inset-lr');
      }, 400);

      console.log('Form submitted:', { username, password });
      // Uncomment to actually submit: loginForm.submit();
    });

    // Remove error on input focus/change
    if (usernameInput) {
      usernameInput.addEventListener('input', () => {
        usernameInput.classList.remove('input-error');
        if (usernameError) usernameError.classList.remove('show');
      });
    }

    if (passwordInput) {
      passwordInput.addEventListener('input', () => {
        passwordInput.classList.remove('input-error');
        if (passwordError) passwordError.classList.remove('show');
      });
    }
  }
});