import React, { useEffect, useState } from "react"
import StatsCard from "./StatsCard"
import { ScorerProps, TeamProps, TournamentProps } from "../../Match/Match.def"

// Define a TypeScript interface for the team data

interface Stat {
  name: string
  team: string
  value: number
}

// TODO STATS SPRAVIT
const Stats: React.FC<{
  tournamentId: string
}> = ({ tournamentId }) => {
  const [stats, setStats] = useState<ScorerProps[]>([])



  useEffect(() => {
    fetchTeams()
  }, [])

  const fetchTeams = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/tournaments/${tournamentId}/stats`,
        { credentials: "include" },
      )
      if (response.ok) {
        const data = await response.json()
        console.log(data)
        setStats(data)
      } else {
        throw new Error("Failed to fetch teams.")
      }
    } catch (error) {
      console.error("Error fetching teams:", error)
    }
  }

  const getTopType = (stats: ScorerProps[], type: 'scorer' | 'assister' | 'yellowCard' | 'redCard'): Stat[] => {
    switch (type) {
      case 'scorer':
        const topScorers = stats.sort((a, b) => b.goals - a.goals)
        return topScorers.filter(t => t.goals > 0).map((scorer) => ({
          name: scorer.player.firstName + ' ' + scorer.player.lastName,
          team: scorer.player.team.name,
          value: scorer.goals
        }))

      case 'assister':
        const topAssisters = stats.sort((a, b) => b.assists - a.assists)
        return topAssisters.filter(t => t.assists > 0).map((scorer) => ({
          name: scorer.player.firstName + ' ' + scorer.player.lastName,
          team: scorer.player.team.name,
          value: scorer.assists
        }))

      case 'yellowCard':
        const topYellowCards = stats.sort((a, b) => b.yellowCards - a.yellowCards)
        return topYellowCards.filter(t => t.yellowCards > 0).map((scorer) => ({
          name: scorer.player.firstName + ' ' + scorer.player.lastName,
          team: scorer.player.team.name,
          value: scorer.yellowCards
        }))

      case 'redCard':
        const topRedCards = stats.sort((a, b) => b.redCards - a.redCards)
        return topRedCards.filter(t => t.redCards > 0).map((scorer) => ({
          name: scorer.player.firstName + ' ' + scorer.player.lastName,
          team: scorer.player.team.name,
          value: scorer.redCards
        }))
    }
  }

  return (
    <div style={{ display: "flex", flexDirection: 'column', margin: '0 auto', paddingTop: "50px" }}>
      <div style={{ display: "flex", flexDirection: 'row' }}>
        <StatsCard
          key={"index"}
          title={"Top Scorers"}
          stats={getTopType(stats, 'scorer')}
        />
        <StatsCard
          key={"index"}
          title={"Top Assisters"}
          stats={getTopType(stats, 'assister')}
        />
      </div>
      <div style={{ display: "flex", flexDirection: 'row' }}>

        <StatsCard
          key={"index"}
          title={"Most yellow cards"}
          stats={getTopType(stats, 'yellowCard')}
        />
        <StatsCard
          key={"index"}
          title={"Most red cards"}
          stats={getTopType(stats, 'redCard')}
        />
      </div>
    </div>
  )
}

export default Stats
