// LocalStorage state management

import {
  MENU_ITEMS, USERS, RESTAURANT_SETTINGS, INITIAL_ORDERS,
  INITIAL_NOTIFICATIONS, INVENTORY
} from './data.js';

const STORAGE_KEY = 'gurukripa_app_state';

function getDefaultState() {
  return {
    menuItems: [...MENU_ITEMS],
    users: USERS.map(u => ({ ...u })),
    settings: { ...RESTAURANT_SETTINGS },
    orders: [...INITIAL_ORDERS],
    notifications: [...INITIAL_NOTIFICATIONS],
    inventory: [...INVENTORY],
    currentOrder: null,
    orderCounter: 7,
    initialized: true
  };
}

export function loadState() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      if (parsed.initialized) return parsed;
    }
  } catch (e) {
    console.warn('Failed to load state:', e);
  }
  const state = getDefaultState();
  saveState(state);
  return state;
}

export function saveState(state) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export function resetState() {
  localStorage.removeItem(STORAGE_KEY);
  return getDefaultState();
}

let state = loadState();

export function getState() {
  return state;
}

export function setState(updates) {
  state = { ...state, ...updates };
  saveState(state);
  return state;
}

export function updateState(mutator) {
  mutator(state);
  saveState(state);
  return state;
}

// Menu operations
export function getMenuItems() {
  return state.menuItems;
}

export function getMenuItem(id) {
  return state.menuItems.find(m => m.id === id);
}

export function addMenuItem(item) {
  const newItem = {
    ...item,
    id: 'm' + Date.now(),
    createdAt: new Date().toISOString().split('T')[0],
    updatedAt: new Date().toISOString().split('T')[0]
  };
  state.menuItems.push(newItem);
  saveState(state);
  return newItem;
}

export function updateMenuItem(id, updates) {
  const idx = state.menuItems.findIndex(m => m.id === id);
  if (idx === -1) return null;
  state.menuItems[idx] = { ...state.menuItems[idx], ...updates, updatedAt: new Date().toISOString().split('T')[0] };
  saveState(state);
  return state.menuItems[idx];
}

export function deleteMenuItem(id) {
  state.menuItems = state.menuItems.filter(m => m.id !== id);
  saveState(state);
}

// Order operations
export function getOrders() {
  return state.orders;
}

export function getOrder(id) {
  return state.orders.find(o => o.id === id);
}

export function addOrder(order) {
  state.orders.unshift(order);
  state.orderCounter++;
  saveState(state);
  return order;
}

export function updateOrder(id, updates) {
  const idx = state.orders.findIndex(o => o.id === id);
  if (idx === -1) return null;
  state.orders[idx] = { ...state.orders[idx], ...updates };
  saveState(state);
  return state.orders[idx];
}

export function updateOrderStatus(id, newStatus, userName) {
  const order = getOrder(id);
  if (!order) return null;
  const now = new Date();
  const timeStr = formatTimeStr(now);
  const history = [...(order.statusHistory || []), { time: timeStr, event: newStatus, status: newStatus }];
  return updateOrder(id, { status: newStatus, statusHistory: history });
}

function formatTimeStr(date) {
  const h = date.getHours();
  const m = date.getMinutes();
  const ampm = h >= 12 ? 'PM' : 'AM';
  const h12 = h % 12 || 12;
  return `${String(h12).padStart(2, '0')}:${String(m).padStart(2, '0')} ${ampm}`;
}

export function generateOrderId() {
  const now = new Date();
  const dateStr = now.toISOString().split('T')[0].replace(/-/g, '');
  const seq = String(state.orderCounter).padStart(3, '0');
  return `ORD-${dateStr}-${seq}`;
}

// User operations
export function getUsers() {
  return state.users;
}

export function getUser(id) {
  return state.users.find(u => u.id === id);
}

export function addUser(user) {
  const newUser = {
    ...user,
    id: 'u' + Date.now(),
    createdAt: new Date().toISOString().split('T')[0],
    lastLogin: null,
    orderCount: 0
  };
  state.users.push(newUser);
  saveState(state);
  return newUser;
}

export function updateUser(id, updates) {
  const idx = state.users.findIndex(u => u.id === id);
  if (idx === -1) return null;
  state.users[idx] = { ...state.users[idx], ...updates };
  saveState(state);
  return state.users[idx];
}

// Settings
export function getSettings() {
  return state.settings;
}

export function updateSettings(updates) {
  state.settings = { ...state.settings, ...updates };
  saveState(state);
  return state.settings;
}

// Notifications
export function getNotifications() {
  return state.notifications;
}

export function markNotificationRead(id) {
  const n = state.notifications.find(n => n.id === id);
  if (n) n.read = true;
  saveState(state);
}

export function markAllNotificationsRead() {
  state.notifications.forEach(n => n.read = true);
  saveState(state);
}

export function addNotification(notification) {
  state.notifications.unshift({
    ...notification,
    id: 'n' + Date.now(),
    read: false,
    time: new Date().toISOString()
  });
  saveState(state);
}

// Current order (POS cart)
export function getCurrentOrder() {
  return state.currentOrder;
}

export function setCurrentOrder(order) {
  state.currentOrder = order;
  saveState(state);
}

export function clearCurrentOrder() {
  state.currentOrder = null;
  saveState(state);
}

// Inventory
export function getInventory() {
  return state.inventory;
}
