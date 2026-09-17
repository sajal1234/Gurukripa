// Utility functions

export function formatCurrency(amount) {
  return '₹' + Number(amount).toLocaleString('en-IN', { minimumFractionDigits: 0, maximumFractionDigits: 2 });
}

export function formatDate(dateStr) {
  if (!dateStr) return '—';
  const d = new Date(dateStr + (dateStr.includes('T') ? '' : 'T00:00:00'));
  return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
}

export function formatDateTime(isoStr) {
  if (!isoStr) return '—';
  const d = new Date(isoStr);
  return d.toLocaleString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
}

export function todayStr() {
  return new Date().toISOString().split('T')[0];
}

export function getDateRange(preset) {
  const today = new Date('2026-09-04');
  const start = new Date(today);
  const end = new Date(today);

  switch (preset) {
    case 'today':
      break;
    case 'yesterday':
      start.setDate(start.getDate() - 1);
      end.setDate(end.getDate() - 1);
      break;
    case 'week': {
      const day = start.getDay();
      start.setDate(start.getDate() - day);
      break;
    }
    case 'month':
      start.setDate(1);
      break;
    case 'lastMonth':
      start.setMonth(start.getMonth() - 1);
      start.setDate(1);
      end.setDate(0);
      break;
    case 'year':
      start.setMonth(0, 1);
      break;
    default:
      break;
  }

  return {
    start: start.toISOString().split('T')[0],
    end: end.toISOString().split('T')[0]
  };
}

export function isDateInRange(dateStr, start, end) {
  if (!dateStr) return false;
  const d = dateStr.split('T')[0];
  if (start && d < start) return false;
  if (end && d > end) return false;
  return true;
}

export function getStatusBadge(status) {
  const map = {
    'Pending': 'badge-pending',
    'Confirmed': 'badge-confirmed',
    'Preparing': 'badge-preparing',
    'Ready': 'badge-ready',
    'Completed': 'badge-completed',
    'Cancelled': 'badge-cancelled'
  };
  const icons = {
    'Pending': '🟡',
    'Confirmed': '🔵',
    'Preparing': '🟠',
    'Ready': '🟣',
    'Completed': '🟢',
    'Cancelled': '🔴'
  };
  const cls = map[status] || 'badge-pending';
  const icon = icons[status] || '';
  return `<span class="badge ${cls}">${icon} ${status}</span>`;
}

export function escapeHtml(str) {
  if (!str) return '';
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

export function debounce(fn, delay) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

export function calculateOrderTotals(items, gstPercent = 5) {
  const subtotal = items.reduce((s, item) => s + (item.price * item.quantity), 0);
  const gst = Math.round(subtotal * (gstPercent / 100) * 100) / 100;
  const total = subtotal + gst;
  return { subtotal, gst, total };
}

export function getInitials(name) {
  if (!name) return '?';
  return name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);
}

export function groupBy(arr, key) {
  return arr.reduce((acc, item) => {
    const k = typeof key === 'function' ? key(item) : item[key];
    (acc[k] = acc[k] || []).push(item);
    return acc;
  }, {});
}

export function sumBy(arr, fn) {
  return arr.reduce((s, item) => s + fn(item), 0);
}

export function getTopSellingItems(orders, limit = 5) {
  const counts = {};
  orders.forEach(order => {
    order.items.forEach(item => {
      counts[item.name] = (counts[item.name] || 0) + item.quantity;
    });
  });
  return Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([name, count]) => ({ name, count }));
}

export function filterOrders(orders, filters) {
  let result = [...orders];

  if (filters.search) {
    const q = filters.search.toLowerCase();
    result = result.filter(o =>
      o.id.toLowerCase().includes(q) ||
      (o.customer && o.customer.toLowerCase().includes(q)) ||
      (o.table && String(o.table).includes(q))
    );
  }

  if (filters.status && filters.status !== 'all') {
    result = result.filter(o => o.status === filters.status);
  }

  if (filters.orderType && filters.orderType !== 'all') {
    result = result.filter(o => o.orderType === filters.orderType);
  }

  if (filters.createdBy && filters.createdBy !== 'all') {
    result = result.filter(o => o.createdBy === filters.createdBy);
  }

  if (filters.dateStart || filters.dateEnd) {
    result = result.filter(o => isDateInRange(o.date, filters.dateStart, filters.dateEnd));
  }

  return result;
}

export function getDashboardKPIs(orders, date = '2026-09-04') {
  const todayOrders = orders.filter(o => o.date === date);
  const completed = todayOrders.filter(o => o.status === 'Completed');
  const pending = todayOrders.filter(o => ['Pending', 'Confirmed', 'Preparing', 'Ready'].includes(o.status));

  const sales = completed.reduce((s, o) => s + o.total, 0);
  const gst = completed.reduce((s, o) => s + o.gst, 0);
  const avg = completed.length ? sales / completed.length : 0;

  return {
    todayOrders: todayOrders.length,
    todaySales: sales,
    todayGst: gst,
    avgOrderValue: Math.round(avg),
    pendingOrders: pending.length,
    completedOrders: completed.length
  };
}

export function getOrdersChartData(orders, period) {
  const today = new Date('2026-09-04');
  const data = { labels: [], values: [] };

  if (period === 'today') {
    for (let h = 9; h <= 21; h++) {
      data.labels.push(`${h}:00`);
      const count = orders.filter(o => {
        if (o.date !== '2026-09-04') return false;
        const hour = parseInt(o.time.split(':')[0]);
        return hour === h;
      }).length;
      data.values.push(count);
    }
  } else if (period === 'week') {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    for (let i = 6; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      const ds = d.toISOString().split('T')[0];
      data.labels.push(days[d.getDay()]);
      data.values.push(orders.filter(o => o.date === ds).length);
    }
  } else if (period === 'month') {
    for (let w = 1; w <= 4; w++) {
      data.labels.push(`Week ${w}`);
      data.values.push(Math.floor(Math.random() * 30) + 20);
    }
  } else {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'];
    months.forEach(m => {
      data.labels.push(m);
      data.values.push(Math.floor(Math.random() * 200) + 100);
    });
  }

  return data;
}

export function getRevenueChartData(orders, period) {
  const chartData = getOrdersChartData(orders, period);
  return {
    labels: chartData.labels,
    values: chartData.values.map(v => v * (350 + Math.floor(Math.random() * 200)))
  };
}

export function getStatusBreakdown(orders, dateFilter) {
  const filtered = dateFilter
    ? orders.filter(o => isDateInRange(o.date, dateFilter.start, dateFilter.end))
    : orders;

  const statuses = ['Pending', 'Confirmed', 'Preparing', 'Ready', 'Completed', 'Cancelled'];
  return {
    labels: statuses,
    values: statuses.map(s => filtered.filter(o => o.status === s).length)
  };
}

export function simulatePdfDownload(title, content) {
  const html = `
    <!DOCTYPE html>
    <html><head><title>${title}</title>
    <style>
      body { font-family: Arial, sans-serif; padding: 40px; color: #333; }
      h1 { text-align: center; border-bottom: 2px solid #1a1a2e; padding-bottom: 10px; }
      h2 { color: #e85d04; margin-top: 30px; }
      table { width: 100%; border-collapse: collapse; margin: 15px 0; }
      th, td { border: 1px solid #ddd; padding: 8px; text-align: left; font-size: 12px; }
      th { background: #f5f5f5; }
      .meta { color: #666; font-size: 12px; margin: 10px 0; }
      .total { font-weight: bold; font-size: 14px; }
      .footer { margin-top: 40px; text-align: center; color: #999; font-size: 11px; }
    </style></head><body>${content}
    <div class="footer">Generated by Gurukripa Restaurant Management System – Prototype</div>
    </body></html>`;

  const blob = new Blob([html], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${title.replace(/\s+/g, '_')}.html`;
  a.click();
  URL.revokeObjectURL(url);
}
