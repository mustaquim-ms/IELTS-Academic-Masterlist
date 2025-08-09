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

export default function ReadingPassage1() {
    const passage = `
    The history of the bicycle is a fascinating journey that reflects the evolution of technology, society, and personal mobility. The earliest concept of a human-powered two-wheeled vehicle is often attributed to the "célérifère," a French invention from the late 18th century, though it lacked a steering mechanism and was essentially a scooter that required riders to push off the ground with their feet. The pivotal moment came in 1817 with the invention of the "Laufmaschine" (running machine) by German inventor Baron Karl von Drais. This early bicycle, or "draisine," introduced the concept of two wheels in a line, with a steerable front wheel. It was a sensation, though it was still powered by the rider's legs pushing the ground.
    
    The next major innovation arrived in the 1860s when French inventors Pierre Michaux and Pierre Lallement developed a version with pedals attached to the front wheel, giving rise to the "velocipede." This design, nicknamed the "boneshaker" due to its solid iron wheels and lack of suspension, was the first true bicycle. The late 19th century saw a period of rapid development, with the introduction of wire-spoked wheels, solid rubber tires, and the penny-farthing, a bicycle with a massive front wheel and a tiny rear wheel, designed to increase speed.
    
    The modern bicycle as we know it today began to take shape with the invention of the "safety bicycle" in 1885 by John Kemp Starley. This design featured two wheels of equal size, a chain drive to the rear wheel, and a more stable frame. The final key innovation came with the invention of the pneumatic tire by John Boyd Dunlop in 1888, which significantly improved comfort and ride quality. From these humble beginnings, the bicycle has evolved into a global symbol of sustainable transportation, sport, and leisure.
  `;

    const questions = [
        { id: 1, text: "Who invented the first bicycle with a steerable front wheel?" },
        { id: 2, text: "What was the nickname of the velocipede?" },
        { id: 3, text: "The 'safety bicycle' was a significant improvement because it had:" },
        { id: 4, text: "The invention of the pneumatic tire improved what aspect of bicycling?" },
        { id: 5, text: "In what year was the modern 'safety bicycle' invented?" },
    ];

    return (
        <>
            <Head>
                <title>Reading Passage 1 | Determined IELTS</title>
            </Head>
            <Navbar />
            <MainLayout>
                <ContentSection>
                    <SectionTitle
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        Reading Passage 1: The History of the Bicycle
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
