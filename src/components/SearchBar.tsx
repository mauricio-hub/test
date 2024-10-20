import React, { useState } from "react";
import { IoIosSearch } from "react-icons/io";

interface SearchBarProps {
  onSearch?: (query: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    if (onSearch) {
      onSearch(query);
    }
  };

  return (
    <div className="search-bar">
      <IoIosSearch className="search-icon" />
      <input 
        type="text" 
        placeholder="You're looking for something?" 
        value={query} 
        onChange={(e) => setQuery(e.target.value)} 
        onKeyDown={(e) => e.key === 'Enter' && handleSearch()} 
      />
    </div>
  );
};
