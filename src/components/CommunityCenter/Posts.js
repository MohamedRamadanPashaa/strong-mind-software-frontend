import Post from "./Post";

import classes from "./Posts.module.css";

const Posts = ({ posts, postsLoading }) => {
  return (
    <>
      <div className={classes.posts}>
        {posts.map((post, index) => (
          <Post key={index} {...post} posts={posts} />
        ))}
      </div>

      {posts.length === 0 && !postsLoading && (
        <div className={classes["no-posts"]}>No Posts to Show</div>
      )}
    </>
  );
};

export default Posts;
