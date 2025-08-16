import { useState, useEffect, useRef, useCallback } from 'react';
import Head from 'next/head';
import styled, { keyframes, createGlobalStyle } from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { Facebook, Instagram, Twitter, Youtube, Linkedin, ChevronDown } from 'lucide-react';

// NOTE: The 'three' module is causing a build error even with npm install.
// To fix this, we'll load it via a CDN script tag in the HTML head and access it globally.
// This is a robust workaround for environments where direct module imports fail.

// Custom Hook for Dropdown
const useHover = () => {
  const [isHovering, setIsHovering] = useState(false);
  const ref = useRef(null);

  const handleMouseEnter = useCallback(() => setIsHovering(true), []);
  const handleMouseLeave = useCallback(() => setIsHovering(false), []);

  useEffect(() => {
    const node = ref.current;
    if (node) {
      node.addEventListener('mouseenter', handleMouseEnter);
      node.addEventListener('mouseleave', handleMouseLeave);

      return () => {
        node.removeEventListener('mouseenter', handleMouseEnter);
        node.removeEventListener('mouseleave', handleMouseLeave);
      };
    }
  }, [handleMouseEnter, handleMouseLeave]);

  return [ref, isHovering];
};


// Global styles for custom cursors, fonts, and new color variables
const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&family=Poppins:wght@400;600;700;800&display=swap');

  :root {
    --primary-color: #3AAFA9;
    --primary-color-dark: #2B7A78;
    --primary-color-extra-dark: #17252A;
    --background-color-light: #DEF2F1;
    --text-color: #17252A;
    --text-color-secondary: #2B7A78;
    --card-background: #FEFFFF;
  }
  
  body {
    cursor: url("data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill='%2317252A' d='M12 2A10 10 0 0 0 2 12a10 10 0 0 0 10 10a10 10 0 0 0 10-10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8a8 8 0 0 1-8 8z'/%3E%3C/svg%3E") 12 12, auto;
    font-family: 'Inter', sans-serif;
    background-color: var(--background-color-light);
    margin: 0;
    padding: 0;
    overflow-x: hidden;
  }
  
  a, button {
    cursor: url("data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill='%233AAFA9' d='M3 21l9-18 9 18z'/%3E%3C/svg%3E") 12 12, pointer;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: 'Poppins', sans-serif;
  }
`;

// Keyframes for typewriter effect
const blink = keyframes`
  50% { border-color: transparent; }
`;

// Styled Components for the Home Page
const MainLayout = styled.div`
  position: relative;
  z-index: 10;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  padding-top: 5rem;
  background-color: transparent;
  color: var(--text-color);
`;

const CanvasWrapper = styled.div`
  position: fixed;
  inset: 0;
  z-index: 0;
`;

// Navbar
const Nav = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: transparent;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  z-index: 1000;
  transition: all 0.3s ease-in-out;

  &.scrolled {
    background-color: rgba(254, 255, 255, 0.5);
    backdrop-filter: blur(10px);
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  }
`;

const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
  
  @media (max-width: 1024px) {
    display: none; // Example: hide on smaller screens
  }
`;

const NavLogo = styled(motion.div)`
  font-size: 1.5rem;
  font-weight: 800;
  color: var(--primary-color-extra-dark);
  display: flex;
  align-items: center;

  img {
    height: 50px;
    width: auto;
    object-fit: contain; /* Ensures the image is not stretched */
  }
`;

const NavLink = styled(Link)`
  font-size: 1rem;
  font-weight: 600;
  color: var(--text-color-secondary);
  text-decoration: none;
  transition: all 0.3s ease;
  position: relative;
  display: flex;
  align-items: center;

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
`;

const AuthButton = styled(Link)`
  background-color: transparent;
  border: 2px solid ${props => props.primary ? 'var(--primary-color)' : 'transparent'};
  color: ${props => props.primary ? 'var(--primary-color)' : 'var(--text-color-secondary)'};
  padding: 0.5rem 1rem;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 9999px;
  text-decoration: none;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: ${props => props.primary ? 'var(--primary-color)' : 'transparent'};
    color: ${props => props.primary ? 'white' : 'var(--primary-color-dark)'};
    box-shadow: ${props => props.primary ? '0 4px 12px rgba(0,0,0,0.1)' : 'none'};
    transform: translateY(-2px);
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
  background-color: var(--card-background);
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  padding: 0.5rem;
  min-width: 200px;
  z-index: 1001;
  margin-top: 1rem;
`;

const DropdownItem = styled(Link)`
  display: block;
  padding: 0.75rem 1rem;
  color: var(--text-color);
  text-decoration: none;
  font-weight: 500;
  transition: background-color 0.2s ease, color 0.2s ease;
  border-radius: 6px;
  &:hover {
    background-color: var(--background-color-light);
    color: var(--primary-color-dark);
  }
`;

// Hero Section
const HeroSection = styled(motion.section)`
  position: relative;
  z-index: 10;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  padding: 6rem 2rem;
  max-width: 1800px;
  margin: 2rem auto 0;
  width: 100%;
  background: var(--primary-color);
  background: linear-gradient(135deg, var(--primary-color), var(--primary-color-dark));
  border-radius: 16px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  min-height: 600px;
  overflow: hidden;

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
  }
`;

const HeroAbstractShape = styled(motion.svg)`
  position: absolute;
  z-index: 0;
  opacity: 0.2;
`;

const HeroContentLeft = styled(motion.div)`
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  max-width: 50%;
  
  @media (max-width: 768px) {
    max-width: 100%;
    align-items: center;
  }
`;

const HeroContentRight = styled(motion.div)`
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  max-width: 50%;
  
  @media (max-width: 768px) {
    max-width: 100%;
    margin-top: 2rem;
  }
`;

const HeroTitle = styled(motion.h1)`
  font-size: clamp(2.5rem, 6vw, 4.5rem);
  font-weight: 800;
  color: var(--card-background);
  margin-bottom: 1rem;
  line-height: 1.2;
`;

const HeroParagraph = styled.p`
  font-size: clamp(1rem, 2.5vw, 1.5rem);
  color: var(--background-color-light);
  max-width: 700px;
  margin-bottom: 2rem;
  font-weight: 600;
  text-align: left;
  font-family: 'Poppins', sans-serif;

  @media (max-width: 768px) {
    text-align: center;
  }
`;

const TypewriterSpan = styled.span`
  overflow: hidden;
  border-right: .15em solid var(--card-background);
  white-space: nowrap;
  letter-spacing: .05em;
  font-weight: 800;
  animation: ${blink} 1s step-end infinite;
`;

const ActionButton = styled(motion(Link))`
  background-color: var(--primary-color-extra-dark);
  color: #ffffff;
  padding: 0.75rem 2rem;
  font-size: 1.2rem;
  font-weight: 600;
  border-radius: 9999px;
  text-decoration: none;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, background-color 0.3s ease;
  
  &:hover {
    transform: translateY(-3px);
    background-color: var(--primary-color-dark); /* Color change on hover */
  }
`;

// General Sections
const SectionsContainer = styled(motion.div)`
  padding: 4rem 2rem;
  background-color: transparent;
  color: var(--text-color);
  position: relative;
  z-index: 10;
`;

const SectionHeader = styled(motion.h2)`
  font-size: 2.5rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 2rem;
  color: var(--primary-color);
`;

const WhySection = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;

  @media (min-width: 600px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (min-width: 900px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const WhyCard = styled(motion.div)`
  background-color: var(--card-background);
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease, background-color 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
    background-color: var(--primary-color-dark);
    color: var(--card-background);
  }
`;

const CardIcon = styled.div`
  margin-bottom: 1.5rem;
  svg {
    width: 60px;
    height: 60px;
    fill: var(--primary-color);
    transition: fill 0.3s ease;
  }
  ${WhyCard}:hover & svg {
    fill: var(--card-background);
  }
`;

const WhyTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--text-color);
  margin-bottom: 0.5rem;
  transition: color 0.3s ease;
  
  ${WhyCard}:hover & {
    color: var(--card-background);
  }
`;

const WhyDescription = styled.p`
  font-size: 1rem;
  color: var(--text-color-secondary);
  transition: color 0.3s ease;
  
  ${WhyCard}:hover & {
    color: var(--card-background);
  }
`;

const CTASection = styled(motion.div)`
  background-color: var(--primary-color-dark);
  padding: 4rem 2rem;
  text-align: center;
  position: relative;
  z-index: 10;
`;

const CTATitle = styled(motion.h2)`
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 700;
  color: var(--card-background);
  margin-bottom: 1.5rem;
`;

const CTAButton = styled(motion(Link))`
  background-color: var(--card-background);
  color: var(--text-color);
  padding: 1rem 2.5rem;
  font-size: 1.2rem;
  font-weight: 600;
  border-radius: 9999px;
  text-decoration: none;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.05);
    background-color: var(--background-color-light); /* Color change on hover */
    color: var(--primary-color); /* Text color change on hover */
  }
`;

const ReadyToAceSection = styled(motion.div)`
  background: transparent;
  padding: 4rem 2rem;
  text-align: center;
  position: relative;
  z-index: 10;
`;

const ReadyToAceTitle = styled(motion.h2)`
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 700;
  color: var(--text-color);
  margin-bottom: 1.5rem;
`;

const TestimonialsSection = styled(motion.section)`
  padding: 4rem 2rem;
  background-color: transparent;
  color: var(--text-color);
  position: relative;
  z-index: 10;
`;

const TestimonialGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (min-width: 1024px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const TestimonialCard = styled(motion.div)`
  background-color: var(--card-background);
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  }
`;

const TestimonialText = styled.p`
  font-style: italic;
  font-size: 1rem;
  margin-bottom: 1rem;
  color: var(--text-color);
`;

const TestimonialAuthor = styled.p`
  font-weight: 600;
  color: var(--primary-color-dark);
`;


// Social Icon for Navbar & Footer
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

// Helper components for the Navbar and Footer
const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [aiToolsRef, isAiToolsHovering] = useHover();
  const [ieltsModulesRef, isIeltsModulesHovering] = useHover();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

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

  return (
    <Nav className={scrolled ? 'scrolled' : ''}>
      <NavLogo>
        <Link href="/" passHref>
          <motion.img
            src={scrolled ? "/scrolled.png" : "/logo_main.png"}
            alt="Determined IELTS Logo"
            whileHover={{ scale: 1.05 }}
          />
        </Link>
      </NavLogo>

      <NavLinks>
        <NavLink href="/">Home</NavLink>

        <DropdownContainer ref={aiToolsRef}>
          <NavLink href="#">
            AI Tools <ChevronDown size={16} style={{ marginLeft: '4px' }} />
          </NavLink>
          <AnimatePresence>
            {isAiToolsHovering && (
              <DropdownMenu
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.2 }}
              >
                {aiTools.map((tool) => (
                  <DropdownItem key={tool.name} href={tool.path}>{tool.name}</DropdownItem>
                ))}
              </DropdownMenu>
            )}
          </AnimatePresence>
        </DropdownContainer>

        <DropdownContainer ref={ieltsModulesRef}>
          <NavLink href="#">
            IELTS Modules <ChevronDown size={16} style={{ marginLeft: '4px' }} />
          </NavLink>
          <AnimatePresence>
            {isIeltsModulesHovering && (
              <DropdownMenu
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.2 }}
              >
                {ieltsModules.map((module) => (
                  <DropdownItem key={module.name} href={module.path}>{module.name}</DropdownItem>
                ))}
              </DropdownMenu>
            )}
          </AnimatePresence>
        </DropdownContainer>

        <NavLink href="/blog">Blogs</NavLink>
        <NavLink href="/about_us">About Us</NavLink>
        <NavLink href="/contact">Contact</NavLink>
      </NavLinks>

      <AuthButtons>
        <AuthButton href="/login">Log In</AuthButton>
        <AuthButton href="/signup" primary>Sign Up</AuthButton>
      </AuthButtons>
    </Nav>
  );
};

const FooterContainer = styled.footer`
    background-color: var(--primary-color-extra-dark);
    padding: 4rem 2rem;
    color: var(--background-color-light);
    position: relative;
    z-index: 10;
`;

const FooterGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    gap: 2rem;
    max-width: 1200px;
    margin: 0 auto;

    @media (min-width: 768px) {
        grid-template-columns: repeat(4, 1fr);
    }
`;

const FooterSection = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
`;

const FooterTitle = styled.h4`
    font-size: 1.25rem;
    font-weight: 700;
    color: var(--primary-color);
    margin-bottom: 1rem;
`;

const FooterLink = styled(Link)`
    color: var(--background-color-light);
    text-decoration: none;
    transition: all 0.3s ease;
    &:hover {
        color: var(--primary-color);
        transform: translateX(2px);
    }
`;

const FooterText = styled.p`
    font-size: 1rem;
    line-height: 1.6;
`;

const SubscriptionBox = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
`;

const SubscriptionInput = styled.input`
    padding: 0.75rem 1rem;
    font-size: 1rem;
    border-radius: 9999px;
    border: 1px solid var(--background-color-light);
    background-color: var(--background-color-light);
    color: var(--text-color);
    width: 100%;
    box-sizing: border-box;
    transition: border-color 0.3s ease;
    &:focus {
        outline: none;
        border-color: var(--primary-color);
    }
`;

const SubscriptionButton = styled.button`
    padding: 0.75rem 2rem;
    font-size: 1rem;
    font-weight: 600;
    border-radius: 9999px;
    border: none;
    background-color: var(--primary-color);
    color: var(--primary-color-extra-dark);
    transition: background-color 0.3s ease, transform 0.3s ease;
    &:hover {
        background-color: var(--primary-color-dark);
        transform: translateY(-2px);
        color: var(--card-background);
    }
`;

const FooterBottom = styled.div`
    max-width: 1200px;
    margin: 0 auto;
    text-align: center;
    padding-top: 2rem;
    font-size: 0.9rem;
    color: var(--background-color-light);
    border-top: 1px solid rgba(254, 255, 255, 0.1);
    margin-top: 2rem;
`;

const FooterSocials = styled.div`
    display: flex;
    gap: 1rem;
    margin-top: 1rem;
`;

const FooterLogo = styled.img`
    height: 50px;
    width: auto;
    object-fit: contain; /* Ensures the image is not stretched */
    margin-bottom: 1rem;
`;

const Footer = () => {
  const socialLinks = [
    { name: 'facebook', icon: <Facebook />, url: 'https://www.facebook.com' },
    { name: 'instagram', icon: <Instagram />, url: 'https://www.instagram.com' },
    { name: 'twitter', icon: <Twitter />, url: 'https://www.twitter.com' },
    { name: 'youtube', icon: <Youtube />, url: 'https://www.youtube.com' },
    { name: 'linkedin', icon: <Linkedin />, url: 'https://www.linkedin.com' },
  ];

  return (
    <FooterContainer>
      <FooterGrid>
        <FooterSection>
          {/* Footer now only uses the scrolled.png logo */}
          <FooterLogo src="/scrolled.png" alt="Determined IELTS Scrolled Logo" />
          <FooterText>Determined IELTS is a leading platform for AI-powered IELTS exam preparation. We help students achieve their dream scores with personalized tools and resources.</FooterText>
          <FooterSocials>
            {socialLinks.map((link, index) => (
              <SocialIcon key={index} href={link.url} target="_blank" rel="noopener noreferrer">
                {link.icon}
              </SocialIcon>
            ))}
          </FooterSocials>
        </FooterSection>
        <FooterSection>
          <FooterTitle>IELTS Modules</FooterTitle>
          <FooterLink href="/listening">Listening</FooterLink>
          <FooterLink href="/reading">Reading</FooterLink>
          <FooterLink href="/writing">Writing</FooterLink>
          <FooterLink href="/speaking">Speaking</FooterLink>
        </FooterSection>
        <FooterSection>
          <FooterTitle>Help & Support</FooterTitle>
          <FooterLink href="/faq">FAQ</FooterLink>
          <FooterLink href="/contact">Contact Us</FooterLink>
          <FooterLink href="/privacy">Privacy Policy</FooterLink>
          <FooterLink href="/terms">Terms of Service</FooterLink>
        </FooterSection>
        <FooterSection>
          <FooterTitle>Newsletter</FooterTitle>
          <FooterText>Subscribe to our newsletter to receive the latest updates and exclusive content.</FooterText>
          <SubscriptionBox>
            <SubscriptionInput type="email" placeholder="Your email address" />
            <SubscriptionButton>Subscribe</SubscriptionButton>
          </SubscriptionBox>
        </FooterSection>
      </FooterGrid>
      <FooterBottom>&copy; {new Date().getFullYear()} Determined IELTS. All Rights Reserved.</FooterBottom>
    </FooterContainer>
  );
};

const sabrihinAITools = [
  {
    title: 'Document Analysis',
    description: 'Get detailed insights from your documents.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
        <path d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm4 18H6V4h7v5h5v11zM8 10h8v2H8v-2zm0 4h8v2H8v-2zm0 4h5v2H8v-2z" />
      </svg>
    )
  },
  {
    title: 'Quiz Generation',
    description: 'Automatically create quizzes from any text.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
        <path d="M21 4H3a1 1 0 00-1 1v14a1 1 0 001 1h18a1 1 0 001-1V5a1 1 0 00-1-1zm-9 14h-2V12h2v6zm4-2h-2V12h2v4zm-8-4v4H6V12h2zm10 0h-2v2h2v-2zM9 8h6v2H9V8z" />
      </svg>
    )
  },
  {
    title: 'Personalized Assistance',
    description: 'Receive tailored feedback and study plans.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1.5 15h-1V9h-1V8h3v9zm3 0h-3v-2h3v2zm3-4h-3v-2h3v2zm0-4h-3V8h3v1z" />
      </svg>
    )
  },
  {
    title: 'Smart Study Planner',
    description: 'Organize your study schedule efficiently.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
        <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 21c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 18H5V8h14v13z" />
      </svg>
    )
  },
  {
    title: 'IELTS Preparation',
    description: 'Practice tests and mock exams for all sections.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
        <path d="M21 3H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-9 15H6v-2h6v2zm3-4H9v-2h6v2zm3-4H6v-2h12v2z" />
      </svg>
    )
  },
  {
    title: 'AI Image Generator',
    description: 'Create images from text descriptions.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18 4H6c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H6V6h12v12zm-6-4.5l-2.03-2.61L8 15.61l-1.97-2.53-2.03-2.61-2.03-2.61L2.1 16.61zM11 9H9v-2h2v2zm4 0h-2v-2h2v2zM7 9H5v-2h2v2z" />
      </svg>
    )
  },
  {
    title: 'Image Vision API',
    description: 'Analyze and understand images using AI.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 4C7.31 4 3.07 6.43 0 12c3.07 5.57 7.31 8 12 8s8.93-2.43 12-8c-3.07-5.57-7.31-8-12-8zm0 14c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6zm0-10c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4z" />
      </svg>
    )
  },
  {
    title: 'Document Upload',
    description: 'Securely upload and manage your files.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
        <path d="M19 12v7H5v-7H3v7c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-7h-2zm-6-6v4h-2V6H8.5L12 2.5 15.5 6H13z" />
      </svg>
    )
  },
];

const testimonials = [
  { quote: "Determined IELTS has been a game-changer for my preparation. The practice modules are incredibly realistic.", author: "Sabrina Sarah, Dhaka" },
  { quote: "I love the detailed feedback on my writing tasks. It helped me identify my weaknesses and improve my score.", author: "Raffat Esha, Tangail" },
  { quote: "The speaking prompts are fantastic and helped me feel more confident during my exam.", author: "Safin Rabbani, Chottogram" },
  { quote: "A must-have for anyone serious about improving their IELTS score. Highly recommended!", author: "Rajib Akash, Dhaka" },
  { quote: "I have been able to improve on my previous score with Determined IELTS amazing methods. Best of luck to them.", author: "Mantasha Arpi, Tangail" },
  { quote: "I was so sceptical at first, but later I was so amazed by the way they teach and train. Got my best score and all thanks to them.", author: "Tanvir Rahman, Dhaka" },
];

// Constants for the typewriter effect moved outside the component
const words = ['Limitless Efforts.', 'Brilliance.', 'Creativity.', 'Exceptional Ideas.', 'Excellence.', 'Determination.', 'Passion.'];
const typingSpeed = 150;
const deletingSpeed = 80;
const delayBetweenWords = 1500;

const App = () => {
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
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
  };

  const [wordIndex, setWordIndex] = useState(0);
  const [typedText, setTypedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const handleTyping = () => {
      const currentWord = words[wordIndex];
      if (isDeleting) {
        setTypedText(currentWord.substring(0, typedText.length - 1));
      } else {
        setTypedText(currentWord.substring(0, typedText.length + 1));
      }
    };

    let typingTimer;
    if (isDeleting) {
      typingTimer = setTimeout(handleTyping, deletingSpeed);
      if (typedText === '') {
        setIsDeleting(false);
        setWordIndex((prevIndex) => (prevIndex + 1) % words.length);
      }
    } else {
      typingTimer = setTimeout(handleTyping, typingSpeed);
      if (typedText === words[wordIndex]) {
        clearTimeout(typingTimer);
        setTimeout(() => setIsDeleting(true), delayBetweenWords);
      }
    }

    return () => clearTimeout(typingTimer);
  }, [typedText, isDeleting, wordIndex]);

  const canvasRef = useRef(null);

  // Three.js Background Animation
  useEffect(() => {
    // Check if THREE is available globally before proceeding
    if (!canvasRef.current || typeof window.THREE === 'undefined') {
      console.error("THREE.js is not available. Skipping canvas animation.");
      return;
    }

    const THREE = window.THREE;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    camera.position.z = 5;

    const particleCount = 2000;
    const geometry = new THREE.BufferGeometry();
    const positions = [];
    const velocities = [];

    for (let i = 0; i < particleCount; i++) {
      positions.push(
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20
      );
      velocities.push(
        (Math.random() - 0.5) * 0.005,
        (Math.random() - 0.5) * 0.005,
        (Math.random() - 0.5) * 0.005
      );
    }
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    const material = new THREE.PointsMaterial({
      color: 0x4f46e5,
      size: 0.015,
      transparent: true,
      blending: THREE.AdditiveBlending,
    });
    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    let animationFrameId;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const positionAttribute = particles.geometry.attributes.position;
      for (let i = 0; i < positionAttribute.count; i++) {
        positionAttribute.array[i * 3] += velocities[i * 3];
        positionAttribute.array[i * 3 + 1] += velocities[i * 3 + 1];
        positionAttribute.array[i * 3 + 2] += velocities[i * 3 + 2];
        if (positionAttribute.array[i * 3] > 10) positionAttribute.array[i * 3] = -10;
        if (positionAttribute.array[i * 3] < -10) positionAttribute.array[i * 3] = 10;
        if (positionAttribute.array[i * 3 + 1] > 10) positionAttribute.array[i * 3 + 1] = -10;
        if (positionAttribute.array[i * 3 + 1] < -10) positionAttribute.array[i * 3 + 1] = 10;
        if (positionAttribute.array[i * 3 + 2] > 10) positionAttribute.array[i * 3 + 2] = -10;
        if (positionAttribute.array[i * 3 + 2] < -10) positionAttribute.array[i * 3 + 2] = 10;
      }
      positionAttribute.needsUpdate = true;
      particles.rotation.y += 0.0005;
      particles.rotation.x += 0.00025;
      renderer.render(scene, camera);
    };

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);
    animate();
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      renderer.dispose();
    };
  }, []);

  return (
    <>
      <Head>
        <title>Determined IELTS</title>
        <meta name="description" content="Prepare for the IELTS exam with Determined IELTS practice modules." />
        <link rel="icon" href="/favicon.ico" />
        {/* Load Three.js from CDN to avoid module import errors */}
        <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js" defer></script>
      </Head>
      <GlobalStyle />
      <Navbar />

      <CanvasWrapper>
        <canvas ref={canvasRef}></canvas>
      </CanvasWrapper>

      <MainLayout>
        <HeroSection
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <HeroAbstractShape
            width="500"
            height="500"
            viewBox="0 0 500 500"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ top: '-10%', left: '-10%' }}
            initial={{ rotate: 0, scale: 0.8 }}
            animate={{ rotate: 360, scale: 1.2 }}
            transition={{
              repeat: Infinity,
              duration: 20,
              ease: 'linear',
              repeatType: 'reverse'
            }}
          >
            <circle cx="250" cy="250" r="200" fill="#DEF2F1" />
          </HeroAbstractShape>
          <HeroAbstractShape
            width="400"
            height="400"
            viewBox="0 0 400 400"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ bottom: '-10%', right: '-10%' }}
            initial={{ rotate: 0, scale: 0.8 }}
            animate={{ rotate: -360, scale: 1.2 }}
            transition={{
              repeat: Infinity,
              duration: 25,
              ease: 'linear',
              repeatType: 'reverse'
            }}
          >
            <rect x="50" y="50" width="300" height="300" rx="50" fill="#DEF2F1" />
          </HeroAbstractShape>
          <HeroContentLeft
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <HeroTitle>
              Your Journey to IELTS Success Starts with <TypewriterSpan>{typedText}</TypewriterSpan>
            </HeroTitle>
            <HeroParagraph>
              Unlock your potential with our AI-driven platform designed to help you ace the IELTS exam. From personalized study plans to instant feedback on your writing, we&apos;re here to guide you every step of the way.
            </HeroParagraph>
            <ActionButton href="/signup">
              Start Your Free Trial
            </ActionButton>
          </HeroContentLeft>
          <HeroContentRight
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
          </HeroContentRight>
        </HeroSection>

        <SectionsContainer
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
        >
          <SectionHeader variants={itemVariants}>
            Why Choose Determined IELTS?
          </SectionHeader>
          <WhySection>
            {sabrihinAITools.map((tool, index) => (
              <WhyCard
                key={index}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <CardIcon>{tool.icon}</CardIcon>
                <WhyTitle>{tool.title}</WhyTitle>
                <WhyDescription>{tool.description}</WhyDescription>
              </WhyCard>
            ))}
          </WhySection>
        </SectionsContainer>

        <CTASection
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
        >
          <CTATitle>Ready to start your journey?</CTATitle>
          <CTAButton
            href="/signup"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            Get Started Now
          </CTAButton>
        </CTASection>

        <TestimonialsSection
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
        >
          <SectionHeader variants={itemVariants}>
            What Our Students Say
          </SectionHeader>
          <TestimonialGrid>
            {testimonials.map((testimonial, index) => (
              <TestimonialCard
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <TestimonialText>&quot;{testimonial.quote}&quot;</TestimonialText>
                <TestimonialAuthor>- {testimonial.author}</TestimonialAuthor>
              </TestimonialCard>
            ))}
          </TestimonialGrid>
        </TestimonialsSection>

        <ReadyToAceSection
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
        >
          <ReadyToAceTitle>
            Ready to Ace Your IELTS?
          </ReadyToAceTitle>
          <ActionButton
            href="/signup"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            Start Your Free Trial
          </ActionButton>
        </ReadyToAceSection>
      </MainLayout>
      <Footer />
    </>
  );
};

export default App;