import { useEffect, useRef, useState } from "react";
import { FaArrowUpFromBracket } from "react-icons/fa6";
import Image from "next/image";

import classes from "./ImageUpload.module.css";

const ImageUpload = ({ id, errorText, onInput, photo }) => {
  const filePickerRef = useRef();
  const [file, setFile] = useState();
  const [isValid, setIsValid] = useState(false);
  const [isUpdatePhotoHover, setIsUpdatePhotoHover] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(
    photo ? photo : "/img/usersImages/default.jpg"
  );

  useEffect(() => {
    if (!file) {
      return;
    }

    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewUrl(fileReader.result);
    };

    fileReader.readAsDataURL(file);
  }, [file]);

  const pickedHandler = (e) => {
    let fileIsValid = isValid;

    let pickedFile;
    if (e.target.files && e.target.files.length === 1) {
      pickedFile = e.target.files[0];

      setFile(pickedFile);
      setIsValid(true);
      fileIsValid = true;
    } else {
      setIsValid(false);
      fileIsValid = false;
    }

    onInput(id, pickedFile, fileIsValid);
  };

  const pickImageHandler = () => {
    filePickerRef.current.click();
  };

  return (
    <div className={classes["form-control"]}>
      <input
        type="file"
        accept=".jpg,.png,.jpeg"
        id={id}
        ref={filePickerRef}
        style={{ display: "none" }}
        onChange={pickedHandler}
      />

      <div
        className={classes.preview}
        onClick={pickImageHandler}
        onMouseEnter={() => setIsUpdatePhotoHover(true)}
        onMouseLeave={() => setIsUpdatePhotoHover(false)}
      >
        <div className={isUpdatePhotoHover ? classes.update : ""}>
          Update <FaArrowUpFromBracket />
        </div>
        {previewUrl && (
          <Image
            width={100}
            height={100}
            priority
            src={previewUrl}
            alt="Preview"
          />
        )}
        {!previewUrl && <p>Pick an Image</p>}
      </div>

      {!previewUrl && <p>{errorText}</p>}
    </div>
  );
};

export default ImageUpload;
