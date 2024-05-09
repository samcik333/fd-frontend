// GroupTable.tsx
import React from "react"
import { Table } from "react-bootstrap"
import { StandingProps } from "../../Match/Match.def"
import GroupTableRow from "./GroupTableRow"
import styles from "./Table.module.css"

interface GroupTableProps {
  groupName: string
  standings: StandingProps[]
}

const GroupTable: React.FC<GroupTableProps> = ({ groupName, standings }) => {
  console.log(standings)
  return (
    <div>
      <Table className={styles.rounded} striped hover>
        <thead>
          <tr>
            <th colSpan={1}>{groupName}</th>
          </tr>
          <tr style={{ background: "#005F73" }}>
            <th style={{ background: "inherit", color: "white" }}>Position</th>
            <th
              style={{ background: "inherit", color: "white", width: "200px" }}
            >
              Team
            </th>
            <th style={{ background: "inherit", color: "white" }}>Wins</th>
            <th style={{ background: "inherit", color: "white" }}>Draws</th>
            <th style={{ background: "inherit", color: "white" }}>Loses</th>
            <th style={{ background: "inherit", color: "white" }}>Goals For</th>
            <th style={{ background: "inherit", color: "white" }}>
              Goals Against
            </th>
            <th style={{ background: "inherit", color: "white" }}>
              Goal Difference
            </th>
            <th style={{ background: "inherit", color: "white" }}>Points</th>
          </tr>
        </thead>
        <tbody>
          {standings.map((standing, index) => (
            <GroupTableRow key={standing.standingId} standings={standing} numberOfTeams={index + 1} />
          ))}
        </tbody>
      </Table>
    </div>
  )
}

export default GroupTable
