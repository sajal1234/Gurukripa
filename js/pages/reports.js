// Reports & Downloads page

import { getOrders, getSettings } from '../store.js';
import {
  formatCurrency, formatDate, filterOrders, getDateRange,
  simulatePdfDownload, escapeHtml, sumBy
} from '../utils.js';
import { ORDER_STATUSES } from '../data.js';
import { showToast } from '../components.js';

let reportConfig = {
  type: 'order-history',
  datePreset: 'today',
  dateStart: '2026-09-04',
  dateEnd: '2026-09-04',
  status: 'all'
};

const REPORT_TYPES = [
  { id: 'order-history', label: 'Order History Report' },
  { id: 'sales', label: 'Sales Report' },
  { id: 'gst', label: 'GST Report' },
  { id: 'status', label: 'Status Report' },
  { id: 'item-sales', label: 'Item Sales Report' },
  { id: 'complete', label: 'Complete Order History' },
];

export function renderReports() {
  const settings = getSettings();
  const preview = generatePreview();

  return `
    <div class="grid-2">
      <div class="card">
        <div class="card-header"><h3>Report Configuration</h3></div>
        <div class="card-body">
          <div class="form-group">
            <label>Report Type</label>
            <select class="form-control" id="report-type">
              ${REPORT_TYPES.map(r => `<option value="${r.id}" ${reportConfig.type === r.id ? 'selected' : ''}>${r.label}</option>`).join('')}
            </select>
          </div>

          <div class="form-group">
            <label>Date Range</label>
            <div class="date-shortcuts mb-1">
              ${['today', 'yesterday', 'week', 'month', 'lastMonth', 'year'].map(p => `
                <button class="date-shortcut ${reportConfig.datePreset === p ? 'active' : ''}" data-preset="${p}">${p === 'lastMonth' ? 'Last Month' : p.charAt(0).toUpperCase() + p.slice(1)}</button>
              `).join('')}
            </div>
            <div class="form-row">
              <input type="date" class="form-control" id="report-date-start" value="${reportConfig.dateStart}">
              <input type="date" class="form-control" id="report-date-end" value="${reportConfig.dateEnd}">
            </div>
          </div>

          <div class="form-group">
            <label>Status Filter</label>
            <select class="form-control" id="report-status">
              <option value="all">All Statuses</option>
              ${ORDER_STATUSES.map(s => `<option value="${s}" ${reportConfig.status === s ? 'selected' : ''}>${s}</option>`).join('')}
            </select>
          </div>

          <button class="btn btn-primary btn-block" id="generate-report">Generate Report Preview</button>
          <button class="btn btn-success btn-block mt-1" id="download-report">📥 Download PDF</button>
        </div>
      </div>

      <div class="card">
        <div class="card-header"><h3>Report Preview</h3></div>
        <div class="card-body" id="report-preview-container">
          ${preview}
        </div>
      </div>
    </div>`;
}

function getFilteredOrders() {
  return filterOrders(getOrders(), {
    status: reportConfig.status,
    dateStart: reportConfig.dateStart,
    dateEnd: reportConfig.dateEnd
  });
}

function generatePreview() {
  const settings = getSettings();
  const orders = getFilteredOrders();
  const totalSales = sumBy(orders, o => o.total);
  const totalGst = sumBy(orders, o => o.gst);
  const totalSubtotal = sumBy(orders, o => o.subtotal);
  const reportType = REPORT_TYPES.find(r => r.id === reportConfig.type)?.label || 'Report';

  let extraContent = '';

  if (reportConfig.type === 'item-sales') {
    const itemCounts = {};
    orders.forEach(o => o.items.forEach(i => {
      itemCounts[i.name] = (itemCounts[i.name] || 0) + i.quantity;
    }));
    const sorted = Object.entries(itemCounts).sort((a, b) => b[1] - a[1]);
    extraContent = `
      <h4 style="margin-top:1rem;">Item Sales Breakdown</h4>
      <table class="data-table" style="margin-top:0.5rem;">
        <thead><tr><th>Item</th><th>Quantity Sold</th></tr></thead>
        <tbody>${sorted.map(([name, qty]) => `<tr><td>${escapeHtml(name)}</td><td>${qty}</td></tr>`).join('')}</tbody>
      </table>`;
  }

  if (reportConfig.type === 'gst') {
    extraContent = `
      <div style="margin-top:1rem;padding:1rem;background:var(--bg);border-radius:8px;">
        <div class="summary-row"><span>Total Subtotal</span><span>${formatCurrency(totalSubtotal)}</span></div>
        <div class="summary-row"><span>GST (${settings.gstPercent}%)</span><span>${formatCurrency(totalGst)}</span></div>
        <div class="summary-row total"><span>Grand Total</span><span>${formatCurrency(totalSales)}</span></div>
      </div>`;
  }

  return `
    <div class="report-preview">
      <div class="report-preview-header">
        <h2>${settings.logo} ${settings.name}</h2>
        <p style="color:var(--text-muted);margin-top:0.5rem;">${reportType}</p>
      </div>
      <div class="report-meta">
        <div>Date Range: ${formatDate(reportConfig.dateStart)} – ${formatDate(reportConfig.dateEnd)}</div>
        <div>Status: ${reportConfig.status === 'all' ? 'All' : reportConfig.status}</div>
        <div>Generated: ${new Date().toLocaleString('en-IN')}</div>
        <div>Total Orders: ${orders.length}</div>
      </div>

      ${reportConfig.type === 'sales' || reportConfig.type === 'complete' ? `
        <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:1rem;margin-bottom:1rem;">
          <div class="kpi-card" style="padding:0.75rem;"><div class="kpi-label">Orders</div><div class="kpi-value" style="font-size:1.2rem;">${orders.length}</div></div>
          <div class="kpi-card" style="padding:0.75rem;"><div class="kpi-label">Sales</div><div class="kpi-value" style="font-size:1.2rem;">${formatCurrency(totalSales)}</div></div>
          <div class="kpi-card" style="padding:0.75rem;"><div class="kpi-label">GST</div><div class="kpi-value" style="font-size:1.2rem;">${formatCurrency(totalGst)}</div></div>
        </div>
      ` : ''}

      <table class="data-table">
        <thead>
          <tr><th>Order ID</th><th>Date</th><th>Customer</th><th>Items</th><th>Subtotal</th><th>GST</th><th>Total</th><th>Status</th></tr>
        </thead>
        <tbody>
          ${orders.length ? orders.slice(0, 15).map(o => `
            <tr>
              <td>${o.id}</td>
              <td>${formatDate(o.date)}</td>
              <td>${escapeHtml(o.customer)}</td>
              <td>${o.itemCount}</td>
              <td>${formatCurrency(o.subtotal)}</td>
              <td>${formatCurrency(o.gst)}</td>
              <td>${formatCurrency(o.total)}</td>
              <td>${o.status}</td>
            </tr>
          `).join('') : '<tr><td colspan="8" class="text-center text-muted">No orders match the selected filters</td></tr>'}
        </tbody>
      </table>
      ${orders.length > 15 ? `<p class="text-muted text-center mt-1" style="font-size:0.8rem;">Showing 15 of ${orders.length} orders. Download for full report.</p>` : ''}

      <div style="margin-top:1rem;padding-top:1rem;border-top:1px solid var(--border);">
        <div class="summary-row"><span>Total Subtotal</span><span>${formatCurrency(totalSubtotal)}</span></div>
        <div class="summary-row"><span>Total GST</span><span>${formatCurrency(totalGst)}</span></div>
        <div class="summary-row total"><span>Total Sales</span><span>${formatCurrency(totalSales)}</span></div>
      </div>

      ${extraContent}
    </div>`;
}

export function bindReports(rerender) {
  document.getElementById('report-type')?.addEventListener('change', (e) => {
    reportConfig.type = e.target.value;
    rerender();
  });

  document.getElementById('report-status')?.addEventListener('change', (e) => {
    reportConfig.status = e.target.value;
    rerender();
  });

  document.getElementById('report-date-start')?.addEventListener('change', (e) => {
    reportConfig.dateStart = e.target.value;
    reportConfig.datePreset = '';
    rerender();
  });

  document.getElementById('report-date-end')?.addEventListener('change', (e) => {
    reportConfig.dateEnd = e.target.value;
    reportConfig.datePreset = '';
    rerender();
  });

  document.querySelectorAll('.date-shortcut').forEach(btn => {
    btn.addEventListener('click', () => {
      const range = getDateRange(btn.dataset.preset);
      reportConfig.dateStart = range.start;
      reportConfig.dateEnd = range.end;
      reportConfig.datePreset = btn.dataset.preset;
      rerender();
    });
  });

  document.getElementById('generate-report')?.addEventListener('click', () => {
    rerender();
    showToast('Report preview updated');
  });

  document.getElementById('download-report')?.addEventListener('click', () => {
    const settings = getSettings();
    const orders = getFilteredOrders();
    const reportType = REPORT_TYPES.find(r => r.id === reportConfig.type)?.label;
    const totalSales = sumBy(orders, o => o.total);
    const totalGst = sumBy(orders, o => o.gst);

    const content = `
      <h1>${settings.name}</h1>
      <h2>${reportType}</h2>
      <div class="meta">
        <div>Date Range: ${reportConfig.dateStart} to ${reportConfig.dateEnd}</div>
        <div>Status: ${reportConfig.status === 'all' ? 'All' : reportConfig.status}</div>
        <div>Generated: ${new Date().toLocaleString('en-IN')}</div>
        <div>Total Orders: ${orders.length} | Sales: ₹${totalSales.toFixed(2)} | GST: ₹${totalGst.toFixed(2)}</div>
      </div>
      <table>
        <tr><th>Order ID</th><th>Date</th><th>Customer</th><th>Items</th><th>Subtotal</th><th>GST</th><th>Total</th><th>Status</th></tr>
        ${orders.map(o => `<tr><td>${o.id}</td><td>${o.date}</td><td>${o.customer}</td><td>${o.itemCount}</td><td>₹${o.subtotal}</td><td>₹${o.gst}</td><td>₹${o.total}</td><td>${o.status}</td></tr>`).join('')}
      </table>
      <p class="total">Summary: Subtotal ₹${orders.reduce((s,o)=>s+o.subtotal,0).toFixed(2)} | GST ₹${totalGst.toFixed(2)} | Total ₹${totalSales.toFixed(2)}</p>`;

    simulatePdfDownload(reportType, content);
    showToast('Report downloaded successfully');
  });
}
