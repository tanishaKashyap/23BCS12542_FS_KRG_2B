#Project Module : Movies & Show Management

## Overview
This module manages the display of movies, their details, and showtime information in the QuickShow app.

## Features Implemented
- **Movies Listing**
  - Displays all available movies with posters and basic info.
  - Users can browse movies using a responsive grid layout.
  - Implemented **"Show More"** button to navigate to all movies (styled in red like "Explore Movie").

- **Movie Details Page**
  - Detailed view of a selected movie including:
    - Poster image
    - Title, language, rating, overview, runtime, genre, release year
    - Favorite button to add/remove movies from favorites
    - Watch Trailer button (grey icon like YouTube)
    - Buy Tickets button (red) linking to date selection section
  - Dynamic movie details are fetched from **dummyShowsData**.

- **Cast Section**
  - Displays top 12 cast members with profile pictures.
  - Scrollable horizontally on small screens; no scroll on large screens.
  
- **You May Also Like**
  - Shows recommended movies dynamically from **dummyShowsData**.
  - Responsive card layout for recommended movies.

- **Navigation**
  - Users can navigate to different pages (Home, Movies, Favorites, My Bookings) via **NavBar**.

## Key Components
- `Movies.jsx` – Shows all movies in a grid.
- `MovieDetails.jsx` – Shows detailed info, buttons, and cast.
- `MovieCard.jsx` – Individual movie card component for listing and recommendations.
- `NavBar.jsx` – Navigation between pages.
- `DateSelect.jsx` – Anchored from Buy Tickets button, but **seat selection handled in Module 3**.

## Notes
- Buttons are styled consistently:
  - Watch Trailer → Grey
  - Buy Tickets → Red
  - Add to Favorites → Grey
- Loading state implemented with **Loading.jsx** for smooth transitions.
- Routing handled via **React Router v6**.
