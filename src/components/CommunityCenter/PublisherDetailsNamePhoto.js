import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { format } from "timeago.js";
import Link from "next/link";

import classes from "./PublisherDetailsNamePhoto.module.css";
import Image from "next/image";

const PublisherDetailsNamePhoto = ({
  img,
  name,
  createdAt,
  comment,
  userId,
  postId,
}) => {
  const { onlineUsers } = useSelector((state) => state.chat);
  const [onlineStatus, setOnlineStatus] = useState(false);
  // set if user online or not
  useEffect(() => {
    if (onlineUsers) {
      const onlineUser = onlineUsers.find((user) => user.userId === userId);

      onlineUser && setOnlineStatus(true);
    }
  }, [onlineUsers, userId]);

  return (
    <div
      className={`${classes["publisher-info"]} ${
        comment ? classes.comment : undefined
      }`}
    >
      <div
        className={`${classes.img} ${
          onlineStatus ? classes.online : undefined
        }`}
      >
        <Image src={img} alt={name} width={250} height={250} />
      </div>
      <div className={classes.info}>
        <h3>
          <Link href={`/community/${userId}`}>{name}</Link>
        </h3>
        <span className={classes.time}>
          <Link href={`/community/posts/${postId}`}>{format(createdAt)}</Link>
        </span>
      </div>
    </div>
  );
};

export default PublisherDetailsNamePhoto;
