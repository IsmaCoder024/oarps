import { Link } from "react-router-dom";
import "./Header.css";

export default function Header() {
  return (
    <header className="auth-header">
      <div className="header-logo">
        <Link to="/" className="header-brand">
          OARPS
        </Link>
      </div>

      <nav className="header-nav" aria-label="Primary">
        <ul className="header-links">
          <li>
            <Link to="/home">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
