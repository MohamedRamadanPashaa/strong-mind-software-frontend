"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import classes from "./UserInfoLink.module.css";

export default function UserInfoLink({ href, children }) {
  const pathname = usePathname();
  const isActive = pathname.startsWith(href);

  return (
    <Link
      href={href}
      className={`${classes.link} ${isActive ? classes.active : undefined}`}
    >
      {children}
    </Link>
  );
}
