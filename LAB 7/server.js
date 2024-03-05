const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const User = require('./models/user');


mongoose.connect('mongodb://localhost:27017/testdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


db.on('error',(err)=>{
    console.log(err)
})

db.once('open',()=>{
    console.log("Database connection Established!")
})


const app = express();

app.use(morgan("dev"))
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

const PORT = process.env.PORT || 3000;

app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`)
})







// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.static('public'));

