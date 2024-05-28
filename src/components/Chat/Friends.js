import { memo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { checkOnlineStatusHandler } from "../../helpers/checkOnlineStatus";
import useHttp from "../../hooks/http-hook";
import { setChats } from "../../store/chatSlice";
import ErrorModal from "../ErrorModal/ErrorModal";
import Friend from "./Friend";
import SectionHeader from "../CommunityLeft/SectionHeader";
import { useSession } from "next-auth/react";

import classes from "./Friends.module.css";

const Friends = ({ getChatMessages, markMessageAsRead }) => {
  const { chats, onlineUsers } = useSelector((state) => state.chat);
  const { data } = useSession();
  const user = data?.user;
  const dispatch = useDispatch();
  const { isLoading, error, sendRequest, clearError } = useHttp();

  // get user chat
  useEffect(() => {
    const getChats = async () => {
      try {
        const { data } = await sendRequest(`/api/v1/chats`);

        dispatch(setChats(data.chats));
      } catch (error) {
        console.log(error);
      }
    };

    getChats();
  }, [sendRequest, dispatch]);

  return (
    <>
      <ErrorModal error={error} onCancel={clearError} />

      <div className={classes.friends}>
        <div className={classes.title}>
          <SectionHeader>Friends</SectionHeader>
        </div>

        {chats && chats.length > 0 && (
          <div className={classes["friends-list"]}>
            {chats.map((chat) => (
              <Friend
                key={chat._id}
                chat={chat}
                onlineStatus={checkOnlineStatusHandler(chat, onlineUsers, user)}
                getChatMessages={getChatMessages}
                markMessageAsRead={markMessageAsRead}
              />
            ))}
          </div>
        )}

        {!isLoading && chats.length === 0 && (
          <p className={classes["no-users"]}>
            You don&#39;t have friends yet, start follow other to see them here.
          </p>
        )}
      </div>
    </>
  );
};

export default memo(Friends);
