import React from 'react';
import './SchemeCard.css';

const SchemeCard = (props) => {
  return (
    <div className="scheme-card">
      <h3>{props.data.Name}</h3>
      <p>Ministry Of Commerce And Industry</p>
      <p>{props.data.Description}</p>
      <span className="tag">{props.data["Application Mode"]}</span>
      <span className="tag">{props.data["Employment"]}</span>
      <span className="tag">{props.data["Residence"]}</span>
      <span className="tag">{props.data["Benefit"]}</span>

    </div>
  );
};

export default SchemeCard;