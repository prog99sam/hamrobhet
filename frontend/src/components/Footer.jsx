import '../styles/Lander.css';


function Footer() {
  return (
    <footer>
      <div className="wrap">
        <div className="footer-grid">
          <div className="footer-brand">
            <a href="#top" className="logo">
              <span className="logo-mark" style={{ width: 30, height: 30, fontSize: 14 }}>हB</span>
              HamroBhet
            </a>
            <p>A home for Nepali creators to earn direct, monthly support from the fans who believe in them.</p>
          </div>
          <div className="footer-col">
            <h4>Company</h4>
            <a href="#">About</a>
            <a href="#">Careers</a>
            <a href="#">Blog</a>
          </div>
          <div className="footer-col">
            <h4>Support</h4>
            <a href="#">Contact</a>
            <a href="#">Help center</a>
            <a href="#">Trust &amp; safety</a>
          </div>
          <div className="footer-col">
            <h4>Legal</h4>
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 HamroBhet. Made with care in Nepal.</span>
          <div className="footer-social">
            <a href="#" aria-label="Instagram">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
              </svg>
            </a>
            <a href="#" aria-label="Facebook">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M14 9h3V5h-3a4 4 0 00-4 4v2H7v4h3v6h4v-6h3l1-4h-4v-2a1 1 0 011-1z" />
              </svg>
            </a>
            <a href="#" aria-label="X">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M3 3l18 18M21 3L3 21" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
export default Footer;