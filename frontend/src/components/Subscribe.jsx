import React, { useState, useMemo } from 'react';
import '../styles/Subscribe.css';

const PLANS = [
  {
    id: 'supporter',
    title: 'Supporter',
    price: 100,
    benefits: ['Exclusive posts', 'Community access'],
    badge: 'Most Popular',
  },
  {
    id: 'fan',
    title: 'Fan',
    price: 250,
    benefits: ['Everything in Supporter', 'Early content access', 'Behind-the-scenes posts'],
    badge: null,
  },
  {
    id: 'superfan',
    title: 'Super Fan',
    price: 500,
    benefits: ['All perks', 'Priority support', 'Direct appreciation from creator'],
    badge: null,
  },
];

const PAYMENT_METHODS = [
  { id: 'esewa', label: 'eSewa', color: '#60BB46' },
  { id: 'khalti', label: 'Khalti', color: '#5C2D91' },
  { id: 'fonepay', label: 'Fonepay', color: '#7C3AED' },
  { id: 'card', label: 'Card', color: '#9CA3AF', muted: true },
];

const PaymentIcon = ({ method }) => {
  switch (method) {
    case 'esewa':
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="11" fill="#60BB46" />
          <path d="M7 12.5l3 3 7-7" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case 'khalti':
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="11" fill="#5C2D91" />
          <path d="M8 7v10M8 12h4.5a3 3 0 100-6H8" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case 'fonepay':
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="11" fill="#7C3AED" />
          <rect x="9" y="6" width="6" height="12" rx="1.5" stroke="#fff" strokeWidth="1.6" />
          <circle cx="12" cy="15.3" r="0.8" fill="#fff" />
        </svg>
      );
    case 'card':
    default:
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <rect x="2" y="5" width="20" height="14" rx="2.5" stroke="#9CA3AF" strokeWidth="1.7" />
          <path d="M2 9.5h20" stroke="#9CA3AF" strokeWidth="1.7" />
        </svg>
      );
  }
};

const CheckMini = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#FF6B35" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"></polyline>
  </svg>
);

const ShieldCheck = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2l8 4v6c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6l8-4z" />
    <path d="M9 12l2 2 4-4" />
  </svg>
);

export default function Subscribe({ creator, onSubscribe }) {
  const data = creator || {
    username: 'sunita_art',
    displayName: 'Sunita Shrestha',
    avatarInitial: 'सु',
    bio: 'Illustrator & visual storyteller, painting modern Nepal one piece at a time.',
    category: 'Art',
    supporters: 214,
    rating: 4.9,
  };

  const [selectedPlan, setSelectedPlan] = useState('supporter');
  const [selectedPayment, setSelectedPayment] = useState('esewa');

  const activePlan = useMemo(
    () => PLANS.find((p) => p.id === selectedPlan),
    [selectedPlan]
  );

  const activePaymentLabel = useMemo(() => {
    const method = PAYMENT_METHODS.find((m) => m.id === selectedPayment);
    return method ? method.label : '';
  }, [selectedPayment]);

  const handleSubscribe = () => {
    if (onSubscribe) {
      onSubscribe({ planId: selectedPlan, paymentMethod: selectedPayment });
    }
  };

  return (
    <div className="sub-page">
      <div className="sub-container">

        {/* CREATOR HEADER */}
        <div className="creator-header">
          <div className="creator-avatar">{data.avatarInitial}</div>
          <div className="creator-names">
            <h1 className="creator-name">{data.displayName}</h1>
            <span className="creator-handle">@{data.username}</span>
          </div>
          <p className="creator-bio">{data.bio}</p>
          <div className="creator-meta">
            <span className="category-badge">{data.category}</span>
            <span className="meta-dot">•</span>
            <span className="meta-text">{data.supporters} supporters</span>
            <span className="meta-dot">•</span>
            <span className="meta-text">★ {data.rating} rating</span>
          </div>
        </div>

        {/* PLAN CARDS */}
        <div className="plans-section">
          <h2 className="section-label">Choose your support level</h2>
          <div className="plans-row">
            {PLANS.map((plan) => {
              const isSelected = plan.id === selectedPlan;
              return (
                <button
                  key={plan.id}
                  type="button"
                  className={`plan-card ${isSelected ? 'plan-card--selected' : ''}`}
                  onClick={() => setSelectedPlan(plan.id)}
                >
                  {plan.badge && <span className="plan-badge">{plan.badge}</span>}
                  <div className="plan-title">{plan.title}</div>
                  <div className="plan-price">
                    Rs {plan.price}
                    <span className="plan-price-unit">/month</span>
                  </div>
                  <ul className="plan-benefits">
                    {plan.benefits.map((b) => (
                      <li key={b}>
                        <span className="benefit-check"><CheckMini /></span>
                        {b}
                      </li>
                    ))}
                  </ul>
                  <div className="plan-select-indicator">
                    {isSelected ? 'Selected' : 'Select plan'}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* PAYMENT METHOD */}
        <div className="payment-section">
          <h2 className="section-label">Choose payment method</h2>
          <div className="payment-row">
            {PAYMENT_METHODS.map((method) => {
              const isSelected = method.id === selectedPayment;
              return (
                <button
                  key={method.id}
                  type="button"
                  className={`payment-card ${isSelected ? 'payment-card--selected' : ''} ${method.muted ? 'payment-card--muted' : ''}`}
                  onClick={() => setSelectedPayment(method.id)}
                >
                  <PaymentIcon method={method.id} />
                  <span>{method.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* PRIMARY ACTION */}
        <button className="cta-button" type="button" onClick={handleSubscribe}>
          Continue with {activePaymentLabel} — Rs {activePlan.price}/month
        </button>

        {/* TRUST SECTION */}
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
            <span>Goes directly to {data.displayName.split(' ')[0]}, no delay</span>
          </div>
        </div>

        {/* SOCIAL PROOF */}
        <div className="social-proof">
          <div className="proof-avatars">
            <div className="proof-avatar pa1">र</div>
            <div className="proof-avatar pa2">S</div>
            <div className="proof-avatar pa3">अ</div>
            <div className="proof-avatar pa4">K</div>
            <div className="proof-avatar pa5">+</div>
          </div>
          <div className="proof-text">
            <strong>{data.supporters} people</strong> already subscribed · Join them today
          </div>
        </div>

      </div>
    </div>
  );
}