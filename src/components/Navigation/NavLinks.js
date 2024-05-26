"use client";

import NavLink from "./NavLink";
import UserName from "./UserName";
import { useSession } from "next-auth/react";

import classes from "./NavLinks.module.css";

function NavLinks({ onCloseNavSmall, showNavSmall, session, nodeRef }) {
  const { data = session } = useSession();

  return (
    <ul className={classes["nav"]} ref={nodeRef}>
      <NavLink href="/" onClick={onCloseNavSmall}>
        Home
      </NavLink>

      {data && (
        <NavLink href="/train" onClick={onCloseNavSmall}>
          Train
        </NavLink>
      )}

      <NavLink href="/ranking/national" onClick={onCloseNavSmall}>
        Ranking
      </NavLink>

      <NavLink href="/competitions" onClick={onCloseNavSmall}>
        Competitions
      </NavLink>

      {data && (
        <NavLink href="/community" onClick={onCloseNavSmall}>
          Community
        </NavLink>
      )}

      {!data && (
        <NavLink href="/login" className="login" onClick={onCloseNavSmall}>
          Login
        </NavLink>
      )}

      {data?.user?.name && (
        <UserName
          showNavSmall={showNavSmall}
          onCloseNavSmall={onCloseNavSmall}
          user={data.user}
        />
      )}
    </ul>
  );
}

export default NavLinks;
