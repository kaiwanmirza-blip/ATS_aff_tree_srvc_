import { useEffect, useRef } from 'react';
import oakImage from './assets/rugged-oak.png';
import squirrelUp from './assets/squirrel-up.png';
import squirrelDown from './assets/squirrel-down.png';
import './rugged-tree.css';

export default function RuggedTree() {
  const rail = useRef(null);
  const stage = useRef(null);

  useEffect(() => {
    const scene = stage.current;
    const column = rail.current;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (!reducedMotion.matches) {
      const descending = new Image();
      descending.src = squirrelDown;
    }
    let animationFrame = 0;
    let lastScroll = window.scrollY;
    let stride = 0;

    function paint() {
      animationFrame = 0;
      const currentScroll = window.scrollY;
      const delta = currentScroll - lastScroll;
      lastScroll = currentScroll;
      const bounds = column.getBoundingClientRect();
      const start = Math.max(0, currentScroll + bounds.top - scene.clientHeight * 0.25);
      const pageEnd = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const progress = Math.min(1, Math.max(0, (currentScroll - start) / Math.max(1, pageEnd - start)));

      scene.style.setProperty('--oak-progress', progress.toFixed(4));
      if (delta && !reducedMotion.matches) {
        stride = (stride + Math.min(Math.abs(delta), 18)) % 56;
        scene.style.setProperty('--climb-frame', Math.floor(stride / 14));
        scene.dataset.direction = delta > 0 ? 'down' : 'up';
      }
    }

    function schedule() {
      if (!animationFrame) animationFrame = requestAnimationFrame(paint);
    }

    const observer = new ResizeObserver(schedule);
    observer.observe(column);
    window.addEventListener('scroll', schedule, { passive: true });
    paint();
    return () => {
      window.removeEventListener('scroll', schedule);
      observer.disconnect();
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <div className="oak-rail" aria-hidden="true" ref={rail} style={{
      '--oak-image': `url("${oakImage}")`,
      '--squirrel-up': `url("${squirrelUp}")`,
      '--squirrel-down': `url("${squirrelDown}")`,
    }}>
      <div className="oak-stage" ref={stage} data-direction="up">
        <div className="oak-photo" />
        <div className="climbing-squirrel" />
      </div>
    </div>
  );
}
