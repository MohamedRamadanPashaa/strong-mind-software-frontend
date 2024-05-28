import Link from "next/link";
import { FaXmark } from "react-icons/fa6";
import { FaEdit, FaSave } from "react-icons/fa";
import { useSession } from "next-auth/react";

import classes from "./ThreeDotsMenu.module.css";

const ThreeDotsMenu = ({ creator, postId, deletePost, nodeRef }) => {
  const { data } = useSession();
  const user = data?.user;

  return (
    <div className={classes.menu} ref={nodeRef}>
      <ul>
        <li>
          <FaSave /> Save post!
        </li>
        {(creator._id === user.id || user.role === "admin") && (
          <li onClick={() => deletePost(postId)}>
            <FaXmark /> Delete Post!
          </li>
        )}
        {(creator._id === user.id || user.role === "admin") && (
          <li>
            <Link href={`/community/posts/update/${postId}`}>
              <FaEdit /> Edit Post!
            </Link>
          </li>
        )}
      </ul>
    </div>
  );
};

export default ThreeDotsMenu;
