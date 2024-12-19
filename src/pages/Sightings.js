import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';

const glow = keyframes`
  0% { box-shadow: 0 0 5px #0ff; }
  50% { box-shadow: 0 0 20px #0ff; }
  100% { box-shadow: 0 0 5px #0ff; }
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

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
`;

const SightingCard = styled.div`
  background: rgba(0, 255, 255, 0.1);
  padding: 1.5rem;
  border-radius: 10px;
  border: 1px solid #0ff;
  animation: ${glow} 3s ease-in-out infinite;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 500px;
  margin: 2rem auto;
  padding: 2rem;
  background: rgba(0, 0, 0, 0.5);
  border: 1px solid #0ff;
  border-radius: 10px;
`;

const Input = styled.input`
  background: #001;
  border: 1px solid #0ff;
  padding: 0.5rem;
  color: #0ff;
  border-radius: 5px;
  
  &:focus {
    outline: none;
    box-shadow: 0 0 10px #0ff;
  }
`;

const TextArea = styled.textarea`
  background: #001;
  border: 1px solid #0ff;
  padding: 0.5rem;
  color: #0ff;
  border-radius: 5px;
  min-height: 100px;
  
  &:focus {
    outline: none;
    box-shadow: 0 0 10px #0ff;
  }
`;

const Button = styled.button`
  background: #0ff;
  color: #000;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  transition: all 0.3s ease;
  
  &:hover {
    background: #fff;
    box-shadow: 0 0 20px #0ff;
  }
`;

const InfoSection = styled.section`
  margin: 3rem 0;
  padding: 2rem;
  background: rgba(0, 255, 255, 0.05);
  border-radius: 15px;
  border: 1px solid #0ff;
`;

const Timeline = styled.div`
  position: relative;
  max-width: 800px;
  margin: 2rem auto;
  &::after {
    content: '';
    position: absolute;
    width: 2px;
    background: #0ff;
    top: 0;
    bottom: 0;
    left: 50%;
    margin-left: -1px;
  }
`;

const TimelineItem = styled.div`
  padding: 10px 40px;
  position: relative;
  width: 50%;
  left: ${props => props.position === 'left' ? '0' : '50%'};
  
  &::after {
    content: '';
    position: absolute;
    width: 20px;
    height: 20px;
    right: ${props => props.position === 'left' ? '-10px' : 'auto'};
    left: ${props => props.position === 'left' ? 'auto' : '-10px'};
    background: #0ff;
    border-radius: 50%;
    top: 15px;
    z-index: 1;
  }
`;

const CategoryTag = styled.span`
  background: #003;
  color: #0ff;
  padding: 0.3rem 0.8rem;
  border-radius: 15px;
  font-size: 0.9rem;
  margin-right: 0.5rem;
  border: 1px solid #0ff;
`;

const orbCategories = [
  "Phase-Shifting",
  "Quantum-Entangled",
  "Time-Dilating",
  "Reality-Bending",
  "Energy-Pulsing",
  "Dimension-Crossing"
];

const timelineEvents = [
  {
    date: "December 19, 2024 - 15:30",
    event: "Multiple orbs observed performing synchronized quantum tunneling",
    position: "left"
  },
  {
    date: "December 19, 2024 - 14:15",
    event: "Large orb cluster forms perfect dodecahedron pattern",
    position: "right"
  },
  {
    date: "December 19, 2024 - 12:00",
    event: "First recorded instance of orb-induced time reversal",
    position: "left"
  },
  {
    date: "December 19, 2024 - 09:45",
    event: "Massive energy spike detected across all monitoring stations",
    position: "right"
  }
];

const hotspotLocations = [
  {
    name: "Hoboken Terminal",
    activity: "Extreme",
    phenomena: "Temporal anomalies, phase shifting"
  },
  {
    name: "Pine Barrens Central",
    activity: "High",
    phenomena: "Geometric formations, light patterns"
  },
  {
    name: "Atlantic City Boardwalk",
    activity: "Moderate",
    phenomena: "Quantum tunneling, energy pulses"
  }
];

const sightings = [
  {
    date: "December 19, 2024",
    location: "Atlantic City",
    description: "Three orbs observed phasing through solid matter, leaving trails of quantum distortion. Boardwalk security cameras captured spheres dividing and recombining.",
    credibility: "Multiple Camera Angles",
    image: "https://placehold.co/300x200/001/0ff/png?text=Phasing+Orbs"
  },
  {
    date: "December 18, 2024",
    location: "Princeton University",
    description: "Massive iridescent orb appeared during physics lecture, demonstrated quantum entanglement by splitting into perfectly synchronized pairs.",
    credibility: "Documented by Faculty",
    image: "https://placehold.co/300x200/001/0ff/png?text=Quantum+Orbs"
  },
  {
    date: "December 17, 2024",
    location: "Liberty State Park",
    description: "Formation of pulsating orbs created visible distortions in spacetime. Witnesses report seeing multiple timelines through the spheres' surfaces.",
    credibility: "Mass Sighting",
    image: "https://placehold.co/300x200/001/0ff/png?text=Timeline+Orbs"
  }
];

function Sightings() {
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    date: '',
    description: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Thank you for your submission! Our orb investigators will review your report.');
    setFormData({ name: '', location: '', date: '', description: '' });
  };

  return (
    <Container>
      <Title>Recent Orb Sightings</Title>
      
      <Form onSubmit={handleSubmit}>
        <h2 style={{ color: '#0ff', textAlign: 'center' }}>Report Your Orb Encounter</h2>
        <Input 
          type="text" 
          placeholder="Your Name (witnesses from all timelines welcome)"
          value={formData.name}
          onChange={(e) => setFormData({...formData, name: e.target.value})}
          required
        />
        <Input 
          type="text" 
          placeholder="Location (include any spacetime anomalies)"
          value={formData.location}
          onChange={(e) => setFormData({...formData, location: e.target.value})}
          required
        />
        <Input 
          type="date" 
          value={formData.date}
          onChange={(e) => setFormData({...formData, date: e.target.value})}
          required
        />
        <TextArea 
          placeholder="Describe your encounter... (Please note any temporal shifts, quantum phenomena, or geometric impossibilities)"
          value={formData.description}
          onChange={(e) => setFormData({...formData, description: e.target.value})}
          required
        />
        <Button type="submit">Submit Across All Dimensions</Button>
      </Form>

      <h2 style={{ color: '#ff0', textAlign: 'center', margin: '3rem 0' }}>
        Verified Orb Manifestations
      </h2>
      <Grid>
        {sightings.map((sighting, index) => (
          <SightingCard key={index}>
            <img 
              src={sighting.image} 
              alt={sighting.location} 
              style={{ width: '100%', height: '200px', objectFit: 'cover', marginBottom: '1rem' }}
            />
            <h3 style={{ color: '#ff0', marginBottom: '0.5rem' }}>{sighting.location}</h3>
            <p style={{ color: '#0ff', marginBottom: '0.5rem' }}>{sighting.date}</p>
            <p style={{ color: '#fff', marginBottom: '0.5rem' }}>{sighting.description}</p>
            <p style={{ color: '#0f0' }}>Credibility: {sighting.credibility}</p>
          </SightingCard>
        ))}
      </Grid>

      <InfoSection>
        <h2 style={{ color: '#ff0', textAlign: 'center', marginBottom: '2rem' }}>
          Known Orb Categories
        </h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center' }}>
          {orbCategories.map((category, index) => (
            <CategoryTag key={index}>{category}</CategoryTag>
          ))}
        </div>
      </InfoSection>

      <InfoSection>
        <h2 style={{ color: '#ff0', textAlign: 'center', marginBottom: '2rem' }}>
          Today's Timeline
        </h2>
        <Timeline>
          {timelineEvents.map((event, index) => (
            <TimelineItem key={index} position={event.position}>
              <h3 style={{ color: '#0ff', marginBottom: '0.5rem' }}>{event.date}</h3>
              <p style={{ color: '#fff' }}>{event.event}</p>
            </TimelineItem>
          ))}
        </Timeline>
      </InfoSection>

      <InfoSection>
        <h2 style={{ color: '#ff0', textAlign: 'center', marginBottom: '2rem' }}>
          Active Hotspots
        </h2>
        <Grid>
          {hotspotLocations.map((location, index) => (
            <SightingCard key={index}>
              <h3 style={{ color: '#ff0', marginBottom: '1rem' }}>{location.name}</h3>
              <p style={{ color: '#0ff', marginBottom: '0.5rem' }}>
                Activity Level: <strong>{location.activity}</strong>
              </p>
              <p style={{ color: '#fff' }}>
                Observed Phenomena: {location.phenomena}
              </p>
            </SightingCard>
          ))}
        </Grid>
      </InfoSection>

      <InfoSection>
        <h2 style={{ color: '#ff0', textAlign: 'center', marginBottom: '2rem' }}>
          Field Research Equipment
        </h2>
        <Grid>
          <SightingCard>
            <h3 style={{ color: '#ff0', marginBottom: '1rem' }}>Standard Issue</h3>
            <ul style={{ color: '#fff', textAlign: 'left' }}>
              <li>Quantum Field Analyzer</li>
              <li>Temporal Distortion Meter</li>
              <li>Reality Anchor Beacon</li>
              <li>Emergency Phase Stabilizer</li>
            </ul>
          </SightingCard>
          <SightingCard>
            <h3 style={{ color: '#ff0', marginBottom: '1rem' }}>Advanced Gear</h3>
            <ul style={{ color: '#fff', textAlign: 'left' }}>
              <li>Dimensional Rift Detector</li>
              <li>Orb Energy Resonance Scanner</li>
              <li>Quantum Entanglement Monitor</li>
              <li>Time Dilation Safety System</li>
            </ul>
          </SightingCard>
          <SightingCard>
            <h3 style={{ color: '#ff0', marginBottom: '1rem' }}>Safety Equipment</h3>
            <ul style={{ color: '#fff', textAlign: 'left' }}>
              <li>Personal Reality Anchor</li>
              <li>Temporal Shielding Device</li>
              <li>Phase Shift Protection Gear</li>
              <li>Emergency Recall Beacon</li>
            </ul>
          </SightingCard>
        </Grid>
      </InfoSection>
    </Container>
  );
}

export default Sightings;
