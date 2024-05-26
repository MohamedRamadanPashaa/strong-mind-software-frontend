import { useState } from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";

import classes from "./Search.module.css";

const Search = () => {
  const [search, setSearch] = useState("");

  const searchHandler = (e) => {
    e.preventDefault();

    if (search.length < 1) {
      return;
    }

    console.log(search);
  };
  return (
    <form className={classes.search} onSubmit={searchHandler}>
      <input
        type="text"
        placeholder="Search..."
        onChange={(e) => setSearch(e.target.value)}
      />

      <button>
        <FaMagnifyingGlass />
      </button>
    </form>
  );
};

export default Search;
