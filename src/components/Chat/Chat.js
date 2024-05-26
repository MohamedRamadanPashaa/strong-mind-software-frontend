"use client";

import { useDispatch, useSelector } from "react-redux";
import ChatBox from "../Chat/ChatBox";
import Friends from "../Chat/Friends";
import { memo, useEffect } from "react";
import {
  addMessageToChatMessages,
  resetUnreadMessage,
  setChatMessages,
  setCountMessages,
  setDeletedMsgFromSocket,
  setDeletedMsgToSocket,
  setDisplayFromSocket,
  setMessageFromSocket,
  setMessageLoading,
  setMessageToSocket,
  setOnlineUsers,
  setUnreadMessage,
  setUnreadToMessageSocket,
  sortChatAfterMessage,
} from "@/store/chatSlice";
import ErrorModal from "../ErrorModal/ErrorModal";

import classes from "./Chat.module.css";
import useHttp from "@/hooks/http-hook";
import { socket } from "@/helpers/socket";
import { useSession } from "next-auth/react";
import Loading from "../UIElements/Loading";

const Chat = () => {
  const {
    activeChat,
    chats,
    messageToSocket,
    messageFromSocket,
    unreadToMessageSocket,
    onlineUsers,
    deletedMsgToSocket,
    deletedMsgFromSocket,
    chatMessages,
  } = useSelector((state) => state.chat);
  const { data, status } = useSession();
  const user = data?.user;
  const { error, sendRequest, clearError } = useHttp();

  const dispatchRedux = useDispatch();

  // update online users once navigate to the chat box
  useEffect(() => {
    // send userId to socket to add to active users and back with active users
    socket.emit("new-user-add", user?.id);

    socket.on("get-users", (users) => {
      dispatchRedux(setOnlineUsers(users));
    });
  }, [user, dispatchRedux]);

  // send message to socket
  useEffect(() => {
    if (messageToSocket) {
      socket.emit("send-message", messageToSocket);
      dispatchRedux(setMessageToSocket(null));
    }
  }, [dispatchRedux, messageToSocket, onlineUsers]);

  // send unread count message to server
  useEffect(() => {
    if (unreadToMessageSocket) {
      socket.emit("send-unread", unreadToMessageSocket);
      dispatchRedux(setUnreadToMessageSocket(null));
    }
  }, [unreadToMessageSocket, dispatchRedux]);

  // receive message from socket
  useEffect(() => {
    socket.on("receiver-message", (data) => {
      dispatchRedux(setMessageFromSocket(data));
      dispatchRedux(sortChatAfterMessage(data.chat));
      dispatchRedux(setUnreadMessage(data));
    });
  }, [dispatchRedux]);

  useEffect(() => {
    socket.on("receiver-display", (data) => {
      dispatchRedux(setDisplayFromSocket(data));
    });
  }, [dispatchRedux]);

  // add receive message to messages
  useEffect(() => {
    if (messageFromSocket && messageFromSocket.chat === activeChat?._id) {
      dispatchRedux(addMessageToChatMessages(messageFromSocket));

      dispatchRedux(setMessageFromSocket(null));
    }
  }, [messageFromSocket, activeChat, dispatchRedux]);

  // send deleted message to socket
  useEffect(() => {
    if (deletedMsgToSocket) {
      socket.emit("send-deleted-message", deletedMsgToSocket);
      dispatchRedux(setDeletedMsgToSocket(null));
    }
  }, [deletedMsgToSocket, dispatchRedux]);

  // receive deleted message from socket
  useEffect(() => {
    socket.on("receiver-deleted-message", (data) => {
      dispatchRedux(setDeletedMsgFromSocket(data));
    });
  }, [dispatchRedux]);

  // add receive message to messages
  useEffect(() => {
    if (deletedMsgFromSocket && deletedMsgFromSocket.chat === activeChat?._id) {
      // find index in chat messages
      const deletedMessageIndex = chatMessages.findIndex(
        (m) => m._id === deletedMsgFromSocket._id
      );

      // change deleted message with new message
      let newMessages = [...chatMessages];
      if (deletedMessageIndex !== -1) {
        newMessages[deletedMessageIndex] = deletedMsgFromSocket;
      }

      // set new chat messages
      dispatchRedux(setChatMessages(newMessages));

      // reset deleted message from socket after added to chat messages
      dispatchRedux(setDeletedMsgFromSocket(null));
    }
  }, [deletedMsgFromSocket, activeChat, chatMessages, dispatchRedux]);

  // mark message read by focus the input message
  const markMessageAsRead = async (chatId = activeChat._id) => {
    const unreadMsg = chats.filter((chat) => chat.unreadCount > 0);
    if (unreadMsg.length === 0) return;

    try {
      await sendRequest(`/api/v1/messages/${chatId}`, "PATCH");
      dispatchRedux(resetUnreadMessage(chatId));

      socket.emit("send-display", {
        chat: chatId,
        receiverId: chats
          .find((c) => c._id === chatId)
          .members.find((u) => u._id !== user.id)._id,
        displayedAt: new Date(),
      });
    } catch (error) {
      console.log(error);
    }
  };

  // get chat messages
  const getChatMessages = async (chatId, limit) => {
    dispatchRedux(setMessageLoading(true));

    try {
      const { data } = await sendRequest(
        `/api/v1/messages/${chatId}?messageLimit=${limit || 20}`
      );

      dispatchRedux(setChatMessages(data.messages));
      dispatchRedux(setMessageLoading(false));
      dispatchRedux(setCountMessages(data.countMessages));
    } catch (error) {
      console.log(error);
    }
  };

  if (status === "loading") return <Loading center />;

  return (
    <div className={classes.chat}>
      <ErrorModal error={error} onCancel={clearError} />
      <Friends
        getChatMessages={getChatMessages}
        markMessageAsRead={markMessageAsRead}
      />

      <ChatBox markMessageAsRead={markMessageAsRead} />
    </div>
  );
};

export default memo(Chat);
