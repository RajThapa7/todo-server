const express = require("express");
const dotenv = require("dotenv").config().parsed;
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const todoRoutes = require("./routes/todoRoutes");
const { requireAuth } = require("./middlewares/authMiddleware");

const app = express();

const dbUrl = dotenv.DB_URL;

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    exposedHeaders: ["X-CSRF-TOKEN"],
    origin: dotenv.ALLOWED_ORIGIN,
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
