import { memo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import useHttp from "../../hooks/http-hook";
import { setAllPosts, setPostsLoading } from "../../store/postSlice";
import Posts from "./Posts";
import WritePost from "./WritePost";
import ErrorModal from "../ErrorModal/ErrorModal";

import classes from "./Center.module.css";

const Center = () => {
  const dispatch = useDispatch();
  const { error, sendRequest, clearError } = useHttp();
  const { posts, postsLoading } = useSelector((state) => state.post);

  useEffect(() => {
    const getPosts = async () => {
      dispatch(setPostsLoading(true));

      try {
        const { data } = await sendRequest(`/api/v1/posts`);

        dispatch(setAllPosts(data.posts));
        dispatch(setPostsLoading(false));
      } catch (error) {
        console.log(error);
      }
    };

    getPosts();
  }, [sendRequest, dispatch]);

  return (
    <>
      <ErrorModal error={error} onCancel={clearError} />

      <div className={classes.center}>
        <WritePost />
        {posts.length > 0 && (
          <Posts posts={posts} postsLoading={postsLoading} />
        )}
      </div>
    </>
  );
};

export default memo(Center);
