import React from 'react';
import Head from 'next/head';
import styled from 'styled-components';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Card from '../components/Card';
import { motion } from 'framer-motion';

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

export default function Reading() {
    return (
        <>
            <Head>
                <title>Reading | Determined IELTS</title>
            </Head>
            <Navbar />
            <MainLayout>
                <ContentSection>
                    <SectionTitle variants={titleVariants} initial="hidden" animate="visible">
                        Reading Module
                    </SectionTitle>
                    <CardGrid>
                        <Card
                            title="Practice Passages"
                            icon="📜"
                            description="Hone your skills with a diverse range of academic texts and questions."
                            link="/reading/passages"
                        />
                        <Card
                            title="Question Types"
                            icon="❓"
                            description="Master every question format, from True/False/Not Given to Matching Headings."
                            link="/reading/types"
                        />
                        <Card
                            title="Tips & Strategies"
                            icon="💡"
                            description="Learn effective techniques for skimming, scanning, and time management."
                            link="/reading/strategies"
                        />
                        <Card
                            title="Full Mock Tests"
                            icon="⏱️"
                            description="Test your readiness with timed, full-length reading sections."
                            link="/reading/mock-tests"
                        />
                    </CardGrid>
                </ContentSection>
            </MainLayout>
            <Footer />
        </>
    );
}
