export interface Tournament {
    tournamentId?: number // assuming you do not always have this when creating new tournaments
    name?: string
    startDate?: string // Adjusted to match your use of startDate
    endDate?: string // Adjusted to match your use of endDate
    location?: string // Adjusted to match the use of place
    format?: string
    type?: string // Adjusted to match your use of matchType
    numOfTeams?: number
    numOfGroups?: number // Newly added
    numOfAdvanced?: number // Newly added
    numbOfTeamsInGroup?: number // Newly added
    numberOfPlayOffTeams?: number // Newly added
    visibility?: string // Newly added
    status?: string // Newly added
}