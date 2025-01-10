import express from "express";
import cors from "cors";
import session from "express-session";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import passport from "passport";
import authRoute from "./routes/auth.js";
import cookieSession from "cookie-session";
import "./passport.js";
import conf from "./conf/conf.js";

const app = express();
app.use(bodyParser.json());
app.use(cookieParser());

app.use(
  session({
    secret: conf.GOOGLE_CLIENT_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, // Set secure: true if using HTTPS
  })
);

// app.use(
//   cookieSession({
//     name: "session",
//     keys: [conf.GOOGLE_CLIENT_SECRET], // Use an array for multiple keys
//     maxAge: 24 * 60 * 60 * 1000, // Max age in milliseconds
//   })
// );

app.use(passport.initialize());
app.use(passport.session());

app.use(
  cors({
    origin: (origin, callback) => {
      const allowedOrigins = [
        conf.CLIENT_URL.replace(/\/$/, ""),
        conf.CORS_ORIGIN1.replace(/\/$/, ""),
        conf.CORS_ORIGIN2.replace(/\/$/, ""),
        conf.CORS_ORIGIN3.replace(/\/$/, ""),
      ];
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error(`Origin ${origin} not allowed by CORS`));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  })
);

app.use(express.json());
app.use(express.static("public"));

import Routes from "./routes/auth.js";
app.use("/auth", Routes);

app.post("/testing", (req, res) => {
  console.log("Testing");
  res.send("Hello testing completed");
});

app.get("/", (req, res) => {
  res.send("Welcome to the Express Server!");
});

export { app };
