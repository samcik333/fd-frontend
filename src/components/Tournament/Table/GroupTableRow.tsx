// GroupTableRow.tsx
import React from 'react'
import { Col, Image, Row } from 'react-bootstrap'
import { StandingProps } from '../../Match/Match.def'

const GroupTableRow: React.FC<{ standings: StandingProps }> = ({ standings }) => {
    return (
        <tr style={{height: '55px'}}>
            <td style={{height: '55px'}}>{standings.position}</td>
            <td style={{height: '55px'}}>
                <Row className="align-items-center">
                    <Col xs={0} sm={0} md={0} lg={4}>
                        <Image src="https://upload.wikimedia.org/wikipedia/sco/5/53/Arsenal_FC.svg" alt={`${standings.team.name} Logo`} fluid />
                    </Col>
                    <Col xs={0} sm={0} md={0} lg={0}>
                        {standings.team.name}
                    </Col>
                </Row>
            </td>
            <td style={{height: '55px'}}>{standings.wins}</td>
            <td style={{height: '55px'}}>{standings.draws}</td>
            <td style={{height: '55px'}}>{standings.loses}</td>
            <td style={{height: '55px'}}>{standings.goalsFor}</td>
            <td style={{height: '55px'}}>{standings.goalsAgainst}</td>
            <td style={{height: '55px'}}>{standings.goalDiff}</td>
            <td style={{height: '55px'}}>{standings.points}</td>
        </tr>
    )
}

export default GroupTableRow
