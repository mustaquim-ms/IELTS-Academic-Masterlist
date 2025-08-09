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

export default function ReadingPassage3() {
    const passage = `
    The importance of sleep to human health and well-being has been a subject of extensive research for decades. Sleep is not merely a period of rest; it is a complex, dynamic state of consciousness that is vital for physical and mental restoration. During sleep, the body undergoes a range of critical processes, including tissue repair, hormone regulation, and the consolidation of memories. The brain, in particular, uses this time to clear out toxic byproducts that accumulate during the day, a process that is often likened to a nightly "washing machine" for the mind.

    A lack of sufficient sleep, or sleep deprivation, has been linked to numerous adverse health outcomes. Chronic sleep deficiency can impair cognitive function, leading to reduced concentration, slower reaction times, and poor decision-making. It also weakens the immune system, making individuals more susceptible to illness. In the long term, insufficient sleep is associated with an increased risk of developing serious conditions such as diabetes, cardiovascular disease, and obesity. While individual sleep needs vary, most adults require between seven and nine hours of quality sleep per night to maintain optimal health and performance.
  `;

    const questions = [
        { id: 1, text: "What is the primary function of sleep for the mind?" },
        { id: 2, text: "What physical process occurs during sleep besides tissue repair?" },
        { id: 3, text: "What is a short-term effect of sleep deprivation?" },
        { id: 4, text: "What two long-term health risks are mentioned in the passage?" },
        { id: 5, text: "How much sleep is recommended for most adults?" },
    ];

    return (
        <>
            <Head>
                <title>Reading Passage 3 | Determined IELTS</title>
            </Head>
            <Navbar />
            <MainLayout>
                <ContentSection>
                    <SectionTitle
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        Reading Passage 3: The Importance of Sleep
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
