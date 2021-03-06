import express from "express";
import "express-async-errors";
import { json } from "body-parser";
import cookieSession from "cookie-session";

import { currentuserRouter } from "./routes/current-user";
import { signinRouter } from "./routes/signin";
import { signupRouter } from "./routes/signup";
import { signoutRouter } from "./routes/signout";
import { errorHandler } from "@viettickets/common";
import { NotFoundError } from "@viettickets/common";

const app = express();
app.set("trust proxy", true); // trust traffic from ingress nginx
app.use(json());
app.use(
  cookieSession({
    signed: false, // no encryption needed because JWT is encrypted
    // secure: process.env.NODE_ENV !== 'test' // only set this in non-test environment
    secure: false, // You may recall that we configured all of our services to only use cookies when the user is on an HTTPS connection.  This will cause auth to fail while we do this initial deploy of our app, since we don't have HTTPS setup right now.
  })
);

app.use(currentuserRouter);
app.use(signinRouter);
app.use(signupRouter);
app.use(signoutRouter);
app.use(errorHandler);

app.all("*", async (req, res) => {
  throw new NotFoundError();
});

export { app };
