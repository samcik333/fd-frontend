import React, { useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
import { GroupProps, TeamProps, TournamentProps } from "../../Match/Match.def";
import { useUser } from "../../../UserContext";
import styles from "./PlayOff.module.css";
import MatchCard from "../../Match/MatchCard";
import {useNavigate} from "react-router-dom";

const PlayOffTeams: React.FC<{
  tournament: TournamentProps;
  setTournament: React.Dispatch<
    React.SetStateAction<TournamentProps | undefined>
  >;
}> = ({ tournament, setTournament }) => {
  const [teamsToShow, setTeamsToShow] = useState<TeamProps[]>([]);
  const { user } = useUser();
  const navigate = useNavigate();
  const [isOrganizer, setIsOrganizer] = useState<boolean>(false);
  const [canBeStarted, setCanBeStarted] = useState<boolean>(false);
  const [playoffBracket, setPlayoffBracket] = useState<{
    [key: string]: GroupProps[];
  }>({});
  useEffect(() => {
    const groupsByColIndex: { [key: string]: GroupProps[] } = {};

    tournament.groups.forEach((group) => {
      const colIndex =
        group.colIndex !== undefined ? group.colIndex.toString() : "undefined";
      if (!groupsByColIndex[colIndex]) {
        groupsByColIndex[colIndex] = [];
      }
      groupsByColIndex[colIndex].push(group);
    });
    setPlayoffBracket(groupsByColIndex);
  }, [tournament]);
  useEffect(() => {
    if (tournament?.organizer?.userId && user) {
      setIsOrganizer(tournament.organizer.userId === user[0].userId);
    } else {
      setIsOrganizer(false);
    }
  }, [tournament?.organizer?.userId, user]);

  useEffect(() => {
    fetchTeamsToShow();
  }, []);

  useEffect(() => {
    setCanBeStarted(tournament.groups.filter(g => g.colIndex === 0).every((g) => g.homeTeam && g.awayTeam));
  }, [tournament]);

  const fetchTeamsToShow = async () => {
    try {
      const response = await fetch(`http://localhost:3000/teams`, {
        credentials: "include",
      });
      if (response.ok) {
        const data: TeamProps[] = await response.json();
        const teamsNotInGroup = data.filter(
          (team) =>
            !tournament.groups.some((group) =>
              group.teams.find((t) => t.teamId === team.teamId),
            ),
        );
        setTeamsToShow(teamsNotInGroup);
      } else {
        throw new Error("Failed to fetch teams.");
      }
    } catch (error) {
      console.error("Error fetching teams:", error);
    }
  };
  
  const startTournament = async () => {
    try {
      const endpoint = `http://localhost:3000/tournaments/${tournament.tournamentId}/startTournament`;

      const options = {
        method: "POST",
        credentials: "include",
      } as RequestInit;
      const response = await fetch(endpoint, options);

      if (response.ok) {
        const data = await response.json();
        setTournament(data);
        navigate(`/tournaments/play-offs/${tournament.tournamentId}`);
      } else {
        throw new Error("Failed to fetch teams.");
      }
    } catch (error) {
      console.error("Error fetching teams:", error);
    }
  };

  const addTeam = async (teamId: number,groupId:number, homeAwayTeamIndex:number) => {
    try {
      const endpoint = `http://localhost:3000/tournaments/${tournament.tournamentId}/teams/${teamId}`;

      const options = {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          groupId: groupId,
          homeAwayTeamIndex: homeAwayTeamIndex,
        }),
      } as RequestInit;
      const response = await fetch(endpoint, options);

      if (response.ok) {
        const data = await response.json();
        setTournament(data);
        setTeamsToShow((prev) => prev.filter((t) => t.teamId !== teamId));
      } else {
        throw new Error("Failed to fetch teams.");
      }
    } catch (error) {
      console.error("Error fetching teams:", error);
    }
  };

  const deleteTeam = async (teamId: number, groupId: number,homeAwayTeamIndex:number) => {
    try {
      const endpoint = `http://localhost:3000/tournaments/${tournament.tournamentId}/teams/${teamId}`;

      const options = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          groupId: groupId,
          homeAwayTeamIndex: homeAwayTeamIndex,
        }),
      } as RequestInit;
      const response = await fetch(endpoint, options);

      if (response.ok) {
        const data = await response.json();
        setTournament(data);
      } else {
        throw new Error("Failed to fetch teams.");
      }
    } catch (error) {
      console.error("Error fetching teams:", error);
    }
  };

  const handleTeamClick = (teamId: number, groupId: number,homeAwayTeamIndex:number) => {
    deleteTeam(teamId, groupId, homeAwayTeamIndex);
  };

  const handleTeamAddClick = (teamId: number, groupId:number, homeAwayTeamIndex:number) => {
    addTeam(teamId,groupId,homeAwayTeamIndex);
  };

  console.log(playoffBracket);

  return (
    <div className="container mt-3">
      <>
        <Container>
          <div className={styles.bracket}>
            {Object.entries(playoffBracket).map(
              ([colIndex, group], index, array) => {
                const isFinalStage = index === tournament.groups.length - 2;
                return (
                  <div
                    className={
                      isFinalStage
                        ? `${styles.stage} ${styles.finalStage}`
                        : `${styles.stage}`
                    }
                  >
                    <div
                      className={styles.matchesContainer}
                      style={{
                        rowGap: index === 1 ? index * 175 : index * 270,
                      }}
                    >
                      {group.map((match, matchIndex) => (
                        <div
                          className={`${styles.match} ${isFinalStage ? styles.finalMatch : ""}`}
                        >
                          {!isFinalStage && (
                            <div>
                              <div className={styles.connector}></div>
                              <div
                                className={styles.connectorVertical}
                                style={{
                                  height:
                                    index === 0
                                      ? matchIndex > 2
                                        ? 158
                                        : 159
                                      : matchIndex > 0
                                        ? index * (371 - 2 * index)
                                        : Math.ceil(index * (368.5 - index)),
                                  position: "absolute",
                                }}
                              ></div>
                            </div>
                          )}
                          {index !== 0 && (
                            <div className={styles.connectorLeft}></div>
                          )}
                          <MatchCard
                          isToOrganize={true}
                          handleTeamAddClick= {handleTeamAddClick}
                            handleTeamClick={handleTeamClick}
                            group={match}
                            teamsToShow = {teamsToShow}
                            index={index + 1}
                            matchIndex={matchIndex + 1}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                );
              },
            )}
          </div>
        </Container>
      </>

      {canBeStarted && (
        <div>
          <Button onClick={() => startTournament()}>Start tournament</Button>
        </div>
      )}
    </div>
  );
};

export default PlayOffTeams;
