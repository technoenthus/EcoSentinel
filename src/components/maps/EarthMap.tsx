import { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Earthquake, AirQualityReading } from '@/hooks/useEnvironmentalData';

// Fix default marker icons
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

export type MapLayer = 'earthquakes' | 'pollution' | 'deforestation' | 'water';

interface EarthMapProps {
  earthquakes?: Earthquake[];
  airQuality?: AirQualityReading[];
  activeLayers: MapLayer[];
  onMarkerClick?: (type: string, data: any) => void;
  className?: string;
}

const EarthMap = ({ 
  earthquakes = [], 
  airQuality = [], 
  activeLayers,
  onMarkerClick,
  className = ''
}: EarthMapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const layerGroupsRef = useRef<{ [key: string]: L.LayerGroup }>({});

  // Initialize map
  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    const map = L.map(mapRef.current, {
      center: [20, 0],
      zoom: 2,
      minZoom: 2,
      maxZoom: 18,
      zoomControl: true,
      attributionControl: true,
    });

    // Dark themed tile layer
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      subdomains: 'abcd',
      maxZoom: 20
    }).addTo(map);

    // Initialize layer groups
    layerGroupsRef.current = {
      earthquakes: L.layerGroup().addTo(map),
      pollution: L.layerGroup().addTo(map),
      deforestation: L.layerGroup().addTo(map),
      water: L.layerGroup().addTo(map),
    };

    mapInstanceRef.current = map;

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // Update earthquake markers
  useEffect(() => {
    const group = layerGroupsRef.current.earthquakes;
    if (!group) return;

    group.clearLayers();

    if (!activeLayers.includes('earthquakes')) return;

    earthquakes.forEach((eq) => {
      const [lon, lat] = eq.coordinates;
      
      // Size based on magnitude
      const radius = Math.max(5, eq.magnitude * 3);
      
      // Color based on magnitude
      let color = '#22c55e'; // green
      if (eq.magnitude >= 6) color = '#ef4444'; // red
      else if (eq.magnitude >= 5) color = '#f97316'; // orange
      else if (eq.magnitude >= 4) color = '#eab308'; // yellow

      const circle = L.circleMarker([lat, lon], {
        radius,
        fillColor: color,
        fillOpacity: 0.7,
        color: color,
        weight: 2,
        opacity: 1,
      });

      circle.bindPopup(`
        <div class="p-2">
          <h3 class="font-bold text-lg">M${eq.magnitude.toFixed(1)} Earthquake</h3>
          <p class="text-sm">${eq.place || 'Unknown location'}</p>
          <p class="text-xs text-gray-500">Depth: ${eq.coordinates[2]}km</p>
          <p class="text-xs text-gray-500">${new Date(eq.time).toLocaleString()}</p>
          ${eq.tsunami ? '<p class="text-xs text-red-500 font-bold">⚠️ Tsunami Warning</p>' : ''}
        </div>
      `);

      circle.on('click', () => {
        onMarkerClick?.('earthquake', eq);
      });

      group.addLayer(circle);
    });
  }, [earthquakes, activeLayers, onMarkerClick]);

  // Update pollution markers
  useEffect(() => {
    const group = layerGroupsRef.current.pollution;
    if (!group) return;

    group.clearLayers();

    if (!activeLayers.includes('pollution')) return;

    // Group by location to avoid duplicates
    const locationMap = new Map<string, AirQualityReading>();
    airQuality.forEach((reading) => {
      if (reading.parameter === 'pm25') {
        const key = `${reading.coordinates.latitude}-${reading.coordinates.longitude}`;
        if (!locationMap.has(key) || reading.value > (locationMap.get(key)?.value || 0)) {
          locationMap.set(key, reading);
        }
      }
    });

    locationMap.forEach((reading) => {
      const { latitude, longitude } = reading.coordinates;
      
      // Color based on AQI level
      let color = '#22c55e'; // good
      if (reading.value > 150) color = '#7c3aed'; // very unhealthy
      else if (reading.value > 100) color = '#ef4444'; // unhealthy
      else if (reading.value > 50) color = '#f97316'; // moderate
      else if (reading.value > 25) color = '#eab308'; // fair

      const radius = Math.min(15, Math.max(5, reading.value / 10));

      const circle = L.circleMarker([latitude, longitude], {
        radius,
        fillColor: color,
        fillOpacity: 0.6,
        color: color,
        weight: 2,
        opacity: 0.8,
      });

      circle.bindPopup(`
        <div class="p-2">
          <h3 class="font-bold">${reading.location}</h3>
          <p class="text-sm">${reading.city}, ${reading.country}</p>
          <p class="text-lg font-bold" style="color: ${color}">${reading.value.toFixed(1)} ${reading.unit}</p>
          <p class="text-xs text-gray-500">${reading.parameter.toUpperCase()}</p>
          <p class="text-xs text-gray-500">Updated: ${new Date(reading.lastUpdated).toLocaleString()}</p>
        </div>
      `);

      circle.on('click', () => {
        onMarkerClick?.('pollution', reading);
      });

      group.addLayer(circle);
    });
  }, [airQuality, activeLayers, onMarkerClick]);

  // Placeholder layers for deforestation and water (would need real APIs)
  useEffect(() => {
    const defGroup = layerGroupsRef.current.deforestation;
    const waterGroup = layerGroupsRef.current.water;

    if (defGroup) {
      defGroup.clearLayers();
      if (activeLayers.includes('deforestation')) {
        // Sample deforestation hotspots
        const hotspots = [
          { lat: -3.4653, lon: -62.2159, name: 'Amazon Basin', area: '1,200 km²' },
          { lat: 1.5, lon: 110, name: 'Borneo', area: '850 km²' },
          { lat: -6, lon: 22, name: 'Congo Basin', area: '620 km²' },
          { lat: 8, lon: 80, name: 'Southeast Asia', area: '340 km²' },
        ];

        hotspots.forEach((spot) => {
          const circle = L.circle([spot.lat, spot.lon], {
            radius: 200000,
            fillColor: '#22c55e',
            fillOpacity: 0.3,
            color: '#22c55e',
            weight: 2,
          });

          circle.bindPopup(`
            <div class="p-2">
              <h3 class="font-bold text-green-600">Deforestation Alert</h3>
              <p class="text-sm">${spot.name}</p>
              <p class="text-xs">Affected Area: ${spot.area}</p>
              <p class="text-xs text-gray-500">Data: Global Forest Watch</p>
            </div>
          `);

          defGroup.addLayer(circle);
        });
      }
    }

    if (waterGroup) {
      waterGroup.clearLayers();
      if (activeLayers.includes('water')) {
        // Sample water level indicators
        const waterBodies = [
          { lat: 46, lon: -122, name: 'Lake Tahoe', change: '-2.3m' },
          { lat: 44, lon: 58, name: 'Aral Sea', change: '-15.2m' },
          { lat: 13, lon: 14, name: 'Lake Chad', change: '-8.7m' },
          { lat: -16, lon: 68, name: 'Lake Titicaca', change: '-1.1m' },
        ];

        waterBodies.forEach((body) => {
          const circle = L.circleMarker([body.lat, body.lon], {
            radius: 12,
            fillColor: '#3b82f6',
            fillOpacity: 0.7,
            color: '#1d4ed8',
            weight: 2,
          });

          circle.bindPopup(`
            <div class="p-2">
              <h3 class="font-bold text-blue-600">Water Level Change</h3>
              <p class="text-sm">${body.name}</p>
              <p class="text-lg font-bold text-red-500">${body.change}</p>
              <p class="text-xs text-gray-500">vs. 2020 baseline</p>
            </div>
          `);

          waterGroup.addLayer(circle);
        });
      }
    }
  }, [activeLayers]);

  return (
    <div 
      ref={mapRef} 
      className={`w-full h-full rounded-xl overflow-hidden ${className}`}
      style={{ minHeight: '400px' }}
    />
  );
};

export default EarthMap;
