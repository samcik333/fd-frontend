import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useUser } from '../../UserContext'
import { Tournament } from './Tournament.def'

// Define prop types for LoginForm
type TournamentFormProps = {
    onSuccessfullCreate: () => void
}

export const CreateTournamentModel: React.FC<TournamentFormProps> = ({ onSuccessfullCreate }) => {
    const [name, setName] = useState('')
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')
    const [place, setPlace] = useState('')
    const [logo, setLogo] = useState(null)
    const [format, setFormat] = useState('groups')
    const [type, setType] = useState('')
    const [numGroups, setNumGroups] = useState("")
    const [numTeams, setNumTeams] = useState("")
    const [numOfAdvanced, setNumOfAdvanced] = useState("")
    const [numOfTeamsInGroup, setNumOfTeamsInGroup] = useState("")
    const [numberOfPlayOffTeams, setNumberOfPlayOffTeams] = useState("")
    const [isPublic, setIsPublic] = useState(false)
    const [isGroup, setIsGroup] = useState(false)
    const [isPlayOff, setIsPlayOff] = useState(false)

    const handleChange = (format: string, group: boolean, playOff: boolean) => {
        setFormat(format)                // Set format to 'groups'
        setIsGroup(group)
        setIsPlayOff(playOff)                   // Set isGroup to true whenever the switch is toggled
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault() // Prevent the default form submission
        await createTournaments() // Call your function to handle the API request
        onSuccessfullCreate() // Assuming you want to call this after successful creation
    }

    //TODO prepisat
    const createTournaments = async () => {
        const endpoint = "http://localhost:3000/tournaments/create"
        let tournamentData: Partial<Tournament> = {}
        if (name) tournamentData.name = name
        if (startDate) tournamentData.startDate = startDate
        if (endDate) tournamentData.endDate = endDate
        if (place) tournamentData.location = place
        if (format) tournamentData.format = format
        if (type) tournamentData.type = type
        if (numTeams) tournamentData.numOfTeams = parseInt(numTeams, 10)
        if (numGroups) tournamentData.numOfGroups = parseInt(numGroups, 10)
        if (numOfAdvanced) tournamentData.numOfAdvanced = parseInt(numOfAdvanced, 10)
        if (numOfTeamsInGroup) tournamentData.numbOfTeamsInGroup = parseInt(numOfTeamsInGroup, 10)
        if (numberOfPlayOffTeams) tournamentData.numberOfPlayOffTeams = parseInt(numberOfPlayOffTeams, 10)
        tournamentData.visibility = isPublic ? "public" : "private"
        tournamentData.status = "upcoming" // assuming default status

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: "include",
            body: JSON.stringify(tournamentData)
        } as RequestInit

        try {
            const response = await fetch(endpoint, options)
            if (response.ok) {
                console.log('Tournament created successfully')
                onSuccessfullCreate()
            } else {
                const errorData = await response.json()
                console.error('Failed to create tournament:', errorData.message)
            }
        } catch (error) {
            console.error("Error while fetching:", error)
        }
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter Name"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Start Date</Form.Label>
                <Form.Control
                    type="date"
                    required
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>End Date</Form.Label>
                <Form.Control
                    type="date"
                    required
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Place</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Location of the event"
                    required
                    value={place}
                    onChange={(e) => setPlace(e.target.value)}
                />
            </Form.Group>
            <Form.Group>
                <Form.Label>Format</Form.Label>
                <Form.Check
                    type="radio"
                    label="Group"
                    name="formatOptions"
                    id="formatGroup"
                    value="Group"
                    checked={format === 'Group'}
                    onChange={() => handleChange("Group", true, false)}
                />
                <Form.Check
                    type="radio"
                    label="Play-off"
                    name="formatOptions"
                    id="formatPlay-off"
                    value="Play-off"
                    checked={format === 'Play-off'}
                    onChange={() => handleChange("Play-off", false, true)}
                />
                <Form.Check
                    type="radio"
                    label="Group + Play-off"
                    name="formatOptions"
                    id="formatGroupKnockout"
                    value="Group+Play-off"
                    checked={format === 'Group+Play-off'}
                    onChange={() => handleChange("Group+Play-off", true, true)}
                />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Check
                    type="switch"
                    id="custom-switch"
                    label="Public"
                    checked={isPublic}
                    onChange={(e) => setIsPublic(e.target.checked)}
                />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Number of players in team</Form.Label>
                <Form.Select
                    required
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                >
                    <option value="2v2">2</option>
                    <option value="3v3">3</option>
                    <option value="4v4">4</option>
                    <option value="5v5">5</option>
                    <option value="6v6">6</option>
                    <option value="7v7">7</option>
                    <option value="8v8">8</option>
                    <option value="9v9">9</option>
                    <option value="10v10">10</option>
                    <option value="11v11">11</option>

                </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Number of teams</Form.Label>
                <Form.Control
                    type="number"
                    required
                    value={numTeams}
                    onChange={(e) => setNumTeams(e.target.value)}
                />
            </Form.Group>
            {isGroup === true && (
                <>
                    <Form.Group className="mb-3">
                        <Form.Label>Number of groups</Form.Label>
                        <Form.Control
                            type="number"
                            required
                            value={numGroups}
                            onChange={(e) => setNumGroups(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Number of teams in group</Form.Label>
                        <Form.Control
                            type="number"
                            required
                            value={numOfTeamsInGroup}
                            onChange={(e) => setNumOfTeamsInGroup(e.target.value)}
                        />
                    </Form.Group>
                </>
            )}
            {isPlayOff === true && (
                <>
                    <Form.Group className="mb-3" onSubmit={createTournaments}>
                        <Form.Label>Number of advanced teams from each group</Form.Label>
                        <Form.Control
                            type="number"
                            required
                            value={numOfAdvanced}
                            onChange={(e) => setNumOfAdvanced(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Number of play-off teams</Form.Label>
                        <Form.Select
                            required
                            value={numberOfPlayOffTeams}
                            onChange={(e) => setNumberOfPlayOffTeams(e.target.value)}
                        >
                            <option value="2">2</option>
                            <option value="4">4</option>
                            <option value="8">8</option>
                            <option value="16">16</option>
                            <option value="32">32</option>
                            <option value="64">64</option>
                            <option value="128">128</option>
                        </Form.Select>
                    </Form.Group>
                </>

            )}
            <Button variant="primary" type="submit">
                Create Tournament
            </Button>
        </Form>
    )
}
