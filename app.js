const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const todoRoutes = require("./routes/todoRoutes");
const { requireAuth } = require("./middlewares/authMiddleware");

const app = express();

const dbUrl =
  "mongodb+srv://netninja:netninja123@cluster0.m56uy.mongodb.net/todo-app?retryWrites=true&w=majority";

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    exposedHeaders: ["X-CSRF-TOKEN"],
    origin: "http://localhost:3000",
    credentials: true,
  })
);

//routes

app.use(authRoutes);
app.use("/todo", requireAuth, todoRoutes);

mongoose.connect(dbUrl).then(() => {
  console.log("Successfully connected to database");
  app.listen(4000, () => {
    console.log(`Server is listening on port 4000`);
  });
});
