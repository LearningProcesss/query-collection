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
  /*  console.log(*/
  //"---------------------------- filterCallback -------------------------"
  /*);*/
  let ret = iterate(query, [], item);
  //console.log(ret);
  /*console.log(*/
  //"---------------------------------------------------------------------"
  /*);*/

  return ret[0].isArray
    ? ret[0].operator === "$or"
      ? ret[0].results.some(r => r.results === true)
      : ret[0].operator === "$and"
      ? ret[0].results.every(r => r.results === true)
      : null
    : ret[0].results;
}

function iterate(obj, comparisons, item) {
  /*console.log(*/
  //`iterate --> START --> obj: ${JSON.stringify(
  //obj
  //)} , comparison: ${comparisons} , item: ${JSON.stringify(item)}`
  /*);*/
  Object.getOwnPropertyNames(obj).forEach(prop => {
    //console.log(`iterate --> obj: ${JSON.stringify(obj)} --> prop: ${prop}`);
    if (Array.isArray(obj[prop]) && ["$or", "$and"].includes(prop)) {
      //console.log(`iterate --> isArray --> ${JSON.stringify(obj[prop])}`);
      comparisons.push({
        name: prop,
        operator: prop, // $or,$and
        isArray: true,
        results: []
      });
      obj[prop].forEach(arrayProp =>
        iterate(arrayProp, comparisons[comparisons.length - 1].results, item)
      );
    } else {
      comparisons.push({
        name: prop,
        operator: "$eq",
        isArray: false,
        results: singleComparison(
          {
            name: prop,
            value: item[prop],
            type: variableTypeChecker(item[prop])
          },
          {
            name: prop,
            value: obj[prop],
            type: variableTypeChecker(obj[prop])
          }
        )
      });
    }
  });

  return comparisons;
}

function singleComparison(itemP, queryP) {
  //console.log(`singleComparison --> itemP: ${JSON.stringify(itemP)} , queryP: ${JSON.stringify(queryP)}`);
  if (queryP.type === "RegExp" && itemP.type === "string") {
    return queryP.value.test(itemP.value);
  }
  if (itemP.type !== queryP.type) return false;
  return itemP.value === queryP.value ? true : false;
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
