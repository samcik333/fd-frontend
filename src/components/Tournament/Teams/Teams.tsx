import React, { useEffect, useState } from 'react'
import { ListGroup, Button } from 'react-bootstrap'
import { Trash } from 'react-bootstrap-icons'
import { TeamProps, UserProps } from '../../Match/Match.def'
import { useUser } from '../../../UserContext'
import Players from './Players' // Adjust the import path as necessary

const Teams: React.FC<{ avalibleTeams: number | undefined, organizerId: UserProps | undefined }> = ({ avalibleTeams, organizerId }) => {
    const [teams, setTeams] = useState<TeamProps[]>([])
    const [selectedTeam, setSelectedTeam] = useState<TeamProps | null>(null) // Specify that selectedTeam can be TeamProps or null
    const { user } = useUser()
    const [isOrganizer, setIsOrganizer] = useState<boolean>(false)

    useEffect(()=>{
        console.log(organizerId);
        console.log(user);
        if(organizerId && user)
            {
                console.log('toto')
                setIsOrganizer(organizerId.userId === user[0].userId)
            }
        else{
            setIsOrganizer(false)
        }
    },[organizerId,user])

    useEffect(() => {
        fetchTeams()
    }, [])

    const fetchTeams = async () => {
        try {
            const tournamentId = localStorage.getItem("tournamentId")
            const response = await fetch(`http://localhost:3000/tournaments/${tournamentId}/teams`, { credentials: "include" })
            if (response.ok) {
                const data = await response.json()
                setTeams(data)
            } else {
                throw new Error('Failed to fetch teams.')
            }
        } catch (error) {
            console.error("Error fetching teams:", error)
        }
    }

    const handleTeamClick = (team: TeamProps) => {  // Specify that team is of type TeamProps
        setSelectedTeam(team)
    }
    console.log(isOrganizer)
    return (
        <div className="container mt-3">
            <div className="mb-2">
                <strong>Teams: {teams.length} / {avalibleTeams}</strong>
            </div>
            <ListGroup>
                {teams.map((team, index) => (
                    <ListGroup.Item key={index} className="d-flex justify-content-between align-items-center" role="button"
                        onClick={() => handleTeamClick(team)}>
                        {team.name}
                        {   isOrganizer &&
                            <Button variant="danger" size="sm">
                                <Trash />
                            </Button>
                        }
                    </ListGroup.Item>
                ))}
            </ListGroup>
            {   isOrganizer && 
                    <Button variant="primary" className="mt-3" style={{ width: '100%' }}>
                        Add Team
                    </Button>
            }
            {selectedTeam && <Players teamId={selectedTeam.teamId} teamName={selectedTeam.name} isOrganizer={isOrganizer}/>}
        </div>
    )
}

export default Teams
