import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import Link from 'next/link';

// Styled Components for the Navbar
const Nav = styled(motion.nav)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 2rem;
  z-index: 1000;
  background-color: ${(props) => (props.isScrolled ? 'rgba(255, 255, 255, 0.95)' : 'transparent')};
  backdrop-filter: ${(props) => (props.isScrolled ? 'blur(10px)' : 'none')};
  box-shadow: ${(props) => (props.isScrolled ? '0 4px 6px rgba(0, 0, 0, 0.1)' : 'none')};
  transition: background-color 0.3s ease, box-shadow 0.3s ease, backdrop-filter 0.3s ease;
`;

const NavContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 1200px;
`;

const Logo = styled(Link)`
  font-size: 1.5rem;
  font-weight: 800;
  color: var(--primary-color);
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;

  @media (max-width: 768px) {
    display: none; // Hide on mobile
  }
`;

const NavLink = styled(Link)`
  color: var(--text-color);
  font-size: 1.1rem;
  font-weight: 500;
  text-decoration: none;
  transition: color 0.3s ease;
  
  &:hover {
    color: var(--primary-color);
  }
`;

const SocialIcons = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const SocialIcon = styled.a`
  font-size: 1.5rem;
  color: var(--text-color-secondary);
  transition: color 0.3s ease;
  
  &:hover {
    color: var(--primary-color);
  }
`;

const AuthButtons = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const AuthButton = styled(Link)`
  padding: 0.5rem 1rem;
  border-radius: 9999px;
  font-weight: 600;
  text-decoration: none;
  transition: background-color 0.3s ease;

  &.login {
    color: var(--primary-color);
    border: 2px solid var(--primary-color);
    background-color: transparent;
    &:hover {
      background-color: var(--primary-color-light);
    }
  }

  &.signup {
    color: #ffffff;
    background-color: var(--primary-color);
    &:hover {
      background-color: #0056b3;
    }
  }
`;

const socialIcons = [
  { name: 'Facebook', href: '#', icon: 'F' }, // Placeholder icons
  { name: 'Twitter', href: '#', icon: 'T' },
  { name: 'Instagram', href: '#', icon: 'I' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <Nav isScrolled={isScrolled}>
      <NavContent>
        <Logo href="/">Determined IELTS</Logo>
        <NavLinks>
          <NavLink href="/listening">Listening</NavLink>
          <NavLink href="/reading">Reading</NavLink>
          <NavLink href="/writing">Writing</NavLink>
          <NavLink href="/speaking">Speaking</NavLink>
        </NavLinks>
        <motion.div>
          {isScrolled && (
            <SocialIcons
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              {socialIcons.map((social) => (
                <SocialIcon key={social.name} href={social.href}>
                  {social.icon}
                </SocialIcon>
              ))}
            </SocialIcons>
          )}
          {!isScrolled && (
            <AuthButtons>
              <AuthButton href="/login" className="login">Log In</AuthButton>
              <AuthButton href="/signup" className="signup">Sign Up</AuthButton>
            </AuthButtons>
          )}
        </motion.div>
      </NavContent>
    </Nav>
  );
}
