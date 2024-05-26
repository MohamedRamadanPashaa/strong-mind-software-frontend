const compareTwoWords = (word1, word2) => {
  // تحويل الكلمات إلى صيغة قياسية (حروف الألف في البداية وحروف الياء والواو والهاء والتاء المربوطة في النهاية)
  function normalizeWord(word) {
    return word
      .trim()
      .toLowerCase()
      .replace(/^[أإآ]/, "ا")
      .replace(/[يى]$/, "ي")
      .replace(/ه$/, "ة");
  }

  const normalizedWord1 = normalizeWord(word1);
  const normalizedWord2 = normalizeWord(word2);

  // compare the new two words
  if (normalizedWord1 === normalizedWord2) {
    return true;
  }

  return false;
};

export default compareTwoWords;
