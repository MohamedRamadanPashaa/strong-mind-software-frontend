import Image from "next/image";
import Link from "next/link";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import SectionHeader from "../CommunityLeft/SectionHeader";
import Pagination from "../ShareDiscipline/Pagination";
import classes from "./AllUsers.module.css";

export default function UsersList({
  users,
  page,
  setPage,
  countAll,
  numberOfPage,
  usersInPage,
}) {
  const pressPageNavigationHandler = (p) => {
    setPage(p);
  };

  const nextPage = () => {
    if (page < numberOfPage) {
      setPage((prev) => prev + 1);
    }
  };

  const prevPage = () => {
    if (page > 1) {
      setPage((prev) => prev - 1);
    }
  };

  return (
    <div>
      <SectionHeader>{countAll} Users</SectionHeader>
      <Pagination
        numberOfPage={numberOfPage}
        page={page}
        nextPage={nextPage}
        prevPage={prevPage}
        pressPageNavigationHandler={pressPageNavigationHandler}
      />
      <table>
        <thead>
          <tr>
            <th>No</th>
            <th>Name</th>
            <th>View</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, i) => (
            <tr key={user._id}>
              <td>{(page - 1) * usersInPage + i + 1}</td>
              <td className={classes.name}>
                <div className={classes.img}>
                  <Image
                    src={
                      user?.photo?.secure_url
                        ? user.photo.secure_url
                        : "/img/usersImages/default.jpg"
                    }
                    alt={user.name}
                    width="100"
                    height="100"
                  />
                </div>
                <span>{user.name}</span>
              </td>

              <td>
                <Link href={`/users/${user._id}`} className={classes.view}>
                  View <FaArrowUpRightFromSquare />
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
