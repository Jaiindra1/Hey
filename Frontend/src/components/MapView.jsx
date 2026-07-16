import { useEffect, useRef, useState } from "react";
import { AlertTriangle, MapPin, Navigation } from "lucide-react";

const MAP_POSITIONS = [
  { left: "22%", top: "27%" },
  { left: "65%", top: "22%" },
  { left: "74%", top: "62%" },
  { left: "35%", top: "69%" },
];

function coordinatesFor(city) {
  const latitude = Number.parseFloat(city.lat);
  const longitude = Number.parseFloat(city.lng);
  return Number.isFinite(latitude) && Number.isFinite(longitude) ? { lat: latitude, lng: longitude } : null;
}

function loadMaps(key) {
  if (window.google?.maps) return Promise.resolve(window.google.maps);

  return new Promise((resolve, reject) => {
    const existing = document.querySelector("script[data-google-maps]");
    if (existing) {
      existing.addEventListener("load", () => window.google?.maps ? resolve(window.google.maps) : reject(new Error("Google Maps did not initialize.")), { once: true });
      existing.addEventListener("error", () => reject(new Error("Google Maps could not be loaded.")), { once: true });
      return;
    }

    const script = document.createElement("script");
    script.dataset.googleMaps = "true";
    script.src = `https://maps.googleapis.com/maps/api/js?key=${encodeURIComponent(key)}`;
    script.async = true;
    script.onload = () => window.google?.maps ? resolve(window.google.maps) : reject(new Error("Google Maps did not initialize."));
    script.onerror = () => reject(new Error("Google Maps could not be loaded."));
    document.head.append(script);
  });
}

function TrafficMapFallback({ city }) {
  return <div className="map-grid relative h-[55vh] min-h-85 overflow-hidden bg-[#e8f1f7]" aria-label={`Traffic overview for ${city.name}`}>
    <svg className="map-roads absolute inset-0 h-full w-full" viewBox="0 0 1000 600" preserveAspectRatio="none" aria-hidden="true">
      <path d="M-60 465 C160 410 215 500 390 386 S675 172 1060 220" />
      <path d="M30 75 C230 135 345 80 496 192 S715 453 960 560" />
      <path d="M205 -30 C310 178 370 285 280 650" />
      <path d="M710 -30 C635 190 680 342 825 650" />
    </svg>
    <svg className="traffic-lines absolute inset-0 h-full w-full" viewBox="0 0 1000 600" preserveAspectRatio="none" aria-hidden="true">
      <path d="M-60 465 C160 410 215 500 390 386 S675 172 1060 220" />
      <path d="M30 75 C230 135 345 80 496 192 S715 453 960 560" className="traffic-warning" />
      <path d="M205 -30 C310 178 370 285 280 650" />
    </svg>
    <div className="absolute left-5 top-5 rounded-lg border border-white/70 bg-white/90 px-3 py-2 shadow-sm">
      <p className="text-xs font-bold text-on-surface">City traffic overview</p>
      <p className="mt-0.5 text-[11px] text-on-surface-variant">Sample network data</p>
    </div>
    {city.zones.map((zone, index) => {
      const position = MAP_POSITIONS[index % MAP_POSITIONS.length];
      const incident = zone.status === "busy";
      return <div key={zone.name} className="absolute -translate-x-1/2 -translate-y-1/2" style={position}>
        <div className={`map-marker ${incident ? "incident" : "flow"}`}><MapPin size={15} fill="currentColor" /></div>
        <div className="mt-2 max-w-32 rounded-md bg-white/95 px-2 py-1 text-center text-[11px] font-bold text-on-surface shadow-sm">{zone.name}</div>
      </div>;
    })}
    <div className="absolute bottom-5 left-5 flex items-center gap-2 rounded-lg border border-white/70 bg-white/90 px-3 py-2 text-xs text-on-surface shadow-sm"><Navigation size={14} className="text-secondary" />{city.flowIndex}% network flow</div>
    <div className="absolute bottom-5 right-5 flex items-center gap-2 rounded-lg border border-white/70 bg-white/90 px-3 py-2 text-xs text-on-surface shadow-sm"><AlertTriangle size={14} className="text-tertiary" />Busy corridors highlighted</div>
  </div>;
}

export default function MapView({ city }) {
  const mapElement = useRef(null);
  const [mapError, setMapError] = useState("");
  const key = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  const coordinates = coordinatesFor(city);

  useEffect(() => {
    if (!key || !coordinates || !mapElement.current) return undefined;
    let disposed = false;
    let map;

    loadMaps(key)
      .then((maps) => {
        if (disposed || !mapElement.current) return;
        map = new maps.Map(mapElement.current, { center: coordinates, zoom: 12, mapTypeControl: false, streetViewControl: false, fullscreenControl: true });
        new maps.TrafficLayer().setMap(map);
        new maps.Marker({ map, position: coordinates, title: city.name });
      })
      .catch((error) => !disposed && setMapError(error.message));

    return () => { disposed = true; };
  }, [city.name, coordinates?.lat, coordinates?.lng, key]);

  const showLiveMap = Boolean(key && coordinates && !mapError);
  return <section className="glass-card overflow-hidden rounded-lg">
    <div className="p-5 sm:p-6 flex gap-3 items-start"><MapPin className="text-primary shrink-0" /><div><h3 className="font-bold">{city.name} traffic map</h3><p className="mt-1 text-sm text-on-surface-variant">{showLiveMap ? "Live road conditions from Google Maps." : "Traffic conditions across monitored city zones."}</p></div></div>
    {showLiveMap ? <div ref={mapElement} className="h-[55vh] min-h-85 w-full" aria-label={`Live traffic map for ${city.name}`} /> : <TrafficMapFallback city={city} />}
    {mapError && <p className="border-t border-outline-variant px-5 py-3 text-sm text-on-surface-variant">Live map unavailable. Showing the network overview instead.</p>}
  </section>;
}
