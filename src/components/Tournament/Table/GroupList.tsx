import React, { useState, useEffect } from 'react'
import { Button, Container, Row } from 'react-bootstrap'
import { MatchProps, StandingProps } from '../../Match/Match.def'
import GroupTable from './GroupTable' // Renders a table for a single group
import MatchCard from '../../Match/MatchCard'
import matchCss from "../../Match/Matches.module.css"

const GroupList: React.FC = () => {
    const [groupedStandings, setGroupedStandings] = useState<Record<string, StandingProps[]>>({})
    const [tournamentMatches, setTournamentMatches] = useState<MatchProps[]>([])
    const tournamentId = localStorage.getItem("tournamentId") || 'defaultTournamentId' // Provide a default value or handle null cases
    const [currentRoundIndex, setCurrentRoundIndex] = useState(0)
    const [rounds, setRounds] = useState(['1.Round', '2.Round']) // Presumed round names

    useEffect(() => {
        const fetchStandings = async () => {
            try {
                const response = await fetch(`http://localhost:3000/tournaments/${tournamentId}/standings`)
                if (response.ok) {
                    const data: StandingProps[] = await response.json()
                    const groups = data.reduce((acc: Record<string, StandingProps[]>, standing: StandingProps) => {
                        const group = standing.group || 'Ungrouped' // Fallback for undefined group
                        acc[group] = acc[group] || []
                        acc[group].push(standing)
                        return acc
                    }, {})
                    setGroupedStandings(groups)
                } else {
                    throw new Error('Network response was not ok.')
                }
            } catch (error) {
                console.error("Error fetching standings:", error)
            }
        }

        const fetchMatches = async () => {
            try {
                const roundType = encodeURIComponent(rounds[currentRoundIndex])
                const response = await fetch(`http://localhost:3000/tournaments/${tournamentId}/matches?type=${roundType}`)
                if (response.ok) {
                    const data: MatchProps[] = await response.json()
                    setTournamentMatches(data.filter(match => match.type === roundType)) // Filter matches by type
                } else {
                    throw new Error('Network response was not ok.')
                }
            } catch (error) {
                console.error("Error fetching matches:", error)
            }
        }

        fetchStandings()
        fetchMatches()
    }, [tournamentId, currentRoundIndex, rounds])

    const goPreviousRound = () => setCurrentRoundIndex(Math.max(0, currentRoundIndex - 1))
    const goNextRound = () => setCurrentRoundIndex(Math.min(rounds.length - 1, currentRoundIndex + 1))

    return (
        <Container>
            <Row>
                {Object.entries(groupedStandings).map(([groupName, standings], index) => (
                    <GroupTable key={index} groupName={groupName} standings={standings} />
                ))}
                <div>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <h3>Schedule</h3>
                        <div style={{ display: 'flex', flexDirection: 'row', backgroundColor: '#D9D9D9', width: 'fit-content', marginBottom: '20px' }}>
                            <Button variant='link' style={{ textDecoration: 'none' }} onClick={goPreviousRound} disabled={currentRoundIndex === 0}>&lt;</Button>
                            <h4 style={{ display: 'flex', alignSelf: 'center' }}>{rounds[currentRoundIndex]}</h4>
                            <Button variant='link' style={{ textDecoration: 'none' }} onClick={goNextRound} disabled={currentRoundIndex === rounds.length - 1}>&gt;</Button>
                        </div>
                        <div className={`${matchCss.matchListContainer}`}>
                            {tournamentMatches.map((match, idx) => (
                                <MatchCard key={idx} match={match} />
                            ))}
                        </div>
                    </div>
                </div>
            </Row>
        </Container>
    )
}

export default GroupList
