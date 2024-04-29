// GroupTable.tsx
import React from 'react'
import { Table } from 'react-bootstrap'
import { StandingProps } from '../../Match/Match.def'
import GroupTableRow from './GroupTableRow'

interface GroupTableProps {
    groupName: string
    standings: StandingProps[]
}

const GroupTable: React.FC<GroupTableProps> = ({ groupName, standings }) => {
    return (
        <div>
            <h3>{groupName}</h3>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Position</th>
                        <th>Team</th>
                        <th>Wins</th>
                        <th>Draws</th>
                        <th>Loses</th>
                        <th>Goals For</th>
                        <th>Goals Against</th>
                        <th>Goal Difference</th>
                        <th>Points</th>
                    </tr>
                </thead>
                <tbody>
                    {standings.map(standing => (
                        <GroupTableRow key={standing.standingId} standings={standing} />
                    ))}
                </tbody>
            </Table>
        </div>
    )
}

export default GroupTable
