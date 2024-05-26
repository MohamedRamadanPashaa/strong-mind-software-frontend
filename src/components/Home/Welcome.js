"use client";

import { useSession } from "next-auth/react";
import Button from "../FormElement/Button";

import classes from "./Welcome.module.css";

const Welcome = ({ session }) => {
  const { data = session, status } = useSession();

  return (
    <div className={classes.welcome}>
      <h1>Welcome To Strong Mind!</h1>
      <p>Keep your mind active and strong.</p>
      {data && (
        <div className={classes.btn}>
          <Button className={classes.button} to="/train">
            Train
          </Button>
          <Button className={classes.button} to="/ranking/national">
            Ranking
          </Button>
        </div>
      )}

      {!data && (
        <div className={classes.btn}>
          <Button className={classes.button} to="login">
            Login
          </Button>
        </div>
      )}
    </div>
  );
};

export default Welcome;
