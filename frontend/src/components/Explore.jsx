import React, { useRef, useState, useEffect } from "react";
import "../styles/Explore.css";

/* ----------------------------------------------------------------
   Sample data — swap these out for real API data when wiring up
   ---------------------------------------------------------------- */





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
  const [categories, setCategories] = useState([]);
  const [frequentlyInteracted, setFrequentlyInteracted] = useState([]);
  const [creators, setCreators] = useState([]);


  const fetchCategories = async()=>{
    try {
      const res = await fetch("http://127.0.0.1:8000/api/categories/");
      const data = await res.json();
      setCategories(data);
      console.log(data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  }

  const fetchCreatorsForYou = async()=>{
    try {
      const res = await fetch("http://127.0.0.1:8000/api/frequently-interacted/");
      const data = await res.json();
      setFrequentlyInteracted(data);
      console.log(data);
    } catch (error) {
      console.error("Error fetching frequently interacted:", error);
    }
  }

  const fetchCreators = async()=>{
    try {
      const res = await fetch("http://127.0.0.1:8000/api/creators/");
      const data = await res.json();
      setCreators(data);
      console.log(data);
    } catch (error) {
      console.error("Error fetching creators:", error);
    }
  }

  useEffect(() => {
    fetchCategories();
    fetchCreatorsForYou();
    fetchCreators();
  }, []);


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
            {frequentlyInteracted.map((creator, key) => (
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
              {creators.map((creator, i) => (
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
            {categories.map((cat) => (
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