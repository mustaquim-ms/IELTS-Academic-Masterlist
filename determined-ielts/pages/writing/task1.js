import React from 'react';
import Head from 'next/head';
import styled from 'styled-components';
import { motion } from 'framer-motion';

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

const TaskWrapper = styled.div`
  background-color: var(--card-background);
  border-radius: 12px;
  box-shadow: var(--shadow-light);
  padding: 2rem;
`;

const Instructions = styled.p`
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 2rem;
`;

const ChartPlaceholder = styled.div`
  width: 100%;
  height: 350px;
  background-color: #e2e8f0;
  border-radius: 8px;
  border: 1px dashed #94a3b8;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #64748b;
  font-style: italic;
  margin-bottom: 2rem;
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 400px;
  padding: 1.5rem;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-size: 1rem;
  line-height: 1.5;
  resize: vertical;
  font-family: inherit;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
  &:focus {
    outline: none;
    border-color: var(--primary-color);
    box-shadow: 0 0 0 2px rgba(0, 112, 243, 0.2);
  }
`;

export default function WritingTask1() {
    return (
        <>
            <Head>
                <title>Writing Task 1 | Determined IELTS</title>
            </Head>
            <Navbar />
            <MainLayout>
                <ContentSection>
                    <SectionTitle
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        IELTS Writing Task 1
                    </SectionTitle>
                    <TaskWrapper>
                        <Instructions>
                            The chart below shows the percentage of people aged 20-30 who used different social media platforms in 2020 and 2022. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.
                        </Instructions>
                        <ChartPlaceholder>
                            [Placeholder for Bar Chart]
                        </ChartPlaceholder>
                        <TextArea placeholder="Start writing your report here... (minimum 150 words)" />
                    </TaskWrapper>
                </ContentSection>
            </MainLayout>
            <Footer />
        </>
    );
}
