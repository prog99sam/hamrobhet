import React, { useEffect, useState, useRef } from "react";
import "../styles/CreatorDashboard.css";

/* ─── ICONS (inline SVG, no emoji) ─── */

const Icon = {
  Home: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M3 11.5 12 4l9 7.5" />
      <path d="M5.5 10v9.5a1 1 0 0 0 1 1H9.5a1 1 0 0 0 1-1V15a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v4.5a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1V10" />
    </svg>
  ),
  Posts: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <rect x="4.5" y="3.5" width="15" height="17" rx="1.6" />
      <path d="M8 8.5h8M8 12h8M8 15.5h5" />
    </svg>
  ),
  Supporters: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <circle cx="9" cy="8.5" r="3" />
      <path d="M3.5 19c0-3 2.5-5 5.5-5s5.5 2 5.5 5" />
      <circle cx="17" cy="9.5" r="2.2" />
      <path d="M15.7 14.2c2.4.3 4.3 2 4.3 4.3" />
    </svg>
  ),
  Earnings: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <circle cx="12" cy="12" r="8.25" />
      <path d="M12 7.5v9M14.6 9.7c0-1.1-1.1-1.9-2.6-1.9-1.6 0-2.7.9-2.7 2 0 3 5.3 1.5 5.3 4.4 0 1.1-1.1 2-2.7 2-1.5 0-2.6-.8-2.6-1.9" />
    </svg>
  ),
  Globe: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <circle cx="12" cy="12" r="8.25" />
      <path d="M3.75 12h16.5M12 3.75c2.2 2.3 3.4 5.2 3.4 8.25S14.2 17.95 12 20.25c-2.2-2.3-3.4-5.2-3.4-8.25S9.8 6.05 12 3.75Z" />
    </svg>
  ),
  Settings: (p) => (<a href="/creator/settings">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 13.5a1.7 1.7 0 0 0 .34 1.87l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.7 1.7 0 0 0-1.87-.34 1.7 1.7 0 0 0-1.04 1.56V19.5a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.11-1.55 1.7 1.7 0 0 0-1.87.34l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.7 1.7 0 0 0 .34-1.87 1.7 1.7 0 0 0-1.56-1.04H4.5a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.55-1.11 1.7 1.7 0 0 0-.34-1.87l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.7 1.7 0 0 0 1.87.34h0a1.7 1.7 0 0 0 1.04-1.56V4.5a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1.04 1.56h0a1.7 1.7 0 0 0 1.87-.34l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.7 1.7 0 0 0-.34 1.87v0a1.7 1.7 0 0 0 1.56 1.04h.1a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.56 1.04Z" />
    </svg></a>
  ),
  Bell: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </svg>
  ),
  Heart: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M12 20.2s-7.6-4.6-9.8-9C.9 7.7 2.4 4.3 5.6 3.6c2-.4 3.9.5 5 2.2 1-1.7 3-2.6 5-2.2 3.2.7 4.7 4.1 3.4 7.6-2.2 4.4-9 9-9 9Z" />
    </svg>
  ),
  Comment: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M21 11.5a8.4 8.4 0 0 1-1.2 4.4L21 20l-4.3-1.1a8.5 8.5 0 1 1 4.3-7.4Z" />
    </svg>
  ),
  Group: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <circle cx="8" cy="9" r="2.8" />
      <circle cx="16" cy="9" r="2.8" />
      <path d="M3 19c0-2.6 2.2-4.5 5-4.5s5 1.9 5 4.5M11 19c0-2.6 2.2-4.5 5-4.5s5 1.9 5 4.5" />
    </svg>
  ),
  Flame: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M12 21c4 0 6.5-2.6 6.5-6.2 0-2.7-1.5-4.3-2.7-5.7.2 1.6-.5 2.7-1.3 3.2.3-2.6-.8-5.2-3-6.8.6 2.3-.4 3.9-1.8 5.2-1.3 1.3-2.2 2.8-2.2 4.7C7.5 18.7 9.3 21 12 21Z" />
    </svg>
  ),
  Payout: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <rect x="3" y="6.5" width="18" height="12" rx="2" />
      <path d="M3 10.5h18" />
      <circle cx="7" cy="14.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  ),
  Edit: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M16.5 3.5 20 7 8.5 18.5 4 20l1.5-4.5Z" />
    </svg>
  ),
  Share: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <circle cx="18" cy="5.5" r="2.3" />
      <circle cx="6" cy="12" r="2.3" />
      <circle cx="18" cy="18.5" r="2.3" />
      <path d="M8 10.7 16 6.3M8 13.3l8 4.4" />
    </svg>
  ),
  Palette: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M12 21a9 9 0 1 1 0-18c4.5 0 8 3 8 6.8 0 2.4-1.8 3.7-3.6 3.7h-2a1.7 1.7 0 0 0-1 3.1c.4.3.6.8.6 1.3 0 1.7-1.3 3.1-2 3.1Z" />
      <circle cx="8" cy="11" r="1" fill="currentColor" stroke="none" />
      <circle cx="8.6" cy="15.5" r="1" fill="currentColor" stroke="none" />
      <circle cx="12.5" cy="7.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  ),
  Eye: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M2.5 12S5.8 5.5 12 5.5 21.5 12 21.5 12 18.2 18.5 12 18.5 2.5 12 2.5 12Z" />
      <circle cx="12" cy="12" r="2.6" />
    </svg>
  ),
  Dots: (p) => (
    <svg viewBox="0 0 24 6" fill="currentColor" {...p}>
      <circle cx="3" cy="3" r="1.8" />
      <circle cx="12" cy="3" r="1.8" />
      <circle cx="21" cy="3" r="1.8" />
    </svg>
  ),
  ArrowRight: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  ),
  TrendUp: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M3 17 9.5 10.5 14 14 21 6" />
      <path d="M21 11V6h-5" />
    </svg>
  ),
  Menu: (p) => (
    <svg viewBox="0 0 18 18" fill="none" {...p}>
      <rect y="2" width="18" height="2" rx="1" fill="currentColor" />
      <rect y="8" width="12" height="2" rx="1" fill="currentColor" />
      <rect y="14" width="15" height="2" rx="1" fill="currentColor" />
    </svg>
  ),
};

const NAV_ITEMS = [
  { label: "Dashboard", Icon: Icon.Home, active: true },
  { label: "Posts", Icon: Icon.Posts },
  { label: "Supporters", Icon: Icon.Supporters },
  { label: "Earnings", Icon: Icon.Earnings },
  { label: "Public Page", Icon: Icon.Globe },
  { label: "Settings", Icon: Icon.Settings },
];

const POSTS = [
  {
    id: 1,
    title: "Behind the scenes: my new mural in Patan",
    image: "https://picsum.photos/seed/hamrobhet-1/480/320",
    views: "1.2k",
    likes: 184,
    date: "2 days ago",
    tag: "Art",
  },
  {
    id: 2,
    title: "How I price my commission work",
    image: "https://picsum.photos/seed/hamrobhet-2/480/320",
    views: "856",
    likes: 121,
    date: "5 days ago",
    tag: "Business",
  },
  {
    id: 3,
    title: "Studio tour + new brush set giveaway",
    image: "https://picsum.photos/seed/hamrobhet-3/480/320",
    views: "2.4k",
    likes: 310,
    date: "1 week ago",
    tag: "Studio",
  },
];

const SUPPORTERS = [
  { id: 1, name: "Ram Sharma", since: "4 months", avatar: "https://i.pravatar.cc/100?img=12" },
  { id: 2, name: "Sita Rai", since: "2 months", avatar: "https://i.pravatar.cc/100?img=32" },
  { id: 3, name: "Bishal Thapa", since: "9 months", avatar: "https://i.pravatar.cc/100?img=51" },
  { id: 4, name: "Anita Gurung", since: "1 month", avatar: "https://i.pravatar.cc/100?img=45" },
  { id: 5, name: "Kiran Magar", since: "6 months", avatar: "https://i.pravatar.cc/100?img=15" },
];

const FLOATING_AVATARS = [
  "https://i.pravatar.cc/80?img=12",
  "https://i.pravatar.cc/80?img=32",
  "https://i.pravatar.cc/80?img=51",
  "https://i.pravatar.cc/80?img=45",
];

const NOTIFICATIONS = [
  { id: 1, Icon: Icon.Heart, text: "Ram Sharma started supporting you", time: "2m ago", unread: true },
  { id: 2, Icon: Icon.Comment, text: "Sita commented on your latest post", time: "18m ago", unread: true },
  { id: 3, Icon: Icon.Group, text: "3 new supporters joined this week", time: "1h ago", unread: true },
  { id: 4, Icon: Icon.Flame, text: "Your mural post hit 1,200 views", time: "3h ago", unread: false },
  { id: 5, Icon: Icon.Payout, text: "Payout of Rs 4,000 processed", time: "1d ago", unread: false },
];

const QUICK_ACTIONS = [
  { id: "post", Icon: Icon.Edit, title: "Create Post", tone: "primary" },
  { id: "share", Icon: Icon.Share, title: "Share Page", tone: "accent" },
  { id: "customize", Icon: Icon.Palette, title: "Edit Profile", tone: "green" },
];

export default function CreatorDashboard() {
  const [sidebarExpanded, setSidebarExpanded] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [notifOpen, setNotifOpen] = useState(false);
  const [notifications, setNotifications] = useState(NOTIFICATIONS);
  const notifRef = useRef(null);

  const userInfo = (() => {
    try { return JSON.parse(localStorage.getItem("user")) || {}; } catch { return {}; }
  })();

  const unreadCount = notifications.filter(n => n.unread).length;

  useEffect(() => {
    const t = setTimeout(() => setProgress(78), 300);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const handler = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setNotifOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const markAllRead = () => setNotifications(ns => ns.map(n => ({ ...n, unread: false })));

  return (
    <div className="hb-dashboard">
      {mobileOpen && <div className="hb-overlay" onClick={() => setMobileOpen(false)} />}

      {/* SIDEBAR */}
      <aside
        className={`hb-sidebar ${sidebarExpanded ? "hb-sidebar--expanded" : ""} ${mobileOpen ? "hb-sidebar--mobile-open" : ""}`}
        onMouseEnter={() => setSidebarExpanded(true)}
        onMouseLeave={() => setSidebarExpanded(false)}
      >
        <div className="hb-logo">
          <span className="hb-logo__mark">H</span>
          <span className="hb-logo__text">HamroBhet</span>
        </div>

        <nav className="hb-nav">
          {NAV_ITEMS.map((item) => (
            <a key={item.label} href="#" className={`hb-nav__item ${item.active ? "hb-nav__item--active" : ""}`}>
              <span className="hb-nav__icon"><item.Icon width="18" height="18" /></span>
              <span className="hb-nav__label">{item.label}</span>
            </a>
          ))}
        </nav>

        <div className="hb-profile-card">
          <img
            className="hb-profile-card__avatar"
            src={userInfo.photo || "https://i.pravatar.cc/100?img=60"}
            alt="avatar"
          />
          <div className="hb-profile-card__info">
            <p className="hb-profile-card__name">{userInfo.name || "Sajan Maharjan"}</p>
            <p className="hb-profile-card__role">Illustrator</p>
          </div>
        </div>
      </aside>

      {/* MAIN */}
      <main className="hb-main">
        {/* TOPBAR */}
        <header className="hb-topbar">
          <button className="hb-menu-btn" onClick={() => setMobileOpen(true)} aria-label="Open menu">
            <Icon.Menu width="18" height="18" />
          </button>

          <div className="hb-topbar__right">
            <img
              className="hb-topbar__avatar"
              src={userInfo.photo || "https://i.pravatar.cc/100?img=60"}
              alt="avatar"
            />
          </div>
        </header>

        {/* HERO */}
        <section className="hb-hero">
          <div className="hb-hero__floaters" aria-hidden="true">
            {FLOATING_AVATARS.map((src, i) => (
              <img key={i} src={src} alt="" className={`hb-hero__floater hb-hero__floater--${i}`} />
            ))}
          </div>

          <div className="hb-hero__content">
            <div className="hb-hero__top">
              <img
                className="hb-hero__avatar"
                src={userInfo.photo || "https://i.pravatar.cc/100?img=60"}
                alt="avatar"
              />

              <div className="hb-notif-wrap" ref={notifRef}>
                <button
                  className={`hb-notif-btn ${notifOpen ? "hb-notif-btn--open" : ""}`}
                  onClick={() => setNotifOpen(o => !o)}
                  aria-label="Notifications"
                >
                  <Icon.Bell width="19" height="19" />
                  {unreadCount > 0 && (
                    <span className="hb-notif-badge">{unreadCount}</span>
                  )}
                </button>

                {notifOpen && (
                  <div className="hb-notif-popup">
                    <div className="hb-notif-popup__head">
                      <span>Notifications</span>
                      {unreadCount > 0 && (
                        <button className="hb-notif-popup__mark" onClick={markAllRead}>Mark all read</button>
                      )}
                    </div>
                    <div className="hb-notif-popup__list">
                      {notifications.map(n => (
                        <div key={n.id} className={`hb-notif-item ${n.unread ? "hb-notif-item--unread" : ""}`}>
                          <span className="hb-notif-item__icon"><n.Icon width="17" height="17" /></span>
                          <div className="hb-notif-item__content">
                            <p className="hb-notif-item__text">{n.text}</p>
                            <span className="hb-notif-item__time">{n.time}</span>
                          </div>
                          {n.unread && <span className="hb-notif-item__dot" />}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <h1 className="hb-hero__title">Welcome back, {userInfo.name || "Sajan"}.</h1>
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

        {/* BOTTOM GRID */}
        <div className="hb-grid">

          {/* LEFT COLUMN */}
          <div className="hb-col-main">

            {/* RECENT POSTS */}
            <section className="hb-section">
              <div className="hb-section__head">
                <h2>Recent posts</h2>
                <a className="hb-link" href="#">View all <Icon.ArrowRight width="13" height="13" /></a>
              </div>
              <div className="hb-posts-list">
                {POSTS.map((p) => (
                  <article className="hb-post-row" key={p.id}>
                    <div className="hb-post-row__thumb">
                      <img src={p.image} alt={p.title} />
                      <span className="hb-post-row__tag">{p.tag}</span>
                    </div>
                    <div className="hb-post-row__body">
                      <h3 className="hb-post-row__title">{p.title}</h3>
                      <div className="hb-post-row__meta">
                        <span><Icon.Eye width="14" height="14" /> {p.views} views</span>
                        <span><Icon.Heart width="13" height="13" /> {p.likes}</span>
                        <span className="hb-post-row__date">{p.date}</span>
                      </div>
                    </div>
                    <button className="hb-post-row__action" aria-label="More options"><Icon.Dots width="20" height="6" /></button>
                  </article>
                ))}
              </div>
            </section>

            {/* SUPPORTERS */}
            <section className="hb-section">
              <div className="hb-section__head">
                <h2>Super supporters</h2>
                <a className="hb-link" href="#">See all <Icon.ArrowRight width="13" height="13" /></a>
              </div>
              <div className="hb-supporters-row">
                {SUPPORTERS.map((s) => (
                  <div className="hb-supporter-chip" key={s.id}>
                    <img src={s.avatar} alt={s.name} />
                    <div>
                      <p className="hb-supporter-chip__name">{s.name}</p>
                      <p className="hb-supporter-chip__since">{s.since}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* RIGHT COLUMN */}
          <div className="hb-col-side">

            {/* EARNINGS */}
            <div className="hb-earnings-card">
              <p className="hb-earnings-card__label">This month</p>
              <h2 className="hb-earnings-card__amount">Rs 12,500</h2>
              <p className="hb-earnings-card__trend"><Icon.TrendUp width="14" height="14" /> Up from last month</p>
              <div className="hb-progress">
                <div className="hb-progress__fill" style={{ width: `${progress}%` }} />
              </div>
              <p className="hb-earnings-card__hint">78% of your monthly goal</p>
            </div>

            {/* QUICK ACTIONS */}
            <div className="hb-quick-actions">
              {QUICK_ACTIONS.map((q) => (
                <button key={q.id} className={`hb-quick-card hb-quick-card--${q.tone}`}>
                  <span className="hb-quick-card__icon"><q.Icon width="18" height="18" /></span>
                  <span className="hb-quick-card__title">{q.title}</span>
                </button>
              ))}
            </div>

            {/* MOTIVATION */}
            <div className="hb-motivation">
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
                <h3 className="hb-motivation__title">Consistency builds communities.</h3>
                <p className="hb-motivation__body">Post regularly to keep supporters engaged.</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}