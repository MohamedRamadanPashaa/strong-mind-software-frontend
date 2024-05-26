import Image from "next/image";
import classes from "./PreviewImages.module.css";

const PreviewImages = ({ grouping }) => {
  return (
    <div className={classes.preview}>
      {Array.from(Array(grouping * 1 || 1).keys()).map((group, index) => (
        <div key={index} className={classes["img-preview"]}>
          <Image
            src={`/img/IAM_Images_Database/1 (${index + 1}).png`}
            alt="train-img"
            width={100}
            height={100}
            priority
          />
        </div>
      ))}
    </div>
  );
};

export default PreviewImages;
