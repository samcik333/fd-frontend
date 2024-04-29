// GroupList.tsx
import React, { useState, useEffect } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { MatchProps, StandingProps } from '../../Match/Match.def'
import GroupTable from './GroupTable' // Renders a table for a single group
import MatchCard from '../../Match/MatchCard'

const GroupList: React.FC = () => {
    const [groupedStandings, setGroupedStandings] = useState<Record<string, StandingProps[]>>({})
    const [tournamentMatches, setTournamentMatches] = useState<MatchProps[]>([])
    const tournamentId = localStorage.getItem("tournamentId")
    const [currentRoundIndex, setCurrentRoundIndex] = useState(0)
    const rounds = ["1.Round", "2.Round"] // Add more rounds as 

    const goNextRound = () => {
        if (currentRoundIndex < rounds.length - 1) {
            setCurrentRoundIndex(currentRoundIndex + 1)
            fetchMatches({})
        }
    }

    const goPreviousRound = () => {
        if (currentRoundIndex > 0) {
            setCurrentRoundIndex(currentRoundIndex - 1)
            fetchMatches({})
        }
    }

    useEffect(() => {
        fetchStandings({})
        fetchMatches({})
    }, []) // Make sure to only run once when the component mounts

    const fetchStandings = async (filters: Record<string, string>) => {
        try {
            const response = await fetch(`http://localhost:3000/tournaments/${tournamentId}/standings`)
            if (response.ok) {
                const data: StandingProps[] = await response.json()
                // Group the standings by the 'group' property
                const groups = data.reduce((acc, standing) => {
                    const group = standing.group || 'Ungrouped' // Handle the case where group might be undefined
                    acc[group] = acc[group] || []
                    acc[group].push(standing)
                    return acc
                }, {} as Record<string, StandingProps[]>)
                setGroupedStandings(groups)
            } else {
                throw new Error('Network response was not ok.')
            }
        } catch (error) {
            console.error("Error fetching standings:", error)
        }
    }

    const fetchMatches = async (filters: Record<string, string>) => {
        try {
            const response = await fetch(`http://localhost:3000/tournaments/${tournamentId}/matches?type=${encodeURIComponent(rounds[currentRoundIndex])}`)
            if (response.ok) {
                const data: MatchProps[] = await response.json()
                // Group the standings by the 'group' property
                setTournamentMatches(data)
            } else {
                throw new Error('Network response was not ok.')
            }
        } catch (error) {
            console.error("Error fetching standings:", error)
        }
    }

    return (
        <Container>
            <Row>
                <Col>
                    {Object.entries(groupedStandings).map(([groupName, standings], index) => (
                        <GroupTable
                            key={index}
                            groupName={groupName}
                            standings={standings}
                        />
                    ))}
                </Col>
                <Col>
                    <div>
                        <div >
                            <h3>Schedule</h3>
                            <Row className="justify-content-center my-3">
                                <button onClick={goPreviousRound} disabled={currentRoundIndex === 0}>&lt; Prev</button>
                                <h4>{rounds[currentRoundIndex]}</h4>
                                <button onClick={goNextRound} disabled={currentRoundIndex === rounds.length - 1}>Next &gt;</button>
                            </Row>
                            <Row className="g-4">
                                {tournamentMatches.map((match: MatchProps) => (
                                    <Col key={match.matchId}>
                                        <MatchCard match={match} />
                                    </Col>
                                ))}
                            </Row>
                        </div>
                    </div>
                </Col>
            </Row>

        </Container>
    )
}

export default GroupList
