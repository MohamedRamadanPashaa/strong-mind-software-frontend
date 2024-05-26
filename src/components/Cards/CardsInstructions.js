const CardsInstructions = ({ numberBerRow }) => {
  return (
    <td>
      * {numberBerRow} cards/deck.
      <br />* One mistake ber deck = deck / 2.
      <br />* Two or more mistake ber deck = deck count 0.
    </td>
  );
};

export default CardsInstructions;
