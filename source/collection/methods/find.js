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
  //console.log("find --> start");
  const result = collection.filter(item => filterCallback(item, query));
  //console.log(`result --> ${result.length}`);
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
        operator: prop,
        isArray: true,
        results: []
      });
      obj[prop].forEach(i =>
        iterate(i, comparisons[comparisons.length - 1].results, item)
      );
    } else {
      comparisons.push({
        name: prop,
        operator: "$eq",
        isArray: false,
        results: singleComparison(
          { name: prop, value: item[prop], type: typeof item[prop] },
          { name: prop, value: obj[prop], type: typeof obj[prop] }
        )
      });
    }
  });

  return comparisons;
}

function singleComparison(itemP, queryP) {
  /*console.log(*/
  //`singleComparison --> itemP: ${JSON.stringify(
  //itemP
  //)} , queryP: ${JSON.stringify(queryP)}`
  /*);*/
  if (itemP.type !== queryP.type) return false;
  return itemP.value === queryP.value ? true : false;
}

export { find };
