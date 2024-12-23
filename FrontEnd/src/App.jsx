import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

import { ThemeProvider } from './contexts/ThemeContext';
import Header from './components/DashBoardComponents/Header';
import Landing from './pages/Dashboard pages/Landing';
import Home from './pages/Dashboard pages/Home';
import Services from './pages/Dashboard pages/Services';
import About from './pages/Dashboard pages/About';
import Contact from './pages/Dashboard pages/Contact';
import Calendar from './pages/Dashboard pages/Calendar';
import Signup from './pages/AuthPages/Signup';
import Login from './pages/AuthPages/Login';

function Layout({ children }) {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <Header />
      <main>{children}</main>
      <footer className="bg-white dark:bg-gray-800 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <p className="text-center text-gray-600 dark:text-gray-300">
            © 2024 Company Events. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <Toaster />
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/events" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App;