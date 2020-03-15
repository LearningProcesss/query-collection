import { find } from "../source";
import { getPeopleCollection } from "./fixtures/getCollection";

let fakerData = [];

beforeAll(async () => {
  fakerData = getPeopleCollection();
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
  describe('Evaluation Operators', () => {
    test("should execute regex on string field with case sensitive match, simple query", () => {
      const regexQuerySingleField = {
        surname: /Fi/
      };
      const result = find(fakerData, regexQuerySingleField);
      expect(result[0].surname).toMatch(/Fi/);
    });
    test("should execute regex ignore case match, simple query", () => {
      const regexQuerySingleField = {
        surname: /ce/i
      };
      const result = find(fakerData, regexQuerySingleField);

      expect(result[0].surname).toMatch(/ce/i);
    });
  })
  describe('Logical Operators', () => {
    test("should find elements whit one of the condtion satisfied -> $or array of with simple query", () => {
      const regexOr = {
        $or: [{ surname: /Doug/ }, { nCars: 3 }, { age: 40 }]
      };

      const result = find(fakerData, regexOr);

      expect(result.some(item => item.nCars === 3)).toBe(true);
      expect(result.some(item => item.age === 40)).toBe(true);
      expect(result.some(item => item.surname.match(/Doug/))).toBe(true);
    });
    test("should find elements with specific condition -> $and simple query", () => {
      const andQuerySingleField = { age: 13 };

      const result = find(fakerData, andQuerySingleField);

      expect(result.every(item => item.age === 13)).toBe(true);
    });
    test('should find elements with multiple conditions -> $and simple query', () => {
      const andQueryMultipleFields = {
        nCars: 5,
        email: /est/
      }

      const result = find(fakerData, andQueryMultipleFields);

      expect(result.every(item => item.nCars === 5 && item.email.match(/est/))).toBe(true);
    })
    test('should find elements with multiple or condition -> $or array simple query', () => {
      const orQueryArray = {
        $or: [
          {
            nCars: 3
          },
          {
            age: 34
          },
          {
            name: /L/
          }
        ]
      }

      const result = find(fakerData, orQueryArray);

      expect(result.every(item => item.nCars === 3 || item.age === 34 || item.name.match(/L/))).toBe(true);
    })
    test('should ', () => {
      const andQueryMultipleFields = {
        $and: [
          {
            email: /test/
          },
          {
            age: 5
          }
        ]
      }

      const result = find(fakerData, andQueryMultipleFields);

      expect(result.every(item => item.email.match(/test/) && item.age === 5)).toBe(true);
    })
    test('should complex query', () => {
      const complexQuery = {
        $and: [
          {
            age: {
              $gte: 50
            }
          },
          {
            nCars: {
              $lt: 3
            }
          },
          { name: /ne/i }
        ]
      }

      const result = find(fakerData, complexQuery);
      
      expect(result.length).toBeGreaterThan(0);
    })

  })
});
