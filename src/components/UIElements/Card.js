import Image from "next/image";
import Button from "../FormElement/Button";

import classes from "./Card.module.css";

const Card = ({ title, description, img, path }) => {
  return (
    <div className={classes.card}>
      <div className={classes.img}>
        <Image width={300} height={200} priority src={img} alt={title} />
      </div>
      <div className={classes.text}>
        <h3>{title}</h3>
        <p>{description}</p>
        <Button danger={true} className={classes.btn} to={path}>
          GO
        </Button>
      </div>
    </div>
  );
};

export default Card;
