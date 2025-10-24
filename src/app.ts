import express from "express";
import cors from "cors";
import main from "./routes/index";
import cookieParser from "cookie-parser";
import rateLimit from "express-rate-limit";
import helmet from "helmet";

export const app = express();

// Rate limit the requests
// app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 100 }));

// Avoid clickjacking, MIME sniffing and XSS attacks
app.use(helmet());

// 1. First parse the request body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 2. Then handle CORS
app.use(
  cors({
    origin: [
      "http://main.main.local:3000",
      "http://tests.main.local:5173",
      "http://shop.main.local:5174",
      "http://auth.main.local:5175",
      "http://localhost:44275",
      "http://13.126.229.93:5174",
      "http://13.126.229.93",
      "http://community.main.local:3002"
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
    allowedHeaders: ["Content-Type", "X-Auth-Type", "x-auth-type"],
    optionsSuccessStatus: 200,
  })
);
app.use(cookieParser());

// 3. Then register routes
app.use("/api/v1", main);
