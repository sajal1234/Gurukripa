// Menu Management page

import { getMenuItems, addMenuItem, updateMenuItem, deleteMenuItem } from '../store.js';
import { formatCurrency, escapeHtml } from '../utils.js';
import { CATEGORIES } from '../data.js';
import { showToast, showModal, showConfirm } from '../components.js';
import { isAdmin } from '../auth.js';

let searchQuery = '';
let categoryFilter = 'all';

export function renderMenu() {
  const items = getMenuItems().filter(item => {
    const matchSearch = !searchQuery || item.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchCat = categoryFilter === 'all' || item.category === categoryFilter;
    return matchSearch && matchCat;
  });
  const admin = isAdmin();

  return `
    <div class="page-toolbar">
      <div class="toolbar-left">
        <div class="search-bar" style="min-width:250px;">
          <span class="search-icon">🔍</span>
          <input type="text" class="form-control" id="menu-search" placeholder="Search menu items..." value="${escapeHtml(searchQuery)}">
        </div>
        <select class="form-control" id="category-filter" style="width:auto;">
          <option value="all">All Categories</option>
          ${CATEGORIES.map(c => `<option value="${c}" ${categoryFilter === c ? 'selected' : ''}>${c}</option>`).join('')}
        </select>
      </div>
      ${admin ? '<div class="toolbar-right"><button class="btn btn-primary" id="add-menu-item">+ Add Menu Item</button></div>' : ''}
    </div>

    <div class="menu-grid">
      ${items.map(item => `
        <div class="menu-card ${item.available ? '' : 'unavailable'}">
          <div class="menu-card-img">${item.image}</div>
          <div class="menu-card-body">
            <h4>${escapeHtml(item.name)}</h4>
            <div class="category">${escapeHtml(item.category)}</div>
            <p style="font-size:0.8rem;color:var(--text-muted);margin:0.25rem 0;">${escapeHtml(item.description)}</p>
            <div class="menu-card-actions">
              <span class="price">${formatCurrency(item.price)}</span>
              <span class="badge ${item.available ? 'badge-active' : 'badge-inactive'}">${item.available ? 'Available' : 'Unavailable'}</span>
            </div>
            ${admin ? `
              <div class="flex gap-1 mt-1">
                <button class="btn btn-secondary btn-sm edit-menu-btn" data-id="${item.id}" style="flex:1;">Edit</button>
                <button class="btn btn-ghost btn-sm toggle-avail-btn" data-id="${item.id}" title="Toggle availability">${item.available ? '🚫' : '✅'}</button>
                <button class="btn btn-ghost btn-sm delete-menu-btn" data-id="${item.id}" title="Delete">🗑️</button>
              </div>
            ` : ''}
          </div>
        </div>
      `).join('')}
    </div>

    ${!items.length ? '<div class="empty-state"><div class="empty-icon">🍽️</div><h3>No menu items found</h3></div>' : ''}`;
}

export function bindMenu(rerender) {
  const admin = isAdmin();

  document.getElementById('menu-search')?.addEventListener('input', (e) => {
    searchQuery = e.target.value;
    rerender();
  });

  document.getElementById('category-filter')?.addEventListener('change', (e) => {
    categoryFilter = e.target.value;
    rerender();
  });

  if (!admin) return;

  document.getElementById('add-menu-item')?.addEventListener('click', () => {
    showMenuForm(null, rerender);
  });

  document.querySelectorAll('.edit-menu-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = getMenuItems().find(m => m.id === btn.dataset.id);
      showMenuForm(item, rerender);
    });
  });

  document.querySelectorAll('.toggle-avail-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = getMenuItems().find(m => m.id === btn.dataset.id);
      updateMenuItem(item.id, { available: !item.available });
      showToast(`${item.name} marked as ${!item.available ? 'available' : 'unavailable'}`);
      rerender();
    });
  });

  document.querySelectorAll('.delete-menu-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = getMenuItems().find(m => m.id === btn.dataset.id);
      showConfirm(`Delete "${item.name}" from the menu?`, () => {
        deleteMenuItem(item.id);
        showToast(`${item.name} deleted`);
        rerender();
      });
    });
  });
}

function showMenuForm(item, rerender) {
  const isEdit = !!item;

  showModal({
    title: isEdit ? 'Edit Menu Item' : 'Add Menu Item',
    body: `
      <form id="menu-form">
        <div class="form-group">
          <label>Item Name</label>
          <input type="text" class="form-control" id="item-name" value="${item?.name || ''}" required>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label>Category</label>
            <select class="form-control" id="item-category" required>
              ${CATEGORIES.map(c => `<option value="${c}" ${item?.category === c ? 'selected' : ''}>${c}</option>`).join('')}
            </select>
          </div>
          <div class="form-group">
            <label>Price (₹)</label>
            <input type="number" class="form-control" id="item-price" value="${item?.price || ''}" min="1" required>
          </div>
        </div>
        <div class="form-group">
          <label>Description</label>
          <textarea class="form-control" id="item-description" rows="2">${item?.description || ''}</textarea>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label>Image (emoji)</label>
            <input type="text" class="form-control" id="item-image" value="${item?.image || '🍽️'}" maxlength="4">
          </div>
          <div class="form-group">
            <label>Availability</label>
            <select class="form-control" id="item-available">
              <option value="true" ${item?.available !== false ? 'selected' : ''}>Available</option>
              <option value="false" ${item?.available === false ? 'selected' : ''}>Unavailable</option>
            </select>
          </div>
        </div>
      </form>`,
    footer: `
      <button class="btn btn-secondary" id="modal-cancel">Cancel</button>
      <button class="btn btn-primary" id="save-menu-item">${isEdit ? 'Update' : 'Add'} Item</button>`
  });

  document.getElementById('save-menu-item')?.addEventListener('click', () => {
    const data = {
      name: document.getElementById('item-name').value.trim(),
      category: document.getElementById('item-category').value,
      price: parseFloat(document.getElementById('item-price').value),
      description: document.getElementById('item-description').value.trim(),
      image: document.getElementById('item-image').value || '🍽️',
      available: document.getElementById('item-available').value === 'true'
    };

    if (!data.name || !data.price) {
      showToast('Please fill in required fields', 'warning');
      return;
    }

    if (isEdit) {
      updateMenuItem(item.id, data);
      showToast(`${data.name} updated`);
    } else {
      addMenuItem(data);
      showToast(`${data.name} added to menu`);
    }

    document.getElementById('modal-root').innerHTML = '';
    rerender();
  });
}
