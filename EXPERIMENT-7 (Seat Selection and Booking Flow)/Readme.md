# Project Module : Seat Selection & Booking Flow

## Overview
Module 3 handles the **seat selection and booking flow** for a movie ticket booking system. It provides users with a seamless interface to select shows, choose seats, confirm bookings, and make payments.

## Features

1. **Show Selection**
   - Users select a movie and show time.
   - The system ensures that seat selection is linked to the chosen show time.

2. **Seat Map Display**
   - Once a show is selected, the system displays the **seat map**.
   - Seats are color-coded as:
     - **Available** – can be selected.
     - **Locked** – temporarily held by a user during selection.
     - **Booked** – already confirmed by other users.

3. **Seat Selection**
   - Users can select multiple seats according to their preference.
   - Selected seats are **temporarily locked** to prevent conflicts with other users.
   - Real-time updates ensure seat availability is always accurate.

4. **Booking Confirmation**
   - On confirming the selection:
     - The system generates a **unique booking ID**.
     - A **ticket** is generated with all relevant details (movie, date, time, seats, total amount).
   - Users can view and download their ticket.

