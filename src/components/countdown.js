import { useState, useEffect } from "react";
export default function Countdown() {
  const [minute, setMinute] = useState();
  const [second, setSecond] = useState();
  const [time, setTime] = useState({ minutes: 0, seconds: 0 });
  const [Break, setBreak] = useState(false);
  const [BreakFreq, setBreakFreq] = useState(0);
  const [longBreak, setLongBreak] = useState(false);
  const [run, setRun] = useState(false);
  const [status, setStatus] = useState("");
  const [breakNeed, setBreakNeed] = useState(true);
  const [longBreakNeed, setLongBreakNeed] = useState(true);
  const [sessions, setSessions] = useState(0);
  useEffect(() => {
    if (BreakFreq % 5 === 0 && BreakFreq !== 0) {
      setBreakFreq(0);
      setSessions((sessions) => sessions + 1);
    }
    if (!run) return;
    let timer;
    if (run) {
      timer = setInterval(() => {
        setTime((prevTime) => {
          if (Break) {
            setStatus("BREAK OF 5 MINS RUNNING");
          } else if (longBreak) {
            setStatus("Long break started");
          } else {
            setStatus("TIMER RUNNING");
          }
          if (prevTime.minutes === 0 && prevTime.seconds === 0) {
            clearInterval(timer);
            if (!Break && longBreakNeed && BreakFreq >= 4) {
              setLongBreak(true);
            }
            if (breakNeed) {
              setBreak(true);
            }
            setStatus("");
            setRun(false);
            return prevTime;
          } else if (prevTime.seconds === 0) {
            return { minutes: prevTime.minutes - 1, seconds: 59 };
          } else {
            return { minutes: prevTime.minutes, seconds: prevTime.seconds - 1 };
          }
        });
      }, 1000);
    } else {
      clearInterval(timer);
    }
    return () => clearInterval(timer);
  }, [run, Break, breakNeed, longBreak, longBreakNeed, BreakFreq]);
  useEffect(() => {
    if (!Break) {
      return;
    }
    if (Break) {
      setStatus("BREAK OF 5 MINS RUNNING");
      setTime({ minutes: 0, seconds: 3 });
      setRun(true);
      setBreakFreq((freq) => freq + 1);
    }
  }, [Break, longBreakNeed]);
  useEffect(() => {
    if (longBreak) {
      setBreak(false);
      setBreakNeed(false);
      console.log("Long break started");
      setStatus("Long break started");
      setTime({ minutes: 0, seconds: 10 });
      setRun(true);
    }
  }, [longBreak]);
  const handleMinute = (event) => {
    setMinute(event.target.value);
  };
  const handleSecond = (event) => {
    setSecond(event.target.value);
  };
  const handleStart = () => {
    setLongBreak(false);
    setBreak(false);
    setLongBreakNeed(true);
    setBreakNeed(true);
    const minutes = minute ? parseInt(minute) : 0;
    const seconds = second ? parseInt(second) : 0;
    if (!minutes && !seconds) {
      alert("Please enter a valid minute");
      return;
    }
    setTime({ minutes, seconds });
    setRun(true);
  };
  const handlePause = () => {
    setRun(false);
  };
  const handleResume = () => {
    setRun(true);
  };
  const handleReset = () => {
    setTime({ minutes: 0, seconds: 0 });
    setRun(false);
  };
  const handleBreak = () => {
    setRun(true);
    setBreak(true);
  };
  const handleBreakNeed = () => {
    console.log("break need triggered");
    setBreakNeed((prevStatus) => !prevStatus);
  };
  const handleLongBreak = () => {
    setLongBreakNeed(false);
  };
  return (
    <main>
      <input value={minute} onChange={handleMinute} />
      <input value={second} onChange={handleSecond} />
      <button onClick={handleStart}>{run ? "Restart" : "Start"}</button>
      {run ? (
        <button onClick={handlePause}>Pause</button>
      ) : (
        <button onClick={handleResume}>Resume</button>
      )}
      <button onClick={handleReset}>Reset</button>
      <button onClick={handleBreak}>Break</button>
      {time.seconds ? <p>{time.minutes + ":" + time.seconds}</p> : ""}
      {status === "TIMER RUNNING" &&
        time.seconds < 5 &&
        breakNeed &&
        BreakFreq < 4 && (
          <div>
            proceeding to short break in {time.seconds}
            <button onClick={handleBreakNeed}>Cancel</button>
          </div>
        )}
      {status === "TIMER RUNNING" && BreakFreq >= 4 && (
        <div>
          proceeding to long break in {time.seconds}
          <button onClick={handleLongBreak}>Cancel</button>
        </div>
      )}
      <br />
      {status && <p>status: {status}</p>}
      {BreakFreq > 0 && <p>total breaks:{BreakFreq}</p>}
      Total sessions:{sessions}
    </main>
  );
}
