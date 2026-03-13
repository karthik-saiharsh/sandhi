import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Demo from './pages/Demo';

export default function App() {
  return (
    <div className="relative min-h-screen overflow-x-hidden flex flex-col items-center">
      
      {/* ── Global Background Elements ───────────────────────── */}
      <div className="glow-orb-primary"></div>
      <div className="glow-orb-secondary"></div>
      
      <div className="w-full max-w-[1400px] z-10 flex flex-col min-h-screen">
        <Header />
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/demo" element={<Demo />} />
        </Routes>
      </div>
    </div>
  );
}
