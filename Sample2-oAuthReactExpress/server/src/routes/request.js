import express from "express";
import { OAuth2Client } from "google-auth-library";
import conf from "../conf/conf.js";

const router = express.Router();

/* POST request to generate OAuth2 consent URL. */
router.post("/", async function (req, res, next) {
  res.header("Access-Control-Allow-Origin", `${conf.CLIENT_URL}`);
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Referrer-Policy", "no-referrer-when-downgrade");

  //   const redirectURL = `${conf.CLIENT_URL}/oauth`;
  const redirectURL = `${conf.SERVER_URL}/oauth`;
  //   console.log("request");

  const oAuth2Client = new OAuth2Client(
    conf.GOOGLE_CLIENT_ID,
    conf.GOOGLE_CLIENT_SECRET,
    redirectURL
  );

  // Generate the URL for the Google consent dialog.
  const authorizeUrl = oAuth2Client.generateAuthUrl({
    access_type: "offline",
    scope: "https://www.googleapis.com/auth/userinfo.profile openid",
    prompt: "consent",
  });

  res.json({ url: authorizeUrl });
});

export default router;
