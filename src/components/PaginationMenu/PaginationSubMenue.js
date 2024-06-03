"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import classes from "./PaginationMenu.module.css";

const PaginationSubMenu = ({ paginationData }) => {
  const pathname = usePathname();

  return (
    <div>
      <ul className={classes["pagination-menu-ul"]}>
        {paginationData.map((el) => {
          return (
            <li key={el.title}>
              <Link
                href={el.to}
                className={pathname === el.to ? classes.active : undefined}
              >
                {el.shortTitle}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default PaginationSubMenu;
