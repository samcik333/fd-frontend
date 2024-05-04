import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useUser } from '../../UserContext'

// Define prop types for LoginForm
type LoginFormProps = {
    onSuccessfulLogin: () => void
}

export const LoginForm: React.FC<LoginFormProps> = ({ onSuccessfulLogin }) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const { loginUser } = useUser()

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        const endpoint = "http://localhost:3000/login"

        // Configuring the fetch request
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: "include",
            body: JSON.stringify({ username, password }) // Convert the state to JSON and send it as the POST body
        } as RequestInit
        const response = await fetch(endpoint, options)

        if (response.ok) {
            console.log('Login successful')
            onSuccessfulLogin()
            getUser()
        } else {
            console.error('Login failed')
        }
    }

    const getUser = async () => {
        try {
            const response = await fetch(`http://localhost:3000/me`, { credentials: "include" })
            if (response.ok) {
                const data = await response.json()
                // Update the tournaments state with the fetched data
                loginUser(data)
            } else {
                throw new Error('Network response was not ok.')
            }
        } catch (error) {
            console.error("Error fetching tournaments:", error)
            // Set error state here if you have one
        }
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
                <Form.Label>Username</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter username"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                    type="password"
                    placeholder="Password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </Form.Group>
            <Button variant="primary" type="submit">
                Login
            </Button>
        </Form>
    )
}
