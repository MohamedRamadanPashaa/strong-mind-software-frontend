import { memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setActiveChat } from "../../store/chatSlice";
import { useSession } from "next-auth/react";

import classes from "./Friend.module.css";
import Image from "next/image";
import { getImageLink } from "@/helpers/GetImageLink";

const Friend = ({ chat, onlineStatus, getChatMessages, markMessageAsRead }) => {
  const { data } = useSession();
  const user = data?.user;
  const { activeChat } = useSelector((state) => state.chat);

  const { members } = chat;
  const dispatch = useDispatch();

  let friend;
  if (members[0]._id === members[1]._id) {
    friend = members[0];
  } else {
    friend = members.filter((member) => member._id !== user.id)[0];
  }

  return (
    <div
      className={`${classes["friend-card"]} ${
        activeChat && activeChat._id === chat._id ? classes.active : undefined
      } ${chat.unreadCount > 0 ? classes["unread-message"] : undefined}`}
      onClick={async () => {
        if (activeChat && activeChat._id === chat._id) return;
        dispatch(setActiveChat({ ...chat, friendId: friend._id }));
        await getChatMessages(chat._id);
        await markMessageAsRead(chat._id);
      }}
    >
      <div className={classes.friend}>
        <div
          className={`${classes.img} ${
            onlineStatus ? classes.online : undefined
          }`}
        >
          <Image
            width={250}
            height={250}
            style={{ objectFit: "cover" }}
            src={`${getImageLink()}/usersImages/${friend.photo}`}
            alt={friend.name}
          />
        </div>

        <div
          className={`${classes["friend-info"]} ${
            onlineStatus ? classes.online : undefined
          }`}
        >
          <h3>{friend.name}</h3>
          <span>{onlineStatus ? "Online" : "Offline"}</span>
        </div>
      </div>

      {chat && chat.unreadCount > 0 && (
        <div className={classes["unread-count"]}>
          {chat.unreadCount < 10 ? chat.unreadCount : "10+"}
        </div>
      )}
    </div>
  );
};

export default memo(Friend);
