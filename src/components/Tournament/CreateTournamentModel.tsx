import React, { useState } from "react";
import { Alert, Button, Form } from "react-bootstrap";
import { useToast } from "../../ToastContext";
import styles from "./Tournament.module.css";

// Define prop types for LoginForm
type TournamentFormProps = {
  onSuccessfullCreate: () => void;
};

interface FormErrors {
  name?: string;
  startDate?: string;
  endDate?: string;
  numTeams?: string;
  numGroups?: string;
  numOfAdvanced?: string;
}

export const CreateTournamentModel: React.FC<TournamentFormProps> = ({
  onSuccessfullCreate,
}) => {
  const [name, setName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [location, setLocation] = useState("");
  const [logo, setLogo] = useState(null);
  const [format, setFormat] = useState("Group");
  const [type, setType] = useState("11v11");
  const [numGroups, setNumGroups] = useState("1");
  const [numTeams, setNumTeams] = useState("2");
  const [numOfAdvanced, setNumOfAdvanced] = useState("1");
  const [numOfPlayOffTeams, setNumOfPlayOffTeams] = useState("2");
  const [errors, setErrors] = useState<FormErrors>({});
  const { triggerToast } = useToast();

  const handleChange = (format: string) => {
    setFormat(format); // Set format to 'groups'
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (Object.keys(errors).length > 0) {
      // If there are errors, display a toast message and prevent form submission
      triggerToast("Please fix errors before submitting.", "warning");
      return; // Stop the form submission
    } // Prevent the default form submission
    await createTournaments(); // Call your function to handle the API request
    onSuccessfullCreate(); // Assuming you want to call this after successful creation
  };

  const handleStartDateChange = (date: string) => {
    setStartDate(date);
    const today = new Date().toISOString().split("T")[0];
    if (date < today) {
      setErrors((prev) => ({
        ...prev,
        startDate: "Start date cannot be in the past.",
      }));
    } else if (endDate && date >= endDate) {
      setErrors((prev) => ({
        ...prev,
        startDate: "Start date must be before end date.",
      }));
    } else {
      const newErrors = { ...errors };
      delete newErrors.startDate;
      setErrors(newErrors);
    }
  };

  const handleEndDateChange = (date: string) => {
    setEndDate(date);
    if (startDate && date < startDate) {
      setErrors((prev) => ({
        ...prev,
        endDate: "End date must be after start date.",
      }));
    } else {
      const newErrors = { ...errors };
      delete newErrors.endDate;
      setErrors(newErrors);
    }
  };

  const handleNumTeamsChange = (num: string) => {
    setNumTeams(num);
    const numVal = parseInt(num, 10);
    if (numVal < 2 || numVal % 2 !== 0) {
      setErrors((prev) => ({
        ...prev,
        numTeams: "Number of teams must be even and at least 2.",
      }));
    } else {
      const newErrors = { ...errors };
      delete newErrors.numTeams;
      setErrors(newErrors);
    }
  };

  const handleNumGroupsChange = (num: string) => {
    setNumGroups(num);
    const numGroupsInt = parseInt(num, 10);
    const numTeamsInt = parseInt(numTeams, 10);

    // Check if numTeams divided by numGroups is an integer and at least 2
    if (numTeamsInt % numGroupsInt !== 0 || numTeamsInt / numGroupsInt < 2) {
      setErrors((prev) => ({
        ...prev,
        numGroups: "Teams per group must be a whole number and at least 2.",
      }));
    } else {
      const newErrors = { ...errors };
      delete newErrors.numGroups;
      setErrors(newErrors);
    }
  };

  const handleAdvancedNumOfTeamsChange = (num: string) => {
    setNumOfAdvanced(num);
    const advancedTeams = parseInt(num, 10);
    const numGroupsInt = parseInt(numGroups, 10);
    const numTeamsInt = parseInt(numTeams, 10);

    // Minimum advanced teams is 1
    if (isNaN(advancedTeams) || advancedTeams < 1) {
      setErrors((prev) => ({
        ...prev,
        numOfAdvanced: "Number of advanced teams must be at least 1.",
      }));
    } else {
      const newErrors = { ...errors };
      delete newErrors.numOfAdvanced;
      setErrors(newErrors);
    }

    // Maximum advanced teams should not exceed numOfTeams / numOfGroups
    if (
      !isNaN(advancedTeams) &&
      !isNaN(numGroupsInt) &&
      advancedTeams > numTeamsInt / numGroupsInt
    ) {
      setErrors((prev) => ({
        ...prev,
        numOfAdvanced:
          "Number of advanced teams exceeds maximum allowed per group.",
      }));
    } else {
      const newErrors = { ...errors };
      delete newErrors.numOfAdvanced;
      setErrors(newErrors);
    }

    // Advanced teams * numOfGroups should be a power of 2
    const product = advancedTeams * numGroupsInt;
    const playOffsTeams = [2, 4, 8, 16, 32];
    if (!playOffsTeams.includes(product) || product > numTeamsInt) {
      setErrors((prev) => ({
        ...prev,
        numOfAdvanced:
          "Product of advanced teams and number of groups must be a power of 2 (2, 4, 8, ...).",
      }));
    } else {
      const newErrors = { ...errors };
      delete newErrors.numOfAdvanced;
      setErrors(newErrors);
    }
  };

  //TODO prepisat
  const createTournaments = async () => {
    const endpoint = "http://localhost:3000/tournaments/create";
    const formData = new FormData();
    if (name) formData.append("name", name);
    if (startDate) formData.append("startDate", startDate);
    if (endDate) formData.append("endDate", endDate);
    if (location) formData.append("location", location);
    if (format) formData.append("format", format);
    if (type) formData.append("type", type);
    if (numTeams) formData.append("numOfTeams", numTeams);
    if (numGroups) formData.append("numOfGroups", numGroups);
    if (numOfAdvanced) formData.append("numOfAdvanced", numOfAdvanced);
    if (numOfPlayOffTeams)
      formData.append("numOfPlayOffTeams", numOfPlayOffTeams);
    formData.append("status", "upcoming");
    if (logo) formData.append("logo", logo);

    const options = {
      method: "POST",
      credentials: "include",
      body: formData,
    } as RequestInit;

    try {
      const response = await fetch(endpoint, options);
      if (response.ok) {
        console.log("Tournament created successfully");
        triggerToast("Tournament was created successfully", "success");
        onSuccessfullCreate();
      } else {
        const errorData = await response.json();
        triggerToast("Failed to create tournament", "danger");
        console.error("Failed to create tournament:", errorData.message);
      }
    } catch (error) {
      console.error("Error while fetching:", error);
    }
  };

  return (
    <Form onSubmit={handleSubmit} className={styles.tournament_form_container}>
      <Form.Group className={styles.form_group}>
        <Form.Label className={styles.form_label}>Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter Name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </Form.Group>
      <Form.Group className={styles.form_group}>
        <Form.Label className={styles.form_label}>Logo</Form.Label>
        <Form.Control
          type="file"
          placeholder="Enter Logo"
          accept="image/*"
          onChange={(e) =>
            setLogo(
              (e.target as any).files.length > 0
                ? (e.target as any).files[0]
                : null,
            )
          }
        />
      </Form.Group>
      <Form.Group className={styles.form_group}>
        <Form.Label className={styles.form_label}>Start Date</Form.Label>
        <Form.Control
          type="date"
          required
          value={startDate}
          onChange={(e) => handleStartDateChange(e.target.value)}
        />
        {errors.startDate && <Alert variant="danger">{errors.startDate}</Alert>}
      </Form.Group>
      <Form.Group className={styles.form_group}>
        <Form.Label className={styles.form_label}>End Date</Form.Label>
        <Form.Control
          type="date"
          required
          value={endDate}
          onChange={(e) => handleEndDateChange(e.target.value)}
        />
        {errors.endDate && <Alert variant="danger">{errors.endDate}</Alert>}
      </Form.Group>
      <Form.Group className={styles.form_group}>
        <Form.Label className={styles.form_label}>Place</Form.Label>
        <Form.Control
          type="text"
          placeholder="Location of the event"
          required
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
      </Form.Group>
      <Form.Group className={styles.formGroupFormat}>
        <Form.Label className={styles.form_label}>Format</Form.Label>
        <div className={styles.radioWrapper}>
          <Form.Check
            type="radio"
            label="Group"
            name="formatOptions"
            id="formatGroup"
            value="Group"
            checked={format === "Group"}
            onChange={() => handleChange("Group")}
            className={styles.formCheck}
          />
          <Form.Check
            type="radio"
            label="Play-off"
            name="formatOptions"
            id="formatPlay-off"
            value="Play-off"
            checked={format === "Play-off"}
            onChange={() => handleChange("Play-off")}
            className={styles.formCheck}
          />
          <Form.Check
            type="radio"
            label="Group + Play-off"
            name="formatOptions"
            id="formatGroupKnockout"
            value="Group+Play-off"
            checked={format === "Group+Play-off"}
            onChange={() => handleChange("Group+Play-off")}
            className={styles.formCheck}
          />
        </div>
      </Form.Group>
      <Form.Group className={styles.form_group}>
        <Form.Label className={styles.form_label}>
          Number of players in team
        </Form.Label>
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
      {format !== "Play-off" && (
        <Form.Group className={styles.form_group}>
          <Form.Label className={styles.form_label}>Number of teams</Form.Label>
          <Form.Control
            type="number"
            required
            value={numTeams}
            onChange={(e) => handleNumTeamsChange(e.target.value)}
          />
          {errors.numTeams && <Alert variant="danger">{errors.numTeams}</Alert>}
        </Form.Group>
      )}

      {(format === "Group" || format === "Group+Play-off") && (
        <>
          <Form.Group className={styles.form_group}>
            <Form.Label className={styles.form_label}>
              Number of groups
            </Form.Label>
            <Form.Control
              type="number"
              required
              value={numGroups}
              onChange={(e) => handleNumGroupsChange(e.target.value)}
            />
            {errors.numGroups && (
              <Alert variant="danger">{errors.numGroups}</Alert>
            )}
          </Form.Group>
        </>
      )}
      {format === "Group+Play-off" && (
        <Form.Group className={styles.form_group} onSubmit={createTournaments}>
          <Form.Label className={styles.form_label}>
            Number of advanced teams from each group
          </Form.Label>
          <Form.Control
            type="number"
            required
            value={numOfAdvanced}
            onChange={(e) => handleAdvancedNumOfTeamsChange(e.target.value)}
          />
          {errors.numOfAdvanced && (
            <Alert variant="danger">{errors.numOfAdvanced}</Alert>
          )}
        </Form.Group>
      )}
      {format === "Play-off" && (
        <>
          <Form.Group className={styles.form_group}>
            <Form.Label className={styles.form_label}>
              Number of play-off teams
            </Form.Label>
            <Form.Select
              required
              value={numOfPlayOffTeams}
              onChange={(e) => setNumOfPlayOffTeams(e.target.value)}
            >
              <option value="2">2</option>
              <option value="4">4</option>
              <option value="8">8</option>
              <option value="16">16</option>
              <option value="32">32</option>
            </Form.Select>
          </Form.Group>
        </>
      )}
      <Button variant="primary" type="submit">
        Create Tournament
      </Button>
    </Form>
  );
};
