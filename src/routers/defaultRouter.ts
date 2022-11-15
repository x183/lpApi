import express, { Router } from "express";
import LP from "../interfaces/LP";
import { fetchLPInfo } from "../services/fetchLPInfo";

const apiURL =
  "https://student.portal.chalmers.se/sv/chalmersstudier/Sidor/Lasarstider.aspx";

const router = Router();

router.get("/", async (req: express.Request, res: express.Response) => {
  const LPs = await fetchLPInfo(apiURL);
  const psqlString = convertToSQL(LPs);
  res.send(formatOutPut(psqlString));
});

const convertToSQL = (LPs: LP[]) => {
  const sqlStrings: string[] = [];
  const year = new Date(LPs[0].startDate).getFullYear();
  LPs.forEach((LP) => {
    sqlStrings.push(
      `INSERT INTO lp (year, period, start_date, end_date) VALUES (${year}, ${LP.period}, ${LP.startDate}, ${LP.endDate});`
    );
  });
  return sqlStrings;
};

const formatOutPut = (data: String[]) => {
  return data.join("<br/>");
};

export default router;
