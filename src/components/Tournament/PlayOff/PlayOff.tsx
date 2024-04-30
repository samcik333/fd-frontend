import React, { useState, useEffect } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import MatchCard from '../../Match/MatchCard'
import { MatchProps } from '../../Match/Match.def'
import styles from "./PlayOff.module.css"

const PlayOff: React.FC = () => {
    const [matchesByType, setMatchesByType] = useState<Record<string, MatchProps[]>>({})
    const tournamentId = localStorage.getItem("tournamentId")

    useEffect(() => {
        fetchMatches()
    }, [])

    const fetchMatches = async () => {
        try {
            const response = await fetch(`http://localhost:3000/tournaments/${tournamentId}/matches`)
            if (response.ok) {
                const matches: MatchProps[] = await response.json()
                // Group matches by type
                const groupedByType = matches.reduce((acc: Record<string, MatchProps[]>, match: MatchProps) => {
                    const { type } = match
                    if (!acc[type]) {
                        acc[type] = []
                    }
                    acc[type].push(match)
                    return acc
                }, {})
                setMatchesByType(groupedByType)
            } else {
                throw new Error('Network response was not ok.')
            }
        } catch (error) {
            console.error('Failed to fetch matches:', error)
        }
    }

    return (
        <Container>
            <div className={styles.bracket}>
                {Object.entries(matchesByType).map(([typeName, matches], index, array) => {
                    const isFinalStage = index === array.length - 1 // Check if it is the final stage

                    return (
                        <div key={typeName} className={isFinalStage ? `${styles.stage} ${styles.finalStage}` : `${styles.stage}`}>
                            <h3>{typeName.replace('-', ' ')}</h3>
                            {matches.map((match) => (
                                <div key={match.matchId} className={isFinalStage ? `${styles.match} ${styles.finalMatch}` : `${styles.match}`}>
                                    <MatchCard match={match} />
                                </div>
                            ))}
                        </div>
                    )
                })}
            </div>
        </Container>
    )
}

export default PlayOff
