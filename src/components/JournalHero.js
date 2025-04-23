import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import "./JournalHero.css"; // Import the new CSS file

export default function JournalHero() {
    return (
        <section className="journal-hero">
            {/* Background Image */}
            <div 
                className="journal-hero__background" 
                style={{ backgroundImage: "url('images/image1.jpg')" }}
            ></div>

            {/* Overlay */}
            <div className="journal-hero__overlay"></div>

            {/* Hero Content */}
            <motion.div 
                initial={{ opacity: 0, y: 30 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ duration: 0.8 }}
                className="journal-hero__content"
            >
                <h1 className="journal-hero__title">
                    Explore Cutting-Edge Research
                </h1>
                <p className="journal-hero__description">
                    Stay informed with the latest academic breakthroughs and innovative discoveries that shape the future.
                </p>

                <div className="journal-hero__buttons">
                    <Link 
                        to="/journals"
                        className="journal-hero__button-primary"
                    >
                        Browse Journals
                    </Link>
                    <Link 
                        to="/submission"
                        className="journal-hero__button-secondary"
                    >
                        Submit Your Research
                    </Link>
                </div>
                
                <div className="journal-hero__badge">
                    Peer-Reviewed
                </div>
            </motion.div>
        </section>
    );
}