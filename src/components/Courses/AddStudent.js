import { useEffect, useState } from "react";
import classes from "./AddStudent.module.css";
import useHttp from "@/hooks/http-hook";

export default function AddStudent({ setUsers }) {
  const [query, setQuery] = useState("");
  const { sendRequest } = useHttp();

  useEffect(() => {
    const handleSearch = async () => {
      try {
        const { data } = await sendRequest(
          `/api/v1/users?name=${query}&&limit=5`
        );

        setUsers(data.users);
      } catch (error) {
        console.error("Failed to fetch search results", error);
      }
    };

    const delayDebounceFn = setTimeout(() => {
      if (query.trim() !== "") {
        handleSearch();
      } else {
        setUsers([]);
      }
    }, 300); // 300ms debounce

    return () => clearTimeout(delayDebounceFn);
  }, [query, sendRequest, setUsers]);

  return (
    <div className={classes["add-competitor"]}>
      <label htmlFor="search">Search By Name:</label>
      <input
        type="search"
        placeholder="Student Name"
        id="search"
        onChange={(e) => {
          setQuery(e.target.value);
          if (e.target.value.trim() === "") {
            setUsers([]);
          }
        }}
      />
    </div>
  );
}
