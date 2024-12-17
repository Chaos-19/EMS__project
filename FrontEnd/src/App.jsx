import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Profile from './pages/Profile'
import SignUp from './pages/SIgnUp'
import OTPVerification from './pages/OTPVerification'
import Header from './components/Header'
import Footer from './components/Footer'


function App() {
  return (
    <BrowserRouter>
    <Header />
     <Routes>
      <Route path='/' element={<Home />}/>
      <Route path='/signup' element={<SignUp />}/>
      <Route path='/otpverification' element={<OTPVerification />}/>
      <Route path='/login' element={<Login  />}/>
      <Route path='/profile' element={<Profile />}/>
     </Routes>
     <Footer />
    </BrowserRouter>
  )
}

export default App