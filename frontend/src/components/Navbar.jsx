import "../styles/Lander.css";

function Navbar() {
  const userData = JSON.parse(localStorage.getItem('user'));
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
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
          {isAuthenticated ? (
            <div className="user-info">
              <span>Welcome, {userData ? userData.first_name + ' ' + userData.last_name : 'Guest'}!</span>
              <button className="btn btn-ghost" onClick={() => {
                localStorage.removeItem('refresh');
                localStorage.removeItem('user');
                localStorage.setItem('isAuthenticated', 'false');
                window.location.href = '/';
              }}>Logout</button>
            </div>
          ) : (
            <>
              <a href="/login" className="btn btn-ghost">Login</a>
              <a href="#" className="btn btn-primary">Sign up</a>
            </>
          )}
        </div>
        <button className="hamburger" aria-label="Open menu">
          <span></span><span></span><span></span>
        </button>
      </div>
    </header>
  );
}

export default Navbar;