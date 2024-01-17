const getUniqueNamesOfObjectArray = (arrayOfObjects, key) => {
  // Use map to extract the 'name' property from each object
  const names = arrayOfObjects.map((obj: any) => obj[key]);

  // Use filter to keep only unique names
  const uniqueNames = names.filter((name, index, array) => array.indexOf(name) === index);

  return uniqueNames;
}

const utils = {
  getUniqueNamesOfObjectArray
}

export default utils;