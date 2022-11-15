import axios from "axios";
import { load } from "cheerio";
import LP from "../interfaces/LP";

const regEx = /^Läsperiod [0-9]$/;

const fetchRawData = async (url: string) => {
  const data = await axios(url);
  return data.data;
};

const format = (data: any) => {
  const $ = load(data);
  const foundPeriods: LP[] = [];
  const rows = $("tr");
  rows.each((parentIndex, parentElem) => {
    const tds = $(parentElem).find("td");
    if (regEx.test(tds.first().text().trim())) {
      const period = parseInt(
        tds.first().text().trim().split(" ").filter(Boolean)[1]
      );

      const startDate = tds.eq(2).text().trim();
      const endDate = tds.eq(4).text().trim();
      foundPeriods.push({ period, startDate, endDate });
    }
  });

  return foundPeriods;
};

export const fetchLPInfo = async (url: string) => {
  const data = await fetchRawData(url);
  const returnData = format(data);
  return returnData;
  //console.log(data);
};
