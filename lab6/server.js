const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require('path');

const app = express();
const PORT = 3000;

mongoose.connect("mongodb://0.0.0.0:27017/users", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("Connected to MongoDB"))
.catch((err) => console.error("Failed to connect to MongoDB", err));

const userSchema = new mongoose.Schema({
  username: String,
  password: String
});

const User = mongoose.model('User', userSchema);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'views')));

app.get("/", (req, res)=>{
    res.sendFile(path.join(__dirname, 'views','login.html'));
});

app.get("/signup", (req, res)=>{
    res.sendFile(path.join(__dirname, 'views','signup.html'));
});

app.post("/signup", async (req, res) => {
    const { username, password } = req.body;
    try {
        const newUser = new User({ username, password });
        await newUser.save();
        res.send(`Welcome, ${username}!`);
    } catch (error) {
        res.status(500).send('Error creating user');
    }
});

app.post("/", async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username, password });
        if (user) {
            res.send(`Welcome, ${username}!`);
        } else {
            res.send('Invalid credentials');
        }
    } catch (error) {
        res.status(500).send('Error finding user');
    }
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
