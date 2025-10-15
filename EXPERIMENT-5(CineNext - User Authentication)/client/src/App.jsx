import React from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { SignedIn, SignedOut, RedirectToSignIn, ClerkLoaded } from '@clerk/clerk-react'
import Home from './Pages/home'
import Movies from './Pages/Movies'
import MovieDetails from './Pages/MovieDetails'
import SeatLayout from './Pages/SeatLayout'
import MyBookings from './Pages/MyBookings'
import Favorite from './Pages/Favorite'
import { Toaster } from 'react-hot-toast'
import Footer from './Components/Footer'
import NavBar from './Components/NavBar'

const AppContent = () => {
  const location = useLocation()
  const isAdminRoute = location.pathname.startsWith('/admin')

  return (
    <>
      <Toaster />
      {!isAdminRoute && <NavBar />}

      <SignedIn>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/movies' element={<Movies />} />
          <Route path='/movies/:id' element={<MovieDetails />} />
          <Route path='/movies/:id/:date' element={<SeatLayout />} />
          <Route path='/my-bookings' element={<MyBookings />} />
          <Route path='/favorite' element={<Favorite />} />
        </Routes>
      </SignedIn>

      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>

      {!isAdminRoute && <Footer />}
    </>
  )
}

const App = () => {
  return (
    // Ensure Clerk is fully loaded before rendering anything
    <ClerkLoaded>
      <AppContent />
    </ClerkLoaded>
  )
}

export default App
