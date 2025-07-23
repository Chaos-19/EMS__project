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
import UpdateProfile from './pages/userPages/updateProfile';
import EventDetails from './pages/EventPages/eventDetails';
import Events from './pages/EventPages/Events';
import CreateEvent from './pages/EventPages/createEvent';
import RequestedEvent from './pages/eventAdmin Page/requestedEvent';
import MyEvents from './pages/userPages/myEvents';
import PrivateRoute from './components/privateRoute/privateRoute';
import BookingPage from './pages/EventPages/bookingPage';
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
            
            <Route path="/services" element={<Services />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/verifyEmail" element={<EmailVerification/>} />
            <Route path="/forgetPassword" element={<ForgetPassword />} />
            <Route path="/reset-password/:token" element={<ResetPassword />} />
            <Route path="/events" element = {<Events />} />
            <Route path="/events/:eventId" element={<EventDetails />} />
            <Route element={<PrivateRoute />} >
            <Route path="/updateProfile" element={<UpdateProfile />} />
            <Route path='/createEvent' element={<CreateEvent />} />
            <Route path="/requested_events" element={<RequestedEvent />} />
            <Route path='/my-events' element={<MyEvents />} />
            <Route path="/booking/:eventId" element={<BookingPage />} />
            </Route>
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App;