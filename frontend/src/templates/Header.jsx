import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CircleUserRound, House, Menu, X } from "lucide-react";
import api from "../services/api";
import { useAuth } from "../context/AuthContext.jsx";
import brandLogo from "../assets/MyLogo.jpeg";
import "./Header.css";

export default function Header() {
  const { user, setUser, loading } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!menuOpen) return undefined;

    const closeOnEscape = (event) => {
      if (event.key === "Escape") setMenuOpen(false);
    };

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [menuOpen]);

  const handleSignOut = async () => {
    try {
      await api.post("/api/logout");

        localStorage.removeItem("auth_token");
        setUser(null);

      setMenuOpen(false);
      navigate("/login");
    } catch (error) {
      console.error(error.response?.data);
    }
  };

  return (
    <header className="site-header">
      <div className="site-header__brand">
        <Link to="/home" className="site-header__brand-link" aria-label="Takawedo Beverages home">
          <img className="site-header__logo" src={brandLogo} alt="Takawedo Beverages Distribution" />
        </Link>
      </div>

      <button
        className="site-header__menu-toggle"
        type="button"
        aria-label={menuOpen ? "Hide navigation menu" : "Show navigation menu"}
        aria-expanded={menuOpen}
        aria-controls="primary-navigation"
        onClick={() => setMenuOpen((open) => !open)}
      >
        {menuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {menuOpen && (
        <button
          className="site-header__scrim"
          type="button"
          aria-label="Close navigation menu"
          onClick={() => setMenuOpen(false)}
        />
      )}

      <div
        className={`site-header__drawer${menuOpen ? " is-open" : ""}`}
        id="primary-navigation"
        aria-label="Primary navigation"
      >
        <nav className="site-header__nav" aria-label="Primary" onClick={() => setMenuOpen(false)}>
          <ul className="site-header__links">
            <li>
              <Link to="/home#range">Our range</Link>
            </li>
            <li>
              <Link to="/home#story">Pricing</Link>
            </li>
            <li>
              <Link to="/home#contact">Contact</Link>
            </li>
          </ul>
        </nav>

        <div className="site-header__actions">
          <Link to="/home"><House size={16} /></Link>
          
          {!loading && user ? (
            <>
              <span className="site-header__user">
                <CircleUserRound size={24} aria-hidden="true" />
                <span>{user.f_name}</span>
              </span>
              <button className="site-header__logout" type="button" onClick={handleSignOut}>
                Sign out
              </button>
            </>
          ) : !loading ? (
            <>
              <Link className="site-header__login" to="/login" onClick={() => setMenuOpen(false)}>Log in</Link>
              <Link className="site-header__signup" to="/register" onClick={() => setMenuOpen(false)}>Get started</Link>
            </>
          ) : null}
        </div>
      </div>
    </header>
  );
}
