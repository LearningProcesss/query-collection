import { readNasaDataset } from "../data";

export const getNasaCollection = () => {
  return JSON.parse(readNasaDataset());
};
