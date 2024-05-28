"use server";

import { FaHouseCircleCheck } from "react-icons/fa6";
import { MdCancel } from "react-icons/md";
import Button from "@/components/FormElement/Button";
import { checkEnvironment } from "@/helpers/checkEnvironment";

import classes from "./page.module.css";

const EmailVerified = async ({ params }) => {
  const { userIdAndToken } = params;
  let successMsg = "";
  let errorMsg = "";

  const userId = userIdAndToken.split("-")[1];
  const token = userIdAndToken.split("-")[2];

  try {
    const res = await fetch(
      `${process.env.FRONTEND_WEBSITE}/api/users/${userId}/${token}`,
      {
        cache: "no-store",
      }
    );

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Something went wrong!");
    }

    successMsg = data.message;
  } catch (error) {
    console.log(error.message);
    errorMsg = error.message || "something went wrong!";
  }

  return (
    <div className={`${classes.verified} ${errorMsg && classes.error}`}>
      <>
        <div>
          {successMsg && <FaHouseCircleCheck />}
          {errorMsg && <MdCancel />}
        </div>

        {successMsg && <h2>{successMsg}</h2>}

        {errorMsg && <h2>{errorMsg}</h2>}

        <Button to="/login" outline={"true"}>
          {successMsg && "Login Now"}
          {errorMsg && "Register / Login"}
        </Button>
      </>
    </div>
  );
};

export default EmailVerified;
