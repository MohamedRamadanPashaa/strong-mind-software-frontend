import Link from "next/link";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";

const TableRow = ({ score, correct, date, index, _id }) => {
  return (
    <tr>
      <td>{index}</td>
      <td>{score}</td>
      <td>{correct}</td>
      <td>{date}</td>
      <td>
        <Link href={`/view-match/${_id}`}>
          View <FaArrowUpRightFromSquare />
        </Link>
      </td>
    </tr>
  );
};

export default TableRow;
