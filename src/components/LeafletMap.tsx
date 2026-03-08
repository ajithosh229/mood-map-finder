import { useEffect, useMemo } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import type { Place } from "@/components/PlaceCard";
import { Star } from "lucide-react";

// Custom marker icon using primary color
const createIcon = (isActive: boolean) =>
  L.divIcon({
    className: "custom-marker",
    html: `<div style="
      width: ${isActive ? "32px" : "26px"};
      height: ${isActive ? "32px" : "26px"};
      border-radius: 50% 50% 50% 0;
      background: ${isActive ? "linear-gradient(135deg, hsl(12, 76%, 61%), hsl(28, 88%, 52%))" : "hsl(12, 76%, 61%)"};
      transform: rotate(-45deg);
      border: 2px solid white;
      box-shadow: 0 4px 12px rgba(0,0,0,0.2);
      transition: all 0.2s;
    "></div>`,
    iconSize: [isActive ? 32 : 26, isActive ? 32 : 26],
    iconAnchor: [isActive ? 16 : 13, isActive ? 32 : 26],
    popupAnchor: [0, isActive ? -34 : -28],
  });

interface FitBoundsProps {
  places: Place[];
}

const FitBounds = ({ places }: FitBoundsProps) => {
  const map = useMap();

  useEffect(() => {
    if (places.length === 0) return;
    const bounds = L.latLngBounds(places.map((p) => [p.lat, p.lng]));
    map.fitBounds(bounds, { padding: [50, 50], maxZoom: 15 });
  }, [places, map]);

  return null;
};

interface LeafletMapProps {
  places: Place[];
  activePlace?: string | null;
  onPlaceClick?: (name: string) => void;
}

const LeafletMap = ({ places, activePlace, onPlaceClick }: LeafletMapProps) => {
  const center = useMemo(() => {
    if (places.length === 0) return [40.75, -73.99] as [number, number];
    const avgLat = places.reduce((s, p) => s + p.lat, 0) / places.length;
    const avgLng = places.reduce((s, p) => s + p.lng, 0) / places.length;
    return [avgLat, avgLng] as [number, number];
  }, [places]);

  return (
    <div className="relative w-full h-72 sm:h-[420px] rounded-2xl overflow-hidden border border-border shadow-card">
      <MapContainer
        center={center}
        zoom={14}
        scrollWheelZoom={true}
        className="w-full h-full z-0"
        style={{ background: "hsl(30, 25%, 97%)" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        />
        <FitBounds places={places} />
        {places.map((place) => (
          <Marker
            key={place.name}
            position={[place.lat, place.lng]}
            icon={createIcon(activePlace === place.name)}
            eventHandlers={{
              click: () => onPlaceClick?.(place.name),
            }}
          >
            <Popup>
              <div className="font-body text-sm min-w-[140px]">
                <p className="font-semibold text-foreground">{place.name}</p>
                <p className="text-muted-foreground text-xs">{place.category} · {place.priceRange}</p>
                <div className="flex items-center gap-1 mt-1">
                  <Star className="w-3 h-3 text-primary fill-primary" />
                  <span className="text-xs font-medium">{place.rating}</span>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default LeafletMap;
