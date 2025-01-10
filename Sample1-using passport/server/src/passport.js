import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import conf from "./conf/conf.js";

passport.use(
  new GoogleStrategy(
    {
      clientID: conf.GOOGLE_CLIENT_ID,
      clientSecret: conf.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
      scope: ["profile", "email"],
    },
    (accessToken, refreshToken, profile, callback) => {
      callback(null, profile);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});
