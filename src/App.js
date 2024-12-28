import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components';
import Navbar from './components/Navbar';
import Counter from './components/Counter';
import Home from './pages/Home';
import Sightings from './pages/Sightings';
import Research from './pages/Research';
import Contact from './pages/Contact';

const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Open Sans', sans-serif;
    line-height: 1.6;
  }
`;


const AppContainer = styled.div`
  background-color: #000;
  color: #0ff;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const ContentContainer = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const MainContent = styled.main`
  flex: 1;
`;


function App() {
  return (
    <Router>
      <GlobalStyle />
      <AppContainer>
        <ContentContainer>
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
        </ContentContainer>
      </AppContainer>
    </Router>
  );
}

export default App;
