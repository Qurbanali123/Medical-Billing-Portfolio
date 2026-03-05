import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Experience from './components/Experience';
import Contact from './components/Contact';
import ThreeBackground from './components/ThreeBackground';
function App() {
  return (
    <div className="relative overflow-x-hidden">
      <ThreeBackground />
      <Navbar />
      <main>
        <Hero />
      
      
       
      </main>
    </div>
  );
}

export default App;
