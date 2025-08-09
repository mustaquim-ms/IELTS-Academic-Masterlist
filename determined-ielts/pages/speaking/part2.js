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
  max-width: 1000px;
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
  margin-bottom: 1rem;
  font-weight: bold;
`;

const CueCard = styled.div`
  background-color: #f0f4f8;
  padding: 1.5rem;
  border-left: 4px solid var(--primary-color);
  border-radius: 4px;
  margin-bottom: 2rem;
`;

const CueCardTitle = styled.h4`
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: var(--primary-color);
`;

const BulletPoint = styled.li`
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 250px;
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

export default function SpeakingPart2() {
    return (
        <>
            <Head>
                <title>Speaking Part 2 | Determined IELTS</title>
            </Head>
            <Navbar />
            <MainLayout>
                <ContentSection>
                    <SectionTitle
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        IELTS Speaking Part 2
                    </SectionTitle>
                    <TaskWrapper>
                        <Instructions>
                            You will have one minute to prepare and then you should speak for one to two minutes on the topic below.
                        </Instructions>
                        <CueCard>
                            <CueCardTitle>
                                Describe a place you have visited that you would like to recommend to a friend.
                            </CueCardTitle>
                            <ul>
                                <BulletPoint>where this place is</BulletPoint>
                                <BulletPoint>what you did there</BulletPoint>
                                <BulletPoint>why you would recommend it</BulletPoint>
                                <BulletPoint>who you would recommend it to</BulletPoint>
                            </ul>
                        </CueCard>
                        <TextArea placeholder="Type your response here..." />
                    </TaskWrapper>
                </ContentSection>
            </MainLayout>
            <Footer />
        </>
    );
}
