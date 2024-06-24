"use client";

import useHttp from "@/hooks/http-hook";
import { useEffect, useState } from "react";
import ErrorModal from "../ErrorModal/ErrorModal";
import UsersList from "./UsersList";

import classes from "./AllUsers.module.css";

let numberOfPage = 0;
let countAll = 0;
let users = [];
const usersInPage = 10;

export default function AllUsers() {
  const [page, setPage] = useState(1);
  const { sendRequest, error, clearError } = useHttp();
  const [userLoading, setUserLoading] = useState(true);

  useEffect(() => {
    const getUsers = async () => {
      setUserLoading(true);
      try {
        const { data, count } = await sendRequest(`/api/v1/users?page=${page}`);

        users = data.users;
        numberOfPage = Math.ceil(count / usersInPage);
        countAll = count;
      } catch (error) {
        console.log(error);
      }

      setUserLoading(false);
    };

    getUsers();
  }, [sendRequest, page]);

  return (
    <>
      <ErrorModal error={error} onCancel={clearError} />

      <div className={classes["all-users"]}>
        <UsersList
          users={users}
          countAll={countAll}
          numberOfPage={numberOfPage}
          page={page}
          setPage={setPage}
          usersInPage={usersInPage}
          userLoading={userLoading}
        />
      </div>
    </>
  );
}
