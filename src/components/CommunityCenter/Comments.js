import { useRef } from "react";
import ViewMore from "../FormElement/ViewMore";
import ContentEnter from "../UIElements/ContentEnter";
import Comment from "./Comment";

import classes from "./Comments.module.css";

const Comments = ({
  comments,
  setComments,
  noOfComments,
  setNoOfCommentsToShowHandler,
  isLoading,
  posts,
}) => {
  const nodeRef = useRef(null);

  return (
    <div className={classes.comments}>
      {comments.map((comment) => (
        <Comment
          key={comment._id}
          comment={comment}
          setComments={setComments}
          comments={comments}
          noOfComments={noOfComments}
          posts={posts}
        />
      ))}

      <ContentEnter show={comments.length < noOfComments} nodeRef={nodeRef}>
        <ViewMore onClick={setNoOfCommentsToShowHandler} nodeRef={nodeRef}>
          {isLoading ? "Loading..." : "More Comments..."}
        </ViewMore>
      </ContentEnter>
    </div>
  );
};

export default Comments;
