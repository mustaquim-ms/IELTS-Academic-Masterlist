import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { motion } from 'framer-motion';

const FooterContainer = styled(motion.footer)`
  background-color: #333333;
  color: #ffffff;
  padding: 2rem;
  text-align: center;
  font-size: 0.9rem;
  border-top: 1px solid #444444;
`;

const FooterText = styled.p`
  margin: 0;
  color: var(--light-text-color);
`;

export default function Footer() {
    return (
        <FooterContainer
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
        >
            <FooterText>© 2023 Determined IELTS. All rights reserved.</FooterText>
        </FooterContainer>
    );
}
