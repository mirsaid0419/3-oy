import express from "express";
import cors from "cors";

const app = express();

// Middleware
app.use(
  cors({
    origin: "https://three-oy-you-tube-front.onrender.com",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// Your other middleware and routes go here

export default app;
