import React from 'react'
import styles from './Tournament.module.css'

interface TournamentCardProps {
    title: string
    type: string
    stage: string
    teams: number
    location: string
}

const TournamentCard: React.FC<TournamentCardProps> = ({ title, type, stage, teams, location }) => {
    return (
        <div className={styles.card}>
            <div className={styles.header}>
                <h2>{title}</h2>
                {/* Tu by bol obrázok, ale pre zjednodušenie použijeme text */}
                <div className={styles.badge}>Badge</div>
            </div>
            <div className={styles.info}>
                <p>Type: {type}</p>
                <p>Current Stage: {stage}</p>
                <p>Teams: {teams}</p>
                <p>Location: {location}</p>
            </div>
            <button className={styles.button}>Details</button>
        </div>
    )
}

export default TournamentCard