import { FaChartLine, FaSchool, FaUser, FaUsers } from "react-icons/fa";
import UserInfoLink from "./UserInfoLink";
import { FaSchoolFlag } from "react-icons/fa6";
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";

import classes from "./UserInfo.module.css";

const UserInfo = async () => {
  const session = await getServerSession(options);

  return (
    <div className={classes.userInfo}>
      <ul>
        <li>
          <UserInfoLink href="/my-account">
            <FaUser />
            <span className={classes["link-text"]}>
              <span>My</span>
              <span> Account</span>
            </span>
          </UserInfoLink>
        </li>
        <li>
          <UserInfoLink href="/my-performance">
            <FaChartLine />
            <span className={classes["link-text"]}>
              <span>My</span>
              <span> Performance</span>
            </span>
          </UserInfoLink>
        </li>
        {session?.user?.role === "admin" && (
          <li>
            <UserInfoLink href="/users">
              <FaUsers />
              <span className={classes["link-text"]}>
                <span>All</span>
                <span> Users</span>
              </span>
            </UserInfoLink>
          </li>
        )}

        {(session?.user?.role === "admin" ||
          session?.user?.role === "coach") && (
          <li>
            <UserInfoLink href="/create-course">
              <FaSchool />
              <span className={classes["link-text"]}>
                <span>Create</span>
                <span> Course</span>
              </span>
            </UserInfoLink>
          </li>
        )}

        {(session?.user?.role === "admin" ||
          session?.user?.role === "coach") && (
          <li>
            <UserInfoLink href="/my-courses">
              <FaSchoolFlag />
              <span className={classes["link-text"]}>
                <span>My</span>
                <span> Courses</span>
              </span>
            </UserInfoLink>
          </li>
        )}
      </ul>
    </div>
  );
};

export default UserInfo;
