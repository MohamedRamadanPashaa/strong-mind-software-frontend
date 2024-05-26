"use client";

import { useEffect, useState } from "react";
import useHttp from "../../hooks/http-hook";
import Post from "../CommunityCenter/Post";
import ErrorModal from "../ErrorModal/ErrorModal";

import classes from "./OnePostDetails.module.css";

const OnePostDetails = ({ postId }) => {
  const [post, setPost] = useState(null);
  const { error, sendRequest, clearError } = useHttp();

  useEffect(() => {
    const getPost = async () => {
      const { data } = await sendRequest(`/api/v1/posts/${postId}/get-post`);

      setPost(data.post);
    };

    getPost();
  }, [sendRequest, postId]);

  return (
    <>
      <ErrorModal error={error} onCancel={clearError} />

      <div className={classes.bg}>
        {post && (
          <div className={classes["one-post-details"]}>
            <Post {...post} onePostDetails={true} onePost={true} />
          </div>
        )}
      </div>
    </>
  );
};

export default OnePostDetails;
