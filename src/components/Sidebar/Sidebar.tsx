import React, { useEffect, useState } from 'react'
import { Form, FormControl, Button, Nav, Modal } from 'react-bootstrap'
import * as Icon from 'react-bootstrap-icons'
import styles from './Sidebar.module.css'
import { useLocation } from "react-router-dom"
import { RegisterForm } from '../Auth/Register'
import { LoginForm } from '../Auth/Login'
import { useUser } from '../../UserContext'

const Sidebar = () => {
    const [showModal, setShowModal] = useState(false)
    const [isLogin, setIsLogin] = useState(true)
    const location = useLocation()
    const isActive = (path: string) => location.pathname.includes(path)

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

                        <Nav.Link href='/myTeams' className={styles.nav_link} style={{ color: isActive("/myTeams") ? '#EE9B00' : 'white' }}>
                            <Icon.PeopleFill className={styles.icon} />  {/* Assuming PeopleFill icon represents a team */}
                            My Teams
                        </Nav.Link>

                        <Nav.Link href='/myMatches' className={styles.nav_link} style={{ color: isActive("/myMatches") ? '#EE9B00' : 'white' }}>
                            <Icon.CalendarEventFill className={styles.icon} />  {/* CalendarEventFill can indicate scheduled matches */}
                            My Matches
                        </Nav.Link>

                        <Nav.Link href='/createTournament' className={styles.nav_link} style={{ color: isActive("/createTournament") ? '#EE9B00' : 'white' }}>
                            <Icon.PlusCircleFill className={styles.icon} />  {/* PlusCircleFill for creating new items */}
                            Create Tournament
                        </Nav.Link>

                        <Nav.Link href='/createTeam' className={styles.nav_link} style={{ color: isActive("/createTeam") ? '#EE9B00' : 'white' }}>
                            <Icon.PlusSquareFill className={styles.icon} />  {/* PlusSquareFill for creating new teams */}
                            Create Team
                        </Nav.Link>
                    </>
                )}
            </Nav>

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
        </div>
    )
}

export default Sidebar
