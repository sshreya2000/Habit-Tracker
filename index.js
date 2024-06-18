// import files
import express from "express";
import path from "path";
import ejsLayouts from "express-ejs-layouts";
import bodyParser from "body-parser";
import session from "express-session";
import habitRouter from "./src/routes/habit.routes.js";
import userRouter from "./src/routes/user.routes.js";
import { connectToMongooseMongoDB } from "./src/config/mongoConfig.js";
import { landingPage } from "./src/controllers/landing.controller.js";

// create server
const app = express();
app.use(express.static("public"));
// to parse req bod to post correctly
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); //to handle form data
// setup view engine settings
app.set("view engine", "ejs");
// path of our views
app.set("views", path.join(path.resolve(), "src", "views"));
app.use(ejsLayouts);
app.use(express.static("src/views"));

// session management to store user
app.use(
  session({
    secret: "SecretKey",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);
// controller classes
app.use("/habits", habitRouter);
app.use("/users", userRouter);
app.use("/", landingPage);

// server port
app.listen(3000, () => {
  console.log("Server is listening on port 3000");
  connectToMongooseMongoDB();
});
