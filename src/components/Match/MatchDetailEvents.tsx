import React from "react";
import { arrayMatchData } from "./mockArray";
import matchCss from "./Matches.module.css";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";

const MatchDetailEvents: React.FC = () => {
  return (
    <>
      {arrayMatchData.map((data) => {
        const homeTeam = data.matchStatFirstTeam.team.teamId;
        return (
          <Card
            style={{
              width: "600px",
              marginLeft: "100px",
              marginRight: "100px",
              marginTop: "50px",
            }}
          >
            <Card.Header className={`${matchCss.matchHeader}`}>
              {"Firsthalf"}
            </Card.Header>
            <ListGroup>
              {data.events.map((event) => {
                return (
                  <ListGroup.Item>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: event.player.teams.some(
                          (e) => e.teamId === homeTeam
                        )
                          ? "row" : "row-reverse",
                        gap: '40px'
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                        }}
                      >
                        {event.player.user.firstName +
                          " " +
                          event.player.user.secondName}
                        {event.assist != null && (
                          <small>
                            {event.assist?.user.firstName +
                              " " +
                              event.assist.user.secondName}
                          </small>
                        )}
                      </div>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          alignSelf: "center",
                          justifySelf:"center"
                        }}
                      >
                        4:1
                      </div>
                      <div>{event.time}</div>
                    </div>
                  </ListGroup.Item>
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
