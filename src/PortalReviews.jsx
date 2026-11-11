import { useRef, useState } from 'react';
import { loadMaps } from './ServiceCoverage.jsx';

const placeId = import.meta.env.VITE_GOOGLE_PLACE_ID;
const reviewsEnabled = Boolean(placeId && import.meta.env.VITE_GOOGLE_MAPS_API_KEY);
const gallery = Object.entries(import.meta.glob('../img_ref/Gallery_ATS/*.{jpg,jpeg,webp,png}', { eager: true, query: '?url', import: 'default' }))
  .sort(([a], [b]) => a.localeCompare(b, undefined, { numeric: true }))
  .map(([path, url], index) => {
    const filename = path.split('/').pop();
    const match = filename.match(/^(\d+)-(before|after)/i);
    return { url, label: match ? `Project ${Number(match[1])} · ${match[2]}` : `Tree service gallery photo ${index + 1}` };
  });

function Gallery() {
  const [selected, setSelected] = useState(0);
  const dialog = useRef(null);
  const cards = useRef(null);
  const current = gallery[selected];
  function advance(offset) { setSelected((index) => (index + offset + gallery.length) % gallery.length); }

  return (
    <section className="gallery" aria-labelledby="gallery-title">
      <div className="gallery-heading"><h3 id="gallery-title">Project gallery</h3><span>{gallery.length} photos</span></div>
      <div className="gallery-controls">
        <button type="button" className="button secondary" onClick={() => cards.current.scrollBy({ left: -350 })}>← Earlier photos</button>
        <button type="button" className="button secondary" onClick={() => cards.current.scrollBy({ left: 350 })}>More photos →</button>
      </div>
      <div className="gallery-stack" ref={cards}>
        {gallery.map(({ url, label }, index) => <button className="gallery-card" type="button" key={url} onClick={() => { setSelected(index); dialog.current.showModal(); }}>
          <img src={url} alt="" loading="lazy" decoding="async" /><span>{label}</span>
        </button>)}
      </div>
      <dialog ref={dialog} className="gallery-dialog" aria-label="Project photo" onKeyDown={(event) => {
        if (event.key === 'ArrowLeft') advance(-1);
        if (event.key === 'ArrowRight') advance(1);
      }}>
        <button className="button secondary" type="button" autoFocus onClick={() => dialog.current.close()}>Close photo</button>
        <img src={current.url} alt={current.label} />
        <div className="gallery-controls">
          <button type="button" className="button secondary" onClick={() => advance(-1)}>← Previous</button>
          <span aria-live="polite">{current.label} · {selected + 1} / {gallery.length}</span>
          <button type="button" className="button secondary" onClick={() => advance(1)}>Next →</button>
        </div>
      </dialog>
    </section>
  );
}

export default function PortalReviews() {
  const [place, setPlace] = useState(null);
  const [status, setStatus] = useState('');
  const [filter, setFilter] = useState('recent');
  const reviews = (place?.reviews ?? []).filter((review) => filter !== 'five' || review.rating === 5)
    .sort((a, b) => (b.publishTime?.getTime() ?? 0) - (a.publishTime?.getTime() ?? 0));

  async function getReviews() {
    setStatus('Loading Google reviews…');
    try {
      const maps = await loadMaps();
      const { Place } = await maps.importLibrary('places');
      const business = new Place({ id: placeId });
      await business.fetchFields({ fields: ['reviews', 'googleMapsURI'] });
      setPlace(business);
      setStatus('');
    } catch {
      setStatus('Google reviews are unavailable. You can still open the published reviews below.');
    }
  }

  return (
    <section id="testimonials" className="shell page-section info-page reviews-page">
      <h2>Testimonials &amp; reviews</h2>
      <div className="info-card">
        <h3>Customer reviews</h3>
        {reviewsEnabled && !place && <button type="button" className="button primary" onClick={getReviews} disabled={status.startsWith('Loading')}>Load Google reviews</button>}
        {status && <p role="status">{status}</p>}
        {!place && <div className="review-grid"><article>
          <p>“They did an excellent job removing a tree for me”</p>
          <p>Lynda Hill · Facebook review excerpt published by ATS</p>
          <a href="https://www.byebyetree.com/no-impact-and-crane-removal">Read the published testimonial ↗</a>
        </article></div>}
        {place && <>
          <label className="field review-filter">Google Maps reviews
            <select value={filter} onChange={(event) => setFilter(event.target.value)}><option value="recent">Most recent shown</option><option value="five">5-star only</option></select>
          </label>
          <div className="review-grid">{reviews.map((review, index) => <article key={review.googleMapsURI ?? index}>
            <strong>{review.rating ? `${review.rating} / 5 ★` : 'Google Maps review'}</strong>
            <p>{review.text}</p>
            <p>{review.authorAttribution?.uri ? <a href={review.authorAttribution.uri}>{review.authorAttribution.displayName}</a> : review.authorAttribution?.displayName} {review.relativePublishTimeDescription && `· ${review.relativePublishTimeDescription}`}</p>
            <a href={review.googleMapsURI ?? place.googleMapsURI}>Read on Google Maps ↗</a>
          </article>)}</div>
          {!reviews.length && <p>No reviews match this selection.</p>}
          {place.attributions?.map(({ provider, providerURI }) => <a key={provider} href={providerURI}>{provider}</a>)}
        </>}
        <div className="actions">
          <a className="button secondary" href="https://www.byebyetree.com/reviews">Company reviews ↗</a>
          <a className="button secondary" href={place?.googleMapsURI ?? 'https://www.google.com/maps/search/?api=1&query=Affordable+Tree+Service+Inc+Muscle+Shoals+AL'}>Google Maps listing ↗</a>
        </div>
      </div>
      <Gallery />
    </section>
  );
}
