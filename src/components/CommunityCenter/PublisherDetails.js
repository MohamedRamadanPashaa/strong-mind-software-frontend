import { useEffect, useRef, useState } from "react";

import Menu from "../UIElements/Menu";
import PublisherDetailsNamePhoto from "./PublisherDetailsNamePhoto";

import classes from "./PublisherDetails.module.css";
import { FaEllipsis } from "react-icons/fa6";

const PublisherDetails = ({
  img,
  name,
  createdAt,
  comment,
  userId,
  postId,
  children,
}) => {
  const [showThreeDotsMenu, setShowThreeDotsMenu] = useState(false);

  const toggleThreeDotsMenuHandler = () => {
    setShowThreeDotsMenu((prev) => !prev);
  };

  const menuRef = useRef(null);

  useEffect(() => {
    const handleDocumentClick = (event) => {
      // Check if the click is outside of the menu
      if (menuRef?.current && !menuRef.current.contains(event.target)) {
        // Close the menu
        setShowThreeDotsMenu(false);
      }
    };

    // Attach click event listener to the entire document
    document.addEventListener("click", handleDocumentClick);

    // Clean up the event listener on component unmount
    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, []);

  return (
    <div
      className={`${classes["post-header"]} ${
        comment ? classes.comment : undefined
      }`}
    >
      <PublisherDetailsNamePhoto
        img={`/img/usersImages/${img}`}
        name={name}
        createdAt={createdAt}
        comment={comment}
        userId={userId}
        postId={postId}
      />
      <div className={classes["three-dots"]} ref={menuRef}>
        <FaEllipsis onClick={toggleThreeDotsMenuHandler} />

        <Menu show={showThreeDotsMenu}>{children}</Menu>
      </div>
    </div>
  );
};

export default PublisherDetails;
