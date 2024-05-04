import React from 'react'
import './App.css'
import Sidebar from './components/Sidebar/Sidebar'
import TournamentList from './components/Tournament/TournamentList'
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import MatchList from './components/Match/MatchList'
import Tabs from './components/Tournament/Tabs'
import MatchDetail from './components/Match/MatchDetail'

function App() {

  return (
    <Router>
      <div className="App">
        <Sidebar />
        <div className='Content'>
          <Routes>
            <Route path="/tournaments" element={<TournamentList />} />
            <Route path="/myTournaments" element={<TournamentList />} />
            <Route path="/tournaments" element={<Tabs />}>
              <Route path="overview" />
              <Route path="table" />
              <Route path="play-off" />
              <Route path="stats" />
              <Route path="teams" />
            </Route>
            <Route path="/matches" element={<MatchList />} />
            <Route path="/matches/match-detail" element={<MatchDetail />} />
          </Routes>
        </div>
      </div>
    </Router>

  )
}

export default App
