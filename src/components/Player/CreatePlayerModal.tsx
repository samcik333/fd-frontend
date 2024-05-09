import React, { useState } from "react"
import { Button, Form } from "react-bootstrap"
import { useUser } from "../../UserContext"

type TournamentFormProps = {
  onSuccessfullCreate: () => void
}

export const CreatePlayerModal: React.FC<TournamentFormProps> = ({
  onSuccessfullCreate,
}) => {
  const [name, setName] = useState("")

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    await createPlayer()
    onSuccessfullCreate()
  }

  const createPlayer = async () => {
    console.log("succesfuly created")
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
        <Form.Label>Lastname</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter Name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Form.Label>Age</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter Name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Form.Label>Number</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter Name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Create Player
      </Button>
    </Form>
  )
}
