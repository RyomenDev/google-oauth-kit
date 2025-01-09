import express from "express";
import passport from "passport";
import conf from "../conf/conf.js";

const router = express.Router();

router.get("/login/success", (req, res) => {
  //   console.log("server-login", req.user);

  if (req.user) {
    res.status(200).json({
      error: false,
      message: "Successfully Logged In",
      user: req.user,
    });
  } else {
    res.status(403).json({ error: true, message: "Not Authorized" });
  }
});

router.get("/login/failed", (req, res) => {
  res.status(401).json({
    error: true,
    message: "Log in failure",
  });
});

router.get("/google", passport.authenticate("google", ["profile", "email"]));

router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: conf.CLIENT_URL,
    failureRedirect: "/login/failed",
  })
);

router.get("/logout", (req, res, next) => {
  //   console.log("server-logout", req.user);
  req.logout((err) => {
    if (err) {
      return next(err); // Pass error to the next middleware for handling
    }
    res.redirect(conf.CLIENT_URL);
  });
});

export default router;
