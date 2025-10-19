# Databases Enhancement

## Overview

This enhancement focused on securing the **Travlr Getaways API** by adding **JWT authentication**,  
**password hashing**, **role-based access control**, and **rate limiting**.  
The goal was to ensure only authorized users could modify data and to protect the system from misuse.

## Core Enhancements

- Added **JWT-based authentication** for user login and session handling.
- Implemented **bcrypt password hashing** for secure credential storage.
- Created **role-based access** (admin vs. user) using middleware checks.
- Added **rate limiting** to prevent request spamming.
- Applied **Helmet** and **CORS** to protect against common web vulnerabilities.

## Skills Demonstrated

- Authentication and authorization
- Secure API design and middleware integration
- Backend validation and route protection
- Implementation of real-world security practices

## Tools & Technologies

Node.js · Express.js · MongoDB · JWT · Bcrypt · Helmet · Express-rate-limit · Postman
