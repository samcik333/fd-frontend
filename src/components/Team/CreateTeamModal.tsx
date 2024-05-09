import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useUser } from "../../UserContext";
import { useToast } from "../../ToastContext";

// Define prop types for LoginForm
type TournamentFormProps = {
  onSuccessfullCreate: () => void;
};

export const CreateTeamModal: React.FC<TournamentFormProps> = ({
  onSuccessfullCreate,
}) => {
  const [name, setName] = useState("");
  const [file, setFile] = useState(null);
  const { triggerToast } = useToast();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent the default form submission
    await createTeam(); // Call your function to handle the API request
    onSuccessfullCreate(); // Assuming you want to call this after successful creation
  };

  const createTeam = async () => {
    const endpoint = "http://localhost:3000/teams";
    try {
      const formData = new FormData();
      formData.append("name", name); // Append name
      if (file) {
        formData.append("image", file); // Append image with 'image' key
      }

      const response = await fetch(endpoint, {
        method: "POST",
        body: formData,
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Team created successfully:", data);
        triggerToast("Team created successfully", "success");
      } else {
        console.error("Failed to create team:", response.statusText);
        triggerToast("Failed to create team", "error");
      }
    } catch (error) {
      console.error("Error creating team:", error);
      triggerToast("Error creating team", "error");
    }
  };
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
        <Form.Label>Logo</Form.Label>
        <Form.Control
          type="file"
          placeholder="Upload Logo"
          accept={"image/*"}
          onChange={(e) => setFile((e.target as any).files[0])}
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Create Team
      </Button>
    </Form>
  );
};
