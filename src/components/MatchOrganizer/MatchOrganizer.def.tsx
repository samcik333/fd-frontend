import { PlayerProps } from "../Match/Match.def";

export type MatchEventType =
  | "startFirstHalf"
  | "startSecondHalf"
  | "stopFirstHalf"
  | "stopSecondHalf"
  | "startFirstExtraHalf"
  | "startSecondExtraHalf"
  | "stopFirstExtraHalf"
  | "stopSecondExtraHalf"
  | "stopPenalty"
  | "goal"
  | "shot"
  | "shotOnGoal"
  | "penaltyMiss"
  | "penaltyGoal"
  | "freeKick"
  | "foul"
  | "offside"
  | "yellowCard"
  | "redCard";

export interface MatchEvent {
  type: MatchEventType;
  playerId: number | undefined;
  assistId: number | undefined;
  teamId: number | undefined;
  matchId: number;
}

export type MatchStatus =
  | "upcoming"
  | "firstHalf"
  | "halfTime"
  | "secondHalf"
  | "overTime"
  | "firstExtraHalf"
  | "halfExtraTime"
  | "secondExtraHalf"
  | "penalty"
  | "finished";

export interface MatchEvent {
  matchEventId: number;
  player?: PlayerProps;
  time: Date;
  type: MatchEventType;
  assist?: PlayerProps;
  status: MatchStatus;
}
