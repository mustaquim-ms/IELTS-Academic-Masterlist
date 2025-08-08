import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import Link from 'next/link';

// Styled Components for the Card
const CardWrapper = styled(motion.div)`
  background: var(--card-bg);
  border: 1px solid var(--border-color);
  border-radius: 20px;
  backdrop-filter: blur(10px);
  padding: 2rem;
  margin: 1rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  transition: all 0.3s ease-in-out;
  cursor: pointer;
  width: 100%;
  max-width: 400px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);

  &:hover {
    background: rgba(233, 69, 96, 0.2);
    border: 1px solid var(--accent-color);
    box-shadow: 0 8px 60px rgba(233, 69, 96, 0.15);
    transform: translateY(-10px);
  }
`;

const CardIcon = styled.span`
  font-size: 2.5rem;
  color: var(--accent-color);
  margin-bottom: 1rem;
`;

const CardTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
`;

const CardDescription = styled.p`
  font-size: 1rem;
  color: #c4c4c4;
`;

export default function Card({ title, icon, description, link }) {
    return (
        <Link href={link} passHref>
            <CardWrapper
                whileHover={{ scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                data-aos="fade-up"
                data-aos-delay="100"
            >
                <CardIcon>{icon}</CardIcon>
                <CardTitle>{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
            </CardWrapper>
        </Link>
    );
}
