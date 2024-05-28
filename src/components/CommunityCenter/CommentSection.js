import { useCallback, useEffect, useRef, useState } from "react";

import Comments from "./Comments";
import PostActivity from "./PostActivity";
import CommentForm from "./CreateDocsForm";
import useHttp from "../../hooks/http-hook";
import Loading from "../UIElements/Loading";
import { useDispatch } from "react-redux";
import { replacePost } from "../../store/postSlice";
import ErrorModal from "../ErrorModal/ErrorModal";
import ContentEnter from "../UIElements/ContentEnter";

let noOfCommentsToShow = 2;

const CommentSection = ({
  likes,
  postId,
  numberOfComments,
  onePostDetails,
  posts,
}) => {
  const { isLoading, error, sendRequest, clearError } = useHttp();
  const [comments, setComments] = useState([]);
  const [noOfComments, setNoOfComments] = useState(numberOfComments);
  const [showComments, setShowComments] = useState(false);
  const [createCommentLoading, setCreateCommentLoading] = useState(false);
  const dispatch = useDispatch();
  const nodeRef = useRef();

  useEffect(() => {
    setNoOfComments(numberOfComments);
  }, [numberOfComments]);

  useEffect(() => {
    setComments([]);
    setShowComments(false);
  }, []);

  const getPostCommentsHandler = useCallback(async () => {
    setShowComments(true);

    if (comments.length === 0) {
      noOfCommentsToShow = 2;
    }

    try {
      const { data } = await sendRequest(
        `/api/v1/comments/${postId}?commentLimit=${noOfCommentsToShow}`
      );

      setComments(data.comments);
      setNoOfComments(data.noOfComments);
    } catch (error) {
      console.log(error);
    }
  }, [comments.length, postId, sendRequest]);

  const setNoOfCommentsToShowHandler = () => {
    noOfCommentsToShow += 5;
    getPostCommentsHandler();
  };

  useEffect(() => {
    if (onePostDetails) {
      getPostCommentsHandler();
    }
  }, [onePostDetails, getPostCommentsHandler]);

  const createCommentHandler = async (commentText, commentImage) => {
    if (commentText.trim().length < 1 && !commentImage) return;

    const formData = new FormData();
    formData.append("text", commentText);
    formData.append("photo", commentImage);

    setCreateCommentLoading(true);
    try {
      const { data } = await sendRequest(
        `/api/v1/comments/${postId}`,
        "POST",
        formData
      );

      // update post in the state after add comment
      if (posts?.length > 0) {
        const postIndex = posts.findIndex((post) => post._id === postId);
        dispatch(replacePost({ postIndex, newPost: data.newPost }));
      }

      setCreateCommentLoading(false);
      setNoOfComments((prev) => prev + 1);
      setComments([data.comment, ...comments]);
      noOfCommentsToShow += 1;
    } catch (error) {
      console.log(error);
      setCreateCommentLoading(false);
    }
  };

  return (
    <>
      <ErrorModal error={error} onCancel={clearError} />

      <PostActivity
        likes={likes}
        postId={postId}
        getPostCommentsHandler={getPostCommentsHandler}
        showComments={showComments}
        setShowComments={setShowComments}
        numberOfComments={noOfComments}
        posts={posts}
      />

      <ContentEnter show={showComments} nodeRef={nodeRef}>
        <div ref={nodeRef}>
          <CommentForm
            postId={postId}
            isLoading={isLoading && createCommentLoading}
            createDocHandler={createCommentHandler}
            placeholder="Comment..."
          />
        </div>
      </ContentEnter>

      {showComments &&
        isLoading &&
        !createCommentLoading &&
        comments.length === 0 && (
          <div className="loading-center">
            <Loading />
          </div>
        )}

      <ContentEnter
        nodeRef={nodeRef}
        show={comments.length > 0 && showComments}
      >
        <div ref={nodeRef}>
          <Comments
            comments={comments}
            setComments={setComments}
            noOfComments={numberOfComments}
            setNoOfCommentsToShowHandler={setNoOfCommentsToShowHandler}
            isLoading={isLoading && !createCommentLoading}
            posts={posts}
          />
        </div>
      </ContentEnter>

      <ContentEnter
        show={numberOfComments === 0 && showComments && !isLoading}
        nodeRef={nodeRef}
      >
        <div ref={nodeRef}>
          <p className="no-comment">No Comments On This Post.</p>
        </div>
      </ContentEnter>
    </>
  );
};

export default CommentSection;
