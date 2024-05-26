import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import PublisherDetails from "./PublisherDetails";
import ThreeDotsMenuComment from "./ThreeDotsMenuComment";
import { FaThumbsDown, FaThumbsUp } from "react-icons/fa";
import useHttp from "../../hooks/http-hook";
import ErrorModal from "../ErrorModal/ErrorModal";
import { replacePost } from "../../store/postSlice";
import { useSession } from "next-auth/react";

import classes from "./Comment.module.css";

const Comment = ({ comment, setComments, comments, posts }) => {
  const { data: auth } = useSession();
  const dispatch = useDispatch();
  const { _id, text, user, createdAt, likes, dislikes, photo } = comment;
  const [commentLiked, setCommentLiked] = useState(
    likes.includes(auth?.user?.id)
  );
  const [commentDisliked, setCommentDisliked] = useState(
    dislikes.includes(auth?.user?.id)
  );
  const [likesCount, setLikesCount] = useState(likes.length);
  const [dislikesCount, setDislikesCount] = useState(dislikes.length);
  const { error, sendRequest, clearError } = useHttp();

  useEffect(() => {
    setLikesCount(likes.length);
    setDislikesCount(dislikes.length);
  }, [likes.length, dislikes.length]);

  const commentLikeHandler = async () => {
    setCommentLiked((prev) => !prev);

    if (commentLiked) {
      setLikesCount((prev) => prev - 1);
    } else {
      setLikesCount((prev) => prev + 1);
    }

    if (commentDisliked) {
      setCommentDisliked(false);
      setDislikesCount((prev) => prev - 1);
    }

    try {
      const { data } = await sendRequest(
        `/api/v1/comments/like/${_id}/${comment.post}`,
        "PATCH"
      );

      // update comment in comments array after like
      const commentIndex = comments.findIndex((comment) => comment._id === _id);
      let newComments = [...comments];
      newComments[commentIndex] = data.newComment;
      setComments(newComments);

      // update post in the state after add comment dislike
      if (posts?.length > 0) {
        const postIndex = posts.findIndex((post) => post._id === comment.post);
        dispatch(replacePost({ postIndex, newPost: data.post }));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const commentDislikeHandler = async () => {
    setCommentDisliked((prev) => !prev);

    if (commentDisliked) {
      setDislikesCount((prev) => prev - 1);
    } else {
      setDislikesCount((prev) => prev + 1);
    }

    if (commentLiked) {
      setCommentLiked(false);
      setLikesCount((prev) => prev - 1);
    }

    try {
      const { data } = await sendRequest(
        `/api/v1/comments/dislike/${_id}/${comment.post}`,
        "PATCH"
      );

      // update comment in comments array after dislike
      const commentIndex = comments.findIndex((comment) => comment._id === _id);
      let newComments = [...comments];
      newComments[commentIndex] = data.newComment;
      setComments(newComments);

      // update post in the state after add comment dislike
      if (posts?.length > 0) {
        const postIndex = posts.findIndex((post) => post._id === comment.post);
        dispatch(replacePost({ postIndex, newPost: data.post }));
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <ErrorModal error={error} onCancel={clearError} />

      <div className={classes.comment}>
        <PublisherDetails
          img={user.photo}
          name={user.name}
          createdAt={createdAt}
          comment
        >
          <ThreeDotsMenuComment
            comment={comment}
            comments={comments}
            setComments={setComments}
          />
        </PublisherDetails>

        <div>
          <p>{text}</p>
        </div>

        {photo && (
          <div className={classes.photo}>
            <img src={`/img/commentsImages/${photo}`} alt={text} />
          </div>
        )}

        <div className={classes.activity}>
          <span className={classes.action}>{likesCount > 0 && likesCount}</span>
          <FaThumbsUp
            className={commentLiked ? classes.like : undefined}
            onClick={commentLikeHandler}
          />
          <span className={classes.action}>
            {dislikesCount > 0 && dislikesCount}
          </span>
          <FaThumbsDown
            className={commentDisliked ? classes.dislike : undefined}
            onClick={commentDislikeHandler}
          />
        </div>
      </div>
    </>
  );
};

export default Comment;
