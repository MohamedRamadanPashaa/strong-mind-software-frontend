import { FaChartLine, FaUser } from "react-icons/fa";
import UserInfoLink from "./UserInfoLink";

import classes from "./UserInfo.module.css";

const UserInfo = () => {
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
      </ul>
    </div>
  );
};

export default UserInfo;
