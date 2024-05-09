import React from "react";
import tour from "../Tournament/Tournament.module.css";
import { useNavigate } from "react-router-dom";
import { TeamProps } from "../Match/Match.def";
import { SERVER_URL } from "../../App";

const TeamCard: React.FC<{ team: TeamProps }> = ({ team }) => {
  const navigate = useNavigate();
  const handleCardClick = () => {
    navigate(`/teams/${team.teamId}`);
  };
  return (
    <div className={`${tour.card}`} onClick={handleCardClick} role="button">
      <header className={`${tour.card_header}`}>
        <h2>{team.name}</h2>
        <img
          style={{ width: "300px", height: "300px" }}
          src={
            team.logo
              ? SERVER_URL + team.logo
              : "https://img.freepik.com/premium-vector/tournament-sports-league-logo-emblem_1366-201.jpg"
          }
          alt="Tournament Badge"
          className={`${tour.badge}`}
        />
      </header>
    </div>
  );
};

export default TeamCard;
