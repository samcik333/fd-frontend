import React, { useState, useEffect } from "react";
import { ListGroup, Button } from "react-bootstrap";
import { Trash } from "react-bootstrap-icons";
import { PlayerProps } from "../../Match/Match.def";

const Players: React.FC<{
  teamId: number;
  teamName: string;
  isOrganizer: boolean;
}> = ({ teamId, teamName, isOrganizer }) => {
  const [players, setPlayers] = useState<PlayerProps[]>([]);

  useEffect(() => {
    fetchPlayers();
  }, [teamId]); // Rerun when teamId changes

  const fetchPlayers = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/tournaments/teams/${teamId}/players`,
        { credentials: "include" }
      );
      if (response.ok) {
        const data = await response.json();
        setPlayers(data);
      } else {
        throw new Error("Failed to fetch players.");
      }
    } catch (error) {
      console.error("Error fetching players:", error);
    }
  };


  return (
    <div>
      <h3>{teamName}</h3>
      <ListGroup>
        {players.map((player, index) => (
          <ListGroup.Item
            key={index}
            className="d-flex justify-content-between align-items-center"
          >
            {`${player.user.firstName} ${player.user.secondName}`}
            {isOrganizer && (
              <Button variant="danger" size="sm">
                <Trash />
              </Button>
            )}
          </ListGroup.Item>
        ))}
      </ListGroup>
      {isOrganizer && (
        <Button variant="primary" className="mt-3" style={{ width: "100%" }}>
          Add Player
        </Button>
      )}
    </div>
  );
};

export default Players;
