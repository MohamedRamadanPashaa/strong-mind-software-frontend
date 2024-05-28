"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { FaCaretSquareDown } from "react-icons/fa";
import Dropdown from "./Dropdown";

import classes from "./UserName.module.css";
import { getImageLink } from "@/helpers/GetImageLink";

export default function UserName({ showNavSmall, onCloseNavSmall, user }) {
  const [showDropdown, setShowDropdown] = useState(false);
  const menuRef = useRef(null);

  const showDropdownHandler = () => setShowDropdown((prev) => !prev);

  useEffect(() => {
    const handleDocumentClick = (event) => {
      // Check if the click is outside of the menu
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        // Close the menu
        setShowDropdown(false);
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
    <>
      <div
        className={classes.navNameDiv}
        ref={menuRef}
        onClick={showDropdownHandler}
      >
        <div className={classes.photo}>
          <Image
            src={`${getImageLink()}/usersImages/${user.photo}`}
            alt={user.name}
            width={100}
            height={100}
          />
        </div>

        <h2 className={classes.myName}>
          <span>
            {user.name.length <= 12 ? user.name : user.name.split(" ")[0]}
          </span>

          <FaCaretSquareDown />
        </h2>

        <Dropdown
          showNavSmall={showNavSmall}
          onCloseNavSmall={onCloseNavSmall}
          show={showDropdown}
          onClick={showDropdownHandler}
        />
      </div>
    </>
  );
}
