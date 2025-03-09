import React from 'react';
import './SearchBar.css';

const SearchBar = ({ toggleSidebar }) => {
  return (
    <div className="search-bar">
      <button className="filter-button" onClick={toggleSidebar}>☰</button>
      <input type="text" placeholder="Search schemes..." />
      <button>Sort: Relevance</button>
    </div>
  );
};

export default SearchBar;