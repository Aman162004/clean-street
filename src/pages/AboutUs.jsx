import React from 'react';
import { motion } from 'framer-motion';

const AboutUs = () => {
    return (
        <div className="container py-5 px-4" style={{ maxWidth: '800px' }}>
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
                <h1 className="fw-bold text-body mb-3">About us</h1>
                <p className="text-muted lead mb-4">
                    CleanStreet is a civic platform built to make reporting street and neighborhood issues simple,
                    transparent, and trackable.
                </p>
                <div className="text-body" style={{ lineHeight: 1.75 }}>
                    <p>
                        We believe residents should be able to flag problems—illegal dumping, broken infrastructure,
                        sanitation concerns—with clear location data and follow-up. Local teams and volunteers get the
                        context they need to prioritize work and close the loop.
                    </p>
                    <p className="mb-0">
                        Our goal is to strengthen trust between communities and the people who keep public spaces clean
                        and safe.
                    </p>
                </div>
            </motion.div>
        </div>
    );
};

export default AboutUs;
