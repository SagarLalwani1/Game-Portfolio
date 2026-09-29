import { useEffect, useRef, useState } from "react";
import Phaser from "phaser";
import { eras, professional, type Era } from "./content";
import { GameScene, type JourneyEvent } from "./game/GameScene";

type View = "home" | "journey";
type ResumeMode = "none" | "preview";

export default function App() {
  const gameRef = useRef<HTMLDivElement>(null);
  const [view, setView] = useState<View>(() =>
    window.location.hash === "#/journey" ? "journey" : "home"
  );
  const [selected, setSelected] = useState<Era | null>(null);
  const [reward, setReward] = useState<Era | null>(null);
  const [visited, setVisited] = useState<string[]>([]);
  const [resumeMode, setResumeMode] = useState<ResumeMode>("none");

  // Journey Mode is a hash route so it works on GitHub Pages without
  // requiring server-side route rewrites.
  useEffect(() => {
    const handleRoute = () => {
      const nextView: View =
        window.location.hash === "#/journey" ? "journey" : "home";
      setView(nextView);

      if (nextView === "home") {
        setSelected(null);
      }
    };

    window.addEventListener("hashchange", handleRoute);
    handleRoute();

    return () => window.removeEventListener("hashchange", handleRoute);
  }, []);

  // Escape on desktop exits Journey Mode.
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && view === "journey") {
        window.location.hash = "";
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [view]);

  useEffect(() => {
    if (view !== "journey" || !gameRef.current) return;

    const game = new Phaser.Game({
      type: Phaser.AUTO,
      parent: gameRef.current,
      width: 1100,
      height: 650,
      backgroundColor: "#080a0f",
      scale: {
        mode: Phaser.Scale.RESIZE,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 1100,
        height: 650,
      },
      physics: {
        default: "arcade",
        arcade: { debug: false },
      },
      render: { antialias: false },
      scene: new GameScene((event: JourneyEvent) => {
        if (event.type === "era") {
          setSelected(
            eras.find((era) => era.id === event.id) ?? null
          );
        }

        if (event.type === "reward") {
          const era = eras.find((item) => item.id === event.id) ?? null;
          setReward(era);
          setVisited((items) =>
            items.includes(event.id) ? items : [...items, event.id]
          );
        }

        if (event.type === "status" && event.text === "exit") {
          window.location.hash = "";
        }
      }),
    });

    return () => game.destroy(true);
  }, [view]);

  const enterJourney = () => {
    window.location.hash = "/journey";
  };

  const exitJourney = () => {
    window.location.hash = "";
  };

  const scrollTo = (id: string) =>
    document
      .getElementById(id)
      ?.scrollIntoView({ behavior: "smooth" });

  return (
    <div className="site">
      {view === "home" ? (
        <>
          <header className="nav">
            <button
              className="brand"
              onClick={() => {
                setView("home");
                window.location.hash = "";
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              SAGAR<span>.EXE</span>
            </button>

            <nav>
              <button onClick={() => scrollTo("work")}>Work</button>
              <button onClick={() => scrollTo("skills")}>Skills</button>
              <button onClick={() => scrollTo("journey")}>Journey</button>
              <a
                href="https://github.com/SagarLalwani1"
                target="_blank"
                rel="noreferrer"
              >
                GitHub ↗
              </a>
              <button onClick={() => setResumeMode("preview")}>
                Resume
              </button>
              <button className="nav-cta" onClick={enterJourney}>
                Enter Journey
              </button>
            </nav>
          </header>

          <main>
            <section className="hero-pro">
              <div className="hero-grid">
                <div>
                  <p className="kicker">
                    SOFTWARE ENGINEER · HYDERABAD · 3+ YEARS
                  </p>
                  <h1>{professional.headline}</h1>
                  <p className="lede">{professional.summary}</p>

                  <div className="hero-actions">
                    <button
                      className="primary"
                      onClick={() => scrollTo("work")}
                    >
                      View professional profile →
                    </button>

                    <button
                      className="secondary"
                      onClick={enterJourney}
                    >
                      Explore the journey
                    </button>

                    <a
                      className="text-action"
                      href={`${import.meta.env.BASE_URL}Sagar_Lalwani_Resume.pdf`}
                      download
                    >
                      Download résumé ↓
                    </a>
                  </div>
                </div>

                <aside className="profile-card">
                  <div className="terminal-top">
                    <span>●</span>
                    <span>●</span>
                    <span>●</span>
                    <code>sagar@portfolio:~</code>
                  </div>

                  <div className="terminal-body">
                    <div>
                      <span className="muted">$</span> whoami
                    </div>
                    <strong>Sagar Lalwani</strong>
                    <div className="muted">Software Engineer</div>
                    <br />
                    <div>
                      <span className="muted">$</span> current_direction
                    </div>
                    <strong>Backend + Cloud + AI</strong>
                    <div className="muted">
                      building systems, products & experiments
                    </div>
                  </div>
                </aside>
              </div>
            </section>

            <section id="work" className="section">
              <div className="section-heading">
                <p className="kicker">PROFESSIONAL VIEW</p>
                <h2>What I work on</h2>
              </div>

              <div className="experience-grid">
                {professional.experience.map((item) => (
                  <article
                    className="experience"
                    key={`${item.company}-${item.role}`}
                  >
                    <div className="experience-meta">
                      <span>{item.period}</span>
                      <span>●</span>
                    </div>
                    <p className="company">{item.company}</p>
                    <h3>{item.role}</h3>
                    <p>{item.text}</p>
                  </article>
                ))}
              </div>
            </section>

            <section className="section impact-section">
              <div className="section-heading">
                <p className="kicker">ENGINEERING IMPACT</p>
                <h2>What changed because I worked on it</h2>
              </div>

              <div className="impact-grid">
                {professional.impact.map((item) => (
                  <article className="impact" key={item.label}>
                    <strong>{item.value}</strong>
                    <span>{item.label}</span>
                    <p>{item.detail}</p>
                  </article>
                ))}
              </div>
            </section>

            <section id="skills" className="section compact-section">
              <div className="section-heading">
                <p className="kicker">TOOLBOX</p>
                <h2>Technologies I use</h2>
              </div>

              <div className="skills-cloud">
                {professional.skills.map((skill) => (
                  <span key={skill}>{skill}</span>
                ))}
              </div>
            </section>

            <section className="section projects-section">
              <div className="section-heading">
                <p className="kicker">SELECTED BUILDS</p>
                <h2>Products I have shipped</h2>
              </div>

              <div className="projects-grid">
                {professional.projects.map((project) => (
                  <article className="project-card" key={project.name}>
                    <div className="project-top">
                      <span>{project.year}</span>
                      <span>PROJECT</span>
                    </div>
                    <h3>{project.name}</h3>
                    <p className="project-label">{project.label}</p>
                    <p>{project.text}</p>

                    <div className="tags">
                      {project.tags.map((tag) => (
                        <span key={tag}>{tag}</span>
                      ))}
                    </div>
                  </article>
                ))}
              </div>
            </section>

            <section id="journey" className="section journey-intro">
              <div className="section-heading">
                <p className="kicker">OPTIONAL MODE</p>
                <h2>Want the longer story?</h2>
              </div>

              <div className="journey-card">
                <div>
                  <span className="journey-icon">↳</span>
                  <h3>Walk through the years.</h3>
                  <p>
                    Five doors. Five chapters. Enter any room, skip anything,
                    and collect a small achievement for discovering the work
                    behind the résumé.
                  </p>
                </div>

                <button className="primary" onClick={enterJourney}>
                  Enter Journey Mode →
                </button>
              </div>
            </section>
          </main>

          <footer>
            <span>© {new Date().getFullYear()} Sagar Lalwani</span>
            <span>Built as an evolving portfolio.</span>
          </footer>
        </>
      ) : (
        <main className="journey-page">
          <div className="journey-toolbar">
            <div>
              <p className="kicker">JOURNEY MODE</p>
              <h1>Choose a door. There is no required order.</h1>
            </div>

            <div className="journey-tools">
              <span>
                {visited.length}/{eras.length} rooms discovered
              </span>

              <button onClick={exitJourney}>
                ← Exit Journey
              </button>
            </div>
          </div>

          <div className="game-shell">
            <div ref={gameRef} className="game-container" />
          </div>

          <div className="door-strip">
            {eras.map((era) => (
              <button
                key={era.id}
                onClick={() => setSelected(era)}
                className={visited.includes(era.id) ? "visited" : ""}
              >
                <span>{era.year}</span>
                <strong>{era.title}</strong>
              </button>
            ))}
          </div>
        </main>
      )}

      {selected && (
        <div className="modal" onClick={() => setSelected(null)}>
          <article
            className="modal-card"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="modal-close"
              onClick={() => setSelected(null)}
            >
              ×
            </button>

            <p className="kicker">{selected.year} · CHAPTER</p>
            <h2>{selected.title}</h2>
            <p className="modal-summary">{selected.summary}</p>

            <div className="highlights">
              {selected.highlights.map((item) => (
                <p key={item}>
                  <span>+</span>
                  {item}
                </p>
              ))}
            </div>

            <div className="modal-footer">
              <div className="tags">
                {selected.tech.map((tech) => (
                  <span key={tech}>{tech}</span>
                ))}
              </div>
              <small>Reward: {selected.reward}</small>
            </div>
          </article>
        </div>
      )}

      {resumeMode === "preview" && (
        <div
          className="modal resume-modal"
          onClick={() => setResumeMode("none")}
        >
          <article
            className="resume-card"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="resume-head">
              <div>
                <p className="kicker">CURRENT RÉSUMÉ</p>
                <h2>Sagar Lalwani</h2>
              </div>

              <div className="resume-actions">
                <a
                  className="primary"
                  href={`${import.meta.env.BASE_URL}Sagar_Lalwani_Resume.pdf`}
                  download
                >
                  Download PDF ↓
                </a>

                <button
                  className="modal-close"
                  onClick={() => setResumeMode("none")}
                >
                  ×
                </button>
              </div>
            </div>

            <iframe
              title="Sagar Lalwani résumé"
              src={`${import.meta.env.BASE_URL}Sagar_Lalwani_Resume.pdf`}
            />
          </article>
        </div>
      )}

      {reward && (
        <div
          className="reward-toast"
          onClick={() => setReward(null)}
        >
          <span className="reward-badge">✦</span>
          <div>
            <p>REWARD UNLOCKED</p>
            <strong>{reward.reward}</strong>
            <small>
              {visited.length === eras.length
                ? "All rooms discovered — the next build is yours."
                : "Keep exploring when you want to."}
            </small>
          </div>
        </div>
      )}
    </div>
  );
}
