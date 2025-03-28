import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function JournalHero() {
    return (
        <section className="relative w-full h-[500px] md:h-[600px] flex items-center justify-center text-center bg-gray-900">
            {/* Background Image */}
            <div 
                className="absolute inset-0 bg-cover bg-center opacity-60" 
                style={{ backgroundImage: "url('images/image1.jpg')" }}
            ></div>

            {/* Overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-70"></div>

            {/* Hero Content */}
            <motion.div 
                initial={{ opacity: 0, y: 30 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ duration: 0.8 }}
                className="relative z-10 text-white px-6 md:px-12"
            >
                <h1 className="text-4xl md:text-6xl font-bold py-4 text-blue-500 bg-blue-900 rounded shadow-lg">
                    Explore Cutting-Edge Research
                </h1>
                <p className="mt-4 text-lg md:text-xl max-w-2xl mx-auto">
                    Stay informed with the latest academic breakthroughs and innovative discoveries that shape the future.
                </p>

                <div className="mt-6 flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6">
                    <Link 
                        to="/journals"
                        className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-3 rounded-lg font-semibold transition duration-200 ease-in-out shadow-md transform hover:scale-105 no-underline" // Increased width and removed underline
                    >
                        Browse Journals
                    </Link>
                    <Link 
                        to="/submit"
                        className="bg-white text-blue-600 hover:bg-gray-200 px-8 py-3 rounded-lg font-semibold transition duration-200 ease-in-out shadow-md transform hover:scale-105 md:ml-4 no-underline" // Increased width and removed underline
                    >
                        Submit Your Research
                    </Link>
                </div>
            </motion.div>
        </section>
    );
}