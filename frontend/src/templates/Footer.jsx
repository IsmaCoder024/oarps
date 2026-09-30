import { Link } from "react-router-dom";
import brandLogo from "../assets/MyLogo.jpeg";
import { FaInstagram, FaLinkedin, FaFacebook, FaTwitter, FaSquareWhatsapp} from "react-icons/fa6";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer__main">
        <Link
          className="site-footer__brand"
          to="/home"
          aria-label="Takawedo Beverages home"
        >
          <img
            className="site-footer__logo"
            src={brandLogo}
            alt="Takawedo Beverages Distribution"
          />
          <span className="site-footer__brand-name">
            Takawedo
            <span>Beverages Distribution</span>
          </span>
        </Link>

        <p className="site-footer__tagline">Quality drinks, better moments.</p>

        <nav className="site-footer__nav" aria-label="Footer">
          <Link to="/home#contact"><FaSquareWhatsapp/></Link>
          <Link to="/home#range"><FaInstagram/></Link>
          <Link to="/home#story"><FaTwitter/></Link>
          <Link to="/home#contact"><FaLinkedin/></Link>
          <Link to="/home#contact"><FaFacebook/></Link>
        </nav>
      </div>

      <div className="site-footer__bottom">
        <span>© {new Date().getFullYear()} Takawedo Beverages Distribution</span>
        <span>Beer · Spirits · Wines</span>
      </div>
    </footer>
  );
}
