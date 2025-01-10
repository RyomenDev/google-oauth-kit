import express from "express";
import conf from "../conf/conf.js";
import { OAuth2Client } from "google-auth-library";

const router = express.Router();

router.post("/", async function (req, res, next) {
  const credential = req.params.credential;
  console.log("Credential", credential);
  const cookies = req.cookies;
  const token = cookies.g_csrf_token;
  console.log("Cookies", cookies);

  console.log("Token", token);

  const client = new OAuth2Client(conf.GOOGLE_CLIENT_ID);
  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: conf.GOOGLE_CLIENT_ID, // Use the Google Client ID here //! conf.GOOGLE_URL
      // Specify the CLIENT_ID of the app that accesses the backend
      // Or, if multiple clients access the backend:
      //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
    });
    const payload = ticket.getPayload();
    const userid = payload["sub"];
    console.log("payload", payload);
    console.log("userid", userid);
  } catch (error) {
    console.error("Error verifying token:", error);
    return res.status(400).send("Invalid token");
  }

  res.send("Testing 123");
});

export default router;
