import classes from "./Instructions.module.css";

const Instructions = ({ memoTime, recallTime, children }) => {
  return (
    <div>
      <table className={classes.instructions}>
        <caption>Instructions</caption>
        <thead>
          <tr>
            <th>Full Screen</th>
            <th>Zoom</th>
            <th>Rules</th>
            <th>Memo/Recall</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>
              F11 or Fn + F11 (Windows) <br /> ^ + ⌘ + F (Control+Cmd+F) (Mac)
            </td>
            <td>
              Zoom In <b>&#34;Ctrl +&#34;</b> <br /> Zoom Out{" "}
              <b>&#34;Ctrl -&#34;</b>
            </td>
            {children}
            <td>
              {memoTime}/{recallTime} Minutes
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Instructions;
