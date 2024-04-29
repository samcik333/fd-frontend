import React from 'react'
import { Form, FormControl, Button, Nav } from 'react-bootstrap'
import * as Icon from 'react-bootstrap-icons' // Make sure to import TrophyFill
import styles from './Sidebar.module.css'

const Sidebar = () => {
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
                <Button variant="outline-warning" className={styles.search_button}>
                    <Icon.Search />
                </Button>
            </Form>
            <Nav className="flex-column mb-auto">
                <Nav.Link href='/tournaments' className={styles.nav_link}>
                    <Icon.TrophyFill className={styles.icon} /> {/* Add the TrophyFill icon here */}
                    Tournaments
                </Nav.Link>
                <Nav.Link href='/matches' className={styles.nav_link}>
                    <Icon.Calendar className={styles.icon} /> {/* Add the TrophyFill icon here */}
                    Matches
                </Nav.Link>
            </Nav>
            <div className={styles.sidebar_footer}>
                <Button variant="primary">Log in</Button>
            </div>
        </div>
    )
}

export default Sidebar
