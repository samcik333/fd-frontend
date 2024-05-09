import React from "react"
import matchCss from "../../Match/Matches.module.css"
import { Card } from "react-bootstrap"

interface Stat {
  name: string
  team: string
  value: number
}

interface StatsCardProps {
  title: string
  stats: Stat[]
}

const StatsCard: React.FC<StatsCardProps> = ({ title, stats }) => {
  return (
    <Card className={`${matchCss.matchCard}`}  >
      <Card.Header className={`${matchCss.matchHeader}`}>
        {title}
      </Card.Header>
      <Card.Body>
        {stats.map((stat, index) => (
          <li
            key={index}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            {stat.name} ({stat.team})
            <span className="badge bg-primary rounded-pill">
              {stat.value}
            </span>
          </li>
        ))}
      </Card.Body>
    </Card>
  )

}

export default StatsCard
