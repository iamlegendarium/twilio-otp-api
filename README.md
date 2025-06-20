## Twilio OTP Auth API

This is a simple Node.js API that uses Twilio (https://www.twilio.com/) to send and verify OTPs (One-Time Passwords) over SMS. It's great for adding secure phone verification to your app.

---

## Screenshot

Here’s what a sample request/response looks like:

![Send-OTP](./ss.jpg)
![Verify-OTP](./vv.jpg)


---

## Features

- Send OTP to any phone number
- Verify OTP entered by the user
- Built with Express.js and Twilio's Verify API

---

## Requirements

- Node.js and npm
- A Twilio account (https://www.twilio.com/)
- A Verify Service SID from Twilio
- Your Twilio Account SID and Auth Token

---

## Setup

1. **Clone the project**

```bash
git clone https://github.com/iamlegendarium/twilio-otp-api.git
cd twilio-otp-api
```
2. **Install dependencies**

```bash
npm install
```

3. **Configure environment**
    **Create a .env file and add your credentials:**

```bash
PORT=3000
TWILIO_ACCOUNT_SID=your_account_sid
TWILIO_AUTH_TOKEN=your_auth_token
TWILIO_VERIFY_SERVICE_SID=your_verify_service_sid
```

4. **Start the server**

```bash
node index.js
```

**Endpoints**
1. **POST /send-otp**
**Sends an OTP to the given phone number.**

```bash
Body:
{
  "phoneNumber": "+234XXXXXXXXXX"
}
```
2. **POST /verify-otp**
**Verifies the code sent to the phone number.**

```bash
Body:
{
  "phoneNumber": "+234XXXXXXXXXX",
  "code": "123456"
}
```

**Testing**
You can use tools like Thunder Client or Postman to test the API.