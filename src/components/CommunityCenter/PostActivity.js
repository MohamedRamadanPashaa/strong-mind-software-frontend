import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useHttp from "../../hooks/http-hook";
import ErrorModal from "../ErrorModal/ErrorModal";
import PostActivityDetails from "./PostActivityDetails";
import { replacePost } from "../../store/postSlice";
import { FaComment, FaHeart, FaShare } from "react-icons/fa";

import classes from "./PostActivity.module.css";
import { useSession } from "next-auth/react";

const PostActivity = ({
  likes,
  postId,
  getPostCommentsHandler,
  numberOfComments,
  setShowComments,
  showComments,
  posts,
}) => {
  const { data } = useSession();
  const user = data?.user;
  const [loved, setLoved] = useState(likes.includes(user?.id));
  const [likesNum, setLikesNum] = useState(likes.length);
  const { error, sendRequest, clearError } = useHttp();
  const dispatch = useDispatch();

  useEffect(() => {
    setLoved(likes.includes(user?.id));
  }, [user?.id, likes]);

  useEffect(() => {
    setLikesNum(likes.length);
  }, [likes]);

  const lovedHandler = async () => {
    setLoved((prev) => !prev);
    try {
      const { data } = await sendRequest(
        `/api/v1/posts/${postId}/like`,
        "PATCH"
      );
      loved ? setLikesNum((prev) => prev - 1) : setLikesNum((prev) => prev + 1);

      // update post in the state after add like
      if (posts?.length > 0) {
        const postIndex = posts.findIndex((post) => post._id === postId);
        dispatch(replacePost({ postIndex, newPost: data.newPost }));
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <ErrorModal error={error} onCancel={clearError} />

      <PostActivityDetails
        likes={likesNum}
        numberOfComments={numberOfComments}
      />
      <div className={classes.activity}>
        <div
          className={loved ? classes.loved : undefined}
          onClick={lovedHandler}
        >
          <FaHeart />
          {loved ? "Liked" : "Like"}
        </div>

        <div
          onClick={() => {
            if (showComments) {
              setShowComments(false);
              return;
            }

            getPostCommentsHandler();
          }}
        >
          <FaComment />
          comment
        </div>

        <div>
          <FaShare />
          share
        </div>
      </div>
    </>
  );
};

export default PostActivity;
