import React, { useState, useRef } from 'react';
import Head from 'next/head';
import styled from 'styled-components';
import { motion } from 'framer-motion';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

// The MainLayout will be used for all sub-pages for consistency
const MainLayout = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  padding-top: 5rem; /* Space for the fixed navbar */
`;

const ContentSection = styled.section`
  flex-grow: 1;
  padding: 2rem;
  max-width: 1000px;
  margin: 0 auto;
  width: 100%;
`;

const SectionTitle = styled(motion.h1)`
  font-size: 2.5rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 2rem;
  color: var(--primary-color);
`;

const ContentWrapper = styled.div`
  background-color: var(--card-background);
  border-radius: 12px;
  box-shadow: var(--shadow-light);
  padding: 2rem;
`;

// Audio Player Component
const AudioPlayerContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  background-color: #f0f0f0;
  border-radius: 8px;
  padding: 1rem;
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
`;

const AudioControls = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const PlayPauseButton = styled.button`
  background: var(--primary-color);
  color: white;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: background-color 0.3s ease;
  &:hover {
    background: var(--secondary-color);
  }
`;

const ProgressBar = styled.input`
  flex-grow: 1;
  -webkit-appearance: none;
  height: 8px;
  background: #d1d5db;
  border-radius: 4px;
  outline: none;
  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: var(--primary-color);
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  &::-moz-range-thumb {
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: var(--primary-color);
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
`;

const Timer = styled.span`
  font-family: monospace;
  font-size: 0.9rem;
  color: #666;
`;

const QuestionContainer = styled.div`
  margin-top: 2rem;
`;

const Question = styled.div`
  margin-bottom: 1.5rem;
`;

const QuestionText = styled.h4`
  margin-bottom: 0.5rem;
  font-weight: 600;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s ease;
  &:focus {
    outline: none;
    border-color: var(--primary-color);
    box-shadow: 0 0 0 2px rgba(0, 112, 243, 0.2);
  }
`;

const AudioPlayer = ({ src }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const [time, setTime] = useState({ current: '00:00', total: '00:00' });
    const audioRef = useRef(null);

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    };

    const handlePlayPause = () => {
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };

    const handleTimeUpdate = () => {
        const currentTime = audioRef.current.currentTime;
        const duration = audioRef.current.duration;
        setProgress((currentTime / duration) * 100);
        setTime((prev) => ({ ...prev, current: formatTime(currentTime) }));
    };

    const handleLoadedMetadata = () => {
        setTime((prev) => ({ ...prev, total: formatTime(audioRef.current.duration) }));
    };

    const handleProgressChange = (e) => {
        const newProgress = e.target.value;
        const newTime = (newProgress / 100) * audioRef.current.duration;
        audioRef.current.currentTime = newTime;
        setProgress(newProgress);
    };

    return (
        <AudioPlayerContainer>
            <audio
                ref={audioRef}
                src={src}
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
                onEnded={() => setIsPlaying(false)}
            />
            <AudioControls>
                <PlayPauseButton onClick={handlePlayPause}>
                    {isPlaying ? '⏸️' : '▶️'}
                </PlayPauseButton>
                <Timer>{time.current}</Timer>
                <ProgressBar
                    type="range"
                    min="0"
                    max="100"
                    value={progress}
                    onChange={handleProgressChange}
                />
                <Timer>{time.total}</Timer>
            </AudioControls>
        </AudioPlayerContainer>
    );
};


export default function ListeningSection3() {
    const audioUrl = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3";
    const questions = [
        { id: 1, text: "The students are discussing a project on:" },
        { id: 2, text: "They need to use a specific type of resource, which is:" },
        { id: 3, text: "The tutor suggests they should focus on a case study of:" },
        { id: 4, text: "They agree to meet again on:" },
        { id: 5, text: "The students have to submit their final draft by:" },
    ];

    return (
        <>
            <Head>
                <title>Listening Section 3 | Determined IELTS</title>
            </Head>
            <Navbar />
            <MainLayout>
                <ContentSection>
                    <SectionTitle
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        Listening Section 3: Discussion
                    </SectionTitle>
                    <ContentWrapper>
                        <AudioPlayer src={audioUrl} />

                        <p>
                            **Instructions:** Listen to the academic discussion and answer the questions below. You will only hear the audio once.
                        </p>

                        <QuestionContainer>
                            {questions.map((q) => (
                                <Question key={q.id}>
                                    <QuestionText>{q.id}. {q.text}</QuestionText>
                                    <Input type="text" placeholder="Enter your answer" />
                                </Question>
                            ))}
                        </QuestionContainer>
                    </ContentWrapper>
                </ContentSection>
            </MainLayout>
            <Footer />
        </>
    );
}
