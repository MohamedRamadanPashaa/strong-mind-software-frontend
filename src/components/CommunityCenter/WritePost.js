"use client";

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
import { getImageLink } from "@/helpers/GetImageLink";

import classes from "./WritePost.module.css";
import Loading from "../UIElements/Loading";

const initialStyle = {
  height: "auto",
  resize: "none",
};

const WritePost = ({ style = initialStyle, post, postId }) => {
  const textareaRef = useRef(null);
  const nodeRef = useRef(null);
  const imageRef = useRef();
  const [text, setText] = useState(post?.subject || "");
  const [postImage, setPostImage] = useState(null);
  const [showEmoji, setShowEmoji] = useState(false);
  const [createMode, setCreateMode] = useState(true);
  const [currentEmoji, setCurrentEmoji] = useState(null);
  const { data, status } = useSession();
  const user = data?.user;
  const pathname = usePathname();
  const [imgSrc, setImgSrc] = useState(
    post?.photo ? `${getImageLink()}/postsImages/${post?.photo}` : ""
  );

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

  const onImageChange = (e) => {
    if (e.target.files || e.target.files[0]) {
      setPostImage(e.target.files[0]);
      setImgSrc(URL.createObjectURL(e.target.files[0]));
    }
  };

  // auto height when there are a lot of text
  useEffect(() => {
    if (!textareaRef.current) return;

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
      formData.append(
        "photo",
        postImage ? postImage : imgSrc ? post.photo : ""
      );

      const { data } = await sendRequest(api, method, formData);

      if (createMode) {
        dispatch(addPostCreatedToPosts(data.post));
        if (pathname.includes(user.id)) {
          dispatch(addUserPostCreatedToUserPosts(data.post));
        }
      }

      setPostImage(null);
      setText("");
      setImgSrc("");
      if (!createMode) router.push(`/community/posts/${postId}`);
    } catch (error) {
      console.log(error);
    }
    setCreatePostLoading(false);
  };

  if (status === "loading") return <Loading center />;

  return (
    <>
      <ErrorModal error={error} onCancel={clearError} />

      <div className={classes["write-post"]}>
        <h2>{createMode ? "Share Your Ideas!" : "Update Your Post!"}</h2>

        <div className={classes["post-text"]}>
          <div>
            <Image
              src={`${getImageLink()}/usersImages/${user.photo}`}
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

          <ContentEnter show={showEmoji} nodeRef={nodeRef}>
            <div className={classes["emoji-picker"]} ref={nodeRef}>
              <EmojiPicker
                data={data}
                previewPosition="none"
                onEmojiSelect={onEmojiSelect}
              />
            </div>
          </ContentEnter>
        </div>

        {imgSrc && (
          <div className={classes["img-preview"]}>
            <span
              title="delete photo"
              onClick={() => {
                setPostImage(null);
                setImgSrc("");
              }}
            >
              <FaRectangleXmark />
            </span>
            <Image
              width={100}
              height={100}
              style={{ objectFit: "cover" }}
              src={imgSrc}
              alt="post image"
              priority
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
