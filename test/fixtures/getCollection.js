import { readNasaDataset } from "../data";

export const getNasaCollection = () => {
  console.log(JSON.parse(readNasaDataset()))
  return JSON.parse(readNasaDataset());
};
