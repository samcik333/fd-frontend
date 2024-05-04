import React, { useEffect, useState } from 'react'
import { Form, FormControl, Button, Nav, Modal } from 'react-bootstrap'
import * as Icon from 'react-bootstrap-icons'
import styles from './Sidebar.module.css'
import { useLocation } from "react-router-dom"
import { RegisterForm } from '../Auth/Register'
import { LoginForm } from '../Auth/Login'
import { useUser } from '../../UserContext'
import { CreateTournamentModel } from '../Tournament/CreateTournamentModel'

const Sidebar = () => {
    const [showModal, setShowModal] = useState(false)
    const [isLogin, setIsLogin] = useState(true)
    const location = useLocation()
    const isActive = (path: string) => location.pathname.includes(path)
    const { logoutUser } = useUser()
    const [showCreateTournamentModal, setShowCreateTournamentModal] = useState(false)

    const { user } = useUser()

    const toggleForm = () => {
        setIsLogin(!isLogin)
    }

    const handleModalClose = () => {
        setShowModal(false)
    }

    const handleModalOpen = () => {
        setShowModal(true)
    }

    const handleTournamentModalOpen = () => {
        setShowCreateTournamentModal(true)
    }

    const handleTournamentModalClose = () => {
        setShowCreateTournamentModal(false)
    }

    return (
        <div className={`d-flex flex-column flex-shrink-0 text-white ${styles.sidebar}`}>
            <div className={styles.sidebar_header}>
                Footday
            </div>
            <Form className={`d-flex ${styles.sidebar_search}`}>
                <FormControl
                    type="search"
                    placeholder="Search..."
                    aria-label="Search"
                />
                <Button variant="warning" className={styles.search_button}>
                    <Icon.Search />
                </Button>
            </Form>
            <Nav className="flex-column mb-auto">
                <Nav.Link href='/tournaments' className={styles.nav_link} style={{ color: isActive("/tournaments") ? '#EE9B00' : 'white' }}>
                    <Icon.TrophyFill className={styles.icon} />
                    Tournaments
                </Nav.Link>
                <Nav.Link href='/matches' className={styles.nav_link} style={{ color: isActive("/matches") ? '#EE9B00' : 'white' }}>
                    <Icon.Calendar className={styles.icon} />
                    Matches
                </Nav.Link>
                {user !== null && (
                    <>
                        <Nav.Link href='/myTournaments' className={styles.nav_link} style={{ color: isActive("/myTournaments") ? '#EE9B00' : 'white' }}>
                            <Icon.TrophyFill className={styles.icon} />
                            My Tournaments
                        </Nav.Link>
                        <Nav.Link onClick={handleTournamentModalOpen} className={styles.nav_link} style={{ color: 'white' }}>
                            <Icon.TrophyFill className={styles.icon} />
                            Create Tournament
                        </Nav.Link>

                    </>
                )}
            </Nav>
            {user === null && (
                <div className={styles.sidebar_footer}>
                    <Button variant="link" style={{ color: 'white', float: 'left', textDecoration: 'none' }} onClick={handleModalOpen}>Log in</Button>
                </div>
            )}
            {user !== null && (
                <div className={styles.sidebar_footer}>
                    <Button variant="link" style={{ color: 'white', float: 'right', textDecoration: 'none', backgroundColor: "red" }} onClick={logoutUser}>Log Out</Button>
                    <span style={{ color: 'white', float: 'left', marginTop: "5px" }}>{user ? user[0].username : ""}</span>
                </div>
            )}

            <Modal show={showModal} onHide={handleModalClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>{isLogin ? "Login" : "Register"}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {isLogin ? <LoginForm onSuccessfulLogin={handleModalClose} /> : <RegisterForm onSuccessfulRegister={handleModalClose} />}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={toggleForm}>
                        Switch to {isLogin ? "Register" : "Login"}
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showCreateTournamentModal} onHide={handleTournamentModalClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Create Tournament</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <CreateTournamentModel onSuccessfullCreate={handleTournamentModalClose} />
                </Modal.Body>
                <Modal.Footer>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default Sidebar
