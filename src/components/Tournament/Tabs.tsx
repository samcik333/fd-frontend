import React, { useEffect, useState } from "react";
import { Nav, NavLink } from "react-bootstrap";
import styles from "./Tournament.module.css";
import { useLocation, useParams } from "react-router-dom";
import OverviewMatches from "./OverviewMatches";
import { TournamentProps } from "../Match/Match.def";
import GroupList from "./Table/GroupList";
import Teams from "./Teams/Teams";
import Stats from "./Stats/Stats";
import tour from "./Tournament.module.css";
import PlayOffTeams from "./PlayOff/PlayOffTeams";
import { SERVER_URL } from "../../App";
import PlayOff from "./PlayOff/PlayOff";

const Tabs: React.FC = () => {
  const { tournamentId } = useParams();
  const [tournament, setTournament] = useState<TournamentProps>();
  const location = useLocation();

  const fetchTournament = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/tournaments/${tournamentId}`,
      );
      if (response.ok) {
        const data = await response.json();
        if (data.length > 0) {
          console.log("tournament", data);
          setTournament(data[0]);
        } else {
          console.error("No tournament data found.");
        }
      } else {
        throw new Error("Network response was not ok.");
      }
    } catch (error) {
      console.error("Error fetching tournament:", error);
    }
  };

  const isActive = (path: string) => location.pathname.includes(path);

  useEffect(() => {
    fetchTournament();
  }, []); // Ensure fetchTournament is only called on component mount

  const getStatusClassName = (status?: string) => {
    if (!status) return ""; // Return empty if status is undefined or null
    const statusKey = status.toLowerCase(); // Convert status to lowercase
    return styles[statusKey] || ""; // Return the style if it exists, or an empty string if it doesn't
  };

  return (
    <div className="d-flex flex-column w-100">
      <div className={`${styles.tournamentHeader} d-flex align-items-center`}>
        <img
          src={
            tournament?.logo
              ? `${SERVER_URL}${tournament.logo}`
              : "https://img.freepik.com/premium-vector/tournament-sports-league-logo-emblem_1366-201.jpg"
          }
          alt="Tournament Logo"
          className={`${styles.logo} me-3`}
        />
        <div>
          <h3 className={styles.tournamentName}>{tournament?.name}</h3>
          <span
            className={`${styles.tournamentStatus} ${getStatusClassName(tournament?.status)}`}
          >
            {tournament?.status}
          </span>
        </div>
      </div>
      <Nav className={`${tour.tabs}`}>
        <Nav.Link
          href={`/tournaments/overview/${tournament?.tournamentId}`}
          className={`${tour.tab} ${isActive("/tournaments/overview") ? "active" : ""}`}
          style={{
            borderBottom: isActive("/tournaments/overview")
              ? "3px solid #000"
              : "none",
            color: "black",
          }}
        >
          Overview
        </Nav.Link>
        {["Group", "Group+Play-off"].includes(tournament?.format || "") && (
          <Nav.Link
            href={`/tournaments/table/${tournament?.tournamentId}`}
            className={`${tour.tab} ${isActive("/tournaments/table") ? "active" : ""}`}
            style={{
              borderBottom: isActive("/tournaments/table")
                ? "3px solid #000"
                : "none",
              color: "black",
            }}
          >
            Table
          </Nav.Link>
        )}
        {tournament && tournament.status !== "upcoming"  && ["Play-off", "Group+Play-off"].includes(tournament?.format || "") && (
          <Nav.Link
            href={`/tournaments/play-offs/${tournament?.tournamentId}`}
            className={`${tour.tab} ${isActive("/tournaments/play-offs") ? "active" : ""}`}
            style={{
              borderBottom: isActive("/tournaments/play-offs")
                ? "3px solid #000"
                : "none",
              color: "black",
            }}
          >
            Playoffs
          </Nav.Link>
        )}
        <Nav.Link
          href={`/tournaments/stats/${tournament?.tournamentId}`}
          className={`${tour.tab} ${isActive("/tournaments/stats") ? "active" : ""}`}
          style={{
            borderBottom: isActive("/tournaments/stats")
              ? "3px solid #000"
              : "none",
            color: "black",
          }}
        >
          Statistics
        </Nav.Link>
        {(tournament?.format === "Group" || tournament?.format === "Group+Play-off") &&<Nav.Link
          href={`/tournaments/teams/${tournament?.tournamentId}`}
          className={`${tour.tab} ${isActive("/tournaments/teams") ? "active" : ""}`}
          style={{
            borderBottom: isActive("/tournaments/teams")
              ? "3px solid #000"
              : "none",
            color: "black",
          }}
        >
          Teams
        </Nav.Link>
}
        {tournament && tournament.status === "upcoming" && tournament?.format === "Play-off" && <Nav.Link
          href={`/tournaments/play-off-brackets/${tournament?.tournamentId}`}
          className={`${tour.tab} ${isActive("/tournaments/play-off-brackets") ? "active" : ""}`}
          style={{
            borderBottom: isActive("/tournaments/play-off-brackets")
              ? "3px solid #000"
              : "none",
            color: "black",
          }}
        >
          Play-off teams
        </Nav.Link>}
      </Nav>
      {isActive("/tournaments/overview") && tournament && (
        <OverviewMatches
          setTournament={setTournament}
          tournament={tournament}
        />
      )}
      {isActive("/tournaments/table") && <GroupList tournament={tournament} />}
      {isActive("/tournaments/play-offs") && tournament && tournament.status !== "upcoming" && <PlayOff tournament={tournament} setTournament={setTournament}/>}
      {isActive("/tournaments/teams") &&
        tournament &&
        tournament.format === "Group" && (
          <Teams setTournament={setTournament} tournament={tournament} />
        )}
      {isActive("/tournaments/stats") && tournamentId && <Stats tournamentId={tournamentId} />}
      {isActive("/tournaments/play-off-brackets") &&
        tournament &&
        tournament.status === "upcoming" && 
        tournament.format === "Play-off" && (
          <PlayOffTeams setTournament={setTournament} tournament={tournament} />
        )}
    </div>
  );
};

export default Tabs;
