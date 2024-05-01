import React from "react";
import { Col, Image, Row } from "react-bootstrap";
import { arrayMatchData } from "./mockArray";

const MatchDetailHeader: React.FC = () => {
  return (
    <>
      {arrayMatchData.map((data) => {
        return (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              borderBottom: "1px solid black",
              paddingBottom: "50px",
              paddingTop: "50px",
            }}
          >
            <h3>{data.tournament.name}</h3>
            <h3>{data.datetime}</h3>
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
                    src="https://upload.wikimedia.org/wikipedia/sco/5/56/Real_Madrid_CF.svg"
                    alt={`${data.matchStatFirstTeam.team.name} Logo`}
                    width="100px"
                  />
                </Col>
                <Col>{data.matchStatFirstTeam.team.name}</Col>
              </Row>
              <Col>
                <h1>{`${data.scoreFirstTeam}:${data.scoreSecondTeam}`}</h1>
                <h1 style={{ color: "green" }}>{data.status.toUpperCase()}</h1>
              </Col>
              <Row className="align-items-center">
                <Col>{data.matchStatSecondTeam.team.name}</Col>
                <Col>
                  <Image
                    src="https://upload.wikimedia.org/wikipedia/fr/9/93/Logo_Atl%C3%A9tico_Madrid_2017.svg"
                    alt={`${data.matchStatSecondTeam.team.name} Logo`}
                    width="100px"
                  />
                </Col>
              </Row>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default MatchDetailHeader;
