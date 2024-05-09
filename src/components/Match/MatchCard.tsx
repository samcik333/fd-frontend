import React from "react"
import { Button, Card, Col, Form, Row } from "react-bootstrap"
import matchCss from "./Matches.module.css"
import { GroupProps, MatchProps, TeamProps } from "./Match.def"
import { useNavigate } from "react-router-dom"
import { SERVER_URL } from "../../App"
import { Trash } from "react-bootstrap-icons"

const MatchCard: React.FC<{
  handleTeamAddClick?: (
    teamId: number,
    groupId: number,
    homeAwayTeamIndex: number,
  ) => void
  handleTeamClick?: (
    teamId: number,
    groupId: number,
    homeAwayTeamIndex: number,
  ) => void
  group?: GroupProps
  teamsToShow?: TeamProps[]
  match?: MatchProps
  index?: number
  matchIndex?: number
  isToOrganize?: boolean
}> = ({
  handleTeamAddClick,
  handleTeamClick,
  group,
  teamsToShow,
  match,
  index,
  matchIndex,
  isToOrganize = false,
}) => {
    const navigate = useNavigate()
    const formatDate = (dateString: string | number | Date) => {
      return new Date(dateString).toLocaleString()
    }
    const handleCardClick = () => {
      if (match?.matchId)
        navigate(`/matches/match-detail/${match?.matchId}`)
      else if (group?.matches[0].matchId)
        navigate(`/matches/match-detail/${group?.matches[0].matchId}`)

    }

    return (
      <Card
        className={`${matchCss.matchCard}`}
        onClick={!teamsToShow ? handleCardClick : undefined}
        role="button"
      >
        <Card.Header className={`${matchCss.matchHeader}`}>
          {match
            ? match.group?.tournament?.name
            : group
              ? group?.tournament?.name
              : "add team"}
        </Card.Header>
        <Card.Body className="p-2">
          <Row className="align-items-center">
            <Col className={`${matchCss.teamCol}`}>
              {!isToOrganize ? (
                <img
                  src={
                    match?.firstTeam?.logo
                      ? `${SERVER_URL}${match.firstTeam.logo}`
                      : group?.homeTeam?.logo
                        ? `${SERVER_URL}${group?.homeTeam?.logo}`
                        : "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/team-logo-design-template-f4dc40ab520745e2e4d7c7578ad1899f_screen.jpg?ts=1681181136"
                  }
                  alt={`${match?.firstTeam?.name} Logo`}
                  className={`${matchCss.teamLogo}`}
                />
              ) : !group?.homeTeam ? (
                <Form.Select
                  onChange={(e) => {
                    group &&
                      handleTeamAddClick &&
                      e.target.value &&
                      handleTeamAddClick(
                        Number(e.target.value),
                        group.groupId,
                        group.homeTeamIndex!,
                      )
                  }}
                >
                  <option value={undefined}>Add team</option>
                  {teamsToShow?.map((team, index) => (
                    <option value={team.teamId} key={index}>
                      {team.name}
                    </option>
                  ))}
                </Form.Select>
              ) : (
                <>
                  <img
                    src={
                      group?.homeTeam!.logo
                        ? `${SERVER_URL}${group?.homeTeam!.logo}`
                        : "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/team-logo-design-template-f4dc40ab520745e2e4d7c7578ad1899f_screen.jpg?ts=1681181136"
                    }
                    alt={`${group?.homeTeam!.name} Logo`}
                    className={`${matchCss.teamLogo}`}
                  />
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={(e) => {
                      group &&
                        handleTeamClick &&
                        handleTeamClick(
                          group.homeTeam?.teamId!,
                          group.groupId,
                          group.homeTeamIndex!,
                        )
                    }}
                  >
                    <Trash />
                  </Button>
                </>
              )}
              <Card.Title className={`${matchCss.teamName}`}>
                {match ? match?.firstTeam?.name : group?.homeTeam?.name}
              </Card.Title>
            </Col>
            <Col xs={6} className={`text-center ${matchCss.matchDetails}`}>
              <Card.Text className={`${matchCss.matchStatus}`}>
                {match ? match?.status : group?.matches[0]?.status}
              </Card.Text>
              <Card.Text className={`${matchCss.matchDate}`}>
                {match && formatDate(match.datetime)}
              </Card.Text>
              <div className={`${matchCss.scoreboard}`}>
                <span className={`${matchCss.score}`}>
                  {match ? match?.scoreFirstTeam : group?.matches[0]?.scoreFirstTeam}
                </span>{" "}
                -{" "}
                <span className={`${matchCss.score}`}>
                  {match ? match?.scoreSecondTeam : group?.matches[0]?.scoreSecondTeam}
                </span>
              </div>
            </Col>
            <Col className={`${matchCss.teamCol}`}>
              {!isToOrganize ? (
                <img
                  src={
                    match?.secondTeam?.logo
                      ? `${SERVER_URL}${match.secondTeam.logo}`
                      : group?.awayTeam?.logo
                        ? `${SERVER_URL}${group?.awayTeam?.logo}`
                        : "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/team-logo-design-template-f4dc40ab520745e2e4d7c7578ad1899f_screen.jpg?ts=1681181136"
                  }
                  alt={`${match?.secondTeam?.name} Logo`}
                  className={`${matchCss.teamLogo}`}
                />
              ) : isToOrganize && !group?.awayTeam ? (
                <Form.Select
                  onChange={(e) => {
                    group &&
                      handleTeamAddClick &&
                      e.target.value &&
                      handleTeamAddClick(
                        Number(e.target.value),
                        group.groupId,
                        group.awayTeamIndex!,
                      )
                  }}
                >
                  <option value={undefined}>Add team</option>
                  {teamsToShow?.map((team, index) => (
                    <option value={team.teamId} key={index}>
                      {team.name}
                    </option>
                  ))}
                </Form.Select>
              ) : (
                <>
                  <img
                    src={
                      group?.awayTeam!.logo
                        ? `${SERVER_URL}${group?.awayTeam!.logo}`
                        : "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/team-logo-design-template-f4dc40ab520745e2e4d7c7578ad1899f_screen.jpg?ts=1681181136"
                    }
                    alt={`${group?.awayTeam!.name} Logo`}
                    className={`${matchCss.teamLogo}`}
                  />
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={(e) => {
                      group &&
                        handleTeamClick &&
                        handleTeamClick(
                          group.awayTeam?.teamId!,
                          group.groupId,
                          group.awayTeamIndex!,
                        )
                    }}
                  >
                    <Trash />
                  </Button>
                </>
              )}
              <Card.Title className={`${matchCss.teamName}`}>
                {match ? match?.secondTeam?.name : group?.awayTeam?.name}
              </Card.Title>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    )
  }

export default MatchCard
