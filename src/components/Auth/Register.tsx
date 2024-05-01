import React, { useState } from "react"
import { Button, Form, FormControl } from "react-bootstrap"

type RegisterFormProps = {
    onSuccessfulRegister: () => void
}

export const RegisterForm: React.FC<RegisterFormProps> = ({ onSuccessfulRegister }) => {
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [firstName, setFirstName] = useState("")
    const [secondName, setSecondName] = useState("")

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const endpoint = "http://localhost:3000/register"

        // Configuring the fetch request
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, email, password, firstName, secondName }) // Convert the state to JSON and send it as the POST body
        }
        const response = await fetch(endpoint, options)

        if (response.ok) {
            onSuccessfulRegister()  // Close the modal
        } else {
            console.error("Registration failed")
        }
    }

    return (
        <div>
            <h2>Registration Form</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="username">
                    <Form.Label>Username</Form.Label>
                    <FormControl
                        type="text"
                        placeholder="Enter username"
                        required
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="registerEmail">
                    <Form.Label>Email</Form.Label>
                    <FormControl
                        type="email"
                        placeholder="Enter email"
                        required
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="registerPassword">
                    <Form.Label>Password</Form.Label>
                    <FormControl
                        type="password"
                        placeholder="Enter password"
                        required
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="firstName">
                    <Form.Label>First Name</Form.Label>
                    <FormControl
                        type="text"
                        placeholder="Enter first name"
                        required
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="secondName">
                    <Form.Label>Second Name</Form.Label>
                    <FormControl
                        type="text"
                        placeholder="Enter second name"
                        required
                        onChange={(e) => setSecondName(e.target.value)}
                    />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Register
                </Button>
            </Form>
        </div>
    )
}
