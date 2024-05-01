import React, { useState, useEffect } from 'react'
import { Container } from 'react-bootstrap'
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
                    const isFinalStage = index === array.length - 1

                    return (
                        <div key={typeName} className={isFinalStage ? `${styles.stage} ${styles.finalStage}` : `${styles.stage}`}>
                            <h3>{typeName.replace('-', ' ')}</h3>
                            <div className={styles.matchesContainer} style={{ rowGap: index === 1 ? index * 175 : index * 270 }}>
                                {matches.map((match, matchIndex) => (
                                    <div key={match.matchId} className={`${styles.match} ${isFinalStage ? styles.finalMatch : ''}`}>
                                        {!isFinalStage &&
                                            <div>
                                                <div className={styles.connector}></div>
                                                <div className={styles.connectorVertical} style={{ height: index === 0 ? matchIndex > 2 ? 193 : 194 : matchIndex > 0 ? index * (371 - 2 * index) : Math.ceil(index * (368.5 - index)), position: "absolute" }} ></div>

                                            </div>
                                        }
                                        {
                                            index !== 0 &&
                                            <div className={styles.connectorLeft}></div>
                                        }


                                        <MatchCard match={match} index={index + 1} matchIndex={matchIndex + 1} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )
                })}
            </div>
        </Container>
    )
}

export default PlayOff