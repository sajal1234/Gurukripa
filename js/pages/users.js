// User Management page (Admin only)

import { getUsers, addUser, updateUser } from '../store.js';
import { formatDate, formatDateTime, escapeHtml } from '../utils.js';
import { showToast, showModal, showConfirm } from '../components.js';

export function renderUsers() {
  const users = getUsers().filter(u => u.role === 'manager');

  return `
    <div class="page-toolbar">
      <div class="toolbar-left">
        <span class="text-muted">${users.length} managers</span>
      </div>
      <div class="toolbar-right">
        <button class="btn btn-primary" id="add-manager">+ Add Manager</button>
      </div>
    </div>

    <div class="table-wrapper">
      <table class="data-table">
        <thead>
          <tr>
            <th>Name</th><th>Email</th><th>Phone</th><th>Role</th>
            <th>Status</th><th>Created</th><th>Last Login</th><th>Orders</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          ${users.map(u => `
            <tr>
              <td><strong>${escapeHtml(u.name)}</strong></td>
              <td>${escapeHtml(u.email)}</td>
              <td>${u.phone}</td>
              <td><span class="badge badge-confirmed">${u.role}</span></td>
              <td><span class="badge ${u.status === 'active' ? 'badge-active' : 'badge-inactive'}">${u.status}</span></td>
              <td>${formatDate(u.createdAt)}</td>
              <td>${u.lastLogin ? formatDateTime(u.lastLogin) : '—'}</td>
              <td>${u.orderCount}</td>
              <td>
                <button class="btn btn-secondary btn-sm edit-user-btn" data-id="${u.id}">Edit</button>
                <button class="btn btn-ghost btn-sm toggle-user-btn" data-id="${u.id}">${u.status === 'active' ? 'Deactivate' : 'Activate'}</button>
                <button class="btn btn-ghost btn-sm reset-pw-btn" data-id="${u.id}">Reset PW</button>
              </td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>`;
}

export function bindUsers(rerender) {
  document.getElementById('add-manager')?.addEventListener('click', () => {
    showUserForm(null, rerender);
  });

  document.querySelectorAll('.edit-user-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const user = getUsers().find(u => u.id === btn.dataset.id);
      showUserForm(user, rerender);
    });
  });

  document.querySelectorAll('.toggle-user-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const user = getUsers().find(u => u.id === btn.dataset.id);
      const newStatus = user.status === 'active' ? 'inactive' : 'active';
      updateUser(user.id, { status: newStatus });
      showToast(`${user.name} ${newStatus === 'active' ? 'activated' : 'deactivated'}`);
      rerender();
    });
  });

  document.querySelectorAll('.reset-pw-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const user = getUsers().find(u => u.id === btn.dataset.id);
      showConfirm(`Reset password for ${user.name}?`, () => {
        updateUser(user.id, { password: 'manager123' });
        showToast(`Password reset to manager123 for ${user.name}`, 'warning');
      });
    });
  });
}

function showUserForm(user, rerender) {
  const isEdit = !!user;

  showModal({
    title: isEdit ? 'Edit Manager' : 'Add Manager',
    body: `
      <form id="user-form">
        <div class="form-group">
          <label>Name</label>
          <input type="text" class="form-control" id="user-name" value="${user?.name || ''}" required>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label>Email</label>
            <input type="email" class="form-control" id="user-email" value="${user?.email || ''}" required>
          </div>
          <div class="form-group">
            <label>Phone</label>
            <input type="tel" class="form-control" id="user-phone" value="${user?.phone || ''}">
          </div>
        </div>
        ${!isEdit ? `
          <div class="form-group">
            <label>Password</label>
            <input type="password" class="form-control" id="user-password" value="manager123">
          </div>
        ` : ''}
        <div class="form-group">
          <label>Status</label>
          <select class="form-control" id="user-status">
            <option value="active" ${user?.status === 'active' ? 'selected' : ''}>Active</option>
            <option value="inactive" ${user?.status === 'inactive' ? 'selected' : ''}>Inactive</option>
          </select>
        </div>
      </form>`,
    footer: `
      <button class="btn btn-secondary" id="modal-cancel">Cancel</button>
      <button class="btn btn-primary" id="save-user">${isEdit ? 'Update' : 'Add'} Manager</button>`
  });

  document.getElementById('save-user')?.addEventListener('click', () => {
    const data = {
      name: document.getElementById('user-name').value.trim(),
      email: document.getElementById('user-email').value.trim(),
      phone: document.getElementById('user-phone').value.trim(),
      role: 'manager',
      status: document.getElementById('user-status').value
    };

    if (!data.name || !data.email) {
      showToast('Please fill in required fields', 'warning');
      return;
    }

    if (isEdit) {
      updateUser(user.id, data);
      showToast(`${data.name} updated`);
    } else {
      addUser({ ...data, password: document.getElementById('user-password').value || 'manager123' });
      showToast(`${data.name} added as manager`);
    }

    document.getElementById('modal-root').innerHTML = '';
    rerender();
  });
}
