// Dashboard page

import { getOrders, getSettings } from '../store.js';
import {
  formatCurrency, getDashboardKPIs, getOrdersChartData,
  getRevenueChartData, getStatusBreakdown, getTopSellingItems,
  getStatusBadge, formatDate, escapeHtml
} from '../utils.js';
import { renderLineChart, renderBarChart, renderDoughnutChart, bindChartTabs } from '../charts.js';
import { isAdmin } from '../auth.js';

export function renderDashboard() {
  const orders = getOrders();
  const settings = getSettings();
  const kpis = getDashboardKPIs(orders);
  const recentOrders = orders.slice(0, 8);
  const topItems = getTopSellingItems(orders, 5);
  const admin = isAdmin();

  return `
    <div class="quick-actions">
      <a class="quick-action-btn" href="#/new-order" data-route="/new-order">➕ New Order</a>
      <a class="quick-action-btn" href="#/orders" data-route="/orders">📋 View Orders</a>
      ${admin ? '<a class="quick-action-btn" href="#/menu" data-route="/menu">🍽️ Manage Menu</a>' : '<a class="quick-action-btn" href="#/menu" data-route="/menu">🍽️ View Menu</a>'}
      <a class="quick-action-btn" href="#/reports" data-route="/reports">📊 View Reports</a>
    </div>

    <div class="kpi-grid">
      <div class="kpi-card">
        <div class="kpi-icon" style="background:#fff4ed;color:#e85d04;">📦</div>
        <div class="kpi-label">Today's Orders</div>
        <div class="kpi-value">${kpis.todayOrders}</div>
        <div class="kpi-change positive">↑ 12% vs yesterday</div>
      </div>
      <div class="kpi-card">
        <div class="kpi-icon" style="background:#dcfce7;color:#16a34a;">💰</div>
        <div class="kpi-label">Today's Sales</div>
        <div class="kpi-value">${formatCurrency(kpis.todaySales)}</div>
        <div class="kpi-change positive">↑ 8% vs yesterday</div>
      </div>
      <div class="kpi-card">
        <div class="kpi-icon" style="background:#dbeafe;color:#2563eb;">📑</div>
        <div class="kpi-label">Today's GST</div>
        <div class="kpi-value">${formatCurrency(kpis.todayGst)}</div>
        <div class="kpi-change text-muted">${settings.gstPercent}% GST rate</div>
      </div>
      <div class="kpi-card">
        <div class="kpi-icon" style="background:#ede9fe;color:#7c3aed;">📈</div>
        <div class="kpi-label">Avg Order Value</div>
        <div class="kpi-value">${formatCurrency(kpis.avgOrderValue)}</div>
      </div>
      <div class="kpi-card">
        <div class="kpi-icon" style="background:#fef9c3;color:#a16207;">⏳</div>
        <div class="kpi-label">Pending Orders</div>
        <div class="kpi-value">${kpis.pendingOrders}</div>
      </div>
      <div class="kpi-card">
        <div class="kpi-icon" style="background:#dcfce7;color:#15803d;">✅</div>
        <div class="kpi-label">Completed Orders</div>
        <div class="kpi-value">${kpis.completedOrders}</div>
      </div>
    </div>

    <div class="charts-grid">
      <div class="chart-card">
        <div class="chart-header">
          <h3>Orders Trend</h3>
          <div class="chart-tabs" id="orders-chart-tabs">
            <button class="chart-tab active" data-period="today">Today</button>
            <button class="chart-tab" data-period="week">Week</button>
            <button class="chart-tab" data-period="month">Month</button>
            <button class="chart-tab" data-period="year">Year</button>
          </div>
        </div>
        <div class="chart-container"><canvas id="orders-chart"></canvas></div>
      </div>
      <div class="chart-card">
        <div class="chart-header">
          <h3>Revenue</h3>
          <div class="chart-tabs" id="revenue-chart-tabs">
            <button class="chart-tab active" data-period="today">Daily</button>
            <button class="chart-tab" data-period="week">Weekly</button>
            <button class="chart-tab" data-period="month">Monthly</button>
            <button class="chart-tab" data-period="year">Yearly</button>
          </div>
        </div>
        <div class="chart-container"><canvas id="revenue-chart"></canvas></div>
      </div>
      <div class="chart-card">
        <div class="chart-header"><h3>Order Status</h3></div>
        <div class="chart-container sm"><canvas id="status-chart"></canvas></div>
      </div>
      <div class="chart-card">
        <div class="chart-header"><h3>Top Selling Items</h3></div>
        <ul class="top-items-list">
          ${topItems.map((item, i) => `
            <li class="top-item">
              <div class="top-item-rank">${i + 1}</div>
              <div class="top-item-info">
                <div class="name">${escapeHtml(item.name)}</div>
                <div class="orders">${item.count} orders</div>
              </div>
              <div class="top-item-bar">
                <div class="top-item-bar-fill" style="width:${(item.count / topItems[0].count) * 100}%"></div>
              </div>
            </li>
          `).join('')}
        </ul>
      </div>
    </div>

    <div class="card">
      <div class="card-header">
        <h3>Recent Orders</h3>
        <a href="#/orders" class="btn btn-secondary btn-sm" data-route="/orders">View All</a>
      </div>
      <div class="table-wrapper recent-orders-table">
        <table class="data-table">
          <thead>
            <tr>
              <th>Order ID</th><th>Date</th><th>Customer</th><th>Table</th>
              <th>Items</th><th>Total</th><th>Status</th><th>Actions</th>
            </tr>
          </thead>
          <tbody>
            ${recentOrders.map(o => `
              <tr>
                <td><strong>${o.id}</strong></td>
                <td>${formatDate(o.date)} ${o.time}</td>
                <td>${escapeHtml(o.customer)}</td>
                <td>${o.table || '—'}</td>
                <td>${o.itemCount}</td>
                <td>${formatCurrency(o.total)}</td>
                <td>${getStatusBadge(o.status)}</td>
                <td><button class="btn btn-secondary btn-sm view-order-btn" data-order-id="${o.id}">View</button></td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>`;
}

export function bindDashboard(onNavigate) {
  const orders = getOrders();

  function updateOrdersChart(period) {
    const data = getOrdersChartData(orders, period);
    renderLineChart('orders-chart', data.labels, data.values, 'Orders');
  }

  function updateRevenueChart(period) {
    const data = getRevenueChartData(orders, period);
    renderBarChart('revenue-chart', data.labels, data.values, 'Revenue (₹)');
  }

  updateOrdersChart('today');
  updateRevenueChart('today');

  const statusData = getStatusBreakdown(orders);
  renderDoughnutChart('status-chart', statusData.labels, statusData.values);

  bindChartTabs('orders-chart-tabs', updateOrdersChart);
  bindChartTabs('revenue-chart-tabs', updateRevenueChart);

  document.querySelectorAll('.view-order-btn').forEach(btn => {
    btn.addEventListener('click', () => onNavigate(`/orders/${btn.dataset.orderId}`));
  });
}
