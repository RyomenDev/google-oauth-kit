import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import cookieParser from "cookie-parser";
import logger from "morgan";
import createError from "http-errors";

// Import routers
import authRouter from "./routes/oauth.js";
import requestRouter from "./routes/request.js";
import htmlAuthRouter from "./routes/htmlAuth.js";
import htmlFileRouter from "./routes/htmlResponse.js";

const app = express();

// __dirname 
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// CORS options middleware
app.options("*", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:5173");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Headers", [
    "X-Requested-With",
    "content-type",
    "credentials",
  ]);
  res.header("Access-Control-Allow-Methods", "GET,POST");
  res.status(200);
  next();
});

// Set view engine
app.set("view engine", "pug");

// Middleware
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.use("/oauth", authRouter);
app.use("/request", requestRouter);
app.use("/htmlAuth", htmlAuthRouter);
app.use("/htmlResponse", htmlFileRouter);

// Catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// Error handler
app.use((err, req, res, next) => {
  // Set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // Render the error page
  res.status(err.status || 500);
  res.render("error");
});

app.post("/testing", (req, res) => {
  console.log("Testing");
  res.send("Hello testing completed");
});

app.get("/", (req, res) => {
  res.send("Welcome to the Express Server!");
});

export { app };
