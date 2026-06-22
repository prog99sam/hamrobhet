import React, { useState, useMemo, useEffect } from 'react';
import '../styles/Subscribe.css';
import { useParams } from 'react-router-dom';

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

export default function Subscribe({ onSubscribe }) {
  const { username } = useParams();
  const [data, setData] = useState(null);
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const userData = localStorage.getItem("user");
  const [phone, setPhone] = useState()

  const [selectedPlan, setSelectedPlan] = useState('supporter');
  const [selectedPayment, setSelectedPayment] = useState('esewa');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await fetch(`http://127.0.0.1:8000/api/creators/${username}/`);
        if (!res.ok) throw new Error("Failed to fetch creator data");
        
        const result = await res.json();
        setData(result);

        // Construct standard plan objects using backend prices (falling back to defaults if 0)
        setPlans([
          {
            id: 'supporter',
            name: 'Supporter',
            price: result.sub_supporters > 0 ? result.sub_supporters : 150,
            features: ['Support the creator', 'Exclusive community updates']
          },
          {
            id: 'fan',
            name: 'Fan',
            price: result.sub_fans > 0 ? result.sub_fans : 300,
            features: ['All Supporter perks', 'Early access to content', 'Direct Q&A']
          },
          {
            id: 'super_fan',
            name: 'Super Fan',
            price: result.sub_super_fans > 0 ? result.sub_super_fans : 1000,
            features: ['All Fan perks', '1-on-1 monthly call', 'Exclusive merchandise']
          }
        ]);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (username) {
      fetchData();
    }
  }, [username]);

  const activePlan = useMemo(
    () => plans.find((p) => p.id === selectedPlan) || plans[0],
    [selectedPlan, plans]
  );

  const activePaymentLabel = useMemo(() => {
    const method = PAYMENT_METHODS.find((m) => m.id === selectedPayment);
    return method ? method.label : '';
  }, [selectedPayment]);

  if (loading) {
    return <div className="sub-page"><div className="sub-container" style={{textAlign: 'center', padding: '50px'}}>Loading...</div></div>;
  }

  if (!data) {
    return <div className="sub-page"><div className="sub-container" style={{textAlign: 'center', padding: '50px'}}>Creator not found.</div></div>;
  }

  // Derived Values to patch missing backend data safely
  const avatarInitial = data.display_name ? data.display_name.charAt(0).toUpperCase() : '?';
  const firstName = data.display_name ? data.display_name.split(' ')[0] : 'Creator';
  const mockSupporters = 124; // Fallback since the backend doesn't provide a total count yet
  const mockRating = 4.8; // Fallback rating



  const handleSubscribe = async()=>{
    onSubscribe && onSubscribe({ plan: activePlan, method: selectedPayment });
    try{
      const res = await fetch("http://localhost:8000/api/payments/initialize/",{
        method: "POST",
        headers: {
          'Content-Type': 'application/json', 
        },
        body: JSON.stringify(
          {
            "amount": selectedPlan,
            "order_id": Math.floor(Math.random()*1000),
            "name": userData.name,
            "email": userData.email,
            "phone": phone,
          }
        ),
        }
      )
      const data = await res.json();
      window.location.href = data.checkout_url;
    }
    catch(err){
      console.error(err);
    }
  }

  return (
    <div className="sub-page">
      <div className="sub-container">

        {/* CREATOR HEADER */}
        <div className="creator-header">
          {data.img ? (
             <img src={data.img} alt={data.display_name} className="creator-avatar-img" />
          ) : (
             <div className="creator-avatar">{avatarInitial}</div>
          )}
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

        {/* PLAN CARDS */}
        <div className="plans-section">
          <h2 className="section-label">Choose your support level</h2>
          <div className="plans-row">
            {plans.map((plan) => (
              <div 
                key={plan.id}
                className={`plan-card ${selectedPlan === plan.id ? 'plan-card--active' : ''}`}
                onClick={() => setSelectedPlan(plan.id)}
                style={{
                  border: selectedPlan === plan.id ? '2px solid #FF6B35' : '1px solid #E5E7EB',
                  padding: '16px',
                  borderRadius: '12px',
                  cursor: 'pointer',
                  marginBottom: '12px'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <h3 style={{ margin: 0, fontSize: '1.1rem' }}>{plan.name}</h3>
                  <span style={{ fontWeight: 'bold' }}>Rs {plan.price}/mo</span>
                </div>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '0.9rem', color: '#4B5563' }}>
                  {plan.features.map((feature, idx) => (
                    <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                      <CheckMini /> {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
            <div className='phone-no'>
              <h2>Enter your phone number:</h2>
              <input type='text' onChange={(e)=>{
                setPhone(e.target.value)
              }} placeholder='Enter your phone number'/>

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
        <button 
          className="cta-button" 
          type="button"
          onClick={handleSubscribe}
        >
          Continue with {activePaymentLabel} — Rs {activePlan?.price}/month
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
            <span>Goes directly to {firstName}, no delay</span>
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
            <strong>{mockSupporters} people</strong> already subscribed · Join them today
          </div>
        </div>

      </div>
    </div>
  );
}