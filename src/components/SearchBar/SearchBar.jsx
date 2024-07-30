import { useState } from "react";
import css from "./SearchBar.module.css"

export default function SearchBar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState("");

  const changeSearchFilter = (e) => {
    setSearchTerm(e.target.value.toLowerCase().trim());
  };

  const handleSearch = () => {
    if (!searchTerm) return;
    onSearch(searchTerm);
    setSearchTerm("");
  };

  return (
    <div className={css.searchBar}>
      <input type="text" value={searchTerm} onChange={changeSearchFilter} className={css.input}/>
      <button onClick={handleSearch} className={css.button}>Search</button>
    </div>
  );
}
