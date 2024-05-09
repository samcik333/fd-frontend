import React, { useEffect, useState } from "react";
import { MatchEventType } from "./MatchOrganizer.def";
import { Button, Modal } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CaretRightFill } from "react-bootstrap-icons";
import { faFutbol } from "@fortawesome/free-regular-svg-icons";
import { useParams } from "react-router-dom";
import { MatchEventProps, MatchProps, TeamProps } from "../Match/Match.def";
import { AddStatModal } from "./AddStatModal";

export type StatModal = {
  open: boolean;
  team?: TeamProps;
  events: MatchEventProps[];
  type?: MatchEventType;
};

interface ButtonsState {
  startfirstHalfButton: boolean;
  stopfirstHalfButton: boolean;
  startSecondHalfButton: boolean;
  stopSecondHalfButton: boolean;
  matchStateButtons: boolean;
  startFirstExtraHalf: boolean;
  stopFirstExtraHalf: boolean;
  startSecondExtraHalf: boolean;
  stopSecondExtraHalf: boolean;
  stopPenalty: boolean;
  penaltyMiss: boolean;
  penaltyGoal: boolean;
}

const MatchOrganizerDetailCards: React.FC<{
  matchData: MatchProps;
  setMatchData: React.Dispatch<React.SetStateAction<MatchProps | undefined>>;
}> = ({ matchData, setMatchData }) => {
  const { id } = useParams();

  const allButtonsDisabled: ButtonsState = {
    startfirstHalfButton: false,
    stopfirstHalfButton: false,
    startSecondHalfButton: false,
    stopSecondHalfButton: false,
    matchStateButtons: false,
    startFirstExtraHalf: false,
    stopFirstExtraHalf: false,
    startSecondExtraHalf: false,
    stopSecondExtraHalf: false,
    stopPenalty: false,
    penaltyMiss: false,
    penaltyGoal: false,
  };

  const [buttonsState, setButtonsState] = useState<ButtonsState>({
    startfirstHalfButton: false,
    stopfirstHalfButton: false,
    startSecondHalfButton: false,
    stopSecondHalfButton: false,
    matchStateButtons: false,
    startFirstExtraHalf: false,
    stopFirstExtraHalf: false,
    startSecondExtraHalf: false,
    stopSecondExtraHalf: false,
    stopPenalty: false,
    penaltyMiss: false,
    penaltyGoal: false,
  });

  const [statModal, setStatModal] = useState<StatModal>({
    open: false,
    team: undefined,
    type: undefined,
    events: [],
  });

  const MatchStatsButton: React.FC<{
    children: any;
    style: any;
    onClick?: (event: any) => void;
  }> = ({ children, style, onClick }) => {
    return (
      <Button
        disabled={!buttonsState.matchStateButtons}
        style={style}
        children={children}
        onClick={onClick}
      ></Button>
    );
  };

  const addEvent = async (
    event: React.BaseSyntheticEvent,
    matchType: MatchEventType,
    playerId: number | undefined = undefined,
    assistId: number | undefined = undefined,
    teamId: number | undefined = undefined,
  ) => {
    event.preventDefault();

    let newEvent = undefined;

    switch (matchType) {
      case "startFirstHalf":
      case "startSecondHalf":
      case "stopFirstHalf":
      case "stopSecondHalf":
      case "startFirstExtraHalf":
      case "startSecondExtraHalf":
      case "stopFirstExtraHalf":
      case "stopSecondExtraHalf":
      case "stopPenalty":
        newEvent = {
          matchId: Number(id),
          type: matchType,
        };
        break;

      case "goal":
      case "penaltyMiss":
      case "penaltyGoal":
        newEvent = {
          matchId: Number(id),
          type: matchType,
          playerId: playerId,
          assistId: assistId,
          teamId: teamId,
        };
        break;

      case "shotOnGoal":
      case "shot":
      case "freeKick":
      case "foul":
      case "offside":
        newEvent = {
          matchId: Number(id),
          type: matchType,
          teamId: teamId,
        };
        break;

      case "yellowCard":
      case "redCard":
        newEvent = {
          matchId: Number(id),
          type: matchType,
          playerId: playerId,
          teamId: teamId,
        };
        break;
    }

    const endpoint = "http://localhost:3000/matchTypes";

    // Configuring the fetch request
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(newEvent), // Convert the state to JSON and send it as the POST body
    } as RequestInit;
    const response = await fetch(endpoint, options);

    if (response.ok) {
      const data = await response.json();
      setMatchData(data);
      console.log("Event added successfully");
    } else {
      console.error("Failed to add event");
    }
  };

  useEffect(() => {
    switch (matchData.status) {
      case "upcoming":
        setButtonsState({ ...allButtonsDisabled, startfirstHalfButton: true });
        break;
      case "finished":
        setButtonsState(allButtonsDisabled);
        break;
      case "firstHalf":
        setButtonsState({
          ...allButtonsDisabled,
          stopfirstHalfButton: true,
          matchStateButtons: true,
        });
        break;
      case "halfTime":
        setButtonsState({ ...allButtonsDisabled, startSecondHalfButton: true });
        break;
      case "secondHalf":
        setButtonsState({
          ...allButtonsDisabled,
          stopSecondHalfButton: true,
          matchStateButtons: true,
        });
        break;
      case "overTime":
        setButtonsState({
          ...allButtonsDisabled,
          startFirstExtraHalf: true,
        });
        break;
      case "firstExtraHalf":
        setButtonsState({
          ...allButtonsDisabled,
          stopFirstExtraHalf: true,
          matchStateButtons: true,
        });
        break;
      case "halfExtraTime":
        setButtonsState({
          ...allButtonsDisabled,
          startSecondExtraHalf: true,
        });
        break;
      case "secondExtraHalf":
        setButtonsState({
          ...allButtonsDisabled,
          stopSecondExtraHalf: true,
          matchStateButtons: true,
        });
        break;
      case "penalty":
        setButtonsState({
          ...allButtonsDisabled,
          stopPenalty: true,
          penaltyGoal: true,
          penaltyMiss: true,
          matchStateButtons: true,
        });
        break;
    }
  }, [matchData.events]);

  const handleStatModalOpen = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    players: TeamProps,
    type: MatchEventType,
  ) => {
    setStatModal({
      open: true,
      team: players,
      type: type,
      events: matchData.events,
    });
  };

  const handleStatModalClose = () => {
    setStatModal({ open: false, events: [] });
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          gap: "20px",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Button
          disabled={!buttonsState.startfirstHalfButton}
          onClick={(event) => addEvent(event, "startFirstHalf")}
        >
          Start First half <CaretRightFill />
        </Button>
        <Button
          disabled={!buttonsState.startSecondHalfButton}
          onClick={(event) => addEvent(event, "startSecondHalf")}
        >
          Start Second half <CaretRightFill />
        </Button>
        <Button
          variant="danger"
          disabled={!buttonsState.stopfirstHalfButton}
          onClick={(event) => addEvent(event, "stopFirstHalf")}
        >
          Stop First Half <CaretRightFill />
        </Button>
        <Button
          variant="danger"
          disabled={!buttonsState.stopSecondHalfButton}
          onClick={(event) => addEvent(event, "stopSecondHalf")}
        >
          Stop Second Half <CaretRightFill />
        </Button>
        <Button
          variant="danger"
          disabled={!buttonsState.startFirstExtraHalf}
          onClick={(event) => addEvent(event, "startFirstExtraHalf")}
        >
          start First extra half <CaretRightFill />
        </Button>
        <Button
          variant="danger"
          disabled={!buttonsState.stopFirstExtraHalf}
          onClick={(event) => addEvent(event, "stopFirstExtraHalf")}
        >
          Stop First extra half <CaretRightFill />
        </Button>
        <Button
          variant="danger"
          disabled={!buttonsState.startSecondExtraHalf}
          onClick={(event) => addEvent(event, "startSecondExtraHalf")}
        >
          Start second extra half
          <CaretRightFill />
        </Button>
        <Button
          variant="danger"
          disabled={!buttonsState.stopSecondExtraHalf}
          onClick={(event) => addEvent(event, "stopSecondExtraHalf")}
        >
          Stop second extra half
          <CaretRightFill />
        </Button>
        <Button
          variant="danger"
          disabled={!buttonsState.stopPenalty}
          onClick={(event) => addEvent(event, "stopPenalty")}
        >
          Stop penalty and end game
          <CaretRightFill />
        </Button>
      </div>

      {!buttonsState.stopPenalty ? (
        <div
          style={{
            display: "flex",
            width: "calc(100%-256px)",
            flexDirection: "row",
            gap: "30px",
            margin: "40px",
          }}
        >
          <div
            style={{
              display: "flex",
              width: "100%",
              flexDirection: "column",
              gap: "10px",
            }}
          >
            <div
              style={{
                display: "flex",
                width: "50%",
                flexDirection: "row",
                gap: "10px",
              }}
            >
              <MatchStatsButton
                onClick={(event) =>
                  handleStatModalOpen(event, matchData.firstTeam, "redCard")
                }
                style={{
                  width: "300px",
                  height: "200px",
                  background: "red",
                  color: "black",
                }}
              >
                Red Card
              </MatchStatsButton>
              <MatchStatsButton
                style={{
                  width: "300px",
                  height: "200px",
                  background: "yellow",
                  color: "black",
                }}
                onClick={(event) =>
                  handleStatModalOpen(event, matchData.firstTeam, "yellowCard")
                }
              >
                Yellow Card
              </MatchStatsButton>
            </div>
            <div
              style={{
                display: "flex",
                width: "50%",
                flexDirection: "row",
                gap: "10px",
              }}
            >
              <MatchStatsButton
                style={{ width: "300px", height: "200px" }}
                onClick={(event) =>
                  handleStatModalOpen(event, matchData.firstTeam, "goal")
                }
              >
                Goal <FontAwesomeIcon icon={faFutbol} />
              </MatchStatsButton>
              <MatchStatsButton
                style={{ width: "300px", height: "200px" }}
                onClick={(event) =>
                  addEvent(
                    event,
                    "shotOnGoal",
                    undefined,
                    undefined,
                    matchData.firstTeam.teamId,
                  )
                }
              >
                Shot on goal
              </MatchStatsButton>
            </div>
            <div
              style={{
                display: "flex",
                width: "50%",
                flexDirection: "row",
                gap: "10px",
              }}
            >
              <MatchStatsButton
                style={{ width: "300px", height: "200px" }}
                onClick={(event) =>
                  addEvent(
                    event,
                    "shot",
                    undefined,
                    undefined,
                    matchData.firstTeam.teamId,
                  )
                }
              >
                Shot
              </MatchStatsButton>
              <MatchStatsButton
                style={{ width: "300px", height: "200px" }}
                onClick={(event) =>
                  addEvent(
                    event,
                    "freeKick",
                    undefined,
                    undefined,
                    matchData.firstTeam.teamId,
                  )
                }
              >
                FreeKick
              </MatchStatsButton>
            </div>
            <div
              style={{
                display: "flex",
                width: "50%",
                flexDirection: "row",
                gap: "10px",
              }}
            >
              <MatchStatsButton
                style={{ width: "300px", height: "200px" }}
                onClick={(event) =>
                  addEvent(
                    event,
                    "foul",
                    undefined,
                    undefined,
                    matchData.firstTeam.teamId,
                  )
                }
              >
                Foul
              </MatchStatsButton>
              <MatchStatsButton
                style={{ width: "300px", height: "200px" }}
                onClick={(event) =>
                  addEvent(
                    event,
                    "offside",
                    undefined,
                    undefined,
                    matchData.firstTeam.teamId,
                  )
                }
              >
                Offside
              </MatchStatsButton>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              width: "100%",
              flexDirection: "column",
              gap: "10px",
            }}
          >
            <div
              style={{
                display: "flex",
                width: "50%",
                flexDirection: "row",
                gap: "10px",
              }}
            >
              <MatchStatsButton
                onClick={(event) =>
                  handleStatModalOpen(event, matchData.secondTeam, "redCard")
                }
                style={{
                  width: "300px",
                  height: "200px",
                  background: "red",
                  color: "black",
                }}
              >
                Red Card
              </MatchStatsButton>
              <MatchStatsButton
                style={{
                  width: "300px",
                  height: "200px",
                  background: "yellow",
                  color: "black",
                }}
                onClick={(event) =>
                  handleStatModalOpen(event, matchData.secondTeam, "yellowCard")
                }
              >
                Yellow Card
              </MatchStatsButton>
            </div>
            <div
              style={{
                display: "flex",
                width: "50%",
                flexDirection: "row",
                gap: "10px",
              }}
            >
              <MatchStatsButton
                style={{ width: "300px", height: "200px" }}
                onClick={(event) =>
                  handleStatModalOpen(event, matchData.secondTeam, "goal")
                }
              >
                Goal <FontAwesomeIcon icon={faFutbol} />
              </MatchStatsButton>
              <MatchStatsButton
                style={{ width: "300px", height: "200px" }}
                onClick={(event) =>
                  addEvent(
                    event,
                    "shotOnGoal",
                    undefined,
                    undefined,
                    matchData.secondTeam.teamId,
                  )
                }
              >
                Shot on goal
              </MatchStatsButton>
            </div>
            <div
              style={{
                display: "flex",
                width: "50%",
                flexDirection: "row",
                gap: "10px",
              }}
            >
              <MatchStatsButton
                style={{ width: "300px", height: "200px" }}
                onClick={(event) =>
                  addEvent(
                    event,
                    "shot",
                    undefined,
                    undefined,
                    matchData.secondTeam.teamId,
                  )
                }
              >
                Shot
              </MatchStatsButton>
              <MatchStatsButton
                style={{ width: "300px", height: "200px" }}
                onClick={(event) =>
                  addEvent(
                    event,
                    "freeKick",
                    undefined,
                    undefined,
                    matchData.secondTeam.teamId,
                  )
                }
              >
                FreeKick
              </MatchStatsButton>
            </div>
            <div
              style={{
                display: "flex",
                width: "50%",
                flexDirection: "row",
                gap: "10px",
              }}
            >
              <MatchStatsButton
                style={{ width: "300px", height: "200px" }}
                onClick={(event) =>
                  addEvent(
                    event,
                    "foul",
                    undefined,
                    undefined,
                    matchData.secondTeam.teamId,
                  )
                }
              >
                Foul
              </MatchStatsButton>
              <MatchStatsButton
                style={{ width: "300px", height: "200px" }}
                onClick={(event) =>
                  addEvent(
                    event,
                    "offside",
                    undefined,
                    undefined,
                    matchData.secondTeam.teamId,
                  )
                }
              >
                Offside
              </MatchStatsButton>
            </div>
          </div>
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            width: "calc(100%-256px)",
            flexDirection: "row",
            gap: "30px",
            margin: "40px",
          }}
        >
          <div
            style={{
              display: "flex",
              width: "100%",
              flexDirection: "column",
              gap: "10px",
            }}
          >
            <div
              style={{
                display: "flex",
                width: "50%",
                flexDirection: "row",
                gap: "10px",
              }}
            >
              <MatchStatsButton
                style={{ width: "300px", height: "200px" }}
                onClick={(event) =>
                  handleStatModalOpen(event, matchData.firstTeam, "penaltyGoal")
                }
              >
                Penalty Goal <FontAwesomeIcon icon={faFutbol} />
              </MatchStatsButton>
              <MatchStatsButton
                style={{ width: "300px", height: "200px", backgroundColor: "red"}}
                  onClick={(event) =>
                  handleStatModalOpen(event, matchData.firstTeam, "penaltyMiss")
                }
              >
                Penalty Miss <FontAwesomeIcon icon={faFutbol} />
              </MatchStatsButton>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              width: "100%",
              flexDirection: "column",
              gap: "10px",
            }}
          >
            <div
              style={{
                display: "flex",
                width: "50%",
                flexDirection: "row",
                gap: "10px",
              }}
            >
              <MatchStatsButton
                style={{ width: "300px", height: "200px" }}
                onClick={(event) =>
                  handleStatModalOpen(event, matchData.secondTeam, "penaltyGoal")
                }
              >
                Penalty Goal <FontAwesomeIcon icon={faFutbol} />
              </MatchStatsButton>
              <MatchStatsButton
                style={{ width: "300px", height: "200px", backgroundColor: "red"}}
                onClick={(event) =>
                  handleStatModalOpen(event, matchData.secondTeam, "penaltyMiss")
                }
              >
                Penalty Miss <FontAwesomeIcon icon={faFutbol} />
              </MatchStatsButton>
            </div>
          </div>
        </div>
      )}

      <Modal show={statModal.open} onHide={handleStatModalClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Create Team</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AddStatModal
            addEvent={addEvent}
            onSuccessfullCreate={handleStatModalClose}
            statModal={statModal}
          />
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </>
  );
};

export default MatchOrganizerDetailCards;
