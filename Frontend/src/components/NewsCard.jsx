import React from "react";
import "./NewsCard.css"; // Import the CSS file

const NewsCard = ({ article }) => {
  return (
    <div className="news-card">
      <img src={article.urlToImage || "https://via.placeholder.com/400"} alt="News" className="news-image" />

      <div className="news-content">
        <h2>{article.title}</h2>
        <p>{article.description}</p>
      </div>

      <a href={article.url} target="_blank" rel="noopener noreferrer" className="read-more">
        Read More
      </a>
    </div>
  );
};

export default NewsCard;
