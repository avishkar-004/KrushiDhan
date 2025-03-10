import React, { useState } from 'react';
import './Sidebar.css';

const Filters = (props) => {
  const [activeFilter, setActiveFilter] = useState(null);

  const toggleFilterOptions = (id) => {
    setActiveFilter(activeFilter === id ? null : id);
  };

  return (
    <div className="filter-content">
      <h2>Filter By <span style={{ float: "right", color: "green", cursor: "pointer" }}>Reset Filters</span></h2>

      <div className="filter-group">
        <label>State</label>
        <select>
          <option>Maharashtra</option>
        </select>
      </div>
      <div className="filter-group">
        <label>Ministry Name</label>
        <select>
          <option>Ministry of Agriculture and Farming</option>
        </select>
      </div>

      <div className="filter-group" onClick={() => toggleFilterOptions('Residence')}>
        <label>Residence</label>
        <div className={`filter-options ${activeFilter === 'Residence' ? 'active' : ''}`}>
          <label><input type="checkbox" onChange={(ele) => {ele.target.checked ? props.setResidence("Both") : props.setResidence(null)}} /> Both</label>
          <label><input type="checkbox" onChange={(ele) => {ele.target.checked ? props.setResidence("Rural") : props.setResidence(null)}}/> Rural</label>
        </div>
      </div>
      <div className="filter-group" onClick={() => toggleFilterOptions('Benefit Type')}>
        <label>Benefit Type</label>
        <div className={`filter-options ${activeFilter === 'Benefit Type' ? 'active' : ''}`}>
          <label><input type="checkbox" onChange={(ele) => {ele.target.checked ? props.setBenefit("Cash") : props.setBenefit(null)}}/> Cash</label>
          <label><input type="checkbox" onChange={(ele) => {ele.target.checked ? props.setBenefit("Composite") : props.setBenefit(null)}}/> Composite</label>
          <label><input type="checkbox" onChange={(ele) => {ele.target.checked ? props.setBenefit("In Kind") : props.setBenefit(null)}}/>In Kind</label>
        </div>
      </div>

      <div className="filter-group" onClick={() => toggleFilterOptions('DBT Scheme')}>
        <label>DBT Scheme</label>
        <div className={`filter-options ${activeFilter === 'DBT Scheme' ? 'active' : ''}`}>
          <label><input type="checkbox" onChange={(ele) => {ele.target.checked ? props.setMode("No") : props.setDbt(null)}}/> No</label>
          <label><input type="checkbox" onChange={(ele) => {ele.target.checked ? props.setDbt("Yes") : props.setDbt(null)}}/> Yes</label>
        </div>
      </div>
      <div className="filter-group" onClick={() => toggleFilterOptions('Application Mode')}>
        <label>Application Mode</label>
        <div className={`filter-options ${activeFilter === 'Application Mode' ? 'active' : ''}`}>
          <label><input type="checkbox" onChange={(ele) => {ele.target.checked ? props.setMode("Offline") : props.setMode(null)}} />Offline</label>
          <label><input type="checkbox" onChange={(ele) => {ele.target.checked ? props.setMode("Online") : props.setMode(null)}}  />Online</label>
        </div>
      </div>

    </div>
  );
};

export default Filters;