# Square Payment Setup Guide

This guide will walk you through setting up Square payments for your website.

## Step 1: Create a Square Developer Account

1. Go to [https://developer.squareup.com/](https://developer.squareup.com/)
2. Click **"Sign In"** or **"Get Started"**
3. Sign in with your Square account or create a new one
4. If you don't have a Square account, you'll need to create a business account first

## Step 2: Create a Square Application

1. Once logged in, go to the **Square Developer Dashboard**
2. Click **"Applications"** in the left sidebar
3. Click **"New Application"**
4. Fill in the application details:
   - **Application Name**: Your website name (e.g., "Vertebral Neurodiagnostic Associates")
   - **Description**: Brief description of your application
5. Click **"Create Application"**
6. **Note your Application ID** - you'll need this later (starts with `sandbox-` for testing or `sq0idp-` for production)

## Step 3: Get Your Location ID

1. In the Square Developer Dashboard, go to **"Locations"** in the left sidebar
2. You'll see your business locations listed
3. Click on your location to view details
4. **Note your Location ID** - you'll need this later (starts with `LOCATION_ID` or similar)

**Note**: If you don't have a location set up:
- Go to your Square Dashboard (not Developer Dashboard)
- Set up your business location
- Then return to the Developer Dashboard to get the Location ID

## Step 4: Get Your Access Token

1. In the Square Developer Dashboard, go to your application
2. Click on **"Credentials"** or **"Sandbox Settings"** (for testing)
3. For **Sandbox** (testing):
   - Copy your **Sandbox Access Token** (starts with `EAAA...`)
4. For **Production**:
   - You'll need to complete the OAuth flow or use a Personal Access Token
   - For production, you'll typically use OAuth for security

**Important**: 
- Use **Sandbox** credentials for testing
- Use **Production** credentials only when you're ready to accept real payments

## Step 5: Update Your Code

Open `script.js` and replace the following:

1. **Application ID**: Replace `YOUR_APPLICATION_ID` with your Square Application ID
2. **Location ID**: Replace `YOUR_LOCATION_ID` with your Square Location ID

### Example:

```javascript
// Square Configuration
const squareApplicationId = 'sandbox-sq0idb-abc123...'; // Your Application ID
const squareLocationId = 'LOCATION_ID_123'; // Your Location ID
```

## Step 5b: Set Up Backend Payment Processing

**IMPORTANT**: Square requires server-side payment processing for security. You need to create a backend endpoint to process payments.

### Option 1: Using Node.js/Express (Recommended)

Create a file `server.js` or add to your existing server:

```javascript
const express = require('express');
const { Client, Environment } = require('squareup');

const app = express();
app.use(express.json());

// Initialize Square client
const squareClient = new Client({
    accessToken: process.env.SQUARE_ACCESS_TOKEN, // Your access token
    environment: Environment.Sandbox // Use Environment.Production for production
});

app.post('/api/process-payment', async (req, res) => {
    const { sourceId, amountMoney, idempotencyKey, referenceId, note, buyerEmailAddress, billingContact } = req.body;

    try {
        const paymentsApi = squareClient.paymentsApi;
        
        const requestBody = {
            sourceId: sourceId,
            amountMoney: amountMoney,
            idempotencyKey: idempotencyKey,
            referenceId: referenceId,
            note: note,
            buyerEmailAddress: buyerEmailAddress,
            billingContact: billingContact
        };

        const response = await paymentsApi.createPayment(requestBody);
        
        if (response.result.payment) {
            res.json({ 
                success: true, 
                payment: response.result.payment 
            });
        } else {
            res.status(400).json({ 
                success: false, 
                errors: response.result.errors 
            });
        }
    } catch (error) {
        console.error('Payment error:', error);
        res.status(500).json({ 
            success: false, 
            errors: [{ detail: 'Payment processing failed' }] 
        });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
```

**Install Square SDK:**
```bash
npm install squareup
```

**Set environment variable:**
```bash
SQUARE_ACCESS_TOKEN=your_access_token_here
```

### Option 2: Using PHP

```php
<?php
require 'vendor/autoload.php';

use Square\SquareClient;
use Square\Environment;
use Square\Models\Money;
use Square\Models\CreatePaymentRequest;

$accessToken = getenv('SQUARE_ACCESS_TOKEN');
$client = new SquareClient([
    'accessToken' => $accessToken,
    'environment' => Environment::SANDBOX, // Use Environment::PRODUCTION for production
]);

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    
    $paymentsApi = $client->getPaymentsApi();
    
    $money = new Money();
    $money->setAmount($data['amountMoney']['amount']);
    $money->setCurrency($data['amountMoney']['currency']);
    
    $request = new CreatePaymentRequest(
        $data['sourceId'],
        $data['idempotencyKey'],
        $money
    );
    $request->setReferenceId($data['referenceId']);
    $request->setNote($data['note']);
    $request->setBuyerEmailAddress($data['buyerEmailAddress']);
    
    try {
        $response = $paymentsApi->createPayment($request);
        
        if ($response->isSuccess()) {
            echo json_encode(['success' => true, 'payment' => $response->getResult()]);
        } else {
            echo json_encode(['success' => false, 'errors' => $response->getErrors()]);
        }
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode(['success' => false, 'errors' => [['detail' => $e->getMessage()]]]);
    }
}
?>
```

### Option 3: Using Python/Flask

```python
from flask import Flask, request, jsonify
from square.client import Client
import os

app = Flask(__name__)

square_client = Client(
    access_token=os.getenv('SQUARE_ACCESS_TOKEN'),
    environment='sandbox'  # Use 'production' for production
)

@app.route('/api/process-payment', methods=['POST'])
def process_payment():
    data = request.json
    
    try:
        payments_api = square_client.payments
        response = payments_api.create_payment({
            'source_id': data['sourceId'],
            'amount_money': data['amountMoney'],
            'idempotency_key': data['idempotencyKey'],
            'reference_id': data['referenceId'],
            'note': data['note'],
            'buyer_email_address': data['buyerEmailAddress'],
            'billing_contact': data['billingContact']
        })
        
        if response.is_success():
            return jsonify({'success': True, 'payment': response.body})
        else:
            return jsonify({'success': False, 'errors': response.errors}), 400
    except Exception as e:
        return jsonify({'success': False, 'errors': [{'detail': str(e)}]}), 500

if __name__ == '__main__':
    app.run(port=3000)
```

**Install Square SDK:**
```bash
pip install squareup
```

### Security Notes

⚠️ **CRITICAL**: 
- **Never** expose your Access Token in client-side code
- Always use environment variables for sensitive credentials
- Use HTTPS in production
- Validate and sanitize all input data
- Use idempotency keys to prevent duplicate charges

## Step 6: Test Your Payment Integration

### Using Sandbox (Test Mode):

1. Use Square's test card numbers:
   - **Success**: `4111 1111 1111 1111`
   - **Decline**: `4000 0000 0000 0002`
   - **CVV**: Any 3 digits (e.g., `123`)
   - **Expiry**: Any future date (e.g., `12/25`)
   - **ZIP**: Any 5 digits (e.g., `12345`)

2. Fill out the payment form on your website
3. Use the test card number
4. Submit the payment
5. Check the Square Developer Dashboard → **"Transactions"** to see the test payment

## Step 7: Switch to Production

When you're ready to accept real payments:

1. Complete Square's application process (if required)
2. Get your **Production Application ID** (starts with `sq0idp-`)
3. Get your **Production Location ID**
4. Update the code with production credentials
5. Test with a small real transaction first

## Important Security Notes

⚠️ **Never expose your Access Token in client-side code!**

- The Application ID and Location ID are safe to use in client-side code
- The Access Token should **ONLY** be used on your backend server
- For production, use Square's OAuth flow or server-side API calls

## Square Web Payments SDK

The integration uses Square's Web Payments SDK which:
- Handles PCI compliance automatically
- Securely tokenizes card information
- Supports multiple payment methods
- Works on mobile and desktop

## Troubleshooting

### Payment not processing?
- Check the browser console (F12) for error messages
- Verify your Application ID and Location ID are correct
- Make sure you're using the correct environment (sandbox vs production)
- Check that your Square account is active

### "Invalid Application ID" error?
- Double-check your Application ID (no extra spaces)
- Make sure you're using the correct environment credentials
- Verify your application is active in the Square Developer Dashboard

### "Invalid Location ID" error?
- Verify your Location ID is correct
- Make sure the location is active in your Square account
- Check that the location is associated with your application

## Square Fees

Square charges:
- **2.6% + $0.10** per online card transaction
- No monthly fees
- No setup fees

Check [Square's pricing page](https://squareup.com/us/en/pricing) for the latest rates.

## Need Help?

- [Square Developer Documentation](https://developer.squareup.com/docs)
- [Square Web Payments SDK Guide](https://developer.squareup.com/docs/web-payments/overview)
- [Square Support](https://squareup.com/help/us/en)

---

**Next Steps**: After setting up, update `script.js` with your Application ID and Location ID, then test the payment flow!

