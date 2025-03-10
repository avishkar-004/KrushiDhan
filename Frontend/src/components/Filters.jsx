import React from 'react';

const SchemeCard = ({ title, ministry, description, tags }) => {
    return (
        <div className="scheme-card">
            <h3>{title}</h3>
            <p>{ministry}</p>
            <p>{description}</p>
            {tags && tags.map((tag, index) => (
                <span key={index} className="tag">{tag}</span>
            ))}
        </div>
    );
};

export default SchemeCard;