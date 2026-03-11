# Office Booking System

A full-stack web application for booking office workspaces.
Users can reserve desks for specific time slots while admins manage workspaces.

---

## Tech Stack

**Frontend**

* React.js
* Axios
* Tailwind CSS

**Backend**

* Spring Boot
* Spring Data JPA
* JWT Authentication

**Database**

* MySQL

---

## Features

* User login with JWT authentication
* Role-based access (Admin / User)
* Workspace booking with date and time slots
* Prevents double booking for the same time slot
* Admin can add new workspaces
* Users can cancel their bookings
* Responsive UI

---

## Project Structure

```
office-booking-system
│
├── Office-booking-system        # Spring Boot backend
│
└── office-booking-frontend      # React frontend
```

---

## How to Run the Project

### 1️⃣ Backend

```
cd Office-booking-system
mvn spring-boot:run
```

Backend runs on:

```
http://localhost:8080
```

---

### 2️⃣ Frontend

```
cd office-booking-frontend
npm install
npm start
```

Frontend runs on:

```
http://localhost:3000
```

---

## API Endpoints

### Auth

```
POST /api/auth/login
```

### Workspaces

```
GET /api/workspaces
POST /api/workspaces
```

### Bookings

```
GET /api/bookings
POST /api/bookings
DELETE /api/bookings/{id}
```

---

## Future Improvements

* Calendar view for bookings
* Workspace availability indicator
* Admin dashboard analytics
* Deployment using Docker / AWS

---

## Author

**Ratnesh Singh**

GitHub:
https://github.com/ratneshsingh09
