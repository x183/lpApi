import express, { Router } from "express";
import LP from "../interfaces/LP";
import { fetchLPInfo } from "../services/fetchLPInfo";

const apiURL =
  "https://student.portal.chalmers.se/sv/chalmersstudier/Sidor/Lasarstider.aspx";

const rawRouter = Router();

rawRouter.get("/raw", async (req: express.Request, res: express.Response) => {
  const LPs = await fetchLPInfo(apiURL);
  res.send(LPs);
});

export default rawRouter;
