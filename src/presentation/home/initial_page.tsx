import React, { useState, useEffect } from 'react';

import styles from '../../style';

import Business from '../shared/components/Business';
import CTA from '../shared/components/CTA';
import Footer from '../shared/components/Footer';
import Navbar from '../shared/components/Navbar';
import Stats from '../shared/components/Stats';
import Testimonials from '../shared/components/Testmonials';
import Hero from '../shared/components/Hero';

export const InitialComponent: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = document.documentElement.scrollTop;
            setIsVisible(scrollTop > 0);
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <>
            <div className="bg-primary w-full overflow-hidden">
                <div className={`${styles.paddingX} ${styles.flexCenter}`}>
                    <div className={`${styles.boxWidth}`}>
                        <Navbar />
                    </div>
                </div>

                <div className={`bg-primary ${styles.flexStart}`}>
                    <div className={`${styles.boxWidth}`}>
                        <Hero />
                    </div>
                </div>

                <div className={`bg-primary ${styles.paddingX} ${styles.flexCenter}`}>
                    <div className={`${styles.boxWidth}`}>
                        <Stats />
                        <Business />
                        <Testimonials />
                        <CTA />
                        <Footer />
                    </div>
                </div>
                <button
                    className={`fixed bottom-0 right-0 m-5 flex items-center justify-center rounded-xl w-12 h-12 bg-[#00960A] ${isVisible ? 'visible' : 'invisible'}`}
                    onClick={scrollToTop}
                >
                    <svg width="25" height="15" viewBox="0 0 25 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10.9074 0.879505C11.5768 0.210087 12.6639 0.210087 13.3333 0.879505L23.6156 11.1618C24.285 11.8312 24.285 12.9183 23.6156 13.5878C22.9462 14.2572 21.8591 14.2572 21.1896 13.5878L12.1177 4.51579L3.04571 13.5824C2.37629 14.2518 1.28916 14.2518 0.61974 13.5824C-0.0496789 12.913 -0.0496789 11.8258 0.61974 11.1564L10.902 0.87415L10.9074 0.879505Z" fill="white" />
                    </svg>
                </button>
            </div>
        </>
    );
};
