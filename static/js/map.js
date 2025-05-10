// static/js/map.js

// Initialize Leaflet map
const map = L.map('map', {
    center: [40.4168, -3.7038], // Default to Madrid
    zoom: 13,
    zoomControl: false,         // We'll add custom controls
  });
  
  // Add OpenStreetMap tiles
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors',
  }).addTo(map);
  
  // Add zoom control at bottom right
  L.control.zoom({ position: 'bottomright' }).addTo(map);
  
  // Add scale bar
  L.control.scale({ position: 'bottomleft' }).addTo(map);
  
  // Marker clustering
  const markers = L.markerClusterGroup({
    showCoverageOnHover: false,
    maxClusterRadius: 50,
  });
  map.addLayer(markers);
  
  // Load house data (assumes `houses` global injected by template)
  houses.forEach(h => {
    const marker = L.marker([h.lat, h.lng]);
    marker.bindPopup(`
      <div class="popup-card">
        <h4>${h.title}</h4>
        <a href="/house/${h.id}" class="btn btn-sm">View Details</a>
      </div>
    `);
    markers.addLayer(marker);
  });
  
  // Geolocation: center map on user if allowed
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(pos => {
      const { latitude, longitude } = pos.coords;
      map.setView([latitude, longitude], 13);
      L.circle([latitude, longitude], {
        radius: 500,
        color: '#0074D9',
        fillOpacity: 0.1,
      }).addTo(map).bindPopup('You are here').openPopup();
    });
  }
  