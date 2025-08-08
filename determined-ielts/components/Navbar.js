import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { motion } from 'framer-motion';

// Styled components for the new navbar
const Nav = styled(motion.nav)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem 2rem;
  background-color: ${props => props.scrolled ? 'var(--navbar-scrolled-bg)' : 'transparent'};
  box-shadow: ${props => props.scrolled ? 'var(--shadow-light)' : 'none'};
  backdrop-filter: ${props => props.scrolled ? 'blur(10px)' : 'none'};
  transition: all 0.3s ease;

  @media (max-width: 768px) {
    justify-content: space-between;
    padding: 1rem;
  }
`;

const NavContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 1200px;
`;

const Logo = styled(motion.a)`
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--primary-color);
`;

const NavLinks = styled(motion.ul)`
  list-style: none;
  display: flex;
  gap: 2rem;
  margin: 0;
  padding: 0;

  @media (max-width: 768px) {
    display: ${props => (props.open ? 'flex' : 'none')};
    flex-direction: column;
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    background-color: var(--navbar-scrolled-bg);
    box-shadow: var(--shadow-light);
    padding: 1rem 2rem;
  }
`;

const NavItem = styled(motion.li)`
  font-weight: 500;
  font-size: 1rem;
`;

const NavLink = styled.a`
  position: relative;
  &::after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 0;
    width: 0;
    height: 2px;
    background-color: var(--secondary-color);
    transition: width 0.3s ease;
  }
  &:hover::after {
    width: 100%;
  }
`;

const Hamburger = styled.button`
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.5rem;
  color: var(--text-color);

  @media (max-width: 768px) {
    display: block;
    z-index: 1010;
  }
`;

// Animation variants
const navVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [isMounted, setIsMounted] = useState(false); // New state to track if component is mounted

    // Effect to handle scroll and mounting
    useEffect(() => {
        // Set mounted state to true once component has hydrated on the client
        setIsMounted(true);

        const handleScroll = () => {
            const isScrolled = window.scrollY > 50;
            setScrolled(isScrolled);
        };

        // Add scroll listener only after component is mounted
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const toggleMenu = () => setIsOpen(!isOpen);

    return (
        <Nav scrolled={isMounted ? scrolled : false} variants={navVariants} initial="hidden" animate="visible">
            <NavContainer>
                {/* Added legacyBehavior to prevent nested <a> tags */}
                <Link href="/" passHref legacyBehavior>
                    <Logo>Determined IELTS</Logo>
                </Link>
                <Hamburger onClick={toggleMenu}>
                    {isOpen ? '✕' : '☰'}
                </Hamburger>
                <NavLinks open={isOpen}>
                    <NavItem>
                        {/* Added legacyBehavior to prevent nested <a> tags */}
                        <Link href="/reading" passHref legacyBehavior>
                            <NavLink>Reading</NavLink>
                        </Link>
                    </NavItem>
                    <NavItem>
                        {/* Added legacyBehavior to prevent nested <a> tags */}
                        <Link href="/writing" passHref legacyBehavior>
                            <NavLink>Writing</NavLink>
                        </Link>
                    </NavItem>
                    <NavItem>
                        {/* Added legacyBehavior to prevent nested <a> tags */}
                        <Link href="/listening" passHref legacyBehavior>
                            <NavLink>Listening</NavLink>
                        </Link>
                    </NavItem>
                    <NavItem>
                        {/* Added legacyBehavior to prevent nested <a> tags */}
                        <Link href="/speaking" passHref legacyBehavior>
                            <NavLink>Speaking</NavLink>
                        </Link>
                    </NavItem>
                </NavLinks>
            </NavContainer>
        </Nav>
    );
}
