import { find } from "../source";
import { getNasaCollection } from "./fixtures/getCollection";

const nasaCollection = getNasaCollection();

describe("Test collection method: find", () => {
  test("should $eq", () => {
    const eqOperator = {
      orbit_class: {
        $eq: "Parabolic Comet"
      }
    };
    const result = find(nasaCollection.slice(1), eqOperator);
  });

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
