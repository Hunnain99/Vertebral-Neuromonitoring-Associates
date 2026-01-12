# EmailJS Setup Guide

This guide will walk you through setting up EmailJS to enable email functionality for your contact and scheduling forms.

## Step 1: Create an EmailJS Account

1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Click **"Sign Up"** and create a free account
3. Verify your email address

## Step 2: Add an Email Service

1. After logging in, go to **"Email Services"** in the dashboard
2. Click **"Add New Service"**
3. Choose your email provider (Gmail, Outlook, etc.)
4. Follow the instructions to connect your email account
5. **Note your Service ID** - you'll need this later (e.g., `service_abc123`)

## Step 3: Create Email Templates

You need to create **2 templates** - one for the contact form and one for the scheduling form.

### Template 1: Contact Form Template

1. Go to **"Email Templates"** in the dashboard
2. Click **"Create New Template"**
3. Use these settings:
   - **Template Name**: Contact Form
   - **Subject**: `{{subject}}`
   - **Content** (HTML):
   ```html
   <h3>New Contact Form Submission</h3>
   <p><strong>From:</strong> {{from_name}} ({{from_email}})</p>
   <p><strong>Phone:</strong> {{phone}}</p>
   <p><strong>Subject:</strong> {{subject}}</p>
   <p><strong>Message:</strong></p>
   <p>{{message}}</p>
   ```
4. Click **"Save"**
5. **Note your Template ID** (e.g., `template_xyz789`)

### Template 2: Scheduling Form Template

1. Click **"Create New Template"** again
2. Use these settings:
   - **Template Name**: Scheduling Form
   - **Subject**: `{{subject}}`
   - **Content** (HTML):
   ```html
   <h3>New Appointment Request</h3>
   <p><strong>Name:</strong> {{from_name}}</p>
   <p><strong>Email:</strong> {{from_email}}</p>
   <p><strong>Phone:</strong> {{phone}}</p>
   <p><strong>Preferred Date:</strong> {{preferred_date}}</p>
   <p><strong>Preferred Time:</strong> {{preferred_time}}</p>
   <p><strong>Service Type:</strong> {{service_type}}</p>
   <p><strong>Procedure Details:</strong></p>
   <p>{{procedure_details}}</p>
   <p><strong>Additional Information:</strong></p>
   <p>{{additional_info}}</p>
   ```
3. Click **"Save"**
4. **Note your Template ID** (e.g., `template_abc456`)

## Step 4: Get Your Public Key

1. Go to **"Account"** → **"General"** in the EmailJS dashboard
2. Find your **"Public Key"** (also called User ID)
3. Copy this key (e.g., `abcdefghijklmnop`)

## Step 5: Update Your Code

Open `script.js` and replace the following placeholders:

1. **Line 9**: Replace `YOUR_PUBLIC_KEY` with your EmailJS Public Key
2. **Line 104**: Replace `YOUR_SERVICE_ID` with your Service ID
3. **Line 105**: Replace `YOUR_TEMPLATE_ID` with your Scheduling Template ID
4. **Line 170**: Replace `YOUR_SERVICE_ID` with your Service ID (same as above)
5. **Line 171**: Replace `YOUR_TEMPLATE_ID` with your Contact Form Template ID

### Example:

```javascript
// Line 9
emailjs.init("abcdefghijklmnop"); // Your Public Key

// Line 104-105 (Scheduling form)
await emailjs.send(
    'service_abc123',      // Your Service ID
    'template_abc456',     // Your Scheduling Template ID
    emailParams
);

// Line 170-171 (Contact form)
await emailjs.send(
    'service_abc123',      // Your Service ID
    'template_xyz789',     // Your Contact Form Template ID
    emailParams
);
```

## Step 6: Test Your Forms

1. Open your website in a browser
2. Fill out the **Contact Form** and submit it
3. Check your email inbox for the message
4. Fill out the **Scheduling Form** and submit it
5. Check your email inbox for the appointment request

## Troubleshooting

### Emails not sending?
- Check the browser console (F12) for error messages
- Verify all IDs and keys are correct (no extra spaces)
- Make sure your email service is connected in EmailJS dashboard
- Check that your templates use the correct variable names (they must match the code)

### Common Errors:
- **"EmailJS not loaded"**: Make sure the EmailJS script is loaded in your HTML
- **"Invalid service ID"**: Double-check your Service ID
- **"Invalid template ID"**: Double-check your Template IDs
- **"Invalid public key"**: Verify your Public Key is correct

## Free Tier Limits

EmailJS free tier includes:
- 200 emails per month
- Basic email templates
- Standard support

For more emails or features, consider upgrading to a paid plan.

## Security Note

Your Public Key is safe to use in client-side code. However, for production use, consider:
- Setting up domain restrictions in EmailJS dashboard
- Using environment variables for sensitive configuration
- Implementing rate limiting on your forms

---

**Need Help?** Visit [EmailJS Documentation](https://www.emailjs.com/docs/) or check the EmailJS dashboard for support options.

