// GroupList.tsx
import React, { useState, useEffect } from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'
import { MatchProps, StandingProps } from '../../Match/Match.def'
import GroupTable from './GroupTable' // Renders a table for a single group
import MatchCard from '../../Match/MatchCard'
import matchCss from "../../Match/Matches.module.css"

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
                    {Object.entries(groupedStandings).map(([groupName, standings], index) => (
                        <GroupTable
                            key={index}
                            groupName={groupName}
                            standings={standings}
                        />
                    ))}
                    <div>
                        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                            <h3>Schedule</h3>
                                <div style={{display: 'flex', flexDirection: 'row', backgroundColor : '#D9D9D9', width: 'fit-content', marginBottom: '20px'}}>
                                    <Button variant='link' style={{textDecoration: 'none'}} onClick={goPreviousRound} disabled={currentRoundIndex === 0}>&lt;</Button>
                                        <h4 style={{display: 'flex', alignSelf: 'center'}}>{rounds[currentRoundIndex]}</h4>
                                    <Button variant='link' style={{textDecoration: 'none'}} onClick={goNextRound} disabled={currentRoundIndex === rounds.length - 1}>&gt;</Button>
                                </div>
                                <div className={`${matchCss.matchListContainer}`}>
                                    {tournamentMatches.map((match: MatchProps) => (
                                            <MatchCard match={match} />
                                    ))}
                                </div>

                        </div>
                    </div>
            </Row>

        </Container>
    )
}

export default GroupList
