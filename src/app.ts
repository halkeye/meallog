import express from "express";
import bodyParser from "body-parser";
import session from "express-session";
import morgan from "morgan";
import path from "path";
import { uploadFileMiddleware } from "./middleware/uploadMiddleware";
import indexRoutes from "./routes/index";
import config from "./config";

const app = express();
const staticDir = path.join(__dirname, "..", "public");
const PORT = process.env.PORT || 3000;

app.disable("view cache");
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Middleware
app.use(morgan("combined"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(
  session({
    secret: config.sessionKey,
    resave: false,
    saveUninitialized: true,
  }),
);
app.use(express.static(staticDir));
app.use(uploadFileMiddleware);

// Routes
app.use("/", indexRoutes);

// Sync database
config.db
  .sync({})
  .then(() => {
    console.log("Database synchronized");
  })
  .catch((error) => {
    console.error("Error synchronizing database:", error);
  });

// Start server
app
  .listen(PORT, () => {
    console.log(`Static Dir: ${staticDir}`);
    console.log(`Server is running on http://localhost:${PORT}`);
  })
  .on("error", function (error) {
    console.error("app.listen error", error);
  });
