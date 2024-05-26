import UserInfo from "@/components/MyAccount/UserInfo";

import classes from "./MyAccountLayout.module.css";

export default function MyAccountLayout({ children }) {
  return (
    <div className={classes.myAccount}>
      <UserInfo />

      {children}
    </div>
  );
}
