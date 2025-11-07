# CineNext - Full Stack Movie Booking System

## Project Overview
CineNext is a **full-stack movie ticket booking system** that allows users to browse movies, select shows, book seats, and engage with mini-games. Admins can manage movies, shows, users, and bookings, while analytics and reporting provide insights into sales and user activity.

The system is built using **React** for the frontend and **Express.js / Spring Boot** for the backend. The database can be **MySQL or MongoDB** depending on your choice.  

---

## Features by Module

### 1. Frontend
- Responsive **React-based user interface**
- Movie browsing and filtering
- Show timings display
- Integration with backend APIs for:
  - User authentication
  - Booking management
  - Seat selection
  - Gaming module
- Tailwind CSS for styling

### 2. Backend
- REST API implementation using **Express.js **
- **User management**
  - Registration, login, and profile management
  - JWT-based authentication or Clerk integration
- **Booking management**
  - Create, update, cancel bookings
  - Seat locking to prevent conflicts
- **Admin APIs**
  - Movie, show, and user management
  - Analytics and reporting endpoints
- Database connection to MySQL/MongoDB

### 3. Seat Selection & Booking Flow (Module 3)
- **Show Selection:** Users choose a movie and show time
- **Seat Map Display:** Seats color-coded as:
  - Available → can be selected
  - Locked → temporarily held
  - Booked → already confirmed
- **Seat Selection:** Multiple seats selection with real-time updates
- **Booking Confirmation:** Generates unique booking ID and ticket for download
- **Payment Integration:** Stripe / mock payment API (if implemented)

### 4. Admin Panel (Module 4)
- **Dashboard:** Overview of movies, shows, bookings, and users
- **Movie & Show Management:** Add, edit, delete movies/shows
- **User Management:** View, block/unblock users, monitor activity
- **Booking Management:** View all bookings, filter by date, show, or user
- **Reports & Analytics:** Generate sales, revenue, and booking reports

### 5. Gaming & My Bookings (Module 5)
- **Mini-Games:** Lightweight browser-based games for user engagement
- **My Bookings Page:** View upcoming and past bookings
- **Booking Details:** Movie, showtime, seats, total amount
- **Cancel/Reschedule:** Options if permitted by system
- **Real-Time Updates:** Reflects changes in booking status immediately

---

## Complete Project Folder Structure
