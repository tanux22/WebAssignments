const calculatorModel = require('../models/calculatorModel');

function performCalculation(req, res) {
    const num1 = parseFloat(req.body.num1);
    const num2 = parseFloat(req.body.num2);
    const operator = req.body.operator;
    const result = calculatorModel.calculate(num1, operator, num2);
    res.render('result', { result });
}

module.exports = {
    performCalculation
};
