import { memo, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import dateFormat from "dateformat";
import useHttp from "../../hooks/http-hook";
import ErrorModal from "../ErrorModal/ErrorModal";
import Button from "../FormElement/Button";
import ContentEnter from "../UIElements/ContentEnter";
import { setChatMessages, setDeletedMsgToSocket } from "../../store/chatSlice";
import { useSession } from "next-auth/react";
import { FaCheck, FaCheckDouble, FaClock } from "react-icons/fa";
import { FaTrashCan } from "react-icons/fa6";
import Image from "next/image";

import classes from "./Message.module.css";

const Message = ({
  message,
  chatMessages,
  createMessageLoading,
  unReadMessage,
  index,
  todayMessage,
  yesterdayMessage,
  pastMessage,
}) => {
  const { data } = useSession();
  const user = data?.user;
  const { activeFriend } = useSelector((state) => state.chat);
  const [showDeleteBtn, setShowDeleteBtn] = useState(false);
  const [showDeleteIcon, setShowDeleteIcon] = useState(false);
  const { isLoading, error, sendRequest, clearError } = useHttp();
  const dispatchRedux = useDispatch();
  const btnRef = useRef(null);
  const nodeRef = useRef(null);

  useEffect(() => {
    const handleDocumentClick = (event) => {
      // Check if the click is outside of the menu
      if (btnRef.current && !btnRef.current.contains(event.target)) {
        // Close the menu
        setShowDeleteBtn(false);
        setShowDeleteIcon(false);
      }
    };

    // Attach click event listener to the entire document
    document.addEventListener("click", handleDocumentClick);

    // Clean up the event listener on component unmount
    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, []);

  const deleteMessageHandler = async () => {
    try {
      const { data } = await sendRequest(
        `/api/v1/messages/${message._id}`,
        "DELETE"
      );

      // hide delete button div
      setShowDeleteBtn(false);

      // set deleted message to socket
      dispatchRedux(setDeletedMsgToSocket(data.message));

      // find index in chat messages
      const deletedMessageIndex = chatMessages.findIndex(
        (m) => m._id === data.message._id
      );

      // change deleted message with new message
      let newMessages = [...chatMessages];
      if (deletedMessageIndex !== -1) {
        newMessages[deletedMessageIndex] = data.message;
      }

      // set new chat messages
      dispatchRedux(setChatMessages(newMessages));
    } catch (error) {
      console.log(error);
    }
  };

  const countUnreadMessages = chatMessages.filter(
    (m) => !m.read && m.sender === activeFriend._id
  ).length;

  return (
    <>
      <ErrorModal error={error} onCancel={clearError} />

      <div>
        <p className={classes["new-message"]}>
          {countUnreadMessages > 0 &&
            unReadMessage &&
            unReadMessage._id === message._id &&
            unReadMessage.sender !== user.id && (
              <span data-message-id="unReadMsg">
                ({countUnreadMessages}) New Message
                {countUnreadMessages > 1 && "s"}!
              </span>
            )}

          {todayMessage && todayMessage._id === message._id && (
            <span>Today!</span>
          )}

          {yesterdayMessage && yesterdayMessage._id === message._id && (
            <span className={classes["new-message"]}>Yesterday!</span>
          )}

          {pastMessage && pastMessage._id === message._id && (
            <span className={classes["new-message"]}>
              {dateFormat(message.createdAt, "mmm dd, yyyy hh:mm TT")}!
            </span>
          )}
        </p>

        <div
          className={`${classes.message} ${
            message.sender !== user.id ? classes["friend-message"] : undefined
          }`}
          data-message-id={index}
          onMouseEnter={() =>
            message.sender === user.id &&
            !message.deletedMessage &&
            setShowDeleteIcon(true)
          }
          onMouseLeave={() =>
            message.sender === user.id &&
            !message.deletedMessage &&
            setShowDeleteIcon(false)
          }
          onClick={() => {
            message.sender === user.id &&
              !message.deletedMessage &&
              setShowDeleteIcon((prev) => !prev);
          }}
          ref={btnRef}
        >
          <div className={classes["message-details"]}>
            <span
              className={message.deletedMessage ? classes.deleted : undefined}
            >
              {message.deletedMessage
                ? "This Message was deleted!"
                : message.text}
            </span>

            {!message.deletedMessage && message?.photo?.secure_url && (
              <span className={classes.photo}>
                <Image
                  width={0}
                  height={0}
                  style={{ width: "100%", height: "auto" }}
                  sizes="100vh"
                  src={message.photo.secure_url}
                  alt={message.text}
                />
              </span>
            )}

            <span className={classes["message-time-check"]}>
              {message.sender === user.id && (
                <>
                  {message.read ? (
                    <span className={classes.displayed}>
                      <FaCheckDouble />
                    </span>
                  ) : message.delivered ? (
                    <span className={classes.arrived}>
                      <FaCheckDouble />
                    </span>
                  ) : !createMessageLoading || message.updatedAt ? (
                    <span>
                      <FaCheck />
                    </span>
                  ) : (
                    <span>
                      <FaClock />
                    </span>
                  )}
                </>
              )}
              <span>{dateFormat(message.createdAt, "hh:mm TT")}</span>
            </span>
          </div>

          {message.sender === user.id && !message.deletedMessage && (
            <div className={classes.delete}>
              {(showDeleteIcon || showDeleteBtn) && (
                <span onClick={() => setShowDeleteBtn((prev) => !prev)}>
                  <FaTrashCan />
                </span>
              )}

              <ContentEnter show={showDeleteBtn} nodeRef={nodeRef}>
                <div className={classes["delete-action"]} ref={nodeRef}>
                  <Button
                    disabled={isLoading}
                    onClick={deleteMessageHandler}
                    className={classes["delete-btn"]}
                  >
                    Delete
                  </Button>
                  <Button onClick={() => setShowDeleteBtn(false)}>
                    Cancel
                  </Button>
                </div>
              </ContentEnter>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default memo(Message);
