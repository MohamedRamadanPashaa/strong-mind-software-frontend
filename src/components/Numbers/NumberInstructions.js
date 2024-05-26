const NumberInstructions = ({ numberBerRow }) => {
  return (
    <td>
      * {numberBerRow} numbers/row.
      <br />* One mistake = {numberBerRow / 2} Score.
      <br />
      * Two mistakes = 0 Score.
      <br />* Only the last line can be incomplete and treated as a row.
    </td>
  );
};

export default NumberInstructions;
