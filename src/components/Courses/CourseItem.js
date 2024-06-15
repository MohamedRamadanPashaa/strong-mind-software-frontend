"use client";

import { useSession } from "next-auth/react";
import dateFormat from "dateformat";
import Link from "next/link";
import { FaPen } from "react-icons/fa";
import { FaX } from "react-icons/fa6";
import WarningModel from "../WarningModel/WarningModel";
import { useState } from "react";
import useHttp from "@/hooks/http-hook";
import { useRouter } from "next/navigation";

import classes from "./CourseItem.module.css";

export default function CourseItem({
  courseName,
  batch,
  starts,
  ends,
  slug,
  session,
  _id,
}) {
  const { data = session } = useSession();
  const user = data?.user;
  const [showWarningModel, setShowWarningModel] = useState(false);
  const { isLoading, sendRequest, error, clearError } = useHttp();
  const router = useRouter();

  const deleteCourseHandler = async () => {
    try {
      await sendRequest(`/api/v1/courses/delete-course/${_id}`, "DELETE");

      setShowWarningModel(false);
      router.refresh();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <WarningModel
        show={showWarningModel}
        message={`You want to delete ${courseName} ${batch}?!`}
        onCancel={() => setShowWarningModel(false)}
        onConfirm={deleteCourseHandler}
        isLoading={isLoading}
      />

      <tr>
        <td>
          {dateFormat(starts, "mmm dd")} - {dateFormat(ends, "mmm d, yyyy")}
        </td>
        <td>
          {courseName} {batch}
        </td>

        <td className={classes.action}>
          <span>
            <Link href={`/courses/${slug}/${batch}/overview`}>Details</Link>
          </span>

          {user?.role === "admin" && (
            <>
              <span className={classes.update}>
                <Link href={`/update-course/${slug}/${batch}`}>
                  <FaPen />
                </Link>
              </span>

              <span
                className={classes.delete}
                onClick={() => setShowWarningModel(true)}
              >
                <FaX />
              </span>
            </>
          )}
        </td>
      </tr>
    </>
  );
}
