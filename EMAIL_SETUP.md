# Email Setup Instructions

This website uses EmailJS to send emails from the contact and scheduling forms to **asattar@vndallac.com**.

## Setup Steps:

### 1. Create EmailJS Account
1. Go to https://www.emailjs.com/
2. Sign up for a free account (allows 200 emails/month)
3. Verify your email address

### 2. Add Email Service
1. In EmailJS dashboard, go to **Email Services**
2. Click **Add New Service**
3. Choose your email provider (Gmail, Outlook, etc.)
4. Follow the setup instructions
5. **Copy your Service ID** (you'll need this)

### 3. Create Email Templates

#### Template 1: Scheduling Form
1. Go to **Email Templates** in EmailJS dashboard
2. Click **Create New Template**
3. Use this template:

**Template Name:** Scheduling Request

**Subject:** New Appointment Request - {{subject}}

**Content:**
```
New Appointment Request

Name: {{from_name}}
Email: {{from_email}}
Phone: {{phone}}

Preferred Date: {{preferred_date}}
Preferred Time: {{preferred_time}}
Service Type: {{service_type}}

Procedure/Surgery Details:
{{procedure_details}}

Additional Information:
{{additional_info}}
```

4. **Copy the Template ID** (you'll need this)

#### Template 2: Contact Form
1. Create another template
2. Use this template:

**Template Name:** Contact Form Message

**Subject:** {{subject}}

**Content:**
```
New Contact Form Message

Name: {{from_name}}
Email: {{from_email}}
Phone: {{phone}}

Subject: {{subject}}

Message:
{{message}}
```

3. **Copy the Template ID** (you'll need this)

### 4. Get Your Public Key
1. Go to **Account** → **General** in EmailJS dashboard
2. Find your **Public Key**
3. Copy it

### 5. Update the Code

Open `script.js` and replace the following:

1. **Line ~3:** Replace `YOUR_PUBLIC_KEY` with your EmailJS Public Key
2. **Scheduling form (around line 70):** 
   - Replace `YOUR_SERVICE_ID` with your Service ID
   - Replace `YOUR_TEMPLATE_ID` with your Scheduling Template ID
3. **Contact form (around line 120):**
   - Replace `YOUR_SERVICE_ID` with your Service ID  
   - Replace `YOUR_TEMPLATE_ID` with your Contact Form Template ID

### Example:
```javascript
emailjs.init("abc123xyz"); // Your public key

// In scheduling form:
await emailjs.send(
    'service_abc123',  // Your service ID
    'template_xyz789',  // Your scheduling template ID
    emailParams
);

// In contact form:
await emailjs.send(
    'service_abc123',  // Your service ID
    'template_def456', // Your contact template ID
    emailParams
);
```

## Testing

1. Fill out the scheduling form and submit
2. Check your email at **asattar@vndallac.com**
3. Fill out the contact form and submit
4. Verify both emails are received

## Notes

- The recipient email (asattar@vndallac.com) is already configured in the code
- Free EmailJS plan allows 200 emails per month
- For higher volume, consider upgrading to a paid plan
- All form submissions will be sent to the configured email address

