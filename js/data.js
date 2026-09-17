// Initial mock data for Gurukripa Restaurant Management Prototype

export const CATEGORIES = [
  'Starters',
  'Main Course',
  'Breads',
  'Rice & Biryani',
  'Beverages',
  'Desserts'
];

export const ORDER_STATUSES = ['Pending', 'Confirmed', 'Preparing', 'Ready', 'Completed', 'Cancelled'];

export const STATUS_FLOW = ['Pending', 'Confirmed', 'Preparing', 'Ready', 'Completed'];

export const MENU_ITEMS = [
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

export const USERS = [
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

export const RESTAURANT_SETTINGS = {
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

export const INVENTORY = [
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

export const INITIAL_ORDERS = generateOrders();

export const INITIAL_NOTIFICATIONS = [
  { id: 'n1', title: 'New Order #ORD-20260904-001', message: 'Table 5 – Rahul Mehta', type: 'new', read: false, time: '2026-09-04T09:30:00' },
  { id: 'n2', title: 'Order Ready #ORD-20260904-005', message: 'Table 7 – Karan Joshi', type: 'ready', read: false, time: '2026-09-04T10:15:00' },
  { id: 'n3', title: 'Low Stock Alert', message: 'Tomato – only 8 kg remaining', type: 'stock', read: false, time: '2026-09-04T08:00:00' },
  { id: 'n4', title: 'Order Completed #ORD-20260904-006', message: 'Table 1 – Meera Reddy', type: 'completed', read: true, time: '2026-09-04T10:30:00' },
  { id: 'n5', title: 'Pending Order Alert', message: '2 orders awaiting confirmation', type: 'pending', read: false, time: '2026-09-04T09:45:00' },
];
