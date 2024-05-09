import React from "react";
import { Col, Image, Row } from "react-bootstrap";
import { MatchEventProps, MatchProps } from "./Match.def";
import { MatchEventType } from "../MatchOrganizer/MatchOrganizer.def";
import { SERVER_URL } from "../../App";

const MatchDetailHeader: React.FC<{ matchData: MatchProps }> = ({
  matchData,
}) => {
  const matchDate = new Date(matchData?.datetime);
  const formattedDate = matchDate.toLocaleString();

  function returnTimeDifference() {
    const startFirstHalfEvent = matchData.events.find(
      (e) => e.type === "startFirstHalf",
    );
    if (startFirstHalfEvent === undefined) return "0'";
    return (
      new Date(
        Math.abs(
          new Date(startFirstHalfEvent.time).getTime() - new Date().getTime(),
        ),
      ).getMinutes() +
      1 +
      "'"
    );
  }

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          borderBottom: "1px solid black",
          paddingBottom: "50px",
          paddingTop: "50px",
        }}
      >
        <h3>{matchData?.group?.tournament.name}</h3>
        <h3>{returnTimeDifference()}</h3>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            marginLeft: "100px",
            marginRight: "100px",
            justifyContent: "space-between",
          }}
        >
          <Row className="align-items-center">
            <Col>
              <Image
                src={
                  matchData.firstTeam.logo
                    ? SERVER_URL + matchData.firstTeam.logo
                    : "https://img.freepik.com/premium-vector/tournament-sports-league-logo-emblem_1366-201.jpg"
                }
                alt={`${matchData?.firstTeam?.name} Logo`}
                width="150px"
              />
            </Col>
            <Col>{matchData?.firstTeam?.name}</Col>
          </Row>
          <Col>
            <h1>{`${matchData?.scoreFirstTeam}:${matchData?.scoreSecondTeam}`}</h1>
            <h1 style={{ color: "green" }}>
              {matchData?.status.toUpperCase()}
            </h1>
          </Col>
          <Row className="align-items-center">
            <Col>
              {matchData?.secondTeam?.name}
              <Image
                src={
                  matchData.secondTeam.logo
                    ? SERVER_URL + matchData.secondTeam.logo
                    : "https://img.freepik.com/premium-vector/tournament-sports-league-logo-emblem_1366-201.jpg"
                }
                alt={`${matchData?.secondTeam?.name} Logo`}
                width="150px"
              />
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
};

export default MatchDetailHeader;
