import React, { useState, useEffect } from "react"
import { Button, Container, Row } from "react-bootstrap"
import * as Icon from "react-bootstrap-icons"
import {
  MatchProps,
  StandingProps,
  TournamentProps,
} from "../../Match/Match.def"
import GroupTable from "./GroupTable"
import MatchCard from "../../Match/MatchCard"
import matchCss from "../../Match/Matches.module.css"

const GroupList: React.FC<{ tournament: TournamentProps | undefined }> = ({
  tournament,
}) => {
  const [groupedStandings, setGroupedStandings] = useState<
    Record<string, StandingProps[]>
  >({})
  const [tournamentMatches, setTournamentMatches] = useState<MatchProps[]>([])
  const [currentRoundIndex, setCurrentRoundIndex] = useState(0)

  const calculateRounds = (numOfTeams: number, numOfGroups: number) => {
    let roundsPerGroup = 0
    if (numOfGroups === 1) {
      roundsPerGroup = numOfTeams - 1
    } else {
      roundsPerGroup = numOfTeams / numOfGroups - 1
    }
    const totalRounds = roundsPerGroup
    return Array.from({ length: totalRounds }, (_, i) => `${i + 1}.Round`)
  }

  const [rounds, setRounds] = useState<string[]>([])

  useEffect(() => {

    if (tournament && tournament.numOfTeams && tournament.numOfGroups) {
      setRounds(calculateRounds(tournament.numOfTeams, tournament.numOfGroups))
    }
  }, [tournament])

  useEffect(() => {
    const fetchStandings = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/tournaments/${tournament?.tournamentId}/standings`,
          { credentials: "include" },
        )

        if (response.ok) {
          const data: StandingProps[] = await response.json()
          const groups = data.reduce(
            (acc: Record<string, StandingProps[]>, standing: StandingProps) => {
              const group = standing.group || "Ungrouped"
              acc[group] = acc[group] || []
              acc[group].push(standing)
              return acc
            },
            {},
          )
          const sortedGroups = Object.keys(groups).reduce((sortedAcc: Record<string, StandingProps[]>, groupName: string) => {
            sortedAcc[groupName] = groups[groupName].sort((a, b) => b.points - a.points)
            return sortedAcc
          }, {})
          setGroupedStandings(sortedGroups)
        } else {
          throw new Error("Network response was not ok.")
        }
      } catch (error) {
        console.error("Error fetching standings:", error)
      }
    }

    const fetchMatches = async () => {
      try {
        const roundType = encodeURIComponent(rounds[currentRoundIndex])
        const response = await fetch(
          `http://localhost:3000/tournaments/${tournament?.tournamentId}/matches?type=${roundType}`,
          { credentials: "include" },
        )
        if (response.ok) {
          const data: MatchProps[] = await response.json()
          setTournamentMatches(
            data.filter((match) => match.type === roundType),
          )
        } else {
          throw new Error("Network response was not ok.")
        }
      } catch (error) {
        console.error("Error fetching matches:", error)
      }
    }
    if (rounds.length > 0) {

      fetchStandings()
      fetchMatches()
    }
  }, [tournament?.tournamentId, currentRoundIndex, rounds])

  const goPreviousRound = () =>
    setCurrentRoundIndex(Math.max(0, currentRoundIndex - 1))
  const goNextRound = () =>
    setCurrentRoundIndex(Math.min(rounds.length - 1, currentRoundIndex + 1))

  return (
    <Container>
      <Row>
        {Object.entries(groupedStandings).map(
          ([groupName, standings], index) => (
            <GroupTable
              key={index}
              groupName={groupName}
              standings={standings}
            />
          ),
        )}
        <div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <h3>Schedule</h3>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                backgroundColor: "#D9D9D9",
                width: "fit-content",
                marginBottom: "20px",
              }}
            >
              <Button
                variant="link"
                onClick={goPreviousRound}
                disabled={currentRoundIndex === 0}
              >
                <Icon.ArrowLeft />
              </Button>
              <h4 style={{ display: "flex", alignSelf: "center" }}>
                {rounds[currentRoundIndex]}
              </h4>
              <Button
                variant="link"
                onClick={goNextRound}
                disabled={currentRoundIndex === rounds.length - 1}
              >
                <Icon.ArrowRight />
              </Button>
            </div>
            <div className={`${matchCss.matchListContainer}`}>
              {tournamentMatches.map((match, idx) => (
                <MatchCard key={idx} match={match} />
              ))}
            </div>
          </div>
        </div>
      </Row>
    </Container>
  )
}

export default GroupList
