import React from 'react'
import tour from "./Tournament.module.css"
import { useNavigate } from 'react-router-dom'
import { TournamentProps } from '../Match/Match.def'


const TournamentCard: React.FC<{ tournament: TournamentProps }> = ({ tournament }) => {

    const navigate = useNavigate()
    const handleCardClick = () => {
        // Define what happens when the card is clicked.
        try {
            localStorage.setItem("tournamentId", tournament.tournamentId.toString())
        } catch (error) {
            console.error('Failed to save to local storage', error)
        }
        navigate(`/tournaments/overview`)
    }
    return (
        <div className={`${tour.card}`} onClick={handleCardClick} role="button">
            <header className={`${tour.card_header}`}>
                <h2>{tournament.name}</h2>
                <img src="https://img.freepik.com/premium-vector/tournament-sports-league-logo-emblem_1366-201.jpg" alt="Tournament Badge" className={`${tour.badge}`} />
            </header>
            <div className={`${tour.card_content}`}>
                <p><strong>Type:</strong> {tournament.format}</p>
                <p><strong>Current Stage:</strong> {tournament.stage}</p>
                <p><strong>Teams:</strong> {tournament.numOfTeams}</p>
                <p><strong>Location:</strong> {tournament.location}</p>
            </div>
        </div>
    )
}

export default TournamentCard