export const seasons = ['Fall', 'Summer', 'Rain', 'Winter', 'Spring'];

export function EcoScenery({ season }) {
  const particles = { Fall: 19, Summer: 0, Rain: 28, Winter: 22, Spring: 16 }[season];
  return <div className="eco-scenery" aria-hidden="true">
    {(season === 'Summer' || season === 'Spring') && <span className="sun-glow" />}
    {Array.from({ length: particles }, (_, index) => <i key={index} style={{ '--x': `${(index * 37 + 9) % 100}%`, '--delay': `${-(index * 1.57)}s`, '--speed': `${7 + index % 6}s`, '--size': `${5 + index % 8}px` }} />)}
  </div>;
}
