import React from "react"
import { MatchProps, PlayerProps } from "./Match.def"
import Card from "react-bootstrap/Card"
import ListGroup from "react-bootstrap/ListGroup"
import { arrayMatchData } from "./mockArray"
import matchCss from "./Matches.module.css"

const MatchPlayersCard: React.FC<{
  players: PlayerProps[]
  teamName: string
}> = ({ players, teamName }) => {
  return (
    <>
      {arrayMatchData.map((data) => {
        return (
          <Card
            style={{
              width: "18rem",
              height: "fit-content",
              marginLeft: "100px",
              marginRight: "100px",
              marginTop: "50px",
            }}
          >
            <Card.Header className={`${matchCss.matchHeader}`}>
              {teamName}
            </Card.Header>
            <ListGroup className="list-group-flush">
              {players.map((player) => {
                return (
                  <ListGroup.Item>
                    {player.user.firstName + " " + player.user.secondName}
                  </ListGroup.Item>
                )
              })}
            </ListGroup>
          </Card>
        )
      })}
    </>
  )
}

export default MatchPlayersCard
