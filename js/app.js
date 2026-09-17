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
