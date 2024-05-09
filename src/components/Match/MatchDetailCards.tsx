import React from "react";
import { MatchProps, PlayerProps } from "./Match.def";
import MatchPlayersCard from "./MatchPlayersCard";
import MatchDetailEvents from "./MatchDetailEvents";
const MatchDetailCards: React.FC<{ isOverTime: boolean,matchData: MatchProps }> = ({
  isOverTime,matchData,
}) => {
  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          width: "calc(100%-256px)",
          justifyContent: "space-between",
        }}
      >
        <MatchPlayersCard
          players={matchData.firstTeam.players}
          teamName={matchData.firstTeam.name}
        />
        <MatchDetailEvents matchData={matchData} isOverTime={isOverTime} />
        <MatchPlayersCard
          players={matchData.secondTeam.players}
          teamName={matchData.secondTeam.name}
        />
      </div>
    </>
  );
};

export default MatchDetailCards;
