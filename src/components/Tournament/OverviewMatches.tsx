import React, { useState, useEffect } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import MatchCard from '../Match/MatchCard'
import { MatchProps, TournamentProps } from '../Match/Match.def'
import styles from "./Tournament.module.css"

const LatestMatches = () => {
    const [latestMatches, setLatestMatches] = useState<MatchProps[]>([])
    const [upcomingMatches, setUpcomingMatches] = useState<MatchProps[]>([])
    const [tournament, setUpTournament] = useState<TournamentProps>()
    const tournamentId = localStorage.getItem("tournamentId")

    const formatDate = (dateString: string | number | Date) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' } as const // This ensures the types are inferred as literals
        return new Date(dateString).toLocaleDateString(undefined, options)
    }

    useEffect(() => {
        const fetchLatestMatches = async () => {
            try {
                const response = await fetch(`http://localhost:3000/tournaments/${tournamentId}/matches/results`)
                if (response.ok) {
                    const matches = await response.json()
                    setLatestMatches(matches)
                    console.log(matches)
                } else {
                    throw new Error('Failed to fetch latest matches')
                }
            } catch (error) {

            }
        }
        const fetchUpcomingMatches = async () => {
            try {
                const response = await fetch(`http://localhost:3000/tournaments/${tournamentId}/matches/upcoming`)
                if (response.ok) {
                    const upcoming = await response.json()
                    setUpcomingMatches(upcoming)
                    console.log(upcoming)
                } else {
                    throw new Error('Failed to fetch latest matches')
                }
            } catch (error) {

            }
        }
        const fetchTournament = async () => {
            try {
                const response = await fetch(`http://localhost:3000/tournaments/${tournamentId}`)
                if (response.ok) {
                    const tournament = await response.json()
                    setUpTournament(tournament[0])
                    console.log(tournament)
                } else {
                    throw new Error('Failed to fetch latest matches')
                }
            } catch (error) {

            }
        }

        fetchLatestMatches()
        fetchUpcomingMatches()
        fetchTournament()
    }, [])

    if (!latestMatches) {
        return null // or some placeholder
    }

    return (
        <Container>
            <Row>
                <Col md={3} className={styles.tournamentDetailsColumn}>
                    <div className={styles.tournamentInfo}>
                        <div><strong>Start:</strong> Start</div>
                        <div><strong>End:</strong> Start</div>
                        <div><strong>Format:</strong> {tournament?.format}</div>
                        <div><strong>Place:</strong> {tournament?.location}</div>
                        <div><strong>Type:</strong> {tournament?.type}</div>
                    </div>
                </Col>
                <Col md={9}>
                    <div className={styles.resultsContainer}>
                        <div className={styles.resultsColumn}>
                            <h3 className={styles.heading}>Latest Results</h3>
                            <Row className="g-4">
                                {latestMatches.map((match: MatchProps) => (
                                    <Col key={match.matchId}>
                                        <MatchCard match={match} />
                                    </Col>
                                ))}
                            </Row>
                        </div>
                        <div className={styles.resultsColumn}>
                            <h3 className={styles.heading}>Upcoming Matches</h3>
                            <Row className="g-4">
                                {upcomingMatches.map((match: MatchProps) => ( // Assuming you have upcomingMatches
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

export default LatestMatches
