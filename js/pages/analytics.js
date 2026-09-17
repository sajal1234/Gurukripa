// Analytics page

import { getOrders, getSettings } from '../store.js';
import {
  formatCurrency, getTopSellingItems, getStatusBreakdown,
  getOrdersChartData, getRevenueChartData, escapeHtml, groupBy, sumBy
} from '../utils.js';
import { renderLineChart, renderBarChart, renderDoughnutChart, renderHorizontalBarChart, bindChartTabs } from '../charts.js';

let period = 'daily';

export function renderAnalytics() {
  const orders = getOrders();
  const settings = getSettings();

  const stats = getPeriodStats(orders, period);

  return `
    <div class="page-toolbar">
      <div class="toolbar-left">
        <div class="chart-tabs" id="analytics-period-tabs">
          <button class="chart-tab ${period === 'daily' ? 'active' : ''}" data-period="daily">Daily</button>
          <button class="chart-tab ${period === 'weekly' ? 'active' : ''}" data-period="weekly">Weekly</button>
          <button class="chart-tab ${period === 'monthly' ? 'active' : ''}" data-period="monthly">Monthly</button>
          <button class="chart-tab ${period === 'yearly' ? 'active' : ''}" data-period="yearly">Yearly</button>
        </div>
      </div>
    </div>

    <div class="kpi-grid">
      <div class="kpi-card">
        <div class="kpi-icon" style="background:#fff4ed;color:#e85d04;">📦</div>
        <div class="kpi-label">Total Orders</div>
        <div class="kpi-value">${stats.totalOrders}</div>
      </div>
      <div class="kpi-card">
        <div class="kpi-icon" style="background:#dcfce7;color:#16a34a;">💰</div>
        <div class="kpi-label">Revenue</div>
        <div class="kpi-value">${formatCurrency(stats.revenue)}</div>
      </div>
      <div class="kpi-card">
        <div class="kpi-icon" style="background:#dbeafe;color:#2563eb;">📑</div>
        <div class="kpi-label">GST Collected</div>
        <div class="kpi-value">${formatCurrency(stats.gst)}</div>
      </div>
      <div class="kpi-card">
        <div class="kpi-icon" style="background:#ede9fe;color:#7c3aed;">📈</div>
        <div class="kpi-label">Avg Order Value</div>
        <div class="kpi-value">${formatCurrency(stats.avgOrder)}</div>
      </div>
      <div class="kpi-card">
        <div class="kpi-icon" style="background:#dcfce7;color:#15803d;">✅</div>
        <div class="kpi-label">Completed</div>
        <div class="kpi-value">${stats.completed}</div>
      </div>
      <div class="kpi-card">
        <div class="kpi-icon" style="background:#fee2e2;color:#dc2626;">❌</div>
        <div class="kpi-label">Cancelled</div>
        <div class="kpi-value">${stats.cancelled}</div>
      </div>
    </div>

    <div class="charts-grid">
      <div class="chart-card">
        <div class="chart-header"><h3>Orders Trend</h3></div>
        <div class="chart-container"><canvas id="analytics-orders-chart"></canvas></div>
      </div>
      <div class="chart-card">
        <div class="chart-header"><h3>Revenue Trend</h3></div>
        <div class="chart-container"><canvas id="analytics-revenue-chart"></canvas></div>
      </div>
      <div class="chart-card">
        <div class="chart-header"><h3>Order Status Breakdown</h3></div>
        <div class="chart-container sm"><canvas id="analytics-status-chart"></canvas></div>
      </div>
      <div class="chart-card">
        <div class="chart-header"><h3>Top Selling Items</h3></div>
        <div class="chart-container sm"><canvas id="analytics-top-items-chart"></canvas></div>
      </div>
      ${period === 'monthly' || period === 'yearly' ? `
        <div class="chart-card full-width">
          <div class="chart-header"><h3>Top Selling Categories</h3></div>
          <div class="chart-container sm"><canvas id="analytics-categories-chart"></canvas></div>
        </div>
      ` : ''}
    </div>`;
}

function getPeriodStats(orders, period) {
  const completed = orders.filter(o => o.status === 'Completed');
  const cancelled = orders.filter(o => o.status === 'Cancelled');
  const revenue = sumBy(completed, o => o.total);
  const gst = sumBy(completed, o => o.gst);

  return {
    totalOrders: orders.length,
    revenue,
    gst,
    avgOrder: completed.length ? Math.round(revenue / completed.length) : 0,
    completed: completed.length,
    cancelled: cancelled.length
  };
}

function getCategorySales(orders) {
  const cats = {};
  orders.forEach(order => {
    order.items.forEach(item => {
      const menuItem = item.name;
      const cat = guessCategory(item.name);
      cats[cat] = (cats[cat] || 0) + item.quantity;
    });
  });
  const sorted = Object.entries(cats).sort((a, b) => b[1] - a[1]);
  return { labels: sorted.map(s => s[0]), values: sorted.map(s => s[1]) };
}

function guessCategory(name) {
  if (name.includes('Naan') || name.includes('Roti') || name.includes('Paratha')) return 'Breads';
  if (name.includes('Biryani') || name.includes('Rice')) return 'Rice & Biryani';
  if (name.includes('Coffee') || name.includes('Lassi') || name.includes('Chai') || name.includes('Soda')) return 'Beverages';
  if (name.includes('Jamun') || name.includes('Rasmalai') || name.includes('Kulfi') || name.includes('Brownie')) return 'Desserts';
  if (name.includes('Tikka') || name.includes('Roll') || name.includes('Dosa') || name.includes('Kabab')) return 'Starters';
  return 'Main Course';
}

export function bindAnalytics(rerender) {
  const orders = getOrders();

  document.querySelectorAll('#analytics-period-tabs .chart-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      period = tab.dataset.period;
      rerender();
    });
  });

  const chartPeriod = period === 'daily' ? 'today' : period === 'weekly' ? 'week' : period === 'monthly' ? 'month' : 'year';

  const ordersData = getOrdersChartData(orders, chartPeriod);
  renderLineChart('analytics-orders-chart', ordersData.labels, ordersData.values);

  const revenueData = getRevenueChartData(orders, chartPeriod);
  renderBarChart('analytics-revenue-chart', revenueData.labels, revenueData.values);

  const statusData = getStatusBreakdown(orders);
  renderDoughnutChart('analytics-status-chart', statusData.labels, statusData.values);

  const topItems = getTopSellingItems(orders, 8);
  renderHorizontalBarChart('analytics-top-items-chart', topItems.map(t => t.name), topItems.map(t => t.count));

  if (period === 'monthly' || period === 'yearly') {
    const catData = getCategorySales(orders);
    renderHorizontalBarChart('analytics-categories-chart', catData.labels, catData.values);
  }
}
