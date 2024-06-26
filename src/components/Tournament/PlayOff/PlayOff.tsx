
import React, { useEffect, useState } from "react";
import { ListGroup, Button, Container } from "react-bootstrap";
import { PlusCircle, Trash } from "react-bootstrap-icons";
import { GroupProps, TeamProps, TournamentProps } from "../../Match/Match.def";
import { useUser } from "../../../UserContext";
import Players from "../Teams/Players";
import { useToast } from "../../../ToastContext";
import styles from "./PlayOff.module.css";
import MatchCard from "../../Match/MatchCard";
import { group } from "console";
import { useParams } from "react-router-dom";

const PlayOff: React.FC<{
  tournament: TournamentProps;
  setTournament: React.Dispatch<
    React.SetStateAction<TournamentProps | undefined>
  >;
}> = ({ tournament, setTournament }) => {
  const [teamsToShow, setTeamsToShow] = useState<TeamProps[]>([]);
  const { user } = useUser();
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
    setCanBeStarted(tournament.groups.filter(group=>group.colIndex===0).every((g) => g.homeTeam && g.awayTeam));
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
                      {group.map((oneGroup, matchIndex) => (
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
                            group={oneGroup}
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
    </div>
  );
};

export default PlayOff;
