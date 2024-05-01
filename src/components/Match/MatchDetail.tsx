import React from "react";
import MatchDetailHeader from "./MatchDetailHeader";
import MatchDetailCards from "./MatchDetailCards";
const MatchDetail: React.FC = () => {
  
  return (
        <div style={{width:'100%', display: 'flex',flexDirection: 'column'}}>
            <MatchDetailHeader/>
            <MatchDetailCards/>
        </div>
    )

};

export default MatchDetail;
