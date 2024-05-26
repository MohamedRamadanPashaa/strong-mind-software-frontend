import { memo } from "react";
import { useSelector } from "react-redux";
import { format } from "timeago.js";
import { checkOnlineStatusHandler } from "../../helpers/checkOnlineStatus";
import { useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";

import classes from "./ChatBoxHead.module.css";

const ChatBoxHead = () => {
  const { onlineUsers, activeChat, activeFriend } = useSelector(
    (state) => state.chat
  );

  const { data } = useSession();
  const user = data?.user;
  const onlineStatus = checkOnlineStatusHandler(activeChat, onlineUsers, user);

  return (
    <div className={classes.head}>
      <div
        className={`${classes.img} ${
          onlineStatus ? classes.online : undefined
        }`}
      >
        <Image
          src={`/img/usersImages/${activeFriend?.photo}`}
          alt={activeFriend?.name}
          width={200}
          height={200}
          priority
        />
      </div>

      <div className={classes["friend-info"]}>
        <h3>
          <Link href={`/community/${activeFriend?._id}`}>
            {activeFriend.name}
          </Link>
        </h3>
        <span>Friends Since {format(activeChat.createdAt)}.</span>
      </div>
    </div>
  );
};

export default memo(ChatBoxHead);
