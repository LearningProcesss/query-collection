/**
 * Search inside the provided collection using the query object.
 * @param {array} - collection - array where to search.
 * @param {object} - query - query object.
 * @return { array } array filtered.
 *
 * @example find([ { name: "a", surname: "aa" }, { name: "b", surname: "bb" } ], { name: 'a' })
 */
function find(collection, query) {

  if (!query) return collection;

  if (!collection || collection.length === 0) return collection;

  const result = collection.filter(item => filterCallback(item, query));

  return result;
}

function filterCallback(item, query) {

  let ret = iterate(query, [], item);

  if (ret[0].isArray) {
    if (ret[0].operator === "$or") {
      return ret[0].results.some(r => r.results === true)
    }
    else if (ret[0].operator === "$and") {
      return ret[0].results.every(r => r.results === true)
    }
  } else {
    return ret[0].results
  }
}

function iterate(obj, comparisons, item) {

  Object.getOwnPropertyNames(obj).forEach(propName => {

    const propertyObject = obj[propName];

    const propertyType = variableTypeChecker(propertyObject);

    if (propertyType === "Array" && ["$or", "$and"].includes(propName)) {

      comparisons.push({
        name: propName,
        operator: propName, // $or,$and
        isArray: true,
        results: []
      });

      propertyObject.forEach(arrayProp =>
        iterate(arrayProp, comparisons[comparisons.length - 1].results, item)
      );
    } else if (propertyType === "object" && containsCQO(propertyObject)) {

      const comparisonOperator = getCQO(propertyObject); // ["$eq","Parabolic Comet"]

      const comparison = createComparison(propName, comparisonOperator[0]);

      comparison.results = execComparison(comparisonOperator[0], {
        name: propName,
        value: item[propName],
        type: variableTypeChecker(item[propName])
      }, {
        name: propName,
        value: comparisonOperator[1],
        type: variableTypeChecker(comparisonOperator[1])
      })

      comparisons.push(comparison);
    } else if (propertyType === "RegExp") {
      const comparison = createComparison(propName, "$regex");

      comparison.results = execComparison("$regex", {
        name: propName,
        value: item[propName],
        type: variableTypeChecker(item[propName])
      }, {
        name: propName,
        value: propertyObject,
        type: propertyType
      });

      comparisons.push(comparison);
    } else {
      comparisons.push({
        name: propName,
        operator: "$eq",
        isArray: false,
        results: execComparison("$eq",
          {
            name: propName,
            value: item[propName],
            type: variableTypeChecker(item[propName])
          },
          {
            name: propName,
            value: propertyObject,
            type: variableTypeChecker(propertyObject)
          }
        )
      });
    }
  });

  return comparisons;
}

/**
 * Check if the object contains one of the Comparison Query Operator.
 * 
 * @param {Object} object 
 * 
 * @returns {boolean} Returns exists check over one of the Comparison Query Operator and the object property.
 */
function containsCQO(object) {
  return Object.getOwnPropertyNames(object).some(a1 => ["$eq", "$gt", "$gte", "$in", "$lt", "$lte", "$ne", "$nin"].includes(a1));
}

/**
 * Get Comparison Query Operator from object.
 * 
 * @param {Object} object 
 * 
 * @returns {["key name", "key value"]} Returns a KeyValuePair that contains the Comparison Query Operator.
 */
function getCQO(object) {
  return Object.entries(object)[0];
}

/**
 * 
 * @param {string} propName 
 * @param {string} operator 
 * @param {boolean} isArray
 * @returns Comparison object.
 */
function createComparison(propName, operator, isArray = false) {
  return {
    name: propName,
    operator: operator,
    isArray: isArray,
    results: {}
  }
}

/**
 * Execute a comparison between array item and query.
 * @param {string} operator 
 * @param {Object} itemP 
 * @param {Object} queryP 
 * 
 * @returns {boolean} Returns a check between the item property and the query property.
 */
function execComparison(operator, itemP, queryP) {
  const comparisonOp = ["$eq", "$gt", "$gte", "$in", "$lt", "$lte", "$ne", "$nin"];

  const evaluationOp = ["$regex"];

  if (itemP.type !== queryP.type && !["$nin", "$in"].includes(operator) && operator !== "$regex") {
    return false;
  } else if (["$gt", "$gte", "$lt", "$lte"].includes(operator) && (itemP.type !== "number" || queryP.type !== "number")) {
    return false;
  }

  if (comparisonOp.includes(operator)) {
    return compareCQO(operator, itemP.value, queryP.value)
  } else if (evaluationOp.includes((operator))) {
    return queryP.value.test(itemP.value);
  }
  return false;
}

/**
 * 
 * @param {Object} operatorObject 
 * 
 * @example validateCQO(["$in", ["test", "test2", "test3"]])
 */
function validateCQO(operatorObject) {

}

/**
 * 
 * @param {string} operator comparison operator
 * @param {any} itemValue value of the property of the item inside the array.
 * @param {any} queryValue value of the property of the query.
 * 
 * @returns true or false
 * 
 * @example compareCQO("$eq", "Parabolic Curve", "Parabolic Non Curve") return false
 */
function compareCQO(operator, itemValue, queryValue) {
  // console.log("compareCQO -> operator, itemValue, queryValue", operator, itemValue, queryValue)
  if (operator === "$eq") {
    return itemValue === queryValue
  } else if (operator === "$gt") {
    return itemValue > queryValue
  } else if (operator === "$gte") {
    return itemValue >= queryValue
  } else if (operator === "$in") {
    if (typeof itemValue === "string" || typeof itemValue === "number") {
      return queryValue.includes(itemValue)
    } else if (Array.isArray(itemValue)) {
      return queryValue.some(q => itemValue.indexOf(q) !== -1)
    }    
    return false
  } else if (operator == "$lt") {
    return itemValue < queryValue
  } else if (operator == "$lte") {
    return itemValue <= queryValue
  } else if (operator == "$ne") {
    return itemValue !== queryValue
  } else if (operator == "$nin") {
    if (typeof itemValue === "string" || typeof itemValue === "number") {
      return !queryValue.includes(itemValue)
    } else if (Array.isArray(itemValue)) {
      return !queryValue.some(q => itemValue.indexOf(q) !== -1)
    }
    return false
  }
}

function compareEvaluationOperator(operator, itemValue, queryValue) {
  if (operator === "$regex") {
    return queryValue.test(itemValue);
  }
}

function variableTypeChecker(obj) {
  switch (typeof obj) {
    case "object":
      if (obj instanceof Array) return "Array";
      if (obj instanceof Date) return "Date";
      if (obj instanceof RegExp) return "RegExp";
      if (obj instanceof String) return "String";
      if (obj instanceof Number) return "Number";

      return "object";
    default:
      return typeof obj;
  }
}

export { find };
