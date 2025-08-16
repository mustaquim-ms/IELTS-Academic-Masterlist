import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styled, { keyframes, createGlobalStyle, css } from 'styled-components';
import {
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
  Brain,
  MessageCircle,
  BookOpen,
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

// Note: This code uses styled-components, which needs to be installed.
// Run 'npm install styled-components' or 'yarn add styled-components' in your project.

// =========================================================================
// ---------------------------- GLOBAL STYLES & COMPONENTS -----------------
// =========================================================================

// Define global styles using createGlobalStyle
const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
  
  body {
    font-family: 'Inter', sans-serif;
    background-color: #f0f4f8;
    color: #334155;
    margin: 0;
    padding: 0;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
`;

// Define keyframe animations
const pulse = keyframes`
  0%, 100% {
    transform: scale(1);
    opacity: 0.3;
  }
  50% {
    transform: scale(1.1);
    opacity: 0.5;
  }
`;

// Styled component for the animated loader to fix the runtime error
const AnimatedLoader = styled(Loader2)`
  animation: ${pulse} 2s infinite;
`;


// Styled Components for consistent UI elements
const Container = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 4rem;
  @media (max-width: 768px) {
    padding: 0 1rem;
  }
`;

const SectionTitle = styled.h2`
  font-size: 3rem;
  font-weight: 800;
  color: #1e3a8a;
  text-align: center;
  margin-bottom: 1rem;
  @media (max-width: 768px) {
    font-size: 2.25rem;
  }
`;

const SectionSubtitle = styled.p`
  font-size: 1.25rem;
  color: #64748b;
  text-align: center;
  max-width: 50rem;
  margin: 0 auto 4rem;
`;

const Card = styled(motion.div)`
  background-color: #ffffff;
  border-radius: 1.5rem;
  padding: 2.5rem;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05), 0 2px 10px rgba(0, 0, 0, 0.02);
  border: 1px solid #e2e8f0;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
  }
`;

const Button = styled(motion.button)`
  background: linear-gradient(135deg, #2563eb, #3b82f6);
  color: #ffffff;
  font-weight: 700;
  border: none;
  border-radius: 9999px;
  padding: 1rem 2.5rem;
  cursor: pointer;
  box-shadow: 0 4px 15px rgba(37, 99, 235, 0.3);
  transition: transform 0.3s ease, box-shadow 0.3s ease, background 0.3s ease;
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 20px rgba(37, 99, 235, 0.4);
    background: linear-gradient(135deg, #1e40af, #2563eb);
  }
`;

const ActionButton = styled(Button)`
  background: linear-gradient(135deg, #f59e0b, #facc15);
  box-shadow: 0 4px 15px rgba(245, 158, 11, 0.3);
  &:hover {
    background: linear-gradient(135deg, #d97706, #f59e0b);
    box-shadow: 0 6px 20px rgba(245, 158, 11, 0.4);
  }
`;

const OutlineButton = styled.button`
  background: transparent;
  color: #2563eb;
  font-weight: 600;
  border: 2px solid #2563eb;
  border-radius: 9999px;
  padding: 0.75rem 2rem;
  cursor: pointer;
  transition: all 0.3s ease;
  &:hover {
    background-color: #2563eb;
    color: #ffffff;
    box-shadow: 0 4px 15px rgba(37, 99, 235, 0.2);
  }
`;

const NavLink = styled(motion.a)`
  color: #4b5563;
  font-weight: 600;
  font-size: 1rem;
  text-decoration: none;
  position: relative;
  transition: color 0.3s ease, transform 0.3s ease;
  padding: 0.5rem 0;

  &:hover {
    color: #1e3a8a;
    transform: translateY(-2px);
  }

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 2px;
    background-color: #f59e0b;
    transition: width 0.3s ease;
  }
  &:hover::after {
    width: 100%;
  }
`;

// Mock Link component
const Link = ({ href, children, ...props }) => {
  return <a href={href} {...props}>{children}</a>;
};


// Custom hook to handle hover state
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


const Navbar = () => {
  const [aiToolsRef, isAiToolsHovering] = useHover();
  const [ieltsModulesRef, isIeltsModulesHovering] = useHover();
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleScroll = () => {
    const offset = window.scrollY;
    setScrolled(offset > 50);
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
    { name: 'Document Analysis', path: '#' },
    { name: 'Quiz Generation', path: '#' },
    { name: 'Personalized Assistance', path: '#' },
    { name: 'Smart Study Planner', path: '#' },
    { name: 'IELTS Preparation', path: '#' },
    { name: 'AI Image Generator', path: '#' },
  ];

  const ieltsModules = [
    { name: 'Listening', path: '#' },
    { name: 'Speaking', path: '#' },
    { name: 'Reading', path: '#' },
    { name: 'Writing', path: '#' },
  ];

  const socialLinks = [
    { name: 'facebook', icon: <Facebook />, url: 'https://www.facebook.com' },
    { name: 'instagram', icon: <Instagram />, url: 'https://www.instagram.com' },
    { name: 'twitter', icon: <Twitter />, url: 'https://www.twitter.com' },
    { name: 'youtube', icon: <Youtube />, url: 'https://www.youtube.com' },
    { name: 'linkedin', icon: <Linkedin />, url: 'https://www.linkedin.com' },
  ];

  const Nav = styled.nav`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 4rem;
    z-index: 50;
    transition: all 0.3s ease-in-out;
    ${scrolled && css`
      background-color: rgba(255, 255, 255, 0.8);
      backdrop-filter: blur(10px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
    `}
    @media (max-width: 1024px) {
      padding: 1rem 1rem;
    }
  `;

  const NavLogo = styled(motion.div)`
    font-size: 2rem;
    font-weight: 800;
    color: #1e3a8a;
    display: flex;
    align-items: center;
    img {
      height: 3rem;
      width: auto;
      object-fit: contain;
    }
  `;

  const NavMenu = styled.div`
    display: flex;
    gap: 2rem;
    @media (max-width: 1024px) {
      display: none;
    }
  `;

  const DropdownContainer = styled.div`
    position: relative;
  `;

  const DropdownMenu = styled(motion.div)`
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    background: #ffffff;
    border-radius: 0.5rem;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    padding: 0.5rem;
    min-width: 200px;
    z-index: 50;
    transform-origin: top center;
  `;

  const DropdownItem = styled(Link)`
    display: block;
    padding: 0.75rem 1rem;
    color: #1a202c;
    font-weight: 500;
    transition: background-color 0.2s ease, color 0.2s ease;
    border-radius: 0.25rem;
    &:hover {
      background-color: #e0f2fe;
      color: #2563eb;
    }
  `;

  const AuthButtons = styled.div`
    display: flex;
    gap: 1rem;
    align-items: center;
    @media (max-width: 1024px) {
      display: none;
    }
  `;

  const MobileMenuButton = styled.button`
    display: none;
    background: none;
    border: none;
    cursor: pointer;
    z-index: 50;
    color: #2563eb;
    @media (max-width: 1024px) {
      display: block;
    }
  `;

  const MobileMenu = styled(motion.div)`
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    width: 75%;
    background: #ffffff;
    padding: 2rem;
    box-shadow: -4px 0 20px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    z-index: 40;
    a {
      font-size: 1.25rem;
      font-weight: 600;
      color: #4b5563;
      text-decoration: none;
      transition: color 0.3s ease;
      &:hover {
        color: #2563eb;
      }
    }
  `;

  return (
    <>
      <Nav>
        <NavLogo>
          <Link href="/" passHref>
            <motion.img
              src={scrolled ? "/scrolled.png" : "/logo_main.png"}
              alt="Determined IELTS Logo"
              whileHover={{ scale: 1.05 }}
            />
          </Link>
        </NavLogo>

        <NavMenu>
          <NavLink href="#">Home</NavLink>

          <DropdownContainer ref={aiToolsRef}>
            <NavLink href="#" as="span">AI Tools <ChevronDown size={16} style={{ display: 'inline-block', verticalAlign: 'middle', marginLeft: '0.5rem' }} /></NavLink>
            <AnimatePresence>
              {isAiToolsHovering && (
                <DropdownMenu
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={dropdownVariants}
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
            <NavLink href="#" as="span">IELTS Modules <ChevronDown size={16} style={{ display: 'inline-block', verticalAlign: 'middle', marginLeft: '0.5rem' }} /></NavLink>
            <AnimatePresence>
              {isIeltsModulesHovering && (
                <DropdownMenu
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={dropdownVariants}
                >
                  {ieltsModules.map((module, index) => (
                    <DropdownItem key={index} href={module.path}>
                      {module.name}
                    </DropdownItem>
                  ))}
                </DropdownMenu>
              )}
            </AnimatePresence>
          </DropdownContainer>
          <NavLink href="#">About Us</NavLink>
          <NavLink href="#">Contact</NavLink>
        </NavMenu>

        <AuthButtons>
          <OutlineButton>Login</OutlineButton>
          <Button>Sign Up</Button>
        </AuthButtons>

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
            <Link href="#">Home</Link>
            <Link href="#">AI Tools</Link>
            <Link href="#">IELTS Modules</Link>
            <Link href="#">About Us</Link>
            <Link href="#">Contact</Link>
            <OutlineButton style={{ width: '100%', marginTop: '1rem' }}>Login</OutlineButton>
            <Button style={{ width: '100%' }}>Sign Up</Button>
          </MobileMenu>
        )}
      </AnimatePresence>
    </>
  );
};


const Footer = () => {
  const FooterContainer = styled.footer`
    background-color: #1f2937;
    color: #e5e7eb;
    padding: 4rem 1rem;
    margin-top: 4rem;
  `;
  const FooterGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 2rem;
    max-width: 1280px;
    margin: 0 auto;
    @media (max-width: 768px) {
      grid-template-columns: repeat(2, 1fr);
    }
    @media (max-width: 480px) {
      grid-template-columns: 1fr;
    }
  `;
  const FooterLink = styled(Link)`
    color: #9ca3af;
    font-size: 1rem;
    margin-bottom: 0.75rem;
    transition: color 0.3s ease;
    text-decoration: none;
    &:hover {
      color: #f59e0b;
    }
  `;
  const SocialLinks = styled.div`
    display: flex;
    gap: 1rem;
    margin-top: 1rem;
    a {
      color: #9ca3af;
      transition: color 0.3s ease;
      &:hover {
        color: #f59e0b;
      }
    }
  `;
  const Copyright = styled.p`
    text-align: center;
    margin-top: 3rem;
    padding-top: 1.5rem;
    border-top: 1px solid #374151;
    font-size: 0.875rem;
    color: #4b5563;
  `;

  return (
    <FooterContainer>
      <FooterGrid>
        <div>
          <h4 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: 'white', marginBottom: '1rem' }}>Company</h4>
          <FooterLink href="#">About Us</FooterLink>
          <FooterLink href="#">Contact</FooterLink>
          <FooterLink href="#">Careers</FooterLink>
        </div>
        <div>
          <h4 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: 'white', marginBottom: '1rem' }}>Resources</h4>
          <FooterLink href="#">Listening</FooterLink>
          <FooterLink href="#">Reading</FooterLink>
          <FooterLink href="#">Writing</FooterLink>
          <FooterLink href="#">Speaking</FooterLink>
        </div>
        <div>
          <h4 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: 'white', marginBottom: '1rem' }}>Legal</h4>
          <FooterLink href="#">Privacy Policy</FooterLink>
          <FooterLink href="#">Terms of Service</FooterLink>
        </div>
        <div>
          <h4 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: 'white', marginBottom: '1rem' }}>Follow Us</h4>
          <SocialLinks>
            <Link href="#"><Facebook size={24} /></Link>
            <Link href="#"><Instagram size={24} /></Link>
            <Link href="#"><Twitter size={24} /></Link>
            <Link href="#"><Youtube size={24} /></Link>
            <Link href="#"><Linkedin size={24} /></Link>
          </SocialLinks>
        </div>
      </FooterGrid>
      <Copyright>
        &copy; {new Date().getFullYear()} IELTS Pro. All rights reserved.
      </Copyright>
    </FooterContainer>
  );
};


// --- Custom hook to handle all Firebase logic and state ---
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
// -------------------- NEW COMPONENTS FOR AUTH & DASHBOARD ----------------
// =========================================================================
const AuthContainer = styled(motion.div)`
  background: #ffffff;
  border-radius: 1.5rem;
  padding: 2.5rem;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05);
  width: 100%;
  max-width: 28rem;
  text-align: center;
  border: 1px solid #e2e8f0;
  margin: 0 auto;
`;

const AuthTitle = styled.h3`
  font-size: 1.875rem;
  font-weight: 700;
  color: #1e3a8a;
  margin-bottom: 1.5rem;
`;

const AuthForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  border: 1px solid #e2e8f0;
  font-size: 1rem;
  transition: all 0.3s ease;
  &:focus {
    outline: none;
    border-color: #2563eb;
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
  }
`;

const LoginButton = styled(Button)`
  width: 100%;
  margin-top: 0.5rem;
`;

const ForgotPasswordLink = styled.p`
  margin-top: 1rem;
  font-size: 0.875rem;
  color: #64748b;
  cursor: pointer;
  transition: color 0.3s ease, text-decoration 0.3s ease;
  &:hover {
    color: #2563eb;
    text-decoration: underline;
  }
`;

const ModalOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10000;
`;

const ModalContent = styled(motion.div)`
  background-color: #ffffff;
  padding: 2.5rem;
  border-radius: 1rem;
  width: 90%;
  max-width: 28rem;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
  text-align: center;
`;

const ModalTitle = styled.h4`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
`;

const ModalText = styled.p`
  margin-bottom: 1.5rem;
  color: #4b5563;
`;

const ModalButton = styled(Button)`
  width: 100%;
`;

const DashboardContainer = styled(Card)`
  padding: 2.5rem;
  max-width: 64rem;
  width: 100%;
  margin: 0 auto;
`;

const DashboardTitle = styled.h3`
  font-size: 1.875rem;
  font-weight: 700;
  color: #1e3a8a;
  text-align: left;
`;

const DashboardSection = styled.div`
  margin-top: 2rem;
`;

const ChartTitle = styled.h4`
  font-size: 1.25rem;
  font-weight: 600;
  color: #1e3a8a;
  margin-bottom: 1rem;
  text-align: left;
`;

// --- Custom Bar Chart component using HTML Canvas ---
const CustomBarChart = ({ data }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;

    const ctx = canvas.getContext('2d');
    ctx.scale(dpr, dpr);

    const chartWidth = rect.width;
    const chartHeight = rect.height;
    const padding = 30;
    const barWidth = 40;
    const maxScore = 40;
    const spacing = (chartWidth - padding * 2 - data.length * barWidth) / (data.length > 1 ? data.length - 1 : 1);
    const scaleY = (chartHeight - padding * 2) / maxScore;

    ctx.clearRect(0, 0, chartWidth, chartHeight);

    ctx.font = '12px Inter, sans-serif';
    ctx.fillStyle = '#1F2937';
    ctx.textAlign = 'center';

    data.forEach((item, index) => {
      const x = padding + index * (barWidth + spacing) + barWidth / 2;
      const barHeight = item.score * scaleY;
      const y = chartHeight - padding - barHeight;

      ctx.fillStyle = '#2563eb';
      ctx.fillRect(x - barWidth / 2, y, barWidth, barHeight);

      ctx.fillStyle = '#4B5563';
      ctx.fillText(item.name, x, chartHeight - padding + 20);

      ctx.fillStyle = '#1F2937';
      ctx.fillText(item.score, x, y - 5);
    });

    const numYLabels = 5;
    for (let i = 0; i <= numYLabels; i++) {
      const scoreValue = (maxScore / numYLabels) * i;
      const yPos = chartHeight - padding - (scoreValue * scaleY);
      ctx.fillStyle = '#4B5563';
      ctx.textAlign = 'right';
      ctx.fillText(scoreValue, padding - 10, yPos);

      if (i > 0) {
        ctx.strokeStyle = '#E5E7EB';
        ctx.setLineDash([2, 2]);
        ctx.beginPath();
        ctx.moveTo(padding, yPos);
        ctx.lineTo(chartWidth - padding, yPos);
        ctx.stroke();
      }
    }
    ctx.setLineDash([]);

  }, [data]);

  return (
    <div style={{ padding: '1rem', borderRadius: '0.75rem', boxShadow: '0 1px 2px rgba(0,0,0,0.05)', border: '1px solid #e2e8f0', backgroundColor: 'white' }}>
      <canvas ref={canvasRef} style={{ width: '100%', height: '300px' }}></canvas>
    </div>
  );
};

const Dashboard = ({ data, onLogout }) => (
  <DashboardContainer
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
      <DashboardTitle>Your Progress</DashboardTitle>
      <OutlineButton onClick={onLogout}>Log Out</OutlineButton>
    </div>
    <DashboardSection>
      <ChartTitle>Assessment Scores</ChartTitle>
      <CustomBarChart data={data} />
    </DashboardSection>
  </DashboardContainer>
);

const LoginForm = ({ onLogin, onForgotPassword }) => (
  <AuthContainer
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <AuthTitle>Log In to My Assessment</AuthTitle>
    <AuthForm onSubmit={onLogin}>
      <Input type="email" placeholder="Email" required />
      <Input type="password" placeholder="Password" required />
      <LoginButton type="submit">Log In</LoginButton>
    </AuthForm>
    <ForgotPasswordLink onClick={onForgotPassword}>
      Forgot Password?
    </ForgotPasswordLink>
  </AuthContainer>
);

const ForgotPasswordModal = ({ onClose, onSendReset }) => (
  <ModalOverlay
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
  >
    <ModalContent
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.8, opacity: 0 }}
    >
      <ModalTitle>Forgot Password</ModalTitle>
      <ModalText>
        Enter your email address and we&apos;ll send you a link to reset your password.
      </ModalText>
      <Input type="email" placeholder="Email Address" required />
      <ModalButton onClick={onSendReset}>
        Send Reset Link
      </ModalButton>
    </ModalContent>
  </ModalOverlay>
);

// Generate mock data for the last 7 days
const generateMockData = () => {
  const data = [];
  const today = new Date();
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  for (let i = 6; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    const day = dayNames[d.getDay()];
    const score = Math.floor(Math.random() * (9 - 4) + 4) * 5; // Scale to 40
    data.push({
      name: day,
      score: score
    });
  }
  return data;
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
  const [listeningAssessments, setListeningAssessments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // New state for authentication and modal
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isForgotPasswordModalOpen, setIsForgotPasswordModalOpen] = useState(false);

  // Mock data for dashboard
  const dashboardData = generateMockData();

  // --- Handlers for authentication ---
  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Simulating login...");
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  const handleForgotPassword = () => {
    setIsForgotPasswordModalOpen(true);
  };

  const handleSendResetLink = () => {
    setIsForgotPasswordModalOpen(false);
    console.log("Password reset link sent!");
    // In a real app, this would trigger an API call.
  };

  // --- Mock Data for the new sections ---
  const keySkills = [
    {
      icon: <Headphones size={32} color="#f59e0b" />,
      title: 'Listening for Details',
      description: 'Focus on extracting specific pieces of information, such as names, dates, or numbers.',
    },
    {
      icon: <Brain size={32} color="#f59e0b" />,
      title: 'Understanding Gist',
      description: 'Develop the ability to grasp the main idea and overall meaning of a conversation.',
    },
    {
      icon: <MessageCircle size={32} color="#f59e0b" />,
      title: 'Following a Conversation',
      description: 'Practice tracking a conversation between multiple speakers and identifying their attitudes.',
    },
  ];

  const practiceTests = [
    { id: 1, title: 'Full Practice Test 1', description: 'A complete, timed listening test covering all four sections.', type: 'Full' },
    { id: 2, title: 'Section 1: Conversation', description: 'A focused practice on a conversation in a social context.', type: 'Section' },
    { id: 3, title: 'Section 2: Monologue', description: 'Practice with a monologue, often in a social or non-academic context.', type: 'Section' },
    { id: 4, title: 'Full Practice Test 2', description: 'Another complete, timed test to benchmark your progress.', type: 'Full' },
  ];

  const tipsAndStrategies = [
    { id: 1, title: 'Top 5 Tips for Listening', description: 'Expert advice on how to improve your listening score quickly.' },
    { id: 2, title: 'Common Distractors to Avoid', description: 'Learn to identify and avoid common traps in the listening test.' },
    { id: 3, title: 'Note-Taking Techniques', description: 'Master effective note-taking strategies for each section of the test.' },
  ];

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

  const AssessmentPage = styled.div`
    background-color: #ffffff;
    border-radius: 1.5rem;
    padding: 2.5rem;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05);
    border: 1px solid #e2e8f0;
    text-align: center;
  `;

  const AssessmentTitle = styled.h2`
    font-size: 1.875rem;
    font-weight: 700;
    color: #1e3a8a;
    margin-bottom: 1rem;
  `;

  const AssessmentText = styled.p`
    font-size: 1.125rem;
    color: #64748b;
    margin-bottom: 1.5rem;
  `;

  const AudioPlayerPlaceholder = styled.div`
    height: 12rem;
    background-color: #f8fafc;
    border-radius: 0.75rem;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 1.5rem;
    svg {
      color: #2563eb;
    }
  `;

  const AssessmentButton = styled(ActionButton)`
    width: 100%;
  `;

  const renderAssessmentPage = () => {
    return (
      <AssessmentPage>
        <AssessmentTitle>Listening Assessment</AssessmentTitle>
        <AssessmentText>
          This is a mock listening test. You would see questions and an audio player here.
        </AssessmentText>
        <AudioPlayerPlaceholder>
          <Play size={48} />
        </AudioPlayerPlaceholder>
        <AssessmentButton onClick={handleSubmitAssessment}>
          Submit Mock Assessment
        </AssessmentButton>
      </AssessmentPage>
    );
  };

  const ResultsCard = styled(motion.div)`
    background-color: #ebf8ff;
    border-radius: 1.5rem;
    padding: 2.5rem;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05);
    border: 2px solid #90cdf4;
    text-align: center;
  `;

  const ResultsHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
  `;

  const ResultsTitle = styled.h2`
    font-size: 1.5rem;
    font-weight: 700;
    color: #1e3a8a;
  `;

  const ResultsText = styled.p`
    font-size: 1.125rem;
    font-weight: 600;
    color: #4b5563;
  `;

  const ResultsScore = styled.h4`
    font-size: 3rem;
    font-weight: 800;
    color: #1e3a8a;
  `;

  const ResultsMeta = styled.p`
    margin-top: 1rem;
    font-size: 0.875rem;
    color: #6b7280;
  `;

  const renderAssessmentResults = () => {
    return (
      <ResultsCard
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
      >
        <ResultsHeader>
          <ResultsTitle>Your Results</ResultsTitle>
          <Award size={40} color="#f59e0b" />
        </ResultsHeader>
        <ResultsText>Score: {assessmentResults.score} / 40</ResultsText>
        <ResultsScore>Band Score: {assessmentResults.bandScore}</ResultsScore>
        <ResultsMeta>
          Saved on: {new Date(assessmentResults.timestamp).toLocaleString()}
        </ResultsMeta>
      </ResultsCard>
    );
  };

  const HeroSection = styled.div`
    background: linear-gradient(135deg, #e0f2fe 0%, #fff7ed 100%);
    padding: 8rem 0 6rem;
    text-align: center;
    position: relative;
  `;

  const HeroTitle = styled(motion.h1)`
    font-size: 4rem;
    font-weight: 800;
    color: #1e3a8a;
    line-height: 1.2;
    margin-bottom: 1rem;
    @media (max-width: 768px) {
      font-size: 2.5rem;
    }
  `;

  const HeroSubtitle = styled(motion.p)`
    font-size: 1.25rem;
    color: #64748b;
    max-width: 50rem;
    margin: 0 auto 2rem;
  `;

  const Section = styled.section`
    padding: 4rem 0;
    @media (max-width: 768px) {
      padding: 2rem 0;
    }
  `;

  const CardGrid = styled(motion.div)`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;
    margin-top: 3rem;
    @media (max-width: 1024px) {
      grid-template-columns: repeat(2, 1fr);
    }
    @media (max-width: 768px) {
      grid-template-columns: 1fr;
    }
  `;

  const CardItem = styled(motion.div)`
    background-color: #ffffff;
    padding: 2.5rem;
    border-radius: 1.5rem;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05);
    border: 1px solid #e2e8f0;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    transition: transform 0.3s ease;
    &:hover {
      transform: translateY(-5px);
    }
  `;

  const CardIcon = styled.div`
    background-color: #eff6ff;
    color: #2563eb;
    padding: 1.5rem;
    border-radius: 1rem;
    margin-bottom: 1.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
  `;

  const CardTitle = styled.h3`
    font-size: 1.25rem;
    font-weight: 700;
    color: #1e3a8a;
    margin-bottom: 0.5rem;
  `;

  const CardDescription = styled.p`
    color: #4b5563;
  `;

  const PracticeCard = styled(Card)`
    display: flex;
    flex-direction: column;
    cursor: pointer;
    &:hover {
      box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
      transform: translateY(-5px);
    }
  `;
  const PracticeHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
  `;
  const PracticeTitle = styled.h4`
    font-size: 1.25rem;
    font-weight: 700;
    color: #1e3a8a;
  `;
  const PracticeType = styled.span`
    padding: 0.25rem 0.75rem;
    border-radius: 9999px;
    font-size: 0.875rem;
    font-weight: 600;
    background-color: #dbeafe;
    color: #1e40af;
  `;
  const PracticeDescription = styled.p`
    color: #4b5563;
    flex-grow: 1;
  `;
  const PracticeButton = styled(OutlineButton)`
    align-self: flex-start;
    margin-top: 1rem;
  `;

  const TipsCard = styled(Card)`
    cursor: pointer;
    &:hover {
      box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
      transform: translateY(-5px);
    }
  `;
  const TipsTitle = styled.h4`
    font-size: 1.25rem;
    font-weight: 700;
    color: #1e3a8a;
    margin-bottom: 0.5rem;
  `;
  const TipsDescription = styled.p`
    color: #4b5563;
  `;

  const AssessmentHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
    flex-wrap: wrap;
    gap: 1rem;
  `;
  const PastResultsContainer = styled(motion.div)`
    display: grid;
    gap: 1rem;
    margin-top: 2rem;
  `;
  const PastResultCard = styled(motion.div)`
    background-color: #ffffff;
    padding: 1.5rem;
    border-radius: 1.5rem;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
    border: 1px solid #e2e8f0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    transition: all 0.3s ease;
    &:hover {
      transform: translateX(5px);
      box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
    }
  `;
  const ResultDetails = styled.div`
    h4 {
      font-size: 1.5rem;
      font-weight: 800;
      color: #1e3a8a;
    }
    p {
      color: #64748b;
      font-size: 0.875rem;
    }
  `;

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

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
        <HeroSection>
          <Container>
            <HeroTitle
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Master the IELTS Listening Test
            </HeroTitle>
            <HeroSubtitle
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Sharpen your skills with dedicated practice, expert strategies, and a wealth of resources to achieve your target band score.
            </HeroSubtitle>
            <Button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              onClick={() => console.log('Start Journey')}
            >
              Start Your Journey
            </Button>
          </Container>
        </HeroSection>

        {/* Key Skills Section */}
        <Section>
          <Container>
            <SectionTitle>Key Skills to Master</SectionTitle>
            <SectionSubtitle>
              The Listening test requires a combination of different skills. Our resources help you train each one.
            </SectionSubtitle>
            <CardGrid
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              {keySkills.map((skill, index) => (
                <CardItem key={index} variants={itemVariants}>
                  <CardIcon>{skill.icon}</CardIcon>
                  <CardTitle>{skill.title}</CardTitle>
                  <CardDescription>{skill.description}</CardDescription>
                </CardItem>
              ))}
            </CardGrid>
          </Container>
        </Section>

        {/* Practice Tests Section */}
        <Section>
          <Container>
            <SectionTitle>Practice Tests</SectionTitle>
            <SectionSubtitle>
              Prepare for the real exam with full-length and section-specific practice tests.
            </SectionSubtitle>
            <CardGrid
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}
            >
              {practiceTests.map((test, index) => (
                <PracticeCard key={index} variants={itemVariants} onClick={() => console.log(`Starting test: ${test.title}`)}>
                  <PracticeHeader>
                    <PracticeTitle>{test.title}</PracticeTitle>
                    <PracticeType>{test.type}</PracticeType>
                  </PracticeHeader>
                  <PracticeDescription>{test.description}</PracticeDescription>
                  <PracticeButton>Start Now</PracticeButton>
                </PracticeCard>
              ))}
            </CardGrid>
          </Container>
        </Section>

        {/* Tips & Strategies Section */}
        <Section>
          <Container>
            <SectionTitle>Tips & Strategies</SectionTitle>
            <SectionSubtitle>
              Unlock your full potential with our expert-curated articles and guides.
            </SectionSubtitle>
            <CardGrid
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              {tipsAndStrategies.map((tip, index) => (
                <TipsCard key={index} variants={itemVariants} onClick={() => console.log(`Reading tip: ${tip.title}`)}>
                  <TipsTitle>{tip.title}</TipsTitle>
                  <TipsDescription>{tip.description}</TipsDescription>
                </TipsCard>
              ))}
            </CardGrid>
          </Container>
        </Section>

        {/* My Assessments Section - Updated */}
        <Section>
          <Container>
            <AssessmentHeader>
              <SectionTitle style={{ textAlign: 'left', marginBottom: '0' }}>My Assessments</SectionTitle>
              <ActionButton onClick={handleStartAssessment}>Start New Assessment</ActionButton>
            </AssessmentHeader>

            <AnimatePresence mode="wait">
              {isLoggedIn ? (
                <motion.div key="dashboard">
                  <Dashboard data={dashboardData} onLogout={handleLogout} />
                </motion.div>
              ) : (
                <motion.div key="login-form">
                  <LoginForm onLogin={handleLogin} onForgotPassword={handleForgotPassword} />
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {isForgotPasswordModalOpen && (
                <ForgotPasswordModal
                  onClose={() => setIsForgotPasswordModalOpen(false)}
                  onSendReset={handleSendResetLink}
                />
              )}
            </AnimatePresence>

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

            <div style={{ marginTop: '3rem' }}>
              <TipsTitle style={{ fontSize: '1.5rem', textAlign: 'left', marginBottom: '1.5rem' }}>Past Results</TipsTitle>
              {isLoading ? (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '12rem', color: '#2563eb' }}>
                  <AnimatedLoader size={48} />
                </div>
              ) : (
                <PastResultsContainer
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {listeningAssessments.length > 0 ? (
                    listeningAssessments.map((result) => (
                      <PastResultCard
                        key={result.id}
                        variants={itemVariants}
                      >
                        <ResultDetails>
                          <p style={{ fontSize: '1rem', fontWeight: '600', color: '#64748b' }}>Assessment Score: {result.score}/40</p>
                          <h4>Band Score: {result.bandScore}</h4>
                          <p>
                            Completed on: {new Date(result.timestamp).toLocaleString()}
                          </p>
                        </ResultDetails>
                        <div style={{ padding: '0.75rem', backgroundColor: '#dcfce7', color: '#22c55e', borderRadius: '50%' }}>
                          <CircleCheck size={24} />
                        </div>
                      </PastResultCard>
                    ))
                  ) : (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      style={{ textAlign: 'center', padding: '2rem', backgroundColor: '#f8fafc', borderRadius: '1.5rem', color: '#64748b' }}
                    >
                      <p style={{ fontSize: '1.125rem' }}>No past assessments found. Start a new one to see your history!</p>
                    </motion.div>
                  )}
                </PastResultsContainer>
              )}
            </div>
          </Container>
        </Section>

        <div style={{ position: 'fixed', bottom: '1rem', right: '1rem', backgroundColor: '#1e293b', color: '#ffffff', fontSize: '0.875rem', padding: '0.75rem', borderRadius: '0.5rem', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)', opacity: '0.9', zIndex: '50' }}>
          <p>Your User ID:</p>
          <p style={{ fontFamily: 'monospace' }}>{userId || 'Loading...'}</p>
        </div>
      </motion.div>
      <Footer />
    </>
  );
};

export default ListeningPage;