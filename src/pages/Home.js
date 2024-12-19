import React, { useEffect, useState } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Import orb screenshots
const orb1 = '/newark-cluster.png';
const orb2 = '/jersey-city-phase.png';
const orb3 = '/atlantic-city-temporal.png';
const orb4 = '/pine-barrens-binary.png';
const orb5 = '/trenton-quantum.png';
const orb6 = '/princeton-geometric.png';
const orb7 = '/camden-dimensional.png';
const orb8 = '/hoboken-synchronized.png';

console.log('Using images:', { orb1, orb2, orb3, orb4, orb5, orb6, orb7, orb8 });

// Fix Leaflet default marker icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const glow = keyframes`
  0% { text-shadow: 0 0 10px #0ff; }
  50% { text-shadow: 0 0 20px #0ff, 0 0 30px #0ff; }
  100% { text-shadow: 0 0 10px #0ff; }
`;

const scroll = keyframes`
  0% { transform: translateX(100%); }
  100% { transform: translateX(-100%); }
`;

const colorShift = keyframes`
  0% { filter: hue-rotate(0deg); }
  100% { filter: hue-rotate(360deg); }
`;

const float = keyframes`
  0% { transform: translateY(0px) scale(1); }
  25% { transform: translateY(-10px) scale(1.03); }
  50% { transform: translateY(-20px) scale(1.06); }
  75% { transform: translateY(-10px) scale(1.03); }
  100% { transform: translateY(0px) scale(1); }
`;

const HomeContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 3.5rem;
  color: #0ff;
  animation: ${glow} 2s ease-in-out infinite;
  margin-bottom: 2rem;
`;

const Subtitle = styled.h2`
  color: #ff0;
  margin-bottom: 1.5rem;
  font-size: 1.8rem;
`;

const Text = styled.p`
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 1rem;
  color: #0ff;
`;

const TickerContainer = styled.div`
  width: 100%;
  overflow: hidden;
  background: #001;
  padding: 1rem 0;
  margin: 2rem 0;
  border-top: 1px solid #0ff;
  border-bottom: 1px solid #0ff;
`;

const TickerText = styled.div`
  white-space: nowrap;
  animation: ${scroll} 20s linear infinite;
  color: #f00;
  font-weight: bold;
`;

const OrbImage = styled.div`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  margin: 2rem auto;
  background: radial-gradient(circle at 30% 30%, rgba(0, 255, 255, 0.8), rgba(0, 68, 68, 0.2));
  box-shadow: 
    0 0 30px rgba(0, 255, 255, 0.5),
    0 0 60px rgba(0, 255, 255, 0.3),
    0 0 90px rgba(0, 255, 255, 0.2);
  animation: 
    ${float} 6s ease-in-out infinite,
    ${colorShift} 20s linear infinite;
  filter: blur(3px);
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: -10px;
    left: -10px;
    right: -10px;
    bottom: -10px;
    background: inherit;
    border-radius: 50%;
    filter: blur(10px);
    opacity: 0.7;
  }

  &::after {
    content: '';
    position: absolute;
    top: -20px;
    left: -20px;
    right: -20px;
    bottom: -20px;
    background: inherit;
    border-radius: 50%;
    filter: blur(20px);
    opacity: 0.4;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
`;

const Card = styled.div`
  background: rgba(0, 255, 255, 0.1);
  padding: 1.5rem;
  border-radius: 10px;
  border: 1px solid #0ff;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 0 20px rgba(0, 255, 255, 0.3);
  }
`;

const RecentSightings = [
  {
    date: "December 19, 2024",
    location: "Asbury Park Boardwalk",
    description: "Cluster of luminous orbs observed merging into one giant sphere, pulsing with impossible colors. Witnesses report time moving backwards within 50 feet of the phenomenon."
  },
  {
    date: "December 18, 2024",
    location: "Pine Barrens",
    description: "Seven perfectly synchronized orbs performing geometric patterns in the night sky. Each rotation caused nearby compasses to spin and phones to display messages in binary."
  },
  {
    date: "December 17, 2024",
    location: "Meadowlands",
    description: "Massive translucent orb hovering over stadium, creating smaller orblets that danced through the bleachers. Stadium lights flickered in response to their movements."
  }
];

const Section = styled.div`
  margin: 4rem 0;
  padding: 2rem;
  background: rgba(0, 255, 255, 0.05);
  border-radius: 15px;
  border: 1px solid #0ff;
`;

const StatGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin: 2rem 0;
`;

const Stat = styled.div`
  background: #001;
  padding: 1.5rem;
  border-radius: 10px;
  text-align: center;
  border: 1px solid #0ff;
`;

const PulseCircle = styled.div`
  width: 10px;
  height: 10px;
  background: #0ff;
  border-radius: 50%;
  display: inline-block;
  margin-right: 10px;
  animation: ${glow} 2s ease-in-out infinite;
`;

const orbStats = [
  { label: "Active Orbs", baseValue: 147, unit: "", range: 5 },
  { label: "Average Size", baseValue: 2.3, unit: "m", range: 0.2 },
  { label: "Energy Output", baseValue: 1000, unit: " MW", range: 100 },
  { label: "Documented Colors", baseValue: 17, unit: "+", range: 2 }
];

const recentUpdates = [
  "Orb luminosity increasing by 3% daily",
  "New geometric formations observed",
  "Unexplained gravitational fluctuations",
  "Pattern recognition AI overwhelmed"
];

const StyledMapContainer = styled.div`
  width: 100%;
  height: 400px;
  border: 1px solid #0ff;
  border-radius: 10px;
  overflow: hidden;
  margin: 2rem 0;

  .leaflet-container {
    width: 100%;
    height: 100%;
    background: #001;
  }

  .leaflet-tile {
    filter: invert(1) hue-rotate(180deg);
  }
`;

const NJ_BOUNDS = [
  [38.9283, -75.5594], // Southwest coordinates
  [41.3574, -73.8940]  // Northeast coordinates
];

// More precise NJ bounds
const NJ_TIGHT_BOUNDS = {
  minLat: 39.2, // Southern tip near Cape May
  maxLat: 41.1, // Northern border near Port Jervis
  minLng: -75.2, // Western border along Delaware River
  maxLng: -74.0  // Eastern border along Atlantic Ocean
};

// Calculate the center of NJ
const NJ_CENTER = [
  (NJ_TIGHT_BOUNDS.minLat + NJ_TIGHT_BOUNDS.maxLat) / 2,
  (NJ_TIGHT_BOUNDS.minLng + NJ_TIGHT_BOUNDS.maxLng) / 2
];

// Function to generate random coordinates within NJ bounds
const generateRandomNJLocation = () => {
  const lat = Math.random() * (NJ_TIGHT_BOUNDS.maxLat - NJ_TIGHT_BOUNDS.minLat) + NJ_TIGHT_BOUNDS.minLat;
  const lng = Math.random() * (NJ_TIGHT_BOUNDS.maxLng - NJ_TIGHT_BOUNDS.minLng) + NJ_TIGHT_BOUNDS.minLng;
  
  // Add some randomness to the sighting numbers and descriptions
  const sightingNum = Math.floor(Math.random() * 10000);
  const descriptions = [
    "Pulsating orb",
    "Geometric formation",
    "Temporal anomaly",
    "Phase-shifting sphere",
    "Binary signal cluster",
    "Quantum manifestation"
  ];
  const description = descriptions[Math.floor(Math.random() * descriptions.length)];
  
  // Generate random velocity components with increased speed
  const speed = Math.random() * 0.001 + 0.0005; // 10x faster than before
  const angle = Math.random() * Math.PI * 2; // Random direction in radians
  
  return {
    coordinates: [lat, lng],
    name: `${description} #${sightingNum}`,
    velocity: {
      lat: Math.cos(angle) * speed,
      lng: Math.sin(angle) * speed
    }
  };
};

// Create custom orb icon
const createOrbIcon = (intensity) => {
  const size = 20;
  const html = `
    <div style="
      width: ${size}px;
      height: ${size}px;
      background: radial-gradient(circle at 30% 30%, rgba(0, 255, 255, ${intensity}), rgba(0, 68, 68, ${intensity}));
      border-radius: 50%;
      box-shadow: 0 0 ${10 * intensity}px rgba(0, 255, 255, ${intensity});
    "></div>
  `;

  return L.divIcon({
    html: html,
    className: 'orb-icon',
    iconSize: [size, size],
    iconAnchor: [size/2, size/2]
  });
};

// Add custom CSS for the orb icon
const orbIconStyles = `
  .orb-icon {
    background: none;
    border: none;
  }
`;

// Add the styles to the document head
const styleSheet = document.createElement("style");
styleSheet.innerText = orbIconStyles;
document.head.appendChild(styleSheet);

const ImageGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin: 2rem 0;
`;

const SightingImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 10px;
  border: 1px solid #0ff;
  transition: all 0.3s ease;
  
  &:hover {
    transform: scale(1.05);
    box-shadow: 0 0 20px rgba(0, 255, 255, 0.3);
  }
`;

const orbScreenshots = [
  {
    src: orb1,
    description: 'Orb cluster over Newark skyline'
  },
  {
    src: orb2,
    description: 'Phase-shifting orb near Jersey City'
  },
  {
    src: orb3,
    description: 'Temporal anomaly in Atlantic City'
  },
  {
    src: orb4,
    description: 'Binary signal cluster above Pine Barrens'
  },
  {
    src: orb5,
    description: 'Quantum manifestation in Trenton'
  },
  {
    src: orb6,
    description: 'Geometric formation over Princeton'
  },
  {
    src: orb7,
    description: 'Multi-dimensional orb sighting in Camden'
  },
  {
    src: orb8,
    description: 'Synchronized orb dance above Hoboken'
  }
];

function Home() {
  const [counter, setCounter] = useState(0);
  const [currentStats, setCurrentStats] = useState(orbStats.map(stat => ({
    ...stat,
    currentValue: stat.baseValue
  })));
  const [markers, setMarkers] = useState([]);
  const [selectedMarker, setSelectedMarker] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCounter(prev => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Update stats every 2 seconds
    const statsInterval = setInterval(() => {
      setCurrentStats(prevStats => 
        prevStats.map(stat => {
          const randomChange = (Math.random() - 0.5) * 2 * stat.range;
          const newValue = stat.baseValue + randomChange;
          return {
            ...stat,
            currentValue: newValue
          };
        })
      );
    }, 2000);

    return () => clearInterval(statsInterval);
  }, []);

  useEffect(() => {
    let lastAddTime = 0;
    let nextAddDelay = 0;
    let lastMoveTime = 0;
    let animationFrameId;

    const getRandomDelay = () => {
      return Math.random() * 3000 + 1000; // Random delay between 1 and 4 seconds
    };

    const addMarkerIfNeeded = (timestamp) => {
      // Add a new marker after random delay
      if (!nextAddDelay) {
        nextAddDelay = getRandomDelay();
      }

      if (timestamp - lastAddTime >= nextAddDelay) {
        const location = generateRandomNJLocation();
        const newMarker = {
          id: Date.now() + Math.random(),
          name: location.name,
          coordinates: location.coordinates,
          velocity: location.velocity,
          intensity: 1,
          createdAt: Date.now()
        };
        
        setMarkers(prev => {
          const updatedMarkers = [...prev, newMarker]
            .sort((a, b) => b.createdAt - a.createdAt)
            .slice(0, 100);
          return updatedMarkers;
        });

        lastAddTime = timestamp;
        nextAddDelay = getRandomDelay(); // Set next delay
      }

      // Update marker positions and intensities
      if (timestamp - lastMoveTime >= 16) { // Update positions at ~60fps
        setMarkers(prev => 
          prev.map(marker => {
            const elapsed = Date.now() - marker.createdAt;
            const remaining = Math.max(0, 1 - (elapsed / 30000));
            
            // Update position based on velocity
            const newLat = marker.coordinates[0] + marker.velocity.lat;
            const newLng = marker.coordinates[1] + marker.velocity.lng;
            
            // Keep orbs within NJ bounds
            const boundedLat = Math.max(NJ_TIGHT_BOUNDS.minLat, Math.min(NJ_TIGHT_BOUNDS.maxLat, newLat));
            const boundedLng = Math.max(NJ_TIGHT_BOUNDS.minLng, Math.min(NJ_TIGHT_BOUNDS.maxLng, newLng));
            
            return {
              ...marker,
              coordinates: [boundedLat, boundedLng],
              intensity: remaining
            };
          }).filter(marker => marker.intensity > 0)
        );
        lastMoveTime = timestamp;
      }

      animationFrameId = requestAnimationFrame(addMarkerIfNeeded);
    };

    animationFrameId = requestAnimationFrame(addMarkerIfNeeded);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const formatValue = (value, unit) => {
    if (unit === "m") return value.toFixed(1) + unit;
    if (unit === " MW") return Math.round(value) + unit;
    if (unit === "+") return Math.round(value) + unit;
    return Math.round(value);
  };

  return (
    <HomeContainer>
      <Title>New Jersey Orb Research Institute</Title>
      <Subtitle>Documenting the Garden State's Most Mysterious Phenomena</Subtitle>
      
      <OrbImage />
      
      <TickerContainer>
        <TickerText>
          🚨 BREAKING NEWS: Giant mothership orb spotted above Parkway • 
          Smaller orbs emerging from larger ones in fractal patterns • 
          Orb activity causing widespread electromagnetic anomalies • 
          Scientists baffled by orbs' violation of known physics • 
          Glowing spheres communicating through light pulses • 
          Multiple orbs converging into complex geometric formations 🚨
        </TickerText>
      </TickerContainer>

      <Text>
        Since the great Hoboken Orb Incident of December 2024 (when a colossal sphere 
        appeared above the train terminal and split into thousands of smaller orbs), 
        our dedicated team of researchers has been tracking these unprecedented 
        luminous phenomena across New Jersey. Orb sightings have increased by {counter}% 
        since you started reading this, with each sphere displaying increasingly 
        complex behavior patterns.
      </Text>

      <Text>
        From the mysterious hovering orbs that emit impossible wavelengths of light, 
        to the synchronized spheres performing mathematical dances in the sky, we're 
        here to document and study these inexplicable entities that have made New 
        Jersey the epicenter of unexplained spherical phenomena in our dimension.
      </Text>

      <Section>
        <Subtitle>Live Sighting Map</Subtitle>
        <Text>Real-time orb manifestations across New Jersey</Text>
        <StyledMapContainer>
          <MapContainer
            center={NJ_CENTER}
            zoom={8}
            maxBounds={NJ_BOUNDS}
            style={{ height: '100%', width: '100%' }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {markers.map(marker => (
              <Marker
                key={marker.id}
                position={marker.coordinates}
                icon={createOrbIcon(marker.intensity)}
              >
                <Popup>
                  <div style={{ color: '#000' }}>
                    <strong>{marker.name}</strong>
                    <br />
                    Intensity: {Math.round(marker.intensity * 100)}%
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </StyledMapContainer>
      </Section>

      <Section>
        <Subtitle>Recent Confirmed Sightings</Subtitle>
        <Grid>
          {RecentSightings.map((sighting, index) => (
            <Card key={index}>
              <h3 style={{ color: '#ff0', marginBottom: '1rem' }}>{sighting.location}</h3>
              <p style={{ color: '#0ff', marginBottom: '0.5rem' }}>{sighting.date}</p>
              <p style={{ color: '#fff' }}>{sighting.description}</p>
            </Card>
          ))}
        </Grid>
      </Section>

      <Section>
        <Subtitle>Documented Sightings</Subtitle>
        <Text>Photographic evidence of recent orb manifestations across New Jersey</Text>
        <ImageGrid>
          {orbScreenshots.map((screenshot, index) => (
            <div key={index}>
              <SightingImage
                src={screenshot.src}
                alt={screenshot.description}
              />
              <Text style={{ marginTop: '0.5rem', fontSize: '0.9rem' }}>
                {screenshot.description}
              </Text>
            </div>
          ))}
        </ImageGrid>
      </Section>

      <Section>
        <Subtitle>Live Monitoring Statistics</Subtitle>
        <StatGrid>
          {currentStats.map((stat, index) => (
            <Stat key={index}>
              <PulseCircle />
              <h3 style={{ color: '#ff0', marginBottom: '0.5rem' }}>{stat.label}</h3>
              <p style={{ 
                color: '#0ff', 
                fontSize: '1.5rem',
                transition: 'all 0.5s ease'
              }}>
                {formatValue(stat.currentValue, stat.unit)}
              </p>
            </Stat>
          ))}
        </StatGrid>
      </Section>

      <Section>
        <Subtitle>Orb Behavior Analysis</Subtitle>
        <Text>
          Our research indicates that the orbs exhibit clear signs of intelligence, 
          demonstrating complex mathematical patterns that defy our current 
          understanding of geometry. Their ability to merge, split, and reorganize 
          suggests a form of consciousness operating in dimensions beyond our 
          comprehension.
        </Text>
        <Grid style={{ marginTop: '2rem' }}>
          <Card>
            <h3 style={{ color: '#ff0', marginBottom: '1rem' }}>Pattern Recognition</h3>
            <p style={{ color: '#fff' }}>
              Orbs frequently arrange themselves in fibonacci sequences and display 
              movements that correspond to prime number calculations.
            </p>
          </Card>
          <Card>
            <h3 style={{ color: '#ff0', marginBottom: '1rem' }}>Energy Signatures</h3>
            <p style={{ color: '#fff' }}>
              Each orb emits a unique frequency signature that changes in response 
              to other orbs, suggesting a form of communication.
            </p>
          </Card>
          <Card>
            <h3 style={{ color: '#ff0', marginBottom: '1rem' }}>Temporal Effects</h3>
            <p style={{ color: '#fff' }}>
              Local time dilation has been observed within 50 meters of large orb 
              clusters, with effects lasting up to 47 minutes.
            </p>
          </Card>
        </Grid>
      </Section>

      <Section>
        <Subtitle>Latest Research Updates</Subtitle>
        <div style={{ textAlign: 'left', margin: '2rem 0' }}>
          {recentUpdates.map((update, index) => (
            <div key={index} style={{ margin: '1rem 0', display: 'flex', alignItems: 'center' }}>
              <PulseCircle />
              <Text style={{ margin: 0 }}>{update}</Text>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <Subtitle>Citizen Science Initiative</Subtitle>
        <Text>
          Join our network of orb observers. We provide training in temporal 
          anomaly detection, quantum field measurement, and interdimensional 
          safety protocols. All volunteers receive our patented Orb Proximity 
          Warning System™ (warning: may cause mild existential crises).
        </Text>
        <div style={{ marginTop: '2rem', padding: '1rem', border: '1px dashed #0ff', borderRadius: '10px' }}>
          <h3 style={{ color: '#ff0', marginBottom: '1rem' }}>Required Equipment:</h3>
          <ul style={{ color: '#fff', textAlign: 'left', columns: 2 }}>
            <li>Quantum Field Detector</li>
            <li>Temporal Stability Meter</li>
            <li>Non-Euclidean Compass</li>
            <li>Reality Anchor Device</li>
            <li>Dimensional Shift Goggles</li>
            <li>Orb Documentation Kit</li>
          </ul>
        </div>
      </Section>

      <Section>
        <Subtitle>Safety Guidelines</Subtitle>
        <Grid>
          <Card>
            <h3 style={{ color: '#ff0', marginBottom: '1rem' }}>DO:</h3>
            <ul style={{ color: '#fff', textAlign: 'left' }}>
              <li>Maintain safe distance (minimum 20m)</li>
              <li>Document all observations</li>
              <li>Report unusual geometric patterns</li>
              <li>Monitor personal temporal stability</li>
            </ul>
          </Card>
          <Card>
            <h3 style={{ color: '#ff0', marginBottom: '1rem' }}>DON'T:</h3>
            <ul style={{ color: '#fff', textAlign: 'left' }}>
              <li>Attempt to touch the orbs</li>
              <li>Stare directly at phase shifts</li>
              <li>Ignore reality anchors</li>
              <li>Enter quantum probability fields</li>
            </ul>
          </Card>
        </Grid>
      </Section>

      <Text style={{ marginTop: '3rem', fontStyle: 'italic' }}>
        <strong>NOTICE:</strong> The NJORI is not responsible for any temporal 
        displacement, spontaneous levitation, or sudden ability to perceive 
        additional geometric dimensions following orb encounters. If you begin 
        to see spheres within spheres within spheres, please contact our 
        emergency hotline immediately.
      </Text>
    </HomeContainer>
  );
}

export default Home; 