import React, { useState, useEffect, useRef } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import MatchCard from '../Match/MatchCard'
import { MatchProps, TournamentProps } from '../Match/Match.def'
import styles from "./Tournament.module.css"

const LatestMatches = () => {
    const [latestMatches, setLatestMatches] = useState<MatchProps[]>([])
    const [upcomingMatches, setUpcomingMatches] = useState<MatchProps[]>([])
    const [tournament, setUpTournament] = useState<TournamentProps>()
    const tournamentId = localStorage.getItem("tournamentId")
    const isMounted = useRef(false) // useRef to track initial mount

    const formatDate = (dateString: string | number | Date) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' } as const // This ensures the types are inferred as literals
        return new Date(dateString).toLocaleDateString(undefined, options)
    }

    useEffect(() => {
        if (!isMounted.current) {
            isMounted.current = true // Set to true on first mount
            fetchLatestMatches()
            fetchUpcomingMatches()
            fetchTournament()
        }
        // No dependencies array means this effect runs only once on mount
    }, [])

    const fetchLatestMatches = async () => {
        try {
            const response = await fetch(`http://localhost:3000/tournaments/${tournamentId}/matches/results`)
            if (response.ok) {
                const matches = await response.json()
                setLatestMatches(matches)
            } else {
                throw new Error('Failed to fetch latest matches')
            }
        } catch (error) {
            console.error("Error fetching latest matches:", error)
        }
    }

    const fetchUpcomingMatches = async () => {
        try {
            const response = await fetch(`http://localhost:3000/tournaments/${tournamentId}/matches/upcoming`)
            if (response.ok) {
                const upcoming = await response.json()
                setUpcomingMatches(upcoming)
            } else {
                throw new Error('Failed to fetch upcoming matches')
            }
        } catch (error) {
            console.error("Error fetching upcoming matches:", error)
        }
    }

    const fetchTournament = async () => {
        try {
            const response = await fetch(`http://localhost:3000/tournaments/${tournamentId}`)
            if (response.ok) {
                const tournament = await response.json()
                setUpTournament(tournament[0])
            } else {
                throw new Error('Failed to fetch tournament details')
            }
        } catch (error) {
            console.error("Error fetching tournament details:", error)
        }
    }

    if (!latestMatches) {
        return null // or some placeholder
    }

    return (
        <Container>
            <Row>
                <Col md={3} className={styles.tournamentDetailsColumn}>
                    <div className={styles.tournamentInfo}>
                        {tournament && <>
                            <div><strong>Start:</strong> {formatDate(tournament.startDate)}</div>
                            <div><strong>End:</strong> {formatDate(tournament.endDate)}</div>
                            <div><strong>Format:</strong> {tournament.format}</div>
                            <div><strong>Place:</strong> {tournament.location}</div>
                            <div><strong>Type:</strong> {tournament.type}</div>
                        </>}
                    </div>
                </Col>
                <Col lg md={9}>
                    <div className={styles.resultsContainer}>
                        {latestMatches.length !== 0 &&
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
                        }
                        {upcomingMatches.length !== 0 &&
                            <div className={styles.resultsColumn}>
                                <h3 className={styles.heading}>Upcoming Matches</h3>
                                <Row className="g-4">
                                    {upcomingMatches.map((match: MatchProps) => (
                                        <Col key={match.matchId}>
                                            <MatchCard match={match} />
                                        </Col>
                                    ))}
                                </Row>
                            </div>
                        }
                    </div>
                </Col>
            </Row>
        </Container>
    )
}

export default LatestMatches
