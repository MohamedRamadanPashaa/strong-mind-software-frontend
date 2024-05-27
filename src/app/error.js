"use client";

import Button from "@/components/FormElement/Button";
import Image from "next/image";

import classes from "./error.module.css";

export default function error({ error }) {
  return (
    <div className={classes.error}>
      <div className={classes.text}>
        <h2>OOPS!</h2>
        <p>{error.message || "Something went wrong!"}</p>
        <Button to={"/"} className={classes.btn}>
          Back to home page
        </Button>
      </div>

      <div className={classes.img}>
        <Image
          src="/assets/img/sad-error.png"
          alt="Error"
          width={400}
          height={600}
          priority
        />
      </div>
    </div>
  );
}
