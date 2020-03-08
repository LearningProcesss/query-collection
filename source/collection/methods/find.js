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

  return ret[0].isArray
    ? ret[0].operator === "$or"
      ? ret[0].results.some(r => r.results === true)
      : ret[0].operator === "$and"
        ? ret[0].results.every(r => r.results === true)
        : null
    : ret[0].results;
}

function iterate(obj, comparisons, item) {

  // console.log(`iterate --> START --> obj: ${JSON.stringify(obj)} , comparison: ${comparisons}`);

  Object.getOwnPropertyNames(obj).forEach(propName => {

    // console.log(`iterate --> propName: ${propName}`);

    const propertyObject = obj[propName];

    const propertyType = variableTypeChecker(propertyObject);

    // console.log(`property type --> ${propertyType}`);

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
    } else if (propertyType === "object" && containsComparisonOperator(propertyObject)) {

      const comparisonOperator = getComparisonOperator(propertyObject); // ["$eq","Parabolic Comet"]

      // console.log(`getComparisonOperator -> ${JSON.stringify(comparisonOperator)}`);

      const comparison = createComparison(propName, comparisonOperator[0]);

      // console.log(`createComparison -> ${JSON.stringify(comparison)}`);

      comparison.results = validateComparison(comparisonOperator[0], {
        name: propName,
        value: item[propName],
        type: variableTypeChecker(item[propName])
      }, {
        name: propName,
        value: propertyObject,
        type: variableTypeChecker(propertyObject)
      })

      comparisons.push(comparison);
    } else {
      comparisons.push({
        name: propName,
        operator: "$eq",
        isArray: false,
        results: validateComparison("$eq",
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

    // if (Array.isArray(obj[propName]) && ["$or", "$and"].includes(propName)) {
    //   comparisons.push({
    //     name: propName,
    //     operator: propName, // $or,$and
    //     isArray: true,
    //     results: []
    //   });
    //   obj[propName].forEach(arrayProp =>
    //     iterate(arrayProp, comparisons[comparisons.length - 1].results, item)
    //   );
    // } else {
    //   comparisons.push({
    //     name: propName,
    //     operator: "$eq",
    //     isArray: false,
    //     results: validateComparison(
    //       "$eq",
    //       {
    //         name: propName,
    //         value: item[propName],
    //         type: variableTypeChecker(item[propName])
    //       },
    //       {
    //         name: propName,
    //         value: obj[propName],
    //         type: variableTypeChecker(obj[propName])
    //       }
    //     )
    //   });
    // }
  });

  return comparisons;
}

/**
 * 
 * @param {Object} object 
 */
function containsComparisonOperator(object) {
  return Object.getOwnPropertyNames(object).some(a1 => ["$eq", "$gt", "$gte", "$in", "$lt", "$lte", "$ne", "$nin"].includes(a1));
}

/**
 * 
 * @param {Object} object 
 * 
 * @returns ["key name", "key value"]
 */
function getComparisonOperator(object) {
  return Object.entries(object)[0];
}

function createComparison(propName, operator, isArray = false) {
  return {
    name: propName,
    operator: operator,
    isArray: isArray,
    results: {}
  }
}

function validateComparison(operator, itemP, queryP) {

  const comparisonOp = ["$eq", "$gt", "$gte", "$in", "$lt", "$lte", "$ne", "$nin"];

  const evaluationOp = ["$regex"];

  // console.log(`validateComparison --> itemP: ${JSON.stringify(itemP)} , queryP: ${JSON.stringify(queryP)}`);

  if (queryP.type === "RegExp" && itemP.type === "string") {
    return queryP.value.test(itemP.value);
  } 
  else if (itemP.type !== queryP.type) {
    return false;
  } else if (["$gt", "$gte", "$lt", "$lte"].includes(operator) && (itemP.type !== "Number" || queryP.item !== "Number")) {
    return false;
  }


  // return itemP.value === queryP.value ? true : false;
  return compareComparisonOperator(operator, itemP.value, queryP.value)
}


/**
 * 
 * @param {string} operator comparison operator
 * @param {any} itemValue value of the property of the item inside the array.
 * @param {any} queryValue value of the property of the query.
 * 
 * @returns true or false
 * 
 * @example compareComparisonOperator("$eq", "Parabolic Curve", "Parabolic Non Curve") return false
 */
function compareComparisonOperator(operator, itemValue, queryValue) {
  if (operator === "$eq") {
    return itemValue === queryValue
  }
}

function compareEvaluationOperator(operator, itemValue, queryValue) {
  if(operator === "$regex") {
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
