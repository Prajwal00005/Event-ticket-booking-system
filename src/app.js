import express from "express";
import config from "./config/index.js";
import connectdb from "./database/db.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import eventRoutes from "./routes/eventRoutes.js";
import bookRoutes from "./routes/bookRoutes.js";
import cookieParser from "cookie-parser";
import auth from "./middleware/auth.js";
import connectCloudinary from "./config/cloudinary.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

const PORT = config.port;

app.get("/", (req, res) => {
  res.json({
    status: "server running sucessfully",
    name: config.projectName,
    version: config.version,
    port: PORT,
  });
});

app.use("/auth", authRoutes);
app.use("/users", auth, userRoutes);
app.use("/events", eventRoutes);
app.use("/book", bookRoutes);

connectdb()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`server listening at port 3000`);
    });
  })
  .then(() => {
    connectCloudinary();
  })
  .catch((e) => {
    console.log(e.message);
  });
