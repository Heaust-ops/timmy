import axios from "axios";
import {useState ,useContext} from "react";
import {
  organiserCodeContext,
  partyCodeContext,
  memberCodeContext,
  pageContext,
  memberArrayContext
} from "./Contexts";

function Landing() {

  const [clicked, setclicked] = useState(false);
  const [loading, setloading] = useState(false);
  const [codeInput, setcodeInput] = useState('');
  const [warning, setwarning] = useState('');
  const {organiserCode, setorganiserCode} = useContext(organiserCodeContext);
  const {partyCode, setpartyCode} = useContext(partyCodeContext);
  const {memberCode, setmemberCode} = useContext(memberCodeContext);
  const {page, setpage} = useContext(pageContext);
  const {memberArray, setmemberArray} = useContext(memberArrayContext);

  const generateCodes = () => {
    setloading(true);
    setclicked(true);
    axios.post(`http://localhost:5000/organiser`, {})
      .then(res => {
        setorganiserCode(res.data.organiser);
        setpartyCode(res.data.party);
        setloading(false);
        setpage('organiser');
      })
  }

  const getOrganiser = () => {
    setloading(true);
    setclicked(true);
    axios.get('http://localhost:5000/organiser/get/'+codeInput)
    .then(res => {
      setorganiserCode(res.data.organiser[0].organiser);
      setpartyCode(res.data.organiser[0].party);
      setmemberArray(res.data.members);
      setloading(false);
      setpage('organiser');
    })

  }

  const makeMember = () => {
    setloading(true);
    setclicked(true);
    axios.post('http://localhost:5000/member/'+codeInput, {})
      .then(res => {
        setmemberCode(res.data.member);
        setmemberArray(res.data);
        setloading(false);
        setpage('member');
      })
  }

  const getMember = () => {
    setloading(true);
    setclicked(true);
    axios.get('http://localhost:5000/member/get/'+codeInput)
    .then(res => {
      setmemberCode(res.data.member);
      setmemberArray(res.data);
      setloading(false);
      setpage('member');
    })
  }

  return (
<div style={{margin: "auto"}} className="Landing">
      
      <h1>Enter the meeting code</h1>
      <input value={codeInput} onChange={(event) => {setcodeInput(event.target.value)}} style={{fontSize: "2em", textAlign: "center", borderRadius: "30%"}} maxLength="12" size="8" placeholder="type here"></input>
      <button onClick={
        () => {
          if (codeInput.length === 12 && codeInput.startsWith('o')) {
            getOrganiser();
          }
          else if (codeInput.length === 12 && codeInput.startsWith('p')) {
            makeMember();
          }
          else if (codeInput.length === 12 && codeInput.startsWith('m')) {
            getMember();
          } else {
            setwarning('Please input a valid code');
          }

        }
      } style={{borderRadius: "30%"}}>Go</button>
      <br/>
    <h1>{warning}</h1>
      <h1>OR</h1>
      <br/>
     
      <button onClick={generateCodes} style={{fontSize: "2em", borderRadius: "20%", display: `${clicked ? 'none' : 'inline'}` }}>Make a new one</button>
    
      <img style={{ borderRadius: "9999999px", display: `${loading ? 'inline' : 'none'}` }} alt="loading" width="10%" src="https://assets.materialup.com/uploads/7763a28e-13d7-4dbc-9347-f6e6e8fadae6/attachment.gif"/>
        
    </div>
  );
}

export default Landing;
