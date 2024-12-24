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
import EmailVerification from './pages/AuthPages/EmailVerification';
import Footer from './components/DashBoardComponents/Footer';
import ForgetPassword from './pages/AuthPages/ForgetPassword';
import ResetPassword from './pages/AuthPages/ResetPassword';

function Layout({ children }) {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <Header />
      <main>{children}</main>
      <Footer />
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
            <Route path="/verifyEmail" element={<EmailVerification/>} />
            <Route path="/forgetPassword" element={<ForgetPassword />} />
            <Route path="/resetPassword" element={<ResetPassword />} />
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App;