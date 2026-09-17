// Shared UI components

import { getCurrentUser, logout, isAdmin } from './auth.js';
import { getNotifications, markNotificationRead, markAllNotificationsRead } from './store.js';
import { getInitials, formatDateTime, escapeHtml } from './utils.js';

const ICONS = {
  dashboard: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>',
  order: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>',
  orders: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>',
  menu: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 8h1a4 4 0 010 8h-1"/><path d="M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8z"/><line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/></svg>',
  analytics: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>',
  reports: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="12" y1="18" x2="12" y2="12"/><line x1="9" y1="15" x2="15" y2="15"/></svg>',
  users: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>',
  settings: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></svg>',
  inventory: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/></svg>',
  logout: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>',
};

function navLink(href, label, icon, currentRoute) {
  const active = currentRoute === href || (href !== '/dashboard' && currentRoute.startsWith(href)) ? 'active' : '';
  return `<a class="nav-link ${active}" href="#${href}" data-route="${href}">${ICONS[icon] || ''}${label}</a>`;
}

export function renderSidebar(currentRoute) {
  const user = getCurrentUser();
  const admin = isAdmin();

  const mainNav = [
    navLink('/dashboard', 'Dashboard', 'dashboard', currentRoute),
    navLink('/new-order', 'New Order', 'order', currentRoute),
    navLink('/orders', 'Orders', 'orders', currentRoute),
    navLink('/menu', 'Menu', 'menu', currentRoute),
  ];

  const analyticsNav = [
    navLink('/analytics', 'Analytics', 'analytics', currentRoute),
    navLink('/reports', 'Reports & Downloads', 'reports', currentRoute),
  ];

  const adminNav = admin ? [
    navLink('/users', 'Users', 'users', currentRoute),
    navLink('/settings', 'Settings', 'settings', currentRoute),
    navLink('/inventory', 'Inventory', 'inventory', currentRoute),
  ] : [];

  return `
    <aside class="sidebar" id="sidebar">
      <div class="sidebar-brand">
        <div class="sidebar-brand-icon">🍽️</div>
        <div>
          <h1>Gurukripa</h1>
          <span>Restaurant Management</span>
        </div>
      </div>
      <nav class="sidebar-nav">
        <div class="nav-section-label">Main</div>
        ${mainNav.join('')}
        <div class="nav-section-label">Analytics</div>
        ${analyticsNav.join('')}
        ${adminNav.length ? `<div class="nav-section-label">Administration</div>${adminNav.join('')}` : ''}
      </nav>
      <div class="sidebar-footer">
        <div class="user-profile">
          <div class="user-avatar">${getInitials(user?.name)}</div>
          <div class="user-info">
            <div class="name">${escapeHtml(user?.name)}</div>
            <div class="role">${user?.role}</div>
          </div>
        </div>
        <button class="btn btn-ghost btn-sm btn-block mt-1" id="logout-btn" style="color:rgba(255,255,255,0.6);justify-content:flex-start;">
          ${ICONS.logout} Logout
        </button>
      </div>
    </aside>`;
}

export function renderHeader(title, subtitle) {
  const notifications = getNotifications();
  const unread = notifications.filter(n => !n.read).length;

  return `
    <header class="top-header">
      <div class="page-title-area">
        <h2>${escapeHtml(title)}</h2>
        ${subtitle ? `<p>${escapeHtml(subtitle)}</p>` : ''}
      </div>
      <div class="header-actions">
        <div class="notification-btn" style="position:relative;">
          <button class="btn btn-ghost btn-icon" id="notif-toggle" title="Notifications">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/></svg>
            ${unread ? `<span class="notification-badge">${unread}</span>` : ''}
          </button>
          <div class="notification-dropdown hidden" id="notif-dropdown">
            <div class="notification-header">
              <span>Notifications</span>
              <button class="btn btn-ghost btn-sm" id="mark-all-read">Mark all read</button>
            </div>
            ${notifications.length ? notifications.map(n => `
              <div class="notification-item ${n.read ? '' : 'unread'}" data-notif-id="${n.id}">
                <div class="notif-title">${escapeHtml(n.title)}</div>
                <div class="text-muted" style="font-size:0.8rem;">${escapeHtml(n.message)}</div>
                <div class="notif-time">${formatDateTime(n.time)}</div>
              </div>
            `).join('') : '<div class="empty-state" style="padding:2rem;"><p>No notifications</p></div>'}
          </div>
        </div>
      </div>
    </header>`;
}

export function renderAppShell(currentRoute, title, subtitle, content) {
  return `
    <div class="app-layout">
      ${renderSidebar(currentRoute)}
      <div class="main-content">
        ${renderHeader(title, subtitle)}
        <div class="page-content" id="page-content">
          ${content}
        </div>
      </div>
    </div>`;
}

export function showToast(message, type = 'success') {
  const container = document.getElementById('toast-container');
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  const icons = { success: '✓', error: '✕', warning: '⚠' };
  toast.innerHTML = `<span>${icons[type] || ''}</span> ${escapeHtml(message)}`;
  container.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transition = 'opacity 0.3s';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

export function showModal({ title, body, footer, size = '' }) {
  const root = document.getElementById('modal-root');
  root.innerHTML = `
    <div class="modal-overlay" id="modal-overlay">
      <div class="modal ${size}">
        <div class="modal-header">
          <h3>${title}</h3>
          <button class="btn btn-ghost btn-icon" id="modal-close">✕</button>
        </div>
        <div class="modal-body">${body}</div>
        ${footer ? `<div class="modal-footer">${footer}</div>` : ''}
      </div>
    </div>`;

  const close = () => { root.innerHTML = ''; };
  root.querySelector('#modal-close')?.addEventListener('click', close);
  root.querySelector('#modal-overlay')?.addEventListener('click', (e) => {
    if (e.target.id === 'modal-overlay') close();
  });
  root.querySelector('#modal-cancel')?.addEventListener('click', close);

  return { close, el: root };
}

export function showConfirm(message, onConfirm) {
  const modal = showModal({
    title: 'Confirm Action',
    body: `<p>${escapeHtml(message)}</p>`,
    footer: `
      <button class="btn btn-secondary" id="modal-cancel">Cancel</button>
      <button class="btn btn-danger" id="modal-confirm">Confirm</button>`
  });
  modal.el.querySelector('#modal-confirm')?.addEventListener('click', () => {
    modal.close();
    onConfirm();
  });
}

export function bindShellEvents(onNavigate) {
  document.getElementById('logout-btn')?.addEventListener('click', () => {
    logout();
    onNavigate('/login');
    showToast('Logged out successfully');
  });

  document.getElementById('notif-toggle')?.addEventListener('click', (e) => {
    e.stopPropagation();
    document.getElementById('notif-dropdown')?.classList.toggle('hidden');
  });

  document.getElementById('mark-all-read')?.addEventListener('click', () => {
    markAllNotificationsRead();
    onNavigate(location.hash.slice(1) || '/dashboard');
  });

  document.querySelectorAll('.notification-item').forEach(el => {
    el.addEventListener('click', () => {
      markNotificationRead(el.dataset.notifId);
    });
  });

  document.addEventListener('click', (e) => {
    const dropdown = document.getElementById('notif-dropdown');
    if (dropdown && !e.target.closest('.notification-btn')) {
      dropdown.classList.add('hidden');
    }
  });
}

export function renderEmptyState(icon, title, message, actionHtml = '') {
  return `
    <div class="empty-state">
      <div class="empty-icon">${icon}</div>
      <h3>${escapeHtml(title)}</h3>
      <p>${escapeHtml(message)}</p>
      ${actionHtml}
    </div>`;
}

export function renderLoading() {
  return '<div class="loading-spinner"><div class="spinner"></div></div>';
}
