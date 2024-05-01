import React from 'react'
import { Form, FormControl, Button, Nav } from 'react-bootstrap'
import * as Icon from 'react-bootstrap-icons' // Make sure to import TrophyFill
import styles from './Sidebar.module.css'
import { useLocation } from "react-router-dom"


const Sidebar = () => {
    const location = useLocation();
    const isActive = (path: string) => {
        return location.pathname.includes(path)
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
                <Nav.Link href='/tournaments' className={styles.nav_link} style={{color: isActive("/tournaments") ? '#EE9B00':'white'}}>
                    <Icon.TrophyFill className={styles.icon} /> {/* Add the TrophyFill icon here */}
                    Tournaments
                </Nav.Link>
                <Nav.Link href='/matches' className={styles.nav_link} style={{color: isActive("/matches") ? '#EE9B00':'white'}}>
                    <Icon.Calendar className={styles.icon} /> {/* Add the TrophyFill icon here */}
                    Matches
                </Nav.Link>
            </Nav>
            <div className={styles.sidebar_footer}>
                <Button variant="link" style={{color:'white', float:'left', textDecoration:'none'}}>Log in</Button>
            </div>
        </div>
    )
}

export default Sidebar
