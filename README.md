# Vertebral Neurodiagnostic Associates LLC Website

Professional website for intraoperative neuromonitoring services.

## Quick Start

1. **Add Your Logo**
   - Place your logo file in the root directory
   - Name it `logo.png` (or update the filename in `index.html` line 15)
   - Supported formats: PNG, JPG, SVG
   - Recommended size: At least 200px width, transparent background preferred

2. **Update Contact Information**
   - Open `index.html`
   - Update the contact section (around line 270) with:
     - Your actual phone number
     - Your actual email address
     - Your business address
     - Your business hours

3. **Set Up Stripe Payment (Optional)**
   - Sign up for a Stripe account at https://stripe.com
   - Get your publishable key from the Stripe Dashboard
   - Replace `pk_test_your_publishable_key_here` in `script.js` (line 60) with your actual key
   - **Note:** For production payments, you'll need to set up a backend server to securely handle payment processing

## Files Structure

- `index.html` - Main HTML file
- `styles.css` - All styling
- `script.js` - JavaScript functionality and Stripe integration
- `logo.png` - Your company logo (add this file)

## Payment Setup (Full Implementation)

For a complete payment system, you'll need:

1. **Backend Server** (Node.js, Python, PHP, etc.)
   - Create an endpoint: `/api/create-payment-intent`
   - Use your Stripe secret key to create payment intents
   - Handle payment confirmation

2. **Update script.js**
   - Uncomment the backend API call code
   - Update the fetch URL to your server endpoint

3. **Security**
   - Never expose your Stripe secret key in client-side code
   - Always use HTTPS in production
   - Validate payments on your server

## Customization

- **Colors**: Edit the CSS variables in `styles.css` (lines 7-17)
- **Content**: Update text in `index.html` to match your services
- **Services**: Modify the services section to reflect your actual offerings

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Responsive design for mobile, tablet, and desktop

## Notes

- The contact form currently shows a success message but doesn't send emails. You'll need to set up a backend service (like Formspree, EmailJS, or your own server) for actual email functionality.
- Payment integration requires backend setup for security and full functionality.

