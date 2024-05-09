import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShirt } from "@fortawesome/free-solid-svg-icons";
import { useToast } from "../../ToastContext";

// Define prop types for LoginForm
type PlayerFormProps = {
  onSuccessfullCreate: () => void;
  id: any;
};

export const AddPlayerModal: React.FC<PlayerFormProps> = ({
  onSuccessfullCreate,
  id,
}) => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [age, setAge] = useState(5);
  const [number, setNumber] = useState(1);
  const { triggerToast } = useToast();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent the default form submission
    await addPlayer(); // Call your function to handle the API request
    onSuccessfullCreate(); // Assuming you want to call this after successful creation
  };

  const addPlayer = async () => {
    const endpoint = `http://localhost:3000/teams/${id}/players`;
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        firstName: name,
        lastName: surname,
        age: age,
        number: number,
      }),
    } as RequestInit;
    try {
      const response = await fetch(endpoint, options);
      if (response.ok) {
        triggerToast("Player added successfully", "success");
        onSuccessfullCreate();
      } else {
        const errorData = await response.json();
        triggerToast("Failed to add player", "danger");
        console.error("Failed to add player:", errorData.message);
      }
    } catch (error) {
      console.error("Error while fetching:", error);
    }
    console.log("succesfuly created");
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Label>Name:</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Form.Label>Surname:</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter surname"
          required
          value={surname}
          onChange={(e) => setSurname(e.target.value)}
        />
        <Form.Label>Age:</Form.Label>
        <Form.Control
          type="number"
          placeholder="Enter age"
          required
          value={age}
          onChange={(e) =>
            Number(e.target.value) >= 0 &&
            Number(e.target.value) < 100 &&
            setAge(Number(e.target.value))
          }
        />
        <Form.Label>
          Jersey number <FontAwesomeIcon icon={faShirt} />:
        </Form.Label>
        <Form.Control
          type="number"
          placeholder="Enter jersey number"
          required
          value={number}
          onChange={(e) =>
            Number(e.target.value) >= 0 &&
            Number(e.target.value) < 100 &&
            setNumber(Number(e.target.value))
          }
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Add player
      </Button>
    </Form>
  );
};
