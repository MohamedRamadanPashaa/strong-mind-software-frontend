import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getKFollowers } from "../../helpers/getKFollowers";
import useHttp from "../../hooks/http-hook";
import {
  resetUnreadMessage,
  setActiveChat,
  setChatMessages,
  setCountMessages,
  setMessageFromSocket,
  setMessageLoading,
  setUnreadMessage,
  sortChatAfterMessage,
} from "../../store/chatSlice";
import ErrorModal from "../ErrorModal/ErrorModal";
import FollowButton from "./FollowButton";
import { socket } from "../../helpers/socket";
import { useRouter } from "next/navigation";
import Link from "next/link";

import classes from "./People.module.css";
import Image from "next/image";
import { getImageLink } from "@/helpers/GetImageLink";

const People = ({ friend, chat, onlineStatus, unreadCount }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { error, sendRequest, clearError } = useHttp();
  const { activeChat, chats } = useSelector((state) => state.chat);

  // mark message read by focus the input message
  const markMessageAsRead = async (chatId = activeChat._id) => {
    const unreadMsg = chats.filter((chat) => chat.unreadCount > 0);
    if (unreadMsg.length === 0) return;

    try {
      await sendRequest(`/api/v1/messages/${chatId}`, "PATCH");

      dispatch(resetUnreadMessage(chatId));

      socket.emit("send-display", {
        chat: chatId,
        receiverId: friend._id,
        displayedAt: new Date(),
      });
    } catch (error) {
      console.log(error);
    }
  };

  // get chat messages
  const getChatMessages = async (chatId) => {
    dispatch(setMessageLoading(true));

    try {
      const { data } = await sendRequest(`/api/v1/messages/${chatId}`);

      dispatch(setChatMessages(data.messages));
      dispatch(setMessageLoading(false));
      dispatch(setCountMessages(data.countMessages));
    } catch (error) {
      console.log(error);
    }
  };

  // When click on message button set active chat
  const setActiveChatHandler = async () => {
    if (chat) {
      dispatch(setActiveChat({ ...chat, friendId: friend._id }));
      // to remove any upcoming message if i router to chat
      dispatch(setMessageFromSocket(null));
      await getChatMessages(chat._id);
      await markMessageAsRead(chat._id);
      router.push("/community/chat");
    }
  };

  // get active chat and redirect to chat page and open this chat
  const getActiveChat = async () => {
    try {
      const { data } = await sendRequest(`/api/v1/chats/${friend._id}`);

      dispatch(setActiveChat({ ...data.chat[0], friendId: friend._id }));
      await getChatMessages(data.chat[0]._id);

      router.push("/community/chat");
    } catch (error) {
      console.log(error);
    }
  };

  // receive message from socket
  useEffect(() => {
    socket.on("receiver-unread", (data) => {
      dispatch(sortChatAfterMessage(data.chat));
      dispatch(setUnreadMessage(data));
    });
  }, [dispatch]);

  return (
    <>
      <ErrorModal error={error} onCancel={clearError} />

      <div
        className={`${classes.follower} ${chat ? classes.chat : undefined} ${
          unreadCount > 0 ? classes["unread-message"] : undefined
        }`}
        onClick={setActiveChatHandler}
      >
        <div className={classes["follower-info"]}>
          <div
            className={`${classes["follower-img"]} ${
              chat ? classes.img : undefined
            } ${onlineStatus && chat ? classes.online : undefined}`}
          >
            <Image
              src={`${getImageLink()}/usersImages/${friend.photo}`}
              alt={friend.name}
              width={150}
              height={150}
            />
          </div>

          <div className={classes["follower-text"]}>
            {!chat && (
              <h3 title={friend.name}>
                <Link href={`/community/${friend._id}`}>{friend.name}</Link>
              </h3>
            )}

            {chat && (
              <h3 title={friend.name}>
                <span>{friend.name}</span>
              </h3>
            )}

            <p>
              {getKFollowers(friend?.followers?.length)} Follower
              {friend.followers > 1 ? "s" : ""}
            </p>
          </div>
        </div>

        {!chat && (
          <FollowButton
            friend={friend}
            chat={chat}
            getActiveChat={getActiveChat}
          />
        )}

        {unreadCount > 0 && (
          <div className={classes["unread-count"]}>
            {unreadCount <= 10 ? unreadCount : "10+"}
          </div>
        )}
      </div>
    </>
  );
};

export default People;
