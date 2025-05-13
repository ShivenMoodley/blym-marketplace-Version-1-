
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Index from './pages/Index';
import NotFound from './pages/NotFound';
import MainLayout from './layouts/MainLayout';
import WaitlistPage from './pages/WaitlistPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout><Index /></MainLayout>} />
        <Route path="/waitlist-data" element={<MainLayout><WaitlistPage /></MainLayout>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
