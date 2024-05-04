import React, { useEffect, useState } from 'react'
import StatsCard from './PlayerStats'
import { ScorerProps, TeamProps } from '../../Match/Match.def'

// Define a TypeScript interface for the team data

interface Stat {
    name: string
    team: string
    value: number
}

const Stats: React.FC = () => {
    const [stats, setStats] = useState<ScorerProps[]>([])

    useEffect(() => {
        fetchTeams()
    }, [])

    const fetchTeams = async () => {
        try {
            const tournamentId = localStorage.getItem("tournamentId")
            const response = await fetch(`http://localhost:3000/tournaments/${tournamentId}/stats`, { credentials: "include" })
            if (response.ok) {
                const data = await response.json()
                setStats(data)
            } else {
                throw new Error('Failed to fetch teams.')
            }
        } catch (error) {
            console.error("Error fetching teams:", error)
        }
    }

    const createStatsArray = (stat: ScorerProps): Stat[] => {
        return [
            { name: 'Saka', stat: stat.player.teams., value: stat.goals },
        ]
    }

    return (
        <div className="container">
            <div className="row">
                {stats.map(stat => (
                    <StatsCard key={"index"} title={"Barcelona"} stats={createStatsArray(stat)} />
                ))}
            </div>
        </div>
    )
}

export default Stats
