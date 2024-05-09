// GroupTableRow.tsx
import React from "react"
import { Col, Image, Row } from "react-bootstrap"
import { StandingProps } from "../../Match/Match.def"
import { SERVER_URL } from "../../../App"

const GroupTableRow: React.FC<{ standings: StandingProps, numberOfTeams: number }> = ({
  standings, numberOfTeams
}) => {
  return (
    <tr style={{ height: "55px" }}>
      <td style={{ height: "55px" }}>{numberOfTeams}</td>
      <td style={{ height: "55px" }}>
        <Row className="align-items-center">
          <Col xs={0} sm={0} md={0} lg={4}>
            <Image
              src={
                standings?.team!.logo
                  ? `${SERVER_URL}${standings?.team!.logo}`
                  : "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/team-logo-design-template-f4dc40ab520745e2e4d7c7578ad1899f_screen.jpg?ts=1681181136"
              }
              alt={`${standings.team.name} Logo`}
              fluid
            />
          </Col>
          <Col xs={0} sm={0} md={0} lg={0}>
            {standings.team.name}
          </Col>
        </Row>
      </td>
      <td style={{ height: "55px" }}>{standings.wins}</td>
      <td style={{ height: "55px" }}>{standings.draws}</td>
      <td style={{ height: "55px" }}>{standings.loses}</td>
      <td style={{ height: "55px" }}>{standings.goalsFor}</td>
      <td style={{ height: "55px" }}>{standings.goalsAgainst}</td>
      <td style={{ height: "55px" }}>{standings.goalDiff}</td>
      <td style={{ height: "55px" }}>{standings.points}</td>
    </tr>
  )
}

export default GroupTableRow
