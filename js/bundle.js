// Gurukripa Restaurant Prototype â€“ bundled (no ES modules)
(function() {
'use strict';
// --- js\data.js ---
// Initial mock data for Gurukripa Restaurant Management Prototype

const CATEGORIES = [
  'Starters',
  'Main Course',
  'Breads',
  'Rice & Biryani',
  'Beverages',
  'Desserts'
];

const ORDER_STATUSES = ['Pending', 'Confirmed', 'Preparing', 'Ready', 'Completed', 'Cancelled'];

const STATUS_FLOW = ['Pending', 'Confirmed', 'Preparing', 'Ready', 'Completed'];

const MENU_ITEMS = [
  { id: 'm1', name: 'Paneer Tikka', category: 'Starters', description: 'Marinated cottage cheese grilled in tandoor', price: 220, available: true, image: '🧀', createdAt: '2026-01-15', updatedAt: '2026-08-20' },
  { id: 'm2', name: 'Veg Spring Roll', category: 'Starters', description: 'Crispy rolls stuffed with vegetables', price: 160, available: true, image: '🥟', createdAt: '2026-01-15', updatedAt: '2026-07-10' },
  { id: 'm3', name: 'Hara Bhara Kabab', category: 'Starters', description: 'Spinach and green pea patties', price: 180, available: true, image: '🥬', createdAt: '2026-02-01', updatedAt: '2026-08-01' },
  { id: 'm4', name: 'Chicken 65', category: 'Starters', description: 'Spicy deep-fried chicken bites', price: 260, available: true, image: '🍗', createdAt: '2026-02-01', updatedAt: '2026-08-15' },
  { id: 'm5', name: 'Paneer Butter Masala', category: 'Main Course', description: 'Cottage cheese in rich tomato gravy', price: 180, available: true, image: '🍛', createdAt: '2026-01-10', updatedAt: '2026-09-01' },
  { id: 'm6', name: 'Dal Tadka', category: 'Main Course', description: 'Yellow lentils tempered with spices', price: 160, available: true, image: '🫘', createdAt: '2026-01-10', updatedAt: '2026-08-25' },
  { id: 'm7', name: 'Palak Paneer', category: 'Main Course', description: 'Cottage cheese in spinach gravy', price: 190, available: true, image: '🥗', createdAt: '2026-01-10', updatedAt: '2026-08-10' },
  { id: 'm8', name: 'Chicken Curry', category: 'Main Course', description: 'Home-style chicken in onion-tomato gravy', price: 280, available: true, image: '🍗', createdAt: '2026-01-10', updatedAt: '2026-08-20' },
  { id: 'm9', name: 'Mushroom Masala', category: 'Main Course', description: 'Button mushrooms in spiced gravy', price: 200, available: true, image: '🍄', createdAt: '2026-03-01', updatedAt: '2026-08-05' },
  { id: 'm10', name: 'Butter Naan', category: 'Breads', description: 'Soft leavened flatbread with butter', price: 60, available: true, image: '🫓', createdAt: '2026-01-10', updatedAt: '2026-09-02' },
  { id: 'm11', name: 'Garlic Naan', category: 'Breads', description: 'Naan topped with garlic and coriander', price: 70, available: true, image: '🫓', createdAt: '2026-01-10', updatedAt: '2026-08-30' },
  { id: 'm12', name: 'Tandoori Roti', category: 'Breads', description: 'Whole wheat flatbread from tandoor', price: 40, available: true, image: '🫓', createdAt: '2026-01-10', updatedAt: '2026-08-15' },
  { id: 'm13', name: 'Laccha Paratha', category: 'Breads', description: 'Multi-layered flaky paratha', price: 55, available: true, image: '🥙', createdAt: '2026-02-15', updatedAt: '2026-08-01' },
  { id: 'm14', name: 'Veg Biryani', category: 'Rice & Biryani', description: 'Fragrant basmati rice with vegetables', price: 220, available: true, image: '🍚', createdAt: '2026-01-10', updatedAt: '2026-09-01' },
  { id: 'm15', name: 'Chicken Biryani', category: 'Rice & Biryani', description: 'Aromatic rice with spiced chicken', price: 280, available: true, image: '🍚', createdAt: '2026-01-10', updatedAt: '2026-09-01' },
  { id: 'm16', name: 'Jeera Rice', category: 'Rice & Biryani', description: 'Basmati rice tempered with cumin', price: 120, available: true, image: '🍚', createdAt: '2026-01-10', updatedAt: '2026-07-20' },
  { id: 'm17', name: 'Hyderabadi Biryani', category: 'Rice & Biryani', description: 'Dum-cooked biryani with spices', price: 320, available: true, image: '🍚', createdAt: '2026-04-01', updatedAt: '2026-08-25' },
  { id: 'm18', name: 'Masala Dosa', category: 'Starters', description: 'Crispy crepe with potato filling', price: 140, available: true, image: '🥞', createdAt: '2026-02-01', updatedAt: '2026-08-30' },
  { id: 'm19', name: 'Cold Coffee', category: 'Beverages', description: 'Chilled blended coffee with ice cream', price: 120, available: true, image: '☕', createdAt: '2026-01-10', updatedAt: '2026-09-02' },
  { id: 'm20', name: 'Mango Lassi', category: 'Beverages', description: 'Sweet yogurt drink with mango', price: 90, available: true, image: '🥭', createdAt: '2026-01-10', updatedAt: '2026-08-15' },
  { id: 'm21', name: 'Fresh Lime Soda', category: 'Beverages', description: 'Refreshing lime with soda', price: 60, available: true, image: '🍋', createdAt: '2026-01-10', updatedAt: '2026-07-01' },
  { id: 'm22', name: 'Masala Chai', category: 'Beverages', description: 'Indian spiced tea', price: 40, available: true, image: '🍵', createdAt: '2026-01-10', updatedAt: '2026-08-01' },
  { id: 'm23', name: 'Sweet Lassi', category: 'Beverages', description: 'Traditional sweet yogurt drink', price: 70, available: true, image: '🥛', createdAt: '2026-01-10', updatedAt: '2026-07-15' },
  { id: 'm24', name: 'Gulab Jamun', category: 'Desserts', description: 'Deep-fried milk balls in sugar syrup', price: 90, available: true, image: '🍡', createdAt: '2026-01-10', updatedAt: '2026-08-20' },
  { id: 'm25', name: 'Rasmalai', category: 'Desserts', description: 'Soft cheese patties in sweet milk', price: 110, available: true, image: '🍮', createdAt: '2026-01-10', updatedAt: '2026-08-10' },
  { id: 'm26', name: 'Kulfi Falooda', category: 'Desserts', description: 'Traditional ice cream with vermicelli', price: 130, available: true, image: '🍨', createdAt: '2026-03-15', updatedAt: '2026-08-25' },
  { id: 'm27', name: 'Chocolate Brownie', category: 'Desserts', description: 'Warm chocolate brownie with ice cream', price: 150, available: false, image: '🍫', createdAt: '2026-05-01', updatedAt: '2026-08-30' },
  { id: 'm28', name: 'Papad', category: 'Starters', description: 'Crispy lentil wafer', price: 30, available: true, image: '🫓', createdAt: '2026-01-10', updatedAt: '2026-07-01' },
  { id: 'm29', name: 'Mixed Raita', category: 'Starters', description: 'Yogurt with cucumber and spices', price: 80, available: true, image: '🥣', createdAt: '2026-01-10', updatedAt: '2026-08-01' },
  { id: 'm30', name: 'Fish Curry', category: 'Main Course', description: 'Coastal style fish in coconut gravy', price: 320, available: true, image: '🐟', createdAt: '2026-06-01', updatedAt: '2026-08-15' },
];

const USERS = [
  {
    id: 'u1',
    name: 'Admin User',
    email: 'admin@restaurant.com',
    password: 'admin123',
    phone: '9876543210',
    role: 'admin',
    status: 'active',
    createdAt: '2026-01-01',
    lastLogin: '2026-09-04T10:30:00',
    orderCount: 0
  },
  {
    id: 'u2',
    name: 'Rajesh Kumar',
    email: 'manager@restaurant.com',
    password: 'manager123',
    phone: '9876543211',
    role: 'manager',
    status: 'active',
    createdAt: '2026-01-15',
    lastLogin: '2026-09-04T09:15:00',
    orderCount: 156
  },
  {
    id: 'u3',
    name: 'Priya Sharma',
    email: 'priya@restaurant.com',
    password: 'manager123',
    phone: '9876543212',
    role: 'manager',
    status: 'active',
    createdAt: '2026-02-01',
    lastLogin: '2026-09-03T18:45:00',
    orderCount: 98
  },
  {
    id: 'u4',
    name: 'Amit Patel',
    email: 'amit@restaurant.com',
    password: 'manager123',
    phone: '9876543213',
    role: 'manager',
    status: 'inactive',
    createdAt: '2026-03-01',
    lastLogin: '2026-08-15T14:20:00',
    orderCount: 45
  }
];

const RESTAURANT_SETTINGS = {
  name: 'Gurukripa Restaurant',
  address: '42 MG Road, Indore, Madhya Pradesh 452001',
  phone: '+91 731 2567890',
  email: 'info@gurukripa.com',
  logo: '🍽️',
  gstPercent: 5,
  orderNumberFormat: 'ORD-YYYYMMDD-XXX',
  defaultOrderStatus: 'Pending',
  tableNumbers: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 15, 20],
  enableTakeaway: true,
  enableDineIn: true
};

const INVENTORY = [
  { id: 'i1', name: 'Tomato', quantity: 8, unit: 'kg', threshold: 10, status: 'low' },
  { id: 'i2', name: 'Onion', quantity: 25, unit: 'kg', threshold: 15, status: 'ok' },
  { id: 'i3', name: 'Paneer', quantity: 5, unit: 'kg', threshold: 8, status: 'low' },
  { id: 'i4', name: 'Chicken', quantity: 12, unit: 'kg', threshold: 10, status: 'ok' },
  { id: 'i5', name: 'Basmati Rice', quantity: 40, unit: 'kg', threshold: 20, status: 'ok' },
  { id: 'i6', name: 'Cooking Oil', quantity: 15, unit: 'litre', threshold: 10, status: 'ok' },
  { id: 'i7', name: 'Milk', quantity: 6, unit: 'litre', threshold: 8, status: 'low' },
  { id: 'i8', name: 'Ginger-Garlic Paste', quantity: 3, unit: 'kg', threshold: 5, status: 'low' },
];

function generateOrders() {
  const customers = [
    'Rahul Mehta', 'Sneha Gupta', 'Vikram Singh', 'Anita Desai', 'Walk-in Customer',
    'Karan Joshi', 'Meera Reddy', 'Suresh Iyer', 'Divya Nair', 'Arjun Malhotra',
    'Pooja Agarwal', 'Ravi Shankar', 'Neha Kapoor', 'Sanjay Verma', 'Kavita Rao'
  ];
  const managers = ['Rajesh Kumar', 'Priya Sharma'];
  const types = ['Dine In', 'Takeaway'];
  const statuses = ORDER_STATUSES;
  const items = MENU_ITEMS.filter(m => m.available);

  const orders = [];
  const today = new Date('2026-09-04');

  for (let i = 0; i < 35; i++) {
    const daysAgo = Math.floor(Math.random() * 90);
    const orderDate = new Date(today);
    orderDate.setDate(orderDate.getDate() - daysAgo);
    const hour = 10 + Math.floor(Math.random() * 12);
    const minute = Math.floor(Math.random() * 60);
    orderDate.setHours(hour, minute, 0, 0);

    const numItems = 1 + Math.floor(Math.random() * 5);
    const orderItems = [];
    const usedIds = new Set();
    for (let j = 0; j < numItems; j++) {
      const item = items[Math.floor(Math.random() * items.length)];
      if (usedIds.has(item.id)) continue;
      usedIds.add(item.id);
      const qty = 1 + Math.floor(Math.random() * 3);
      orderItems.push({
        menuItemId: item.id,
        name: item.name,
        price: item.price,
        quantity: qty,
        subtotal: item.price * qty
      });
    }

    const subtotal = orderItems.reduce((s, o) => s + o.subtotal, 0);
    const gst = Math.round(subtotal * 0.05 * 100) / 100;
    const total = subtotal + gst;

    const dateStr = orderDate.toISOString().split('T')[0].replace(/-/g, '');
    const seq = String(i + 1).padStart(3, '0');
    const status = statuses[Math.floor(Math.random() * statuses.length)];

    const statusHistory = buildStatusHistory(orderDate, status);

    orders.push({
      id: `ORD-${dateStr}-${seq}`,
      date: orderDate.toISOString().split('T')[0],
      time: `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`,
      table: types[Math.floor(Math.random() * 2)] === 'Dine In' ? (1 + Math.floor(Math.random() * 12)) : null,
      customer: customers[Math.floor(Math.random() * customers.length)],
      phone: `98${Math.floor(10000000 + Math.random() * 90000000)}`,
      orderType: types[Math.floor(Math.random() * types.length)],
      notes: i % 5 === 0 ? 'Less spicy please' : '',
      items: orderItems,
      itemCount: orderItems.reduce((s, o) => s + o.quantity, 0),
      subtotal,
      gst,
      total,
      status,
      createdBy: managers[Math.floor(Math.random() * managers.length)],
      createdAt: orderDate.toISOString(),
      statusHistory
    });
  }

  // Ensure some today's orders with specific statuses
  const todayOrders = [
    { status: 'Pending', customer: 'Rahul Mehta', table: 5 },
    { status: 'Pending', customer: 'Sneha Gupta', table: 3 },
    { status: 'Confirmed', customer: 'Vikram Singh', table: 8 },
    { status: 'Preparing', customer: 'Anita Desai', table: 2 },
    { status: 'Ready', customer: 'Karan Joshi', table: 7 },
    { status: 'Completed', customer: 'Meera Reddy', table: 1 },
  ];

  todayOrders.forEach((t, idx) => {
    const hour = 9 + idx;
    const items = [
      { menuItemId: 'm5', name: 'Paneer Butter Masala', price: 180, quantity: 2, subtotal: 360 },
      { menuItemId: 'm10', name: 'Butter Naan', price: 60, quantity: 4, subtotal: 240 },
    ];
    const subtotal = 600;
    const gst = 30;
    orders.unshift({
      id: `ORD-20260904-${String(idx + 1).padStart(3, '0')}`,
      date: '2026-09-04',
      time: `${String(hour).padStart(2, '0')}:30`,
      table: t.table,
      customer: t.customer,
      phone: '9876543200',
      orderType: 'Dine In',
      notes: '',
      items,
      itemCount: 6,
      subtotal,
      gst,
      total: subtotal + gst,
      status: t.status,
      createdBy: 'Rajesh Kumar',
      createdAt: `2026-09-04T${String(hour).padStart(2, '0')}:30:00`,
      statusHistory: buildStatusHistory(new Date(`2026-09-04T${hour}:30:00`), t.status)
    });
  });

  return orders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
}

function buildStatusHistory(startDate, finalStatus) {
  const history = [{ time: formatTime(startDate), event: 'Order Created', status: 'Pending' }];
  const flow = STATUS_FLOW;
  const finalIdx = flow.indexOf(finalStatus);

  if (finalStatus === 'Cancelled') {
    history.push({ time: formatTime(addMinutes(startDate, 5)), event: 'Order Cancelled', status: 'Cancelled' });
    return history;
  }

  for (let i = 1; i <= finalIdx; i++) {
    history.push({
      time: formatTime(addMinutes(startDate, i * 8)),
      event: flow[i],
      status: flow[i]
    });
  }
  return history;
}

function addMinutes(date, mins) {
  const d = new Date(date);
  d.setMinutes(d.getMinutes() + mins);
  return d;
}

function formatTime(date) {
  const h = date.getHours();
  const m = date.getMinutes();
  const ampm = h >= 12 ? 'PM' : 'AM';
  const h12 = h % 12 || 12;
  return `${String(h12).padStart(2, '0')}:${String(m).padStart(2, '0')} ${ampm}`;
}

const INITIAL_ORDERS = generateOrders();

const INITIAL_NOTIFICATIONS = [
  { id: 'n1', title: 'New Order #ORD-20260904-001', message: 'Table 5 – Rahul Mehta', type: 'new', read: false, time: '2026-09-04T09:30:00' },
  { id: 'n2', title: 'Order Ready #ORD-20260904-005', message: 'Table 7 – Karan Joshi', type: 'ready', read: false, time: '2026-09-04T10:15:00' },
  { id: 'n3', title: 'Low Stock Alert', message: 'Tomato – only 8 kg remaining', type: 'stock', read: false, time: '2026-09-04T08:00:00' },
  { id: 'n4', title: 'Order Completed #ORD-20260904-006', message: 'Table 1 – Meera Reddy', type: 'completed', read: true, time: '2026-09-04T10:30:00' },
  { id: 'n5', title: 'Pending Order Alert', message: '2 orders awaiting confirmation', type: 'pending', read: false, time: '2026-09-04T09:45:00' },
];

// --- js\store.js ---
// LocalStorage state management



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

function loadState() {
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

function saveState(state) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function resetState() {
  localStorage.removeItem(STORAGE_KEY);
  return getDefaultState();
}

let state = loadState();

function getState() {
  return state;
}

function setState(updates) {
  state = { ...state, ...updates };
  saveState(state);
  return state;
}

function updateState(mutator) {
  mutator(state);
  saveState(state);
  return state;
}

// Menu operations
function getMenuItems() {
  return state.menuItems;
}

function getMenuItem(id) {
  return state.menuItems.find(m => m.id === id);
}

function addMenuItem(item) {
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

function updateMenuItem(id, updates) {
  const idx = state.menuItems.findIndex(m => m.id === id);
  if (idx === -1) return null;
  state.menuItems[idx] = { ...state.menuItems[idx], ...updates, updatedAt: new Date().toISOString().split('T')[0] };
  saveState(state);
  return state.menuItems[idx];
}

function deleteMenuItem(id) {
  state.menuItems = state.menuItems.filter(m => m.id !== id);
  saveState(state);
}

// Order operations
function getOrders() {
  return state.orders;
}

function getOrder(id) {
  return state.orders.find(o => o.id === id);
}

function addOrder(order) {
  state.orders.unshift(order);
  state.orderCounter++;
  saveState(state);
  return order;
}

function updateOrder(id, updates) {
  const idx = state.orders.findIndex(o => o.id === id);
  if (idx === -1) return null;
  state.orders[idx] = { ...state.orders[idx], ...updates };
  saveState(state);
  return state.orders[idx];
}

function updateOrderStatus(id, newStatus, userName) {
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

function generateOrderId() {
  const now = new Date();
  const dateStr = now.toISOString().split('T')[0].replace(/-/g, '');
  const seq = String(state.orderCounter).padStart(3, '0');
  return `ORD-${dateStr}-${seq}`;
}

// User operations
function getUsers() {
  return state.users;
}

function getUser(id) {
  return state.users.find(u => u.id === id);
}

function addUser(user) {
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

function updateUser(id, updates) {
  const idx = state.users.findIndex(u => u.id === id);
  if (idx === -1) return null;
  state.users[idx] = { ...state.users[idx], ...updates };
  saveState(state);
  return state.users[idx];
}

// Settings
function getSettings() {
  return state.settings;
}

function updateSettings(updates) {
  state.settings = { ...state.settings, ...updates };
  saveState(state);
  return state.settings;
}

// Notifications
function getNotifications() {
  return state.notifications;
}

function markNotificationRead(id) {
  const n = state.notifications.find(n => n.id === id);
  if (n) n.read = true;
  saveState(state);
}

function markAllNotificationsRead() {
  state.notifications.forEach(n => n.read = true);
  saveState(state);
}

function addNotification(notification) {
  state.notifications.unshift({
    ...notification,
    id: 'n' + Date.now(),
    read: false,
    time: new Date().toISOString()
  });
  saveState(state);
}

// Current order (POS cart)
function getCurrentOrder() {
  return state.currentOrder;
}

function setCurrentOrder(order) {
  state.currentOrder = order;
  saveState(state);
}

function clearCurrentOrder() {
  state.currentOrder = null;
  saveState(state);
}

// Inventory
function getInventory() {
  return state.inventory;
}

// --- js\utils.js ---
// Utility functions

function formatCurrency(amount) {
  return '₹' + Number(amount).toLocaleString('en-IN', { minimumFractionDigits: 0, maximumFractionDigits: 2 });
}

function formatDate(dateStr) {
  if (!dateStr) return '—';
  const d = new Date(dateStr + (dateStr.includes('T') ? '' : 'T00:00:00'));
  return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
}

function formatDateTime(isoStr) {
  if (!isoStr) return '—';
  const d = new Date(isoStr);
  return d.toLocaleString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
}

function todayStr() {
  return new Date().toISOString().split('T')[0];
}

function getDateRange(preset) {
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

function isDateInRange(dateStr, start, end) {
  if (!dateStr) return false;
  const d = dateStr.split('T')[0];
  if (start && d < start) return false;
  if (end && d > end) return false;
  return true;
}

function getStatusBadge(status) {
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

function escapeHtml(str) {
  if (!str) return '';
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

function debounce(fn, delay) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

function calculateOrderTotals(items, gstPercent = 5) {
  const subtotal = items.reduce((s, item) => s + (item.price * item.quantity), 0);
  const gst = Math.round(subtotal * (gstPercent / 100) * 100) / 100;
  const total = subtotal + gst;
  return { subtotal, gst, total };
}

function getInitials(name) {
  if (!name) return '?';
  return name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);
}

function groupBy(arr, key) {
  return arr.reduce((acc, item) => {
    const k = typeof key === 'function' ? key(item) : item[key];
    (acc[k] = acc[k] || []).push(item);
    return acc;
  }, {});
}

function sumBy(arr, fn) {
  return arr.reduce((s, item) => s + fn(item), 0);
}

function getTopSellingItems(orders, limit = 5) {
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

function filterOrders(orders, filters) {
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

function getDashboardKPIs(orders, date = '2026-09-04') {
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

function getOrdersChartData(orders, period) {
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

function getRevenueChartData(orders, period) {
  const chartData = getOrdersChartData(orders, period);
  return {
    labels: chartData.labels,
    values: chartData.values.map(v => v * (350 + Math.floor(Math.random() * 200)))
  };
}

function getStatusBreakdown(orders, dateFilter) {
  const filtered = dateFilter
    ? orders.filter(o => isDateInRange(o.date, dateFilter.start, dateFilter.end))
    : orders;

  const statuses = ['Pending', 'Confirmed', 'Preparing', 'Ready', 'Completed', 'Cancelled'];
  return {
    labels: statuses,
    values: statuses.map(s => filtered.filter(o => o.status === s).length)
  };
}

function simulatePdfDownload(title, content) {
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

// --- js\auth.js ---
// Authentication module

const SESSION_KEY = 'gurukripa_session';

function getSession() {
  try {
    const s = sessionStorage.getItem(SESSION_KEY);
    return s ? JSON.parse(s) : null;
  } catch {
    return null;
  }
}

function setSession(user) {
  const session = {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    loginAt: new Date().toISOString()
  };
  sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));
  return session;
}

function clearSession() {
  sessionStorage.removeItem(SESSION_KEY);
}

function isAuthenticated() {
  return !!getSession();
}

function login(email, password, users) {
  const user = users.find(u =>
    (u.email === email || u.email === email.toLowerCase()) &&
    u.password === password &&
    u.status === 'active'
  );
  if (!user) return { success: false, error: 'Invalid email or password' };
  setSession(user);
  return { success: true, user };
}

function logout() {
  clearSession();
}

function isAdmin() {
  const s = getSession();
  return s && s.role === 'admin';
}

function isManager() {
  const s = getSession();
  return s && s.role === 'manager';
}

function getCurrentUser() {
  return getSession();
}

// --- js\charts.js ---
// Chart rendering helpers using Chart.js

const chartInstances = {};

const COLORS = {
  primary: '#e85d04',
  secondary: '#1a1a2e',
  success: '#16a34a',
  warning: '#d97706',
  danger: '#dc2626',
  info: '#2563eb',
  purple: '#7c3aed',
  palette: ['#e85d04', '#2563eb', '#16a34a', '#7c3aed', '#d97706', '#dc2626', '#0891b2', '#be185d']
};

function destroyChart(id) {
  if (chartInstances[id]) {
    chartInstances[id].destroy();
    delete chartInstances[id];
  }
}

function destroyAllCharts() {
  Object.keys(chartInstances).forEach(destroyChart);
}

function renderLineChart(canvasId, labels, data, label = 'Orders') {
  destroyChart(canvasId);
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;

  chartInstances[canvasId] = new Chart(canvas, {
    type: 'line',
    data: {
      labels,
      datasets: [{
        label,
        data,
        borderColor: COLORS.primary,
        backgroundColor: 'rgba(232,93,4,0.1)',
        fill: true,
        tension: 0.4,
        pointRadius: 4,
        pointBackgroundColor: COLORS.primary
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        y: { beginAtZero: true, grid: { color: '#f0f0f0' } },
        x: { grid: { display: false } }
      }
    }
  });
}

function renderBarChart(canvasId, labels, data, label = 'Revenue') {
  destroyChart(canvasId);
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;

  chartInstances[canvasId] = new Chart(canvas, {
    type: 'bar',
    data: {
      labels,
      datasets: [{
        label,
        data,
        backgroundColor: 'rgba(232,93,4,0.8)',
        borderRadius: 6,
        borderSkipped: false
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        y: { beginAtZero: true, grid: { color: '#f0f0f0' } },
        x: { grid: { display: false } }
      }
    }
  });
}

function renderDoughnutChart(canvasId, labels, data) {
  destroyChart(canvasId);
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;

  chartInstances[canvasId] = new Chart(canvas, {
    type: 'doughnut',
    data: {
      labels,
      datasets: [{
        data,
        backgroundColor: COLORS.palette.slice(0, labels.length),
        borderWidth: 2,
        borderColor: '#fff'
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { position: 'right', labels: { boxWidth: 12, font: { size: 11 } } }
      },
      cutout: '65%'
    }
  });
}

function renderHorizontalBarChart(canvasId, labels, data) {
  destroyChart(canvasId);
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;

  chartInstances[canvasId] = new Chart(canvas, {
    type: 'bar',
    data: {
      labels,
      datasets: [{
        data,
        backgroundColor: COLORS.palette.slice(0, labels.length),
        borderRadius: 4
      }]
    },
    options: {
      indexAxis: 'y',
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        x: { beginAtZero: true, grid: { color: '#f0f0f0' } },
        y: { grid: { display: false } }
      }
    }
  });
}

function bindChartTabs(containerId, onTabChange) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.querySelectorAll('.chart-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      container.querySelectorAll('.chart-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      onTabChange(tab.dataset.period);
    });
  });
}

// --- js\components.js ---
// Shared UI components





const ICONS = {
  dashboard: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>',
  order: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>',
  orders: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>',
  menu: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 8h1a4 4 0 010 8h-1"/><path d="M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8z"/><line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/></svg>',
  analytics: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>',
  reports: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="12" y1="18" x2="12" y2="12"/><line x1="9" y1="15" x2="15" y2="15"/></svg>',
  users: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>',
  settings: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></svg>',
  inventory: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/></svg>',
  logout: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>',
};

function navLink(href, label, icon, currentRoute) {
  const active = currentRoute === href || (href !== '/dashboard' && currentRoute.startsWith(href)) ? 'active' : '';
  return `<a class="nav-link ${active}" href="#${href}" data-route="${href}">${ICONS[icon] || ''}${label}</a>`;
}

function renderSidebar(currentRoute) {
  const user = getCurrentUser();
  const admin = isAdmin();

  const mainNav = [
    navLink('/dashboard', 'Dashboard', 'dashboard', currentRoute),
    navLink('/new-order', 'New Order', 'order', currentRoute),
    navLink('/orders', 'Orders', 'orders', currentRoute),
    navLink('/menu', 'Menu', 'menu', currentRoute),
  ];

  const analyticsNav = [
    navLink('/analytics', 'Analytics', 'analytics', currentRoute),
    navLink('/reports', 'Reports & Downloads', 'reports', currentRoute),
  ];

  const adminNav = admin ? [
    navLink('/users', 'Users', 'users', currentRoute),
    navLink('/settings', 'Settings', 'settings', currentRoute),
    navLink('/inventory', 'Inventory', 'inventory', currentRoute),
  ] : [];

  return `
    <aside class="sidebar" id="sidebar">
      <div class="sidebar-brand">
        <div class="sidebar-brand-icon">🍽️</div>
        <div>
          <h1>Gurukripa</h1>
          <span>Restaurant Management</span>
        </div>
      </div>
      <nav class="sidebar-nav">
        <div class="nav-section-label">Main</div>
        ${mainNav.join('')}
        <div class="nav-section-label">Analytics</div>
        ${analyticsNav.join('')}
        ${adminNav.length ? `<div class="nav-section-label">Administration</div>${adminNav.join('')}` : ''}
      </nav>
      <div class="sidebar-footer">
        <div class="user-profile">
          <div class="user-avatar">${getInitials(user?.name)}</div>
          <div class="user-info">
            <div class="name">${escapeHtml(user?.name)}</div>
            <div class="role">${user?.role}</div>
          </div>
        </div>
        <button class="btn btn-ghost btn-sm btn-block mt-1" id="logout-btn" style="color:rgba(255,255,255,0.6);justify-content:flex-start;">
          ${ICONS.logout} Logout
        </button>
      </div>
    </aside>`;
}

function renderHeader(title, subtitle) {
  const notifications = getNotifications();
  const unread = notifications.filter(n => !n.read).length;

  return `
    <header class="top-header">
      <div class="page-title-area">
        <h2>${escapeHtml(title)}</h2>
        ${subtitle ? `<p>${escapeHtml(subtitle)}</p>` : ''}
      </div>
      <div class="header-actions">
        <div class="notification-btn" style="position:relative;">
          <button class="btn btn-ghost btn-icon" id="notif-toggle" title="Notifications">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/></svg>
            ${unread ? `<span class="notification-badge">${unread}</span>` : ''}
          </button>
          <div class="notification-dropdown hidden" id="notif-dropdown">
            <div class="notification-header">
              <span>Notifications</span>
              <button class="btn btn-ghost btn-sm" id="mark-all-read">Mark all read</button>
            </div>
            ${notifications.length ? notifications.map(n => `
              <div class="notification-item ${n.read ? '' : 'unread'}" data-notif-id="${n.id}">
                <div class="notif-title">${escapeHtml(n.title)}</div>
                <div class="text-muted" style="font-size:0.8rem;">${escapeHtml(n.message)}</div>
                <div class="notif-time">${formatDateTime(n.time)}</div>
              </div>
            `).join('') : '<div class="empty-state" style="padding:2rem;"><p>No notifications</p></div>'}
          </div>
        </div>
      </div>
    </header>`;
}

function renderAppShell(currentRoute, title, subtitle, content) {
  return `
    <div class="app-layout">
      ${renderSidebar(currentRoute)}
      <div class="main-content">
        ${renderHeader(title, subtitle)}
        <div class="page-content" id="page-content">
          ${content}
        </div>
      </div>
    </div>`;
}

function showToast(message, type = 'success') {
  const container = document.getElementById('toast-container');
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  const icons = { success: '✓', error: '✕', warning: '⚠' };
  toast.innerHTML = `<span>${icons[type] || ''}</span> ${escapeHtml(message)}`;
  container.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transition = 'opacity 0.3s';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

function showModal({ title, body, footer, size = '' }) {
  const root = document.getElementById('modal-root');
  root.innerHTML = `
    <div class="modal-overlay" id="modal-overlay">
      <div class="modal ${size}">
        <div class="modal-header">
          <h3>${title}</h3>
          <button class="btn btn-ghost btn-icon" id="modal-close">✕</button>
        </div>
        <div class="modal-body">${body}</div>
        ${footer ? `<div class="modal-footer">${footer}</div>` : ''}
      </div>
    </div>`;

  const close = () => { root.innerHTML = ''; };
  root.querySelector('#modal-close')?.addEventListener('click', close);
  root.querySelector('#modal-overlay')?.addEventListener('click', (e) => {
    if (e.target.id === 'modal-overlay') close();
  });
  root.querySelector('#modal-cancel')?.addEventListener('click', close);

  return { close, el: root };
}

function showConfirm(message, onConfirm) {
  const modal = showModal({
    title: 'Confirm Action',
    body: `<p>${escapeHtml(message)}</p>`,
    footer: `
      <button class="btn btn-secondary" id="modal-cancel">Cancel</button>
      <button class="btn btn-danger" id="modal-confirm">Confirm</button>`
  });
  modal.el.querySelector('#modal-confirm')?.addEventListener('click', () => {
    modal.close();
    onConfirm();
  });
}

function bindShellEvents(onNavigate) {
  document.getElementById('logout-btn')?.addEventListener('click', () => {
    logout();
    onNavigate('/login');
    showToast('Logged out successfully');
  });

  document.getElementById('notif-toggle')?.addEventListener('click', (e) => {
    e.stopPropagation();
    document.getElementById('notif-dropdown')?.classList.toggle('hidden');
  });

  document.getElementById('mark-all-read')?.addEventListener('click', () => {
    markAllNotificationsRead();
    onNavigate(location.hash.slice(1) || '/dashboard');
  });

  document.querySelectorAll('.notification-item').forEach(el => {
    el.addEventListener('click', () => {
      markNotificationRead(el.dataset.notifId);
    });
  });

  document.addEventListener('click', (e) => {
    const dropdown = document.getElementById('notif-dropdown');
    if (dropdown && !e.target.closest('.notification-btn')) {
      dropdown.classList.add('hidden');
    }
  });
}

function renderEmptyState(icon, title, message, actionHtml = '') {
  return `
    <div class="empty-state">
      <div class="empty-icon">${icon}</div>
      <h3>${escapeHtml(title)}</h3>
      <p>${escapeHtml(message)}</p>
      ${actionHtml}
    </div>`;
}

function renderLoading() {
  return '<div class="loading-spinner"><div class="spinner"></div></div>';
}

// --- js\pages\login.js ---
// Login page





function renderLogin() {
  return `
    <div class="login-page">
      <div class="login-hero">
        <div class="login-hero-content">
          <h1>Gurukripa Restaurant</h1>
          <p>Modern restaurant management system for seamless operations, ordering, and analytics.</p>
          <div class="login-features">
            <div class="login-feature">
              <div class="login-feature-icon">📊</div>
              <span>Real-time dashboard & analytics</span>
            </div>
            <div class="login-feature">
              <div class="login-feature-icon">🍽️</div>
              <span>POS-style order management</span>
            </div>
            <div class="login-feature">
              <div class="login-feature-icon">📋</div>
              <span>Menu, reports & user management</span>
            </div>
          </div>
        </div>
      </div>
      <div class="login-form-panel">
        <div class="login-form-wrapper">
          <h2>Welcome back</h2>
          <p class="subtitle">Sign in to your account to continue</p>

          <div class="login-credentials-hint">
            <strong>Demo Credentials</strong>
            Admin: <code>admin@restaurant.com</code> / <code>admin123</code><br>
            Manager: <code>manager@restaurant.com</code> / <code>manager123</code>
          </div>

          <form id="login-form">
            <div class="form-group">
              <label for="email">Username / Email</label>
              <input type="text" id="email" class="form-control" placeholder="Enter your email" required>
            </div>
            <div class="form-group">
              <label for="password">Password</label>
              <input type="password" id="password" class="form-control" placeholder="Enter your password" required>
            </div>
            <div class="flex-between mb-2">
              <label class="checkbox-group">
                <input type="checkbox" id="remember"> Remember me
              </label>
              <a href="#" id="forgot-password" style="font-size:0.85rem;">Forgot password?</a>
            </div>
            <div class="form-error hidden" id="login-error"></div>
            <button type="submit" class="btn btn-primary btn-lg btn-block">Sign In</button>
          </form>
        </div>
      </div>
    </div>`;
}

function bindLogin(onNavigate) {
  document.getElementById('login-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const errorEl = document.getElementById('login-error');

    const result = login(email, password, getUsers());
    if (result.success) {
      showToast(`Welcome back, ${result.user.name}!`);
      onNavigate('/dashboard');
    } else {
      errorEl.textContent = result.error;
      errorEl.classList.remove('hidden');
    }
  });

  document.getElementById('forgot-password')?.addEventListener('click', (e) => {
    e.preventDefault();
    showToast('Password reset link sent to your email (simulated)', 'warning');
  });
}

// --- js\pages\dashboard.js ---
// Dashboard page






function renderDashboard() {
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

function bindDashboard(onNavigate) {
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

// --- js\pages\new-order.js ---
// New Order / POS page







let cart = [];
let selectedCategory = 'All';

function renderNewOrder() {
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

function bindNewOrder(onNavigate, rerender) {
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

// --- js\pages\orders.js ---
// Orders page and order details







let filters = {
  search: '',
  status: 'all',
  orderType: 'all',
  createdBy: 'all',
  dateStart: '',
  dateEnd: '',
  datePreset: ''
};

function renderOrders(orderId) {
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

function bindOrders(onNavigate, rerender, orderId) {
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



// --- js\pages\menu.js ---
// Menu Management page







let searchQuery = '';
let categoryFilter = 'all';

function renderMenu() {
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

function bindMenu(rerender) {
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

// --- js\pages\analytics.js ---
// Analytics page





let period = 'daily';

function renderAnalytics() {
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

function bindAnalytics(rerender) {
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

// --- js\pages\reports.js ---
// Reports & Downloads page






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

function renderReports() {
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

function bindReports(rerender) {
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

// --- js\pages\users.js ---
// User Management page (Admin only)





function renderUsers() {
  const users = getUsers().filter(u => u.role === 'manager');

  return `
    <div class="page-toolbar">
      <div class="toolbar-left">
        <span class="text-muted">${users.length} managers</span>
      </div>
      <div class="toolbar-right">
        <button class="btn btn-primary" id="add-manager">+ Add Manager</button>
      </div>
    </div>

    <div class="table-wrapper">
      <table class="data-table">
        <thead>
          <tr>
            <th>Name</th><th>Email</th><th>Phone</th><th>Role</th>
            <th>Status</th><th>Created</th><th>Last Login</th><th>Orders</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          ${users.map(u => `
            <tr>
              <td><strong>${escapeHtml(u.name)}</strong></td>
              <td>${escapeHtml(u.email)}</td>
              <td>${u.phone}</td>
              <td><span class="badge badge-confirmed">${u.role}</span></td>
              <td><span class="badge ${u.status === 'active' ? 'badge-active' : 'badge-inactive'}">${u.status}</span></td>
              <td>${formatDate(u.createdAt)}</td>
              <td>${u.lastLogin ? formatDateTime(u.lastLogin) : '—'}</td>
              <td>${u.orderCount}</td>
              <td>
                <button class="btn btn-secondary btn-sm edit-user-btn" data-id="${u.id}">Edit</button>
                <button class="btn btn-ghost btn-sm toggle-user-btn" data-id="${u.id}">${u.status === 'active' ? 'Deactivate' : 'Activate'}</button>
                <button class="btn btn-ghost btn-sm reset-pw-btn" data-id="${u.id}">Reset PW</button>
              </td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>`;
}

function bindUsers(rerender) {
  document.getElementById('add-manager')?.addEventListener('click', () => {
    showUserForm(null, rerender);
  });

  document.querySelectorAll('.edit-user-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const user = getUsers().find(u => u.id === btn.dataset.id);
      showUserForm(user, rerender);
    });
  });

  document.querySelectorAll('.toggle-user-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const user = getUsers().find(u => u.id === btn.dataset.id);
      const newStatus = user.status === 'active' ? 'inactive' : 'active';
      updateUser(user.id, { status: newStatus });
      showToast(`${user.name} ${newStatus === 'active' ? 'activated' : 'deactivated'}`);
      rerender();
    });
  });

  document.querySelectorAll('.reset-pw-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const user = getUsers().find(u => u.id === btn.dataset.id);
      showConfirm(`Reset password for ${user.name}?`, () => {
        updateUser(user.id, { password: 'manager123' });
        showToast(`Password reset to manager123 for ${user.name}`, 'warning');
      });
    });
  });
}

function showUserForm(user, rerender) {
  const isEdit = !!user;

  showModal({
    title: isEdit ? 'Edit Manager' : 'Add Manager',
    body: `
      <form id="user-form">
        <div class="form-group">
          <label>Name</label>
          <input type="text" class="form-control" id="user-name" value="${user?.name || ''}" required>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label>Email</label>
            <input type="email" class="form-control" id="user-email" value="${user?.email || ''}" required>
          </div>
          <div class="form-group">
            <label>Phone</label>
            <input type="tel" class="form-control" id="user-phone" value="${user?.phone || ''}">
          </div>
        </div>
        ${!isEdit ? `
          <div class="form-group">
            <label>Password</label>
            <input type="password" class="form-control" id="user-password" value="manager123">
          </div>
        ` : ''}
        <div class="form-group">
          <label>Status</label>
          <select class="form-control" id="user-status">
            <option value="active" ${user?.status === 'active' ? 'selected' : ''}>Active</option>
            <option value="inactive" ${user?.status === 'inactive' ? 'selected' : ''}>Inactive</option>
          </select>
        </div>
      </form>`,
    footer: `
      <button class="btn btn-secondary" id="modal-cancel">Cancel</button>
      <button class="btn btn-primary" id="save-user">${isEdit ? 'Update' : 'Add'} Manager</button>`
  });

  document.getElementById('save-user')?.addEventListener('click', () => {
    const data = {
      name: document.getElementById('user-name').value.trim(),
      email: document.getElementById('user-email').value.trim(),
      phone: document.getElementById('user-phone').value.trim(),
      role: 'manager',
      status: document.getElementById('user-status').value
    };

    if (!data.name || !data.email) {
      showToast('Please fill in required fields', 'warning');
      return;
    }

    if (isEdit) {
      updateUser(user.id, data);
      showToast(`${data.name} updated`);
    } else {
      addUser({ ...data, password: document.getElementById('user-password').value || 'manager123' });
      showToast(`${data.name} added as manager`);
    }

    document.getElementById('modal-root').innerHTML = '';
    rerender();
  });
}

// --- js\pages\settings.js ---
// Restaurant Settings page (Admin only)




function renderSettings() {
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

function bindSettings() {
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

// --- js\pages\inventory.js ---
// Inventory placeholder page




function renderInventory() {
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

function bindInventory() {
  // Placeholder – no interactions yet
}

// --- js\router.js ---
// Client-side router
















const ROUTES = {
  '/login': { title: 'Login', public: true },
  '/dashboard': { title: 'Dashboard', subtitle: 'Overview of your restaurant operations' },
  '/new-order': { title: 'New Order', subtitle: 'Create a new customer order' },
  '/orders': { title: 'Order History', subtitle: 'View and manage all orders' },
  '/menu': { title: 'Menu Management', subtitle: 'Manage your restaurant menu' },
  '/analytics': { title: 'Analytics', subtitle: 'Sales and performance insights' },
  '/reports': { title: 'Reports & Downloads', subtitle: 'Generate and download reports' },
  '/users': { title: 'User Management', subtitle: 'Manage managers and staff', adminOnly: true },
  '/settings': { title: 'Restaurant Settings', subtitle: 'Configure restaurant details', adminOnly: true },
  '/inventory': { title: 'Inventory', subtitle: 'Stock and ingredient tracking', adminOnly: true },
};

let currentRoute = '/login';

function getRoute() {
  return currentRoute;
}

function initRouter() {
  window.addEventListener('hashchange', () => {
    handleRoute();
  });

  handleRoute();
}

function parseHash() {
  const hash = location.hash.slice(1) || '/dashboard';
  const parts = hash.split('/').filter(Boolean);
  const base = '/' + (parts[0] || 'dashboard');
  const param = parts[1] || null;
  return { route: base, param };
}

function handleRoute() {
  const { route, param } = parseHash();

  if (!ROUTES[route] && !route.startsWith('/orders')) {
    navigate('/dashboard');
    return;
  }

  if (route === '/orders' && param) {
    currentRoute = `/orders/${param}`;
  } else {
    currentRoute = route;
  }

  if (!ROUTES[route]?.public && !isAuthenticated()) {
    navigate('/login');
    return;
  }

  if (ROUTES[route]?.adminOnly && !isAdmin()) {
    navigate('/dashboard');
    return;
  }

  if (route === '/login' && isAuthenticated()) {
    navigate('/dashboard');
    return;
  }

  render();
}

function render() {
  destroyAllCharts();
  const app = document.getElementById('app');

  if (currentRoute === '/login') {
    app.innerHTML = renderLogin();
    bindLogin(navigate);
    return;
  }

  const routeKey = currentRoute.startsWith('/orders/') ? '/orders' : currentRoute;
  const routeConfig = ROUTES[routeKey] || ROUTES['/dashboard'];
  const orderId = currentRoute.startsWith('/orders/') ? currentRoute.split('/')[2] : null;

  let content = '';
  switch (routeKey) {
    case '/dashboard': content = renderDashboard(); break;
    case '/new-order': content = renderNewOrder(); break;
    case '/orders': content = renderOrders(orderId); break;
    case '/menu': content = renderMenu(); break;
    case '/analytics': content = renderAnalytics(); break;
    case '/reports': content = renderReports(); break;
    case '/users': content = renderUsers(); break;
    case '/settings': content = renderSettings(); break;
    case '/inventory': content = renderInventory(); break;
    default: content = renderDashboard();
  }

  app.innerHTML = renderAppShell(currentRoute, routeConfig.title, routeConfig.subtitle, content);
  bindShellEvents(navigate);
  bindPage(routeKey, orderId);
}

function bindPage(routeKey, orderId) {
  const rerender = () => render();

  switch (routeKey) {
    case '/dashboard': bindDashboard(navigate); break;
    case '/new-order': bindNewOrder(navigate, rerender); break;
    case '/orders': bindOrders(navigate, rerender, orderId); break;
    case '/menu': bindMenu(rerender); break;
    case '/analytics': bindAnalytics(rerender); break;
    case '/reports': bindReports(rerender); break;
    case '/users': bindUsers(rerender); break;
    case '/settings': bindSettings(); break;
    case '/inventory': bindInventory(); break;
  }

  document.querySelectorAll('[data-route]').forEach(el => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      navigate(el.dataset.route);
    });
  });
}

function navigate(route) {
  const target = route.startsWith('#') ? route : '#' + route;
  if (location.hash === target) {
    handleRoute();
  } else {
    location.hash = route;
  }
}

// --- js\app.js ---
// Main application entry point

function boot() {
  const initialRoute = isAuthenticated() ? '/dashboard' : '/login';
  if (!location.hash) {
    location.hash = initialRoute;
  }
  initRouter();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot);
} else {
  boot();
}


})();