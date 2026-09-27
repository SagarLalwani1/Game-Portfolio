import { useEffect, useRef, useState } from "react";
import Phaser from "phaser";
import { GameScene } from "./game/GameScene";
import { stories, type Story } from "./content";

export default function App() {
  const gameRef = useRef<HTMLDivElement>(null);
  const [story, setStory] = useState<Story | null>(null);

  useEffect(() => {
    if (!gameRef.current) return;

    const game = new Phaser.Game({
      type: Phaser.AUTO,
      width: 960,
      height: 540,
      parent: gameRef.current,
      backgroundColor: "#0a0d12",
      scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 960,
        height: 540,
      },
      scene: new GameScene((id) => setStory(stories[id])),
      render: {
        antialias: false,
      },
    });

    return () => game.destroy(true);
  }, []);

  return (
    <main className="portfolio">
      <header className="topbar">
        <div>
          <div className="brand">SAGAR.EXE</div>
          <div className="subtitle">INTERACTIVE ENGINEERING PORTFOLIO</div>
        </div>
        <div className="mode">MODE: EXPLORATION</div>
      </header>

      <section className="hero">
        <div className="hero-copy">
          <span className="eyebrow">2019 → 2026</span>
          <h1>From building robots<br />to building software.</h1>
          <p>
            This is the first room of an interactive portfolio documenting the
            problems, experiments, products and engineering decisions behind the journey.
          </p>
        </div>

        <div className="game-shell">
          <div ref={gameRef} className="game-container" />
        </div>
      </section>

      <footer>
        <span>MGIT LAB / V0.1</span>
        <span>Explore the room. Interact with the machines.</span>
      </footer>

      {story && (
        <div className="modal-backdrop" onClick={() => setStory(null)}>
          <article className="story-modal" onClick={(e) => e.stopPropagation()}>
            <button className="close" onClick={() => setStory(null)} aria-label="Close">
              ×
            </button>

            <div className="story-year">{story.year} · {story.eyebrow}</div>
            <h2>{story.title}</h2>
            <p className="story-summary">{story.summary}</p>

            <div className="story-details">
              {story.details.map((detail) => (
                <p key={detail}>{detail}</p>
              ))}
            </div>

            <div className="tech-list">
              {story.tech.map((tech) => <span key={tech}>{tech}</span>)}
            </div>
          </article>
        </div>
      )}
    </main>
  );
}