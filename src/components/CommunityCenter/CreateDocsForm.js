import { memo, useRef, useState } from "react";
import InputEmoji from "react-input-emoji";
import { FaImage, FaPaperPlane, FaSpinner } from "react-icons/fa";
import { FaRectangleXmark } from "react-icons/fa6";
import Image from "next/image";

import classes from "./CreateDocsForm.module.css";

const CreateDocForm = ({
  createDocHandler,
  isLoading,
  placeholder,
  onFocus,
}) => {
  const [text, setText] = useState("");
  const [commentImage, setCommentImage] = useState(null);
  const imageRef = useRef();

  const changeImageHandler = (e) => {
    if (e.target.files || e.target.files[0]) setCommentImage(e.target.files[0]);
  };

  return (
    <>
      <div
        className={`${classes.comment} ${
          text.trim().length < 1 ? undefined : classes["valid-comment"]
        }`}
      >
        <div onClick={() => imageRef.current.click()}>
          <FaImage />
        </div>

        <div>
          <InputEmoji
            value={text}
            placeholder={placeholder}
            onChange={setText}
            borderColor="transparent"
            fontSize={15}
            onEnter={() => {
              createDocHandler(text, commentImage);
              setText("");
              setCommentImage(null);
            }}
            onFocus={onFocus}
            height={20}
            borderRadius={3}
            padding={5}
          />
        </div>

        <div>
          <button
            className={classes.button}
            disabled={(text.trim().length < 1 && !commentImage) || isLoading}
            onClick={() => {
              createDocHandler(text, commentImage);
              setText("");
              setCommentImage(null);
            }}
          >
            {!isLoading ? <FaPaperPlane /> : <FaSpinner />}
          </button>
        </div>

        <div style={{ display: "none" }}>
          <input
            type="file"
            name="postImage"
            ref={imageRef}
            onChange={changeImageHandler}
            accept=".jpg,.png,.jpeg"
          />
        </div>
      </div>

      {commentImage && (
        <div className={classes["img-preview"]}>
          <span title="delete photo" onClick={() => setCommentImage(null)}>
            <FaRectangleXmark />
          </span>
          <Image
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: "auto", height: "100%" }}
            priority
            src={URL.createObjectURL(commentImage)}
            alt="post"
          />
        </div>
      )}
    </>
  );
};

export default memo(CreateDocForm);
