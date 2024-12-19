import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

const rotate = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const Container = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 2rem;
`;

const Title = styled.h1`
  font-size: 3rem;
  color: #0ff;
  text-shadow: 0 0 10px #0ff;
  margin-bottom: 2rem;
  text-align: center;
`;

const Section = styled.section`
  margin: 3rem 0;
  padding: 2rem;
  background: rgba(0, 255, 255, 0.1);
  border-radius: 10px;
  border: 1px solid #0ff;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
`;

const DataPoint = styled.div`
  background: #001;
  padding: 1.5rem;
  border-radius: 10px;
  text-align: center;
  animation: ${pulse} 2s infinite ease-in-out;
  cursor: pointer;
  
  &:hover {
    background: #002;
  }
`;

const Chart = styled.div`
  width: 200px;
  height: 200px;
  border: 2px solid #0ff;
  border-radius: 50%;
  margin: 2rem auto;
  position: relative;
  animation: ${rotate} 10s linear infinite;
  
  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 10px;
    height: 10px;
    background: #0ff;
    border-radius: 50%;
    transform: translate(-50%, -50%);
  }
`;

const researchData = [
  {
    title: "Orb Energy Signatures",
    value: "487.3 MHz",
    description: "Consistent electromagnetic frequency detected across multiple sightings"
  },
  {
    title: "Average Duration",
    value: "12.7 minutes",
    description: "Typical length of orb manifestations"
  },
  {
    title: "Temperature Impact",
    value: "+3.2°F",
    description: "Local temperature increase during orb presence"
  },
  {
    title: "Diner Proximity",
    value: "0.8 miles",
    description: "Average distance to nearest New Jersey diner during sightings"
  }
];

const theories = [
  {
    title: "The Pork Roll Theory",
    content: "Evidence suggests orbs may be drawn to the unique electromagnetic properties of Taylor Ham/Pork Roll preparation methods."
  },
  {
    title: "The Turnpike Hypothesis",
    content: "Research indicates a correlation between toll booth locations and orb manifestation frequencies."
  },
  {
    title: "The Jersey Devil Connection",
    content: "Multiple witnesses report orbs engaging in what appears to be diplomatic relations with the Jersey Devil."
  }
];

function Research() {
  const [activeTheory, setActiveTheory] = useState(0);

  return (
    <Container>
      <Title>Research & Analysis</Title>

      <Section>
        <h2 style={{ color: '#ff0', textAlign: 'center', marginBottom: '2rem' }}>
          Current Research Metrics
        </h2>
        <Grid>
          {researchData.map((data, index) => (
            <DataPoint key={index}>
              <h3 style={{ color: '#0ff', marginBottom: '1rem' }}>{data.title}</h3>
              <p style={{ color: '#ff0', fontSize: '2rem', marginBottom: '1rem' }}>{data.value}</p>
              <p style={{ color: '#fff' }}>{data.description}</p>
            </DataPoint>
          ))}
        </Grid>
      </Section>

      <Section>
        <h2 style={{ color: '#ff0', textAlign: 'center', marginBottom: '2rem' }}>
          Orb Activity Analysis
        </h2>
        <Chart />
        <p style={{ color: '#0ff', textAlign: 'center', marginTop: '1rem' }}>
          Real-time orb activity monitoring system
        </p>
      </Section>

      <Section>
        <h2 style={{ color: '#ff0', textAlign: 'center', marginBottom: '2rem' }}>
          Working Theories
        </h2>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '2rem' }}>
          {theories.map((theory, index) => (
            <button
              key={index}
              onClick={() => setActiveTheory(index)}
              style={{
                background: activeTheory === index ? '#0ff' : '#001',
                color: activeTheory === index ? '#000' : '#0ff',
                border: '1px solid #0ff',
                padding: '0.5rem 1rem',
                borderRadius: '5px',
                cursor: 'pointer'
              }}
            >
              Theory {index + 1}
            </button>
          ))}
        </div>
        <div style={{ 
          background: '#001', 
          padding: '2rem', 
          borderRadius: '10px',
          border: '1px solid #0ff'
        }}>
          <h3 style={{ color: '#ff0', marginBottom: '1rem' }}>{theories[activeTheory].title}</h3>
          <p style={{ color: '#fff' }}>{theories[activeTheory].content}</p>
        </div>
      </Section>

      <Section>
        <h2 style={{ color: '#ff0', textAlign: 'center', marginBottom: '2rem' }}>
          Research Notice
        </h2>
        <p style={{ color: '#0ff', textAlign: 'center', fontStyle: 'italic' }}>
          All research conducted by the New Jersey Orb Research Institute is peer-reviewed 
          by a panel of experts including retired diner waitresses, Garden State Parkway 
          toll collectors, and at least one Bruce Springsteen tribute band member.
        </p>
      </Section>
    </Container>
  );
}

export default Research;
