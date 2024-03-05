const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));

app.post('/submit', (req, res) => {
    const { id, name, course, phone, address, designation, habits } = req.body;
    console.log('Received data:', { id, name, course, phone, address, designation, habits });
    res.send('Form submitted successfully');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
