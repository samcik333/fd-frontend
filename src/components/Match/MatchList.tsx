import React, { useState } from 'react'
import Filters from '../Filters/Filters'
import matchCss from "./Matches.module.css"
import MatchCard from './MatchCard'
import { MatchProps } from './Match.def'


const MatchList: React.FC = () => {
    const [matches, setMatches] = useState<MatchProps[]>([])
    const [filters, setFilters] = useState<Record<string, string>>({})

    const fetchMatches = async (filters: Record<string, string>) => {
        try {
            const queryParams = new URLSearchParams(filters).toString()
            const response = await fetch(`http://localhost:3000/matches?${queryParams}`)
            if (response.ok) {
                const data = await response.json()
                setMatches(data) // Update the tournaments state with the fetched data
            } else {
                throw new Error('Network response was not ok.')
            }
        } catch (error) {
            console.error("Error fetching tournaments:", error)
            // Set error state here if you have one
        }
    }
    const handleFilterChange = (filterName: string, value: string) => {
        const newFilters = { ...filters, [filterName]: value }
        setFilters(newFilters)
        fetchMatches(newFilters)
    }
    return (
        <div>
            {/* Assuming Filters is a component you've created */}
            <Filters onFilterChange={handleFilterChange} />
            <div className={`${matchCss.matchListContainer}`}>
                {matches.map((match, index) => (
                    <MatchCard key={index} match={match} />
                ))}
            </div>
        </div>
    )
}

export default MatchList