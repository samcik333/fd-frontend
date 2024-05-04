import React from 'react'

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
        <div className="card mx-2 my-3" style={{ width: '18rem' }}>
            <div className="card-body">
                <h5 className="card-title">{title}</h5>
                <ul className="list-group list-group-flush">
                    {stats.map((stat, index) => (
                        <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                            {stat.name} ({stat.team})
                            <span className="badge bg-primary rounded-pill">{stat.value}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default StatsCard
