import { memo, useEffect, useRef, useState } from "react";
import ChatBoxHead from "./ChatBoxHead";
import useHttp from "../../hooks/http-hook";
import Message from "./Message";
import MessageForm from "../CommunityCenter/CreateDocsForm";
import ErrorModal from "../ErrorModal/ErrorModal";
import ContentEnter from "../UIElements/ContentEnter";
import {
  resetUnreadMessage,
  setActiveChat,
  setChatMessages,
  setDelivered,
  setMessageToSocket,
  setUnreadToMessageSocket,
  sortChatAfterMessage,
} from "../../store/chatSlice";
import ViewMore from "../FormElement/ViewMore";
import { useSession } from "next-auth/react";
import { FaCircleDown } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import ScrollToBottomTransition from "../UIElements/ScrollToBottomTransition";
import { checkDate } from "../../helpers/checkDate";

import classes from "./ChatBox.module.css";

const ChatBox = ({ markMessageAsRead }) => {
  const {
    activeChat,
    activeFriend,
    chatMessages,
    messageLoading,
    countMessages,
    onlineUsers,
  } = useSelector((state) => state.chat);
  const { data } = useSession();
  const user = data?.user;
  const { error, sendRequest, clearError } = useHttp();
  const [noscroll, setNoScroll] = useState(false);
  const [moreMessageLoading, setMoreMessageLoading] = useState(false);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [messageLimit, setMessageLimit] = useState(30);
  const [createMessageLoading, setCreateMessageLoading] = useState(false);
  const dispatchRedux = useDispatch();
  const chatContainerRef = useRef(null);
  const nodeRef = useRef(null);

  useEffect(() => {
    if (activeFriend) {
      const onlineUser = onlineUsers.find((u) => u.userId === activeFriend._id);

      if (onlineUser) {
        dispatchRedux(setDelivered());
      }
    }
  }, [onlineUsers, activeFriend, dispatchRedux]);

  const createMessageHandler = async (messageText, messageImage) => {
    if (messageText.trim().length < 1 && !messageImage) return;

    setCreateMessageLoading(true);
    setNoScroll(false);
    try {
      const formData = new FormData();
      formData.append("text", messageText);
      formData.append("photo", messageImage);
      formData.append("receiver", activeFriend._id);

      const onlineFriend = onlineUsers.find(
        (u) => u.userId === activeFriend._id
      );

      if (onlineFriend) {
        formData.append("delivered", true);
        formData.append("deliveredAt", new Date(new Date().getTime() + 1000));
      }

      // arr message before sent to DB
      const createdAt = new Date().toISOString();
      const messageId = Math.random();
      let newChatMessages = [
        ...chatMessages,
        {
          text: messageText,
          // photo: messageImage,
          createdAt,
          chat: activeChat._id,
          _id: messageId,
          // messageToBeCreating: messageId,
          sender: user.id,
          receiver: activeFriend._id,
        },
      ];

      // when send message set all friend messages to read
      newChatMessages = newChatMessages.map((m) =>
        !m.read && m.sender === activeFriend._id
          ? { ...m, read: true }
          : { ...m }
      );

      dispatchRedux(setChatMessages(newChatMessages));

      const { data } = await sendRequest(
        `/api/v1/messages/${activeChat._id}`,
        "POST",
        formData
      );

      // update message after saving in DB
      let newChatMessagesSent = [...newChatMessages];
      const messageSentBeforeIndex = newChatMessagesSent.findIndex(
        (m) => m.createdAt === createdAt && m._id === messageId
      );

      if (messageSentBeforeIndex !== -1) {
        newChatMessagesSent[messageSentBeforeIndex] = data.message;
      }

      dispatchRedux(setChatMessages(newChatMessagesSent));

      dispatchRedux(
        setMessageToSocket({
          ...data.message,
          receiverId: activeFriend._id,
          unreadCount: data.unreadCount,
        })
      );

      dispatchRedux(
        setUnreadToMessageSocket({
          unreadCount: data.unreadCount,
          receiverId: activeFriend._id,
          chat: data.message.chat,
        })
      );

      dispatchRedux(sortChatAfterMessage(data.message.chat));

      // update active chat to update unreadCount = 0 once user sent message after create
      dispatchRedux(setActiveChat({ ...activeChat, unreadCount: 0 }));
      // reset unread message to zero
      dispatchRedux(resetUnreadMessage(activeChat._id));
    } catch (error) {
      console.log(error);
    }

    setCreateMessageLoading(false);
  };

  // handle scroll
  // ID of the unread message
  const unreadMessageId = "unReadMsg";
  // ID of the last message
  const lastMessageId = chatMessages.length > 0 && chatMessages.length - 1;

  useEffect(() => {
    if (!noscroll) {
      const unreadMessageElement = document.querySelector(
        `[data-message-id="${unreadMessageId}"]`
      );

      const lastMessageElement = document.querySelector(
        `[data-message-id="${lastMessageId}"]`
      );

      if (unreadMessageElement) {
        unreadMessageElement.scrollIntoView({ behavior: "smooth" });
      } else if (lastMessageElement) {
        lastMessageElement.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [unreadMessageId, lastMessageId, noscroll]);

  useEffect(() => {
    const handleScroll = () => {
      const distanceFromBottom =
        chatContainerRef.current.scrollHeight -
        chatContainerRef.current.scrollTop -
        chatContainerRef.current.clientHeight;

      setShowScrollButton(distanceFromBottom > 150);
    };

    const currentChatContainer = chatContainerRef.current;

    chatContainerRef.current?.addEventListener("scroll", handleScroll);

    return () => {
      currentChatContainer?.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleScrollButtonClick = () => {
    chatContainerRef.current.scrollTo({
      top: chatContainerRef.current.scrollHeight,
      behavior: "smooth",
    });
  };

  // get chat messages
  const getChatMessages = async (chatId) => {
    setMoreMessageLoading(true);
    setNoScroll(true);

    try {
      const { data } = await sendRequest(
        `/api/v1/messages/${chatId}?messageLimit=${messageLimit}`
      );

      dispatchRedux(setChatMessages(data.messages));
    } catch (error) {
      console.log(error);
    }

    setMoreMessageLoading(false);
  };

  return (
    <>
      <ErrorModal error={error} onCancel={clearError} />

      <div className={classes["chat-box"]}>
        {activeChat && <ChatBoxHead />}

        {!messageLoading && chatMessages.length > 0 && (
          <div
            className={classes.messages}
            ref={chatContainerRef}
            id="chatContainer"
          >
            {chatMessages.length < countMessages && (
              <ViewMore
                onClick={async () => {
                  setMessageLimit((prev) => prev + 10);
                  await getChatMessages(activeChat._id);
                }}
              >
                {moreMessageLoading ? "Loading..." : "View More"}
              </ViewMore>
            )}

            {chatMessages.map((message, index) => (
              <Message
                key={message._id}
                message={message}
                chatMessages={chatMessages}
                setChatMessages={setChatMessages}
                createMessageLoading={createMessageLoading}
                unReadMessage={chatMessages.find((m) => !m.read)}
                todayMessage={chatMessages.find(
                  (m) => checkDate(m.createdAt) === "Today"
                )}
                yesterdayMessage={chatMessages.find(
                  (m) => checkDate(m.createdAt) === "Yesterday"
                )}
                pastMessage={chatMessages.find(
                  (m) => checkDate(m.createdAt) === "Past"
                )}
                index={index}
              />
            ))}

            <ScrollToBottomTransition show={showScrollButton}>
              <div
                className={classes["to-bottom"]}
                onClick={handleScrollButtonClick}
              >
                <FaCircleDown />
              </div>
            </ScrollToBottomTransition>
          </div>
        )}

        {activeChat && messageLoading && (
          <div className={classes.messages}>
            <p className={classes["no-active-chat"]}>Loading...</p>
          </div>
        )}

        {!messageLoading && activeChat && chatMessages.length === 0 && (
          <div className={classes.messages}>
            <p className={classes["no-active-chat"]}>No Message To Show.</p>
          </div>
        )}

        <ContentEnter show={activeChat !== null} nodeRef={nodeRef}>
          <div className={classes.form} ref={nodeRef}>
            <MessageForm
              message={true}
              createDocHandler={createMessageHandler}
              isLoading={createMessageLoading}
              placeholder="Message..."
              onFocus={markMessageAsRead}
            />
          </div>
        </ContentEnter>

        {!activeChat && (
          <p className={classes["no-active-chat"]}>
            Tap on any chat to start conversation.
          </p>
        )}
      </div>
    </>
  );
};

export default memo(ChatBox);
