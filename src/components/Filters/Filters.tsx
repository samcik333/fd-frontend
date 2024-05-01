import React, { useState } from 'react'
import filter from './Filters.module.css'

const Filters: React.FC<{ onFilterChange: (filterName: string, value: string) => void }> = ({ onFilterChange }) => {

    const [filters, setFilters] = useState({
        name: '',
        format: '',
        location: '',
        status: '',
        sortBy: '',
        date: new Date().toISOString().split('T')[0]
    })

    const typeOptions = ["Group", "Play-off", "Group+Play-off"]
    const statusOptions = ["finished", "ongoing", "upcoming"]
    const sortByOptions = ["A-Z", "Z-A", "StartDate", "EndDate", "Type", "Status"]

    const handleInputChange = (e: { target: { name: any; value: any } }) => {
        const { name, value } = e.target
        onFilterChange(name, value)
        setFilters(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    const resetFilters = () => {
        setFilters({
            name: '',
            format: '',
            location: '',
            status: '',
            sortBy: '',
            date: new Date().toISOString().split('T')[0]
        });
        // Resetting external filters as well
        ["name", "type", "location", "status", "sortBy", "date"].forEach(filter => {
            onFilterChange(filter, '')
        })
    }
    return (
        <div className={`${filter.filter_panel} p-3`}>
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
                name="type"
                value={filters.format}
                onChange={handleInputChange}
            >
                <option value="">Select format</option>
                {typeOptions.map((type, index) => (
                    <option key={index} value={type}>{type}</option>
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
                {statusOptions.map((status, index) => (
                    <option key={index} value={status}>{status}</option>
                ))}
            </select>

            <select
                className="form-select mb-3"
                name="sortBy"
                value={filters.sortBy}
                onChange={handleInputChange}
            >
                <option value="">Sort by</option>
                {sortByOptions.map((sortBy, index) => (
                    <option key={index} value={sortBy}>{sortBy}</option>
                ))}
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
    )
}

export default Filters