import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  background-color: #000;
  color: #0ff;
  padding: 1rem;
  text-align: center;
  border-top: 1px solid #0ff;
  font-family: 'Courier New', monospace;
  position: relative;
  bottom: 0;
  width: 100%;
  margin-top: 2rem;
`;

const VisitCounter = styled.div`
  font-size: 0.9rem;
  opacity: 0.8;
`;

const Footer = () => {
  const [visits, setVisits] = useState(0);

  useEffect(() => {
    // Get current visit count
    const currentVisits = parseInt(localStorage.getItem('visitCount')) || 0;
    
    // Increment visit count
    const newVisits = currentVisits + 1;
    localStorage.setItem('visitCount', newVisits);
    
    // Update state
    setVisits(newVisits);
  }, []);

  return (
    <FooterContainer>
      <VisitCounter>
        You have visited {visits} time{visits !== 1 ? 's' : ''}
      </VisitCounter>
    </FooterContainer>
  );
};

export default Footer; 