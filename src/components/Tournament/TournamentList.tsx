import React, { useEffect, useState, useRef } from "react"
import TournamentCard from "./TournamentCard"
import TournamentFilters from "../Filters/Filters"
import tour from "./Tournament.module.css"
import { TournamentProps } from "../Match/Match.def"
import { useLocation } from "react-router-dom"
import { useUser } from "../../UserContext"

interface Filters {
  [key: string]: string
}

const TournamentList: React.FC<{ setRerender: React.Dispatch<React.SetStateAction<boolean>>; rerender: boolean }> = ({
  setRerender, rerender
}) => {
  const [tournaments, setTournaments] = useState<TournamentProps[]>([])
  const [filters, setFilters] = useState<Filters>({}) // Initialize filters with today's date
  const isMounted = useRef(false)
  const location = useLocation()
  const { user } = useUser()

  useEffect(() => {
    if (isMounted.current) {
      if (location.pathname.includes("/myTournaments")) {
        fetchMyTournaments(filters)
      } else {
        fetchTournaments(filters)
      }
    } else {
      isMounted.current = true
    }
  }, [filters, rerender])

  const fetchTournaments = async (filters: Filters) => {
    const queryParams = new URLSearchParams(filters).toString()
    try {
      const response = await fetch(
        `http://localhost:3000/tournaments?${queryParams}`,
        { credentials: "include" },
      )
      if (response.ok) {
        const data = await response.json()
        setTournaments(data)
      } else {
        throw new Error("Failed to fetch tournaments.")
      }
    } catch (error) {
      console.error("Error fetching tournaments:", error)
    }
  }

  const fetchMyTournaments = async (filters: Filters) => {
    const queryParams = new URLSearchParams(filters).toString()
    try {
      const response = await fetch(
        `http://localhost:3000/tournaments/own?${queryParams}`,
        { credentials: "include" },
      )
      if (response.ok) {
        const data = await response.json()
        setTournaments(data)
      } else {
        throw new Error("Failed to fetch tournaments.")
      }
    } catch (error) {
      console.error("Error fetching tournaments:", error)
    }
  }

  const handleFilterChange = (filterName: string, value: string) => {
    setFilters((prevFilters) => ({ ...prevFilters, [filterName]: value }))
  }

  return (
    <div className="bg-light" style={{ width: "100%" }}>
      <TournamentFilters onFilterChange={handleFilterChange} />
      <div style={{ marginLeft: "356px", marginTop: "80px" }}>
        <div className={tour.tournament_list}>
          {tournaments.map((tournament, index) => (
            <TournamentCard key={index} tournament={tournament} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default TournamentList
