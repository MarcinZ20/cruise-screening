import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Base from '../base/Base';

function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(
        `/search?search_query=${encodeURIComponent(searchQuery)}&source=main_search&page=1`
      );
    }
  };

  return (
    <Base>
      <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center">
        <img
          src="cruise-logo-removebg.png"
          alt="Cruise Logo"
          className="w-64 h-64 mb-8"
        />
        <form
          onSubmit={handleSearch}
          className="flex flex-col sm:flex-row items-center gap-4 w-full max-w-xl"
        >
          <input
            type="search"
            name="search_query"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search CRUISE"
            aria-label="Search"
            className="w-full flex-1 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-background-darker dark:text-text-dimmed focus:outline-none focus:ring-2 focus:ring-orange-default focus:border-transparent"
          />
          <button
            type="submit"
            className="bg-orange-default hover:bg-orange-600 text-white dark:text-text-dimmed px-6 py-2 rounded-lg transition-colors duration-200"
          >
            Search
          </button>
          <input type="hidden" name="source" value="main_search" />
        </form>
      </div>
    </Base>
  );
}

export default Home;
