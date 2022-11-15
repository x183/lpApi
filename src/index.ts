import express from "express";
import sqlRouter from "./routers/sqlRouter";
import { config } from "dotenv";
import rawRouter from "./routers/rawRouter";
config();
const app = express();
const PORT: Number = 3000;

// Handling GET / Request
app.use("/", sqlRouter);
app.use("/", rawRouter);
// Server setup
app.listen(PORT, () => {
  console.log(
    "The application is listening " + "on port http://localhost:" + PORT
  );
});
