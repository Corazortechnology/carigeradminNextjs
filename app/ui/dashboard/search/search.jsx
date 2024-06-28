"use client";
import { MdSearch } from "react-icons/md";
import styles from "./search.module.css";
import { useDebouncedCallback } from "use-debounce";

const Search = ({ placeholder, onSearch }) => {
  const handleSearch = useDebouncedCallback((e) => {
    onSearch(e.target.value);
  }, 300);

  return (
    <div className={styles.container}>
      <MdSearch />
      <input
        type="text"
        placeholder={placeholder}
        className={styles.input}
        onChange={handleSearch}
      />
    </div>
  );
};

export default Search;
