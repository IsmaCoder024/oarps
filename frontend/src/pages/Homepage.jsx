import { Link } from "react-router-dom";
import brandLogo from "../assets/MyLogo.jpeg";
import Header from "../templates/Header.jsx";
import Footer from "../templates/Footer.jsx";
import "./Homepage.css";

const productRange = [
    { number: "01", name: "Beer", detail: "Easy favorites and craft picks" },
    { number: "02", name: "Spirits", detail: "Distinctive bottles for every bar" },
    { number: "03", name: "Wines", detail: "Thoughtful pours for the table" },
];

export default function Homepage() {
    return (
        <div className="homepage">
            <Header />

            <main>
                <section className="homepage__hero" aria-labelledby="homepage-title">
                    <div className="homepage__intro">
                        <p className="homepage__eyebrow">Takawedo Beverages Distribution</p>
                        <h1 id="homepage-title">Quality drinks. Better moments.</h1>
                        <p className="homepage__summary">
                            Your trusted source for beer, spirits, and wines. We bring the
                            right bottles to the people and places that make every moment
                            count.
                        </p>
                        <div className="homepage__actions">
                            <Link className="homepage__primary-action" to="/home#range">
                                Explore our range
                            </Link>
                            <Link className="homepage__secondary-action" to="/register">
                                Partner with us
                            </Link>
                        </div>
                    </div>

                    <div className="homepage__visual" aria-label="Takawedo brand emblem">
                        <span className="homepage__visual-ring" aria-hidden="true" />
                        <img
                            className="homepage__emblem"
                            src={brandLogo}
                            alt="Takawedo Beverages Distribution: beer, spirits, wines"
                        />
                        <span className="homepage__visual-caption">Quality drinks, better moments</span>
                    </div>
                </section>

                <section className="homepage__range" id="range" aria-labelledby="range-title">
                    <div className="homepage__section-heading">
                        <p className="homepage__eyebrow">A considered selection</p>
                        <h2 id="range-title">Good company starts here.</h2>
                    </div>
                    <div className="homepage__products">
                        {productRange.map((product) => (
                            <article className="homepage__product" key={product.name}>
                                <span className="homepage__product-number">{product.number}</span>
                                <h3>{product.name}</h3>
                                <p>{product.detail}</p>
                            </article>
                        ))}
                    </div>
                </section>

                <section className="homepage__story" id="story" aria-labelledby="story-title">
                    <p className="homepage__eyebrow">Made for sharing</p>
                    <h2 id="story-title">The right drink can bring a good moment together.</h2>
                    <p>
                        From everyday favorites to bottles for a celebration, Takawedo
                        connects quality drinks with the people who make them memorable.
                    </p>
                </section>
            </main>

            
            <Footer/>
        </div>
    );
}