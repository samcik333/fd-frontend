import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useUser } from "../../UserContext";
import { useToast } from "../../ToastContext";
import styles from "./auth.module.css";

type LoginFormProps = {
  onSuccessfulLogin: () => void;
};

export const LoginForm: React.FC<LoginFormProps> = ({ onSuccessfulLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { loginUser } = useUser();
  const { triggerToast } = useToast();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const endpoint = "http://localhost:3000/login";
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ username, password }),
    } as ResponseInit;

    try {
      const response = await fetch(endpoint, options);
      if (response.ok) {
        onSuccessfulLogin();
        await getUser();
        triggerToast("You have been successfully logged in", "success");
      } else {
        triggerToast(
          "Login failed, Username or Password was not correct",
          "danger",
        );
      }
    } catch (error) {
      console.error("Error during login:", error);
      triggerToast("An error occurred during login.", "danger");
    }
  };

  const getUser = async () => {
    try {
      const response = await fetch("http://localhost:3000/me", {
        credentials: "include",
      });
      if (response.ok) {
        const data = await response.json();
        loginUser(data);
      } else {
        throw new Error("Network response was not ok.");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  return (
    <Form className={styles.login_form} onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Label>Username</Form.Label>
        <Form.Control
          type="text"
          className={styles.input_control}
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
          className={styles.input_control}
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
  );
};
