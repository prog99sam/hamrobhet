import React, { useState, useRef, useMemo } from "react";
import "../styles/CreatorSignup.css";

const CATEGORIES = [
  "Art",
  "Music",
  "Tech",
  "Education",
  "Gaming",
  "Sports",
  "Comedy",
  "Fitness",
];

const DEFAULT_TIERS = [
  { id: "tier-1", name: "Supporter", price: "100" },
  { id: "tier-2", name: "Fan", price: "250" },
  { id: "tier-3", name: "Super Fan", price: "500" },
];

const BENEFITS = [
  {
    title: "Monthly recurring income",
    body: "Get paid by supporters every month, automatically.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M3 12h4l3 8 4-16 3 8h4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "Own your audience",
    body: "Your supporters belong to you, not an algorithm.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <circle cx="12" cy="8" r="3.4" />
        <path d="M5 20c0-3.9 3.1-6 7-6s7 2.1 7 6" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Get paid in Nepal",
    body: "Local payouts, in your currency, with no detours.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M4 19V8l8-4 8 4v11" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M9 19v-6h6v6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

export default function CreatorSignup() {
  const [displayName, setDisplayName] = useState("");
  const [username, setUsername] = useState("");
  const [category, setCategory] = useState("");
  const [bio, setBio] = useState("");
  const [photo, setPhoto] = useState(null);
  const [tiers, setTiers] = useState(DEFAULT_TIERS);
  const fileInputRef = useRef(null);

  const cleanUsername = useMemo(
    () => username.trim().toLowerCase().replace(/[^a-z0-9_]/g, ""),
    [username]
  );

  function handlePhotoChange(e) {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setPhoto(reader.result);
    reader.readAsDataURL(file);
  }

  function updateTier(id, field, value) {
    setTiers((prev) =>
      prev.map((t) => (t.id === id ? { ...t, [field]: value } : t))
    );
  }

  function handlePriceChange(id, raw) {
    // Allow digits only, so creators can type freely without odd characters.
    const cleaned = raw.replace(/[^0-9]/g, "");
    updateTier(id, "price", cleaned);
  }

  function handleLaunch(e) {
    e.preventDefault();
    // Placeholder submit handler — wire to backend as needed.
  }

  const previewName = displayName.trim() || "Your name";
  const previewUsername = cleanUsername || "username";
  const previewBio = bio.trim() || "Tell supporters about yourself.";

  return (
    <div className="cs-page">
      <div className="cs-shell">
        {/* LEFT — motivational panel */}
        <aside className="cs-pitch">
          <div className="cs-pitch__skyline" aria-hidden="true">
            <svg viewBox="0 0 400 120" preserveAspectRatio="none">
              <polyline
                className="cs-pitch__skyline-path"
                points="0,100 60,100 95,40 130,85 170,20 205,90 240,55 280,95 320,30 360,75 400,60"
                fill="none"
              />
            </svg>
          </div>

          <span className="cs-badge">Become a Creator</span>

          <h1 className="cs-pitch__heading">
            Start earning directly from your audience.
          </h1>

          <p className="cs-pitch__sub">
            Build a community, share your work, and receive monthly support
            from your supporters.
          </p>

          <ul className="cs-benefits">
            {BENEFITS.map((b) => (
              <li className="cs-benefit-card" key={b.title}>
                <span className="cs-benefit-card__icon">{b.icon}</span>
                <div>
                  <p className="cs-benefit-card__title">{b.title}</p>
                  <p className="cs-benefit-card__body">{b.body}</p>
                </div>
              </li>
            ))}
          </ul>

          <p className="cs-pitch__footnote">
            Creators keep ownership of their content.
          </p>
        </aside>

        {/* RIGHT — onboarding card */}
        <main className="cs-card">
          <header className="cs-card__header">
            <h2>Create your creator page</h2>
            <p>It only takes a few minutes.</p>
          </header>

          <form className="cs-form" onSubmit={handleLaunch}>
            <div className="cs-field">
              <label htmlFor="displayName">Display name</label>
              <input
                id="displayName"
                type="text"
                placeholder="e.g. Sujata Studio"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
              />
            </div>

            <div className="cs-field">
              <label htmlFor="username">Username</label>
              <input
                id="username"
                type="text"
                placeholder="sujatastudio"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <span className="cs-field__hint">
                hamrobhet.com/@{previewUsername}
              </span>
            </div>

            <div className="cs-field">
              <label htmlFor="category">Category</label>
              <select
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="" disabled>
                  Choose a category
                </option>
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <div className="cs-field">
              <label htmlFor="bio">Short bio</label>
              <textarea
                id="bio"
                rows={3}
                placeholder="Tell supporters about yourself."
                value={bio}
                onChange={(e) => setBio(e.target.value)}
              />
            </div>

            <div className="cs-field">
              <label>Profile picture</label>
              <div className="cs-upload">
                <button
                  type="button"
                  className="cs-upload__circle"
                  onClick={() => fileInputRef.current?.click()}
                  aria-label="Upload profile picture"
                >
                  {photo ? (
                    <img src={photo} alt="Profile preview" />
                  ) : (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                      <path d="M12 16V4M12 4l-4 4M12 4l4 4" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M4 16v3a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-3" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="cs-upload__input"
                  onChange={handlePhotoChange}
                />
                <span className="cs-field__hint">PNG or JPG, square works best.</span>
              </div>
            </div>

            <div className="cs-field">
              <label>Subscription tiers</label>
              <span className="cs-field__hint cs-field__hint--top">
                Set up to three tiers. Supporters will pick the one that
                fits them.
              </span>
              <div className="cs-price-grid">
                {tiers.map((tier) => (
                  <div className="cs-price-card" key={tier.id}>
                    <span className="cs-price-card__name">{tier.name}</span>
                    <div className="cs-price-card__amount-row">
                      <span className="cs-price-card__currency">Rs</span>
                      <input
                        type="text"
                        inputMode="numeric"
                        className="cs-price-card__price-input"
                        placeholder="0"
                        value={tier.price}
                        onChange={(e) =>
                          handlePriceChange(tier.id, e.target.value)
                        }
                      />
                      <span className="cs-price-card__period">/mo</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Live preview */}
            <div className="cs-field">
              <label>Live preview</label>
              <div className="cs-preview-card">
                <div className="cs-preview-card__avatar">
                  {photo ? (
                    <img src={photo} alt="" />
                  ) : (
                    <span>{previewName.charAt(0).toUpperCase()}</span>
                  )}
                </div>
                <div className="cs-preview-card__body">
                  <p className="cs-preview-card__name">{previewName}</p>
                  <p className="cs-preview-card__username">@{previewUsername}</p>
                  <p className="cs-preview-card__bio">{previewBio}</p>
                  <div className="cs-preview-card__meta">
                    {category && (
                      <span className="cs-preview-card__category">{category}</span>
                    )}
                  </div>
                  <div className="cs-preview-card__tiers">
                    {tiers.map((tier) => (
                      <span className="cs-preview-card__tier-chip" key={tier.id}>
                        {tier.name.trim() || "Tier"}
                        <strong>Rs {tier.price || 0}/mo</strong>
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <button type="submit" className="cs-launch-btn">
              Launch Creator Page
            </button>
          </form>
        </main>
      </div>
    </div>
  );
}