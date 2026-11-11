import { useEffect, useRef, useState } from 'react';
import logo from './assets/ATS-05-mark.jpg';
import heroPhoto from './assets/arborist.jpg';
import { themes } from './themes/siteThemes.js';
import ServiceCoverage, { serviceCities } from './ServiceCoverage.jsx';
import StormBanner from './StormBanner.jsx';
import PortalReviews from './PortalReviews.jsx';
import { Claims, Faqs, Services, serviceCatalog } from './PortalSections.jsx';
import { EcoScenery, seasons } from './PortalScenery.jsx';
import RuggedTree from './RuggedTree.jsx';
import aboutPhoto from '../img_ref/Abt_us_needs_Cleaning.png';

// Company contact and service area: https://www.byebyetree.com/contact
const office = { href: 'tel:+12565777369', label: '(256) 577-7369' };
const emergency = { href: 'tel:+16627408733', label: '(662) 740-8733' };
const cities = serviceCities.filter((city) => city.listed).map((city) => city.name);
const sections = [
  ['home', 'Home'], ['about', 'About Us'], ['services', 'Services'], ['estimator', 'Estimator & Flexible Plans'],
  ['testimonials', 'Testimonials & Reviews'], ['insurance', 'Insurance Claims'], ['faqs', 'FAQs'],
];
const plans = [
  { id: 'one-time', title: 'One-time service', description: 'Request a quote for a single visit or project.' },
  { id: 'monthly', title: 'Monthly maintenance', description: 'Ask the office about recurring visits and monthly billing.' },
  { id: 'annual', title: 'Annual plan', description: 'Save 15% in this estimate comparison. Confirm annual scope and pricing with the office.' },
];
const money = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });
const services = serviceCatalog.map(({ name }) => name);
const photoTypes = { 'image/jpeg': 'jpg', 'image/png': 'png', 'image/webp': 'webp' };
const maxPhotoSize = 10 * 1024 * 1024;
const squareFeetPerAcre = 43_560;
const areaFormat = new Intl.NumberFormat('en-US', { maximumFractionDigits: 2 });
const acreFormat = new Intl.NumberFormat('en-US', { maximumSignificantDigits: 4 });
const hasBackend = Boolean(import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_ANON_KEY);

function getPlotArea(length, width, unit) {
  const sides = [Number(length), Number(width)];
  if (sides.some((side) => !Number.isFinite(side) || side <= 0)) return null;
  const squareFeet = sides[0] * sides[1] * (unit === 'meters' ? 1 / 0.3048 ** 2 : 1);
  if (!Number.isFinite(squareFeet)) return null;
  const formattedFeet = squareFeet < 0.01 ? '<0.01' : areaFormat.format(squareFeet);
  return { feet: `${formattedFeet} sq ft`, acres: acreFormat.format(squareFeet / squareFeetPerAcre) };
}

function PhoneLink({ phone, children, className }) {
  return <a href={phone.href} className={className}>{children ?? phone.label}</a>;
}

function ServiceTicker() {
  const [paused, setPaused] = useState(false);
  return (
    <section className="service-strip" aria-label="Shoals service area">
      <div className="shell strip-inner">
        <span className="strip-title">Serving the Shoals</span>
        <span className="sr-only">{cities.join(', ')} and nearby communities.</span>
        <div className="ticker-window" aria-hidden="true">
          <div className={`ticker-track${paused ? ' is-paused' : ''}`}>
            {[0, 1].map((copy) => (
              <span className="ticker-group" key={copy}>
                {cities.map((city) => <span key={city}>{city}<b>✦</b></span>)}
              </span>
            ))}
          </div>
        </div>
        <button type="button" className="ticker-toggle" onClick={() => setPaused(!paused)}>
          {paused ? 'Play' : 'Pause'}<span className="sr-only"> service area ticker</span>
        </button>
      </div>
    </section>
  );
}

function ServiceAreaSelector() {
  const [area, setArea] = useState('');
  const outsideListedArea = area === 'other';

  return (
    <div className="area-check">
      <label className="field">
        Check your service area
        <select value={area} onChange={(event) => setArea(event.target.value)}>
          <option value="">Choose an Alabama community</option>
          {cities.map((city) => <option key={city} value={city}>{city}, AL</option>)}
          <option value="other">Another Alabama community</option>
        </select>
      </label>
      <div className="area-result" role="status">
        {outsideListedArea && <>Call <PhoneLink phone={office} /> to confirm service for your address.</>}
        {area && !outsideListedArea && <>We serve {area}, Alabama.</>}
      </div>
    </div>
  );
}

function PaymentPlans() {
  const [scope, setScope] = useState(100);
  const [plan, setPlan] = useState(plans[0].id);
  const standard = scope * 5;

  return (
    <section className="plan-picker" aria-labelledby="plans-title">
      <h2 id="plans-title">Compare payment plans</h2>
      <p>Use the sample project scope to compare plans. The office confirms your quote and payment terms.</p>
      <label className="field plan-slider">Sample scope: {scope} units
        <input type="range" min="20" max="500" value={scope} aria-describedby="scope-guide" onChange={(event) => setScope(Number(event.target.value))} />
      </label>
      <details className="scope-guide"><summary>ⓘ What do the units mean?</summary><p id="scope-guide">Units are a way to compare smaller and larger sample jobs. They are separate from square feet, acres, and the number of trees. Use the plot calculator for actual measurements.</p></details>
      {plans.map(({ id, title, description }) => (
        <div className="plan-option" key={id}>
          <button type="button" aria-expanded={plan === id} aria-controls={`plan-${id}`} onClick={() => setPlan(plan === id ? '' : id)}>
            <span>{title}</span><span>{id === 'annual' ? 'Save 15%' : ''} {plan === id ? '−' : '+'}</span>
          </button>
          <div id={`plan-${id}`} className="plan-detail" hidden={plan !== id}>
            <p>{description}</p>
            <output aria-live="polite">{money.format(id === 'annual' ? standard * 0.85 : standard)} sample {id === 'monthly' ? 'monthly total' : 'project total'}</output>
          </div>
        </div>
      ))}
    </section>
  );
}

function EstimateForm({ service, setService }) {
  const [length, setLength] = useState('');
  const [width, setWidth] = useState('');
  const [unit, setUnit] = useState('feet');
  const [photo, setPhoto] = useState(null);
  const [photoUrl, setPhotoUrl] = useState('');
  const [photoError, setPhotoError] = useState('');
  const [status, setStatus] = useState(null);
  const [busy, setBusy] = useState(false);
  const [savedLead, setSavedLead] = useState(null);
  const submitting = useRef(false);
  const formRef = useRef(null);
  const area = getPlotArea(length, width, unit);

  useEffect(() => {
    if (!photo) return;
    const url = URL.createObjectURL(photo);
    setPhotoUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [photo]);

  function choosePhoto(event) {
    const file = event.target.files[0];
    setPhoto(null);
    setPhotoUrl('');
    setPhotoError('');
    if (!file) return;
    if (!Object.hasOwn(photoTypes, file.type) || file.size === 0 || file.size > maxPhotoSize) {
      setPhotoError('Choose a JPEG, PNG, or WebP image no larger than 10 MB.');
      event.target.value = '';
      return;
    }
    setPhoto(file);
  }

  function resetForm() {
    formRef.current.reset();
    setService('');
    setLength('');
    setWidth('');
    setUnit('feet');
    setPhoto(null);
    setPhotoUrl('');
    setPhotoError('');
    setSavedLead(null);
  }

  async function submit(event) {
    event.preventDefault();
    if (submitting.current || photoError) return;
    const data = new FormData(event.currentTarget);
    const name = String(data.get('name') ?? '').trim();
    const phone = String(data.get('phone') ?? '').trim();
    if (!savedLead && (!name || phone.replace(/\D/g, '').length < 7)) {
      setStatus({ error: true, message: 'Enter your name and a valid callback number.' });
      return;
    }
    if (!savedLead && Boolean(length) !== Boolean(width)) {
      setStatus({ error: true, message: 'Enter both plot dimensions or leave both blank.' });
      return;
    }
    if (!hasBackend) {
      setStatus({ message: 'Demo complete. Your details and photo were not sent. Call the office to request an estimate.' });
      return;
    }

    submitting.current = true;
    setBusy(true);
    setStatus(null);
    let leadId = savedLead;
    try {
      const { supabase } = await import('./lib/supabase.js');
      if (!leadId) {
        const id = crypto.randomUUID();
        const { error } = await supabase.from('leads').insert({
          id,
          customer_name: name,
          phone,
          service_type: service,
          plot_size: area ? `${area.feet} (${area.acres} acres)` : null,
        });
        if (error) throw error;
        leadId = id;
        setSavedLead(id);
      }
      if (photo) {
        const path = `${leadId}/${crypto.randomUUID()}.${photoTypes[photo.type]}`;
        const { error } = await supabase.storage.from('lead-photos').upload(path, photo, {
          contentType: photo.type,
          upsert: false,
        });
        if (error) throw error;
      }
      setStatus({ message: photo ? 'Estimate request and photo received.' : 'Estimate request received.' });
      resetForm();
    } catch {
      setStatus({ error: true, message: leadId
        ? 'Your request was received. The photo could not be uploaded. You can retry the photo without sending a second request.'
        : 'We could not send your request. Try again or call the office to request an estimate.' });
    } finally {
      submitting.current = false;
      setBusy(false);
    }
  }

  return (
    <form className="estimate-form" onSubmit={submit} ref={formRef}>
      <fieldset disabled={busy || Boolean(savedLead)}>
        <legend>Project details</legend>
        <label className="field">Service
          <select value={service} onChange={(event) => setService(event.target.value)} required>
            <option value="">Choose a service</option>
            {services.map((item) => <option key={item}>{item}</option>)}
          </select>
        </label>
        <div className="plot">
          <div className="plot-heading">
            <div><h3>Plot size calculator</h3><p>Optional. Enter approximate dimensions.</p></div>
            <label className="field"><span className="sr-only">Dimension unit</span>
              <select value={unit} onChange={(event) => setUnit(event.target.value)}>
                <option value="feet">Feet</option><option value="meters">Meters</option>
              </select>
            </label>
          </div>
          <div className="field-grid">
            <label className="field">Length<input type="number" min="0.01" max="1000000" step="any" inputMode="decimal" placeholder="e.g. 120" value={length} onChange={(event) => setLength(event.target.value)} /></label>
            <label className="field">Width<input type="number" min="0.01" max="1000000" step="any" inputMode="decimal" placeholder="e.g. 80" value={width} onChange={(event) => setWidth(event.target.value)} /></label>
          </div>
          <output className="area" aria-live="polite">{area ? `${area.feet} · ${area.acres} acres` : 'Enter length and width to calculate area.'}</output>
        </div>
      </fieldset>
      <fieldset disabled={busy}>
        <legend>Property photo <small>(optional)</small></legend>
        <label className="field upload">
          <span>Choose a photo <small>JPEG, PNG, or WebP · up to 10 MB</small></span>
          <input type="file" accept="image/jpeg,image/png,image/webp" aria-describedby={photoError ? 'photo-error' : undefined} onChange={choosePhoto} />
        </label>
        {photoError && <p id="photo-error" className="form-error" role="alert">{photoError}</p>}
        {photo && photoUrl && <img className="photo-preview" src={photoUrl} alt="Selected property photo" />}
      </fieldset>
      <fieldset disabled={busy || Boolean(savedLead)}>
        <legend>Contact details</legend>
        <div className="field-grid">
          <label className="field">Name<input name="name" autoComplete="name" required maxLength={200} /></label>
          <label className="field">Phone<input name="phone" type="tel" autoComplete="tel" required minLength={7} maxLength={32} /></label>
        </div>
      </fieldset>
      {!hasBackend && <p className="form-note">Demo mode. This form does not send your information.</p>}
      <button className="button primary submit-button" type="submit" disabled={busy || Boolean(photoError) || (Boolean(savedLead) && !photo)}>
        {busy ? 'Sending…' : savedLead ? 'Retry photo upload' : hasBackend ? 'Send estimate request' : 'Try estimate request'} <span aria-hidden="true">↗</span>
      </button>
      {savedLead && !busy && <button type="button" className="text-button" onClick={() => { resetForm(); setStatus({ message: 'Your estimate request was received without a photo.' }); }}>Finish without photo</button>}
      {status && <p className={status.error ? 'form-error' : 'form-result'} role={status.error ? 'alert' : 'status'}>{status.message}</p>}
    </form>
  );
}

export default function App() {
  const [theme, setTheme] = useState('rugged');
  const [season, setSeason] = useState('Spring');
  const [service, setService] = useState('');
  const [currentSection, setCurrentSection] = useState('home');
  const navigation = useRef(null);
  const active = themes[theme];
  const isEmergency = theme === 'emergency';

  useEffect(() => {
    let frame = 0;
    const updateSection = () => {
      frame = 0;
      const threshold = navigation.current.offsetHeight + 24;
      const atBottom = window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2;
      const visible = sections.filter(([id]) => document.getElementById(id).getBoundingClientRect().top <= threshold);
      setCurrentSection(atBottom ? sections.at(-1)[0] : visible.at(-1)?.[0] ?? 'home');
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(updateSection); };
    const initialAnchor = sections.find(([id]) => `#${id}` === window.location.hash)?.[0];
    if (initialAnchor) document.getElementById(initialAnchor).scrollIntoView({ behavior: 'instant' });
    schedule();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    return () => {
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div className="site portal" data-theme={theme} data-season={theme === 'eco' ? season.toLowerCase() : undefined}>
      <StormBanner emergency={emergency} />
      <header className="site-header">
        <div className="shell header-inner">
          <a className="brand" href="#home">
            <img src={logo} alt="" width="50" height="50" />
            <span>Affordable Tree<br />Service Inc.</span>
          </a>
          <fieldset className="theme-picker">
            <legend className="sr-only">Site theme</legend>
            {Object.entries(themes).map(([id, option]) => (
              <label key={id}>
                <input className="sr-only" type="radio" name="site-theme" value={id} checked={id === theme} onChange={() => setTheme(id)} />
                <span>{option.label}</span>
              </label>
            ))}
          </fieldset>
          <PhoneLink phone={office} className="header-phone" />
        </div>
        {theme === 'eco' && <div className="shell season-picker"><label>Eco-Clean scenery <select value={season} onChange={(event) => setSeason(event.target.value)}>{seasons.map((option) => <option key={option}>{option}</option>)}</select></label></div>}
      </header>
      <div className="section-navigation" ref={navigation}>
        <nav className="shell page-nav" aria-label="Jump to section">
          {sections.map(([id, label]) => <a key={id} href={`#${id}`} aria-current={currentSection === id ? 'location' : undefined}>{label}</a>)}
        </nav>
      </div>
      <div className="portal-journey">
      {theme === 'rugged' && <RuggedTree />}
      <main id="top">
        {theme === 'eco' && <EcoScenery season={season} />}
        <section id="home" className="shell hero" aria-labelledby="hero-title">
          <div className="hero-copy">
            <p className="eyebrow"><span aria-hidden="true" /> Northwest Alabama tree service</p>
            <h1 id="hero-title">{active.title[0]}<br /><em>{active.title[1]}</em></h1>
            <p className="hero-description">{active.description}</p>
            <div className="actions">
              {isEmergency ? <PhoneLink phone={emergency} className="button primary">Call {emergency.label}</PhoneLink> : <a className="button primary" href="#estimator">Request an estimate <span aria-hidden="true">↗</span></a>}
              {isEmergency ? <a className="button secondary" href="#estimator">Request an estimate</a> : <PhoneLink phone={office} className="button secondary">Call {office.label}</PhoneLink>}
              <a className="button secondary" href="#services">Explore services</a>
            </div>
          </div>
          <div className="hero-visual">
            <img src={heroPhoto} alt="Arborist climbing a mature oak" width="1536" height="1024" fetchPriority="high" />
            <p className="image-caption"><span aria-hidden="true" />{active.caption}</p>
          </div>
        </section>
        <ServiceTicker />
        <ServiceCoverage office={office} />
        <section id="about" className="shell page-section info-page about-section">
          <div className="about-layout">
            <div className="about-copy">
              <p className="eyebrow"><span aria-hidden="true" /> About us</p>
              <h2>Tree care across Northwest Alabama</h2>
              <p>Affordable Tree Service Inc. is family owned and has served Northwest Alabama for more than 20 years. The crew handles residential tree care, difficult removals, storm cleanup, and larger clearing projects.</p>
            </div>
            <figure className="about-photo">
              <img src={aboutPhoto} alt="The Affordable Tree Service family gathered in front of a brick building" width="1080" height="664" loading="lazy" decoding="async" />
            </figure>
          </div>
          <div className="info-card"><h3>Your satisfaction is our motivation</h3><p>ATS is committed to completing each project safely, responsibly, and on time. The crew works with you to understand what needs to be removed and how to protect the surrounding property.</p><a className="about-source" href="https://www.byebyetree.com/about">Read the company’s About page ↗</a></div>
          <div className="info-card"><h3>Equipment matched to the site</h3><p>Skid steers help move brush and debris. Bucket trucks provide aerial access, and cranes can lift sections of a tree when buildings or limited access make conventional removal difficult. The crew evaluates access and nearby structures before choosing an approach.</p></div>
          <div className="trust-badges"><span>Licensed &amp; insured</span><span>ISA-certified arborist</span><span>24/7 emergency service</span></div>
          <a className="button primary" href="#estimator">Request an estimate</a>
        </section>
        <Services requestService={setService} emergency={emergency} />
        <section id="estimator" className="estimate-section">
          <div className="shell estimate-layout">
            <div className="estimate-intro">
              <p className="eyebrow"><span aria-hidden="true" /> Free estimate</p>
              <h2>Tell us about<br />your project.</h2>
              <p>Choose the work you need and share a few details so we can plan a callback.</p>
              <ServiceAreaSelector />
              <div className="contact-links">
                <div><span>Office &amp; estimates</span><PhoneLink phone={office} /></div>
                <div><span>24/7 emergency service</span><PhoneLink phone={emergency} /></div>
              </div>
              <PaymentPlans />
            </div>
            <EstimateForm service={service} setService={setService} />
          </div>
        </section>
        <PortalReviews />
        <Claims office={office} emergency={emergency} />
        <Faqs />
      </main>
      <footer className="site-footer">
        <div className="shell footer-inner"><span>Affordable Tree Service Inc.</span><span>Serving the Shoals and Northwest Alabama</span><PhoneLink phone={office} /></div>
      </footer>
      </div>
    </div>
  );
}
