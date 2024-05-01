import React, { useEffect, useState } from "react"
import { Nav } from "react-bootstrap"
import tour from "./Tournament.module.css"
import { useLocation } from "react-router-dom"
import { Tournament } from "./Tournament.def"
import OverviewMatches from "./OverviewMatches"
import { TournamentProps } from "../Match/Match.def"
import GroupList from "./Table/GroupList"
import PlayOff from "./PlayOff/PlayOff"

const Tabs: React.FC = () => {


    const location = useLocation()

    const [tournament, setTournament] = useState<TournamentProps>()

    const fetchTournament = async () => {
        try {
            const tournamentId = localStorage.getItem("tournamentId")
            const response = await fetch(`http://localhost:3000/tournaments/${tournamentId}`)
            if (response.ok) {
                const data = await response.json()
                if (data.length > 0) {
                    setTournament(data[0])
                }
                else {
                    throw new Error('Network response was not ok.')
                }

                // Update the tournaments state with the fetched data
            } else {
                throw new Error('Network response was not ok.')
            }
        } catch (error) {
            console.error("Error fetching tournaments:", error)
            // Set error state here if you have one
        }
    }

    // Function to determine if the link is active
    const isActive = (path: string) => {
        return location.pathname.includes(path)
    }

    useEffect(() => {
        fetchTournament()
    }, [])
    return (
        <div style={{display: 'flex' , width:'100%', flexDirection: 'column'}}>
            <div className={tour.tournamentHeader}>
                <img src="https://img.freepik.com/premium-vector/tournament-sports-league-logo-emblem_1366-201.jpg" alt="Tournament Logo" className={tour.logo} />
                <div>
                    <h3 className={tour.tournamentName}>{tournament?.name}</h3>
                    <span className={tour.tournamentStatus}>{tournament?.status}</span>
                </div>
            </div>
            <Nav className={`${tour.tabs}`}>
                <Nav.Link
                    href="/tournaments/overview"
                    className={`${tour.tab} ${isActive('/tournaments/overview') ? 'active' : ''}`}
                    style={{ borderBottom: isActive('/tournaments/overview') ? '3px solid #000' : 'none', color:'black'}}>
                    Overview
                </Nav.Link>
                {['Group', 'Group+Play-off'].includes(tournament?.format || "") && (
                    <Nav.Link
                        href="/tournaments/table"
                        className={`${tour.tab} ${isActive('/tournaments/table') ? 'active' : ''}`}
                        style={{ borderBottom: isActive('/tournaments/table') ? '3px solid #000' : 'none', color:'black' }}>
                        Table
                    </Nav.Link>
                )}
                {['Play-off', "Group+Play-off"].includes(tournament?.format || "") && (
                    <Nav.Link
                        href="/tournaments/play-off"
                        className={`${tour.tab} ${isActive('/tournaments/play-off') ? 'active' : ''}`}
                        style={{ borderBottom: isActive('/tournaments/play-off') ? '3px solid #000' : 'none', color: 'black'}}>
                        Playoffs
                    </Nav.Link>
                )}
                <Nav.Link href="/tournaments/stats"
                    className={`${tour.tab} ${isActive('/tournaments/stats') ? 'active' : ''}`}
                    style={{ borderBottom: isActive('/tournaments/stats') ? '3px solid #000' : 'none', color:'black' }}>
                    Statistics
                </Nav.Link>
            </Nav>
            {isActive('/tournaments/overview') && <OverviewMatches />}
            {isActive('/tournaments/table') && <GroupList />}
            {isActive('/tournaments/play-off') && <PlayOff />}
        </div >
    )
}

export default Tabs