// Client-side router

import { isAuthenticated, isAdmin } from './auth.js';
import { renderAppShell, bindShellEvents } from './components.js';
import { destroyAllCharts } from './charts.js';

import { renderLogin, bindLogin } from './pages/login.js';
import { renderDashboard, bindDashboard } from './pages/dashboard.js';
import { renderNewOrder, bindNewOrder } from './pages/new-order.js';
import { renderOrders, bindOrders } from './pages/orders.js';
import { renderMenu, bindMenu } from './pages/menu.js';
import { renderAnalytics, bindAnalytics } from './pages/analytics.js';
import { renderReports, bindReports } from './pages/reports.js';
import { renderUsers, bindUsers } from './pages/users.js';
import { renderSettings, bindSettings } from './pages/settings.js';
import { renderInventory, bindInventory } from './pages/inventory.js';

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

export function getRoute() {
  return currentRoute;
}

export function initRouter() {
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

export function navigate(route) {
  const target = route.startsWith('#') ? route : '#' + route;
  if (location.hash === target) {
    handleRoute();
  } else {
    location.hash = route;
  }
}
