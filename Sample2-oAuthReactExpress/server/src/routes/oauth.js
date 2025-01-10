import express from "express";
import { OAuth2Client } from "google-auth-library";
import fetch from "node-fetch";
import conf from "../conf/conf.js";

const router = express.Router();

async function getUserData(access_token) {
  const response = await fetch(
    `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${access_token}`
  );

  const data = await response.json();
  console.log("User Data:", data);
}

/* GET home page. */
router.get("/", async function (req, res, next) {
  const code = req.query.code;

  console.log("Authorization Code:", code);
  try {
    const redirectURL = `${conf.CLIENT_URL}/oauth`;
    // const redirectURL = `${conf.SERVER_URL}/oauth`;
    const oAuth2Client = new OAuth2Client(
      conf.GOOGLE_CLIENT_ID,
      conf.GOOGLE_CLIENT_SECRET,
      redirectURL
    );
    const r = await oAuth2Client.getToken(code);
    // Set the credentials on the OAuth2 client.
    oAuth2Client.setCredentials(r.tokens);
    console.info("Tokens acquired.");

    const user = oAuth2Client.credentials;
    // console.log("OAuth2 Client Credentials:", user);

    await getUserData(oAuth2Client.credentials.access_token);
  } catch (err) {
    console.error("Error logging in with OAuth2 user:", err);
  }

  res.redirect(303, `${conf.CLIENT_URL}`);
});

export default router;
