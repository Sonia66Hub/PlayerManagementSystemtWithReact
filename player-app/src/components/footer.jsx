// Footer.jsx
import React, { useState } from 'react';
import { Container, Button } from 'react-bootstrap';

const Footer = () => {
  const [darkMode, setDarkMode] = useState(true);

  const toggleTheme = () => setDarkMode(!darkMode);

  return (
    <footer
      className={`py-3 px-3 mt-auto text-center ${
        darkMode ? 'bg-dark text-light' : 'bg-light text-dark'
      }`}
      style={{
        borderTop: darkMode ? '1px solid #444' : '1px solid #ccc',
        transition: 'all 0.3s ease',
      }}
    >
      <Container>
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center">
          {/* <small></small> */}
          {/* <Button
            variant={darkMode ? 'outline-light' : 'outline-dark'}
            size="sm"
            className="mt-2 mt-md-0"
            onClick={toggleTheme}
          >
            Switch to {darkMode ? 'Light' : 'Dark'} Mode
          </Button> */}
        </div>
        <small className="d-block mt-2">© {new Date().getFullYear()} Player Training App</small>
      </Container>
    </footer>
  );
};

export default Footer;
