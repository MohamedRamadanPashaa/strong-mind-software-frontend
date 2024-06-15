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
            <FaUser /> My Account
          </UserInfoLink>
        </li>
        <li>
          <UserInfoLink href="/my-performance">
            <FaChartLine />
            My Performance
          </UserInfoLink>
        </li>
        {session?.user?.role === "admin" && (
          <li>
            <UserInfoLink href="/users">
              <FaUsers />
              All Users
            </UserInfoLink>
          </li>
        )}

        {(session?.user?.role === "admin" ||
          session?.user?.role === "coach") && (
          <li>
            <UserInfoLink href="/create-course">
              <FaSchool />
              Create Course
            </UserInfoLink>
          </li>
        )}

        {(session?.user?.role === "admin" ||
          session?.user?.role === "coach") && (
          <li>
            <UserInfoLink href="/my-courses">
              <FaSchoolFlag />
              my Course
            </UserInfoLink>
          </li>
        )}
      </ul>
    </div>
  );
};

export default UserInfo;
