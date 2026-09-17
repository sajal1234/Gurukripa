// Login page

import { login } from '../auth.js';
import { getUsers } from '../store.js';
import { showToast } from '../components.js';

export function renderLogin() {
  return `
    <div class="login-page">
      <div class="login-hero">
        <div class="login-hero-content">
          <h1>Gurukripa Restaurant</h1>
          <p>Modern restaurant management system for seamless operations, ordering, and analytics.</p>
          <div class="login-features">
            <div class="login-feature">
              <div class="login-feature-icon">📊</div>
              <span>Real-time dashboard & analytics</span>
            </div>
            <div class="login-feature">
              <div class="login-feature-icon">🍽️</div>
              <span>POS-style order management</span>
            </div>
            <div class="login-feature">
              <div class="login-feature-icon">📋</div>
              <span>Menu, reports & user management</span>
            </div>
          </div>
        </div>
      </div>
      <div class="login-form-panel">
        <div class="login-form-wrapper">
          <h2>Welcome back</h2>
          <p class="subtitle">Sign in to your account to continue</p>

          <div class="login-credentials-hint">
            <strong>Demo Credentials</strong>
            Admin: <code>admin@restaurant.com</code> / <code>admin123</code><br>
            Manager: <code>manager@restaurant.com</code> / <code>manager123</code>
          </div>

          <form id="login-form">
            <div class="form-group">
              <label for="email">Username / Email</label>
              <input type="text" id="email" class="form-control" placeholder="Enter your email" required>
            </div>
            <div class="form-group">
              <label for="password">Password</label>
              <input type="password" id="password" class="form-control" placeholder="Enter your password" required>
            </div>
            <div class="flex-between mb-2">
              <label class="checkbox-group">
                <input type="checkbox" id="remember"> Remember me
              </label>
              <a href="#" id="forgot-password" style="font-size:0.85rem;">Forgot password?</a>
            </div>
            <div class="form-error hidden" id="login-error"></div>
            <button type="submit" class="btn btn-primary btn-lg btn-block">Sign In</button>
          </form>
        </div>
      </div>
    </div>`;
}

export function bindLogin(onNavigate) {
  document.getElementById('login-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const errorEl = document.getElementById('login-error');

    const result = login(email, password, getUsers());
    if (result.success) {
      showToast(`Welcome back, ${result.user.name}!`);
      onNavigate('/dashboard');
    } else {
      errorEl.textContent = result.error;
      errorEl.classList.remove('hidden');
    }
  });

  document.getElementById('forgot-password')?.addEventListener('click', (e) => {
    e.preventDefault();
    showToast('Password reset link sent to your email (simulated)', 'warning');
  });
}
