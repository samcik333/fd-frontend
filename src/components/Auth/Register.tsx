import React, { useState } from "react"
import { Button, Form, FormControl } from "react-bootstrap"
import styles from "./auth.module.css"
import { useUser } from "../../UserContext"
import { useToast } from "../../ToastContext"

type RegisterFormProps = {
  onSuccessfulRegister: () => void
}

export const RegisterForm: React.FC<RegisterFormProps> = ({
  onSuccessfulRegister,
}) => {
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [firstName, setFirstName] = useState("")
  const [secondName, setSecondName] = useState("")
  const { loginUser } = useUser()
  const { triggerToast } = useToast()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const endpoint = "http://localhost:3000/register"


    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        email,
        password,
        firstName,
        secondName,
      }),
    }
    const response = await fetch(endpoint, options)

    if (response.ok) {
      onSuccessfulRegister()
      await getUser()
      triggerToast("You have been successfully registered", "success")
    } else {
      console.error("Registration failed")
      triggerToast("Registration failed", "danger")
    }
  }

  const getUser = async () => {
    try {
      const response = await fetch("http://localhost:3000/me", {
        credentials: "include",
      })
      if (response.ok) {
        const data = await response.json()
        loginUser(data)
      } else {
        throw new Error("Network response was not ok.")
      }
    } catch (error) {
      console.error("Error fetching user data:", error)
    }
  }

  return (
    <div>
      <Form onSubmit={handleSubmit} className={styles.login_form}>
        <Form.Group className="mb-3" controlId="username">
          <Form.Label>Username</Form.Label>
          <FormControl
            type="text"
            placeholder="Enter username"
            className={styles.input_control}
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
            className={styles.input_control}
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="firstName">
          <Form.Label>First Name</Form.Label>
          <FormControl
            type="text"
            placeholder="Enter first name"
            className={styles.input_control}
            required
            onChange={(e) => setFirstName(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="secondName">
          <Form.Label>Second Name</Form.Label>
          <FormControl
            type="text"
            placeholder="Enter second name"
            className={styles.input_control}
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
