import React, { useState } from "react";
import filter from "./Filters.module.css";
import { useLocation } from "react-router-dom";

interface FiltersProps {
  onFilterChange: (filterName: string, value: string) => void;
}

interface FilterState {
  name: string;
}

const TeamsFilters: React.FC<FiltersProps> = ({ onFilterChange }) => {
  const initialFilters: FilterState = {
    name: "",
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
      {isActive("/myTeams") && <span>My Teams</span>}
      <input
        type="text"
        className="form-control mb-3"
        name="name"
        value={filters.name}
        onChange={handleInputChange}
        placeholder="Search by name"
      />
      <button className="btn btn-warning w-100" onClick={resetFilters}>
        Reset Filters
      </button>
    </div>
  );
};

export default TeamsFilters;
