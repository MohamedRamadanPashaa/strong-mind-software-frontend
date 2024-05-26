"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import classes from "./NavLink.module.css";

export default function NavLink({ children, href, className, onClick }) {
  const path = usePathname();

  const isActive =
    href === "/" ? path === href : path.startsWith("/" + href.split("/")[1]);

  return (
    <li
      className={`${classes["nav-link"]} ${
        className ? classes[className] : undefined
      }`}
      onClick={onClick ? onClick : () => {}}
    >
      <Link href={href} className={`${isActive ? classes.active : undefined}`}>
        {children}
      </Link>
    </li>
  );
}
