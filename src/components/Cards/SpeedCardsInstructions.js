const SpeedCardsInstructions = ({ numberBerRow }) => {
  return (
    <td>
      * You have {numberBerRow} cards (1 deck).
      <br />* Score counts upto first mistake.
      <br />* Memorization time has no effect if score is less than 52.
    </td>
  );
};

export default SpeedCardsInstructions;
