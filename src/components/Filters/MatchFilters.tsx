import React, { useState } from 'react'
import filter from './Filters.module.css'

interface FiltersProps {
    onFilterChange: (filterName: string, value: string) => void
}

interface FilterState {
    tournament: string
    team: string
    status: string
    date: string
}

const MatchFilters: React.FC<FiltersProps> = ({ onFilterChange }) => {
    const initialFilters: FilterState = {
        tournament: '',
        team: '',
        status: '',
        date: new Date().toISOString().split('T')[0]
    }

    const [filters, setFilters] = useState<FilterState>(initialFilters)

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = event.target
        onFilterChange(name, value)
        setFilters(prevFilters => ({ ...prevFilters, [name]: value }))
    }

    const resetFilters = () => {
        setFilters(initialFilters)
        Object.keys(initialFilters).forEach(filter => onFilterChange(filter, ''))
    }

    return (
        <div className={`${filter.filter_panel} p-3`}>
            <input type="text" className="form-control mb-3" name="tournament" value={filters.tournament} onChange={handleInputChange} placeholder="Search by tournament name" />
            <input type="text" className="form-control mb-3" name="team" value={filters.team} onChange={handleInputChange} placeholder="Search by team name" />
            <select className="form-select mb-3" name="status" value={filters.status} onChange={handleInputChange}>
                <option value="">Select status</option>
                {["finished", "live", "upcoming"].map((status, index) => (
                    <option key={index} value={status}>{status}</option>
                ))}
            </select>
            <input type="date" className="form-control mb-3" name="date" value={filters.date} onChange={handleInputChange} />
            <button className="btn btn-warning w-100" onClick={resetFilters}>Reset Filters</button>
        </div>
    )
}

export default MatchFilters
