"use client";

import { useSession } from "next-auth/react";
import Button from "../FormElement/Button";

import classes from "./CreateCompetitionBtn.module.css";

export default function CreateCompetitionBtn({ session }) {
  const { data = session } = useSession();
  const user = data?.user;

  return (
    user?.role === "admin" && (
      <div className={classes["create-competition-btn"]}>
        <Button className={classes.btn} to="/competitions/create-competition">
          Create Competition
        </Button>
      </div>
    )
  );
}
