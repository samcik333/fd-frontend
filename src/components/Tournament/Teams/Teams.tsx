import React, { useEffect, useState } from "react";
import { ListGroup, Button } from "react-bootstrap";
import { PlusCircle, Trash } from "react-bootstrap-icons";
import { TeamProps, TournamentProps } from "../../Match/Match.def";
import { useUser } from "../../../UserContext";
import Players from "./Players"; // Adjust the import path as necessary
import { useToast } from "../../../ToastContext";
import {useNavigate} from "react-router-dom";
import { group } from "console";

const Teams: React.FC<{
  tournament: TournamentProps;
  setTournament: React.Dispatch<
    React.SetStateAction<TournamentProps | undefined>
  >;
}> = ({ tournament, setTournament }) => {
  const [groupId, setGroupId] = useState<number>(0);
  const [teamsToShow, setTeamsToShow] = useState<TeamProps[]>([]);
  const [teamsToShowFiltered, setTeamsToShowFiltered] = useState<TeamProps[]>([]);
  const { user } = useUser();
  const navigate = useNavigate();
  const [isOrganizer, setIsOrganizer] = useState<boolean>(false);
  const [canBeStarted, setCanBeStarted] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
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
    setTeamsToShowFiltered(
      teamsToShow.filter((team) =>
        team.name.toLowerCase().includes(search.toLowerCase()),
      ),
    );
  }, [teamsToShow, search]);

  useEffect(() => {
    setCanBeStarted(
      tournament.groups.every(
        (g) => g.teams.length === tournament.numOfTeamsInGroup,
      ) && tournament.status === "upcoming",
    );
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
        navigate(`/tournaments/overview/${tournament.tournamentId}`);
      } else {
        throw new Error("Failed to fetch teams.");
      }
    } catch (error) {
      console.error("Error fetching teams:", error);
    }
  };
  const addTeam = async (team: TeamProps) => {
    try {
      const endpoint = `http://localhost:3000/tournaments/${tournament.tournamentId}/teams/${team.teamId}`;

      const options = {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ groupId: groupId }),
      } as RequestInit;
      const response = await fetch(endpoint, options);

      if (response.ok) {
        const data = await response.json();
        setTournament(data);
        setTeamsToShow((prev) => prev.filter((t) => t.teamId !== team.teamId));
      } else {
        throw new Error("Failed to fetch teams.");
      }
    } catch (error) {
      console.error("Error fetching teams:", error);
    }
  };

  const deleteTeam = async (team: TeamProps, groupIdDelete: number) => {
    try {
      const endpoint = `http://localhost:3000/tournaments/${tournament.tournamentId}/teams/${team.teamId}`;

      const options = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ groupId: groupIdDelete }),
      } as RequestInit;
      const response = await fetch(endpoint, options);

      if (response.ok) {
        const data = await response.json();
        setTournament(data);
        setTeamsToShow((prev) => [...prev, team]);
      } else {
        throw new Error("Failed to fetch teams.");
      }
    } catch (error) {
      console.error("Error fetching teams:", error);
    }
  };

  const handleTeamClick = (team: TeamProps, groupId:number) => {
    deleteTeam(team,groupId);
  };

  const handleTeamAddClick = (team: TeamProps) => {
    addTeam(team);
  };

  return (
    <div className="container mt-3">
      <div className="mb-2">
      <label>All teams list</label>
          <input
            type="text"
            className="form-control mb-3"
            name="name"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by team name"
          />
        <ListGroup 
              style={{maxHeight:"300px", overflow: "auto"}}
              >

          {teamsToShowFiltered.map((team, index) => (
            <ListGroup.Item
              key={index}
              className="d-flex justify-content-between align-items-center"
              role="button"
            >
              {team.name}
              {isOrganizer && (
                <Button
                  onClick={() => handleTeamAddClick(team)}
                  variant="link"
                  size="sm"
                >
                  <PlusCircle />
                </Button>
              )}
            </ListGroup.Item>
          ))}
        </ListGroup>
        <strong>{groupId ? `Selected group: ${tournament.groups.find(group=> group.groupId === groupId)?.name}` : "Please tap the button to select group in which you want to add team"}</strong>
      </div>

      {tournament?.groups?.map((group) => {
        return (
          <div className="container mt-3">
            <div className="mb-2">
              <Button onClick={() => setGroupId(group.groupId)}>
                {group.name}
              </Button>
              <ListGroup>
                {group?.teams?.map((team, index) => (
                  <ListGroup.Item
                    key={index}
                    className="d-flex justify-content-between align-items-center"
                    role="button"
                    onClick={(e)=> {navigate(`/teams/${team.teamId}`)}}
                  >
                    {team.name}
                    {isOrganizer && group.matches.length === 0 && (
                      <Button
                        onClick={(e) => {e.stopPropagation();handleTeamClick(team, group.groupId)}}
                        variant="danger"
                        size="sm"
                      >
                        <Trash />
                      </Button>
                    )}
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </div>
          </div>
        );
      })}
      {canBeStarted && (
        <div>
          <Button onClick={() => startTournament()}>Start tournament</Button>
        </div>
      )}
    </div>
  );
};

export default Teams;
