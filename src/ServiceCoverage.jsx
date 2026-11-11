import { useEffect, useRef, useState } from 'react';

const center = { lat: 34.7448, lng: -87.6675 };
const radiusMiles = 60;
const milesToMeters = 1609.344;
const mapsKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
const serviceMapPaused = true;
let mapsPromise;

export const serviceCities = [
  { name: 'Russellville', lat: 34.5079, lng: -87.7286 },
  { name: 'Muscle Shoals', ...center, listed: true },
  { name: 'Florence', lat: 34.7998, lng: -87.6773, listed: true },
  { name: 'Tuscumbia', lat: 34.7312, lng: -87.7025, listed: true },
  { name: 'Sheffield', lat: 34.7651, lng: -87.6986 },
  { name: 'Killen', lat: 34.8629, lng: -87.5375, listed: true },
  { name: 'Leighton', lat: 34.7009, lng: -87.5297 },
  { name: 'Cherokee', lat: 34.7570, lng: -87.9728, listed: true },
  { name: 'Red Bay', lat: 34.4398, lng: -88.1409 },
  { name: 'Town Creek', lat: 34.6812, lng: -87.4061 },
];

export function loadMaps() {
  if (mapsPromise) return mapsPromise;
  mapsPromise = new Promise((resolve, reject) => {
    const script = document.createElement('script');
    const params = new URLSearchParams({ key: mapsKey, loading: 'async', callback: 'atsMapsReady' });
    const timeout = setTimeout(fail, 12000);

    function finish() {
      clearTimeout(timeout);
      delete window.atsMapsReady;
      delete window.gm_authFailure;
    }

    function fail() {
      finish();
      script.remove();
      reject(new Error('Google Maps did not load'));
    }

    window.atsMapsReady = () => {
      clearTimeout(timeout);
      delete window.atsMapsReady;
      resolve(window.google.maps);
    };
    window.gm_authFailure = () => window.dispatchEvent(new Event('ats-maps-auth-error'));
    script.src = `https://maps.googleapis.com/maps/api/js?${params}`;
    script.async = true;
    script.onerror = fail;
    document.head.append(script);
  });
  return mapsPromise;
}

function RadiusDiagram({ city }) {
  const scale = 2.35;
  const x = 300 + (city.lng - center.lng) * 69 * Math.cos(center.lat * Math.PI / 180) * scale;
  const y = 154 - (city.lat - center.lat) * 69 * scale;
  return (
    <svg className="radius-diagram" viewBox="0 0 600 310" role="img" aria-label={`Approximate 60-mile radius around Muscle Shoals showing ${city.name}`}>
      <defs><pattern id="coverage-grid" width="30" height="30" patternUnits="userSpaceOnUse"><path d="M 30 0 L 0 0 0 30" fill="none" stroke="currentColor" opacity=".16" /></pattern></defs>
      <rect width="600" height="310" fill="url(#coverage-grid)" />
      <circle cx="300" cy="154" r={radiusMiles * scale} fill="currentColor" fillOpacity=".14" stroke="currentColor" strokeDasharray="5 5" />
      <circle cx="300" cy="154" r="3" fill="currentColor" />
      <circle cx={x} cy={y} r="8" fill="currentColor" />
      <text x={x} y={y - 15} textAnchor="middle" fill="currentColor">{city.name}, AL</text>
      <text x="300" y="265" textAnchor="middle" fill="currentColor">60-mile planning radius</text>
    </svg>
  );
}

export default function ServiceCoverage({ office }) {
  const [city, setCity] = useState(serviceCities[1]);
  const [mapState, setMapState] = useState('idle');
  const container = useRef(null);
  const mapRef = useRef(null);

  useEffect(() => {
    const onAuthError = () => setMapState('failed');
    window.addEventListener('ats-maps-auth-error', onAuthError);
    return () => window.removeEventListener('ats-maps-auth-error', onAuthError);
  }, []);

  useEffect(() => {
    if (mapState !== 'loading') return;
    let active = true;
    loadMaps().then(async (maps) => {
      const { Map, Circle } = await maps.importLibrary('maps');
      if (!active) return;
      const map = new Map(container.current, { center, zoom: 8, mapTypeControl: false, streetViewControl: false, gestureHandling: 'cooperative' });
      const circle = new Circle({ map, center, radius: radiusMiles * milesToMeters, strokeColor: '#257744', strokeWeight: 2, fillColor: '#408b58', fillOpacity: 0.2 });
      map.fitBounds(circle.getBounds(), 18);
      mapRef.current = { map, circle, maps };
      setMapState('ready');
    }).catch(() => { if (active) setMapState('failed'); });
    return () => { active = false; };
  }, [mapState]);

  useEffect(() => {
    if (mapState !== 'ready') return;
    const { map, maps } = mapRef.current;
    const label = document.createElement('div');
    label.textContent = `${city.name}, AL`;
    const info = new maps.InfoWindow({ content: label, position: city, disableAutoPan: true });
    info.open({ map, shouldFocus: false });
    return () => info.close();
  }, [city, mapState]);

  return (
    <section className="shell coverage page-section" aria-labelledby="coverage-title">
      <div>
        <p className="eyebrow"><span aria-hidden="true" /> Service area</p>
        <h2 id="coverage-title">Find your community</h2>
        <p>Explore the approximate 60-mile planning radius around Muscle Shoals. Call to confirm availability at your address.</p>
        <label className="field coverage-picker">Alabama community
          <select value={city.name} onChange={(event) => setCity(serviceCities.find((item) => item.name === event.target.value))}>
            {serviceCities.map(({ name }) => <option key={name} value={name}>{name}, AL</option>)}
          </select>
        </label>
        <div className="city-grid" aria-label="Explore communities">
          {serviceCities.map((item) => <button key={item.name} type="button" aria-pressed={city === item} onClick={() => setCity(item)}>{item.name}</button>)}
        </div>
        <p role="status">{city.listed ? `${city.name} is in the published service area.` : `Call to check availability in ${city.name}.`} <a href={office.href}>{office.label}</a></p>
        <a className="button secondary" href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${city.name}, AL`)}`}>Open in Google Maps ↗</a>
      </div>
      <div className="coverage-map" data-enhancements-paused={serviceMapPaused || undefined}>
        {mapState !== 'ready' && <RadiusDiagram city={city} />}
        {(mapState === 'loading' || mapState === 'ready') && <div ref={container} className={`google-map${mapState === 'loading' ? ' map-loading' : ''}`} aria-label="Google Maps service radius" />}
        {!serviceMapPaused && mapsKey && mapState === 'idle' && <button type="button" className="button secondary" onClick={() => setMapState('loading')}>Load Google Maps</button>}
        {serviceMapPaused && <span className="coverage-watermark">Enhancements coming soon</span>}
        {mapState === 'loading' && <p role="status">Loading Google Maps…</p>}
        {mapState === 'failed' && <p role="status">Google Maps is unavailable. The radius diagram is shown above.</p>}
      </div>
    </section>
  );
}
