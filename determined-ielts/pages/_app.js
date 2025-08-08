import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css'; // Import the AOS CSS
import { createGlobalStyle } from 'styled-components';

// A unique and vibrant color palette
const GlobalStyle = createGlobalStyle`
  :root {
    --primary-bg: #1A1A2E;
    --secondary-bg: #27285C;
    --accent-color: #E94560;
    --text-color: #f0f0f0;
    --card-bg: rgba(43, 44, 91, 0.5); /* Semi-transparent for glassmorphism */
    --border-color: rgba(233, 69, 96, 0.2);
    --font-family: 'Poppins', sans-serif;
  }

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    background-color: var(--primary-bg);
    color: var(--text-color);
    font-family: var(--font-family);
    overflow-x: hidden;
  }

  a {
    color: var(--accent-color);
    text-decoration: none;
  }
`;

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    // Initialize AOS
    AOS.init({
      easing: 'ease-out-cubic',
      once: true,
      offset: 50,
    });
  }, []);

  return (
    <>
      <GlobalStyle />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;