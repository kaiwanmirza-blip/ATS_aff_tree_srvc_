import { useEffect, useState } from 'react';

const countyCodes = ['ALC033', 'ALC059', 'ALC077', 'ALC079'];
const stormEvent = /hurricane|tropical storm|storm surge|tornado|thunderstorm|flash flood|high wind/i;

export default function StormBanner({ emergency }) {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const controller = new AbortController();
    async function refresh() {
      const signal = AbortSignal.any([controller.signal, AbortSignal.timeout(12000)]);
      const feeds = await Promise.allSettled(countyCodes.map(async (county) => {
        const response = await fetch(`https://api.weather.gov/alerts/active?zone=${county}`, { signal });
        if (!response.ok) throw new Error('Weather feed unavailable');
        const data = await response.json();
        return Array.isArray(data.features) ? data.features : [];
      }));
      if (controller.signal.aborted) return;
      const alerts = feeds.flatMap((feed) => feed.status === 'fulfilled' ? feed.value : []);
      setEvents([...new Set(alerts.map((alert) => alert.properties?.event).filter((event) => stormEvent.test(event)))]);
    }
    refresh();
    const timer = setInterval(refresh, 300000);
    return () => { controller.abort(); clearInterval(timer); };
  }, []);

  return (
    <div className="storm-banner">
      <div className="shell storm-inner">
        <strong>24/7 storm &amp; hurricane dispatch</strong>
        <span aria-live="polite"><a href="https://www.weather.gov/hun/">{events.length ? `NWS alerts: ${events.join(' · ')}` : 'Check NWS alerts'}</a></span>
        <a className="storm-call" href={emergency.href}>Emergency: {emergency.label}</a>
      </div>
    </div>
  );
}
