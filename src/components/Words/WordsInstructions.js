const WordsInstructions = ({ numberBerRow }) => {
  return (
    <td>
      * {numberBerRow} words/column.
      <br />* One mistake = {numberBerRow / 2} Score.
      <br />
      * Two mistakes or more = 0 Score.
      <br />* Only the last column can be incomplete and treated as a column.
    </td>
  );
};

export default WordsInstructions;
