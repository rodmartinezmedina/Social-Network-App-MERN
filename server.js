const express = require("express");
const connectDB = require("./config/db");

const app = express();

//Connect Database

connectDB();

//Init Middleware
app.use(express.json({ extended: false }));

app.get("/", (req, res) => res.send("API Running"));

//Define Routes
app.use("/api/users", require("./routes/api/usersRoute"));
app.use("/api/profile", require("./routes/api/profileRoute"));
app.use("/api/posts", require("./routes/api/postsRoute"));
app.use("/api/auth", require("./routes/api/authRoute"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
