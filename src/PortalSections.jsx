import { useEffect, useRef, useState } from 'react';
import { serviceResearch } from './serviceResearch.js';

export const serviceCatalog = [
  {
    name: 'Tree Trimming',
    slug: 'tree-trimming',
    summary: 'Prune damaged limbs and improve clearance while keeping the tree’s canopy.',
    scope: 'An arborist can look for deadwood, cracks, and weak limbs, then recommend cuts that suit the tree’s structure and condition.',
    prepare: 'Point out the limbs of concern and what they overhang, such as a roof, driveway, or walkway.',
  },
  {
    name: 'Stump Grinding',
    slug: 'stump-grinding',
    summary: 'Grind stumps below grade to reclaim space for mowing or landscaping.',
    scope: 'A grinder can address a single stump or several. Discuss how deep to grind and whether chips should be hauled away or left on site.',
    prepare: 'Share the stump count, approximate diameters, and how the grinder can reach the area.',
  },
  {
    name: 'Tree Removal',
    slug: 'tree-removal',
    summary: 'Remove a dead, damaged, or unwanted tree with a plan tailored to the site.',
    scope: 'The crew assesses the tree and the room available to work around nearby structures. Ask for the estimate to specify hauling and stump grinding if you need them.',
    prepare: 'Share the tree’s location, nearby buildings or fences, and any limits on equipment access.',
  },
  {
    name: 'No Impact & Crane Removal',
    slug: 'no-impact-and-crane-removal',
    summary: 'Lift tree sections when tight access or nearby structures make removal more complex.',
    scope: 'Depending on the site, the crew may use a crane, track lift, bucket truck, or climbers. A crane can lift sections clear of sensitive areas before lowering them to a staging spot.',
    prepare: 'Share where the tree stands, where equipment could stage, and whether the tree is resting against a structure.',
  },
  {
    name: '24-Hour Emergency Storm Services',
    slug: '24-hour-emergency-storm-services',
    summary: 'Reach dispatch day or night for urgent storm damage and fallen trees.',
    scope: 'Call for urgent assessment and removal. For cleanup that can wait, you can also request an estimate for fallen trees and debris.',
    prepare: 'Give dispatch the address, what the tree struck or blocked, and whether you can see utility lines involved from a safe location.',
    urgent: true,
  },
  {
    name: 'Land Clearing',
    slug: 'land-clearing',
    summary: 'Prepare a lot, building site, or agricultural area by clearing trees and brush.',
    scope: 'Define the area to clear and discuss how to handle stumps, brush, and other obstacles based on how you plan to use the land.',
    prepare: 'Share the approximate acreage, clearing boundaries, and any trees or features you want to preserve.',
  },
  {
    name: 'Debris Removal',
    slug: 'debris-removal',
    summary: 'Clear fallen limbs, brush piles, and tree debris from homes or commercial sites.',
    scope: 'Cleanup can cover storm debris, leftover branches after tree work, or brush from routine property upkeep. Ask what the estimate covers for loading, hauling, and disposal.',
    prepare: 'Describe what needs to go, how much is piled up, and whether a truck can reach it.',
  },
  {
    name: 'Municipal Tree Service',
    slug: 'municipal-tree-service',
    summary: 'Plan pruning and hazard removal along public streets and in shared spaces.',
    scope: 'Municipal projects can include maintaining street-tree canopies and removing dead or hazardous trees along public routes.',
    prepare: 'Identify the site, the responsible department, and any work hours or public access restrictions.',
  },
  {
    name: 'Right-of-Way Clearing',
    slug: 'right-of-way-clearing',
    summary: 'Manage vegetation along utility corridors to maintain clearance and access.',
    scope: 'Define the corridor and coordinate with its owner to identify where trees and brush need pruning or clearing.',
    prepare: 'Provide the route or corridor limits, access points, and the utility or property contact.',
  },
  {
    name: 'High-Traffic Tree Service',
    slug: 'high-traffic-capable',
    summary: 'Plan tree work around busy roads, businesses, and entrances that need to stay accessible.',
    scope: 'Work planning accounts for motorists, workers, and access for nearby residents or businesses. Discuss staging and timing before the job is scheduled.',
    prepare: 'Flag peak traffic hours, entrances that need to stay open, and any required coordination with the road or site owner.',
  },
];

const questions = [
  ['What should I do after a tree falls?', 'Stay clear of the tree and any downed lines. For immediate danger call 911. Report downed lines to the utility. Call tree dispatch once you are in a safe place.'],
  ['Do I need a permit?', 'Check with your city or county before work starts. Requirements can depend on where the tree stands and whether it is on public property or in a right-of-way.'],
  ['Does the estimate include cleanup?', 'Ask whether cutting, hauling, chip removal, and site cleanup are included in your written scope.'],
  ['Is stump grinding included in tree removal?', 'Ask to include stump grinding in the estimate. Confirm the grinding depth and what happens to the chips before work starts.'],
  ['What photos help with an estimate?', 'From a safe location, photograph the whole tree, nearby structures, and the crew’s potential access route. A site visit may still be needed.'],
];

const articleDate = new Intl.DateTimeFormat('en-US', { dateStyle: 'medium', timeZone: 'UTC' });

export function Services({ requestService, emergency }) {
  const [selected, setSelected] = useState(null);
  const dialog = useRef(null);
  const scrollArea = useRef(null);
  const opener = useRef(null);
  const research = selected && serviceResearch[selected.slug];

  useEffect(() => {
    if (!selected) return;
    if (!dialog.current.open) dialog.current.showModal();
    scrollArea.current.scrollTop = 0;
  }, [selected]);

  return <section id="services" className="shell page-section info-page services-page">
    <p className="eyebrow"><span aria-hidden="true" /> Tree and land services</p>
    <h2>Find the right service</h2>
    <div className="service-grid">
      {serviceCatalog.map((service) => <article className="service-card service-guide" key={service.slug}>
        <h3>{service.name}</h3>
        <p>{service.summary}</p>
        <button type="button" className="service-open" aria-haspopup="dialog" aria-label={`Explore ${service.name}`} onClick={(event) => {
          opener.current = event.currentTarget;
          setSelected(service);
        }}>Explore service <span aria-hidden="true">↗</span></button>
      </article>)}
    </div>
    <dialog className="service-dialog" ref={dialog} aria-labelledby="service-dialog-title" onClose={() => {
      setSelected(null);
      opener.current?.focus({ preventScroll: true });
    }}>
      {selected && <>
        <header className="service-dialog-header">
          <h2 id="service-dialog-title">{selected.name}</h2>
          <button className="button secondary" type="button" autoFocus onClick={() => dialog.current.close()}>Close</button>
        </header>
        <div className="service-dialog-content" ref={scrollArea}>
          <p className="service-dialog-intro">{selected.scope}</p>
          {research.sections.map(([title, body]) => <section className="service-topic" key={title}><h3>{title}</h3><p>{body}</p></section>)}
          <section className="service-topic service-prepare">
            <h3>{selected.urgent ? 'What to tell dispatch' : 'What to share for an estimate'}</h3>
            <p>{selected.prepare}</p>
            <div className="actions">
              {selected.urgent && <a className="button primary" href={emergency.href}>Call storm dispatch {emergency.label}</a>}
              <a className={`button ${selected.urgent ? 'secondary' : 'primary'}`} href="#estimator" onClick={() => {
                opener.current = null;
                requestService(selected.name);
                dialog.current.close();
              }}>{selected.urgent ? 'Request cleanup estimate ↗' : 'Request this service ↗'}</a>
            </div>
          </section>
          {research.photos && <section className="service-topic">
            <h3>From the project gallery</h3>
            <div className="service-photos">{research.photos.map(({ src, caption }) => <figure key={src}>
              <img src={src} alt={caption} loading="lazy" decoding="async" /><figcaption>{caption}</figcaption>
            </figure>)}</div>
          </section>}
          <section className="service-topic">
            <h3>Related articles and local reporting</h3>
            <div className="service-articles">{research.articles.map(({ type, publisher, date, title, description, url }) => <article className="service-article" key={url}>
              <p className="service-article-type">{type}</p>
              <h4>{title}</h4>
              <p>{description}</p>
              <p className="service-article-source">{publisher}{date && <> · <time dateTime={date}>{articleDate.format(new Date(date))}</time></>}</p>
              <a href={url} target="_blank" rel="noopener noreferrer" aria-label={`Read ${title} at ${publisher} (opens in a new tab)`}>Read at publisher ↗</a>
            </article>)}</div>
          </section>
          <a className="service-reference" href={`https://www.byebyetree.com/${selected.slug}`} target="_blank" rel="noopener noreferrer">Original service reference ↗</a>
        </div>
      </>}
    </dialog>
  </section>;
}

export function Claims({ office, emergency }) {
  return <section id="insurance" className="shell page-section info-page">
    <h2>Insurance claims</h2>
    <p>Call storm dispatch for urgent tree work. For an insurance claim, contact your carrier to confirm what your policy covers and what the adjuster needs.</p>
    <div className="actions"><a className="button primary" href={emergency.href}>Call dispatch {emergency.label}</a><a className="button secondary" href={office.href}>Call the office {office.label}</a></div>
    <div className="info-card claim-steps">
      <h3>After storm damage</h3>
      <ol><li>From a safe location, photograph the damage and record the date and affected structures.</li><li>Open a claim with your carrier. Ask what documentation and approvals it needs before work begins.</li><li>Ask ATS for a written scope or estimate, photos, and proof of insurance as needed. Keep receipts and share documentation with your adjuster.</li></ol>
      <p>Coverage, deductibles, and claim approval are decided by your insurer.</p>
      <div className="trust-badges"><span>Licensed &amp; insured</span><span>ISA-certified arborist</span></div>
      <div className="actions"><a className="button secondary" href="https://www.statefarm.com/claims">State Farm claims ↗</a><a className="button secondary" href="https://www.allstate.com/claims">Allstate claims ↗</a><a className="button secondary" href="https://www.libertymutual.com/claims-center">Liberty Mutual claims ↗</a></div>
      <p className="portal-source"><a href="https://www.byebyetree.com/insurance-claims-welcome">Read the ATS claims guide ↗</a></p>
    </div>
  </section>;
}

export function Faqs() {
  return <section id="faqs" className="shell page-section info-page"><h2>Frequently asked questions</h2>
    <div className="faq-list">{questions.map(([question, answer]) => <details className="service-card" key={question}><summary>{question}</summary><p>{answer}</p></details>)}</div>
    <a className="button secondary" href="https://www.byebyetree.com/faqs">More FAQs from ATS ↗</a>
  </section>;
}
