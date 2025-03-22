import React, { useState } from "react";
import axios from "axios";
import NewsCard from "./NewsCard";
import "./NewsList.css"; // Import the CSS file

const NewsList = () => {
  const [news, setNews] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const apiKey = "10d2436900cd4ef3b1580fba32919ec8"; // Replace with your API key

  const fetchNews = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const fromDate = new Date();
      fromDate.setDate(fromDate.getDate() - 1);
      const formattedDate = fromDate.toISOString().split("T")[0];

      const apiUrl = `https://newsapi.org/v2/everything?q=farmers&language=en&from=${formattedDate}&sortBy=publishedAt&apiKey=${apiKey}`;

      console.log("Fetching from:", apiUrl);

      const response = await axios.get(apiUrl);
      setNews(response.data.articles || []);
    } catch (error) {
      console.error("Error fetching news:", error);
      setError(error.response?.data?.message || "Failed to load news. Please try again.");
    }

    setIsLoading(false);
  };

  return (
    <div className="news-wrapper">
      <button onClick={fetchNews} className="fetch-button">
        {isLoading ? "Fetching..." : "Get Latest News"}
      </button>

      {error && <p className="error-message">{error}</p>}

      <div className="news-grid">
        {news.length > 0 ? (
          news.map((article, index) => <NewsCard key={index} article={article} />)
        ) : (
          !isLoading && <p className="no-news">No news available. Click "Get Latest News".</p>
        )}
      </div>
    </div>
  );
};

export default NewsList;
