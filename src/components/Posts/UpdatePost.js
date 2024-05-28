import WritePost from "../CommunityCenter/WritePost";

import classes from "./UpdatePost.module.css";

const UpdatePost = ({ post, postId }) => {
  return (
    <div className="bg">
      <div className={classes["update-post"]}>
        <WritePost post={post} postId={postId} />
      </div>
    </div>
  );
};

export default UpdatePost;
