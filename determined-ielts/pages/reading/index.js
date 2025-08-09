import React from 'react';
import Head from 'next/head';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import Link from 'next/link';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

// Styled components from the listening module, but with some modifications for a new layout
const MainLayout = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  padding-top: 5rem;
`;

const ContentSection = styled.section`
  flex-grow: 1;
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
`;

const SectionTitle = styled(motion.h1)`
  font-size: 2.5rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 2rem;
  color: var(--primary-color);
`;

const PassageGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
`;

const PassageCard = styled(motion.div)`
  background-color: var(--card-background);
  border-radius: 12px;
  box-shadow: var(--shadow-light);
  padding: 1.5rem;
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-5px);
    box-shadow: var(--shadow-hover);
  }
`;

const CardTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--text-color);
  margin-bottom: 0.5rem;
`;

const CardDescription = styled.p`
  font-size: 1rem;
  color: var(--text-color-secondary);
`;

export default function Reading() {
    const passages = [
        { id: 'passage1', title: 'Passage 1: The History of the Bicycle', description: 'A detailed look at the evolution of bicycles.' },
        { id: 'passage2', title: 'Passage 2: The Role of E-commerce', description: 'An analysis of online retail trends and impacts.' },
        { id: 'passage3', title: 'Passage 3: The Importance of Sleep', description: 'An academic text on sleep cycles and health.' },
    ];

    return (
        <>
            <Head>
                <title>Reading Module | Determined IELTS</title>
            </Head>
            <Navbar />
            <MainLayout>
                <ContentSection>
                    <SectionTitle
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        IELTS Reading Practice
                    </SectionTitle>
                    <p style={{ textAlign: 'center', color: 'var(--text-color-secondary)' }}>
                        Choose a reading passage below to start your practice. Each passage is followed by questions.
                    </p>
                    <PassageGrid>
                        {passages.map((passage) => (
                            <Link key={passage.id} href={`/reading/${passage.id}`} passHref legacyBehavior>
                                <PassageCard whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                    <CardTitle>{passage.title}</CardTitle>
                                    <CardDescription>{passage.description}</CardDescription>
                                </PassageCard>
                            </Link>
                        ))}
                    </PassageGrid>
                </ContentSection>
            </MainLayout>
            <Footer />
        </>
    );
}
