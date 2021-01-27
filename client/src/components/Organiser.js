import { useContext, useState, useEffect } from 'react';
import {
  organiserCodeContext,
  partyCodeContext,
  memberArrayContext
} from "./Contexts";
import axios from 'axios';
import { arrtominutes, minsToTime } from './utils';

function Organiser(props) {

  const { organiserCode, setorganiserCode } = useContext(organiserCodeContext);
  const { partyCode, setpartyCode } = useContext(partyCodeContext);
  const { memberArray, setmemberArray } = useContext(memberArrayContext);
  const [humanTimes, sethumanTimes] = useState(new Array(24 * 12).fill(0));

  const calculateTime = () => {
    var ArrSum = new Array(24 * 12).fill(0);
    axios.get('http://localhost:5000/organiser/get/' + organiserCode)
      .then(res => {
        for (let i = 0; i < res.data.members.length; i++) {
          for (let j = 0; j < res.data.members[i]["timeArray"].length; j++) {
            ArrSum[j] += res.data.members[i]["timeArray"][j]
          }
        }
        const maxFactor = Math.max(...ArrSum);
        if (maxFactor < 1) { sethumanTimes([["00:00", "24:00"]]); }
        else {
          const resultArray = ArrSum.map(item => { return Math.floor(item / maxFactor) });

          const newHuman = arrtominutes(resultArray).map(item => { return [minsToTime(- -item[0]), minsToTime(- -item[1])] });
          sethumanTimes(newHuman);
        }

      })
      .catch(err => console.log(err));
  }

  useEffect(calculateTime, []);

  return (
    <div className="Organiser" >
      <h1 style={{ display: `${organiserCode ? 'inline' : 'none'}` }} >Organiser Code: {organiserCode}</h1><br />
      <h1 style={{ display: `${partyCode ? 'inline' : 'none'}` }} >Party Code: {partyCode}</h1><br />
      {humanTimes.map(item => <><h2 >{item[0]} To {item[1]}</h2><br /></>)}
    </div>
  );
}

export default Organiser;
