import "../styles/Lander.css";

const creators = [
  { name: "Sajan Rai", cat: "Art", initials: "SR", supporters: 214, price: 100, grad: "linear-gradient(120deg,#FF6B35,#FF9A6B)" },
  { name: "Prakriti Thapa", cat: "Tech", initials: "PT", supporters: 340, price: 150, grad: "linear-gradient(120deg,#1E3A5F,#3B6996)" },
  { name: "Aashish K.C.", cat: "Music", initials: "AK", supporters: 512, price: 100, grad: "linear-gradient(120deg,#7F77DD,#B0A9F2)" },
  { name: "Mina Gurung", cat: "Education", initials: "MG", supporters: 189, price: 80, grad: "linear-gradient(120deg,#16A34A,#5BC97F)" },
  { name: "Bipin Lama", cat: "Art", initials: "BL", supporters: 97, price: 120, grad: "linear-gradient(120deg,#D85A30,#F0997B)" },
  { name: "Sunita Shrestha", cat: "Music", initials: "SS", supporters: 268, price: 100, grad: "linear-gradient(120deg,#0F6E56,#5DCAA5)" },
];

const steps = [
  {
    num: "01",
    title: "Find creators",
    desc: "Browse artists, educators, musicians and tech creators making work you care about.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <circle cx="11" cy="11" r="7" />
        <path d="M21 21l-4.3-4.3" />
      </svg>
    ),
  },
  {
    num: "02",
    title: "Subscribe monthly",
    desc: "Pick a membership tier and pay securely with eSewa, Khalti, or your card — cancel anytime.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <rect x="3" y="6" width="18" height="13" rx="2" />
        <path d="M3 10h18M7 14h4" />
      </svg>
    ),
  },
  {
    num: "03",
    title: "Get exclusive content",
    desc: "Unlock behind-the-scenes posts, early releases, and direct access to your favourite creators.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M12 2l2.5 6.5L21 11l-6.5 2.5L12 20l-2.5-6.5L3 11l6.5-2.5z" />
      </svg>
    ),
  },
];



function Hero() {
  return (
    <section className="hero" id="top">
      <div className="wrap hero-grid">
        <div>
          <span className="eyebrow">🇳🇵 Made for Nepali creators</span>
          <h1>Support Nepali creators, <span className="accent">directly.</span></h1>
          <p className="lead">
            Help your favourite artists, educators, and musicians earn a steady
            monthly income — straight from the people who love their work.
          </p>
          <div className="hero-ctas">
            <a href="/exp" className="btn btn-primary">Explore Creators</a>
            <a href="#become-creator" className="btn btn-secondary">Become a Creator</a>
          </div>
          <div className="hero-trust">
            <div className="avatar-stack">
              <div className="av" style={{ background: "var(--orange)" }}>RS</div>
              <div className="av" style={{ background: "var(--blue)" }}>PT</div>
              <div className="av" style={{ background: "#7F77DD" }}>AK</div>
            </div>
            <span>Joined by 3,000+ supporters across Nepal</span>
          </div>
        </div>

        <div className="hero-visual">
          <div className="mock-float f1"><span className="dot-green"></span> New supporter joined</div>
          <div className="mock-float f2">⭐ Top creator this week</div>
          <div className="mock-card">
            <div className="mock-cover"></div>
            <div className="mock-profile">SR</div>
            <div className="mock-body">
              <div className="mock-name">
                Sajan Rai
                <svg className="mock-verified" viewBox="0 0 20 20" fill="var(--blue)">
                  <path d="M10 0l2.4 1.4 2.7-.4 1.3 2.4 2.4 1.3-.4 2.7L20 10l-1.6 2.4.4 2.7-2.4 1.3-1.3 2.4-2.7-.4L10 20l-2.4-1.6-2.7.4-1.3-2.4-2.4-1.3.4-2.7L0 10l1.6-2.4-.4-2.7 2.4-1.3L4.9 1l2.7.4z" />
                  <path d="M8.5 13.5L5 10l1.4-1.4 2.1 2.1 4.6-4.6L14.5 7.5z" fill="#fff" />
                </svg>
              </div>
              <div className="mock-cat">Digital Illustrator · Kathmandu</div>
              <div className="mock-stats">
                <div className="mock-stat"><b>214</b><span>Supporters</span></div>
                <div className="mock-stat"><b>48</b><span>Posts</span></div>
                <div className="mock-stat"><b>4.9</b><span>Rating</span></div>
              </div>
              <div className="mock-support">
                <div className="price"><b>Rs 100</b><span>per month</span></div>
                <button className="btn btn-primary" style={{ padding: "9px 18px", fontSize: "13.5px" }}>
                  Support
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  return (
    <section id="how-it-works">
      <div className="wrap">
        <div className="section-head">
          <span className="eyebrow">How it works</span>
          <h2>Three steps to start supporting</h2>
          <p>No clutter, no confusion — just a simple way to back the people who inspire you.</p>
        </div>
        <div className="steps">
          {steps.map((s) => (
            <div className="step-card" key={s.num}>
              <div className="step-num">{s.num}</div>
              <div className="step-icon">{s.icon}</div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CreatorCard({ name, cat, initials, supporters, price, grad }) {
  return (
    <div className="creator-card">
      <div className="creator-cover" style={{ background: grad }}></div>
      <div className="cbody">
        <div className="creator-avatar" style={{ background: grad }}>{initials}</div>
        <div className="creator-name">{name}</div>
        <span className="creator-cat">{cat}</span>
        <div className="creator-supporters">
          <b>{supporters}</b> supporters · Rs {price}/mo
        </div>
        <button className="creator-support-btn">Support</button>
      </div>
    </div>
  );
}

function FeaturedCreators() {
  return (
    <section id="creators" className="creators-section">
      <div className="wrap">
        <div className="section-head">
          <span className="eyebrow">Featured creators</span>
          <h2>Creators you can support today</h2>
          <p>A growing community of Nepali talent across art, tech, music, and education.</p>
        </div>
        <div className="creator-grid">
          {creators.map((c) => <CreatorCard key={c.name} {...c} />)}
        </div>
      </div>
    </section>
  );
}

function Earnings() {
  return (
    <section>
      <div className="wrap">
        <div className="earnings">
          <div className="earnings-inner">
            <div className="section-head">
              <span className="eyebrow">Do the math</span>
              <h2>Small monthly support adds up fast</h2>
              <p>Just Rs 100 a month from your supporters can turn into real, predictable income.</p>
            </div>
            <div className="earn-grid">
              <div className="earn-card">
                <div className="earn-formula">100 supporters × Rs 100</div>
                <div className="earn-result">Rs 10,000 <span>/ month</span></div>
                <span className="earn-tag">A solid side income</span>
              </div>
              <div className="earn-card highlight">
                <div className="earn-formula">500 supporters × Rs 100</div>
                <div className="earn-result">Rs 50,000 <span>/ month</span></div>
                <span className="earn-tag" style={{ background: "rgba(255,107,53,0.25)" }}>A full-time living</span>
              </div>
              <div className="earn-card">
                <div className="earn-formula">1,000 supporters × Rs 150</div>
                <div className="earn-result">Rs 1,50,000 <span>/ month</span></div>
                <span className="earn-tag">Grow your own studio</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CreatorCTA() {
  return (
    <section className="cta-section" id="become-creator">
      <div className="wrap">
        <span className="eyebrow">For creators</span>
        <h2 style={{ marginTop: "18px" }}>Ready to earn from your audience?</h2>
        <p>Set up your page in minutes and start getting paid by the people who already follow your work.</p>
        <a href="#" className="btn btn-primary" style={{ padding: "16px 32px", fontSize: "16px" }}>
          Become a Creator
        </a>
        <div className="cta-perks">
          <div><span className="dot-green"></span> Free to join</div>
          <div><span className="dot-green"></span> Payouts via eSewa &amp; Khalti</div>
          <div><span className="dot-green"></span> Keep full ownership of your content</div>
        </div>
      </div>
    </section>
  );
}



function Lander() {
  return (
    <>
      <Hero />
      <HowItWorks />
      <FeaturedCreators />
      <Earnings />
      <CreatorCTA />
      
    </>
  );
}

export default Lander;