---

## Technologies Used
- **Node.js / Express.js** – backend server & REST API  
- **MongoDB / Mongoose** – NoSQL database & ODM  
- **Handlebars (HBS)** – server-side rendered pages  
- **Postman** – API testing & validation  
- **Helmet & CORS** – security headers & safe cross-origin requests  
- **bcrypt.js** – password hashing  
- **jsonwebtoken (JWT)** – authentication tokens  
- **Express-rate-limit** – API rate limiting  
- **HTML, CSS, and JavaScript** – frontend layout & styling  

---


## Enhancement 1 – Software Design and Engineering

**Goal:** improve structure, maintainability, and security headers.

**Files Enhanced**

- `server.js` — added Helmet, CORS, dotenv config, and centralized error handling
- `app_server/views/*.hbs` — converted static HTML to dynamic SSR templates (home, trips, about)
- `public/css/site.css` — updated styling for responsive layout
- Routing refactor to modular controllers (`app_server/controllers/`)

**Summary**
Originally, the app had hard-coded settings and minimal error handling.  
The refactor introduced:

- A cleaner MVC structure
- Security middleware (Helmet, CORS)
- Centralized error logging and response format
- Fully responsive UI using Tailwind utility classes

**Outcome Alignment**

- **CO2** – Professional-quality front/back communication
- **CO4** – Innovative techniques (Helmet, dotenv, modular controllers)

---

## Enhancement 2 – Algorithms and Data Structures

**Goal:** increase API efficiency and data handling capabilities.

**Files Enhanced**

- `app_api/controllers/trips.js` — added filtering, sorting, and pagination
- `apiClient.js` — improved timeout and error management
- `app_api/models/trip.js` — added MongoDB indexes (perPerson, start, resort)
- `app_server/views/trips.hbs` — added filter/sort controls and display metadata

**Summary**
Previously, `/api/trips` returned every record with no filters.  
Now it supports:

- query parameters
- Indexed queries for faster retrieval
- Clean JSON responses with pagination metadata

**Outcome Alignment**

- **CO3** – Applied algorithmic principles for efficient data handling
- **CO4** – Used well-founded tools and techniques to deliver value

---

## Enhancement 3 – Databases and Security

**Goal:** secure database access and protect sensitive operations.

**Files Enhanced**

- `app_api/models/user.js` — new User schema with password hashing and roles
- `app_api/controllers/auth.js` — register/login with JWT tokens
- `app_api/middleware/requireAuth.js` — JWT verification & role-based authorization
- `app_api/routes/index.js` — protected admin routes for POST/PUT/DELETE trips
- `server.js` — added Express rate limiter for auth endpoints

**Summary**
The original app had no authentication or access control.  
Now it includes:

- Secure user registration and login
- Password hashing with bcrypt
- Role-based access (`admin` vs `user`)
- JWT-protected endpoints and rate limit defense

**Outcome Alignment**

- **CO5** – Developed a security mindset that anticipates exploits
- **CO1** – Built collaborative environment with clear API auth flows

---

## Course Outcome Summary

**CO1 – Collaboration & Decision Making**  
_Demonstrated in:_ Security routes & controllers  
_Description:_ Designed clean, role-based API flows that enable multi-user interaction.

---

**CO2 – Professional Communication**  
_Demonstrated in:_ MVC structure & UI design  
_Description:_ Produced organized code and readable front-end layouts.

---

**CO3 – Algorithmic Problem Solving**  
_Demonstrated in:_ Trips controller pagination/filtering  
_Description:_ Implemented optimized data retrieval and sorting algorithms.

---

**CO4 – Innovative Techniques & Tools**  
_Demonstrated in:_ Use of modern libraries (Helmet, JWT, rate-limit)  
_Description:_ Applied current industry practices to enhance functionality and security.

---

**CO5 – Security Mindset**  
_Demonstrated in:_ Auth middleware & hashed passwords  
_Description:_ Strengthened the system against unauthorized access and abuse.

---

## Code Review

An **informal code review video** was recorded during Week 2 (before enhancements).  
It analyzes the original codebase, identifies issues in structure and security, and outlines plans for the enhancements.

▶ [Watch Code Review on YouTube](https://youtu.be/iXdGMKmfZfM)

---

## Reflection

Completing this capstone tied together every major concept from my Computer Science degree.  
Starting from a static MEAN stack application, I transformed Travlr Getaways into a secure, efficient, and scalable system that meets modern development standards.  
These enhancements showcase my ability to analyze code, plan systematic improvements, and execute them using industry-grade tools.

---
