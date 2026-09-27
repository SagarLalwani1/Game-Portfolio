import { useEffect, useRef, useState } from "react";
import Phaser from "phaser";
import { eras, professional, type Era } from "./content";
import { GameScene, type JourneyEvent } from "./game/GameScene";

type View = "home" | "journey";

export default function App() {
  const gameRef = useRef<HTMLDivElement>(null);
  const [view, setView] = useState<View>("home");
  const [selected, setSelected] = useState<Era | null>(null);
  const [reward, setReward] = useState<Era | null>(null);
  const [visited, setVisited] = useState<string[]>([]);

  useEffect(() => {
    if (view !== "journey" || !gameRef.current) return;
    const game = new Phaser.Game({
      type: Phaser.AUTO,
      parent: gameRef.current,
      width: 1100,
      height: 650,
      backgroundColor: "#080a0f",
      scale: { mode: Phaser.Scale.RESIZE, autoCenter: Phaser.Scale.CENTER_BOTH, width: 1100, height: 650 },
      physics: { default: "arcade", arcade: { debug: false } },
      render: { antialias: false },
      scene: new GameScene((event: JourneyEvent) => {
        if (event.type === "era") setSelected(eras.find((era) => era.id === event.id) ?? null);
        if (event.type === "reward") {
          const era = eras.find((item) => item.id === event.id) ?? null;
          setReward(era);
          setVisited((items) => items.includes(event.id) ? items : [...items, event.id]);
        }
      })
    });
    return () => game.destroy(true);
  }, [view]);

  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <div className="site">
      <header className="nav">
        <button className="brand" onClick={() => { setView("home"); window.scrollTo({ top: 0, behavior: "smooth" }); }}>
          SAGAR<span>.EXE</span>
        </button>
        <nav>
          <button onClick={() => scrollTo("work")}>Work</button>
          <button onClick={() => scrollTo("skills")}>Skills</button>
          <button onClick={() => scrollTo("journey")}>Journey</button>
          <a href="https://github.com/SagarLalwani1" target="_blank" rel="noreferrer">GitHub ↗</a>
          <button className="nav-cta" onClick={() => setView("journey")}>Enter Journey</button>
        </nav>
      </header>

      {view === "home" ? (
        <>
          <main>
            <section className="hero-pro">
              <div className="hero-grid">
                <div>
                  <p className="kicker">SOFTWARE ENGINEER · HYDERABAD · 3+ YEARS</p>
                  <h1>{professional.headline}</h1>
                  <p className="lede">{professional.summary}</p>
                  <div className="hero-actions">
                    <button className="primary" onClick={() => setView("journey")}>Explore the journey →</button>
                    <button className="secondary" onClick={() => scrollTo("work")}>View professional profile</button>
                  </div>
                </div>
                <aside className="profile-card">
                  <div className="terminal-top"><span>●</span><span>●</span><span>●</span><code>sagar@portfolio:~</code></div>
                  <div className="terminal-body">
                    <div><span className="muted">$</span> whoami</div>
                    <strong>Sagar Lalwani</strong>
                    <div className="muted">Software Engineer</div>
                    <br />
                    <div><span className="muted">$</span> current_direction</div>
                    <strong>Backend + Cloud + AI</strong>
                    <div className="muted">building systems, products & experiments</div>
                  </div>
                </aside>
              </div>
            </section>

            <section id="work" className="section">
              <div className="section-heading"><p className="kicker">PROFESSIONAL VIEW</p><h2>What I work on</h2></div>
              <div className="experience-grid">
                {professional.experience.map((item) => (
                  <article className="experience" key={item.role}>
                    <div className="experience-meta"><span>{item.period}</span><span>↗</span></div>
                    <h3>{item.role}</h3><p>{item.text}</p>
                  </article>
                ))}
              </div>
            </section>

            <section id="skills" className="section compact-section">
              <div className="section-heading"><p className="kicker">TOOLBOX</p><h2>Technologies I use</h2></div>
              <div className="skills-cloud">{professional.skills.map((skill) => <span key={skill}>{skill}</span>)}</div>
            </section>

            <section id="journey" className="section journey-intro">
              <div className="section-heading"><p className="kicker">OPTIONAL MODE</p><h2>Want the longer story?</h2></div>
              <div className="journey-card">
                <div><span className="journey-icon">↳</span><h3>Walk through the years.</h3><p>Five doors. Five chapters. Enter any room, skip anything, and collect a small achievement for discovering the work behind the résumé.</p></div>
                <button className="primary" onClick={() => setView("journey")}>Enter Journey Mode →</button>
              </div>
            </section>
          </main>
          <footer><span>© {new Date().getFullYear()} Sagar Lalwani</span><span>Built as an evolving portfolio.</span></footer>
        </>
      ) : (
        <main className="journey-page">
          <div className="journey-toolbar">
            <div><p className="kicker">JOURNEY MODE</p><h1>Choose a door. There is no required order.</h1></div>
            <div className="journey-tools"><span>{visited.length}/{eras.length} rooms discovered</span><button onClick={() => setView("home")}>← Professional view</button></div>
          </div>
          <div className="game-shell"><div ref={gameRef} className="game-container" /></div>
          <div className="door-strip">{eras.map((era) => <button key={era.id} onClick={() => setSelected(era)} className={visited.includes(era.id) ? "visited" : ""}><span>{era.year}</span><strong>{era.title}</strong></button>)}</div>
        </main>
      )}

      {selected && (
        <div className="modal" onClick={() => setSelected(null)}>
          <article className="modal-card" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelected(null)}>×</button>
            <p className="kicker">{selected.year} · CHAPTER</p><h2>{selected.title}</h2><p className="modal-summary">{selected.summary}</p>
            <div className="highlights">{selected.highlights.map((item) => <p key={item}><span>+</span>{item}</p>)}</div>
            <div className="modal-footer"><div className="tags">{selected.tech.map((tech) => <span key={tech}>{tech}</span>)}</div><small>Reward: {selected.reward}</small></div>
          </article>
        </div>
      )}

      {reward && (
        <div className="reward-toast" onClick={() => setReward(null)}>
          <span className="reward-badge">✦</span><div><p>REWARD UNLOCKED</p><strong>{reward.reward}</strong><small>{visited.length === eras.length ? "All rooms discovered — the next build is yours." : "Keep exploring when you want to."}</small></div>
        </div>
      )}
    </div>
  );
}
