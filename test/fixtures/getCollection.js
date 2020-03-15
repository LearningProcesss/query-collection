import axios from "axios";
import { readNasaDataset } from "../data";


export const getNasaCollection = () => {
  return JSON.parse(readNasaDataset("nasa"));
};

export const getPeopleCollection = () => {
  return JSON.parse(readNasaDataset("people"));
}

export const getFakerData = async () => {
  const resp = await axios.get("http://localhost:3001/people");
  return resp.data;
}