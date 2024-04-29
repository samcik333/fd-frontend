export interface TournamentProps {
    tournamentId: number
    organizer: UserProps // You might want to use a simpler UserProps type for nested interfaces
    name?: string
    startDate: Date
    endDate: Date
    location?: string
    format: "Group" | "Play-off" | "Group+Play-off"
    type: "2v2" | "3v3" | "4v4" | "5v5" | "6v6" | "7v7" | "8v8" | "9v9" | "10v10" | "11v11"
    stage: string
    numOfTeams: number
    numOfGroups: number
    numOfAdvanced: number
    logo?: string
    status: "finished" | "ongoing" | "upcoming"
    visibility: "public" | "private"
    description?: string
    teams: TeamProps[]
    matches: MatchProps[]
    standings: StandingProps[]
    scorers: ScorerProps[]
}

export interface TeamProps {
    teamId: number
    owner: UserProps // Again, consider a UserProps type for simplicity
    name: string
    logo?: string
    wins: number
    draws: number
    loses: number
    location?: string
    tournaments: TournamentProps[]
    players: PlayerProps[]
    homeMatches: MatchProps[]
    awayMatches: MatchProps[]
    standings: StandingProps[]
}

export interface StandingProps {
    map(arg0: (standings: any) => import("react/jsx-runtime").JSX.Element): import("react").ReactNode
    standingId: number
    tournament: TournamentProps
    team: TeamProps
    position: number
    wins: number
    draws: number
    loses: number
    goalsFor: number
    goalsAgainst: number
    goalDiff: number
    points: number
    group?: string
}

export interface ScorerProps {
    scorerId: number
    tournament: TournamentProps
    player: PlayerProps
    goals: number
    assists: number
    yellowCards: number
    redCards: number
}

export interface MatchCardsProps {
    matchId: number
    datetime: string // Format as needed for display
    location?: string
    status: 'finished' | 'live' | 'upcoming'
    firstTeam: TeamProps // Detailed team info, assuming TeamProps is well defined
    secondTeam: TeamProps // Similarly detailed team info
    scoreFirstTeam?: number
    scoreSecondTeam?: number
    type: string
    group?: string
}

export enum Role {
    Player = "player",
    Organizer = "organizer",
    Owner = "owner",
    TimeTracker = "timeTracker",
    Admin = "Admin",
    User = "User"
}

export interface UserProps {
    userId: number
    username: string
    email: string
    password: string
    roles: Role[]
    logo?: string
    firstName: string
    secondName: string
    teams: TeamProps[] // Assuming type Team[] is correctly imported and defined elsewhere
    tournaments: TournamentProps[] // Assuming type Tournament[] is correctly imported and defined elsewhere
}

export interface PlayerProps {
    playerId: number
    user: UserProps
    teams: TeamProps[]
}

export interface MatchProps {
    matchId: number
    tournament: TournamentProps
    datetime: Date
    location?: string
    status: "finished" | "live" | "upcoming"
    firstTeam: TeamProps
    secondTeam: TeamProps
    scoreFirstTeam?: number
    scoreSecondTeam?: number
    type: string
    group?: string
    matchStatFirstTeam: MatchStatProps
    matchStatSecondTeam: MatchStatProps
    events: MatchEventProps[]
}

export enum eventType {
    Goal = "goal",
    Assist = "assist",
    yellowCard = "yellowCard",
    redCard = "redCard",
}

export interface MatchEventProps {
    matchEventId: number
    player: PlayerProps // Consider using a simpler PlayerProps type if needed for nested interfaces
    match: MatchProps // Consider using a simpler MatchProps type if nested interfaces are complex
    time: number // Note: Originally noted as Date type for simplicity, but kept as number to match your description
    type: eventType
}

export interface MatchStatProps {
    matchStatId: number
    team: TeamProps // Consider using a simpler TeamProps type for nested interfaces
    totalShots: number
    shotsOnGoal: number
    saves: number
    corners: number
    freeKicks: number
    fouls: number
    offsides: number
    redCards: number
    yellowCards: number
}