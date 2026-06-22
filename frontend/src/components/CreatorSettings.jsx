import React, { useState, useRef } from 'react';
import '../styles/CreatorSettings.css';

const CATEGORIES = [
  'Music', 'Art', 'Tech', 'Gaming', 'Fitness',
  'Comedy', 'Education', 'Cooking', 'Sports', 'Lifestyle', 'Other',
];

const FLOATERS = ['✦', '◈', '◉', '✧', '⊹', '◆', '✶', '⋆'];

// Fixed subscription tiers — name & description locked, only price is editable
const TIER_DEFAULTS = [
  {
    id: 'supporter',
    name: 'Supporter',
    description: 'For fans who want to show love.',
    benefits: ['Exclusive updates', 'Shoutout in posts'],
    defaultPrice: '99',
  },
  {
    id: 'member',
    name: 'Member',
    description: 'For those who want to go deeper.',
    benefits: ['Everything in Supporter', 'Early access to content', 'Behind-the-scenes posts'],
    defaultPrice: '299',
  },
  {
    id: 'vip',
    name: 'VIP',
    description: 'The full creator experience.',
    benefits: ['Everything in Member', 'Monthly 1-on-1 message', 'Exclusive VIP badge'],
    defaultPrice: '799',
  },
];

function FloatingField() {
  return (
    <div className="cs-float-field" aria-hidden="true">
      {Array.from({ length: 9 }).map((_, i) => (
        <span key={i} className={`cs-floater cs-floater-${i}`}>
          {FLOATERS[i % FLOATERS.length]}
        </span>
      ))}
    </div>
  );
}

function SectionCard({ title, subtitle, icon, children }) {
  return (
    <section className="cs-card">
      <div className="cs-card-header">
        {icon && <span className="cs-card-icon" aria-hidden="true">{icon}</span>}
        <div>
          <h2 className="cs-card-title">{title}</h2>
          {subtitle && <p className="cs-card-subtitle">{subtitle}</p>}
        </div>
      </div>
      <div className="cs-card-body">{children}</div>
    </section>
  );
}

function Field({ label, hint, children, required }) {
  return (
    <div className="cs-field">
      <label className="cs-label">
        {label}
        {required && <span className="cs-required" aria-hidden="true"> *</span>}
      </label>
      {hint && <p className="cs-hint">{hint}</p>}
      {children}
    </div>
  );
}

// eSewa verified badge (green)
function EsewaVerifiedBadge() {
  return (
    <span className="cs-verified-badge cs-verified-esewa" aria-label="eSewa Verified">
      <svg width="10" height="10" viewBox="0 0 24 24" fill="none"
        stroke="#fff" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polyline points="20 6 9 17 4 12" />
      </svg>
      eSewa
    </span>
  );
}

// Khalti verified badge (purple)
function KhaltiVerifiedBadge() {
  return (
    <span className="cs-verified-badge cs-verified-khalti" aria-label="Khalti Verified">
      <svg width="10" height="10" viewBox="0 0 24 24" fill="none"
        stroke="#fff" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polyline points="20 6 9 17 4 12" />
      </svg>
      Khalti
    </span>
  );
}

function TierCard({ tier, price, onPriceChange }) {
  const tierColors = {
    supporter: { accent: '#FF6B35', tint: '#FFF1EB' },
    member:    { accent: '#1E3A5F', tint: '#EBF0F7' },
    vip:       { accent: '#7C3AED', tint: '#F5F3FF' },
  };
  const colors = tierColors[tier.id];

  return (
    <div className="cs-tier-card" style={{ '--tier-accent': colors.accent, '--tier-tint': colors.tint }}>
      <div className="cs-tier-stripe" />
      <div className="cs-tier-top">
        <div>
          <p className="cs-tier-name">{tier.name}</p>
          <p className="cs-tier-desc">{tier.description}</p>
        </div>
        <div className="cs-tier-price-edit">
          <span className="cs-tier-rs">Rs</span>
          <input
            className="cs-tier-price-input"
            type="number"
            min="10"
            value={price}
            onChange={e => onPriceChange(e.target.value)}
            aria-label={`Price for ${tier.name}`}
          />
          <span className="cs-tier-period">/mo</span>
        </div>
      </div>
      <ul className="cs-tier-benefits">
        {tier.benefits.map((b, i) => (
          <li key={i}>
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <polyline points="20 6 9 17 4 12" />
            </svg>
            {b}
          </li>
        ))}
      </ul>
      <p className="cs-tier-locked-note">
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <rect x="3" y="11" width="18" height="11" rx="2" />
          <path d="M7 11V7a5 5 0 0110 0v4" />
        </svg>
        Name &amp; perks are set by HamroBhet
      </p>
    </div>
  );
}

export default function CreatorSettings() {
  const fileRef = useRef(null);

  const [avatarSrc, setAvatarSrc] = useState(null);
  const [avatarInitial, setAvatarInitial] = useState('C');

  const [profile, setProfile] = useState({
    name: '',
    username: '',
    category: '',
    bio: '',
  });

  // Tier prices only (name/desc/benefits are locked)
  const [tierPrices, setTierPrices] = useState(
    Object.fromEntries(TIER_DEFAULTS.map(t => [t.id, t.defaultPrice]))
  );

  const [payment, setPayment] = useState({
    esewaId: '',
    khaltiNumber: '',
  });

  const [saved, setSaved] = useState(false);

  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setAvatarSrc(url);
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2400);
  };

  return (
    <div className="cs-page">
      <FloatingField />
      <div className="cs-blob cs-blob-a" aria-hidden="true" />
      <div className="cs-blob cs-blob-b" aria-hidden="true" />
      <div className="cs-blob cs-blob-c" aria-hidden="true" />

      <div className="cs-container">

        {/* ── PAGE HEADER ── */}
        <header className="cs-page-header">
          <div className="cs-page-header-text">
            <h1 className="cs-page-title">Creator Settings</h1>
            <p className="cs-page-subtitle">Customize your creator space on HamroBhet.</p>
          </div>
          <button
            className={`cs-save-btn cs-save-btn--desktop${saved ? ' cs-save-btn--saved' : ''}`}
            onClick={handleSave}
          >
            {saved ? (
              <>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                Saved
              </>
            ) : 'Save changes'}
          </button>
        </header>

        {/* ── PROFILE ── */}
        <SectionCard
          title="Profile"
          subtitle="How creators and supporters see you."
          icon={
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="12" cy="8" r="4" />
              <path d="M4 20c1.3-4 4.7-6 8-6s6.7 2 8 6" />
            </svg>
          }
        >
          <div className="cs-avatar-row">
            <div className="cs-avatar-wrap">
              {avatarSrc
                ? <img src={avatarSrc} alt="Profile" className="cs-avatar-img" />
                : <div className="cs-avatar-placeholder">{avatarInitial}</div>
              }
              <button
                className="cs-avatar-upload-btn"
                onClick={() => fileRef.current?.click()}
                aria-label="Upload profile image"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                  <polyline points="17 8 12 3 7 8" />
                  <line x1="12" y1="3" x2="12" y2="15" />
                </svg>
              </button>
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                className="cs-hidden-input"
                onChange={handleAvatarChange}
                aria-hidden="true"
                tabIndex={-1}
              />
            </div>
            <div className="cs-avatar-meta">
              <p className="cs-avatar-tip">JPG or PNG. Max 5 MB.</p>
              <button className="cs-text-btn" onClick={() => fileRef.current?.click()}>
                Change photo
              </button>
            </div>
          </div>

          <div className="cs-fields-grid">
            <Field label="Creator name" required>
              <input
                className="cs-input"
                type="text"
                placeholder="Your display name"
                value={profile.name}
                onChange={e => {
                  setProfile(p => ({ ...p, name: e.target.value }));
                  setAvatarInitial(e.target.value.charAt(0).toUpperCase() || 'C');
                }}
              />
            </Field>

            <Field label="Username" required>
              {/* Fixed: prefix is part of the input styling, not an absolute-positioned span */}
              <div className="cs-username-wrap">
                <div className="cs-username-at">@</div>
                <input
                  className="cs-input cs-input--username"
                  type="text"
                  placeholder="yourname"
                  value={profile.username}
                  onChange={e => setProfile(p => ({ ...p, username: e.target.value }))}
                />
              </div>
            </Field>
          </div>

          <Field label="Category">
            <select
              className="cs-select"
              value={profile.category}
              onChange={e => setProfile(p => ({ ...p, category: e.target.value }))}
            >
              <option value="">Select a category…</option>
              {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </Field>

          <Field label="Bio" hint="Tell supporters what you create. Shown on your profile page.">
            <textarea
              className="cs-textarea"
              rows={4}
              placeholder="I make music, share stories, and build things…"
              value={profile.bio}
              onChange={e => setProfile(p => ({ ...p, bio: e.target.value }))}
              maxLength={300}
            />
            <span className="cs-char-count">{profile.bio.length} / 300</span>
          </Field>
        </SectionCard>

        {/* ── SUBSCRIPTION TIERS ── */}
        <SectionCard
          title="Subscription Tiers"
          subtitle="Set your monthly price for each tier. Names and perks are fixed by HamroBhet."
          icon={
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z" />
            </svg>
          }
        >
          <div className="cs-tiers-grid">
            {TIER_DEFAULTS.map(tier => (
              <TierCard
                key={tier.id}
                tier={tier}
                price={tierPrices[tier.id]}
                onPriceChange={val => setTierPrices(p => ({ ...p, [tier.id]: val }))}
              />
            ))}
          </div>
        </SectionCard>

        {/* ── PAYMENT ── */}
        <SectionCard
          title="Payment & Payout"
          subtitle="Connect your payment accounts to receive supporter funds."
          icon={
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <rect x="2" y="5" width="20" height="14" rx="2.5" />
              <path d="M2 10h20" />
            </svg>
          }
        >
          <div className="cs-fields-grid">
            {/* eSewa field */}
            <Field label="eSewa ID" hint="Your eSewa-registered phone or email">
              <div className="cs-payment-field-wrap">
                <div className="cs-payment-icon cs-esewa-icon" aria-hidden="true">
                  <span>e</span>
                </div>
                <input
                  className="cs-input cs-input--payment"
                  type="text"
                  placeholder="98XXXXXXXX or email"
                  value={payment.esewaId}
                  onChange={e => setPayment(p => ({ ...p, esewaId: e.target.value }))}
                />
                {payment.esewaId && <EsewaVerifiedBadge />}
              </div>
            </Field>

            {/* Khalti field */}
            <Field label="Khalti number" hint="Your Khalti-registered phone number">
              <div className="cs-payment-field-wrap">
                <div className="cs-payment-icon cs-khalti-icon" aria-hidden="true">
                  <span>K</span>
                </div>
                <input
                  className="cs-input cs-input--payment"
                  type="tel"
                  placeholder="98XXXXXXXX"
                  value={payment.khaltiNumber}
                  onChange={e => setPayment(p => ({ ...p, khaltiNumber: e.target.value }))}
                />
                {payment.khaltiNumber && <KhaltiVerifiedBadge />}
              </div>
            </Field>
          </div>

          <div className="cs-payout-info">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            Payouts are processed every 7 days. Minimum payout threshold is Rs 500.
          </div>
        </SectionCard>

        {/* ── ACCOUNT ── */}
        <SectionCard
          title="Account"
          subtitle="Manage your account access and data."
          icon={
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="12" cy="12" r="3" />
              <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" />
            </svg>
          }
        >
          <div className="cs-account-actions">
            <div className="cs-account-action">
              <div className="cs-account-action-info">
                <span className="cs-account-action-title">Sign out</span>
                <span className="cs-account-action-desc">Sign out of your creator account on this device.</span>
              </div>
              <button className="cs-logout-btn" type="button">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" />
                  <polyline points="16 17 21 12 16 7" />
                  <line x1="21" y1="12" x2="9" y2="12" />
                </svg>
                Logout
              </button>
            </div>

            <div className="cs-account-divider" />

            <div className="cs-account-action">
              <div className="cs-account-action-info">
                <span className="cs-account-action-title cs-danger-text">Delete account</span>
                <span className="cs-account-action-desc">
                  Permanently remove your creator page, posts, and all subscriber data. This cannot be undone.
                </span>
              </div>
              <button className="cs-delete-btn" type="button">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <polyline points="3 6 5 6 21 6" />
                  <path d="M19 6l-1 14H6L5 6" />
                  <path d="M10 11v6M14 11v6" />
                  <path d="M9 6V4h6v2" />
                </svg>
                Delete account
              </button>
            </div>
          </div>
        </SectionCard>

      </div>

      {/* ── STICKY MOBILE SAVE ── */}
      <div className="cs-mobile-save-bar">
        <button
          className={`cs-save-btn cs-save-btn--mobile${saved ? ' cs-save-btn--saved' : ''}`}
          onClick={handleSave}
        >
          {saved ? '✓  Saved' : 'Save changes'}
        </button>
      </div>
    </div>
  );
}