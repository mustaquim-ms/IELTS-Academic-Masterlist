import React, { useState } from 'react';
import styled, { keyframes, createGlobalStyle } from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Facebook, Instagram, Twitter } from 'lucide-react';

// NOTE: We're using a similar GlobalStyle to ensure color and font consistency
// across the entire application.
const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
  :root {
    --primary-color: #0d47a1;
    --secondary-color: #1565c0;
    --accent-color: #ff9800;
    --background-color: #f5f8fa;
    --text-color: #333;
    --light-text-color: #fff;
    --card-bg: #fff;
    --shadow-light: 0 4px 6px rgba(0, 0, 0, 0.05);
    --shadow-medium: 0 10px 15px rgba(0, 0, 0, 0.1);
    --shadow-hover: 0 15px 25px rgba(0, 0, 0, 0.15);
    
    --vibrant-text-color: #1e88e5;
    --vibrant-accent-color: #ff5722;
  }
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  html {
    scroll-behavior: smooth;
  }
  body {
    font-family: 'Inter', sans-serif;
    color: var(--text-color);
    background-color: var(--background-color);
    line-height: 1.6;
    overflow-x: hidden;
  }
  a {
    color: var(--primary-color);
    text-decoration: none;
    transition: color 0.3s ease;
    &:hover {
      color: var(--accent-color);
    }
  }
`;

// Keyframes for the animated background
const backgroundAnimation = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

// Main container for the entire page
const PageContainer = styled.div`
  background: linear-gradient(
    135deg,
    var(--primary-color) 0%,
    var(--secondary-color) 25%,
    var(--primary-color) 50%,
    var(--secondary-color) 75%,
    var(--primary-color) 100%
  );
  background-size: 400% 400%;
  animation: ${backgroundAnimation} 20s ease infinite;
  color: var(--light-text-color);
  padding-top: 80px; // Add space for a fixed header if you have one
`;

// Generic Section Component with premium, futuristic styling
const Section = styled(motion.section)`
  padding: 100px 20px;
  text-align: center;
  position: relative;
  overflow: hidden;

  // Glassmorphism effect for sections
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  margin: 40px auto;
  max-width: 1200px;
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);

  @media (max-width: 768px) {
    padding: 60px 15px;
    margin: 20px auto;
  }
`;

// Heading styles
const SectionTitle = styled(motion.h2)`
  font-size: 3.5rem;
  font-weight: 700;
  text-transform: uppercase;
  margin-bottom: 20px;
  color: var(--light-text-color);
  text-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const SectionSubtitle = styled(motion.p)`
  font-size: 1.2rem;
  font-weight: 300;
  max-width: 800px;
  margin: 0 auto 50px;
  opacity: 0.8;
`;

// Logo section
const LogoSection = styled(Section)`
  background: none; // No glassmorphism here
  backdrop-filter: none;
  -webkit-backdrop-filter: none;
  border: none;
  box-shadow: none;
  margin-top: 0;
  padding-top: 0;
`;

const Logo = styled(motion.div)`
  font-size: 5rem;
  font-weight: 900;
  color: var(--light-text-color);
  text-shadow: 0 5px 10px rgba(0,0,0,0.5);
`;

const LogoTitle = styled(motion.h1)`
  font-size: 1.5rem;
  font-weight: 500;
  letter-spacing: 5px;
  text-transform: uppercase;
  margin-top: -10px;
`;

// FAQ Section
const FAQContainer = styled.div`
  text-align: left;
  max-width: 800px;
  margin: 0 auto;
`;

const FAQItem = styled(motion.div)`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  margin-bottom: 15px;
  overflow: hidden;
  box-shadow: var(--shadow-light);
`;

const FAQQuestion = styled(motion.div)`
  padding: 20px 25px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 600;
  font-size: 1.1rem;
  background: rgba(255, 255, 255, 0.05);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`;

const FAQAnswer = styled(motion.div)`
  padding: 20px 25px;
  font-weight: 300;
  line-height: 1.6;
  opacity: 0.8;
`;

const Chevron = styled(ChevronDown)`
  transform: ${({ isOpen }) => (isOpen ? 'rotate(180deg)' : 'rotate(0deg)')};
  transition: transform 0.3s ease;
`;

// Card-based sections (e.g., Teachers, Alumni, Blogs)
const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 30px;
`;

const Card = styled(motion.div)`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  padding: 30px;
  text-align: center;
  box-shadow: var(--shadow-medium);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
  }
`;

const CardImage = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 20px;
  border: 4px solid var(--accent-color);
`;

const CardTitle = styled.h4`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 5px;
`;

const CardSubtitle = styled.p`
  font-weight: 300;
  font-style: italic;
  opacity: 0.7;
`;

// Forms section
const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-width: 600px;
  margin: 0 auto;
  text-align: left;
`;

const FormInput = styled.input`
  padding: 15px 20px;
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  background: rgba(255, 255, 255, 0.1);
  color: var(--light-text-color);
  font-size: 1rem;
  
  &::placeholder {
    color: rgba(255, 255, 255, 0.6);
  }

  &:focus {
    outline: none;
    border-color: var(--accent-color);
    box-shadow: 0 0 0 2px var(--accent-color);
  }
`;

const FormTextarea = styled.textarea`
  padding: 15px 20px;
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  background: rgba(255, 255, 255, 0.1);
  color: var(--light-text-color);
  font-size: 1rem;
  resize: vertical;
  min-height: 150px;

  &::placeholder {
    color: rgba(255, 255, 255, 0.6);
  }

  &:focus {
    outline: none;
    border-color: var(--accent-color);
    box-shadow: 0 0 0 2px var(--accent-color);
  }
`;

const SubmitButton = styled(motion.button)`
  padding: 15px 40px;
  background-color: var(--accent-color);
  color: var(--light-text-color);
  font-size: 1.2rem;
  font-weight: 600;
  border: none;
  border-radius: 50px;
  text-transform: uppercase;
  letter-spacing: 1px;
  cursor: pointer;
  box-shadow: 0 4px 15px rgba(255, 152, 0, 0.4);
  transition: all 0.3s ease;

  &:hover {
    background-color: #e68a00;
    transform: translateY(-5px);
    box-shadow: 0 6px 20px rgba(255, 152, 0, 0.6);
  }
`;


// --- Mock Data ---
const faqData = [
  { question: "What is IELTS?", answer: "IELTS stands for International English Language Testing System. It is the world's most popular English language proficiency test for higher education and global migration." },
  { question: "How can I register for a course?", answer: "You can register for a course by visiting our 'Courses' page and following the instructions. Alternatively, you can fill out the contact form on this page and a representative will get in touch with you." },
  { question: "Do you offer private tutoring?", answer: "Yes, we offer one-on-one private tutoring sessions tailored to your specific needs. Please contact us for more details and to book a session." },
];

const teachersData = [
  { name: "Sarah Connor", specialization: "Writing & Speaking", image: "https://placehold.co/150x150/0d47a1/ffffff?text=SC" },
  { name: "Michael Lee", specialization: "Reading & Listening", image: "https://placehold.co/150x150/1565c0/ffffff?text=ML" },
  { name: "Dr. Alistair Finch", specialization: "Vocabulary & Grammar", image: "https://placehold.co/150x150/ff9800/ffffff?text=AF" },
];

const teamData = [
  { name: "John Doe", title: "Chairman", image: "https://placehold.co/150x150/0d47a1/ffffff?text=JD" },
  { name: "Jane Smith", title: "Managing Director", image: "https://placehold.co/150x150/1565c0/ffffff?text=JS" },
];

const alumniData = [
  { name: "Aisha Khan", quote: "Got into my dream university!", image: "https://placehold.co/150x150/ff9800/ffffff?text=AK" },
  { name: "Ben Carter", quote: "IELTS score exceeded my expectations!", image: "https://placehold.co/150x150/0d47a1/ffffff?text=BC" },
  { name: "Maria Garcia", quote: "Thank you for the excellent support!", image: "https://placehold.co/150x150/1565c0/ffffff?text=MG" },
];


// --- Main Component ---
const AboutUs = () => {
  const [openFAQ, setOpenFAQ] = useState(null);

  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Logic for form submission goes here
    console.log("Form submitted!");
  };

  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  return (
    <>
      <GlobalStyle />
      <PageContainer>
        {/* Logo and Introduction Section */}
        <LogoSection
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
        >
          <Logo>IELTS</Logo>
          <LogoTitle>Academy</LogoTitle>
        </LogoSection>

        {/* Chairman & MD Section */}
        <Section
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <SectionTitle>Our Leadership</SectionTitle>
          <SectionSubtitle>
            Guiding our mission to empower students to achieve their IELTS goals.
          </SectionSubtitle>
          <CardGrid>
            {teamData.map((person, index) => (
              <Card
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                whileHover={{ scale: 1.05 }}
              >
                <CardImage src={person.image} alt={person.name} />
                <CardTitle>{person.name}</CardTitle>
                <CardSubtitle>{person.title}</CardSubtitle>
              </Card>
            ))}
          </CardGrid>
        </Section>

        {/* Our Journey Section (History) */}
        <Section
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <SectionTitle>Our Journey</SectionTitle>
          <SectionSubtitle>
            From a humble beginning to a leading IELTS preparation platform, our story is one of dedication and student success.
          </SectionSubtitle>
          {/* Timeline or text content would go here */}
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true, amount: 0.5 }}>
            <p>
              Founded in 2010, our academy was built on the principle of providing high-quality, accessible IELTS education. We have since helped thousands of students achieve their dreams of studying or working abroad, evolving our curriculum to meet the latest exam standards.
            </p>
          </motion.div>
        </Section>

        {/* Teachers Section */}
        <Section
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <SectionTitle>Meet Our Teachers</SectionTitle>
          <SectionSubtitle>
            Our expert instructors are passionate about teaching and are committed to your success.
          </SectionSubtitle>
          <CardGrid>
            {teachersData.map((teacher, index) => (
              <Card
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                whileHover={{ scale: 1.05 }}
              >
                <CardImage src={teacher.image} alt={teacher.name} />
                <CardTitle>{teacher.name}</CardTitle>
                <CardSubtitle>{teacher.specialization}</CardSubtitle>
              </Card>
            ))}
          </CardGrid>
        </Section>

        {/* Alumni Section */}
        <Section
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <SectionTitle>Our Alumni</SectionTitle>
          <SectionSubtitle>
            Proud stories from our successful students who have gone on to achieve great things.
          </SectionSubtitle>
          <CardGrid>
            {alumniData.map((alumnus, index) => (
              <Card
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                whileHover={{ scale: 1.05 }}
              >
                <CardImage src={alumnus.image} alt={alumnus.name} />
                <CardTitle>{alumnus.name}</CardTitle>
                <CardSubtitle>"{alumnus.quote}"</CardSubtitle>
              </Card>
            ))}
          </CardGrid>
        </Section>

        {/* Video Section */}
        <Section
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <SectionTitle>Video Showcase</SectionTitle>
          <SectionSubtitle>
            Watch our student testimonials and expert tips in action.
          </SectionSubtitle>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8 }}
            style={{ position: 'relative', paddingBottom: '56.25%', height: 0, maxWidth: '1000px', margin: '0 auto' }}
          >
            {/* Using a placeholder video frame */}
            <iframe
              src="https://www.youtube.com/embed/dQw4w9WgXcQ"
              style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', borderRadius: '15px', border: 'none' }}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </motion.div>
        </Section>

        {/* FAQ Section */}
        <Section
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <SectionTitle>Frequently Asked Questions</SectionTitle>
          <SectionSubtitle>
            Find answers to the most common questions about our programs and services.
          </SectionSubtitle>
          <FAQContainer>
            {faqData.map((faq, index) => (
              <FAQItem
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <FAQQuestion onClick={() => toggleFAQ(index)}>
                  {faq.question}
                  <Chevron isOpen={openFAQ === index} />
                </FAQQuestion>
                <AnimatePresence>
                  {openFAQ === index && (
                    <FAQAnswer
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      {faq.answer}
                    </FAQAnswer>
                  )}
                </AnimatePresence>
              </FAQItem>
            ))}
          </FAQContainer>
        </Section>

        {/* Other sections (Placeholder for now, can be expanded) */}
        <Section
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <SectionTitle>Our Blogs</SectionTitle>
          <SectionSubtitle>
            Stay updated with the latest tips, tricks, and success stories.
          </SectionSubtitle>
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true, amount: 0.5 }}>
            <p>
              (Content for blog posts and links would go here)
            </p>
          </motion.div>
        </Section>

        {/* Support Forum Section */}
        <Section
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <SectionTitle>Support Forums</SectionTitle>
          <SectionSubtitle>
            Connect with other students and get help from our community.
          </SectionSubtitle>
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true, amount: 0.5 }}>
            <p>
              (Link to a forum or community page would go here)
            </p>
          </motion.div>
        </Section>

        {/* Contact Form Section */}
        <Section
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <SectionTitle>Get In Touch</SectionTitle>
          <SectionSubtitle>
            Have a question or need support? Send us a message.
          </SectionSubtitle>
          <FormContainer onSubmit={handleFormSubmit}>
            <FormInput type="text" placeholder="Your Name" required />
            <FormInput type="email" placeholder="Your Email" required />
            <FormTextarea placeholder="Your Message" required />
            <SubmitButton
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Send Message
            </SubmitButton>
          </FormContainer>
        </Section>
      </PageContainer>
    </>
  );
};

export default AboutUs;
