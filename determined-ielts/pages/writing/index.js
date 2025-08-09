import React from 'react';
import Head from 'next/head';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import Link from 'next/link';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

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

const TaskGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  margin-top: 2rem;

  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const TaskCard = styled(motion.div)`
  background-color: var(--card-background);
  border-radius: 12px;
  box-shadow: var(--shadow-light);
  padding: 2rem;
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

export default function Writing() {
    const tasks = [
        { id: 'task1', title: 'Writing Task 1', description: 'Write a report describing a graph, table, or chart.' },
        { id: 'task2', title: 'Writing Task 2', description: 'Write an essay in response to a point of view, argument, or problem.' },
    ];

    return (
        <>
            <Head>
                <title>Writing Module | Determined IELTS</title>
            </Head>
            <Navbar />
            <MainLayout>
                <ContentSection>
                    <SectionTitle
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        IELTS Writing Practice
                    </SectionTitle>
                    <p style={{ textAlign: 'center', color: 'var(--text-color-secondary)' }}>
                        Choose a writing task to start your practice.
                    </p>
                    <TaskGrid>
                        {tasks.map((task) => (
                            <Link key={task.id} href={`/writing/${task.id}`} passHref legacyBehavior>
                                <TaskCard whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                    <CardTitle>{task.title}</CardTitle>
                                    <CardDescription>{task.description}</CardDescription>
                                </TaskCard>
                            </Link>
                        ))}
                    </TaskGrid>
                </ContentSection>
            </MainLayout>
            <Footer />
        </>
    );
}
