import React, { useEffect, useState } from 'react'
import Filters from '../Filters/MatchFilters'
import matchCss from "./Matches.module.css"
import MatchCard from './MatchCard'
import { MatchProps } from './Match.def'

interface Filters {
    [key: string]: string
}

const MatchList: React.FC = () => {
    const today = new Date().toISOString().split('T')[0]
    const [matches, setMatches] = useState<MatchProps[]>([])
    const [filters, setFilters] = useState<Filters>({ date: today })

    useEffect(() => {
        fetchMatches(filters)
    }, [filters])

    const fetchMatches = async (filters: Filters) => {
        const queryParams = new URLSearchParams(filters).toString()

        try {
            const response = await fetch(`http://localhost:3000/matches?${queryParams}`)
            if (response.ok) {
                const data = await response.json()
                setMatches(data)
            } else {
                throw new Error('Network response was not ok.')
            }
        } catch (error) {
            console.error("Error fetching matches:", error)
        }
    }

    const handleFilterChange = (filterName: string, value: string) => {
        setFilters(prevFilters => ({ ...prevFilters, [filterName]: value }))
    }

    return (
        <div className="bg-light" style={{ width: "100%" }}>
            <Filters onFilterChange={handleFilterChange} />
            <div style={{ marginLeft: '356px', marginTop: '80px' }}>
                <div className={`${matchCss.matchListContainer}`}>
                    {matches.map((match, index) => (
                        <MatchCard key={index} match={match} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default MatchList
