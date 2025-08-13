import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styled, { keyframes, createGlobalStyle } from 'styled-components';
import {
    BookOpen,
    Headphones,
    Award,
    ChevronRight,
    CircleCheck,
    Loader2,
    Play,
} from 'lucide-react';
import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously, signInWithCustomToken, onAuthStateChanged } from 'firebase/auth';
import {
    getFirestore,
    doc,
    setDoc,
    collection,
    onSnapshot,
} from 'firebase/firestore';

// =========================================================================
// ---------------------------- STYLED COMPONENTS --------------------------
// =========================================================================

// Global styles for the body and base typography
const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Inter', sans-serif;
    background-color: #f9fafb;
    color: #1a202c;
    margin: 0;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
`;

// Keyframes for background animation
const pulse = keyframes`
  0% { transform: scale(1); opacity: 0.3; }
  50% { transform: scale(1.1); opacity: 0.5; }
  100% { transform: scale(1); opacity: 0.3; }
`;

// Main page container with abstract animated background
const PageContainer = styled.div`
  min-height: 100vh;
  padding: 8rem 3rem 2rem;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 768px) {
    padding: 6rem 1rem 2rem;
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, #e0f2fe, #fff7ed);
    opacity: 0.8;
    z-index: -2;
  }
`;

// Animated background circles
const AnimatedCircle = styled(motion.div)`
  position: absolute;
  width: 20rem;
  height: 20rem;
  border-radius: 50%;
  filter: blur(3rem);
  mix-blend-mode: multiply;
  z-index: -1;
  animation: ${pulse} 15s infinite ease-in-out;
`;

const BlueCircle = styled(AnimatedCircle)`
  background: #60a5fa;
  top: -10rem;
  left: -10rem;
  animation-delay: 0s;
`;

const YellowCircle = styled(AnimatedCircle)`
  background: #fde047;
  bottom: -10rem;
  right: -10rem;
  animation-delay: 5s;
`;

// Main content wrapper
const ContentWrapper = styled.div`
  max-width: 72rem;
  width: 100%;
  position: relative;
  z-index: 10;
`;

// Section header styles
const HeaderSection = styled(motion.div)`
  text-align: center;
  margin-bottom: 3rem;
`;

const PageTitle = styled.h1`
  font-size: 3.75rem;
  font-weight: 800;
  color: #1e3a8a;
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const PageSubtitle = styled.p`
  font-size: 1.25rem;
  color: #4a5568;
  max-width: 48rem;
  margin: 0 auto;
`;

// Tab navigation styles
const TabContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 2rem;
  flex-wrap: wrap;
`;

const TabButton = styled.button`
  padding: 0.75rem 2rem;
  border-radius: 9999px;
  font-size: 1.125rem;
  font-weight: 600;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  transform-origin: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  &:hover {
    transform: scale(1.05);
  }

  ${({ $active }) => $active && `
    background-color: #2563eb;
    color: white;
    box-shadow: 0 10px 15px rgba(37, 99, 235, 0.3);
  `}

  ${({ $active }) => !$active && `
    background-color: white;
    color: #1e3a8a;
    &:hover {
      background-color: #eff6ff;
    }
  `}
`;

// Grid for content cards
const ContentGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
`;

// Card for practices and resources
const PracticeCard = styled(motion.div)`
  background: white;
  padding: 1.5rem;
  border-radius: 1rem;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.05);
  border: 1px solid #e2e8f0;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
  }
`;

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const IconWrapper = styled.div`
  padding: 0.75rem;
  background-color: #3b82f6;
  border-radius: 0.75rem;
  color: white;
`;

const CardTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 700;
  color: #1e3a8a;
`;

const CardDescription = styled.p`
  color: #4a5568;
`;

const StartButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 1rem;
  color: #2563eb;
  font-weight: 600;
  background: none;
  border: none;
  cursor: pointer;
  transition: color 0.3s ease;

  &:hover {
    color: #1e40af;
  }
`;

// Assessment section styles
const AssessmentSection = styled(motion.div)`
  margin-top: 2rem;
`;

const AssessmentHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
  gap: 1rem;
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  color: #1e3a8a;

  @media (max-width: 768px) {
    font-size: 1.75rem;
  }
`;

const StartAssessmentButton = styled.button`
  padding: 0.75rem 1.5rem;
  background-color: #f59e0b;
  color: white;
  font-weight: 700;
  border-radius: 9999px;
  box-shadow: 0 4px 6px rgba(245, 158, 11, 0.3);
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 6px 12px rgba(245, 158, 11, 0.4);
  }
`;

const AssessmentUI = styled(motion.div)`
  padding: 2rem;
  background: white;
  border-radius: 1.5rem;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.05);
  text-align: center;
  border: 1px solid #e2e8f0;
`;

const AssessmentPrompt = styled.p`
  font-size: 1.125rem;
  color: #4a5568;
  margin-bottom: 1.5rem;
`;

const AudioPlayerPlaceholder = styled.div`
  height: 12rem;
  background: #f3f4f6;
  border-radius: 0.75rem;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 1.5rem;
`;

const SubmitButton = styled.button`
  padding: 1rem 2rem;
  background-color: #f59e0b;
  color: white;
  font-weight: 700;
  border-radius: 9999px;
  box-shadow: 0 4px 6px rgba(245, 158, 11, 0.3);
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  width: auto;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 6px 12px rgba(245, 158, 11, 0.4);
  }
`;

const ResultsContainer = styled(motion.div)`
  padding: 2rem;
  background: #ebf8ff;
  border-radius: 1.5rem;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.05);
  border: 2px solid #90cdf4;
`;

const ResultsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const ResultsTitle = styled.h4`
  font-size: 1.875rem;
  font-weight: 800;
  color: #1e3a8a;
`;

const ResultsText = styled.p`
  font-size: 1.125rem;
  font-weight: 600;
  color: #2d3748;
`;

const HistoryItem = styled(motion.div)`
  background: white;
  padding: 1.5rem;
  border-radius: 1.5rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
  border: 1px solid #e2e8f0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 0.3s ease;

  &:hover {
    transform: translateX(8px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.08);
  }
`;

const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 12rem;
  color: #2563eb;
`;

const NoAssessments = styled(motion.div)`
  text-align: center;
  padding: 2rem;
  background: #f7fafc;
  border-radius: 1.5rem;
  color: #4a5568;
`;

const UserIdDisplay = styled.div`
  position: fixed;
  bottom: 1rem;
  right: 1rem;
  background-color: #1a202c;
  color: white;
  font-size: 0.875rem;
  padding: 0.75rem;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  opacity: 0.8;
  z-index: 100;
`;

// =========================================================================
// ------------------------------ CUSTOM HOOKS -----------------------------
// =========================================================================

// Custom hook to handle all Firebase logic and state
const useFirebase = () => {
    const [db, setDb] = useState(null);
    const [auth, setAuth] = useState(null);
    const [userId, setUserId] = useState(null);
    const [isAuthReady, setIsAuthReady] = useState(false);

    useEffect(() => {
        // Check if the global variables exist before trying to access them
        if (typeof __firebase_config === 'undefined') {
            console.error("__firebase_config is not defined. Skipping Firebase initialization.");
            setIsAuthReady(false);
            return;
        }

        try {
            const firebaseConfig = JSON.parse(__firebase_config);
            const app = initializeApp(firebaseConfig);
            const newAuth = getAuth(app);
            const newDb = getFirestore(app);

            setAuth(newAuth);
            setDb(newDb);

            const unsubscribe = onAuthStateChanged(newAuth, async (user) => {
                if (user) {
                    setUserId(user.uid);
                } else {
                    if (typeof __initial_auth_token !== 'undefined') {
                        await signInWithCustomToken(newAuth, __initial_auth_token);
                        setUserId(newAuth.currentUser.uid);
                    } else {
                        await signInAnonymously(newAuth);
                        setUserId(newAuth.currentUser.uid);
                    }
                }
                setIsAuthReady(true);
            });

            return () => unsubscribe();
        } catch (error) {
            console.error("Firebase initialization failed:", error);
            setIsAuthReady(false);
        }
    }, []);

    return { db, auth, userId, isAuthReady };
};


// =========================================================================
// ------------------------- MAIN REACT COMPONENT --------------------------
// =========================================================================

const ListeningPage = () => {
    // --- State Management and Firebase Hook ---
    const { db, userId, isAuthReady } = useFirebase();
    const [activeTab, setActiveTab] = useState('practices');
    const [isAssessmentRunning, setIsAssessmentRunning] = useState(false);
    const [assessmentResults, setAssessmentResults] = useState(null);
    const [listeningPractices, setListeningPractices] = useState([]);
    const [listeningAssessments, setListeningAssessments] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // --- Firestore Data Fetching and Real-time Listener ---
    useEffect(() => {
        if (!isAuthReady || !db || !userId) {
            setIsLoading(true);
            return;
        }

        const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';
        const assessmentsPath = `/artifacts/${appId}/users/${userId}/listening_assessments`;
        const assessmentsCollection = collection(db, assessmentsPath);

        const unsubscribe = onSnapshot(assessmentsCollection, (querySnapshot) => {
            const assessments = [];
            querySnapshot.forEach((doc) => {
                assessments.push({ id: doc.id, ...doc.data() });
            });
            assessments.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
            setListeningAssessments(assessments);
            setIsLoading(false);
        }, (error) => {
            console.error("Error fetching assessments:", error);
            setIsLoading(false);
        });

        return () => unsubscribe();
    }, [isAuthReady, db, userId]);

    // --- Dummy data for listening practices ---
    useEffect(() => {
        setListeningPractices([
            { id: 1, title: 'Practice Test 1', description: 'Academic Section 1', type: 'Section' },
            { id: 2, title: 'Practice Test 2', description: 'General Training Section 2', type: 'Section' },
            { id: 3, title: 'Practice Test 3', description: 'Academic Section 3', type: 'Section' },
            { id: 4, title: 'Practice Test 4', description: 'General Training Section 4', type: 'Section' },
            { id: 5, title: 'Vocabulary Builder', description: 'Focus on topic-specific words', type: 'Resource' },
            { id: 6, title: 'Accent Training', description: 'Understand different accents', type: 'Resource' },
        ]);
    }, []);

    // --- Handlers for user interactions ---
    const handleStartAssessment = () => {
        setIsAssessmentRunning(true);
        setAssessmentResults(null);
    };

    const handleSubmitAssessment = () => {
        const score = Math.floor(Math.random() * 40) + 1;
        const bandScore = (score / 40) * 9;
        const mockResults = {
            score: score,
            bandScore: bandScore.toFixed(1),
            timestamp: new Date().toISOString(),
            details: 'Mock assessment results for demonstration purposes.',
        };

        if (db && userId) {
            const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';
            const assessmentRef = doc(collection(db, `/artifacts/${appId}/users/${userId}/listening_assessments`));
            setDoc(assessmentRef, mockResults)
                .then(() => {
                    console.log('Assessment saved successfully!');
                })
                .catch(error => {
                    console.error('Error saving assessment:', error);
                });
        }

        setAssessmentResults(mockResults);
        setIsAssessmentRunning(false);
    };

    const renderAssessmentPage = () => {
        return (
            <AssessmentUI
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <ResultsTitle>Listening Assessment</ResultsTitle>
                <AssessmentPrompt>This is a mock listening test. You would see questions and an audio player here.</AssessmentPrompt>
                <AudioPlayerPlaceholder>
                    <Play size={48} color="#2563eb" />
                </AudioPlayerPlaceholder>
                <SubmitButton onClick={handleSubmitAssessment}>
                    Submit Mock Assessment
                </SubmitButton>
            </AssessmentUI>
        );
    };

    const renderAssessmentResults = () => {
        return (
            <ResultsContainer
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
            >
                <ResultsHeader>
                    <ResultsTitle>Your Results</ResultsTitle>
                    <Award size={40} color="#f59e0b" />
                </ResultsHeader>
                <ResultsText>Score: {assessmentResults.score} / 40</ResultsText>
                <ResultsText>Band Score: {assessmentResults.bandScore}</ResultsText>
                <p style={{ marginTop: '1rem', fontSize: '0.875rem', color: '#6b7280' }}>
                    Saved on: {new Date(assessmentResults.timestamp).toLocaleString()}
                </p>
            </ResultsContainer>
        );
    };

    // --- Framer Motion Variants for animations ---
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
        },
    };

    return (
        <>
            <GlobalStyle />
            <PageContainer>
                <BlueCircle initial={{ x: -200, y: -200 }} animate={{ x: 200, y: 200 }} transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }} />
                <YellowCircle initial={{ x: 200, y: 200 }} animate={{ x: -200, y: -200 }} transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }} />

                <ContentWrapper>
                    <HeaderSection
                        initial={{ opacity: 0, y: -50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <PageTitle>IELTS Listening Module</PageTitle>
                        <PageSubtitle>
                            Enhance your listening skills with a variety of practices, resources, and personalized assessments.
                        </PageSubtitle>
                        <TabContainer>
                            <TabButton $active={activeTab === 'practices'} onClick={() => setActiveTab('practices')}>
                                Practices & Resources
                            </TabButton>
                            <TabButton $active={activeTab === 'assessments'} onClick={() => setActiveTab('assessments')}>
                                My Assessments
                            </TabButton>
                        </TabContainer>
                    </HeaderSection>

                    <AnimatePresence mode="wait">
                        {activeTab === 'practices' && (
                            <ContentGrid
                                key="practices"
                                variants={containerVariants}
                                initial="hidden"
                                animate="visible"
                                exit="hidden"
                            >
                                {listeningPractices.map((item, index) => (
                                    <PracticeCard
                                        key={index}
                                        variants={itemVariants}
                                        whileHover={{ scale: 1.05 }}
                                        onClick={() => console.log(`Starting practice: ${item.title}`)}
                                    >
                                        <CardHeader>
                                            <IconWrapper>
                                                {item.type === 'Section' ? <Headphones size={24} /> : <BookOpen size={24} />}
                                            </IconWrapper>
                                            <CardTitle>{item.title}</CardTitle>
                                        </CardHeader>
                                        <CardDescription>{item.description}</CardDescription>
                                        <StartButton>
                                            <span>Start Now</span>
                                            <ChevronRight size={16} />
                                        </StartButton>
                                    </PracticeCard>
                                ))}
                            </ContentGrid>
                        )}

                        {activeTab === 'assessments' && (
                            <AssessmentSection
                                key="assessments"
                                variants={containerVariants}
                                initial="hidden"
                                animate="visible"
                                exit="hidden"
                            >
                                <AssessmentHeader>
                                    <SectionTitle>Your Assessment History</SectionTitle>
                                    <StartAssessmentButton onClick={handleStartAssessment}>
                                        Start New Assessment
                                    </StartAssessmentButton>
                                </AssessmentHeader>

                                <AnimatePresence mode="wait">
                                    {isAssessmentRunning && (
                                        <motion.div key="assessment-ui">
                                            {renderAssessmentPage()}
                                        </motion.div>
                                    )}
                                    {!isAssessmentRunning && assessmentResults && (
                                        <motion.div key="assessment-results">
                                            {renderAssessmentResults()}
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                {isLoading ? (
                                    <LoaderContainer>
                                        <Loader2 size={48} style={{ animation: 'spin 1s linear infinite' }} />
                                    </LoaderContainer>
                                ) : (
                                    <ContentGrid
                                        variants={containerVariants}
                                        initial="hidden"
                                        animate="visible"
                                    >
                                        {listeningAssessments.length > 0 ? (
                                            listeningAssessments.map((result) => (
                                                <HistoryItem
                                                    key={result.id}
                                                    variants={itemVariants}
                                                >
                                                    <div>
                                                        <ResultsText>Assessment Score: {result.score}/40</ResultsText>
                                                        <ResultsTitle style={{ fontSize: '1.5rem' }}>Band Score: {result.bandScore}</ResultsTitle>
                                                        <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                                                            Completed on: {new Date(result.timestamp).toLocaleString()}
                                                        </p>
                                                    </div>
                                                    <div style={{ padding: '0.75rem', backgroundColor: '#d1fae5', color: '#059669', borderRadius: '50%' }}>
                                                        <CircleCheck size={24} />
                                                    </div>
                                                </HistoryItem>
                                            ))
                                        ) : (
                                            <NoAssessments
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                            >
                                                <p style={{ fontSize: '1.125rem' }}>No past assessments found. Start a new one to see your history!</p>
                                            </NoAssessments>
                                        )}
                                    </ContentGrid>
                                )}
                            </AssessmentSection>
                        )}
                    </AnimatePresence>
                </ContentWrapper>

                <UserIdDisplay>
                    <p>Your User ID:</p>
                    <p style={{ fontFamily: 'monospace' }}>{userId || 'Loading...'}</p>
                </UserIdDisplay>
            </PageContainer>
        </>
    );
};

export default ListeningPage;
