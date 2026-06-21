import React, { useState, useEffect, useRef, useCallback } from "react";
import "../styles/CreatorProfile.css";
import { useParams } from "react-router-dom";

const PINNED_POST = {
  title: "Saanjh is finally finished — full track inside",
  preview:
    "Six months of late nights and this is the version I'm proud of. You're hearing it three weeks before anyone else. Thank you for sticking with me through every rough draft.",
  image:
    "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=1200&auto=format&fit=crop",
};

const POSTS = [
  {
    id: 1,
    date: "Today",
    title: "Studio Take 14 — the bridge finally clicked",
    text: "Spent four hours on eight bars before it landed. Sharing the rough take and the voice memo from the exact moment it came together.",
    image:
      "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=900&auto=format&fit=crop",
    likes: 342,
    comments: 28,
    badge: "exclusive",
  },
  {
    id: 2,
    date: "Yesterday",
    title: "Why I tuned my madal a quarter-step flat",
    text: "A short breakdown of the tuning choice behind the new single, with a side-by-side comparison so you can hear the difference.",
    image:
      "https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=900&auto=format&fit=crop",
    likes: 198,
    comments: 14,
    badge: "early access",
  },
  {
    id: 3,
    date: "3 days ago",
    title: "Q&A: what's next after Saanjh?",
    text: "Answering the most-asked question from last week's comments — plus a hint about the collaboration I've been hiding.",
    image:
      "https://images.unsplash.com/photo-1483412033650-1015ddeb83d1?q=80&w=900&auto=format&fit=crop",
    likes: 256,
    comments: 41,
    badge: null,
  },
];

const MEDIA = [
  {
    id: "m1",
    type: "video",
    title: "Behind the scenes: mixing day",
    thumb:
      "https://images.unsplash.com/photo-1598653222000-6b7b7a552625?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: "m2",
    type: "image",
    title: "Studio setup",
    thumb:
      "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: "m3",
    type: "video",
    title: "Soundcheck snippet",
    thumb:
      "https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: "m4",
    type: "image",
    title: "Balcony sunset session",
    thumb:
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=600&auto=format&fit=crop",
  },
];

const SUPPORTERS = [
  "https://i.pravatar.cc/100?img=12",
  "https://i.pravatar.cc/100?img=5",
  "https://i.pravatar.cc/100?img=33",
  "https://i.pravatar.cc/100?img=47",
  "https://i.pravatar.cc/100?img=19",
  "https://i.pravatar.cc/100?img=24",
];

const FLOATERS = ["♪", "♫", "✦", "❤", "♬", "✧"];

// SVG Icons
function HeartIcon({ filled }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} aria-hidden="true">
      <path d="M12 21s-7.2-4.6-10-9.1C0.3 8.3 1.8 4.5 5.4 3.6c2.1-0.5 4.2 0.4 5.5 2.2 1.3-1.8 3.4-2.7 5.5-2.2 3.6 0.9 5.1 4.7 3.4 8.3C19.2 16.4 12 21 12 21z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
    </svg>
  );
}
function CommentIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4 5h16v11H8l-4 4V5z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
    </svg>
  );
}
function ShareIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="18" cy="5" r="2.4" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="6" cy="12" r="2.4" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="18" cy="19" r="2.4" stroke="currentColor" strokeWidth="1.8" />
      <path d="M8.2 10.8 15.8 6.2M8.2 13.2l7.6 4.6" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}
if (typeof window !== "undefined") {
  // Suppress warnings
}
function MessageIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M21 11.5a8.5 8.5 0 0 1-12.4 7.55L4 20l1.05-4.3A8.5 8.5 0 1 1 21 11.5z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
    </svg>
  );
}
function PlayIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}
function SearchIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="search-icon">
      <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
      <path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
function CloseIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  );
}
function HomeIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4 11.5 12 4l8 7.5V20a1 1 0 0 1-1 1h-4v-6H9v6H5a1 1 0 0 1-1-1v-8.5z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
    </svg>
  );
}
function MediaIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="9" cy="10" r="1.6" stroke="currentColor" strokeWidth="1.6" />
      <path d="M5 17l4.5-4.5 3 3L18 10l3 3.5" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  );
}
function BellIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M6 10a6 6 0 1 1 12 0c0 4 1.5 5.5 1.5 5.5h-15S6 14 6 10z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M10 19a2 2 0 0 0 4 0" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}
function PersonIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="8" r="3.4" stroke="currentColor" strokeWidth="1.8" />
      <path d="M5 20c1.2-3.6 4-5.4 7-5.4s5.8 1.8 7 5.4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function FloatingField() {
  const items = Array.from({ length: 10 });
  return (
    <div className="floating-field" aria-hidden="true">
      {items.map((_, i) => (
        <span key={i} className={`floater floater-${i}`}>
          {FLOATERS[i % FLOATERS.length]}
        </span>
      ))}
    </div>
  );
}

// 1. FIXED: Moved PostCard component layout entirely OUTSIDE of parent block
function PostCard({ post, creatorInfo }) {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likes);

  const toggleLike = () => {
    setLiked((v) => !v);
    setLikeCount((c) => (liked ? c - 1 : c + 1));
  };

  return (
    <article className="feed-post">
      <header className="feed-post-head">
        {/* Adjusted fallback strategies for your API keys here */}
        <img src={creatorInfo?.image_url || creatorInfo?.avatarSmall || "https://i.pravatar.cc/100"} alt="" className="feed-post-avatar" />
        <div className="feed-post-meta">
          <span className="feed-post-name">{creatorInfo?.display_name || creatorInfo?.name || "Creator"}</span>
          <span className="feed-post-date">{post.date}</span>
        </div>
        {post.badge && (
          <span className={`badge badge--${post.badge === "exclusive" ? "exclusive" : "early"}`}>
            {post.badge === "exclusive" ? "Exclusive" : "Early access"}
          </span>
        )}
      </header>

      <h3 className="feed-post-title">{post.title}</h3>
      <p className="feed-post-text">{post.text}</p>

      <div className="feed-post-image-wrap">
        <img src={post.image} alt="" className="feed-post-image" loading="lazy" />
      </div>

      <div className="feed-post-actions">
        <button className={`action-btn ${liked ? "liked" : ""}`} onClick={toggleLike} aria-pressed={liked}>
          <HeartIcon filled={liked} />
          <span>{likeCount}</span>
        </button>
        <button className="action-btn">
          <CommentIcon />
          <span>{post.comments}</span>
        </button>
      </div>
    </article>
  );
}

export default function MemberFeed() {
  const [messaged, setMessaged] = useState(false);
  const [shared, setShared] = useState(false);
  const [activeNav, setActiveNav] = useState("home");
  const [query, setQuery] = useState("");
  const searchRef = useRef(null);
  const [creatorInfo, setCreatorInfo] = useState(null);
  const { username } = useParams();

  // 2. FIXED: Wired up API initialization hook routine cleanly inside a unified lifecycle observer
  useEffect(() => {
    const fetchCreatorInfo = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/creators/${username}/`);
        const data = await response.json();
        console.log(data)
        setCreatorInfo(data);
      } catch (err) {
        console.error("Failed to fetch creator info:", err);
      }
    };

    if (username) {
      fetchCreatorInfo();
    }
  }, [username]);

  useEffect(() => {
    if (!shared) return;
    const t = setTimeout(() => setShared(false), 1800);
    return () => clearTimeout(t);
  }, [shared]);

  useEffect(() => {
    if (!messaged) return;
    const t = setTimeout(() => setMessaged(false), 1800);
    return () => clearTimeout(t);
  }, [messaged]);

  useEffect(() => {
    const handler = (e) => {
      if (e.key === "/" && document.activeElement !== searchRef.current) {
        e.preventDefault();
        searchRef.current?.focus();
      }
      if (e.key === "Escape" && document.activeElement === searchRef.current) {
        setQuery("");
        searchRef.current?.blur();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const clearSearch = useCallback(() => {
    setQuery("");
    searchRef.current?.focus();
  }, []);

  const q = query.trim().toLowerCase();
  const filteredPosts = q
    ? POSTS.filter((p) => p.title.toLowerCase().includes(q) || p.text.toLowerCase().includes(q))
    : POSTS;
  const filteredMedia = q ? MEDIA.filter((m) => m.title.toLowerCase().includes(q)) : MEDIA;

  return (
    <div className="mf-page">
      <FloatingField />
      <div className="ambient-blob blob-a" aria-hidden="true" />
      <div className="ambient-blob blob-b" aria-hidden="true" />
      <div className="ambient-blob blob-c" aria-hidden="true" />

      {/* ───────── HERO: large creator photo ───────── */}
      <header className="hero-cover">
        <div className="hero-photo-wrap">
          {/* 3. FIXED: Added fallback fields matching backend properties like image_url */}
          <img src={creatorInfo?.img || creatorInfo?.cover || "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f"} alt={creatorInfo?.display_name} className="hero-photo" />
          <div className="hero-scrim" />
          <span className="hero-supporter-chip">
            <span className="dot" /> Supporting since {creatorInfo?.supportingSince || "2026"}
          </span>
          <div className="hero-text">
            <span className="hero-category">{creatorInfo?.category || "Artist"}</span>
            <h1 className="hero-name">{creatorInfo?.display_name || creatorInfo?.name || username}</h1>
            <p className="hero-handle">@{creatorInfo?.username || username}</p>
          </div>
        </div>

        <div className="hero-actions">
          <button className="glass-btn" onClick={() => setShared(true)}>
            <ShareIcon />
            {shared ? "Copied" : "Share"}
          </button>
          <button className="glass-btn glass-btn--accent" onClick={() => setMessaged(true)}>
            <MessageIcon />
            {messaged ? "Sent" : "Message"}
          </button>
        </div>

        <p className="welcome-msg">Welcome back to the community.</p>

        {/* ───────── SEARCH BAR ───────── */}
        <div className="search-bar-wrap">
          <div className="search-bar">
            <SearchIcon />
            <input
              ref={searchRef}
              type="text"
              className="search-input"
              placeholder={`Search ${creatorInfo?.display_name || creatorInfo?.name || "creator"}'s posts and media…`}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              aria-label="Search posts and media"
            />
            <button
              type="button"
              className={`search-clear ${query ? "show" : ""}`}
              onClick={clearSearch}
              aria-label="Clear search"
              tabIndex={query ? 0 : -1}
            >
              <CloseIcon />
            </button>
            {!query && <span className="search-kbd">/</span>}
          </div>
        </div>
      </header>

      <div className="mf-container">
        {/* ───────── PINNED POST ───────── */}
        <section className="pinned-post">
          <span className="pinned-badge">📌 Pinned</span>
          <div className="pinned-image-wrap">
            <img src={PINNED_POST.image} alt="" className="pinned-image" />
          </div>
          <div className="pinned-body">
            <h2 className="pinned-title">{PINNED_POST.title}</h2>
            <p className="pinned-preview">{PINNED_POST.preview}</p>
          </div>
        </section>

        {/* ───────── MEDIA SECTION ───────── */}
        {filteredMedia.length > 0 && (
          <section className="media-section">
            <h2 className="section-title">Media</h2>
            <div className="media-row">
              {filteredMedia.map((m) => (
                <div key={m.id} className="media-card">
                  <img src={m.thumb} alt="" className="media-thumb" loading="lazy" />
                  {m.type === "video" && (
                    <span className="media-play">
                      <PlayIcon />
                    </span>
                  )}
                  <span className="media-title">{m.title}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ───────── POST FEED ───────── */}
        <section className="feed-section">
          {/* 4. FIXED: Added optional chaining here so it doesn't crash while loading */}
          <h2 className="section-title">Latest from {creatorInfo?.display_name || creatorInfo?.name || username}</h2>
          <div className="feed-list">
            {filteredPosts.length === 0 ? (
              <p className="feed-post-text">No posts match "{query}".</p>
            ) : (
              filteredPosts.map((post) => <PostCard key={post.id} post={post} creatorInfo={creatorInfo} />)
            )}
          </div>
        </section>

        {/* ───────── COMMUNITY ───────── */}
        <section className="community-section">
          <div className="community-card">
            <div className="overlap-avatars">
              {SUPPORTERS.map((src, i) => (
                <img src={src} alt="" key={i} className="overlap-avatar" style={{ zIndex: SUPPORTERS.length - i }} />
              ))}
              {/* 5. FIXED: Guarded calculations with optional chaining defaults */}
              <span className="overlap-more">+{Math.max(0, (creatorInfo?.supporterCount || 0) - SUPPORTERS.length)}</span>
            </div>
            <p className="community-text">
              <strong>{creatorInfo?.supporterCount || 0}</strong> people support this creator.
            </p>
          </div>
        </section>
      </div>

      {/* ───────── STICKY MOBILE NAV ───────── */}
      <nav className="mobile-nav">
        <button className={`nav-btn ${activeNav === "home" ? "active" : ""}`} onClick={() => setActiveNav("home")}>
          <HomeIcon />
          <span>Feed</span>
        </button>
        <button className={`nav-btn ${activeNav === "media" ? "active" : ""}`} onClick={() => setActiveNav("media")}>
          <MediaIcon />
          <span>Media</span>
        </button>
        <button className={`nav-btn ${activeNav === "activity" ? "active" : ""}`} onClick={() => setActiveNav("activity")}>
          <BellIcon />
          <span>Activity</span>
        </button>
        <button className={`nav-btn ${activeNav === "profile" ? "active" : ""}`} onClick={() => setActiveNav("profile")}>
          <PersonIcon />
          <span>Creator</span>
        </button>
      </nav>
    </div>
  );
}