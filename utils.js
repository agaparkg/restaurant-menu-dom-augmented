export const getUniqueNames = (data) => {
  const array = [];

  for (let i = 0; i < data.length; i++) {
    // array.push(data[i].category)
    if (!array.includes(data[i].category)) {
      array.push(data[i].category);
    }
  }

  return array;
};

export const capitalize = (word) => {
  // "all"
  // return "All"
  //   return word.toUpperCase();
  return word.charAt(0).toUpperCase() + word.slice(1);
};

export const getFilteredData = (data, btnName) => {
  const newArr = [];

  for (let item of data) {
    if (item.category === btnName.toLowerCase()) {
      newArr.push(item);
    }
  }

  return newArr;
};
