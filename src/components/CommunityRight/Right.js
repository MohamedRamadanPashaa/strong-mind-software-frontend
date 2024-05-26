import Trends from "./Trends";
import useHttp from "../../hooks/http-hook";
import { memo, useEffect } from "react";
import ErrorModal from "../ErrorModal/ErrorModal";
import SectionHeader from "../CommunityLeft/SectionHeader";
import { useDispatch, useSelector } from "react-redux";
import { setPopularPosts, setPopularPostsLoading } from "../../store/postSlice";

import classes from "./Right.module.css";

const Right = () => {
  const { error, sendRequest, clearError } = useHttp();
  const { popularPosts, popularPostsLoading } = useSelector(
    (state) => state.post
  );
  const dispatch = useDispatch();

  useEffect(() => {
    const getMostPopularPosts = async () => {
      dispatch(setPopularPostsLoading(true));
      try {
        const { data } = await sendRequest(`/api/v1/posts/most-popular-posts`);

        dispatch(setPopularPosts(data.posts));
        dispatch(setPopularPostsLoading(false));
      } catch (error) {
        console.log(error);
      }
    };

    getMostPopularPosts();
  }, [sendRequest, dispatch]);

  return (
    <>
      <ErrorModal error={error} onCancel={clearError} />

      <div className={classes.right}>
        <div>
          <SectionHeader>Most Popular Posts</SectionHeader>
        </div>
        {popularPosts.length > 0 &&
          popularPosts.map((post) => <Trends key={post._id} post={post} />)}
      </div>
    </>
  );
};

export default memo(Right);
