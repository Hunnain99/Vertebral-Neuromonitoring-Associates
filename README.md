Vertebral Neurodiagnostic Associates LLC

Intraoperative Neuromonitoring Services Website

This repository contains the source code for the official Vertebral Neurodiagnostic Associates LLC website. The site is a static frontend designed for public information, client contact, and optional payment integration.

Project Overview

Static website built with HTML, CSS, and JavaScript

Deployed using GitHub Pages

Designed for professional medical service presentation

Optional Stripe integration for future payment workflows

File Structure

index.html – Main website markup

styles.css – Global styling and layout

script.js – Frontend logic and optional Stripe hooks

logo.png – Company logo asset

Setup and Customization
Branding

Replace logo.png in the root directory with your company logo

Supported formats: PNG, JPG, SVG

Recommended: transparent background, minimum 200px width

Content Updates

Edit text content directly in index.html

Update contact details, service descriptions, and business information as needed

Styling

Modify color scheme and layout using CSS variables at the top of styles.css

Payments (Optional)

This site includes frontend-only placeholders for Stripe integration.

Important:

No live payments are processed from this repository alone

Secure payment processing requires a backend server

Stripe secret keys must never be exposed in client-side code

Recommended approach:

Use Stripe Checkout or Payment Intents via a secure backend

Connect this frontend to your server through API endpoints

Contact Form

The contact form is UI-only by default

To enable submissions, integrate a backend or third-party service such as:

Formspree

EmailJS

Custom server endpoint

Deployment

Hosted using GitHub Pages

Public repository required on free GitHub plans

Static assets only

Security Notes

Do not commit API keys, secrets, or credentials

Use environment variables for all sensitive values

Enforce HTTPS for any production backend services

Browser Support

Chrome

Firefox

Safari

Edge

Responsive across desktop, tablet, and mobile.
