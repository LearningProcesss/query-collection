import collectionQuery from "../source";
import { getNasaCollection } from "./fixtures/getCollection";

const nasaCollection = getNasaCollection();

describe("Test library", () => {
  test("should return 30 elements using { pha: y } as query [$and behaviour]", () => {
    const andQuerySingleField = { pha: "Y" };
    expect(
      collectionQuery.find(nasaCollection, andQuerySingleField).length
    ).toBe(30);
  });
  test("should return 151 elements using { pha: N, orbit_class: Aten } query [$and behaviour]", () => {
    const andQueryMultipleFields = { pha: "N", orbit_class: "Aten" };
    expect(
      collectionQuery.find(nasaCollection, andQueryMultipleFields).length
    ).toBe(151);
  });
  test("should return 153 elements using $or $or: [{pha: N, orbit_class: Parabolic Comet}] [$or behaviour]", () => {
    const orQueryMultipleFields = {
      $or: [
        {
          pha: "N"
        },
        {
          orbit_class: "Parabolic Comet"
        }
      ]
    };
    expect(
      collectionQuery.find(nasaCollection, orQueryMultipleFields).length
    ).toBe(153);
  });
  test("should $and [$and behaviour]", () => {
    const andQueryMultipleFields = {
      $and: [
        {
          pha: "N"
        },
        {
          orbit_class: "Parabolic Comet"
        }
      ]
    };
    expect(
      collectionQuery.find(nasaCollection, andQueryMultipleFields).length
    ).toBe(0);
  });
});
