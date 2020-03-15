import fs from "fs";
import path from "path";

/**
 * 
 * @param {string} fileNameNoExt 
 */
export const readNasaDataset = (fileNameNoExt) => {
  return fs.readFileSync(path.resolve(__dirname, fileNameNoExt + ".json"));
};
