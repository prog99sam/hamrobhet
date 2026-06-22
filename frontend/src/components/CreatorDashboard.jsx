import React, { useEffect, useState } from "react";
import "../styles/CreatorDashboard.css";

const NAV_ITEMS = [
  { label: "Dashboard", icon: "🏠", active: true },
  { label: "Posts", icon: "📝" },
  { label: "Supporters", icon: "💛" },
  { label: "Earnings", icon: "💰" },
  { label: "Public Page", icon: "🌐" },
  { label: "Settings", icon: "⚙️" },
];

const ACTIVITY = [
  { id: 1, icon: "❤️", text: "Ram supported you.", time: "2m ago", tone: "primary" },
  { id: 2, icon: "💬", text: "Sita commented on your post.", time: "18m ago", tone: "accent" },
  { id: 3, icon: "🎉", text: "3 new supporters joined.", time: "1h ago", tone: "green" },
  { id: 4, icon: "🔥", text: "Your post reached 250 views.", time: "3h ago", tone: "secondary" },
];

const POSTS = [
  {
    id: 1,
    title: "Behind the scenes: my new mural in Patan",
    image: "https://picsum.photos/seed/hamrobhet-1/480/320",
    views: "1.2k",
    likes: 184,
    date: "2 days ago",
  },
  {
    id: 2,
    title: "How I price my commission work",
    image: "https://picsum.photos/seed/hamrobhet-2/480/320",
    views: "856",
    likes: 121,
    date: "5 days ago",
  },
  {
    id: 3,
    title: "Studio tour + new brush set giveaway",
    image: "https://picsum.photos/seed/hamrobhet-3/480/320",
    views: "2.4k",
    likes: 310,
    date: "1 week ago",
  },
];

const SUPPORTERS = [
  { id: 1, name: "Ram Sharma", since: "Supporting for 4 months", avatar: "https://i.pravatar.cc/100?img=12" },
  { id: 2, name: "Sita Rai", since: "Supporting for 2 months", avatar: "https://i.pravatar.cc/100?img=32" },
  { id: 3, name: "Bishal Thapa", since: "Supporting for 9 months", avatar: "https://i.pravatar.cc/100?img=51" },
  { id: 4, name: "Anita Gurung", since: "Supporting for 1 month", avatar: "https://i.pravatar.cc/100?img=45" },
  { id: 5, name: "Kiran Magar", since: "Supporting for 6 months", avatar: "https://i.pravatar.cc/100?img=15" },
];

const FLOATING_AVATARS = [
  "https://i.pravatar.cc/80?img=12",
  "https://i.pravatar.cc/80?img=32",
  "https://i.pravatar.cc/80?img=51",
  "https://i.pravatar.cc/80?img=45",
];

const QUICK_ACTIONS = [
  { id: "post", icon: "📝", title: "Create Post", body: "Share an update with your supporters", tone: "primary" },
  { id: "share", icon: "📢", title: "Share Creator Page", body: "Bring new supporters to HamroBhet", tone: "accent" },
  { id: "customize", icon: "🎨", title: "Customize Profile", body: "Make your page feel like you", tone: "green" },
];

export default function CreatorDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const userInfo = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    const t = setTimeout(() => setProgress(78), 250);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="hb-dashboard">
      {sidebarOpen && (
        <div className="hb-overlay" onClick={() => setSidebarOpen(false)} />
      )}

      <aside className={`hb-sidebar ${sidebarOpen ? "hb-sidebar--open" : ""}`}>
        <div className="hb-logo">
          <span className="hb-logo__mark">H</span>
          <span className="hb-logo__text">HamroBhet</span>
        </div>

        <nav className="hb-nav">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.label}
              href="#"
              className={`hb-nav__item ${item.active ? "hb-nav__item--active" : ""}`}
            >
              <span className="hb-nav__icon">{item.icon}</span>
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hb-profile-card">
          <img
            className="hb-profile-card__avatar"
            src="https://i.pravatar.cc/100?img=68"
            alt="Sajan's avatar"
          />
          <div>
            <p className="hb-profile-card__name">{userInfo.name}</p>
            <p className="hb-profile-card__role">Illustrator</p>
          </div>
        </div>
      </aside>

      <main className="hb-main">
        <button
          className="hb-menu-btn"
          onClick={() => setSidebarOpen(true)}
          aria-label="Open menu"
        >
          ☰
        </button>

        {/* HERO */}
        <section className="hb-hero">
          <div className="hb-hero__floaters" aria-hidden="true">
            {FLOATING_AVATARS.map((src, i) => (
              <img key={i} src={src} alt="" className={`hb-hero__floater hb-hero__floater--${i}`} />
            ))}
          </div>

          <div className="hb-hero__content">
            <img
              className="hb-hero__avatar"
              src="https://i.pravatar.cc/120?img=68"
              alt="Sajan's avatar"
            />
            <h1 className="hb-hero__title">Welcome back, {userInfo.name}.</h1>
            <p className="hb-hero__sub">214 people are supporting your work.</p>

            <div className="hb-hero__stats">
              <div className="hb-hero__stat">
                <span className="hb-hero__stat-value">Rs 12,500</span>
                <span className="hb-hero__stat-label">earned this month</span>
              </div>
              <div className="hb-hero__stat-divider" />
              <div className="hb-hero__stat">
                <span className="hb-hero__stat-value">+18</span>
                <span className="hb-hero__stat-label">new supporters</span>
              </div>
            </div>

            <div className="hb-hero__actions">
              <button className="hb-btn hb-btn--light">Create Post</button>
              <button className="hb-btn hb-btn--ghost">Share Your Page</button>
            </div>
          </div>
        </section>

        {/* LIVE ACTIVITY */}
        <section className="hb-section">
          <div className="hb-section__head">
            <h2>Live activity</h2>
            <span className="hb-live-dot">
              <span className="hb-live-dot__pulse" />
              Live
            </span>
          </div>

          <div className="hb-activity-grid">
            {ACTIVITY.map((a) => (
              <div key={a.id} className={`hb-activity-card hb-activity-card--${a.tone}`}>
                <span className="hb-activity-card__icon">{a.icon}</span>
                <p className="hb-activity-card__text">{a.text}</p>
                <span className="hb-activity-card__time">{a.time}</span>
              </div>
            ))}
          </div>
        </section>

        {/* CONTENT PERFORMANCE */}
        <section className="hb-section">
          <div className="hb-section__head">
            <h2>Your recent posts</h2>
            <a className="hb-link" href="#">View all</a>
          </div>

          <div className="hb-posts-grid">
            {POSTS.map((p) => (
              <article className="hb-post-card" key={p.id}>
                <div className="hb-post-card__image-wrap">
                  <img src={p.image} alt={p.title} />
                </div>
                <div className="hb-post-card__body">
                  <h3>{p.title}</h3>
                  <div className="hb-post-card__meta">
                    <span>👁 {p.views}</span>
                    <span>❤️ {p.likes}</span>
                    <span>{p.date}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* SUPER SUPPORTERS */}
        <section className="hb-section">
          <div className="hb-section__head">
            <h2>Super supporters</h2>
          </div>

          <div className="hb-supporters-row">
            {SUPPORTERS.map((s) => (
              <div className="hb-supporter-card" key={s.id}>
                <img src={s.avatar} alt={s.name} />
                <p className="hb-supporter-card__name">{s.name}</p>
                <p className="hb-supporter-card__since">{s.since}</p>
              </div>
            ))}
          </div>
        </section>

        {/* EARNINGS + QUICK ACTIONS */}
        <section className="hb-split">
          <div className="hb-earnings-card">
            <p className="hb-earnings-card__label">This month</p>
            <h2 className="hb-earnings-card__amount">Rs 12,500</h2>
            <p className="hb-earnings-card__trend">
              ↑ You're earning more than last month.
            </p>

            <div className="hb-progress">
              <div
                className="hb-progress__fill"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="hb-earnings-card__hint">
              Keep posting to grow your audience.
            </p>
          </div>

          <div className="hb-quick-actions">
            {QUICK_ACTIONS.map((q) => (
              <button key={q.id} className={`hb-quick-card hb-quick-card--${q.tone}`}>
                <span className="hb-quick-card__icon">{q.icon}</span>
                <span className="hb-quick-card__title">{q.title}</span>
                <span className="hb-quick-card__body">{q.body}</span>
              </button>
            ))}
          </div>
        </section>

        {/* MOTIVATION */}
        <section className="hb-motivation">
          <div className="hb-motivation__illustration" aria-hidden="true">
            <svg viewBox="0 0 160 120">
              <circle cx="80" cy="60" r="46" className="hb-motivation__ring" />
              <circle cx="48" cy="40" r="9" className="hb-motivation__dot hb-motivation__dot--a" />
              <circle cx="112" cy="36" r="6" className="hb-motivation__dot hb-motivation__dot--b" />
              <circle cx="100" cy="88" r="7" className="hb-motivation__dot hb-motivation__dot--c" />
              <circle cx="58" cy="90" r="5" className="hb-motivation__dot hb-motivation__dot--d" />
            </svg>
          </div>
          <div>
            <h2 className="hb-motivation__title">Consistency builds communities.</h2>
            <p className="hb-motivation__body">
              Post regularly to keep supporters engaged.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}