// Inventory placeholder page

import { getInventory } from '../store.js';
import { escapeHtml } from '../utils.js';

export function renderInventory() {
  const items = getInventory();

  return `
    <div class="coming-soon-banner">
      <span style="font-size:1.5rem;">🔜</span>
      <div>
        <strong>Inventory Management – Coming Soon</strong><br>
        <span class="text-muted" style="font-size:0.85rem;">Full inventory tracking will be available when connected to the Django + MongoDB backend.</span>
      </div>
    </div>

    <div class="table-wrapper">
      <table class="data-table">
        <thead>
          <tr>
            <th>Ingredient / Item</th><th>Available Qty</th><th>Unit</th>
            <th>Low Stock Threshold</th><th>Status</th>
          </tr>
        </thead>
        <tbody>
          ${items.map(item => `
            <tr>
              <td><strong>${escapeHtml(item.name)}</strong></td>
              <td>${item.quantity}</td>
              <td>${item.unit}</td>
              <td>${item.threshold}</td>
              <td>
                <span class="badge ${item.status === 'low' ? 'badge-low-stock' : 'badge-in-stock'}">
                  ${item.status === 'low' ? '⚠️ Low Stock' : '✅ In Stock'}
                </span>
              </td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>`;
}

export function bindInventory() {
  // Placeholder – no interactions yet
}
