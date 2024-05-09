import {
  MatchEventType,
  MatchStatus,
} from "../MatchOrganizer/MatchOrganizer.def"

export interface TournamentProps {
  tournamentId: number
  organizer: UserProps
  name?: string
  startDate: Date
  endDate: Date
  location?: string
  format: "Group" | "Play-off" | "Group+Play-off"
  type:
  | "2v2"
  | "3v3"
  | "4v4"
  | "5v5"
  | "6v6"
  | "7v7"
  | "8v8"
  | "9v9"
  | "10v10"
  | "11v11"
  stage: string
  numOfTeams: number
  numOfGroups: number
  numOfAdvanced: number
  numOfTeamsInGroup: number
  numberOfPlayOffTeams: 2 | 4 | 8 | 16 | 32
  logo?: string
  status: "finished" | "ongoing" | "upcoming"
  visibility: "public" | "private"
  description?: string
  teams: TeamProps[]
  matches: MatchProps[]
  standings: StandingProps[]
  scorers: ScorerProps[]
  groups: GroupProps[]
}

export interface TeamProps {
  teamId: number
  owner: UserProps
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
  map(
    arg0: (standings: any) => import("react/jsx-runtime").JSX.Element,
  ): import("react").ReactNode
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
  datetime: string
  location?: string
  status:
  | "finished"
  | "firstHalf"
  | "halfTime"
  | "secondHalf"
  | "upcoming"
  | "firstExtraTime"
  | "secondExtraTime"
  | "halfExtraTime"
  | "penalty"
  firstTeam: TeamProps
  secondTeam: TeamProps
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
  User = "User",
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
  teams: TeamProps[]
  tournaments: TournamentProps[]
}

export interface PlayerProps {
  playerId: number
  firstName: string
  lastName: string
  number: number
  age: number
  team: TeamProps
}

export interface GroupProps {
  groupId: number
  name: string
  homeTeamIndex?: number
  awayTeamIndex?: number
  round: number
  tournament: TournamentProps
  colIndex?: number
  matches: MatchProps[]
  teams: TeamProps[]
  homeTeam?: TeamProps
  awayTeam?: TeamProps
}

export interface MatchProps {
  matchId: number
  tournament: TournamentProps
  datetime: Date
  location?: string
  status:
  | "finished"
  | "firstHalf"
  | "halfTime"
  | "secondHalf"
  | "upcoming"
  | "firstExtraHalf"
  | "secondExtraHalf"
  | "halfExtraTime"
  | "overTime"
  | "penalty"
  firstTeam: TeamProps
  secondTeam: TeamProps
  scoreFirstTeam: number
  scoreSecondTeam: number
  type: string
  group: GroupProps
  matchStatFirstTeam: MatchStatProps
  matchStatSecondTeam: MatchStatProps
  events: MatchEventProps[]
}

export interface MatchEventProps {
  matchEventId: number
  player?: PlayerProps
  assist?: PlayerProps
  match: MatchProps
  time: string
  type: MatchEventType
  status: MatchStatus
}

export interface MatchStatProps {
  matchStatId: number
  team: TeamProps
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
