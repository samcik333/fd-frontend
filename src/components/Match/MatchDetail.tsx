import React, { useEffect, useState } from "react";
import MatchDetailHeader from "./MatchDetailHeader";
import MatchDetailCards from "./MatchDetailCards";
import { useParams } from "react-router-dom";
import { Button } from "react-bootstrap";
import MatchOrganizerDetailCards from "../MatchOrganizer/MatchOrganizerDetailCards";
import { MatchProps } from "./Match.def";
const MatchDetail: React.FC = () => {
  const { id } = useParams();
  const [matchData, setMatchData] = useState<MatchProps>();
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [isOverTime, setIsOverTime] = useState<boolean>(false);


  const fetchMatchDetail = async () => {
    try {
      const endpoint = `http://localhost:3000/matches/${id}`;

      const options = {
        method: "GET",
        credentials: "include",
      } as RequestInit;
      const response = await fetch(endpoint, options);

      if (response.ok) {
        const data = await response.json();
        setMatchData(data);
      } else {
        throw new Error("Failed to fetch teams.");
      }
    } catch (error) {
      console.error("Error fetching teams:", error);
    }
  };

  /**
   * This useEffect is here to send fetch every 5sec 
   */
    useEffect(() => {
      const fetchTimer = setInterval(() => {
        fetchMatchDetail();
      }, 5000);
  
      return () => {
        clearInterval(fetchTimer);
      };
    }, []); 
  
  useEffect(() => {
    fetchMatchDetail();
  }, [id]);

  useEffect(()=>{
    matchData?.events.some(event=>event.status==="overTime") && setIsOverTime(true)
  },[matchData])

  return (
    <>
      {matchData && (
        <div
          style={{ width: "100%", display: "flex", flexDirection: "column" }}
        >
          <MatchDetailHeader matchData={matchData} />
          <Button onClick={() => setIsAdmin(!isAdmin)}>
            Change to admin view
          </Button>
          {isAdmin ? (
            <MatchOrganizerDetailCards
              matchData={matchData}
              setMatchData={setMatchData}
            />
          ) : (
            <MatchDetailCards isOverTime={isOverTime}matchData={matchData} />
          )}
        </div>
      )}
    </>
  );
};

export default MatchDetail;
