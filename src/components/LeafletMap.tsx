import { useEffect, useRef, useMemo } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import type { Place } from "@/components/PlaceCard";

interface LeafletMapProps {
  places: Place[];
  activePlace?: string | null;
  onPlaceClick?: (name: string) => void;
}

const LeafletMap = ({ places, activePlace, onPlaceClick }: LeafletMapProps) => {
  const mapRef = useRef<L.Map | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const markersRef = useRef<Map<string, L.Marker>>(new Map());

  const center = useMemo((): [number, number] => {
    if (places.length === 0) return [40.75, -73.99];
    const avgLat = places.reduce((s, p) => s + p.lat, 0) / places.length;
    const avgLng = places.reduce((s, p) => s + p.lng, 0) / places.length;
    return [avgLat, avgLng];
  }, [places]);

  // Initialize map
  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    const map = L.map(containerRef.current, {
      center,
      zoom: 14,
      scrollWheelZoom: true,
      zoomControl: false,
    });

    L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map);

    L.control.zoom({ position: "topright" }).addTo(map);

    mapRef.current = map;

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);

  // Update markers when places change
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    // Clear old markers
    markersRef.current.forEach((m) => m.remove());
    markersRef.current.clear();

    if (places.length === 0) return;

    places.forEach((place) => {
      const icon = createIcon(false);
      const marker = L.marker([place.lat, place.lng], { icon }).addTo(map);

      marker.bindPopup(`
        <div style="font-family: 'DM Sans', sans-serif; min-width: 140px;">
          <p style="font-weight: 600; margin: 0 0 2px;">${place.name}</p>
          <p style="color: #888; font-size: 12px; margin: 0;">${place.category} · ${place.priceRange}</p>
          <p style="font-size: 12px; margin: 4px 0 0;">⭐ ${place.rating}</p>
        </div>
      `);

      marker.on("click", () => onPlaceClick?.(place.name));
      markersRef.current.set(place.name, marker);
    });

    // Fit bounds
    const bounds = L.latLngBounds(places.map((p) => [p.lat, p.lng] as [number, number]));
    map.fitBounds(bounds, { padding: [50, 50], maxZoom: 15 });
  }, [places, onPlaceClick]);

  // Highlight active marker
  useEffect(() => {
    markersRef.current.forEach((marker, name) => {
      marker.setIcon(createIcon(name === activePlace));
      if (name === activePlace) {
        marker.setZIndexOffset(1000);
      } else {
        marker.setZIndexOffset(0);
      }
    });
  }, [activePlace]);

  return (
    <div className="relative w-full h-72 sm:h-[420px] rounded-2xl overflow-hidden border border-border shadow-card">
      <div ref={containerRef} className="w-full h-full" style={{ background: "hsl(30, 25%, 97%)" }} />
    </div>
  );
};

function createIcon(isActive: boolean) {
  const size = isActive ? 32 : 24;
  return L.divIcon({
    className: "custom-marker",
    html: `<div style="
      width: ${size}px;
      height: ${size}px;
      border-radius: 50% 50% 50% 0;
      background: ${isActive ? "linear-gradient(135deg, hsl(330, 80%, 65%), hsl(280, 70%, 60%))" : "hsl(330, 80%, 65%)"};
      transform: rotate(-45deg);
      border: 2.5px solid white;
      box-shadow: 0 4px 16px rgba(200, 50, 150, 0.3);
      transition: all 0.2s;
    "></div>`,
    iconSize: [size, size],
    iconAnchor: [size / 2, size],
    popupAnchor: [0, -size - 2],
  });
}

export default LeafletMap;
