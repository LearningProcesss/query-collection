import fs from "fs";
import path from "path";

export const readNasaDataset = () => {
  return fs.readFileSync(path.resolve(__dirname, "nasa.json"));
};
