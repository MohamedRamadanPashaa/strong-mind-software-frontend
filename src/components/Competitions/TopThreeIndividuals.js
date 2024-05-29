import { memo } from "react";
import Image from "next/image";

import classes from "./TopThreeIndividuals.module.css";

const TopThreeIndividuals = ({ topThree, title }) => {
  return (
    <div className={classes["top-three-individuals"]}>
      <h3>
        Top {topThree.length} {title}
      </h3>
      <div className={classes.cards}>
        {topThree.map((el, i) => {
          const { photo, name } = el[0].competitor;
          return (
            <div key={i} className={classes.card}>
              <div className={classes.competitor}>
                <div className={classes.img}>
                  <Image
                    width={250}
                    height={250}
                    style={{ objectFit: "contain" }}
                    src={
                      photo?.secure_url
                        ? photo.secure_url
                        : `/img/usersImages/default.jpg`
                    }
                    alt={`${name}`}
                  />
                </div>
                <h4 title={name}>{name}</h4>
              </div>
            </div>
          );
        })}

        {topThree.length > 0 && (
          <div className={classes["rank-one"]}>
            <span>1</span>
          </div>
        )}
        {topThree.length > 1 && (
          <div className={classes["rank-two"]}>
            <span>2</span>
          </div>
        )}
        {topThree.length > 2 && (
          <div className={classes["rank-three"]}>
            <span>3</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default memo(TopThreeIndividuals);
