import React, { useEffect } from "react";
import matchCss from "./Matches.module.css";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import {
  MatchEventProps,
  MatchProps,
  MatchStatProps,
  PlayerProps,
} from "./Match.def";
import {
  MatchEventType,
  MatchStatus,
} from "../MatchOrganizer/MatchOrganizer.def";
import { ProgressBar } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFutbol } from "@fortawesome/free-regular-svg-icons";
import { faSquare } from "@fortawesome/free-solid-svg-icons";

const EventTypeIcon: React.FC<{
  eventType?: MatchEventType;
  firstName?: string;
  lastName?: string;
}> = ({ eventType, firstName, lastName }) => {
  if (eventType === "goal" || eventType === "penaltyGoal")
    return (
      <div style={{ display: "flex", flexDirection: "row" }}>
        <FontAwesomeIcon icon={faFutbol} />
      </div>
    );
  else if (eventType === "penaltyMiss")
    return (
      <div style={{ display: "flex", flexDirection: "row" }}>
        <FontAwesomeIcon icon={faFutbol} style={{ color: "red" }} />
      </div>
    );
  else if (eventType === "redCard")
    return (
      <div style={{ display: "flex", flexDirection: "row" }}>
        <FontAwesomeIcon icon={faSquare} style={{ color: "red" }} />
      </div>
    );
  else if (eventType === "yellowCard")
    return (
      <div style={{ display: "flex", flexDirection: "row" }}>
        <FontAwesomeIcon icon={faSquare} style={{ color: "yellow" }} />
      </div>
    );
  else return <></>;
};

const MatchDetailEvents: React.FC<{
  isOverTime: boolean;
  matchData: MatchProps;
}> = ({ isOverTime, matchData }) => {
  function filterData(
    status: MatchStatus,
    types: MatchEventType[],
  ): MatchEventProps[] {
    return matchData.events.filter(
      (event) => event.status === status && types.includes(event.type),
    );
  }

  function checkWhichTeam(
    playerId: number | undefined,
    players: PlayerProps[],
  ) {
    if (players.some((player) => player.playerId === playerId)) return true;
    else return false;
  }

  function returnEventTime(event: MatchEventProps, matchType: MatchEventType) {
    const startSecondHalfEvent = matchData.events.find(
      (e) => e.type === "startSecondHalf",
    );

    const startFirstHalfEvent = matchData.events.find(
      (e) => e.type === matchType,
    );
    return (
      new Date(
        Math.abs(
          new Date(startFirstHalfEvent!.time).getTime() -
            new Date(event.time).getTime(),
        ),
      ).getMinutes() +
      1 +
      "'"
    );
  }

  function returnScore(lastEvent: MatchEventProps) {
    let firstTeamScore = 0;
    let secondTeamScore = 0;
    for (const event of matchData.events) {
      if (
        event.type === "goal" &&
        checkWhichTeam(event.player?.playerId, matchData.firstTeam.players)
      ) {
        firstTeamScore++;
      }
      if (
        event.type === "goal" &&
        checkWhichTeam(event.player?.playerId, matchData.secondTeam.players)
      ) {
        secondTeamScore++;
      }
      if (event.matchEventId === lastEvent.matchEventId) {
        break;
      }
    }

    return firstTeamScore + ":" + secondTeamScore;
  }

  const translateMatchState = {
    firstHalf: "First half",
    secondHalf: "Second half",
    firstExtraHalf: "First extra half",
    secondExtraHalf: "Second extra half",
    penalty: "Penalty",
  };
  return (
    <div>
      {["firstHalf", "secondHalf"].map((matchStatus) => {
        return (
          <Card style={{ width: "700px", margin: "auto", marginTop: "50px" }}>
            <Card.Header className={matchCss.matchHeader}>
              {(translateMatchState as any)[matchStatus]}
            </Card.Header>
            <ListGroup>
              {filterData(matchStatus as MatchStatus, [
                "goal",
                "yellowCard",
                "redCard",
                "penaltyGoal",
                "penaltyMiss",
              ]).map((event) => (
                <ListGroup.Item
                  key={event.matchEventId}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    flexDirection: matchData.firstTeam.players.some((player)=> player.playerId === event.player?.playerId) ? "row" : 'row-reverse' ,
                    padding: "10px 20px",
                    width: "100%"
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <EventTypeIcon eventType={event.type} />
                    <div
                    style={{
                      display: "flex",
                      gap: "10px",
                      alignItems: "center",
                      flexDirection:'column'  
                    }}
                  >
                      <div>
                        {event.player!.firstName} {event.player!.lastName}
                      </div>
                      {event.assist && (
                        <small>
                          {event.assist.firstName} {event.assist.lastName}
                        </small>
                      )}
                    </div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                    }}
                  >
                    {returnScore(event)}
                  </div>
                  <div
                    style={{
                      display: "flex",
                    }}
                  >
                    {returnEventTime(event, "startFirstHalf")}
                  </div>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Card>
        );
      })}

      {isOverTime &&
        ["firstExtraHalf", "secondExtraHalf", "penalty"].map((matchStatus) => {
          return (
            <Card style={{ width: "700px", margin: "auto", marginTop: "50px" }}>
              <Card.Header className={matchCss.matchHeader}>
                {(translateMatchState as any)[matchStatus]}
              </Card.Header>
              <ListGroup>
                {filterData(matchStatus as MatchStatus, [
                  "goal",
                  "yellowCard",
                  "redCard",
                  "penaltyGoal",
                  "penaltyMiss",
                ]).map((event) => (
                  <ListGroup.Item
                    key={event.matchEventId}
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    flexDirection: matchData.firstTeam.players.some((player)=> player.playerId === event.player?.playerId) ? "row" : 'row-reverse' ,
                    padding: "10px 20px",
                    width: "100%"
                  }}
                  >
                    <div
                      style={{
                        display: "flex",
                        gap: "10px",
                        alignItems: "center",
                      }}
                    >
                      <EventTypeIcon eventType={event.type} />
                      <div>
                        <div>
                          {event.player!.firstName} {event.player!.lastName}
                        </div>
                        {event.assist && (
                          <small>
                            {event.assist.firstName} {event.assist.lastName}
                          </small>
                        )}
                      </div>
                    </div>
                    <div>{returnScore(event)}</div>
                    <div>{returnEventTime(event, "startFirstHalf")}</div>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Card>
          );
        })}

      {(
        [
          "yellowCards",
          "redCards",
          "shotsOnGoal",
          "totalShots",
          "freeKicks",
          "fouls",
          "offsides",
        ] as (keyof Omit<MatchStatProps, "team">)[]
      ).map((statistic) => {
        return (
          <div
            style={{ display: "flex", flexDirection: "column", gap: "20px" }}
          >
            <label>{statistic}</label>
            <div style={{ display: "flex", flexDirection: "row", flexGrow: 1 }}>
              <label>{matchData.matchStatFirstTeam[statistic]}</label>
              <div style={{ width: "100%" }}>
                <ProgressBar>
                  <ProgressBar
                    max={
                      matchData.matchStatFirstTeam[statistic] +
                      matchData.matchStatSecondTeam[statistic]
                    }
                    style={{ background: "#005F73" }}
                    now={matchData.matchStatFirstTeam[statistic]}
                  />
                  <ProgressBar
                    max={
                      matchData.matchStatFirstTeam[statistic] +
                      matchData.matchStatSecondTeam[statistic]
                    }
                    style={{ background: "#DAE2FF" }}
                    now={matchData.matchStatSecondTeam[statistic]}
                  />
                </ProgressBar>
              </div>
              <label>{matchData.matchStatSecondTeam[statistic]}</label>
            </div>
          </div>
        );
      })}
      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        <label>Saves</label>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <label>
            {matchData.matchStatFirstTeam.shotsOnGoal -
              matchData.scoreFirstTeam}
          </label>
          <div style={{ width: "100%" }}>
            <ProgressBar>
              <ProgressBar
                max={
                  matchData.matchStatFirstTeam.shotsOnGoal -
                  matchData.scoreFirstTeam +
                  (matchData.matchStatSecondTeam.shotsOnGoal -
                    matchData.scoreSecondTeam)
                }
                style={{ background: "#005F73" }}
                now={
                  matchData.matchStatFirstTeam.shotsOnGoal -
                  matchData.scoreFirstTeam
                }
              />
              <ProgressBar
                max={
                  matchData.matchStatFirstTeam.shotsOnGoal -
                  matchData.scoreFirstTeam +
                  (matchData.matchStatSecondTeam.shotsOnGoal -
                    matchData.scoreSecondTeam)
                }
                style={{ background: "#DAE2FF" }}
                now={
                  matchData.matchStatSecondTeam.shotsOnGoal -
                  matchData.scoreSecondTeam
                }
              />
            </ProgressBar>
          </div>
          <label>
            {matchData.matchStatSecondTeam.shotsOnGoal -
              matchData.scoreSecondTeam}
          </label>
        </div>
      </div>
    </div>
  );
};

export default MatchDetailEvents;
