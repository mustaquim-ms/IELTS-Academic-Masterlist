import React from 'react';
import Head from 'next/head';
import styled, { createGlobalStyle } from 'styled-components';
import { motion } from 'framer-motion';

// Import the new Navbar and Footer
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Card from '../components/Card';

// Global styles for a clean, modern aesthetic
const GlobalStyle = createGlobalStyle`
  :root {
    --primary-color: #0070f3;
    --secondary-color: #ff6f61;
    --background-color: #f5f7fa;
    --card-background: #ffffff;
    --text-color: #333333;
    --light-text-color: #666666;
    --navbar-bg: rgba(255, 255, 255, 0.8);
    --navbar-scrolled-bg: rgba(255, 255, 255, 1);
    --shadow-light: 0 4px 6px rgba(0, 0, 0, 0.1);
    --shadow-hover: 0 10px 20px rgba(0, 0, 0, 0.15);
  }

  body {
    font-family: 'Poppins', sans-serif;
    background-color: var(--background-color);
    color: var(--text-color);
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    overflow-x: hidden;
  }

  a {
    color: var(--primary-color);
    text-decoration: none;
    transition: color 0.3s ease;
    &:hover {
      color: var(--secondary-color);
    }
  }

  *, *::before, *::after {
    box-sizing: inherit;
  }
`;

// Main layout wrapper
const MainLayout = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

// Hero section styling
const HeroSection = styled(motion.div)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  height: 100vh;
  padding: 0 2rem;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
`;

const HeroTitle = styled(motion.h1)`
  font-size: 5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  line-height: 1.1;
  color: var(--text-color);

  @media (max-width: 768px) {
    font-size: 3rem;
  }
`;

const HeroSubtitle = styled(motion.p)`
  font-size: 1.5rem;
  color: var(--light-text-color);
  max-width: 700px;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

const CtaButton = styled(motion.a)`
  background-color: var(--primary-color);
  color: #ffffff;
  padding: 1rem 2rem;
  border-radius: 50px;
  font-weight: 600;
  font-size: 1rem;
  box-shadow: var(--shadow-light);
  transition: all 0.3s ease;

  &:hover {
    background-color: var(--secondary-color);
    transform: translateY(-3px);
    box-shadow: var(--shadow-hover);
  }
`;

// Modules section styling
const ModulesSection = styled.section`
  padding: 4rem 2rem;
  background-color: var(--background-color);
`;

const SectionTitle = styled(motion.h2)`
  font-size: 3rem;
  text-align: center;
  margin-bottom: 3rem;
  color: var(--text-color);

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const CardGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
`;

// Animation variants for the homepage elements
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2, // Staggers the animation of child elements
        },
    },
};

const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
};

export default function Home() {
    return (
        <>
            <Head>
                <title>Determined IELTS | Master Your Test</title>
            </Head>
            <GlobalStyle />
            <Navbar />
            <MainLayout>
                {/* Hero Section */}
                <HeroSection>
                    <HeroTitle
                        initial={{ y: -50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.8 }}
                    >
                        Master Your IELTS, Confidently.
                    </HeroTitle>
                    <HeroSubtitle
                        initial={{ y: -30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        Your personalized path to a high band score. Practice with
                        innovative tools and resources for every module.
                    </HeroSubtitle>
                    <CtaButton
                        href="#modules"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                    >
                        Start Your Journey
                    </CtaButton>
                </HeroSection>

                {/* Modules Section */}
                <ModulesSection id="modules">
                    <SectionTitle
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        Explore the Modules
                    </SectionTitle>
                    <CardGrid
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        <motion.div variants={itemVariants}>
                            <Card
                                title="Reading"
                                icon="📖"
                                description="Improve your comprehension and time management skills."
                                link="/reading"
                            />
                        </motion.div>
                        <motion.div variants={itemVariants}>
                            <Card
                                title="Writing"
                                icon="✍️"
                                description="Learn to structure essays and reports for high marks."
                                link="/writing"
                            />
                        </motion.div>
                        <motion.div variants={itemVariants}>
                            <Card
                                title="Listening"
                                icon="🎧"
                                description="Practice with authentic audio to improve focus and accuracy."
                                link="/listening"
                            />
                        </motion.div>
                        <motion.div variants={itemVariants}>
                            <Card
                                title="Speaking"
                                icon="🗣️"
                                description="Gain fluency and confidence with mock interviews and questions."
                                link="/speaking"
                            />
                        </motion.div>
                    </CardGrid>
                </ModulesSection>
            </MainLayout>
            <Footer />
        </>
    );
}
