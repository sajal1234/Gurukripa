// New Order / POS page

import { getMenuItems, getSettings, addOrder, generateOrderId, clearCurrentOrder, getCurrentOrder, setCurrentOrder, addNotification } from '../store.js';
import { formatCurrency, calculateOrderTotals, escapeHtml } from '../utils.js';
import { getCurrentUser } from '../auth.js';
import { showToast, showModal } from '../components.js';
import { CATEGORIES } from '../data.js';

let cart = [];
let selectedCategory = 'All';

export function renderNewOrder() {
  const menuItems = getMenuItems();
  const settings = getSettings();
  const saved = getCurrentOrder();
  if (saved) cart = saved.items || [];

  const filtered = selectedCategory === 'All'
    ? menuItems
    : menuItems.filter(m => m.category === selectedCategory || (selectedCategory === 'Rice' && m.category === 'Rice & Biryani'));

  const totals = calculateOrderTotals(cart, settings.gstPercent);

  const categories = ['All', ...CATEGORIES.map(c => c === 'Rice & Biryani' ? 'Rice' : c)];

  return `
    <div class="pos-layout">
      <div class="pos-menu-panel">
        <div class="search-bar mb-2">
          <span class="search-icon">🔍</span>
          <input type="text" class="form-control" id="menu-search" placeholder="Search menu items...">
        </div>
        <div class="category-tabs" id="category-tabs">
          ${categories.map(c => `
            <button class="category-tab ${c === selectedCategory ? 'active' : ''}" data-category="${c}">${c}</button>
          `).join('')}
        </div>
        <div class="pos-menu-items">
          <div class="menu-grid" id="menu-grid">
            ${filtered.map(item => `
              <div class="menu-card ${item.available ? '' : 'unavailable'}" data-item-id="${item.id}">
                <div class="menu-card-img">${item.image}</div>
                <div class="menu-card-body">
                  <h4>${escapeHtml(item.name)}</h4>
                  <div class="category">${escapeHtml(item.category)}</div>
                  <div class="flex-between">
                    <span class="price">${formatCurrency(item.price)}</span>
                    ${item.available
                      ? `<button class="btn btn-primary btn-sm add-item-btn" data-item-id="${item.id}">+ Add</button>`
                      : '<span class="badge badge-inactive">Unavailable</span>'}
                  </div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>

      <div class="pos-order-panel">
        <div class="pos-order-header">Current Order</div>
        <div class="pos-order-items" id="cart-items">
          ${cart.length ? cart.map((item, idx) => renderCartLine(item, idx)).join('') :
            '<div class="empty-state" style="padding:2rem;"><div class="empty-icon">🛒</div><p>No items added yet</p></div>'}
        </div>

        <div class="pos-order-details-form">
          <div class="form-row">
            <div class="form-group" style="margin-bottom:0.75rem;">
              <label>Table Number</label>
              <select class="form-control" id="order-table">
                <option value="">Select table</option>
                ${settings.tableNumbers.map(t => `<option value="${t}">Table ${t}</option>`).join('')}
              </select>
            </div>
            <div class="form-group" style="margin-bottom:0.75rem;">
              <label>Order Type</label>
              <select class="form-control" id="order-type">
                ${settings.enableDineIn ? '<option value="Dine In">Dine In</option>' : ''}
                ${settings.enableTakeaway ? '<option value="Takeaway">Takeaway</option>' : ''}
              </select>
            </div>
          </div>
          <div class="form-row">
            <div class="form-group" style="margin-bottom:0.75rem;">
              <label>Customer Name <span class="optional">(optional)</span></label>
              <input type="text" class="form-control" id="order-customer" placeholder="Customer name">
            </div>
            <div class="form-group" style="margin-bottom:0.75rem;">
              <label>Phone <span class="optional">(optional)</span></label>
              <input type="tel" class="form-control" id="order-phone" placeholder="Phone number">
            </div>
          </div>
          <div class="form-group" style="margin-bottom:0;">
            <label>Notes / Special Instructions</label>
            <textarea class="form-control" id="order-notes" rows="2" placeholder="Any special requests..."></textarea>
          </div>
        </div>

        <div class="pos-order-summary">
          ${cart.map(item => `
            <div class="summary-row text-muted" style="font-size:0.8rem;">
              <span>${escapeHtml(item.name)} × ${item.quantity}</span>
              <span>${formatCurrency(item.price * item.quantity)}</span>
            </div>
          `).join('')}
          <div class="summary-row"><span>Subtotal</span><span id="subtotal">${formatCurrency(totals.subtotal)}</span></div>
          <div class="summary-row"><span>GST (${settings.gstPercent}%)</span><span id="gst">${formatCurrency(totals.gst)}</span></div>
          <div class="summary-row total"><span>Grand Total</span><span id="grand-total">${formatCurrency(totals.total)}</span></div>
        </div>

        <div class="pos-order-actions">
          <button class="btn btn-success btn-block" id="place-order-btn" ${cart.length ? '' : 'disabled'}>Place Order</button>
          <button class="btn btn-secondary btn-block" id="save-order-btn" ${cart.length ? '' : 'disabled'}>Save Order</button>
          <div class="flex gap-1">
            <button class="btn btn-secondary" style="flex:1;" id="clear-order-btn">Clear</button>
            <button class="btn btn-ghost" style="flex:1;" id="cancel-order-btn">Cancel</button>
          </div>
        </div>
      </div>
    </div>`;
}

function renderCartLine(item, idx) {
  return `
    <div class="order-line-item" data-idx="${idx}">
      <div class="order-line-info">
        <div class="name">${escapeHtml(item.name)}</div>
        <div class="unit-price">${formatCurrency(item.price)} each</div>
      </div>
      <div class="qty-controls">
        <button class="qty-btn qty-minus" data-idx="${idx}">−</button>
        <span class="qty-value">${item.quantity}</span>
        <button class="qty-btn qty-plus" data-idx="${idx}">+</button>
      </div>
      <div class="order-line-subtotal">${formatCurrency(item.price * item.quantity)}</div>
      <button class="btn btn-ghost btn-sm remove-item-btn" data-idx="${idx}" title="Remove">✕</button>
    </div>`;
}

export function bindNewOrder(onNavigate, rerender) {
  const menuItems = getMenuItems();
  const settings = getSettings();

  document.querySelectorAll('.category-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      selectedCategory = tab.dataset.category;
      rerender();
    });
  });

  document.getElementById('menu-search')?.addEventListener('input', (e) => {
    const q = e.target.value.toLowerCase();
    document.querySelectorAll('.menu-card').forEach(card => {
      const name = card.querySelector('h4').textContent.toLowerCase();
      card.style.display = name.includes(q) ? '' : 'none';
    });
  });

  document.querySelectorAll('.add-item-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = menuItems.find(m => m.id === btn.dataset.itemId);
      if (!item || !item.available) return;
      const existing = cart.find(c => c.menuItemId === item.id);
      if (existing) {
        existing.quantity++;
      } else {
        cart.push({ menuItemId: item.id, name: item.name, price: item.price, quantity: 1 });
      }
      setCurrentOrder({ items: cart });
      rerender();
      showToast(`${item.name} added to order`);
    });
  });

  document.querySelectorAll('.qty-minus').forEach(btn => {
    btn.addEventListener('click', () => {
      const idx = parseInt(btn.dataset.idx);
      if (cart[idx].quantity > 1) cart[idx].quantity--;
      else cart.splice(idx, 1);
      setCurrentOrder({ items: cart });
      rerender();
    });
  });

  document.querySelectorAll('.qty-plus').forEach(btn => {
    btn.addEventListener('click', () => {
      const idx = parseInt(btn.dataset.idx);
      cart[idx].quantity++;
      setCurrentOrder({ items: cart });
      rerender();
    });
  });

  document.querySelectorAll('.remove-item-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      cart.splice(parseInt(btn.dataset.idx), 1);
      setCurrentOrder({ items: cart });
      rerender();
    });
  });

  function createOrder(status) {
    if (!cart.length) { showToast('Add items to the order first', 'warning'); return; }

    const table = document.getElementById('order-table').value;
    const orderType = document.getElementById('order-type').value;
    const customer = document.getElementById('order-customer').value || 'Walk-in Customer';
    const phone = document.getElementById('order-phone').value;
    const notes = document.getElementById('order-notes').value;

    if (orderType === 'Dine In' && !table) {
      showToast('Please select a table number', 'warning');
      return;
    }

    const totals = calculateOrderTotals(cart, settings.gstPercent);
    const now = new Date();
    const user = getCurrentUser();
    const orderId = generateOrderId();

    const order = {
      id: orderId,
      date: '2026-09-04',
      time: `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`,
      table: table ? parseInt(table) : null,
      customer,
      phone,
      orderType,
      notes,
      items: cart.map(c => ({ ...c, subtotal: c.price * c.quantity })),
      itemCount: cart.reduce((s, c) => s + c.quantity, 0),
      subtotal: totals.subtotal,
      gst: totals.gst,
      total: totals.total,
      status,
      createdBy: user.name,
      createdAt: now.toISOString(),
      statusHistory: [{ time: formatTime(now), event: 'Order Created', status }]
    };

    addOrder(order);
    addNotification({ title: `New Order ${orderId}`, message: `${orderType} – ${customer}`, type: 'new' });
    cart = [];
    clearCurrentOrder();

    showModal({
      title: 'Order Placed Successfully!',
      body: `
        <div style="text-align:center;padding:1rem;">
          <div style="font-size:3rem;margin-bottom:1rem;">✅</div>
          <h3 style="margin-bottom:0.5rem;">${orderId}</h3>
          <p class="text-muted">Total: <strong>${formatCurrency(totals.total)}</strong></p>
          <p class="text-muted">Status: <strong>${status}</strong></p>
        </div>`,
      footer: `
        <button class="btn btn-secondary" id="modal-cancel">Close</button>
        <button class="btn btn-primary" id="view-order-confirm">View Order</button>`
    });

    document.getElementById('view-order-confirm')?.addEventListener('click', () => {
      document.getElementById('modal-root').innerHTML = '';
      onNavigate(`/orders/${orderId}`);
    });

    showToast(`Order ${orderId} placed successfully!`);
  }

  document.getElementById('place-order-btn')?.addEventListener('click', () => createOrder('Pending'));
  document.getElementById('save-order-btn')?.addEventListener('click', () => createOrder('Pending'));

  document.getElementById('clear-order-btn')?.addEventListener('click', () => {
    cart = [];
    clearCurrentOrder();
    rerender();
    showToast('Order cleared');
  });

  document.getElementById('cancel-order-btn')?.addEventListener('click', () => {
    onNavigate('/dashboard');
  });
}

function formatTime(date) {
  const h = date.getHours();
  const m = date.getMinutes();
  const ampm = h >= 12 ? 'PM' : 'AM';
  const h12 = h % 12 || 12;
  return `${String(h12).padStart(2, '0')}:${String(m).padStart(2, '0')} ${ampm}`;
}
