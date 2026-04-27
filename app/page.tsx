'use client'

import { registerUser } from './actions';
import RegistrationDialog from './components/RegistrationDialog';

const topics = [
  {
    number: "01",
    name: "Git Fundamentals",
    description: "Init, add, commit, status - building your first repo from scratch",
  },
  {
    number: "02",
    name: "Branching & Merging",
    description: "Work in parallel, resolve conflicts, and keep history clean",
  },
  {
    number: "03",
    name: "GitHub Workflow",
    description: "Push, pull, fork, clone - mastering the remote repository",
  },
  {
    number: "04",
    name: "Pull Requests",
    description: "Code review culture, PR etiquette, and team collaboration",
  },
  {
    number: "05",
    name: "GitHub Actions",
    description: "Automate tests and deployments with CI/CD pipelines",
  },
  {
    number: "06",
    name: "Best Practices",
    description: "Commit messages, .gitignore, tagging, and real-world tips",
  },
];

const infoCards = [
  { icon: "📅", key: "Date", value: "2026-04-30 10:00", accent: true },
  { icon: "⏱️", key: "Duration", value: "2 Hour" },
  { icon: "🖥️", key: "Format", value: "Hands-on / Lab" },
  { icon: "🎓", key: "Level", value: "All Levels Welcome" },
];

export default function Home() {
  return (
    <main className="page-shell">
      <section className="page">
        <div className="grid-bg" />
        <div className="blob blob1" />
        <div className="blob blob2" />
        <div className="blob blob3" />

        <svg className="branch-diagram" width="160" height="200" viewBox="0 0 160 200" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <circle cx="20" cy="20" r="8" fill="#f0883e" />
          <circle cx="20" cy="80" r="8" fill="#3fb950" />
          <circle cx="20" cy="140" r="8" fill="#58a6ff" />
          <circle cx="20" cy="192" r="8" fill="#f0883e" />
          <circle cx="100" cy="50" r="8" fill="#d2a8ff" />
          <circle cx="100" cy="110" r="8" fill="#d2a8ff" />
          <line x1="20" y1="20" x2="20" y2="192" stroke="#8b949e" strokeWidth="2" />
          <path d="M20 80 Q60 80 100 50" stroke="#8b949e" strokeWidth="2" fill="none" />
          <path d="M100 110 Q60 140 20 140" stroke="#8b949e" strokeWidth="2" fill="none" />
          <line x1="100" y1="50" x2="100" y2="110" stroke="#8b949e" strokeWidth="2" />
        </svg>

        <div className="content">
          <div className="top-bar">
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px', backgroundColor: 'white', padding: '10px', borderRadius: '10px' }}>

            <img
              src="https://www.fs-umi.ac.ma/wp-content/uploads/2020/10/logo-2.png"
              alt="University logo"
              style={{ height: '50px', width: 'auto', opacity: 0.95 }}
              className='bg-white'
              />
              </div>
            <div className="dept-tag">● IT DEPARTMENT</div>
            <div className="breadcrumb">
              <span>~/</span>workshops<span>/</span>version-control<span>/</span>2026
            </div>
          </div>

          <div className="hero">
            <div className="workshop-label">Workshop Series</div>
            <div className="title-block">
              <h1>
                <span className="git">Git</span>
                <br />
                <span className="amp">&amp; </span>
                <span className="hub">GitHub</span>
              </h1>
            </div>
            <p className="subtitle">
              Master <strong>version control</strong> from the ground up. Learn to
              collaborate on code, manage projects, and work like a real developer -
              all in one intensive session.
            </p>
          </div>

          <div className="terminal">
            <div className="terminal-bar">
              <div className="dot dot-r" />
              <div className="dot dot-y" />
              <div className="dot dot-g" />
              <div className="terminal-title">bash - workshop preview</div>
            </div>
            <div className="terminal-body">
              <div className="cmd-col">
                <div className="cmd-col-label">Basics</div>
                <div className="cmd">
                  <div>
                    <span className="prompt">$ </span><span className="command">git </span><span className="flag">init</span> <span className="string">my-project</span>
                  </div>
                  <div>
                    <span className="prompt">$ </span><span className="command">git </span><span className="flag">add</span> <span className="string">.</span>
                  </div>
                  <div>
                    <span className="prompt">$ </span><span className="command">git </span><span className="flag">commit</span> <span className="string">-m "first commit"</span>
                  </div>
                  <div><span className="comment"># ✓ Repo initialized</span></div>
                </div>
              </div>
              <div className="cmd-col">
                <div className="cmd-col-label">Collaboration</div>
                <div className="cmd">
                  <div>
                    <span className="prompt">$ </span><span className="command">git </span><span className="flag">branch</span> <span className="string">feature/ui</span>
                  </div>
                  <div>
                    <span className="prompt">$ </span><span className="command">git </span><span className="flag">push</span> <span className="string">origin feature/ui</span>
                  </div>
                  <div>
                    <span className="prompt">$ </span><span className="command">gh pr </span><span className="flag">create</span> <span className="string">--fill</span>
                  </div>
                  <div><span className="comment"># ✓ Pull request opened</span></div>
                </div>
              </div>
            </div>
          </div>

          <div className="section-label"><span>{'//'}</span> What you'll learn</div>
          <div className="topics-grid">
            {topics.map((topic) => (
              <article key={topic.number} className="topic-card">
                <div className="topic-num">{topic.number}</div>
                <div className="topic-name">{topic.name}</div>
                <div className="topic-desc">{topic.description}</div>
              </article>
            ))}
          </div>

          <div className="info-strip">
            {infoCards.map((card) => (
              <div key={card.key} className="info-card">
                <div className="info-icon" aria-hidden="true">{card.icon}</div>
                <div className="info-key">{card.key}</div>
                <div className={`info-val${card.accent ? " tbd" : ""}`}>{card.value}</div>
              </div>
            ))}
          </div>

          <div className="cta-row">
            <div className="cta-text">
              <h3>Ready to commit? 🚀</h3>
              <p>Bring your laptop · GitHub account required (free) · No prior experience needed</p>
            </div>

            <RegistrationDialog onSubmit={registerUser} />

          </div>

          <div className="footer">
            <div className="footer-left">
              Faculty of Science &amp; Technology - <span>IT Department</span>
            </div>
            <div className="level-badge">Beginner-friendly</div>
          </div>

          <div
            style={{
              marginTop: '14px',
              borderTop: '1px solid rgba(139, 148, 158, 0.25)',
              paddingTop: '12px',
              color: '#8b949e',
              fontSize: '13px',
              display: 'grid',
              gap: '6px',
            }}
          >
            <div style={{ color: '#c9d1d9', fontWeight: 600 }}>Contributors</div>
            <div>
              Aymane Aggoujjil:{' '}
              <a href="https://github.com/AymanAkashi" target="_blank" rel="noreferrer" style={{ color: '#58a6ff' }}>
                github.com/AymanAkashi
              </a>
            </div>
            <div>
              Mohamed Mekkaoui:{' '}
              <a href="https://github.com/mekkaoui-med" target="_blank" rel="noreferrer" style={{ color: '#58a6ff' }}>
                github.com/mekkaoui-med
              </a>
            </div>
            <div>
              Abdellah Aghbal:{' '}
              <a href="https://github.com/aaghbal" target="_blank" rel="noreferrer" style={{ color: '#58a6ff' }}>
                github.com/aaghbal
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
