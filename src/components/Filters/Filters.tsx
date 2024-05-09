import React, { useState } from "react";
import filter from "./Filters.module.css";
import { useLocation } from "react-router-dom";

interface FiltersProps {
  onFilterChange: (filterName: string, value: string) => void;
}

interface FilterState {
  name: string;
  format: string;
  location: string;
  status: string;
  sortBy: string;
  date: string;
}

const Filters: React.FC<FiltersProps> = ({ onFilterChange }) => {
  const initialFilters: FilterState = {
    name: "",
    format: "",
    location: "",
    status: "",
    sortBy: "",
    date: "",
  };

  const location = useLocation();
  const isActive = (path: string) => location.pathname.includes(path);

  const [filters, setFilters] = useState<FilterState>(initialFilters);

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = event.target;
    onFilterChange(name, value);
    setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
  };

  const resetFilters = () => {
    setFilters(initialFilters);
    Object.keys(initialFilters).forEach((filter) => onFilterChange(filter, ""));
  };

  return (
    <div className={`${filter.filter_panel} p-3`}>
      {isActive("/myTournaments") && <span>My Tournaments</span>}
      <input
        type="text"
        className="form-control mb-3"
        name="name"
        value={filters.name}
        onChange={handleInputChange}
        placeholder="Search by name"
      />
      <select
        className="form-select mb-3"
        name="format"
        value={filters.format}
        onChange={handleInputChange}
      >
        <option value="">Select format</option>
        {["Group", "Play-off", "Group+Play-off"].map((format, index) => (
          <option key={index} value={format}>
            {format}
          </option>
        ))}
      </select>
      <input
        type="text"
        className="form-control mb-3"
        name="location"
        value={filters.location}
        onChange={handleInputChange}
        placeholder="Search by location"
      />
      <select
        className="form-select mb-3"
        name="status"
        value={filters.status}
        onChange={handleInputChange}
      >
        <option value="">Select status</option>
        {["finished", "ongoing", "upcoming"].map((status, index) => (
          <option key={index} value={status}>
            {status}
          </option>
        ))}
      </select>
      <select
        className="form-select mb-3"
        name="sortBy"
        value={filters.sortBy}
        onChange={handleInputChange}
      >
        <option value="">Sort by</option>
        {["A-Z", "Z-A", "StartDate", "EndDate", "Type", "Status"].map(
          (sortBy, index) => (
            <option key={index} value={sortBy}>
              {sortBy}
            </option>
          ),
        )}
      </select>
      <input
        type="date"
        className="form-control mb-3"
        name="date"
        value={filters.date}
        onChange={handleInputChange}
      />
      <button className="btn btn-warning w-100" onClick={resetFilters}>
        Reset Filters
      </button>
    </div>
  );
};

export default Filters;
