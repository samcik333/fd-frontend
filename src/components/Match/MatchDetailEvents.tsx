import React from "react";
import { arrayMatchData } from "./mockArray";
import matchCss from "./Matches.module.css";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";

const MatchDetailEvents: React.FC = () => {
  return (
    <>
      {arrayMatchData.map((data) => {
        return (
          <Card
            style={{
              width: "18rem",
              marginLeft: "100px",
              marginRight: "100px",
              marginTop: "50px",
            }}
          >
            <Card.Header className={`${matchCss.matchHeader}`}>
              {"Firsthalf"}
            </Card.Header>
            <ListGroup className="list-group-flush">
              {data.events.map((event) => {
                return (
                  <ListGroup.Item>{event.player.user.firstName}</ListGroup.Item>
                );
              })}
            </ListGroup>
          </Card>
        );
      })}
    </>
  );
};

export default MatchDetailEvents;
