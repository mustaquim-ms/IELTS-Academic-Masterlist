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

export default function Speaking() {
    return (
        <>
            <Head>
                <title>Speaking | Determined IELTS</title>
            </Head>
            <Navbar />
            <MainLayout>
                <ContentSection>
                    <SectionTitle variants={titleVariants} initial="hidden" animate="visible">
                        Speaking Module
                    </SectionTitle>
                    <CardGrid>
                        <Card
                            title="Part 1: Interview"
                            icon="👋"
                            description="Practice common topics and build confidence for the introductory section."
                            link="/speaking/part1"
                        />
                        <Card
                            title="Part 2: Cue Card"
                            icon="🗣️"
                            description="Learn to structure your long turn and develop your ideas for the cue card."
                            link="/speaking/part2"
                        />
                        <Card
                            title="Part 3: Discussion"
                            icon="💬"
                            description="Engage with abstract topics and expand on your answers for the final part."
                            link="/speaking/part3"
                        />
                        <Card
                            title="Full Mock Tests"
                            icon="🎙️"
                            description="Simulate a full speaking test with a virtual examiner to test your readiness."
                            link="/speaking/mock-tests"
                        />
                    </CardGrid>
                </ContentSection>
            </MainLayout>
            <Footer />
        </>
    );
}
