import React from "react";
import { FaSearch } from "react-icons/fa";
import "./searchBar.css";

const SearchBar: React.FC = () => {
  return (
    <div className="search-box">
      <input type="text" placeholder="Search Bikes, Gear & Accessories" />
      <FaSearch className="search-icon" />
    </div>
  );
};

export default SearchBar;
