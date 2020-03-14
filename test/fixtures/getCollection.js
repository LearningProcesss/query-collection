import axios from "axios";
import { readNasaDataset } from "../data";


export const getNasaCollection = () => {
  // console.log(JSON.parse(readNasaDataset()))
  return JSON.parse(readNasaDataset());
};

export const getFakerData = async () => {
  const resp = await axios.get("http://localhost:3001/people");
  return resp.data;
}