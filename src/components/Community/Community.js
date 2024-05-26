"use client";

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import classes from "./Community.module.css";
import { useSession } from "next-auth/react";
import useHttp from "@/hooks/http-hook";
import ErrorModal from "../ErrorModal/ErrorModal";
import Left from "../CommunityLeft/Left";
import Center from "../CommunityCenter/Center";
import Right from "../CommunityRight/Right";
import CommunityBar from "../CommunityBar/CommunityBar";
import ContentEnter from "../UIElements/ContentEnter";
import Loading from "../UIElements/Loading";
import { socket } from "@/helpers/socket";
import { setChats, setOnlineUsers } from "@/store/chatSlice";

const Community = () => {
  const { data, status } = useSession();
  const user = data?.user;
  const { error, sendRequest, clearError } = useHttp();

  const dispatchRedux = useDispatch();

  // get all chats
  useEffect(() => {
    const getChats = async () => {
      try {
        const { data } = await sendRequest(`/api/v1/chats`);

        dispatchRedux(setChats(data.chats));
      } catch (error) {
        console.log(error);
      }
    };

    getChats();
  }, [sendRequest, dispatchRedux]);

  // connect with socket at backend
  useEffect(() => {
    // send userId to socket to add to active users and back with active users
    if (user) {
      socket.emit("new-user-add", user.id);

      socket.on("get-users", (users) => {
        dispatchRedux(setOnlineUsers(users));
      });
    }
  }, [user, dispatchRedux]);

  const [currentPage, setCurrentPage] = useState(2);

  const navigateToPage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  if (status === "loading") return <Loading center />;

  return (
    <>
      <ErrorModal error={error} onCancel={clearError} />

      <div className={classes.mainCommunity}>
        <div className={`${classes.community} ${classes["community-big"]}`}>
          <Left />
          <Center />
          <Right />
        </div>

        <div className={`${classes["community-sm"]} ${classes.community}`}>
          <CommunityBar
            navigateToPage={navigateToPage}
            currentPage={currentPage}
          />

          <ContentEnter show={currentPage === 1}>
            <Left />
          </ContentEnter>

          <ContentEnter show={currentPage === 2}>
            <Center />
          </ContentEnter>

          <ContentEnter show={currentPage === 3}>
            <Right />
          </ContentEnter>
        </div>
      </div>
    </>
  );
};

export default Community;
