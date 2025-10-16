# Project Module : Authentication & User Management

## Overview
This module handles user registration, login, and profile management for the CineNext app.

## Features Implemented
- **Sign Up & Login with Clerk**  
  - Integrated **Clerk authentication** for secure user sign-up and login.  
  - Users can log in via **Google** and manage sessions.  
  - Role-based redirection handled: Customers can access booking features.  

- **Profile & Account Management**  
  - Users can **view and update profile information**.  
  - Maintains login state across pages and refreshes.  

- **Booking Access Control**  
  - Only logged-in users can access booking pages.  
  - Redirects to login page if a user is not authenticated.  

## Key Components
- `main.jsx` – Initializes **ClerkProvider** and routing.  
- `NavBar.jsx` – Shows login/logout and navigation.  
- `App.jsx` – Defines routes and protects pages based on authentication.  
- Integration with **React Router** for page navigation.  

## Notes
- Clear old Clerk sessions when testing:  
  **DevTools → Application → Clear Storage → Clear Site Data**  
- Pages should first load before login popup appears.  
- Implemented proper error handling when phone-based login is not supported.
