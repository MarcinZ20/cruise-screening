import React from "react";

const WikipediaCard = ({ matchedWikiPage }) => {
  return (
    <article className="bg-gray-100 dark:bg-background-darker p-2 my-4 rounded-lg shadow-md card--wiki">
      <div className="card-content">
        {!matchedWikiPage.ambiguous && (
          <>
            <p className="subtitle">Multiple matches found. Did you mean:</p>
            <hr />
          </>
        )}

        <div className="flex flex-column items-center justify-between mb-1 py-2">
          <p className="text-lg font-medium dark:text-text-dimmed">
            <a
              href={matchedWikiPage.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {matchedWikiPage.title} |{" "}
              <span className="text-gray-500">Wikipedia</span>
            </a>
          </p>
          <img
            src="wikipedia-logo.png"
            width="24"
            height="24"
            alt="Wikipedia Logo"
            className="m-2"
          />{" "}
        </div>
      </div>

      <div className="card-content">
        <div className="content">
          <p className="dark:text-text-dimmed">{matchedWikiPage.snippet}</p>
        </div>
      </div>
    </article>
  );
};

export default WikipediaCard;
