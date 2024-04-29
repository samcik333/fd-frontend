// GroupTableRow.tsx
import React from 'react'
import { Col, Image, Row } from 'react-bootstrap'
import { StandingProps } from '../../Match/Match.def'

const GroupTableRow: React.FC<{ standings: StandingProps }> = ({ standings }) => {
    return (
        <tr>
            <td>{standings.position}</td>
            <td>
                <Row className="align-items-center">
                    <Col xs={4} sm={3} md={2} lg={1}>
                        <Image src="https://t3.ftcdn.net/jpg/03/91/37/12/360_F_391371227_OOPKuywmf6dqwOTsw4Dfu0iDejLKyZZC.jpg" alt={`${standings.team.name} Logo`} fluid />
                    </Col>
                    <Col xs={8} sm={9} md={10} lg={11}>
                        {standings.team.name}
                    </Col>
                </Row>
            </td>
            <td>{standings.wins}</td>
            <td>{standings.draws}</td>
            <td>{standings.loses}</td>
            <td>{standings.goalsFor}</td>
            <td>{standings.goalsAgainst}</td>
            <td>{standings.goalDiff}</td>
            <td>{standings.points}</td>
        </tr>
    )
}

export default GroupTableRow
