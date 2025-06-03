import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api/api";
import Base from "../base/Base";

const LiteratureReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState(null);
  const [sortColumn, setSortColumn] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await api.get("/literature-reviews/", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        });
        setReviews(response.data);
      } catch (err) {
        setError(err.response?.data?.detail || "Error fetching reviews");
      }
    };

    fetchReviews();
  }, []);

  const handleSort = (column) => {
    const newSortOrder =
      sortColumn === column && sortOrder === "asc" ? "desc" : "asc";
    const sortedReviews = [...reviews].sort((a, b) => {
      const aValue = a[column] || "";
      const bValue = b[column] || "";
      if (newSortOrder === "asc") {
        return aValue > bValue ? 1 : aValue < bValue ? -1 : 0;
      } else {
        return aValue < bValue ? 1 : aValue > bValue ? -1 : 0;
      }
    });

    setSortColumn(column);
    setSortOrder(newSortOrder);
    setReviews(sortedReviews);
  };

  return (
    <Base>
      <div>
        <div className="bg-background-light dark:bg-background-dark card p-4">
          <div className="card-content flex flex-column items-center justify-between p-2">
            <h1 className="text-3xl text-orange-default">
              My Literature Reviews
            </h1>
            <Link
              to="/literature-reviews/create"
              className="btn bg-orange-default is-link p-2 rounded-lg text-text-dark"
            >
              Create new review
            </Link>
          </div>
        </div>

        <div className="card p-4">
          <div className="card-content">
            {error && <p style={{ color: "red" }}>{error}</p>}
            <table className="min-w-full table-auto border-separate border-spacing-y-2 bg-background-dark dark:bg-background-darker text-left text-sm text-gray-200">
              <thead>
                <tr className="text-xs uppercase tracking-wider text-gray-400">
                  <th
                    className="px-4 py-2 cursor-pointer hover:text-white"
                    onClick={() => handleSort("id")}
                  >
                    Number
                  </th>
                  <th
                    className="px-4 py-2 cursor-pointer hover:text-white"
                    onClick={() => handleSort("title")}
                  >
                    Title
                  </th>
                  <th
                    className="px-4 py-2 cursor-pointer hover:text-white"
                    onClick={() => handleSort("description")}
                  >
                    Description
                  </th>
                  <th
                    className="px-4 py-2 cursor-pointer hover:text-white"
                    onClick={() => handleSort("discipline")}
                  >
                    Discipline
                  </th>
                  <th className="px-4 py-2">Search Queries</th>
                  <th
                    className="px-4 py-2 cursor-pointer hover:text-white"
                    onClick={() => handleSort("number_of_papers")}
                  >
                    #Papers
                  </th>
                  <th
                    className="px-4 py-2 cursor-pointer hover:text-white"
                    onClick={() => handleSort("number_of_pdfs")}
                  >
                    #PDFs
                  </th>
                  <th
                    className="px-4 py-2 cursor-pointer hover:text-white"
                    onClick={() => handleSort("number_of_screened")}
                  >
                    #Screened
                  </th>
                  <th
                    className="px-4 py-2 cursor-pointer hover:text-white"
                    onClick={() => handleSort("percentage_screened")}
                  >
                    % Screened
                  </th>
                  <th className="px-4 py-2">Decisions (I / ? / E)</th>
                  <th className="px-4 py-2">Manage Review</th>
                </tr>
              </thead>
              <tbody>
                {reviews.map((review, index) => (
                  <tr
                    key={review.id}
                    className="bg-gray-800 hover:bg-gray-700 transition-colors rounded-lg"
                  >
                    <th className="px-4 py-2 font-medium">{index + 1}</th>
                    <td className="px-4 py-2">
                      <Link
                        to={`/review-details/${review.id}`}
                        className="text-blue-400 hover:underline"
                      >
                        {review.title}
                      </Link>
                    </td>
                    <td className="px-4 py-2">{review.description || "N/A"}</td>
                    <td className="px-4 py-2">{review.discipline || "N/A"}</td>
                    <td className="px-4 py-2 flex flex-wrap gap-1">
                      {review.search_queries?.length
                        ? review.search_queries.map((query, idx) => (
                          <span
                            key={idx}
                            className="bg-gray-600 text-white text-xs px-2 py-1 rounded-full"
                          >
                            {query}
                          </span>
                        ))
                        : "N/A"}
                    </td>
                    <td className="px-4 py-2">{review.number_of_papers}</td>
                    <td className="px-4 py-2">{review.number_of_pdfs}</td>
                    <td className="px-4 py-2">{review.number_of_screened}</td>
                    <td className="px-4 py-2">{review.percentage_screened}%</td>
                    <td className="px-4 py-2">
                      {Array.isArray(review.decisions_count) &&
                        review.decisions_count.length >= 3
                        ? `${review.decisions_count[0]} / ${review.decisions_count[1]} / ${review.decisions_count[2]}`
                        : "N/A"}
                    </td>
                    <td className="px-4 py-2">
                      <Link
                        to={`/manage-review/${review.id}`}
                        className="text-indigo-400 hover:underline"
                      >
                        Settings
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Base>
  );
};

export default LiteratureReviews;
