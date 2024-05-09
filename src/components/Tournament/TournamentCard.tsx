import React from "react";
import { useNavigate } from "react-router-dom";
import { TournamentProps } from "../Match/Match.def";
import Card from "react-bootstrap/Card";
import styles from "./Tournament.module.css";
import { SERVER_URL } from "../../App"; // Import the styles

const TournamentCard: React.FC<{ tournament: TournamentProps }> = ({
  tournament,
}) => {
  const navigate = useNavigate();
  const handleCardClick = () => {
    navigate(`/tournaments/overview/${tournament.tournamentId}`);
  };

  return (
    <Card
      className={`${styles.cardCustom}`}
      onClick={handleCardClick}
      role="button"
    >
      <Card.Header
        className={`d-flex justify-content-between align-items-center ${styles.cardHeader}`}
      >
        <Card.Title>{tournament.name}</Card.Title>
        <img
          src={
            tournament.logo
              ? `${SERVER_URL}${tournament.logo}`
              : "https://img.freepik.com/premium-vector/tournament-sports-league-logo-emblem_1366-201.jpg"
          }
          alt="Tournament Badge"
          className={`${styles.cardImage}`}
        />
      </Card.Header>
      <Card.Body className={`${styles.cardBody}`}>
        <Card.Text className={`${styles.cardText}`}>
          <strong>Type:</strong> {tournament.format}
        </Card.Text>
        <Card.Text className={`${styles.cardText}`}>
          <strong>Current Stage:</strong> {tournament.stage}
        </Card.Text>
        <Card.Text className={`${styles.cardText}`}>
          <strong>Teams:</strong> {tournament.numOfTeams ?? tournament.numberOfPlayOffTeams}
        </Card.Text>
        <Card.Text className={`${styles.cardText}`}>
          <strong>Location:</strong> {tournament.location}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default TournamentCard;
