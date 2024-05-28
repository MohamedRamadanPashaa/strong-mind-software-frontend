"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Posts from "../CommunityCenter/Posts";
import WritePost from "../CommunityCenter/WritePost";
import ErrorModal from "../ErrorModal/ErrorModal";
import Header from "../PersonalPage/Header";
import ContentEnter from "../UIElements/ContentEnter";
import useHttp from "@/hooks/http-hook";
import { useSession } from "next-auth/react";
import { setUserPosts, setUserPostsLoading } from "@/store/postSlice";
import Loading from "../UIElements/Loading";

import classes from "./PersonalPage.module.css";

const PersonalPage = ({ userId }) => {
  const { data, status } = useSession();
  const user = data?.user;
  const { userPosts, userPostsLoading } = useSelector((state) => state.post);
  const dispatch = useDispatch();
  const [currentUser, setCurrentUser] = useState(null);
  const [currentUserLoading, setCurrentUserLoading] = useState(true);

  const { error, sendRequest, clearError } = useHttp();
  const nodeRef = useRef(null);

  const getPosts = useCallback(async () => {
    dispatch(setUserPostsLoading(true));
    try {
      const { data } = await sendRequest(`/api/v1/posts/${userId}`);

      dispatch(setUserPosts(data.posts));
      dispatch(setUserPostsLoading(false));
    } catch (error) {
      console.log(error);
    }
  }, [sendRequest, dispatch, userId]);

  useEffect(() => {
    getPosts();
  }, [getPosts]);

  useEffect(() => {
    const getCurrentUser = async () => {
      setCurrentUserLoading(true);
      try {
        const user = await sendRequest(`/api/v1/users/${userId}`);

        setCurrentUser(user.data);
      } catch (error) {
        console.log(error);
      }
      setCurrentUserLoading(false);
    };

    getCurrentUser();
  }, [userId, sendRequest]);

  if (status === "loading") return <Loading center />;

  return (
    <>
      <ErrorModal error={error} onCancel={clearError} />

      <ContentEnter
        show={!currentUserLoading && !userPostsLoading && currentUser !== null}
        nodeRef={nodeRef}
      >
        <div className={classes.bg} ref={nodeRef}>
          <div className={classes["personal-page"]}>
            <Header currentUser={currentUser} />

            {user.id === userId && (
              <div className={classes["write-post"]}>
                <WritePost />
              </div>
            )}

            <div className={classes.posts}>
              <Posts posts={userPosts} postsLoading={userPostsLoading} />
            </div>
          </div>
        </div>
      </ContentEnter>
    </>
  );
};

export default PersonalPage;
