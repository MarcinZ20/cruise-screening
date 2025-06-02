import React, { useState } from "react";

const Card = ({ resultKey, searchResult }) => {
  const [openAbstract, setOpenAbstract] = useState(false);
  const [openKeywords, setOpenKeywords] = useState(false);

  const truncateText = (text, length = 500) => {
    return text.length > length ? text.substring(0, length) + "..." : text;
  };

  return (
    <article className="bg-gray-100 dark:bg-gray-500 mb-4 p-1 rounded-lg shadow-md">
      <div className="card-content">
        <div className="flex flex-row items-center justify-between p-1">
          <div className="flex-1">
            <p className="text-md font-medium dark:text-gray-100">
              {(() => {
                const titleWords = searchResult.title.split(" ");
                const shortenedTitle =
                  titleWords.length > 10
                    ? `${titleWords.slice(0, 10).join(" ")} ...`
                    : searchResult.title;

                return searchResult.url ? (
                  <a href={searchResult.url}>{shortenedTitle}</a>
                ) : (
                  shortenedTitle
                );
              })()}
            </p>
          </div>

          {searchResult.pdf && (
            <div className="flex-shrink-0 ml-2">
              <a href={searchResult.pdf}>
                <img src="pdf-icon.svg" width="25" height="25" alt="PDF" />
              </a>
            </div>
          )}
        </div>

        <p className="subtitle px-1 mb-2 text-sm font-medium text-gray-600 dark:text-gray-300">
          {searchResult.authors}
        </p>
        <p className="p-1 text-sm">
          Published:{" "}
          <span className="text-primary">
            {searchResult.publication_date}, {searchResult.venue}
          </span>
        </p>
        <p className="p-1 text-sm">
          DOI:{" "}
          {searchResult.doi && (
            <a
              href={`https://doi.org/${searchResult.doi}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 text-sm"
            >
              {searchResult.doi}
            </a>
          )}
        </p>
      </div>

      <div className="card-content pt-1">
        <div className="content">
          {searchResult.abstract ? (
            !openAbstract ? (
              <button
                type="button"
                className="text-orange-500 hover:underline mt-2 px-1"
                onClick={() => setOpenAbstract(true)}
              >
                See abstract &rarr;
              </button>
            ) : (
              <div>
                <p className="text-sm">
                  <strong>Abstract:</strong> {searchResult.abstract}
                </p>
                <button
                  type="button"
                  className="text-orange-500 hover:underline mt-1 px-1"
                  onClick={() => setOpenAbstract(false)}
                >
                  Show less
                </button>
              </div>
            )
          ) : null}

          {/* Keywords - pokazuj tylko jeśli są */}
          {(searchResult.keywords_snippet?.length > 0 ||
            searchResult.keywords_rest?.length > 0) && (
            <div className="mt-2">
              {searchResult.keywords_snippet?.map(([keyword, score]) => (
                <a
                  key={keyword}
                  href={`?search_query=${encodeURIComponent(keyword)}&source=keywords`}
                  className={`button is-light is-small mb-2 ${score}`}
                >
                  {keyword}
                </a>
              ))}

              {searchResult.keywords_rest?.length > 0 && !openKeywords && (
                <button
                  type="button"
                  className="text-blue-600 hover:underline mt-1"
                  onClick={() => setOpenKeywords(true)}
                >
                  Show more keywords
                </button>
              )}

              {openKeywords && (
                <>
                  <div>
                    {searchResult.keywords_rest?.map(([keyword, score]) => (
                      <a
                        key={keyword}
                        href={`?search_query=${encodeURIComponent(keyword)}&source=keywords`}
                        className={`button is-light is-small mb-2 ${score}`}
                      >
                        {keyword}
                      </a>
                    ))}
                  </div>
                  <button
                    type="button"
                    className="text-blue-600 hover:underline mt-1"
                    onClick={() => setOpenKeywords(false)}
                  >
                    Show less keywords
                  </button>
                </>
              )}
            </div>
          )}

          {/* Citation info - pokazuj tylko jeśli są */}
          {(searchResult.citations || searchResult.references) && (
            <p className="text-sm text-blue-800 mt-2">
              {searchResult.citations
                ? `Cited by ${searchResult.citations}`
                : ""}
              {searchResult.citations && searchResult.references ? " - " : ""}
              {searchResult.references
                ? `${searchResult.references} references`
                : ""}
            </p>
          )}
        </div>
      </div>
    </article>
  );
};

export default Card;
