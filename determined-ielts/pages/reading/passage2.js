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

const ReadingLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;

  @media (min-width: 768px) {
    grid-template-columns: 2fr 1fr;
  }
`;

const PassageText = styled.div`
  background-color: var(--card-background);
  border-radius: 12px;
  box-shadow: var(--shadow-light);
  padding: 2rem;
  font-size: 1.1rem;
  line-height: 1.8;
  color: var(--text-color);
  overflow-y: auto;
  height: calc(100vh - 12rem);
`;

const QuestionSection = styled.div`
  background-color: var(--card-background);
  border-radius: 12px;
  box-shadow: var(--shadow-light);
  padding: 2rem;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  height: calc(100vh - 12rem);
`;

const QuestionContainer = styled.div`
  margin-bottom: 1.5rem;
`;

const QuestionText = styled.h4`
  margin-bottom: 0.5rem;
  font-weight: 600;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s ease;
  &:focus {
    outline: none;
    border-color: var(--primary-color);
    box-shadow: 0 0 0 2px rgba(0, 112, 243, 0.2);
  }
`;

export default function ReadingPassage2() {
    const passage = `
    The rise of e-commerce has fundamentally reshaped the global retail landscape, transforming how consumers shop and how businesses operate. The advent of the internet in the late 20th century laid the groundwork for this revolution, but it was the widespread adoption of broadband and secure payment gateways that truly accelerated its growth. E-commerce platforms offer unparalleled convenience, allowing customers to browse and purchase goods from the comfort of their homes, 24 hours a day, seven days a week. This "always-on" availability has placed traditional brick-and-mortar stores at a disadvantage, forcing them to adapt by developing their own online presence or focusing on unique in-store experiences.

    One of the most significant impacts of e-commerce is its effect on supply chains and logistics. The "last-mile" delivery problem, the final leg of the journey from a warehouse to a customer's doorstep, has become a key area of innovation. Companies are investing heavily in automation, drone delivery, and optimized routing algorithms to meet consumer demands for faster shipping. The data collected by e-commerce giants provides invaluable insights into consumer behavior, allowing for personalized marketing, targeted advertisements, and predictive inventory management. This data-driven approach has given rise to a new era of retail where understanding the customer is more crucial than ever before.
  `;

    const questions = [
        { id: 1, text: "What technological development accelerated the growth of e-commerce?" },
        { id: 2, text: "What is the key advantage of e-commerce for consumers?" },
        { id: 3, text: "What are traditional stores doing to compete with online retail?" },
        { id: 4, text: "What is a major challenge in e-commerce logistics?" },
        { id: 5, text: "What does the data collected by e-commerce platforms provide?" },
    ];

    return (
        <>
            <Head>
                <title>Reading Passage 2 | Determined IELTS</title>
            </Head>
            <Navbar />
            <MainLayout>
                <ContentSection>
                    <SectionTitle
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        Reading Passage 2: The Role of E-commerce
                    </SectionTitle>
                    <ReadingLayout>
                        <PassageText>
                            <p>{passage}</p>
                        </PassageText>
                        <QuestionSection>
                            <p style={{ fontWeight: 'bold' }}>Questions 1-5:</p>
                            <p>Answer the following questions based on the passage. Use no more than three words for each answer.</p>
                            {questions.map((q) => (
                                <QuestionContainer key={q.id}>
                                    <QuestionText>{q.id}. {q.text}</QuestionText>
                                    <Input type="text" placeholder="Enter your answer" />
                                </QuestionContainer>
                            ))}
                        </QuestionSection>
                    </ReadingLayout>
                </ContentSection>
            </MainLayout>
            <Footer />
        </>
    );
}
