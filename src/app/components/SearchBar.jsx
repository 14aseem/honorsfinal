'use client';

import { useState } from 'react';
import axios from 'axios';

const SearchBar = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch city suggestions based on input
  const fetchSuggestions = async (query) => {
    if (query.trim() === '') return;

    setLoading(true);

    try {
      const response = await axios.get(
        `https://api.teleport.org/api/cities/?search=${query}`
      );
      setSuggestions(response.data._embedded['city:search-results']);
    } catch (error) {
      console.error('Error fetching suggestions:', error);
    } finally {
      setLoading(false);
    }
  };

  // Handle the search form submission
  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(searchQuery); // Pass the query to the parent component
  };

  // Handle change in input field
  const handleChange = (e) => {
    setSearchQuery(e.target.value);
    fetchSuggestions(e.target.value);
  };

  return (
    <div>
      <div className="flex flex-col items-center">
        {/* Search input */}
        <input
          type="text"
          value={searchQuery}
          onChange={handleChange}
          onKeyPress={(e) => e.key === 'Enter' && handleSearch(e)} // Handle enter key
          placeholder="Search for a city"
          className="mt-16 w-10/12 p-4 pl-1 rounded-lg border border-white-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Search button */}
        <button
          onClick={handleSearch}
          className="mt-4 bg-green-500 text-white px-5 py-3 rounded-lg"
        >
          Search
        </button>
      </div>

      {loading && <p className="text-gray-500">Loading...</p>}

      {suggestions.length > 0 && (
        <ul className="absolute left-0 right-0 mt-2 bg-white border border-gray-300 rounded-lg max-h-48 overflow-y-auto">
          {suggestions.map((suggestion) => (
            <li
              key={suggestion._links['city:item'].href}
              onClick={() => onSearch(suggestion.matching_full_name)} // Trigger search on click
              className="cursor-pointer p-2 hover:bg-gray-200"
            >
              {suggestion.matching_full_name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;

