import React, { useState, useEffect } from "react"
import { ListGroup, Button, Modal } from "react-bootstrap"
import { Trash } from "react-bootstrap-icons"
import { PlayerProps } from "../../Match/Match.def"
import { CreatePlayerModal } from "../../Player/CreatePlayerModal"

const Players: React.FC<{
  teamId: number
  teamName: string
  isOrganizer: boolean
}> = ({ teamId, teamName, isOrganizer }) => {
  const [players, setPlayers] = useState<PlayerProps[]>([])
  const [showCreatePlayerModal, setShowCreatePlayerModal] = useState(false)

  useEffect(() => {
    fetchPlayers()
  }, [teamId])

  const fetchPlayers = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/tournaments/teams/${teamId}/players`,
        { credentials: "include" },
      )
      if (response.ok) {
        const data = await response.json()
        setPlayers(data)
      } else {
        throw new Error("Failed to fetch players.")
      }
    } catch (error) {
      console.error("Error fetching players:", error)
    }
  }

  const handlePlayerModalOpen = () => {
    setShowCreatePlayerModal(true)
  }

  const handlePlayerModalClose = () => {
    setShowCreatePlayerModal(false)
  }
  return (
    <div>
      <h3>{teamName}</h3>
      <ListGroup>
        {players.map((player, index) => (
          <ListGroup.Item
            key={index}
            className="d-flex justify-content-between align-items-center"
          >
            {`${player.firstName} ${player.lastName}`}
            {isOrganizer && (
              <Button variant="danger" size="sm">
                <Trash />
              </Button>
            )}
          </ListGroup.Item>
        ))}
      </ListGroup>
      {isOrganizer && (
        <Button
          onClick={handlePlayerModalOpen}
          variant="primary"
          className="mt-3"
          style={{ width: "100%" }}
        >
          Add Player
        </Button>
      )}
      <Modal
        show={showCreatePlayerModal}
        onHide={handlePlayerModalClose}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Create Player</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CreatePlayerModal onSuccessfullCreate={handlePlayerModalClose} />
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </div>
  )
}

export default Players
