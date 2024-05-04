import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useUser } from '../../UserContext'

// Define prop types for LoginForm
type TournamentFormProps = {
    onSuccessfullCreate: () => void
}

export const CreateTeamModal: React.FC<TournamentFormProps> = ({ onSuccessfullCreate }) => {
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
        await createTeam() // Call your function to handle the API request
        onSuccessfullCreate() // Assuming you want to call this after successful creation
    }

    const createTeam = async () => {
        console.log('succesfuly created')
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
            <Button variant="primary" type="submit">
                Create Team
            </Button>
        </Form>
    )
}
