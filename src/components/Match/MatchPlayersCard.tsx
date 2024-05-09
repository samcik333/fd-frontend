import React from "react";
import { PlayerProps } from "./Match.def";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import matchCss from "./Matches.module.css";

const MatchPlayersCard: React.FC<{
  players: PlayerProps[];
  teamName: string;
}> = ({ players, teamName }) => {
  return (
    <>
      <Card
        style={{
          minWidth: "200px",
          maxWidth: "200px",
          height: "fit-content",
          marginLeft: "100px",
          marginRight: "100px",
          marginTop: "50px",
        }}
        key={teamName}
      >
        <Card.Header
          key={teamName + "header"}
          className={`${matchCss.matchHeader}`}
        >
          {teamName}
        </Card.Header>
        <ListGroup key={teamName + "listgroup"} className="list-group-flush">
          {players?.map((player) => {
            return (
              <ListGroup.Item key={player.playerId}>
                {player.firstName +
                  " " +
                  player.lastName +
                  " #" +
                  player.number}
              </ListGroup.Item>
            );
          })}
        </ListGroup>
      </Card>
    </>
  );
};

export default MatchPlayersCard;
