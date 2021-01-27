import {useContext, useState, useEffect} from 'react';
import {
  memberCodeContext,
  memberArrayContext
} from "./Contexts";
import axios from 'axios';
import {arrtominutes, minsToTime} from './utils';

function Member(props) {

  const {memberCode, setmemberCode} = useContext(memberCodeContext);
  const {memberArray, setmemberArray} = useContext(memberArrayContext);
  const [hoursInit, sethoursInit] = useState(0);
  const [minutesInit, setminutesInit] = useState(0);
  const [hoursFinal, sethoursFinal] = useState(0);
  const [minutesFinal, setminutesFinal] = useState(0);
  const [humanTimes, sethumanTimes] = useState(new Array(24*12).fill(0));

  const memberRefresh = () => {
    axios.get('http://localhost:5000/member/get/'+memberCode)
    .then(res => {
      setmemberCode(res.data.member);
      setmemberArray(res.data);
      const newHuman = arrtominutes(memberArray.timeArray).map(item => {return [minsToTime(- -item[0]), minsToTime(- -item[1])]});
      sethumanTimes(newHuman);
    })
  }

  useEffect(memberRefresh, []);

  const addTime = () => {
    var newTimeArray = memberArray.timeArray;

    if (60*hoursInit+minutesInit > 60*hoursFinal+minutesFinal) {
      const tmp1 = hoursFinal;
      const tmp2 = minutesFinal;
      sethoursFinal(hoursInit);
      setminutesFinal(minutesInit);
      sethoursInit(tmp1);
      setminutesInit(tmp2);
    }

    const inMinutesInitBy5 = Math.floor((60*hoursInit+minutesInit)/5);
    const inMinutesFinalBy5 = Math.floor((60*hoursFinal+minutesFinal)/5);
    for (let i=inMinutesInitBy5; i<inMinutesFinalBy5; i++) {
      if (!newTimeArray[i]) {newTimeArray[i] = 1; }
    }

    const TimeArray = newTimeArray;

    axios.patch('http://localhost:5000/member/time/'+memberCode, {timeArray: TimeArray})
    .then(res => {
      memberRefresh();
    })
    .catch(err => console.log(err));
  }

  const resetTime = () => {
    const blankTimeArray = new Array(24*60/5).fill(0);


    axios.patch('http://localhost:5000/member/time/'+memberCode, {timeArray: blankTimeArray})
    .then(res => {
      memberRefresh();
    })
    .catch(err => console.log(err));
  }

 

  return (
    <div className="Member">
            <h1 style={{display: `${memberCode ? 'inline' : 'none'}`}} >Member Code: {memberCode}</h1><br/>
            <h1 style={{display: `${memberArray ? 'inline' : 'none'}`}} >Member Name: {memberArray.name}</h1><br/>
            <br/>
            <br/>
            <div style={{display: "flex", justifyContent: "space-around"}}>
            <div>
            <h1>From</h1>
            <h1>Hours: <input value={hoursInit} onChange={(event) => {sethoursInit(Math.abs(event.target.value%24));}} style={{fontSize: "2rem", textAlign: "center", borderRadius: "30%"}} type="number" max={23} min={0} maxLength={2} size={2} step={1} /></h1> 
            <h1>Minutes: <input value={minutesInit} onChange={(event) => {setminutesInit(Math.abs(event.target.value%60));}} style={{fontSize: "2rem", textAlign: "center", borderRadius: "30%"}} type="number" max={55} min={0} maxLength={2} size={2} step={5} /> </h1> 
            </div>
            <div><br/>
            <button style={{width: "100%"}} onClick={resetTime}>Reset</button><br/>
            <button style={{width: "100%"}} onClick={addTime}>Add</button>
            <button style={{width: "100%"}} onClick={memberRefresh}>Refresh</button>
            </div>
            <div>
            <h1>To</h1>
            <h1>Hours: <input value={hoursFinal} onChange={(event) => {sethoursFinal(Math.abs(event.target.value%24));}} style={{fontSize: "2rem", textAlign: "center", borderRadius: "30%"}} type="number" max={23} min={0} maxLength={2} size={2} step={1} /></h1> 
            <h1>Minutes: <input value={minutesFinal} onChange={(event) => {setminutesFinal(Math.abs(event.target.value%60));}} style={{fontSize: "2rem", textAlign: "center", borderRadius: "30%"}} type="number" max={55} min={0} maxLength={2} size={2} step={5} /> </h1> 
            </div>
            </div>
            <br/>
  {humanTimes.map(item => <><h2>{item[0]} To {item[1]}</h2><br/></>)}

    </div>
  );
}

export default Member;
