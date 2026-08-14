# eLearn — E-Learning Platform

A responsive front-end e-learning platform built as a portfolio project.

## Features
- Modern responsive landing page
- Course catalogue with search and category filters
- Course purchase/checkout demo
- Login UI with password visibility toggle
- Netlify-compatible contact form
- Responsive navigation
- Accessible form labels and image alt text
- Reusable visual system and consistent pages

## Tech Stack
- HTML5
- CSS3
- JavaScript
- Bootstrap Icons
- Google Fonts

## Project Structure
```text
index.html
courses.html
about.html
contact.html
login.html
payment.html
success.html
style.css
app.js
images/
```

## Run locally
Open `index.html` in a browser, or serve the folder with a local static server.

## Deployment
The project is static and can be deployed to Netlify, GitHub Pages, Vercel, or any static hosting service.

## Note
Authentication and payments are intentionally front-end demonstrations. The contact form uses Netlify Forms when deployed on Netlify.

## Backend / Serverless API
This version includes Netlify Functions:
- `/.netlify/functions/contact` — validates and receives contact enquiries.
- `/.netlify/functions/enroll` — validates and receives course enrollment requests.

The functions are intentionally provider-neutral: they log validated requests server-side. For production email/database storage, connect them to a service using Netlify environment variables so credentials never appear in frontend code.

## Deployment
Deploy the project root to Netlify. `netlify.toml` automatically configures the functions directory.
