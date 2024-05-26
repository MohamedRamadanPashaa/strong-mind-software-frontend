import compareTwoWords from "./compareTwoWords";

export const getScoreAndCorrectNumbers = (
  randomNumbersArray,
  numbersRecalledArray,
  amount,
  numberBerRow
) => {
  let ranArray = [...randomNumbersArray];
  let recArray = [...numbersRecalledArray];
  let newRanArray = [];
  let newRecArray = [];
  let correct = 0;
  let score = 0;

  // calculate correct
  for (let i = 0; i < amount; i++) {
    if (recArray[i] !== "" && ranArray[i] === recArray[i] * 1) {
      correct += 1;
    }
  }

  // calculate score
  for (let i = 0; i < Math.ceil(amount / numberBerRow); i++) {
    newRanArray.push(
      ranArray.filter(
        (item, index) =>
          index >= i * numberBerRow && index < (i + 1) * numberBerRow
      )
    );

    newRecArray.push(
      recArray.filter(
        (item, index) =>
          index >= i * numberBerRow && index < (i + 1) * numberBerRow
      )
    );
  }

  // set correct, error or empty in place of each element
  let errors = [];
  for (let i = 0; i < newRanArray.length; i++) {
    let rowErrors = [];

    for (let j = 0; j < newRanArray[i].length; j++) {
      if (
        newRecArray[i][j] !== "" &&
        newRanArray[i][j] !== newRecArray[i][j] * 1
      ) {
        rowErrors.push("error");
      } else if (
        newRecArray[i][j] !== "" &&
        newRanArray[i][j] === newRecArray[i][j] * 1
      ) {
        rowErrors.push("correct");
      } else {
        rowErrors.push("empty");
      }
    }

    errors.push(rowErrors);
  }

  // exclude the empty arrays
  errors = errors.filter(
    (arr) => arr.includes("correct") || arr.includes("error")
  );

  for (let i = 0; i < errors.length; i++) {
    // for last row
    if (i === errors.length - 1) {
      // get last row array
      let reverseArray = errors[i].reverse();
      let indexOfLastCorrectOrError =
        errors[i].length -
        reverseArray.findIndex((el) => el === "correct" || el === "error");
      const lastRow = errors[i].reverse().splice(0, indexOfLastCorrectOrError);

      // last row correct count
      const correctCount = lastRow.filter((el) => el === "correct").length;

      // if all is correct => set score prev + correct length
      if (correctCount === lastRow.length) {
        score += lastRow.length;
      }

      // if only one error => set score prev + 0.5 correct length
      if (correctCount === lastRow.length - 1) {
        score += Math.ceil(0.5 * correctCount);
        console.log(score);
      }
      // for all rows not last one
    } else if (i < errors.length - 1) {
      const correctCount = errors[i].filter((el) => el === "correct").length;
      // if all is correct => set score prev + number ber row
      if (correctCount === numberBerRow) score += numberBerRow;

      // if one error => set score prev + 0.5 number ber row
      if (correctCount === numberBerRow - 1) score += 0.5 * numberBerRow;
    }
  }

  return { score, correct };
};

export const getScoreAndCorrectSpokenNumbers = (
  randomNumbersArray,
  numbersRecalledArray,
  amount,
  numberBerRow
) => {
  let ranArray = [...randomNumbersArray];
  let recArray = [...numbersRecalledArray];
  let correct = 0;
  let score = 0;

  // calculate correct
  for (let i = 0; i < amount; i++) {
    if (recArray[i] !== "" && ranArray[i] === recArray[i] * 1) {
      correct += 1;
    }
  }

  // set correct, error or empty in place of each element
  let errors = [];
  for (let i = 0; i < ranArray.length; i++) {
    if (recArray[i] !== "" && ranArray[i] !== recArray[i] * 1) {
      errors.push("error");
    } else if (recArray[i] !== "" && ranArray[i] === recArray[i] * 1) {
      errors.push("correct");
    } else {
      errors.push("empty");
    }
  }

  // exclude the empty arrays
  errors = errors.filter(
    (arr) => arr.includes("correct") || arr.includes("error")
  );

  const firstErrorIndex = errors.findIndex(
    (el) => el === "error" || el === "empty"
  );

  firstErrorIndex === -1
    ? (score = errors.filter((el) => el === "correct").length)
    : (score = errors.splice(0, firstErrorIndex).length);

  return { score, correct };
};

export const getScoreAndCorrectImages = (
  randomImagesArray,
  imagesRecalledArray,
  amount,
  numberBerRow
) => {
  let ranArray = [...randomImagesArray];
  let recArray = [...imagesRecalledArray];
  let newRanArray = [];
  let newRecArray = [];
  let correct = 0;
  let score = 0;

  // calculate correct
  for (let i = 0; i < amount; i++) {
    if (recArray[i] !== "" && ranArray[i].rightAnswer === recArray[i] * 1) {
      correct += 1;
    }
  }

  // calculate score
  for (let i = 0; i < Math.ceil(amount / numberBerRow); i++) {
    newRanArray.push(
      ranArray.filter(
        (item, index) =>
          index >= i * numberBerRow && index < (i + 1) * numberBerRow
      )
    );

    newRecArray.push(
      recArray.filter(
        (item, index) =>
          index >= i * numberBerRow && index < (i + 1) * numberBerRow
      )
    );
  }

  // set correct, error or empty in place of each element
  let errors = [];
  for (let i = 0; i < newRanArray.length; i++) {
    let rowErrors = [];

    for (let j = 0; j < newRanArray[i].length; j++) {
      if (
        newRecArray[i][j] !== "" &&
        newRanArray[i][j].rightAnswer !== newRecArray[i][j] * 1
      ) {
        rowErrors.push("error");
      } else if (
        newRecArray[i][j] !== "" &&
        newRanArray[i][j].rightAnswer === newRecArray[i][j] * 1
      ) {
        rowErrors.push("correct");
      } else {
        rowErrors.push("empty");
      }
    }

    errors.push(rowErrors);
  }

  // exclude the empty arrays
  errors = errors.filter(
    (arr) => arr.includes("correct") || arr.includes("error")
  );

  for (let i = 0; i < errors.length; i++) {
    const correctCount = errors[i].filter((el) => el === "correct").length;
    // if all is correct => set score prev + number ber row
    if (correctCount === numberBerRow) {
      score += numberBerRow;
    } else {
      score -= 1;
    }
  }

  return { score: score >= 0 ? score : 0, correct };
};

export const getScoreAndCorrectLongCard = (
  randomNumbersArray,
  numbersRecalledArray,
  amount,
  numberBerRow,
  cardsFromLeftToRight
) => {
  let ranArray = [...randomNumbersArray];
  let recArray = [...numbersRecalledArray];
  let newRanArray = [];
  let newRecArray = [];
  let correct = 0;
  let score = 0;

  // calculate correct
  for (let i = 0; i < amount; i++) {
    if (recArray[i] !== "" && ranArray[i] === recArray[i]) {
      correct += 1;
    }
  }

  // calculate score
  for (let i = 0; i < Math.ceil(amount / numberBerRow); i++) {
    newRanArray.push(
      ranArray.filter(
        (item, index) =>
          index >= i * numberBerRow && index < (i + 1) * numberBerRow
      )
    );

    newRecArray.push(
      recArray.filter(
        (item, index) =>
          index >= i * numberBerRow && index < (i + 1) * numberBerRow
      )
    );
  }

  // set correct, error or empty in place of each element
  let errors = [];
  for (let i = 0; i < newRanArray.length; i++) {
    let rowErrors = [];

    for (let j = 0; j < newRanArray[i].length; j++) {
      if (newRecArray[i][j] !== "" && newRanArray[i][j] !== newRecArray[i][j]) {
        rowErrors.push("error");
      } else if (
        newRecArray[i][j] !== "" &&
        newRanArray[i][j] === newRecArray[i][j]
      ) {
        rowErrors.push("correct");
      } else {
        rowErrors.push("empty");
      }
    }

    errors.push(rowErrors);
  }

  // exclude the empty arrays
  errors = errors.filter(
    (arr) => arr.includes("correct") || arr.includes("error")
  );

  for (let i = 0; i < errors.length; i++) {
    // for last row
    if (i === errors.length - 1) {
      // get last row array
      let reverseArray = [];

      if (cardsFromLeftToRight) {
        reverseArray = errors[i].reverse();
      } else {
        reverseArray = errors[i];
      }
      let indexOfLastCorrectOrError =
        errors[i].length -
        reverseArray.findIndex((el) => el === "correct" || el === "error");
      const lastRow = errors[i].reverse().splice(0, indexOfLastCorrectOrError);

      // last row correct count
      const correctCount = lastRow.filter((el) => el === "correct").length;

      // if all is correct => set score prev + correct length
      if (correctCount === lastRow.length) {
        score += lastRow.length;
      }

      // if only one error => set score prev + 0.5 correct length
      if (correctCount === lastRow.length - 1) {
        score += Math.ceil(0.5 * lastRow.length);
      }
      // for all rows not last one
    } else if (i < errors.length - 1) {
      const correctCount = errors[i].filter((el) => el === "correct").length;
      // if all is correct => set score prev + number ber row
      if (correctCount === numberBerRow) score += numberBerRow;

      // if one error => set score prev + 0.5 number ber row
      if (correctCount === numberBerRow - 1) score += 0.5 * numberBerRow;
    }
  }

  return { score, correct };
};

export const getScoreCorrectSpeedCards = (
  randomCardsArray,
  cardsRecalledArray,
  amount,
  numberBerRow,
  cardsFromLeftToRight
) => {
  let ranArray = [...randomCardsArray];
  let recArray = [...cardsRecalledArray];

  let correct = 0;
  let score = 0;

  // calculate correct
  for (let i = 0; i < amount; i++) {
    if (recArray[i] !== "" && ranArray[i] === recArray[i]) {
      correct += 1;
    }
  }

  // set correct, error or empty in place of each element
  let errors = [];
  for (let j = 0; j < ranArray.length; j++) {
    if (recArray[j] !== "" && ranArray[j] !== recArray[j]) {
      errors.push("error");
    } else if (recArray[j] !== "" && ranArray[j] === recArray[j]) {
      errors.push("correct");
    } else {
      errors.push("empty");
    }
  }

  if (errors.filter((el) => el === "correct").length === numberBerRow) {
    score = numberBerRow;
  } else {
    if (!cardsFromLeftToRight) {
      errors = errors.reverse();
    }

    let indexOfLastCorrect = errors.findIndex(
      (el) => el === "empty" || el === "error"
    );
    const row = errors.splice(0, indexOfLastCorrect);
    score = row.length;
  }

  return { score, correct };
};

export const getScoreAndCorrectDates = (
  randomDatesArray,
  datesRecalledArray,
  amount
) => {
  let ranArray = [...randomDatesArray];
  let recArray = [...datesRecalledArray];
  let correct = 0;
  let score = 0;

  // calculate correct
  for (let i = 0; i < amount; i++) {
    if (
      recArray[i] !== "" &&
      ranArray[i].split(" ")[0] * 1 === recArray[i] * 1
    ) {
      correct += 1;
    }
  }

  // calculate score
  // set correct, error or empty in place of each element
  let errors = [];
  for (let j = 0; j < amount; j++) {
    if (recArray[j] !== "" && ranArray[j].split(" ")[0] !== recArray[j]) {
      errors.push("error");
    } else if (
      recArray[j] !== "" &&
      ranArray[j].split(" ")[0] === recArray[j]
    ) {
      errors.push("correct");
    } else {
      errors.push("empty");
    }
  }

  // exclude the empty arrays
  errors = errors.filter((el) => el.includes("error"));

  // if errors > 2 so mins 0.5 each more date error
  if (errors.length > 2) {
    score = correct - (errors.length - 2) * 0.5;
  } else {
    score = correct;
  }

  return { score: score > 0 ? Math.round(score) : 0, correct };
};

export const getScoreAndCorrectWords = (
  randomWordsArray,
  wordsRecalledArray,
  amount,
  numberBerRow
) => {
  let ranArray = [...randomWordsArray.map((el) => el.trim().toLowerCase())];
  let recArray = [...wordsRecalledArray.map((el) => el.trim().toLowerCase())];
  let newRanArray = [];
  let newRecArray = [];
  let correct = 0;
  let score = 0;

  // calculate correct
  for (let i = 0; i < amount; i++) {
    if (recArray[i] !== "" && compareTwoWords(ranArray[i], recArray[i])) {
      correct += 1;
    }
  }

  // calculate score
  for (let i = 0; i < Math.ceil(amount / numberBerRow); i++) {
    newRanArray.push(
      ranArray.filter(
        (item, index) =>
          index >= i * numberBerRow && index < (i + 1) * numberBerRow
      )
    );

    newRecArray.push(
      recArray.filter(
        (item, index) =>
          index >= i * numberBerRow && index < (i + 1) * numberBerRow
      )
    );
  }

  // set correct, error or empty in place of each element
  let errors = [];
  for (let i = 0; i < newRanArray.length; i++) {
    let rowErrors = [];

    for (let j = 0; j < newRanArray[i].length; j++) {
      if (
        newRecArray[i][j] !== "" &&
        !compareTwoWords(newRanArray[i][j], newRecArray[i][j])
      ) {
        rowErrors.push("error");
      } else if (
        newRecArray[i][j] !== "" &&
        compareTwoWords(newRanArray[i][j], newRecArray[i][j])
      ) {
        rowErrors.push("correct");
      } else {
        rowErrors.push("empty");
      }
    }

    errors.push(rowErrors);
  }

  // exclude the empty arrays
  errors = errors.filter(
    (arr) => arr.includes("correct") || arr.includes("error")
  );

  for (let i = 0; i < errors.length; i++) {
    // for last row
    if (i === errors.length - 1) {
      // get last row array
      let reverseArray = errors[i].reverse();
      let indexOfLastCorrectOrError =
        errors[i].length -
        reverseArray.findIndex((el) => el === "correct" || el === "error");
      const lastRow = errors[i].reverse().splice(0, indexOfLastCorrectOrError);

      // last row correct count
      const correctCount = lastRow.filter((el) => el === "correct").length;

      // if all is correct => set score prev + correct length
      if (correctCount === lastRow.length) {
        score += lastRow.length;
      }

      // if only one error => set score prev + 0.5 correct length
      if (correctCount === lastRow.length - 1) {
        score += Math.ceil(0.5 * correctCount);
      }

      // for all rows not last one
    } else if (i < errors.length - 1) {
      const correctCount = errors[i].filter((el) => el === "correct").length;
      // if all is correct => set score prev + number ber row
      if (correctCount === numberBerRow) score += numberBerRow;

      // if one error => set score prev + 0.5 number ber row
      if (correctCount === numberBerRow - 1) score += 0.5 * numberBerRow;
    }
  }

  return { score, correct };
};

export const getScoreAndCorrectNames = (
  randomNamesArray,
  namesRecalledArray
) => {
  let ranArray = [];
  let amount = randomNamesArray.length * 2;

  for (let i = 0; i < randomNamesArray.length; i++) {
    const firstName = randomNamesArray[i].firstName.trim().toLowerCase();
    ranArray.push(firstName);
    const lastName = randomNamesArray[i].lastName.trim().toLowerCase();
    ranArray.push(lastName);
  }

  let recArray = [...namesRecalledArray.map((el) => el.trim().toLowerCase())];

  let correct = 0;
  let score = 0;

  // calculate correct
  for (let i = 0; i < amount; i++) {
    if (recArray[i] !== "" && compareTwoWords(ranArray[i], recArray[i])) {
      correct += 1;
      score += 1;
    }
  }

  const repeatedElements = {};
  for (let i = 0; i < amount; i++) {
    if (repeatedElements[recArray[i]]) {
      // If the element is repeated in recArray, increase the counter by 1
      repeatedElements[recArray[i]] += 1;
    } else if (recArray[i] !== "") {
      repeatedElements[recArray[i]] = 1;
    }
  }

  const repeatedElementArray = Object.values(repeatedElements);
  for (let i = 0; i < repeatedElementArray.length; i++) {
    // If the element is repeated more than two times, decrease the score by an additional 0.5 each one time after 2 times
    if (repeatedElementArray[i] > 2) {
      score = score - 0.5 * (repeatedElementArray[i] - 2);
    }
  }

  return { score: score >= 0 ? score : 0, correct };
};
