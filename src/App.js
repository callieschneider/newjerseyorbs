import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import styled from 'styled-components';
import Navbar from './components/Navbar';
import Counter from './components/Counter';
import Home from './pages/Home';
import Sightings from './pages/Sightings';
import Research from './pages/Research';
import Contact from './pages/Contact';

const AppContainer = styled.div`
  background-color: #000;
  color: #0ff;
  min-height: 100vh;
  font-family: 'Courier New', monospace;
  display: flex;
  flex-direction: column;
`;

const MainContent = styled.main`
  flex: 1;
`;

function App() {
  return (
    <Router>
      <AppContainer>
        <Navbar />
        <Counter />
        <MainContent>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/sightings" element={<Sightings />} />
            <Route path="/research" element={<Research />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </MainContent>
      </AppContainer>
    </Router>
  );
}

export default App;
