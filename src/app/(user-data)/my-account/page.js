import UserInfoChange from "@/components/MyAccount/UserInfoChange";

import PasswordChange from "@/components/MyAccount/PasswordChange";

import classes from "./page.module.css";

export default async function page() {
  return (
    <div className={classes.userData}>
      <UserInfoChange />

      <PasswordChange />
    </div>
  );
}
