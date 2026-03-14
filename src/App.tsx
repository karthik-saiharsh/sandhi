import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Demo from './pages/Demo';
import Architecture from './pages/Architecture';

export default function App() {
  return (
    <div className="relative min-h-screen bg-[#0A0A0A] overflow-x-hidden flex flex-col items-center">
      <div className="w-full flex flex-col min-h-screen">
        <Header />
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/demo" element={<Demo />} />
          <Route path="/architecture" element={<Architecture />} />
        </Routes>
      </div>
    </div>
  );
}
