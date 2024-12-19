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

const ContactForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 2rem;
  background: rgba(0, 255, 255, 0.1);
  border-radius: 10px;
  border: 1px solid #0ff;
`;

const Input = styled.input`
  background: #001;
  border: 1px solid #0ff;
  padding: 0.8rem;
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
  padding: 0.8rem;
  color: #0ff;
  border-radius: 5px;
  min-height: 150px;
  resize: vertical;
  
  &:focus {
    outline: none;
    box-shadow: 0 0 10px #0ff;
  }
`;

const Button = styled.button`
  background: #0ff;
  color: #000;
  padding: 1rem;
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

const InfoCard = styled.div`
  padding: 2rem;
  background: rgba(0, 255, 255, 0.1);
  border-radius: 10px;
  border: 1px solid #0ff;
  animation: ${glow} 3s ease-in-out infinite;
`;

const SocialLink = styled.a`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #0ff;
  text-decoration: none;
  padding: 0.5rem;
  transition: all 0.3s ease;
  
  &:hover {
    color: #fff;
    transform: translateX(5px);
  }
`;

const locations = [
  {
    name: "NJORI Headquarters",
    address: "123 Orb Avenue, Newark, NJ",
    hours: "24/7 (Orbs don't sleep)",
    phone: "(555) ORB-SPOT"
  },
  {
    name: "Pine Barrens Research Station",
    address: "Near the Jersey Devil's House",
    hours: "Dusk till Dawn",
    phone: "(555) PINE-ORB"
  }
];

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Message received! Our orb investigators will contact you shortly.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <Container>
      <Title>Contact Us</Title>
      
      <Grid>
        <div>
          <h2 style={{ color: '#ff0', marginBottom: '2rem' }}>Send Us a Message</h2>
          <ContactForm onSubmit={handleSubmit}>
            <Input 
              type="text" 
              placeholder="Your Name"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              required
            />
            <Input 
              type="email" 
              placeholder="Your Email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              required
            />
            <Input 
              type="text" 
              placeholder="Subject"
              value={formData.subject}
              onChange={(e) => setFormData({...formData, subject: e.target.value})}
              required
            />
            <TextArea 
              placeholder="Your Message"
              value={formData.message}
              onChange={(e) => setFormData({...formData, message: e.target.value})}
              required
            />
            <Button type="submit">Send Message</Button>
          </ContactForm>
        </div>

        <div>
          <h2 style={{ color: '#ff0', marginBottom: '2rem' }}>Our Locations</h2>
          {locations.map((location, index) => (
            <InfoCard key={index} style={{ marginBottom: '1rem' }}>
              <h3 style={{ color: '#0ff', marginBottom: '1rem' }}>{location.name}</h3>
              <p style={{ color: '#fff', marginBottom: '0.5rem' }}>{location.address}</p>
              <p style={{ color: '#fff', marginBottom: '0.5rem' }}>Hours: {location.hours}</p>
              <p style={{ color: '#0ff' }}>Phone: {location.phone}</p>
            </InfoCard>
          ))}

          <h2 style={{ color: '#ff0', margin: '2rem 0 1rem' }}>Follow Our Research</h2>
          <InfoCard>
            <SocialLink href="#" target="_blank">
              🐦 @NJOrbWatch
            </SocialLink>
            <SocialLink href="#" target="_blank">
              📸 @NewJerseyOrbs
            </SocialLink>
            <SocialLink href="#" target="_blank">
              📱 r/NewJerseyOrbs
            </SocialLink>
          </InfoCard>
        </div>
      </Grid>

      <div style={{ marginTop: '3rem', textAlign: 'center' }}>
        <h2 style={{ color: '#ff0', marginBottom: '1rem' }}>Emergency Orb Hotline</h2>
        <p style={{ color: '#0ff', fontSize: '1.2rem' }}>
          For immediate orb-related emergencies or if you spot an orb improving 
          your local diner's coffee, call our 24/7 hotline:
        </p>
        <p style={{ color: '#ff0', fontSize: '2rem', marginTop: '1rem' }}>
          1-800-ORB-ALERT
        </p>
      </div>
    </Container>
  );
}

export default Contact;
