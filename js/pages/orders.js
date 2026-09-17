// Orders page and order details

import { getOrders, getOrder, updateOrderStatus } from '../store.js';
import {
  formatCurrency, formatDate, getStatusBadge, escapeHtml,
  filterOrders, getDateRange, simulatePdfDownload
} from '../utils.js';
import { ORDER_STATUSES, STATUS_FLOW } from '../data.js';
import { showToast, showModal } from '../components.js';
import { getSettings } from '../store.js';

let filters = {
  search: '',
  status: 'all',
  orderType: 'all',
  createdBy: 'all',
  dateStart: '',
  dateEnd: '',
  datePreset: ''
};

export function renderOrders(orderId) {
  if (orderId) return renderOrderDetail(orderId);
  return renderOrdersList();
}

function renderOrdersList() {
  const orders = filterOrders(getOrders(), filters);
  const allOrders = getOrders();
  const managers = [...new Set(allOrders.map(o => o.createdBy))];

  return `
    <div class="filters-bar">
      <div class="filter-group">
        <label>Search</label>
        <input type="text" class="form-control" id="order-search" placeholder="Order ID, customer, table..." value="${escapeHtml(filters.search)}">
      </div>
      <div class="filter-group">
        <label>Status</label>
        <select class="form-control" id="filter-status">
          <option value="all">All Statuses</option>
          ${ORDER_STATUSES.map(s => `<option value="${s}" ${filters.status === s ? 'selected' : ''}>${s}</option>`).join('')}
        </select>
      </div>
      <div class="filter-group">
        <label>Order Type</label>
        <select class="form-control" id="filter-type">
          <option value="all">All Types</option>
          <option value="Dine In" ${filters.orderType === 'Dine In' ? 'selected' : ''}>Dine In</option>
          <option value="Takeaway" ${filters.orderType === 'Takeaway' ? 'selected' : ''}>Takeaway</option>
        </select>
      </div>
      <div class="filter-group">
        <label>Manager</label>
        <select class="form-control" id="filter-manager">
          <option value="all">All Managers</option>
          ${managers.map(m => `<option value="${m}" ${filters.createdBy === m ? 'selected' : ''}>${escapeHtml(m)}</option>`).join('')}
        </select>
      </div>
      <div class="filter-group">
        <label>From Date</label>
        <input type="date" class="form-control" id="filter-date-start" value="${filters.dateStart}">
      </div>
      <div class="filter-group">
        <label>To Date</label>
        <input type="date" class="form-control" id="filter-date-end" value="${filters.dateEnd}">
      </div>
      <div class="filter-group">
        <label>Quick Filters</label>
        <div class="date-shortcuts">
          ${['today', 'yesterday', 'week', 'month', 'lastMonth', 'year'].map(p => `
            <button class="date-shortcut ${filters.datePreset === p ? 'active' : ''}" data-preset="${p}">${p === 'lastMonth' ? 'Last Month' : p.charAt(0).toUpperCase() + p.slice(1)}</button>
          `).join('')}
        </div>
      </div>
      <button class="btn btn-secondary btn-sm" id="clear-filters">Clear Filters</button>
    </div>

    <div class="page-toolbar">
      <div class="toolbar-left">
        <span class="text-muted">${orders.length} orders found</span>
      </div>
      <div class="toolbar-right">
        <button class="btn btn-secondary btn-sm" id="download-filtered">📥 Download Filtered Report</button>
        <a href="#/new-order" class="btn btn-primary btn-sm" data-route="/new-order">+ New Order</a>
      </div>
    </div>

    <div class="table-wrapper">
      <table class="data-table">
        <thead>
          <tr>
            <th>Order ID</th><th>Date</th><th>Time</th><th>Table</th>
            <th>Customer</th><th>Type</th><th>Items</th>
            <th>Subtotal</th><th>GST</th><th>Total</th>
            <th>Status</th><th>Created By</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          ${orders.length ? orders.map(o => `
            <tr>
              <td><strong>${o.id}</strong></td>
              <td>${formatDate(o.date)}</td>
              <td>${o.time}</td>
              <td>${o.table || '—'}</td>
              <td>${escapeHtml(o.customer)}</td>
              <td>${o.orderType}</td>
              <td>${o.itemCount}</td>
              <td>${formatCurrency(o.subtotal)}</td>
              <td>${formatCurrency(o.gst)}</td>
              <td><strong>${formatCurrency(o.total)}</strong></td>
              <td>${getStatusBadge(o.status)}</td>
              <td>${escapeHtml(o.createdBy)}</td>
              <td>
                <button class="btn btn-secondary btn-sm view-order-btn" data-order-id="${o.id}">View</button>
                <button class="btn btn-ghost btn-sm update-status-btn" data-order-id="${o.id}">Status</button>
                <button class="btn btn-ghost btn-sm download-order-btn" data-order-id="${o.id}">PDF</button>
              </td>
            </tr>
          `).join('') : `
            <tr><td colspan="13">
              <div class="empty-state"><div class="empty-icon">📋</div><h3>No orders found</h3><p>Try adjusting your filters</p></div>
            </td></tr>
          `}
        </tbody>
      </table>
    </div>`;
}

function renderOrderDetail(orderId) {
  const order = getOrder(orderId);
  if (!order) {
    return `<div class="empty-state"><div class="empty-icon">❌</div><h3>Order not found</h3><a href="#/orders" class="btn btn-primary mt-2" data-route="/orders">Back to Orders</a></div>`;
  }

  const settings = getSettings();

  return `
    <div class="page-toolbar">
      <div class="toolbar-left">
        <a href="#/orders" class="btn btn-secondary btn-sm" data-route="/orders">← Back to Orders</a>
      </div>
      <div class="toolbar-right">
        <button class="btn btn-secondary btn-sm" id="update-status-detail">Update Status</button>
        <button class="btn btn-secondary btn-sm" id="download-order-detail">📥 Download PDF</button>
      </div>
    </div>

    <div class="grid-2">
      <div class="card">
        <div class="card-header"><h3>Order Information</h3>${getStatusBadge(order.status)}</div>
        <div class="card-body">
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:1rem;font-size:0.9rem;">
            <div><span class="text-muted">Order ID</span><br><strong>${order.id}</strong></div>
            <div><span class="text-muted">Date & Time</span><br><strong>${formatDate(order.date)} ${order.time}</strong></div>
            <div><span class="text-muted">Table</span><br><strong>${order.table ? 'Table ' + order.table : '—'}</strong></div>
            <div><span class="text-muted">Customer</span><br><strong>${escapeHtml(order.customer)}</strong></div>
            <div><span class="text-muted">Phone</span><br><strong>${order.phone || '—'}</strong></div>
            <div><span class="text-muted">Order Type</span><br><strong>${order.orderType}</strong></div>
            <div><span class="text-muted">Created By</span><br><strong>${escapeHtml(order.createdBy)}</strong></div>
            <div><span class="text-muted">Notes</span><br><strong>${escapeHtml(order.notes) || '—'}</strong></div>
          </div>
        </div>
      </div>

      <div class="card">
        <div class="card-header"><h3>Status Timeline</h3></div>
        <div class="card-body">
          <div class="timeline">
            ${(order.statusHistory || []).map(h => `
              <div class="timeline-item">
                <div class="time">${h.time}</div>
                <div class="event">${escapeHtml(h.event)}</div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    </div>

    <div class="card mt-2">
      <div class="card-header"><h3>Ordered Items</h3></div>
      <div class="table-wrapper">
        <table class="data-table">
          <thead><tr><th>Item</th><th>Qty</th><th>Price</th><th>Total</th></tr></thead>
          <tbody>
            ${order.items.map(item => `
              <tr>
                <td>${escapeHtml(item.name)}</td>
                <td>${item.quantity}</td>
                <td>${formatCurrency(item.price)}</td>
                <td>${formatCurrency(item.price * item.quantity)}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
      <div class="card-body" style="background:var(--bg);">
        <div class="summary-row"><span>Subtotal</span><span>${formatCurrency(order.subtotal)}</span></div>
        <div class="summary-row"><span>GST (${settings.gstPercent}%)</span><span>${formatCurrency(order.gst)}</span></div>
        <div class="summary-row total"><span>Grand Total</span><span>${formatCurrency(order.total)}</span></div>
      </div>
    </div>`;
}

export function bindOrders(onNavigate, rerender, orderId) {
  if (orderId) {
    bindOrderDetail(onNavigate, rerender, orderId);
    return;
  }

  const applyFilters = () => rerender();

  document.getElementById('order-search')?.addEventListener('input', (e) => {
    filters.search = e.target.value;
    applyFilters();
  });

  document.getElementById('filter-status')?.addEventListener('change', (e) => {
    filters.status = e.target.value;
    applyFilters();
  });

  document.getElementById('filter-type')?.addEventListener('change', (e) => {
    filters.orderType = e.target.value;
    applyFilters();
  });

  document.getElementById('filter-manager')?.addEventListener('change', (e) => {
    filters.createdBy = e.target.value;
    applyFilters();
  });

  document.getElementById('filter-date-start')?.addEventListener('change', (e) => {
    filters.dateStart = e.target.value;
    filters.datePreset = '';
    applyFilters();
  });

  document.getElementById('filter-date-end')?.addEventListener('change', (e) => {
    filters.dateEnd = e.target.value;
    filters.datePreset = '';
    applyFilters();
  });

  document.querySelectorAll('.date-shortcut').forEach(btn => {
    btn.addEventListener('click', () => {
      const range = getDateRange(btn.dataset.preset);
      filters.dateStart = range.start;
      filters.dateEnd = range.end;
      filters.datePreset = btn.dataset.preset;
      applyFilters();
    });
  });

  document.getElementById('clear-filters')?.addEventListener('click', () => {
    filters = { search: '', status: 'all', orderType: 'all', createdBy: 'all', dateStart: '', dateEnd: '', datePreset: '' };
    applyFilters();
  });

  document.querySelectorAll('.view-order-btn').forEach(btn => {
    btn.addEventListener('click', () => onNavigate(`/orders/${btn.dataset.orderId}`));
  });

  document.querySelectorAll('.update-status-btn').forEach(btn => {
    btn.addEventListener('click', () => showStatusModal(btn.dataset.orderId, rerender));
  });

  document.querySelectorAll('.download-order-btn').forEach(btn => {
    btn.addEventListener('click', () => downloadOrderPdf(btn.dataset.orderId));
  });

  document.getElementById('download-filtered')?.addEventListener('click', () => {
    const orders = filterOrders(getOrders(), filters);
    downloadOrdersReport(orders, 'Filtered Orders Report');
    showToast('Report downloaded');
  });
}

function bindOrderDetail(onNavigate, rerender, orderId) {
  document.getElementById('update-status-detail')?.addEventListener('click', () => {
    showStatusModal(orderId, () => onNavigate(`/orders/${orderId}`));
  });

  document.getElementById('download-order-detail')?.addEventListener('click', () => {
    downloadOrderPdf(orderId);
    showToast('Order PDF downloaded');
  });
}

function showStatusModal(orderId, onDone) {
  const order = getOrder(orderId);
  if (!order) return;

  const statuses = [...ORDER_STATUSES];

  showModal({
    title: `Update Status – ${orderId}`,
    body: `
      <p class="mb-2">Current status: ${getStatusBadge(order.status)}</p>
      <div class="form-group">
        <label>New Status</label>
        <select class="form-control" id="new-status">
          ${statuses.map(s => `<option value="${s}" ${s === order.status ? 'selected' : ''}>${s}</option>`).join('')}
        </select>
      </div>`,
    footer: `
      <button class="btn btn-secondary" id="modal-cancel">Cancel</button>
      <button class="btn btn-primary" id="save-status">Update Status</button>`
  });

  document.getElementById('save-status')?.addEventListener('click', () => {
    const newStatus = document.getElementById('new-status').value;
    updateOrderStatus(orderId, newStatus);
    document.getElementById('modal-root').innerHTML = '';
    showToast(`Order status updated to ${newStatus}`);
    onDone();
  });
}

function downloadOrderPdf(orderId) {
  const order = getOrder(orderId);
  if (!order) return;
  const settings = getSettings();

  const content = `
    <h1>${settings.name}</h1>
    <h2>Order Receipt – ${order.id}</h2>
    <div class="meta">
      <div>Date: ${formatDate(order.date)} ${order.time}</div>
      <div>Customer: ${order.customer}</div>
      <div>Table: ${order.table || 'N/A'}</div>
      <div>Type: ${order.orderType}</div>
      <div>Status: ${order.status}</div>
      <div>Created By: ${order.createdBy}</div>
    </div>
    <table>
      <tr><th>Item</th><th>Qty</th><th>Price</th><th>Total</th></tr>
      ${order.items.map(i => `<tr><td>${i.name}</td><td>${i.quantity}</td><td>₹${i.price}</td><td>₹${i.price * i.quantity}</td></tr>`).join('')}
    </table>
    <p class="total">Subtotal: ₹${order.subtotal} | GST: ₹${order.gst} | Total: ₹${order.total}</p>`;

  simulatePdfDownload(`Order_${order.id}`, content);
}

function downloadOrdersReport(orders, title) {
  const settings = getSettings();
  const totalSales = orders.reduce((s, o) => s + o.total, 0);
  const totalGst = orders.reduce((s, o) => s + o.gst, 0);

  const content = `
    <h1>${settings.name}</h1>
    <h2>${title}</h2>
    <div class="meta">
      <div>Generated: ${new Date().toLocaleString('en-IN')}</div>
      <div>Total Orders: ${orders.length}</div>
      <div>Total Sales: ₹${totalSales.toFixed(2)}</div>
      <div>Total GST: ₹${totalGst.toFixed(2)}</div>
    </div>
    <table>
      <tr><th>Order ID</th><th>Date</th><th>Customer</th><th>Items</th><th>Total</th><th>Status</th></tr>
      ${orders.map(o => `<tr><td>${o.id}</td><td>${o.date}</td><td>${o.customer}</td><td>${o.itemCount}</td><td>₹${o.total}</td><td>${o.status}</td></tr>`).join('')}
    </table>`;

  simulatePdfDownload(title, content);
}

export { downloadOrdersReport };
