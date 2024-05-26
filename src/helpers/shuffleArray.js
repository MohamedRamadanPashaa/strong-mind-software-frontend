export const shuffleArray = (array) => {
  let newArr = [];
  let amount = array.length;
  let arr = [...array];

  for (let i = 0; i < amount; i++) {
    const randomIndex = Math.floor(Math.random() * arr.length);
    newArr.push(arr.splice(randomIndex, 1)[0]);
  }

  return newArr;
};

export const shuffleSmallArraysInsideBigArray = (arr) => {
  let newArr = [];
  const arrayLength = arr.length;

  for (let j = 0; j < arrayLength; j++) {
    let smallArr = [...arr[j]];
    let smallShuffleArr = shuffleArray(smallArr);
    newArr.push(...smallShuffleArr);
  }

  return newArr;
};
