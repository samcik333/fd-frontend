import React, { useState, useEffect, useRef } from "react"
import { Card, Col, Container, Row } from "react-bootstrap"
import MatchCard from "../Match/MatchCard"
import { MatchProps, TournamentProps } from "../Match/Match.def"
import styles from "./Tournament.module.css"

const OverviewMatches: React.FC<{
  tournament: TournamentProps
  setTournament: React.Dispatch<
    React.SetStateAction<TournamentProps | undefined>
  >
}> = ({ tournament, setTournament }) => {
  const [latestMatches, setLatestMatches] = useState<MatchProps[]>([])
  const [upcomingMatches, setUpcomingMatches] = useState<MatchProps[]>([])
  const isMounted = useRef(false)

  const formatDate = (dateString: string | number | Date) => {
    const options = { year: "numeric", month: "long", day: "numeric" } as const
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true
      fetchLatestMatches()
      fetchUpcomingMatches()
      fetchTournament()
    }
  }, [])

  const fetchLatestMatches = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/tournaments/${tournament?.tournamentId}/matches/results`,
        { credentials: "include" },
      )
      if (response.ok) {
        const matches = await response.json()
        setLatestMatches(matches)
      } else {
        throw new Error("Failed to fetch latest matches")
      }
    } catch (error) {
      console.error("Error fetching latest matches:", error)
    }
  }

  const fetchUpcomingMatches = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/tournaments/${tournament.tournamentId}/matches/upcoming`,
        { credentials: "include" },
      )
      if (response.ok) {
        const upcoming = await response.json()
        setUpcomingMatches(upcoming)
      } else {
        throw new Error("Failed to fetch upcoming matches")
      }
    } catch (error) {
      console.error("Error fetching upcoming matches:", error)
    }
  }

  const fetchTournament = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/tournaments/${tournament.tournamentId}`,
      )
      if (response.ok) {
        const tournament = await response.json()
        setTournament(tournament[0])
      } else {
        throw new Error("Failed to fetch tournament details")
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
        <Col md={4}>
          {tournament && (
            <Card className={styles.tournamentCard}>
              <Card.Header as="h5">Tournament Details</Card.Header>
              <Card.Body>
                <div className={`${styles.tournamentInfo} mb-2`}>
                  <strong>Start:</strong> {formatDate(tournament.startDate)}
                </div>
                <div className={`${styles.tournamentInfo} mb-2`}>
                  <strong>End:</strong> {formatDate(tournament.endDate)}
                </div>
                <div className={`${styles.tournamentInfo} mb-2`}>
                  <strong>Format:</strong> {tournament.format}
                </div>
                <div className={`${styles.tournamentInfo} mb-2`}>
                  <strong>Place:</strong> {tournament.location}
                </div>
                <div className={styles.tournamentInfo}>
                  <strong>Type:</strong> {tournament.type}
                </div>
              </Card.Body>
            </Card>
          )}
        </Col>
        <Col lg md={9}>
          <div className={styles.resultsContainer}>
            {latestMatches.length !== 0 && (
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
            )}
            {upcomingMatches.length !== 0 && (
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
            )}
          </div>
        </Col>
      </Row>
    </Container>
  )
}

export default OverviewMatches
