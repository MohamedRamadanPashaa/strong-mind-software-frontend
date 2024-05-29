import PostActivityDetails from "../CommunityCenter/PostActivityDetails";
import PublisherDetailsNamePhoto from "../CommunityCenter/PublisherDetailsNamePhoto";
import ViewMore from "../FormElement/ViewMore";

import classes from "./Trends.module.css";

const Trends = ({ post }) => {
  return (
    <div className={classes.trends}>
      <PublisherDetailsNamePhoto
        img={
          post?.creator?.photo?.secure_url
            ? post.creator.photo.secure_url
            : `/img/usersImages/default.jpg`
        }
        name={post.creator.name}
        createdAt={post.createdAt}
        userId={post.creator._id}
        postId={post._id}
      />

      <div className={classes.subject}>
        <p>{post.subject}</p>
      </div>

      <PostActivityDetails
        likes={post.likes.length}
        numberOfComments={post.commentsCount}
      />

      <ViewMore to={`/community/posts/${post._id}`}>Read More...</ViewMore>
    </div>
  );
};

export default Trends;
