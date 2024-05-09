import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { StatModal } from "./MatchOrganizerDetailCards";
import { MatchEventType } from "./MatchOrganizer.def";
import { PlayerProps } from "../Match/Match.def";

type AddStatModalProps = {
  onSuccessfullCreate: () => void;
  statModal: StatModal;
  addEvent: (
    event: React.BaseSyntheticEvent,
    matchType: MatchEventType,
    playerId: number | undefined,
    assistId: number | undefined,
    teamId: number | undefined,
  ) => void;
};

export const AddStatModal: React.FC<AddStatModalProps> = ({
  onSuccessfullCreate,
  statModal,
  addEvent,
}) => {
  const [goalScorerId, setGoalScorerId] = useState<number | undefined>(
    statModal.team && statModal.team.players.length > 0
      ? statModal.team.players[0].playerId
      : undefined,
  );
  const [assistPlayerId, setAssistPlayerId] = useState<number | undefined>(
    undefined,
  );

  function hasPlayerRedCard(playerId: number) {
    return (
      statModal.events.findIndex(
        (event) =>
          event.player != null &&
          event.player.playerId === playerId &&
          event.type === "redCard",
      ) !== -1
    );
  }

  function filterPlayersWithoutRedCard(): PlayerProps[] {
    if (statModal.team) {
      return statModal.team.players.filter(
        (player) => !hasPlayerRedCard(player.playerId),
      );
    }
    return [];
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await addEvent(
      event,
      statModal.type!,
      goalScorerId,
      assistPlayerId,
      statModal.team?.teamId,
    );
    onSuccessfullCreate();
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Label>{statModal.type}</Form.Label>
        <Form.Select
          required
          onChange={(e) => setGoalScorerId(Number(e.target.value))}
        >
          {filterPlayersWithoutRedCard().map((player) => {
            return (
              <option key={player.playerId} value={player.playerId}>
                {player.firstName + " " + player.lastName}
              </option>
            );
          })}
        </Form.Select>
        {statModal.type === "goal" && (
          <>
            <Form.Label>Assist</Form.Label>
            <Form.Select
              required
              onChange={(e) => setAssistPlayerId(Number(e.target.value))}
            >
              <option key={0} value={undefined}>
                No Assister
              </option>
              {filterPlayersWithoutRedCard().map((player) => {
                return (
                  <>
                    <option key={player.playerId} value={player.playerId}>
                      {player.firstName + " " + player.lastName}
                    </option>
                  </>
                );
              })}
            </Form.Select>
          </>
        )}
      </Form.Group>
      <Button variant="primary" type="submit">
        Add event
      </Button>
    </Form>
  );
};
