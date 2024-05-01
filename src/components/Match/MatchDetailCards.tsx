import React from "react";
import { PlayerProps } from "./Match.def";
import { arrayMatchData } from "./mockArray";
import MatchPlayersCard from "./MatchPlayersCard";
import MatchDetailEvents from "./MatchDetailEvents";
const MatchDetailCards: React.FC = () => {
  return (
    <>
      {arrayMatchData.map((data) => {
        return (
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              width: "100%",
              justifyContent: "space-between",
            }}
          >
            <MatchPlayersCard
              players={
                data.matchStatFirstTeam.team.players as unknown as PlayerProps[]
              }
              teamName={data.matchStatFirstTeam.team.name}
            />
            <MatchDetailEvents />
            <MatchPlayersCard
              players={
                data.matchStatFirstTeam.team.players as unknown as PlayerProps[]
              }
              teamName={data.matchStatSecondTeam.team.name}
            />
          </div>
        );
      })}
    </>
  );
};

export default MatchDetailCards;
