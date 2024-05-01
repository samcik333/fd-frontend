import React from 'react'
import { Card, Col, Container, Row } from 'react-bootstrap'
import matchCss from "./Matches.module.css"
import { MatchProps } from './Match.def'

const MatchCard: React.FC<{ match: MatchProps, index?: number, matchIndex?: number }> = ({ match, index, matchIndex }) => {
    const formatDate = (dateString: string | number | Date) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' } as const // This ensures the types are inferred as literals
        return new Date(dateString).toLocaleDateString(undefined, options)
    }
    const handleCardClick = () => {

    }

    return (
        <Card className={`${matchCss.matchCard}`} onClick={handleCardClick} role="button" >
            <Card.Header className={`${matchCss.matchHeader}`}>
                {match.tournament?.name}
            </Card.Header>
            <Card.Body className="p-2">
                <Row className="align-items-center">
                    <Col className={`${matchCss.teamCol}`}>
                        <img
                            src="https://d1csarkz8obe9u.cloudfront.net/posterpreviews/team-logo-design-template-f4dc40ab520745e2e4d7c7578ad1899f_screen.jpg?ts=1681181136" // Replace with your logo path
                            alt={`${match.firstTeam?.name} Logo`}
                            className={`${matchCss.teamLogo}`}
                        />
                        <Card.Title className={`${matchCss.teamName}`}>{match.firstTeam?.name}</Card.Title>
                    </Col>
                    <Col xs={6} className={`text-center ${matchCss.matchDetails}`}>
                        <Card.Text className={`${matchCss.matchStatus}`}>
                            {match.status}
                        </Card.Text>
                        <Card.Text className={`${matchCss.matchDate}`}>
                            {formatDate(match.datetime)}
                        </Card.Text>
                        <div className={`${matchCss.scoreboard}`}>
                            <span className={`${matchCss.score}`}>{match.scoreFirstTeam}</span> - <span className={`${matchCss.score}`}>{match.scoreSecondTeam}</span>
                        </div>
                    </Col>
                    <Col className={`${matchCss.teamCol}`}>
                        <img
                            src="https://thumbs.dreamstime.com/b/team-work-logo-design-people-abstract-modern-business-connection-company-symbol-corporate-social-media-icon-symbol-illustration-48405806.jpg" // Replace with your logo path
                            alt={`${match.secondTeam?.name} Logo`}
                            className={`${matchCss.teamLogo}`}
                        />
                        <Card.Title className={`${matchCss.teamName}`}>{match.secondTeam?.name}</Card.Title>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    )
}

export default MatchCard