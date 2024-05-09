import React from "react";
import "./App.css";
import Sidebar from "./components/Sidebar/Sidebar";
import TournamentList from "./components/Tournament/TournamentList";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import MatchList from "./components/Match/MatchList";
import Tabs from "./components/Tournament/Tabs";
import MatchDetail from "./components/Match/MatchDetail";
import TeamsList from "./components/Team/TeamsList";
import TeamDetail from "./components/Team/TeamDetail";
import { useState } from "react";
export const SERVER_URL = "http://localhost:3000/";
function App() {
  const [rerender,setRerender]= useState<boolean>(false)
  return (
    <Router>
      <div className="App">
        <Sidebar setRerender={setRerender} rerender={rerender}/>
        <div className="Content">
          <Routes>
            <Route path="/" element={<Navigate replace to="/tournaments" />} />
            <Route path="/tournaments" element={<TournamentList setRerender={setRerender} rerender={rerender}/>} />
            <Route path="/myTournaments" element={<TournamentList setRerender={setRerender} rerender={rerender} />} />
            <Route path="/myTeams" element={<TeamsList setRerender={setRerender} rerender={rerender} />} />
            <Route path="/teams/:id" element={<TeamDetail />} />

            <Route path="/tournaments" element={<Tabs />}>
              <Route path="overview/:tournamentId" />
              <Route path="table/:tournamentId" />
              <Route path="play-offs/:tournamentId" />
              <Route path="stats/:tournamentId" />
              <Route path="teams/:tournamentId" />
              <Route path="play-off-brackets/:tournamentId" />
            </Route>
            <Route path="/matches" element={<MatchList />} />
            <Route path="/matches/match-detail/:id" element={<MatchDetail />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
