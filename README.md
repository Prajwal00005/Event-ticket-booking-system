# Event Ticket Booking System

A **full-featured event ticket booking platform** built with **Node.js**, **Express**, **Sequelize ORM**, and **MySQL**. This system supports multiple user roles, event management, secure ticket booking, payment integration, and PDF ticket generation.

---

## Features

- **Multi-Role Authentication**
  - Admin, Organizer, and User dashboards
  - Registration, login, create organizer as merchant
  - Forgot and reset password functionality with email services

- **Event Management**
  - Organizers can create, update, and delete events
  - Event details: title, description, date, time, location, capacity, registration deadline
  - Upload event images in cloudinary

- **Ticket Booking**
  - Users can book single or multiple tickets
  - Unique ticket IDs for each booking
  - Booking status: pending, booked, canceled
  - Confirm payment before finalizing booking

- **PDF Ticket Generation**
  - Download or print tickets after successful payment
  - Include event details, user info, and QR code

- **Admin & Organizer Dashboards**
  - Admin: manage users, events, and view all bookings
  - Organizer: manage own events and see all bookings for their events

- **Filtering & Search**
  - Filter events by date, category, location, or organizer
  - Search bookings by ticket ID, event, or user

- **Flexible & Extensible**
  - Modular controller-service-route architecture
  - Easily add new APIs and features (seat selection, promo codes, loyalty points)

---

## Technologies Used

- Node.js & Express.js
- MySQL & Sequelize ORM
- JWT for authentication
- resend for email services
- Payment gateway integration (Khalti)
- PDF generation for tickets
