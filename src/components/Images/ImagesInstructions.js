const ImagesInstructions = ({ numberBerRow }) => {
  return (
    <td>
      * {numberBerRow} images/row.
      <br />* One or more mistake = Score - 1.
      <br />* One or more mistake = All row deleted.
    </td>
  );
};

export default ImagesInstructions;
