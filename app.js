const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const todoRoutes = require("./routes/todoRoutes");
const { requireAuth } = require("./middlewares/authMiddleware");

require("dotenv").config();

const app = express();

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    exposedHeaders: ["X-CSRF-TOKEN"],
    origin: process.env.ALLOWED_ORIGIN,
    credentials: true,
  })
);

//routes

app.use(authRoutes);
app.use("/todo", requireAuth, todoRoutes);

mongoose.connect(process.env.DB_URL).then(() => {
  console.log("Successfully connected to database");
  app.listen(4000, () => {
    console.log(`Server is listening on port 4000`);
  });
});
