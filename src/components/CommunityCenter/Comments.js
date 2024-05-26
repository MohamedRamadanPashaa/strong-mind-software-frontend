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

      <ContentEnter show={comments.length < noOfComments}>
        <ViewMore onClick={setNoOfCommentsToShowHandler}>
          {isLoading ? "Loading..." : "More Comments..."}
        </ViewMore>
      </ContentEnter>
    </div>
  );
};

export default Comments;
