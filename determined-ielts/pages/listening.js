import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styled, { keyframes, createGlobalStyle, css } from 'styled-components';
import {
    BookOpen,
    Headphones,
    Award,
    ChevronRight,
    CircleCheck,
    Loader2,
    Play,
    Menu,
    X,
    Facebook,
    Instagram,
    Twitter,
    Youtube,
    Linkedin,
    ChevronDown,
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

// Global styles and color variables
const GlobalStyle = createGlobalStyle`
  :root {
    --primary-color-extra-dark: #1e3a8a;
    --primary-color-dark: #2563eb;
    --primary-color: #3b82f6;
    --text-color-primary: #1a202c;
    --text-color-secondary: #4a5568;
    --background-color-light: #eff6ff;
    --card-background: #ffffff;
    --accent-color: #f59e0b;
  }
  
  body {
    font-family: 'Inter', sans-serif;
    background-color: var(--background-color);
    color: var(--text-color-primary);
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
  padding-top: 8rem;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  @media (max-width: 768px) {
    padding-top: 6rem;
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
  padding: 2rem 3rem;

  @media (max-width: 768px) {
    padding: 2rem 1rem;
  }
`;

// Section header styles
const HeaderSection = styled(motion.div)`
  text-align: center;
  margin-bottom: 3rem;
`;

const PageTitle = styled.h1`
  font-size: 3.75rem;
  font-weight: 800;
  color: var(--primary-color-extra-dark);
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const PageSubtitle = styled.p`
  font-size: 1.25rem;
  color: var(--text-color-secondary);
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
    background-color: var(--primary-color-dark);
    color: white;
    box-shadow: 0 10px 15px rgba(37, 99, 235, 0.3);
  `}

  ${({ $active }) => !$active && `
    background-color: var(--card-background);
    color: var(--primary-color-extra-dark);
    &:hover {
      background-color: var(--background-color-light);
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
  background: var(--card-background);
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
  background-color: var(--primary-color);
  border-radius: 0.75rem;
  color: white;
`;

const CardTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--primary-color-extra-dark);
`;

const CardDescription = styled.p`
  color: var(--text-color-secondary);
`;

const StartButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 1rem;
  color: var(--primary-color-dark);
  font-weight: 600;
  background: none;
  border: none;
  cursor: pointer;
  transition: color 0.3s ease;

  &:hover {
    color: var(--primary-color-extra-dark);
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
  color: var(--primary-color-extra-dark);

  @media (max-width: 768px) {
    font-size: 1.75rem;
  }
`;

const StartAssessmentButton = styled.button`
  padding: 0.75rem 1.5rem;
  background-color: var(--accent-color);
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
  background: var(--card-background);
  border-radius: 1.5rem;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.05);
  text-align: center;
  border: 1px solid #e2e8f0;
`;

const AssessmentPrompt = styled.p`
  font-size: 1.125rem;
  color: var(--text-color-secondary);
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
  background-color: var(--accent-color);
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
  color: var(--primary-color-extra-dark);
`;

const ResultsText = styled.p`
  font-size: 1.125rem;
  font-weight: 600;
  color: #2d3748;
`;

const HistoryItem = styled(motion.div)`
  background: var(--card-background);
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
  color: var(--primary-color-dark);
`;

const NoAssessments = styled(motion.div)`
  text-align: center;
  padding: 2rem;
  background: #f7fafc;
  border-radius: 1.5rem;
  color: var(--text-color-secondary);
`;

const UserIdDisplay = styled.div`
  position: fixed;
  bottom: 1rem;
  right: 1rem;
  background-color: var(--text-color-primary);
  color: white;
  font-size: 0.875rem;
  padding: 0.75rem;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  opacity: 0.8;
  z-index: 100;
`;

// =========================================================================
// ------------------------- NAVBAR STYLED COMPONENTS ----------------------
// =========================================================================

const Nav = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: transparent;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 3rem;
  z-index: 1000;
  transition: all 0.3s ease-in-out;

  @media (max-width: 768px) {
    padding: 1rem 1rem;
  }

  ${({ $scrolled }) => $scrolled && css`
    background-color: rgba(254, 255, 255, 0.5);
    backdrop-filter: blur(10px);
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  `}
`;

const NavLinks = styled.div`
  display: flex;
  gap: 2rem;

  @media (max-width: 1024px) {
    display: none;
  }
`;

const NavLogo = styled(motion.div)`
  font-size: 1.5rem;
  font-weight: 800;
  color: var(--primary-color-extra-dark);
  display: flex;
  align-items: center;
`;

const NavLink = styled(motion.a)`
  font-size: 1rem;
  font-weight: 600;
  color: var(--text-color-secondary);
  text-decoration: none;
  transition: all 0.3s ease;
  position: relative;
  cursor: pointer;

  &:hover {
    color: var(--primary-color-dark);
    transform: translateY(-5px) rotate(-1deg);
    text-shadow: 2px 2px 5px rgba(0,0,0,0.1);
  }
`;

const AuthButtons = styled(motion.div)`
  display: flex;
  gap: 1rem;
  align-items: center;

  @media (max-width: 1024px) {
    display: none;
  }
`;

const AuthButton = styled(motion.a)`
  background-color: transparent;
  border: 2px solid ${props => props.$primary ? 'var(--primary-color)' : 'transparent'};
  color: ${props => props.$primary ? 'var(--primary-color)' : 'var(--text-color-secondary)'};
  padding: 0.5rem 1rem;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 9999px;
  text-decoration: none;
  transition: all 0.3s ease;
  cursor: pointer;
  
  &:hover {
    background-color: ${props => props.$primary ? 'var(--primary-color)' : 'transparent'};
    color: ${props => props.$primary ? 'white' : 'var(--primary-color-dark)'};
    box-shadow: ${props => props.$primary ? '0 4px 12px rgba(0,0,0,0.1)' : 'none'};
    transform: translateY(-2px);
  }
`;

const NavSocial = styled.div`
  display: flex;
  gap: 1rem;
  @media (max-width: 1024px) {
    display: none;
  }
`;

const SocialIcon = styled.a`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 24px;
  height: 24px;
  transition: transform 0.3s ease;
  color: var(--primary-color-dark);
  
  &:hover {
    transform: translateY(-2px);
    color: var(--primary-color);
  }
`;

const DropdownContainer = styled.div`
  position: relative;
`;

const DropdownMenu = styled(motion.div)`
  position: absolute;
  top: calc(100% + 1rem); /* Increased spacing */
  left: 50%;
  transform: translateX(-50%);
  background-color: var(--card-background);
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  padding: 0.5rem;
  min-width: 200px;
  z-index: 1001;
`;

const DropdownItem = styled.a`
  display: block;
  padding: 0.75rem 1rem;
  color: var(--text-color-primary);
  text-decoration: none;
  font-weight: 500;
  transition: background-color 0.2s ease, color 0.2s ease;
  border-radius: 6px;
  cursor: pointer;
  &:hover {
    background-color: var(--background-color-light);
    color: var(--primary-color-dark);
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  z-index: 50;
  color: var(--primary-color-dark);

  @media (max-width: 1024px) {
    display: block;
  }
`;

const MobileMenu = styled(motion.div)`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  width: 70%;
  background: white;
  padding: 2rem;
  box-shadow: -4px 0 12px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1.5rem;
  z-index: 40;
`;

const MobileNavLink = styled(NavLink)`
  width: 100%;
  padding: 0.5rem 0;
  border-bottom: 1px solid #e2e8f0;
`;


// =========================================================================
// ------------------------- FOOTER STYLED COMPONENTS ----------------------
// =========================================================================

const FooterContainer = styled.footer`
  width: 100%;
  background: var(--text-color-primary);
  color: #cbd5e0;
  padding: 4rem 3rem 2rem;
  margin-top: 4rem;

  @media (max-width: 768px) {
    padding: 2rem 1rem;
  }
`;

const FooterGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  max-width: 72rem;
  margin: 0 auto;
`;

const FooterSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const FooterTitle = styled.h4`
  font-size: 1.25rem;
  font-weight: 700;
  color: white;
  margin-bottom: 0.5rem;
`;

const FooterLink = styled.a`
  color: #a0aec0;
  text-decoration: none;
  font-size: 1rem;
  transition: color 0.3s ease;

  &:hover {
    color: var(--accent-color);
  }
`;

const FooterCopyright = styled.p`
  text-align: center;
  margin-top: 3rem;
  font-size: 0.875rem;
  color: #4a5568;
  border-top: 1px solid #2d3748;
  padding-top: 1.5rem;
`;

// =========================================================================
// ------------------------------ CUSTOM HOOKS & COMPONENTS -----------------------------
// =========================================================================

// Custom mock Link component since we're not in a Next.js environment
const Link = ({ href, children, ...props }) => {
    return <a href={href} {...props}>{children}</a>;
};

// Custom Hook for hover state
const useHover = () => {
    const [isHovering, setIsHovering] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const node = ref.current;
        if (node) {
            const handleMouseOver = () => setIsHovering(true);
            const handleMouseOut = () => setIsHovering(false);
            node.addEventListener('mouseover', handleMouseOver);
            node.addEventListener('mouseout', handleMouseOut);
            return () => {
                node.removeEventListener('mouseover', handleMouseOver);
                node.removeEventListener('mouseout', handleMouseOut);
            };
        }
    }, []);

    return [ref, isHovering];
};

// Custom hook to handle all Firebase logic and state
const useFirebase = () => {
    const [db, setDb] = useState(null);
    const [userId, setUserId] = useState(null);
    const [isAuthReady, setIsAuthReady] = useState(false);

    useEffect(() => {
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

            setDb(newDb);
            return () => unsubscribe();
        } catch (error) {
            console.error("Firebase initialization failed:", error);
            setIsAuthReady(false);
        }
    }, []);

    return { db, userId, isAuthReady };
};

// =========================================================================
// ------------------------- NAV & FOOTER COMPONENTS -----------------------
// =========================================================================

const Navbar = () => {
    const [aiToolsRef, isAiToolsHovering] = useHover();
    const [ieltsModulesRef, isIeltsModulesHovering] = useHover();
    const [scrolled, setScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const handleScroll = () => {
        const offset = window.scrollY;
        setScrolled(offset > 150);
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const dropdownVariants = {
        hidden: { opacity: 0, y: -10, scaleY: 0.95 },
        visible: { opacity: 1, y: 0, scaleY: 1, transition: { duration: 0.2, ease: 'easeOut' } },
        exit: { opacity: 0, y: -10, scaleY: 0.95, transition: { duration: 0.15, ease: 'easeIn' } },
    };

    const aiTools = [
        { name: 'Document Analysis', path: '/ai-tools/doc-analysis' },
        { name: 'Quiz Generation', path: '/ai-tools/quiz-gen' },
        { name: 'Personalized Assistance', path: '/ai-tools/personalized-assistance' },
        { name: 'Smart Study Planner', path: '/ai-tools/study-planner' },
        { name: 'IELTS Preparation', path: '/ai-tools/ielts-prep' },
        { name: 'AI Image Generator', path: '/ai-tools/image-gen' },
    ];

    const ieltsModules = [
        { name: 'Listening', path: '/listening' },
        { name: 'Speaking', path: '/speaking' },
        { name: 'Reading', path: '/reading' },
        { name: 'Writing', path: '/writing' },
    ];

    const socialLinks = [
        { name: 'facebook', icon: <Facebook />, url: 'https://www.facebook.com' },
        { name: 'instagram', icon: <Instagram />, url: 'https://www.instagram.com' },
        { name: 'twitter', icon: <Twitter />, url: 'https://www.twitter.com' },
        { name: 'youtube', icon: <Youtube />, url: 'https://www.youtube.com' },
        { name: 'linkedin', icon: <Linkedin />, url: 'https://www.linkedin.com' },
    ];

    return (
        <>
            <Nav $scrolled={scrolled}>
                <NavLogo>
                    {/* The logo now changes based on the 'scrolled' state */}
                    <img
                        src={scrolled ? '/scrolled.png' : '/logo_main.png'}
                        alt="Determined IELTS Logo"
                    />
                </NavLogo>

                <NavLinks>
                    <NavLink href="./index.js">Home</NavLink>
                    <DropdownContainer ref={aiToolsRef}>
                        <NavLink as="span" >
                            AI Tools
                            <ChevronDown style={{ verticalAlign: 'middle', marginLeft: '8px' }} />
                        </NavLink>
                        <AnimatePresence>
                            {isAiToolsHovering && (
                                <DropdownMenu
                                    initial="hidden"
                                    animate="visible"
                                    exit="exit"
                                    variants={dropdownVariants}
                                    style={{ originY: 0 }}
                                >
                                    {aiTools.map((tool, index) => (
                                        <DropdownItem key={index} href={tool.path}>
                                            {tool.name}
                                        </DropdownItem>
                                    ))}
                                </DropdownMenu>
                            )}
                        </AnimatePresence>
                    </DropdownContainer>

                    <DropdownContainer ref={ieltsModulesRef}>
                        <NavLink as="span" >
                            IELTS Modules
                            <ChevronDown style={{ verticalAlign: 'middle', marginLeft: '8px' }} />
                        </NavLink>
                        <AnimatePresence>
                            {isIeltsModulesHovering && (
                                <DropdownMenu
                                    initial="hidden"
                                    animate="visible"
                                    exit="exit"
                                    variants={dropdownVariants}
                                    style={{ originY: 0 }}
                                >
                                    {ieltsModules.map((tool, index) => (
                                        <DropdownItem key={index} href={tool.path}>
                                            {tool.name}
                                        </DropdownItem>
                                    ))}
                                </DropdownMenu>
                            )}
                        </AnimatePresence>
                    </DropdownContainer>
                    <NavLink href="./blog">Blogs</NavLink>
                    <NavLink href="./about_us">About Us</NavLink>
                    <NavLink href="./contact">Contact</NavLink>
                </NavLinks>

                {scrolled ? (
                    <NavSocial>
                        {socialLinks.map((link, index) => (
                            <SocialIcon key={index} href={link.url} target="_blank" rel="noopener noreferrer">
                                {link.icon}
                            </SocialIcon>
                        ))}
                    </NavSocial>
                ) : (
                    <AuthButtons>
                        <AuthButton href="#">Login</AuthButton>
                        <AuthButton $primary href="#">Sign Up</AuthButton>
                    </AuthButtons>
                )}
                <MobileMenuButton onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                    {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </MobileMenuButton>
            </Nav>

            <AnimatePresence>
                {isMobileMenuOpen && (
                    <MobileMenu
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ duration: 0.3 }}
                    >
                        <MobileNavLink href="#">Home</MobileNavLink>
                        <MobileNavLink href="#">AI Tools</MobileNavLink>
                        <MobileNavLink href="#">IELTS Modules</MobileNavLink>
                        <MobileNavLink href="#">About Us</MobileNavLink>
                        <MobileNavLink href="#">Contact</MobileNavLink>
                        <AuthButton href="#">Login</AuthButton>
                        <AuthButton $primary href="#">Sign Up</AuthButton>
                    </MobileMenu>
                )}
            </AnimatePresence>
        </>
    );
};


const Footer = () => {
    return (
        <FooterContainer>
            <FooterGrid>
                <FooterSection>
                    <FooterTitle>Company</FooterTitle>
                    <FooterLink href="#">About Us</FooterLink>
                    <FooterLink href="#">Contact</FooterLink>
                    <FooterLink href="#">Careers</FooterLink>
                </FooterSection>
                <FooterSection>
                    <FooterTitle>Resources</FooterTitle>
                    <FooterLink href="#">Listening</FooterLink>
                    <FooterLink href="#">Reading</FooterLink>
                    <FooterLink href="#">Writing</FooterLink>
                    <FooterLink href="#">Speaking</FooterLink>
                </FooterSection>
                <FooterSection>
                    <FooterTitle>Legal</FooterTitle>
                    <FooterLink href="#">Privacy Policy</FooterLink>
                    <FooterLink href="#">Terms of Service</FooterLink>
                </FooterSection>
                <FooterSection>
                    <FooterTitle>Follow Us</FooterTitle>
                    <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                        <FooterLink href="#"><Facebook size={24} /></FooterLink>
                        <FooterLink href="#"><Instagram size={24} /></FooterLink>
                        <FooterLink href="#"><Twitter size={24} /></FooterLink>
                        <FooterLink href="#"><Youtube size={24} /></FooterLink>
                        <FooterLink href="#"><Linkedin size={24} /></FooterLink>
                    </div>
                </FooterSection>
            </FooterGrid>
            <FooterCopyright>
                &copy; {new Date().getFullYear()} IELTS Pro. All rights reserved.
            </FooterCopyright>
        </FooterContainer>
    );
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
            <Navbar />

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
            <Footer />
        </>
    );
};

export default ListeningPage;
