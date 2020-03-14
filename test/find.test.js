import { find } from "../source";
import { getNasaCollection, getFakerData } from "./fixtures/getCollection";

const nasaCollection = getNasaCollection();
let fakerData = [];

beforeAll(async () => {
  fakerData = await getFakerData();
})

describe("Test collection method: find", () => {
  describe('Comparison Query Operators', () => {
    test("should $eq", () => {
      const eqOperator = {
        age: {
          $eq: 47
        }
      };
      const result = find(fakerData, eqOperator);
      expect(result.length).toBeGreaterThan(0)
      expect(result.every(i => i.age === 47)).toBe(true);
    });
    test("should $gt", () => {
      const gtOperator = {
        nCars: {
          $gt: 2
        }
      };
      const result = find(fakerData, gtOperator);
      expect(result.length).toBeGreaterThan(0)
      expect(result.every(i => i.nCars > 2)).toBe(true);
    });
    test("should $gte", () => {
      const gteOperator = {
        age: {
          $gte: 20
        }
      };
      const result = find(fakerData, gteOperator);
      expect(result.length).toBeGreaterThan(0)
      expect(result.every(i => i.age >= 20)).toBe(true);
    });
    test("should $in string field", () => {
      const inOperator = {
        stringProp: {
          $in: ["super", "deliver"]
        }
      };
      const result = find(fakerData, inOperator);
      expect(result.length).toBeGreaterThan(0)
      expect(result.every(i => (i.stringProp === "super" || i.stringProp === "deliver"))).toBe(true);
    });
    test("should $in array field", () => {
      const inOperator = {
        arrayStringProp: {
          $in: ["test", "deliver"]
        }
      };
      const result = find(fakerData, inOperator);
      expect(result.length).toBeGreaterThan(0)
      expect(result.every(i => (i.arrayStringProp.includes("test") || i.arrayStringProp.includes("deliver")))).toBe(true);
    });
    test("should $lt", () => {
      const ltOperator = {
        nCars: {
          $lt: 2
        }
      };
      const result = find(fakerData, ltOperator);
      expect(result.length).toBeGreaterThan(0)
      expect(result.every(i => i.nCars < 2)).toBe(true);
    });
    test("should $lte", () => {
      const lteOperator = {
        nCars: {
          $lte: 1
        }
      };
      const result = find(fakerData, lteOperator);
      expect(result.length).toBeGreaterThan(0)
      expect(result.every(i => i.nCars <= 1)).toBe(true);
    });
    test("should $ne", () => {
      const neOperator = {
        nCars: {
          $ne: 5
        }
      };
      const result = find(fakerData, neOperator);
      expect(result.length).toBeGreaterThan(0)
      expect(result.every(i => i.nCars !== 5)).toBe(true);
    });
    test("should $nin", () => {
      const ninOperator = {
        nCars: {
          $nin: [1, 2, 3, 4]
        }
      };
      const result = find(fakerData, ninOperator);
      expect(result.length).toBeGreaterThan(0)
      expect(result.every(i => ![1, 2, 3, 4].includes(i.nCars))).toBe(true);
    });
  })



  /*  test("should execute regex on string field with case sensitive match, simple query", () => {*/
  //const regexQuerySingleField = {
  //orbit_class: /te/
  //};
  //const result = find(nasaCollection, regexQuerySingleField);

  //expect(result[0].orbit_class).toMatch(/te/);
  //});
  //test("should execute regex ignore case match, simple query", () => {
  //const regexQuerySingleField = {
  //orbit_class: /co/i
  //};
  //const result = find(nasaCollection, regexQuerySingleField);

  //expect(result[0].orbit_class).toMatch(/co/i);
  //});
  //test("should find elements whit one of the condtion satisfied", () => {
  //const regexOr = {
  //$or: [{ orbit_class: /te/ }, { pha: "Y" }]
  //};
  //const result = find(nasaCollection, regexOr);
  //expect(result[0].pha).toBe("Y");
  //expect(result[0].orbit_class).not.toMatch(/te/);

  //expect(result[5].orbit_class).toMatch(/te/);
  //expect(result[5].pha).not.toBe("Y");
  //});

  //test("should return 30 elements using { pha: y } as [$and behaviour]", () => {
  //const andQuerySingleField = { pha: "Y" };
  //expect(find(nasaCollection, andQuerySingleField).length).toBe(30);
  //});
  //test("should return 151 elements using { pha: N, orbit_class: Aten } [$and behaviour]", () => {
  //const andQueryMultipleFields = { pha: "N", orbit_class: "Aten" };
  //expect(find(nasaCollection, andQueryMultipleFields).length).toBe(151);
  //});
  //test("should return 153 elements using $or $or: [{pha: N, orbit_class: Parabolic Comet}] [$or behaviour]", () => {
  //const orQueryMultipleFields = {
  //$or: [
  //{
  //pha: "N"
  //},
  //{
  //orbit_class: "Parabolic Comet"
  //}
  //]
  //};
  //expect(find(nasaCollection, orQueryMultipleFields).length).toBe(153);
  //});
  //test("should $and [$and behaviour]", () => {
  //const andQueryMultipleFields = {
  //$and: [
  //{
  //pha: "N"
  //},
  //{
  //orbit_class: "Parabolic Comet"
  //}
  //]
  //};
  //expect(find(nasaCollection, andQueryMultipleFields).length).toBe(0);
  /*});*/
});
