"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import classes from "./PaginationMenu.module.css";

const PaginationMenu = ({ paginationData }) => {
  const pathname = usePathname();

  return (
    <div>
      <ul className={classes["pagination-menu-ul"]}>
        {paginationData.map((el) => {
          return (
            <li key={el.title}>
              <Link
                href={el.to}
                className={
                  pathname.startsWith(el.to) || pathname.endsWith(el.to)
                    ? classes.active
                    : undefined
                }
              >
                {el.title}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default PaginationMenu;
