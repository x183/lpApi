import express from "express";
import router from "./routers/defaultRouter";
import { config } from "dotenv";
config();
const app = express();
const PORT: Number = 3000;

// Handling GET / Request
app.use("/", router);
// Server setup
app.listen(PORT, () => {
  console.log(
    "The application is listening " + "on port http://localhost:" + PORT
  );
});
