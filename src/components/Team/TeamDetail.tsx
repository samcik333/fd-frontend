import React, { useState } from "react"
import { useParams } from "react-router-dom"
import { Button, Modal } from "react-bootstrap"
import { useEffect } from "react"
import { TeamProps } from "../Match/Match.def"
import MatchPlayersCard from "../Match/MatchPlayersCard"
import { AddPlayerModal } from "./AddPlayerModal"
const TeamDetail: React.FC = () => {
  const { id } = useParams()

  const [team, setTeam] = useState<TeamProps | undefined>(undefined)
  const [showAddPlayerModal, setShowAddPlayerModal] = useState<boolean>(false)
  useEffect(() => {
    fetchTeamDetail()
  }, [showAddPlayerModal])

  const fetchTeamDetail = async () => {
    try {
      const response = await fetch(`http://localhost:3000/teams/${id}`)
      if (response.ok) {
        const data = await response.json()
        setTeam(data)
      } else {
        throw new Error("Failed to fetch teams.")
      }
    } catch (error) {
      console.error("Error fetching teams:", error)
    }
  }

  const handlePlayerModalOpen = () => {
    setShowAddPlayerModal(true)
  }

  const handlePlayerModalClose = () => {
    setShowAddPlayerModal(false)
  }

  return (
    <div style={{ margin: "20px" }}>
      {team && (
        <div style={{ display: "flex", flexDirection: "column" }}>
          <Button variant="primary" onClick={handlePlayerModalOpen}>
            +Add players
          </Button>
          <MatchPlayersCard players={team.players} teamName={team.name} />
        </div>
      )}
      <Modal show={showAddPlayerModal} onHide={handlePlayerModalClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add player</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AddPlayerModal
            onSuccessfullCreate={handlePlayerModalClose}
            id={id}
          />
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </div>
  )
}

export default TeamDetail
