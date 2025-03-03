// src/utils/iconUtils.js
import L from 'leaflet';

export const createCustomIcon = (count) => {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#1e40af" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
      <circle cx="12" cy="10" r="3"></circle>
      ${count > 1 ? `<text x="12" y="10" text-anchor="middle" dy=".3em" fill="white" font-size="8" font-family="Arial">${count}</text>` : ''}
    </svg>
  `;

  return L.divIcon({
    html: svg,
    className: 'custom-marker',
    iconSize: [24, 24],
    iconAnchor: [12, 24],
    popupAnchor: [0, -24]
  });
};

export const createClusterIcon = (cluster) => {
  const count = cluster.getChildCount();
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40">
      <circle cx="20" cy="20" r="18" fill="#1e40af" stroke="#ffffff" stroke-width="2"/>
      <text x="20" y="20" text-anchor="middle" dy=".3em" fill="white" font-size="14" font-family="Arial">${count}</text>
    </svg>
  `;

  return L.divIcon({
    html: svg,
    className: 'custom-cluster',
    iconSize: [40, 40],
    iconAnchor: [20, 20]
  });
};