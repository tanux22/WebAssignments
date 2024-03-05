const express = require('express');
const bodyParser = require('body-parser');
const calculatorController = require('./controllers/calculatorController');

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.render('calculator');
});

app.post('/calculate', calculatorController.performCalculation);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
