const express = require("express")
const app = express();
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const cors = require("cors")

require("dotenv").config();

const JWT_SECRET = process.env.JWT_SECRET;

app.use(express.json());
app.use(cors());

const users = [];

app.post('/signup', async (req, res) => {
    const {username, firstName, lastName, password} = req.body;
    if(!username || !firstName || !lastName || !password) {
        return res.status(400).json({error: "All fields are required"});
    }

    const user = users.find((user) => username === user.username);

    if(user){
        return res.status(400).json({error: "User already exists"});
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    users.push({
        username,
        firstName,
        lastName,
        password: hashedPassword
    });

    // Create a token with user data as the payload
    const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
});

app.post('/signin', async (req, res) => {
    const {username, password} = req.body;
    if(!username || !password) {
        return res.status(400).json({error: "All fields are required"});
    }

    const user = users.find((user) => username === user.username);

    if(!user) {
        return res.status(400).json({error: "Invalid credentials"});
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if(!isPasswordValid) {
        return res.status(400).json({error: "Invalid credentials"});
    }

    // Create a token with user data as the payload
    const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: '1h' });
    
    res.json({
        msg: "User successfully signed in",
        token
    });
});

app.get('/bulk', (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];
    if(!token) {
        return res.status(401).json({error: "Unauthorized"});
    }

    try {
        jwt.verify(token, JWT_SECRET);
        res.json({
            users: users.map((user) => ({
                username: user.username,
                firstName: user.firstName,
                lastName: user.lastName,
                password: user.password
            }))
        });
    } catch (error) {
        return res.status(401).json({ error: "Unauthorized" });
    }
});

app.listen(3000, () => {
    console.log("app listening on port 3000")
});
