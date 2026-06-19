import React, { useRef, useState } from "react";
import "../styles/Explore.css";

/* ----------------------------------------------------------------
   Sample data — swap these out for real API data when wiring up
   ---------------------------------------------------------------- */
const CATEGORIES = [
  { id: "sports", name: "Sports", img: "https://picsum.photos/seed/cat-sports/300/360" },
  { id: "music", name: "Music", img: "https://picsum.photos/seed/cat-music/300/360" },
  { id: "gaming", name: "Gaming", img: "https://picsum.photos/seed/cat-gaming/300/360" },
  { id: "education", name: "Education", img: "https://picsum.photos/seed/cat-education/300/360" },
  { id: "art", name: "Art", img: "https://picsum.photos/seed/cat-art/300/360" },
  { id: "tech", name: "Tech", img: "https://picsum.photos/seed/cat-tech/300/360" },
  { id: "comedy", name: "Comedy", img: "https://picsum.photos/seed/cat-comedy/300/360" },
  { id: "fitness", name: "Fitness", img: "https://picsum.photos/seed/cat-fitness/300/360" },
];

const FREQUENTLY_INTERACTED = [
  { id: "fi1", username: "sita.creates", img: "https://picsum.photos/seed/sita/120/120" },
  { id: "fi2", username: "raj_gaming", img: "https://picsum.photos/seed/raj/120/120" },
  { id: "fi3", username: "anu.art", img: "https://picsum.photos/seed/anu/120/120" },
  { id: "fi4", username: "bibek_beats", img: "https://picsum.photos/seed/bibek/120/120" },
  { id: "fi5", username: "maya.codes", img: "https://picsum.photos/seed/maya/120/120" },
  { id: "fi6", username: "suman_fit", img: "https://picsum.photos/seed/suman/120/120" },
  { id: "fi7", username: "kabita.vlogs", img: "https://picsum.photos/seed/kabita/120/120" },
  { id: "fi8", username: "prakash_fc", img: "https://picsum.photos/seed/prakash/120/120" },
];

const CREATORS_FOR_YOU = [
  { id: "cfy1", username: "nirmala.dance", img: "https://picsum.photos/seed/nirmala/480/640" },
  { id: "cfy2", username: "dipesh_drone", img: "https://picsum.photos/seed/dipesh/480/640" },
  { id: "cfy3", username: "sunita.kitchen", img: "https://picsum.photos/seed/sunita/480/640" },
  { id: "cfy4", username: "aayush_climbs", img: "https://picsum.photos/seed/aayush/480/640" },
  { id: "cfy5", username: "rita.paints", img: "https://picsum.photos/seed/rita/480/640" },
  { id: "cfy6", username: "bishal_beats", img: "https://picsum.photos/seed/bishal/480/640" },
  { id: "cfy7", username: "sarita.stories", img: "https://picsum.photos/seed/sarita/480/640" },
  { id: "cfy8", username: "manish_moto", img: "https://picsum.photos/seed/manish/480/640" },
];

const TOP_CREATORS = [
  { id: "tc1", username: "pooja.lens", img: "https://picsum.photos/seed/pooja/400/300", stat: "12.4k" },
  { id: "tc2", username: "rohan_riffs", img: "https://picsum.photos/seed/rohan/400/300", stat: "9.8k" },
  { id: "tc3", username: "ashma.edits", img: "https://picsum.photos/seed/ashma/400/300", stat: "21.1k" },
  { id: "tc4", username: "kiran_kicks", img: "https://picsum.photos/seed/kiran/400/300", stat: "7.2k" },
  { id: "tc5", username: "nabin.notes", img: "https://picsum.photos/seed/nabin/400/300", stat: "15.6k" },
  { id: "tc6", username: "shreya_sets", img: "https://picsum.photos/seed/shreya/400/300", stat: "18.9k" },
];

/* ----------------------------------------------------------------
   Component
   ---------------------------------------------------------------- */
export default function Explore() {
  const [searchValue, setSearchValue] = useState("");
  const [activeCategory, setActiveCategory] = useState(null);
  const carouselTrackRef = useRef(null);

  // Pause the infinite carousel on hover/focus, resume on leave.
  const pauseCarousel = () => {
    if (carouselTrackRef.current) {
      carouselTrackRef.current.style.animationPlayState = "paused";
    }
  };
  const resumeCarousel = () => {
    if (carouselTrackRef.current) {
      carouselTrackRef.current.style.animationPlayState = "running";
    }
  };

  // Duplicate the carousel items once so the CSS marquee can loop seamlessly.
  const loopedCreators = [...CREATORS_FOR_YOU, ...CREATORS_FOR_YOU];

  return (
    <div className="explore-page">
      <main className="explore-main">
        {/* ---------------- SEARCH BAR ---------------- */}
        <section className="explore-section explore-search-section">
          <div className="explore-search">
            <svg
              className="explore-search__icon"
              viewBox="0 0 24 24"
              width="18"
              height="18"
              aria-hidden="true"
            >
              <circle cx="11" cy="11" r="7" fill="none" stroke="currentColor" strokeWidth="2" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
            <input
              type="text"
              className="explore-search__input"
              placeholder="Search creators, music, gaming, sports..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              aria-label="Search creators and content"
            />
          </div>
        </section>

        {/* ---------------- FREQUENTLY INTERACTED ---------------- */}
        <section className="explore-section">
          <h2 className="explore-section__title">Frequently Interacted</h2>
          <div className="explore-freq__scroll">
            {FREQUENTLY_INTERACTED.map((creator) => (
              <button key={creator.id} className="explore-freq__card">
                <span className="explore-freq__avatar">
                  <img src={creator.img} alt="" loading="lazy" />
                </span>
                <span className="explore-freq__name">{creator.username}</span>
              </button>
            ))}
          </div>
        </section>

        {/* ---------------- CREATORS FOR YOU (auto-scrolling) ---------------- */}
        <section className="explore-section explore-cfy" aria-label="Creators for you">
          <h2 className="explore-section__title">Creators for You</h2>
          <div
            className="explore-cfy__viewport"
            onMouseEnter={pauseCarousel}
            onMouseLeave={resumeCarousel}
            onFocus={pauseCarousel}
            onBlur={resumeCarousel}
          >
            <div className="explore-cfy__track" ref={carouselTrackRef}>
              {loopedCreators.map((creator, i) => (
                <div className="explore-cfy__card" key={`${creator.id}-${i}`} tabIndex={0}>
                  <img src={creator.img} alt="" loading="lazy" />
                  <div className="explore-cfy__overlay" />
                  <span className="explore-cfy__name">{creator.username}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ---------------- CATEGORIES (image cards) ---------------- */}
        <section className="explore-section explore-categories" aria-label="Categories">
          <h2 className="explore-section__title">Categories</h2>
          <div className="explore-categories__scroll">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                className={`explore-catcard${activeCategory === cat.id ? " explore-catcard--active" : ""}`}
                onClick={() => setActiveCategory(activeCategory === cat.id ? null : cat.id)}
              >
                <span className="explore-catcard__imgwrap">
                  <img src={cat.img} alt="" loading="lazy" />
                </span>
                <span className="explore-catcard__name">{cat.name}</span>
              </button>
            ))}
          </div>
        </section>

        {/* ---------------- TOP CREATORS ---------------- */}
        <section className="explore-section">
          <h2 className="explore-section__title">Top Creators</h2>
          <div className="explore-top__grid">
            {TOP_CREATORS.map((creator) => (
              <button key={creator.id} className="explore-top__card">
                <span className="explore-top__imgwrap">
                  <img src={creator.img} alt="" loading="lazy" />
                </span>
                <span className="explore-top__meta">
                  <span className="explore-top__name">{creator.username}</span>
                  <span className="explore-top__stat">{creator.stat}</span>
                </span>
              </button>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}