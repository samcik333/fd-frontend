import React, { useEffect, useState, useRef } from "react";
import { TeamProps } from "../Match/Match.def";
import { useLocation } from "react-router-dom";
import TeamsFilters from "../Filters/TeamsFilters";
import TeamCard from "./TeamCard";
import tour from "../Tournament/Tournament.module.css";

interface Filters {
  [key: string]: string;
}

const TeamsList: React.FC<{setRerender:React.Dispatch<React.SetStateAction<boolean>>;rerender: boolean}> = ({
  setRerender,rerender
}) => {
  const [teams, setTeams] = useState<TeamProps[]>([]);
  const [filters, setFilters] = useState<Filters>({});
  const isMounted = useRef(false);
  const location = useLocation();

  useEffect(() => {
    if (isMounted.current) {
      if (location.pathname.includes("/myTeams")) {
        fetchMyTeams(filters);
      } else {
        fetchTeams(filters);
      }
    } else {
      isMounted.current = true;
    }
  }, [filters,rerender]); 

  const fetchTeams = async (filters: Filters) => {
    const queryParams = new URLSearchParams(filters).toString();
    try {
      const response = await fetch(
        `http://localhost:3000/teams?${queryParams}`,
      );
      if (response.ok) {
        const data = await response.json();
        setTeams(data);
      } else {
        throw new Error("Failed to fetch tournaments.");
      }
    } catch (error) {
      console.error("Error fetching tournaments:", error);
    }
  };

  const fetchMyTeams = async (filters: Filters) => {
    const queryParams = new URLSearchParams(filters).toString();
    try {
      const response = await fetch(
        `http://localhost:3000/teams/my?${queryParams}`,
        { credentials: "include" },
      );
      if (response.ok) {
        const data = await response.json();
        setTeams(data);
      } else {
        throw new Error("Failed to fetch tournaments.");
      }
    } catch (error) {
      console.error("Error fetching tournaments:", error);
    }
  };

  const handleFilterChange = (filterName: string, value: string) => {
    setFilters((prevFilters) => ({ ...prevFilters, [filterName]: value }));
  };

  return (
    <div className="bg-light" style={{ width: "100%" }}>
      <TeamsFilters onFilterChange={handleFilterChange} />
      <div style={{ marginLeft: "356px", marginTop: "80px" }}>
        <div className={tour.tournament_list}>
          {teams.map((team) => (
            <TeamCard team={team} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeamsList;
