# Gurukripa Restaurant Management – Prototype

A complete HTML/CSS/JavaScript clickable mockup for a Restaurant Management Application. This prototype demonstrates the full user journey with realistic mock data and localStorage persistence.

## Quick Start

1. Open `prototype/index.html` in a modern browser (Chrome, Firefox, Edge)
2. Or serve locally:

```bash
cd prototype
python -m http.server 8080
```

Then visit: http://localhost:8080

## Demo Credentials

| Role    | Email                    | Password    |
|---------|--------------------------|-------------|
| Admin   | admin@restaurant.com     | admin123    |
| Manager | manager@restaurant.com   | manager123  |

## Features

- **Login** – Role-based authentication with remember me & forgot password (simulated)
- **Dashboard** – KPI cards, interactive charts, recent orders, quick actions
- **New Order (POS)** – Category filters, add/remove items, quantity controls, GST calculation
- **Order History** – Search, filters, date shortcuts, status updates, PDF download
- **Order Details** – Full order info, item breakdown, status timeline
- **Menu Management** – CRUD operations (Admin), search & category filters
- **Analytics** – Daily/Weekly/Monthly/Yearly views with charts
- **Reports** – Multiple report types with preview and PDF download
- **User Management** – Add/edit managers, activate/deactivate, reset password (Admin)
- **Restaurant Settings** – Restaurant info, GST %, order settings (Admin)
- **Inventory** – Placeholder with low-stock alerts (Admin)
- **Notifications** – Notification center with unread badges

## Navigation

### Manager
Dashboard → New Order → Orders → Menu → Analytics → Reports

### Admin
All Manager screens + Users → Settings → Inventory

## Data Persistence

All data is stored in `localStorage` and persists across browser sessions. Use **Reset All Prototype Data** in Settings to restore defaults.

## Future Backend

This prototype is structured for easy integration with:
- **Frontend** → Django REST APIs → MongoDB
- Collections: users, menu_items, categories, orders, order_items, order_status_history, restaurant_settings, reports

## Tech Stack

- Vanilla HTML/CSS/JavaScript (ES Modules)
- Chart.js for analytics charts
- localStorage for state management
- Hash-based routing (SPA)
