import axios from "axios";
import { TZones } from "../model/timeList.model";

const timezonedb = axios.create({
  baseURL: process.env.REACT_APP_API_DOMAIN,
});

export const getList = async (): Promise<TZones[]> => {
  if (process.env.REACT_APP_API_DOMAIN === undefined || process.env.REACT_APP_API_PATH === undefined || process.env.REACT_APP_API_KEY === undefined) {
    throw new Error("could not access the environment variables.");
  }
  const response = await timezonedb.get(process.env.REACT_APP_API_PATH, {
    params: {
      key: process.env.REACT_APP_API_KEY,
      format: "json",
    },
  });

  if (response["data"]["status"] !== "OK") {
    throw new Error(response["data"]["message"]);
  }

  return response["data"]["zones"];
};
