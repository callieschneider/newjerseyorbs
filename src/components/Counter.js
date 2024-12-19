import React from 'react';
import styled from 'styled-components';

const CounterContainer = styled.div`
  background-color: #000;
  color: #0ff;
  padding: 0.5rem;
  text-align: center;
  font-family: 'Courier New', monospace;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-bottom: 1rem;
`;

const CounterText = styled.span`
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const Counter = () => {
  return (
    <CounterContainer>
      <CounterText>VISITORS:</CounterText>
      <img 
        src="https://hitwebcounter.com/counter/counter.php?page=9812344&style=0007&nbdigits=5&type=ip&initCount=0" 
        title="Free Counter" 
        alt="web counter"
        border="0"
      />
    </CounterContainer>
  );
};

export default Counter; 