import Table from "./Table";

const TableBody = ({ results }) => {
  return (
    <tbody>
      {results.map((result, index) => (
        <Table key={result._id} {...result} index={index + 1} />
      ))}
    </tbody>
  );
};

export default TableBody;
