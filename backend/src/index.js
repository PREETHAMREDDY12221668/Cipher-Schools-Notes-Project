const express = require("express");
const app = express();
const cors =require('cors');


require("dotenv").config(); // Ensure .env is loaded
require('./db')

app.use(cors());
app.use(express.json());

const UserRouter=require("../src/routers/users.router")
const AuthRouter=require("../src/routers/auth.router")
const NotesRouter=require("../src/routers/notes.router")


app.get("/", (req, res) => {
    res.send("hello from backend server");
});

app.use('/api/users',UserRouter);
app.use('/api/notes',NotesRouter);
app.use('/api/auth',AuthRouter);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`);
});
