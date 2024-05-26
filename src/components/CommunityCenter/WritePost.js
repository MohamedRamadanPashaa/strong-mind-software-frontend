import { useEffect, useRef, useState } from "react";
import EmojiPicker from "@emoji-mart/react";

import Button from "../FormElement/Button";
import { useDispatch } from "react-redux";
import useHttp from "../../hooks/http-hook";
import ErrorModal from "../ErrorModal/ErrorModal";
import {
  addPostCreatedToPosts,
  addUserPostCreatedToUserPosts,
} from "../../store/postSlice";
import ContentEnter from "../UIElements/ContentEnter";
import { usePathname, useRouter } from "next/navigation";
import { FaFaceSmile, FaRectangleXmark } from "react-icons/fa6";
import { FaImage } from "react-icons/fa";
import { useSession } from "next-auth/react";
import Image from "next/image";

import classes from "./WritePost.module.css";

const initialStyle = {
  height: "0px",
  resize: "none",
};

const WritePost = ({ style = initialStyle, post, postId }) => {
  const textareaRef = useRef(null);
  const imageRef = useRef();
  const [text, setText] = useState(post ? post.subject : "");
  const [postImage, setPostImage] = useState(null);
  const [showEmoji, setShowEmoji] = useState(false);
  const [createMode, setCreateMode] = useState(true);
  const [currentEmoji, setCurrentEmoji] = useState(null);
  const { data } = useSession();
  const user = data?.user;
  const pathname = usePathname();

  const dispatch = useDispatch();
  const router = useRouter();
  const { error, sendRequest, clearError } = useHttp();
  const [createPostLoading, setCreatePostLoading] = useState(false);

  useEffect(() => {
    if (post && postId) {
      setCreateMode(false);
    } else {
      setCreateMode(true);
    }
  }, [post, postId, createMode]);

  // get the image and convert it to file
  useEffect(() => {
    if (postId && post && post.photo && !createMode) {
      const url = `/img/postsImages/${post.photo}`;
      const fileName = post.photo;

      fetch(url).then(async (response) => {
        const contentType = response.headers.get("content-type");
        const blob = await response.blob();
        const file = new File([blob], fileName, { contentType });
        // access file here
        setPostImage(file);
      });
    }
  }, [post, postId, createMode]);

  const onImageChange = (e) => {
    if (e.target.files || e.target.files[0]) setPostImage(e.target.files[0]);
  };

  // auto height when there are a lot of text
  useEffect(() => {
    textareaRef.current.style.height = "0px";
    const scrollHeight = textareaRef.current.scrollHeight;
    textareaRef.current.style.height = scrollHeight + "px";
  }, [text]);

  // set selected emoji
  const onEmojiSelect = (e) => {
    setCurrentEmoji(e.native);
    setShowEmoji(false);
  };

  // set selected emoji in the right position
  useEffect(() => {
    if (currentEmoji) {
      const currentPosition = textareaRef.current.selectionStart;
      const textBefore = textareaRef.current.value.substring(
        0,
        currentPosition
      );
      const textAfter = textareaRef.current.value.substring(
        currentPosition,
        textareaRef.current.value.length
      );

      setText(textBefore + currentEmoji + textAfter);
      setCurrentEmoji(null);
    }
  }, [currentEmoji]);

  // create or update post
  const handleSubmitPost = async (e) => {
    e.preventDefault();

    if (text.trim().length === 0 && !postImage) {
      return;
    }

    let api;
    let method = "";
    if (createMode) {
      api = `/api/v1/posts`;
      method = "POST";
    } else {
      api = `/api/v1/posts/${postId}/update`;
      method = "PATCH";
    }

    try {
      setCreatePostLoading(true);
      const formData = new FormData();
      formData.append("subject", text);
      formData.append("photo", postImage);

      const { data } = await sendRequest(api, method, formData);

      if (createMode) {
        dispatch(addPostCreatedToPosts(data.post));
        if (pathname.includes(user.id)) {
          dispatch(addUserPostCreatedToUserPosts(data.post));
        }
      }

      setPostImage(null);
      setText("");
      if (!createMode) router.push(`/community/posts/${postId}`);
    } catch (error) {
      console.log(error);
    }
    setCreatePostLoading(false);
  };

  return (
    <>
      <ErrorModal error={error} onCancel={clearError} />

      <div className={classes["write-post"]}>
        <h2>{createMode ? "Share Your Ideas!" : "Update Your Post!"}</h2>

        <div className={classes["post-text"]}>
          <div>
            <Image
              src={`/img/usersImages/${user.photo}`}
              alt={user.name}
              width={250}
              height={250}
            />
          </div>

          <div>
            <textarea
              ref={textareaRef}
              style={style ? style : ""}
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="What's in your mind..."
            />
          </div>
        </div>

        <div className={classes.emoji}>
          <FaFaceSmile onClick={() => setShowEmoji((prev) => !prev)} />

          <ContentEnter show={showEmoji}>
            <div className={classes["emoji-picker"]}>
              <EmojiPicker
                data={data}
                previewPosition="none"
                onEmojiSelect={onEmojiSelect}
              />
            </div>
          </ContentEnter>
        </div>

        {postImage && (
          <div className={classes["img-preview"]}>
            <span title="delete photo" onClick={() => setPostImage(null)}>
              <FaRectangleXmark />
            </span>
            <Image
              width={100}
              height={100}
              style={{ objectFit: "cover" }}
              src={URL.createObjectURL(postImage)}
              alt="post"
            />
          </div>
        )}

        <div className={classes["post-activity"]}>
          <div onClick={() => imageRef.current.click()}>
            <FaImage />
            <span>Image</span>
          </div>
          <div>
            <Button
              onClick={handleSubmitPost}
              disabled={
                createPostLoading || (text.trim().length === 0 && !postImage)
              }
            >
              {createPostLoading ? "Loading..." : createMode ? "Share" : "Save"}
            </Button>
          </div>
          <div style={{ display: "none" }}>
            <input
              type="file"
              name="postImage"
              ref={imageRef}
              onChange={onImageChange}
              accept=".jpg,.png,.jpeg"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default WritePost;
