import React from 'react';
import Head from 'next/head';
import styled from 'styled-components';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Card from '../components/Card';
import { motion } from 'framer-motion';

// This file follows the same layout and styling as reading.js
// to ensure a consistent user experience.

const MainLayout = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  margin-left: 80px; /* Account for the fixed navbar */

  @media (max-width: 768px) {
    margin-left: 0;
    margin-bottom: 80px; /* Account for mobile navbar */
  }
`;

const ContentSection = styled.section`
  padding: 4rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SectionTitle = styled(motion.h2)`
  font-size: 3rem;
  color: var(--text-color);
  margin-bottom: 2rem;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  width: 100%;
  max-width: 1200px;
`;

const titleVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

export default function Listening() {
    return (
        <>
            <Head>
                <title>Listening | Determined IELTS</title>
            </Head>
            <Navbar />
            <MainLayout>
                <ContentSection>
                    <SectionTitle variants={titleVariants} initial="hidden" animate="visible">
                        Listening Module
                    </SectionTitle>
                    <CardGrid>
                        <Card
                            title="Section 1: Conversation"
                            icon="🎧"
                            description="Practice listening for specific details in everyday conversations."
                            link="/listening/section1"
                        />
                        <Card
                            title="Section 2: Monologue"
                            icon="🎶"
                            description="Focus on a single speaker giving a talk on a general topic."
                            link="/listening/section2"
                        />
                        <Card
                            title="Section 3: Discussion"
                            icon="👥"
                            description="Follow academic conversations and identify multiple speakers' opinions."
                            link="/listening/section3"
                        />
                        <Card
                            title="Section 4: Lecture"
                            icon="🎓"
                            description="Train to follow a university-style lecture and take detailed notes."
                            link="/listening/section4"
                        />
                    </CardGrid>
                </ContentSection>
            </MainLayout>
            <Footer />
        </>
    );
}
