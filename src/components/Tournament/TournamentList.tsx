import React, { useEffect, useState } from 'react'
import TournamentCard from './TournamentCard'
import Filters from '../Filters/Filters'
import tour from "./Tournament.module.css"
import { TournamentProps } from '../Match/Match.def'

const TournamentList: React.FC = () => {
    const [tournaments, setTournaments] = useState<TournamentProps[]>([])
    const [filters, setFilters] = useState<Record<string, string>>({})

    const fetchTournaments = async (filters: Record<string, string>) => {
        try {
            const queryParams = new URLSearchParams(filters).toString()
            const response = await fetch(`http://localhost:3000/tournaments?${queryParams}`)
            if (response.ok) {
                const data = await response.json()
                setTournaments(data) // Update the tournaments state with the fetched data
            } else {
                throw new Error('Network response was not ok.')
            }
        } catch (error) {
            console.error("Error fetching tournaments:", error)
            // Set error state here if you have one
        }
    }


    // Call this function whenever filters change
    const handleFilterChange = (filterName: string, value: string) => {
        const newFilters = { ...filters, [filterName]: value }
        setFilters(newFilters)
        fetchTournaments(newFilters)
    }

    // Load more tournaments
    const loadMoreTournaments = () => {
        // Here you would increase some pagination counter and fetch more items
    }

    useEffect(() => {
        const today = new Date().toISOString().split('T')[0]
        setFilters({ ...filters, date: today })
        fetchTournaments({})
    }, [])

    return (
        <div style={{ backgroundColor: "#F0F2F5", width: "100%" }}>
            {/* Assuming Filters is a component you've created */}
            <Filters onFilterChange={handleFilterChange} />
            <div className={`${tour.tournament_list}`}>
                {tournaments.map((tournament, index) => (
                    <TournamentCard
                        key={index}
                        tournament={tournament}
                    />
                ))}
            </div>
        </div>
    )
}

export default TournamentList

