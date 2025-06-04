import React, { useEffect, useState } from "react";
import WikipediaCard from "../wikipedia_card/WikipediaCard";
import Card from "../card/Card";
import api from "../../../api/api";

const SearchResultList = ({ searchQuery, source, currentPage }) => {
  const [currentPageState, setCurrentPageState] = useState(currentPage);
  const [searchTime, setSearchTime] = useState(0);
  const [uniqueSearches, setUniqueSearches] = useState(0);
  const [searchResult, setSearchResult] = useState([]);
  const [matchedWikiPage, setMatchedWikiPage] = useState();
  const [pageSize, setPageSize] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSearchResultList = async () => {
      try {
        return await api.get("/search", {
          params: {
            search_query: searchQuery,
          },
        });
      } catch (err) {
        console.error(err);
      }
    };

    fetchSearchResultList().then((response) => {
      setSearchResult(response.data.search_result);
      setSearchTime(response.data.search_time);
      setUniqueSearches(response.data.unique_searches);
      setMatchedWikiPage(response.data.matched_wiki_page);
      setPageSize(response.data.page_size);
      setLoading(false);
      setTotalPages(
        response.data.search_result.length > 0
          ? Math.ceil(
            response.data.search_result.length / response.data.page_size,
          )
          : 1,
      );
      setCurrentPageState(Number(currentPage));
    });
  }, [searchQuery, currentPage]);

  const handlePageChange = (page) => {
    setCurrentPageState(page);
    window.location.href = `/search?search_query=${encodeURIComponent(searchQuery)}&source=${source}&page=${page}`;
  };

  return (
    <div className="m-2 p-2 search-results__list">
      <h2 className="text-2xl font-semibold mb-2  dark:text-text-dimmed">
        Search results for{" "}
        <span className="text-orange-400">{searchQuery}</span>
      </h2>

      {loading ? (
        <div className="max-w-3xl mx-auto p-6 bg-white border border-gray-200 rounded-lg shadow-lg my-12 flex justify-center items-center">
          <div className="spinner is-centered animate-spin border-t-4 border-orange-600 border-solid rounded-full w-16 h-16"></div>
        </div>
      ) : (
        <></>
      )}

      {matchedWikiPage && <WikipediaCard matchedWikiPage={matchedWikiPage} />}

      {searchResult?.length > 0 ? (
        <>
          <p className="mb-4 dark:text-text-dimmed">
            Returned{" "}
            <strong className="text-orange-400">
              {uniqueSearches} unique search results
            </strong>{" "}
            ({searchTime} seconds)
          </p>
          {searchResult
            .slice(
              (currentPageState - 1) * pageSize,
              Math.min(currentPageState * pageSize, searchResult.length),
            )
            .map((result, _) => {
              return <Card key={result.id} searchResult={result} />;
            })}
        </>
      ) : (
        <p className="dark:text-text-dimmed">No search results are available ({searchTime} seconds)</p>
      )}

      {totalPages > 1 && (
        <ul className="flex flex-row items-center justify-center gap-2">
          {currentPageState > 1 ? (
            <li className="">
              <a
                href="#"
                onClick={() => handlePageChange(currentPageState - 1)}
              >
                &laquo;
              </a>
            </li>
          ) : (
            <li className="disabled">
              <span>&laquo;</span>
            </li>
          )}

          {Array.from({ length: totalPages }, (_, index) => (
            <li
              key={index + 1}
              className={currentPageState === index + 1 ? "active" : ""}
            >
              <a href="#" onClick={() => handlePageChange(index + 1)}>
                {index + 1}
              </a>
            </li>
          ))}

          {currentPageState < totalPages ? (
            <li>
              <a
                href="#"
                onClick={() => handlePageChange(currentPageState + 1)}
              >
                &raquo;
              </a>
            </li>
          ) : (
            <li className="disabled">
              <span>&raquo;</span>
            </li>
          )}
        </ul>
      )}
    </div>
  );
};

export default SearchResultList;
