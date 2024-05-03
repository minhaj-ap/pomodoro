import { useState, useEffect } from "react";
export default function Countdown() {
  const [minute, setMinute] = useState();
  const [second, setSecond] = useState();
  const [time, setTime] = useState({ minutes: 0, seconds: 0 });
  const [run, setRun] = useState(false);

  useEffect(() => {
    console.log("Running " + run);
    if (!run) return;
    let timer;
    if (run) {
      timer = setInterval(() => {
        setTime((prevTime) => {
          if (prevTime.minutes === 0 && prevTime.seconds === 0) {
            clearInterval(timer);
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
  }, [run]);
  const handleMinute = (event) => {
    setMinute(event.target.value);
  };
  const handleSecond = (event) => {
    setSecond(event.target.value);
  };
  const handleStart = () => {
    const minutes = minute ? parseInt(minute) : 0;
    const seconds = second ? parseInt(second) : 0;
    setTime({ minutes, seconds });
    setRun(true);
  };
  const handlePause = () => {
    setRun(false);
    console.log("pause");
  };
  const handleReset = () => {
    setRun(false);
    const minutes = minute ? parseInt(minute) : 0;
    const seconds = second ? parseInt(second) : 0;
    setTime({ minutes, seconds });
  };

  return (
    <main>
      <input value={minute} onChange={handleMinute} />
      <input value={second} onChange={handleSecond} />
      <button onClick={handleStart}>Start</button>
      <button onClick={handlePause}>Pause</button>
      <button onClick={handleReset}>Reset</button>
      <p>{time.minutes + ":" + time.seconds}</p>
    </main>
  );
}
