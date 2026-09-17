// Restaurant Settings page (Admin only)

import { getSettings, updateSettings } from '../store.js';
import { showToast } from '../components.js';

export function renderSettings() {
  const s = getSettings();

  return `
    <form id="settings-form">
      <div class="settings-grid">
        <div class="settings-section">
          <h3>🏪 Restaurant Information</h3>
          <div class="form-group">
            <label>Restaurant Name</label>
            <input type="text" class="form-control" id="setting-name" value="${s.name}">
          </div>
          <div class="form-group">
            <label>Address</label>
            <textarea class="form-control" id="setting-address" rows="2">${s.address}</textarea>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label>Phone</label>
              <input type="tel" class="form-control" id="setting-phone" value="${s.phone}">
            </div>
            <div class="form-group">
              <label>Email</label>
              <input type="email" class="form-control" id="setting-email" value="${s.email}">
            </div>
          </div>
          <div class="form-group">
            <label>Logo (emoji)</label>
            <input type="text" class="form-control" id="setting-logo" value="${s.logo}" maxlength="4">
          </div>
        </div>

        <div class="settings-section">
          <h3>📑 Tax Settings</h3>
          <div class="form-group">
            <label>GST Percentage (%)</label>
            <input type="number" class="form-control" id="setting-gst" value="${s.gstPercent}" min="0" max="28" step="0.5">
            <small class="text-muted">Default: 5%</small>
          </div>
        </div>

        <div class="settings-section">
          <h3>📋 Order Settings</h3>
          <div class="form-group">
            <label>Order Numbering Format</label>
            <input type="text" class="form-control" id="setting-order-format" value="${s.orderNumberFormat}">
          </div>
          <div class="form-group">
            <label>Default Order Status</label>
            <select class="form-control" id="setting-default-status">
              <option value="Pending" ${s.defaultOrderStatus === 'Pending' ? 'selected' : ''}>Pending</option>
              <option value="Confirmed" ${s.defaultOrderStatus === 'Confirmed' ? 'selected' : ''}>Confirmed</option>
            </select>
          </div>
          <div class="form-group">
            <label>Table Numbers (comma-separated)</label>
            <input type="text" class="form-control" id="setting-tables" value="${s.tableNumbers.join(', ')}">
          </div>
          <div class="form-row">
            <label class="checkbox-group">
              <input type="checkbox" id="setting-takeaway" ${s.enableTakeaway ? 'checked' : ''}> Enable Takeaway
            </label>
            <label class="checkbox-group">
              <input type="checkbox" id="setting-dinein" ${s.enableDineIn ? 'checked' : ''}> Enable Dine In
            </label>
          </div>
        </div>

        <div class="settings-section">
          <h3>ℹ️ About</h3>
          <p class="text-muted" style="font-size:0.9rem;">
            This is a prototype configuration panel. Settings are saved locally and will be connected to the Django + MongoDB backend in the next phase.
          </p>
          <button type="button" class="btn btn-danger btn-sm mt-2" id="reset-data">Reset All Prototype Data</button>
        </div>
      </div>

      <div class="mt-2">
        <button type="submit" class="btn btn-primary btn-lg">Save Settings</button>
      </div>
    </form>`;
}

export function bindSettings() {
  document.getElementById('settings-form')?.addEventListener('submit', (e) => {
    e.preventDefault();

    const tables = document.getElementById('setting-tables').value
      .split(',')
      .map(t => parseInt(t.trim()))
      .filter(t => !isNaN(t));

    updateSettings({
      name: document.getElementById('setting-name').value,
      address: document.getElementById('setting-address').value,
      phone: document.getElementById('setting-phone').value,
      email: document.getElementById('setting-email').value,
      logo: document.getElementById('setting-logo').value,
      gstPercent: parseFloat(document.getElementById('setting-gst').value) || 5,
      orderNumberFormat: document.getElementById('setting-order-format').value,
      defaultOrderStatus: document.getElementById('setting-default-status').value,
      tableNumbers: tables,
      enableTakeaway: document.getElementById('setting-takeaway').checked,
      enableDineIn: document.getElementById('setting-dinein').checked
    });

    showToast('Settings saved successfully');
  });

  document.getElementById('reset-data')?.addEventListener('click', () => {
    if (confirm('This will reset all prototype data to defaults. Continue?')) {
      localStorage.removeItem('gurukripa_app_state');
      sessionStorage.removeItem('gurukripa_session');
      showToast('Data reset. Reloading...', 'warning');
      setTimeout(() => location.reload(), 1000);
    }
  });
}
