// server.js
const express = require('express');
const cors = require('cors'); // Import the cors package
const bodyParser = require('body-parser');
const twilio = require('twilio');

// Twilio credentials
const accountSid = '';
const authToken = '';
const twilioClient = twilio(accountSid, authToken);
const fromNumber = '';
const app = express();
const port = 3000;

app.use(cors()); // Enable CORS
app.use(bodyParser.json()); // Parse JSON request body

// Endpoint to send SMS
app.post('/send-sms', (req, res) => {
    const { phoneNumber, message } = req.body;

    twilioClient.messages.create({
        body: message,
        from: fromNumber,
        to: phoneNumber
    })
    .then((message) => {
        console.log(`Message sent: ${message.sid}`);
        res.status(200).send('SMS sent successfully');
    })
    .catch((error) => {
        console.error('Error sending SMS:', error);
        res.status(500).send('Failed to send SMS');
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});