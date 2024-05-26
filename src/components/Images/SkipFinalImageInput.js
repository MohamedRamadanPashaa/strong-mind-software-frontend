import CheckboxInput from "../ShareDiscipline/CheckboxInput";

const SkipFinalImageInput = ({
  skipFinalImage,
  setSkipFinalImage,
  grouping,
  setGrouping,
  type,
}) => {
  return (
    <CheckboxInput
      id="select-id"
      label={"Skip Final Image"}
      checked={skipFinalImage}
      onChangeHandler={() => {
        localStorage.setItem("skipFinalImage", !skipFinalImage);
        setSkipFinalImage((prev) => !prev);

        // if we change skip to true and grouping was false
        if (grouping === "5" && !skipFinalImage) {
          setGrouping("4");
          localStorage.setItem(`${type}Grouping`, "4");
        }
      }}
    />
  );
};

export default SkipFinalImageInput;
