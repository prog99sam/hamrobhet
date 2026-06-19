import "../styles/Lander.css";

function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar-inner">
        <a href="#top" className="logo">
          <span className="logo-mark">हB</span>
          HamroBhet
        </a>
        <nav className="nav-mid nav-links">
          <a href="#creators">Explore Creators</a>
          <a href="#become-creator">Become a Creator</a>
        </nav>
        <div className="nav-actions">
          <a href="/login" className="btn btn-ghost">Login</a>
          <a href="/signup" className="btn btn-primary">Sign up</a>
        </div>
        <button className="hamburger" aria-label="Open menu">
          <span></span><span></span><span></span>
        </button>
      </div>
    </header>
  );
}

export default Navbar;