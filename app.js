const express = require("express");
const app = express();
const mongoose = require("mongoose");
const db = require("./config/keys").mongoURI;
const path = require('path');
const users = require("./routes/api/users");
const earnings = require("./routes/api/earnings");
const expenses = require('./routes/api/expenses');
const savings = require('./routes/api/savings');
const bodyParser = require("body-parser");
const passport = require('passport');

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('frontend/build'));
    app.get('/', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
    })
}

mongoose
    .connect(db, { useNewUrlParser: true })
    .then(() => console.log("Connected to mongoDB"))
    .catch(err => console.log(err));

app.get("/", (req, res) => {
    res.send("Hello BANANA!");
});
    
app.use(passport.initialize());
require('./config/passport')(passport);

app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(bodyParser.json());


app.use("/api/users", users);
app.use('/api/earnings', earnings);
app.use('/api/expenses', expenses);
app.use('/api/savings', savings);

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});