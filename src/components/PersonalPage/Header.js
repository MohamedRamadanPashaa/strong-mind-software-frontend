import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { getKFollowers } from "../../helpers/getKFollowers";
import useHttp from "../../hooks/http-hook";
import { updateUser } from "../../store/authSlice";
import {
  resetUnreadMessage,
  setActiveChat,
  setChatMessages,
  setCountMessages,
  setMessageLoading,
} from "../../store/chatSlice";
import FollowButton from "../CommunityLeft/FollowButton";
import ErrorModal from "../ErrorModal/ErrorModal";
import Button from "../FormElement/Button";
import Menu from "../UIElements/Menu";
import { socket } from "../../helpers/socket";
import { useSession } from "next-auth/react";

import classes from "./Header.module.css";
import { FaSquareCaretDown } from "react-icons/fa6";
import { FaArrowAltCircleLeft } from "react-icons/fa";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Header = ({ currentUser }) => {
  const { data } = useSession();
  const user = data?.user;

  const { onlineUsers, chats } = useSelector((state) => state.chat);
  const [onlineStatus, setOnlineStatus] = useState(false);
  const [follower, setFollower] = useState(currentUser);
  const { isLoading, error, sendRequest, clearError } = useHttp();
  const [showUnFollowBtn, setShowUnFollowBtn] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();

  const [friend, setFriend] = useState(
    (follower.followers.includes(user.id) &&
      follower.followings.includes(user.id)) ||
      (user.followers.some((f) => f._id === follower._id) &&
        user.followings.some((following) => following._id === follower._id))
  );

  useEffect(() => {
    setFollower(currentUser);
  }, [currentUser]);

  useEffect(() => {
    setFriend(
      (follower.followers.includes(user.id) &&
        follower.followings.includes(user.id)) ||
        (user.followers.some((f) => f._id === follower._id) &&
          user.followings.some((following) => following._id === follower._id))
    );
  }, [user, follower]);

  // get active chat and redirect to chat page and open this chat
  const getActiveChat = async () => {
    try {
      const { data } = await sendRequest(`/api/v1/chats/${follower._id}`);

      dispatch(setActiveChat({ ...data.chat[0], friendId: follower._id }));
      await getChatMessages(data.chat[0]._id);
      await markMessageAsRead(data.chat[0]._id);
      router.push("/community/chat");
    } catch (error) {
      console.log(error);
    }
  };

  // mark message read by focus the input message
  const markMessageAsRead = async (chatId) => {
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

  // set if user online or not
  useEffect(() => {
    if (onlineUsers) {
      const onlineUser = onlineUsers.find(
        (user) => user.userId === follower._id
      );

      onlineUser && setOnlineStatus(true);
    }
  }, [onlineUsers, follower]);

  // un follow friend
  const unFollowFriendHandler = async () => {
    try {
      const { data } = await sendRequest(
        `/api/v1/users/following/${follower._id}`,
        "PATCH"
      );

      setShowUnFollowBtn(false);
      // update follower and me in follower array
      dispatch(updateUser({ user: data.user._doc }));
      setFollower(data.friend);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <ErrorModal error={error} onCancel={clearError} />

      <div className={classes.header}>
        <div className={classes["user"]}>
          <div
            className={`${classes["user-img"]} ${
              onlineStatus ? classes.online : undefined
            }`}
          >
            <img
              src={`/img/usersImages/${follower.photo}`}
              alt={follower.name}
            />
          </div>
          <div className={classes["user-info"]}>
            <h3>{follower.name}</h3>
            <h5>
              {getKFollowers(follower.followers.length)} Follower
              {getKFollowers(follower.followers.length) > 1 && "s"}
            </h5>
          </div>
        </div>

        <div className={classes.buttons}>
          {user.id !== follower._id && (
            <FollowButton friend={follower} getActiveChat={getActiveChat} />
          )}

          {friend && (
            <div className={classes["friend-buttons"]}>
              <Button
                outline
                onClick={() => setShowUnFollowBtn((prev) => !prev)}
              >
                Friend <FaSquareCaretDown />
              </Button>

              <Menu show={showUnFollowBtn}>
                <div>
                  <Button onClick={unFollowFriendHandler}>
                    {isLoading ? "Loading..." : "Un Follow"}
                  </Button>
                </div>
              </Menu>
            </div>
          )}
        </div>

        <Link href="/community" className={classes.back}>
          <FaArrowAltCircleLeft /> Home
        </Link>
      </div>
    </>
  );
};

export default Header;
