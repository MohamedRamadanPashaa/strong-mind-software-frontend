import TableRow from "./TableRow";

import classes from "./MyPerformance.module.css";

const TableTop5 = ({ results }) => {
  return (
    results.length > 0 && (
      <div className={classes["top-five"]}>
        <table className={classes.MyPerformance}>
          <caption>
            Top {results.length > 1 && results.length} Result
            {results.length > 1 ? "s" : ""}
          </caption>
          <thead>
            <tr>
              <th>No</th>
              <th>Score</th>
              <th>Correct</th>
              <th>Date</th>
              <th>View</th>
            </tr>
          </thead>
          <tbody>
            {results.map((result, index) => (
              <TableRow key={result._id} index={index + 1} {...result} />
            ))}
          </tbody>
        </table>
      </div>
    )
  );
};

export default TableTop5;
