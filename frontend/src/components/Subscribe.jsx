import React, { useState, useMemo, useEffect } from 'react';
import '../styles/Subscribe.css';
import { useParams } from 'react-router-dom';

const PAYMENT_METHODS = [
  { id: 'esewa',   label: 'eSewa',   hint: 'Enter the phone number linked to your eSewa account' },
  { id: 'khalti',  label: 'Khalti',  hint: 'Enter the phone number linked to your Khalti account' },
  { id: 'fonepay', label: 'Fonepay', hint: 'Enter your Fonepay-registered phone number' },
  { id: 'card',    label: 'Card',    hint: 'Enter the phone number for payment confirmation', muted: true },
];

const PLAN_META = {
  supporter: {
    color: 'orange',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z" />
      </svg>
    ),
  },
  fan: {
    color: 'blue',
    popular: true,
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    ),
  },
  super_fan: {
    color: 'purple',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#7C3AED" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ),
  },
};

const PaymentIcon = ({ method }) => {
  switch (method) {
    case 'esewa':
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <circle cx="12" cy="12" r="11" fill="#60BB46" />
          <path d="M7 12.5l3 3 7-7" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case 'khalti':
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <circle cx="12" cy="12" r="11" fill="#5C2D91" />
          <path d="M8 7v10M8 12h4.5a3 3 0 100-6H8" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case 'fonepay':
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <circle cx="12" cy="12" r="11" fill="#7C3AED" />
          <rect x="9" y="6" width="6" height="12" rx="1.5" stroke="#fff" strokeWidth="1.6" />
          <circle cx="12" cy="15.3" r="0.8" fill="#fff" />
        </svg>
      );
    case 'card':
    default:
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <rect x="2" y="5" width="20" height="14" rx="2.5" stroke="#9CA3AF" strokeWidth="1.7" />
          <path d="M2 9.5h20" stroke="#9CA3AF" strokeWidth="1.7" />
        </svg>
      );
  }
};

const CheckIcon = () => (
  <svg className="check-icon" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const ShieldCheck = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 2l8 4v6c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6l8-4z" />
    <path d="M9 12l2 2 4-4" />
  </svg>
);

const PhoneIcon = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.8 19.79 19.79 0 01.1 2.18 2 2 0 012.08 0h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.59 7.68a16 16 0 006.73 6.73l1.06-.98a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 15.92z" />
  </svg>
);

export default function Subscribe({ onSubscribe }) {
  const { username } = useParams();
  const [data, setData]               = useState(null);
  const [plans, setPlans]             = useState([]);
  const [loading, setLoading]         = useState(true);
  const [selectedPlan, setSelectedPlan]       = useState('supporter');
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [phone, setPhone]             = useState('');

  const userData = localStorage.getItem('user');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await fetch(`http://127.0.0.1:8000/api/creators/${username}/`);
        if (!res.ok) throw new Error('Failed to fetch creator data');
        const result = await res.json();
        setData(result);
        setPlans([
          {
            id: 'supporter',
            name: 'Supporter',
            price: result.sub_supporters > 0 ? result.sub_supporters : 150,
            features: ['Support the creator', 'Exclusive community updates'],
          },
          {
            id: 'fan',
            name: 'Fan',
            price: result.sub_fans > 0 ? result.sub_fans : 300,
            features: ['All Supporter perks', 'Early access to content', 'Direct Q&A'],
          },
          {
            id: 'super_fan',
            name: 'Super Fan',
            price: result.sub_super_fans > 0 ? result.sub_super_fans : 1000,
            features: ['All Fan perks', '1-on-1 monthly call', 'Exclusive merchandise'],
          },
        ]);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    if (username) fetchData();
  }, [username]);

  const activePlan = useMemo(
    () => plans.find((p) => p.id === selectedPlan) || plans[0],
    [selectedPlan, plans]
  );

  const activeMethod = useMemo(
    () => PAYMENT_METHODS.find((m) => m.id === selectedPayment),
    [selectedPayment]
  );

  const handleSubscribe = async () => {
    if (!selectedPayment) return;
    onSubscribe && onSubscribe({ plan: activePlan, method: selectedPayment });
    try {
      const res = await fetch('http://localhost:8000/api/payments/initialize/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount:   selectedPlan,
          order_id: Math.floor(Math.random() * 1000),
          name:     userData?.name,
          email:    userData?.email,
          phone,
        }),
      });
      const json = await res.json();
      window.location.href = json.checkout_url;
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <div className="sub-page"><div className="sub-container sub-loading">Loading…</div></div>;
  if (!data)   return <div className="sub-page"><div className="sub-container sub-loading">Creator not found.</div></div>;

  const avatarInitial  = data.display_name ? data.display_name.charAt(0).toUpperCase() : '?';
  const firstName      = data.display_name ? data.display_name.split(' ')[0] : 'Creator';
  const mockSupporters = 124;
  const mockRating     = 4.8;

  return (
    <div className="sub-page">
      <div className="sub-container">

        {/* ── CREATOR HEADER ── */}
        <div className="creator-header">
          {data.img
            ? <img src={data.img} alt={data.display_name} className="creator-avatar-img" />
            : <div className="creator-avatar">{avatarInitial}</div>
          }
          <div className="creator-names">
            <h1 className="creator-name">{data.display_name}</h1>
            <span className="creator-handle">@{data.username}</span>
          </div>
          <p className="creator-bio">{data.bio}</p>
          <div className="creator-meta">
            <span className="category-badge">{data.category}</span>
            <span className="meta-dot">•</span>
            <span className="meta-text">{mockSupporters} supporters</span>
            <span className="meta-dot">•</span>
            <span className="meta-text">★ {mockRating} rating</span>
          </div>
        </div>

        {/* ── PLAN CARDS ── */}
        <div className="plans-section">
          <h2 className="section-label">Choose your support level</h2>
          <div className="plans-row">
            {plans.map((plan) => {
              const meta    = PLAN_META[plan.id] || {};
              const isActive = selectedPlan === plan.id;
              return (
                <div
                  key={plan.id}
                  className={[
                    'plan-card',
                    `plan-card--${meta.color || 'orange'}`,
                    isActive      ? 'plan-card--active'   : '',
                    meta.popular  ? 'plan-card--popular'  : '',
                  ].join(' ')}
                  onClick={() => setSelectedPlan(plan.id)}
                  role="button"
                  aria-pressed={isActive}
                  tabIndex={0}
                  onKeyDown={(e) => e.key === 'Enter' && setSelectedPlan(plan.id)}
                >
                  {meta.popular && <div className="plan-badge">Most popular</div>}

                  <div className="plan-tier-row">
                    <div className={`plan-icon plan-icon--${meta.color || 'orange'}`}>
                      {meta.icon}
                    </div>
                    <span className="plan-name">{plan.name}</span>
                  </div>

                  <div className="plan-price-block">
                    <span className="plan-rs">Rs </span>
                    <span className="plan-amount">{plan.price}</span>
                    <span className="plan-mo">/mo</span>
                  </div>

                  <div className="plan-divider" />

                  <ul className="plan-benefits">
                    {plan.features.map((f, i) => (
                      <li key={i}><CheckIcon />{f}</li>
                    ))}
                  </ul>

                  <div className="plan-select-indicator">
                    {isActive ? 'Selected' : 'Select'}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── PAYMENT METHOD ── */}
        <div className="payment-section">
          <h2 className="section-label">Choose payment method</h2>
          <div className="payment-row">
            {PAYMENT_METHODS.map((method) => (
              <button
                key={method.id}
                type="button"
                className={[
                  'payment-card',
                  selectedPayment === method.id ? 'payment-card--selected' : '',
                  method.muted ? 'payment-card--muted' : '',
                ].join(' ')}
                onClick={() => setSelectedPayment(method.id)}
              >
                <PaymentIcon method={method.id} />
                <span>{method.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* ── PHONE NUMBER (shown only after payment method chosen) ── */}
        {selectedPayment && (
          <div className="phone-section">
            <div className="phone-badge">
              <PhoneIcon />
              <span>{activeMethod?.label} number</span>
            </div>
            <p className="phone-hint">{activeMethod?.hint}</p>
            <div className="phone-input-wrap">
              <span className="phone-prefix">+977</span>
              <input
                className="phone-input"
                type="tel"
                placeholder="98XXXXXXXX"
                maxLength={10}
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                autoFocus
              />
            </div>
          </div>
        )}

        {/* ── CTA ── */}
        <button
          className={`cta-button${!selectedPayment ? ' cta-button--disabled' : ''}`}
          type="button"
          disabled={!selectedPayment}
          onClick={handleSubscribe}
        >
          {selectedPayment
            ? `Continue with ${activeMethod?.label} — Rs ${activePlan?.price}/month`
            : 'Select a payment method to continue'}
        </button>

        {/* ── TRUST ── */}
        <div className="trust-section">
          <div className="trust-row">
            <ShieldCheck />
            <span>Secure payments via PayBridgeNP</span>
          </div>
          <div className="trust-pills">
            <span className="trust-pill">eSewa</span>
            <span className="trust-pill">Khalti</span>
            <span className="trust-pill">Fonepay</span>
            <span className="trust-pill">Card</span>
          </div>
          <div className="trust-lines">
            <span>Cancel anytime</span>
            <span className="trust-sep">·</span>
            <span>Goes directly to {firstName}, no delay</span>
          </div>
        </div>

        {/* ── SOCIAL PROOF ── */}
        <div className="social-proof">
          <div className="proof-avatars">
            <div className="proof-avatar pa1">र</div>
            <div className="proof-avatar pa2">S</div>
            <div className="proof-avatar pa3">अ</div>
            <div className="proof-avatar pa4">K</div>
            <div className="proof-avatar pa5">+</div>
          </div>
          <div className="proof-text">
            <strong>{mockSupporters} people</strong> already subscribed · Join them today
          </div>
        </div>

      </div>
    </div>
  );
}