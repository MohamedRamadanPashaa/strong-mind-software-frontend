export const newDivArrDiffLength = (arr, groupeArr, sum, currentPosition) => {
  const firstGroupSlice = arr.filter(
    (item, index) => index >= currentPosition && index < currentPosition + sum
  );

  let newArray = [];
  for (let i = 0; i < groupeArr.length; i++) {
    const slice = firstGroupSlice.splice(0, groupeArr[i] * 1);
    newArray.push(slice);
  }

  return newArray;
};

export const getGroupingForNaturalAndReverse = (
  arr,
  sum,
  currentPosition,
  cardsFromLeftToRight
) => {
  let newArray = [];
  let newCurrentPosition;
  if (cardsFromLeftToRight) {
    newCurrentPosition = currentPosition;
  } else {
    newCurrentPosition = 52 - currentPosition - sum;
  }

  newArray = arr.filter(
    (item, index) =>
      index >= newCurrentPosition && index < newCurrentPosition + sum
  );

  return [newArray];
};

export const divArrayIntoSmallArrayWithEqualLength = (
  arr,
  numberBerRow,
  rowInPage,
  page
) => {
  // get arr of element in page
  const numInPageSlice = arr.filter(
    (num, index) =>
      index >= (page - 1) * numberBerRow * rowInPage &&
      index < page * numberBerRow * rowInPage
  );

  // divide the page array into small arr of 40 element
  let newArray = [];
  for (let i = 0; i < rowInPage; i++) {
    const slice = numInPageSlice.filter(
      (el, index) => index >= i * numberBerRow && index < (i + 1) * numberBerRow
    );

    newArray.push(slice);
  }

  // the divided array in page
  return newArray.filter((arr) => arr.length !== 0);
};

export const divideArrWithEqualLength = (arr, smallArrayLength) => {
  let newArr = [];
  const smallArrCount = Math.ceil(arr.length / smallArrayLength);

  for (let i = 0; i < smallArrCount; i++) {
    const slice = arr.filter(
      (el, index) =>
        index >= i * smallArrayLength && index < (i + 1) * smallArrayLength
    );

    newArr.push(slice);
  }

  return newArr;
};

export const getPageContent = (arr, page, rowInPage) => {
  const pageContent = arr.filter(
    (row, index) => index >= (page - 1) * rowInPage && index < page * rowInPage
  );

  return pageContent;
};

export const removeFinalElement = (arr) => {
  let newArr = [];
  const length = arr.length;

  for (let j = 0; j < length; j++) {
    let smallArr = [...arr[j]];
    smallArr.pop();

    newArr.push(smallArr);
  }

  return newArr;
};

export const getOneBigArray = (arr) => {
  let newArr = [];
  const length = arr.length;

  for (let j = 0; j < length; j++) {
    let smallArr = [...arr[j]];

    newArr.push(...smallArr);
  }

  return newArr;
};

export const sortSmallArraysInsideBigArray = (arr) => {
  let newArr = [];
  let length = arr.length;

  for (let i = 0; i < length; i++) {
    let newSmallArr = arr[i].sort((a, b) => a.rightAnswer - b.rightAnswer);

    newArr.push(newSmallArr);
  }

  console.log(newArr);
  return newArr;
};
