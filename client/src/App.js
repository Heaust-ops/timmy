import './App.css';
import React, {useState} from 'react';
import Landing from './components/Landing';
import Organiser from './components/Organiser';
import {
  organiserCodeContext,
  partyCodeContext,
  memberCodeContext,
  pageContext,
  memberArrayContext
} from "./components/Contexts";
import Member from './components/Member';


function App() {

  const [organiserCode, setorganiserCode] = useState(false);
  const [partyCode, setpartyCode] = useState(false);
  const [memberCode, setmemberCode] = useState(false);
  const [memberArray, setmemberArray] = useState(false);
  const [page, setpage] = useState('home');

  return (
    <organiserCodeContext.Provider value={{organiserCode, setorganiserCode}}>
    <partyCodeContext.Provider value={{partyCode, setpartyCode}}>
    <memberCodeContext.Provider value={{memberCode, setmemberCode}}>
    <pageContext.Provider value={{page, setpage}}>
    <memberArrayContext.Provider value={{memberArray, setmemberArray}}>

    <div style={{backgroundColor: "#0c0b0c", color: "#d8d8d8", height: "100vh", fontSize: "24px"}} className="App">
  

    {(() => {
                    switch (page) {
                        case 'organiser':
                            return <Organiser/>;
                        case 'member':
                              return <Member/>;
                        default:
                            return <Landing/>;
                    }
                })()}
    
    
    </div>
    </memberArrayContext.Provider>
    </pageContext.Provider>
    </memberCodeContext.Provider>
    </partyCodeContext.Provider>
    </organiserCodeContext.Provider>
  );
}

export default App;
