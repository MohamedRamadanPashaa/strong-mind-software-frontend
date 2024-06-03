export function convertText(input) {
  const words = input.split("-");

  const pascalCaseWords = words.map(
    (word) => word.charAt(0).toUpperCase() + word.slice(1)
  );

  let result = "";
  for (let i = 0; i < pascalCaseWords.length; i++) {
    result += pascalCaseWords[i];
    if (i < pascalCaseWords.length - 1) {
      if (/\d$/.test(pascalCaseWords[i])) {
        result += "-";
      } else {
        result += " ";
      }
    }
  }

  return result;
}
