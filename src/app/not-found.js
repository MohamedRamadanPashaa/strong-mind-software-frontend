"use client";

import Button from "@/components/FormElement/Button";
import Image from "next/image";

import classes from "./error.module.css";

export default function NotFound() {
  return (
    <div className={classes.error}>
      <div className={classes.text}>
        <h2>404</h2>
        <h3>OOPS!</h3>
        <p>We Can&#39;t seem to find the page you&#39;r looking for!</p>
        <Button to="/" className={classes.btn}>
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
