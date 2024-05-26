import { useSession } from "next-auth/react";

const Table = ({ index, userId, score, mistakes, time, count }) => {
  const { data } = useSession();
  const user = data?.user 

  return (
    <tr className={userId._id === user?._id ? "my-result" : ""}>
      <td>{index}</td>
      <td>{userId.name}</td>
      <td>{score}</td>
      <td>{mistakes}</td>
      <td>{time}</td>
      <td>{count}</td>
    </tr>
  );
};

export default Table;
