import express from "express";
import ViteExpress from "vite-express";
import bodyParser from "body-parser";
import session from "express-session";
import morgan from "morgan";
import path from "path";
import { uploadFileMiddleware } from "./middleware/uploadMiddleware";
import EntryController from "./controllers/entryController";
import config from "./config";

process.env.TZ = "UTC";

const app = express();
const staticDir = path.join(__dirname, "..", "public");
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.disable("view cache");
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.locals.assetsJS = ["/src/client/main.ts", "/@vite/client"];
app.locals.assetsCSS = [];

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
const entryController = new EntryController();

app.get("/entries", entryController.listEntries);
app.get("/entries.json", entryController.listEntriesJson);
app.get("/entries/new", entryController.renderForm);
app.post("/entries", entryController.createEntry);

// Sync database
config.db
  .sync({})
  .then(() => {
    console.log("Database synchronized");
  })
  .catch((error) => {
    console.error("Error synchronizing database:", error);
  });

ViteExpress.listen(app, PORT, () => {
  console.log(`Static Dir: ${staticDir}`);
  console.log(`Server is running on http://localhost:${PORT}`);
});
// // Start server
// const server = app
//   .listen(PORT, () => {
//     console.log(`Static Dir: ${staticDir}`);
//     console.log(`Server is running on http://localhost:${PORT}`);
//   })
//   .on("error", function (error) {
//     console.error("app.listen error", error);
//   });
//
// if (process.env.NODE_ENV !== "production") {
//   ViteExpress.bind(app, server);
// }
