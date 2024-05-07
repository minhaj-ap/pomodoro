import { useEffect } from "react";
import StatusChooser from "./sub-functions/status_chooser";
import Timer from "./sub-functions/timer";
import TimerUi from "./ui/TimerUi";
import { useStates } from "./handlers/StateHandlers";
export default function Countdown() {
  const {
    minute,
    setMinute,
    second,
    setSecond,
    time,
    setTime,
    Break,
    setBreak,
    BreakFreq,
    setBreakFreq,
    longBreak,
    setLongBreak,
    run,
    setRun,
    status,
    setStatus,
    breakNeed,
    setBreakNeed,
    longBreakNeed,
    setLongBreakNeed,
    sessions,
    setSessions,
    anchorEl,
    setAnchorEl,
  } = useStates();
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
          setStatus(StatusChooser({ Break, longBreak }));
          if (prevTime.minutes === 0 && prevTime.seconds === 0) {
            clearInterval(timer);
            if (!Break && longBreakNeed && BreakFreq >= 4) {
              setLongBreak(true);
            }
            if (breakNeed) {
              setBreak(true);
            }
            setStatus("TIMER NOT STARTED");
            setRun(false);
            return prevTime;
          }
          return Timer(prevTime);
        });
      }, 1000);
    } else {
      clearInterval(timer);
    }
    return () => clearInterval(timer);
  }, [
    run,
    Break,
    breakNeed,
    longBreak,
    longBreakNeed,
    BreakFreq,
    setBreakFreq,
    setSessions,
    setTime,
    setStatus,
    setRun,
    setLongBreak,
    setBreak,
  ]);
  useEffect(() => {
    if (!Break) {
      return;
    }
    if (Break) {
      setStatus("BREAK OF 1 MINS RUNNING");
      setTime({ minutes: 0, seconds: 5 });
      setRun(true);
      setBreakFreq((freq) => freq + 1);
    }
  }, [Break, longBreakNeed, setBreakFreq, setRun, setStatus, setTime]);
  useEffect(() => {
    if (longBreak) {
      setBreak(false);
      console.log("Long break started");
      setStatus("BREAK OF 3 MINS ONGOING");
      setTime({ minutes: 0, seconds: 10 });
      setBreakNeed(false);
      setRun(true);
    }
  }, [longBreak, setBreak, setBreakNeed, setRun, setStatus, setTime]);
  const handleMinute = (data) => {
    setMinute(data);
  };
  const handleSecond = (data) => {
    console.log(data);
    setSecond(data);
  };
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleStart = (second, minute) => {
    console.log(second);
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
    console.log("triggered");
    setRun(false);
  };
  const handleResume = () => {
    setRun(true);
  };
  const handleReset = () => {
    setMinute(0);
    setSecond(0);
    setSessions(0);
    setStatus("NOT STARTED");
    setTime({ minutes: 0, seconds: 0 });
    setRun(false);
  };
  const handleBreak = () => {
    setRun(true);
    setBreak(true);
  };
  const handleLongBreak = () => {
    setLongBreak(true);
  };
  const handleBreakNeed = () => {
    setBreakNeed((prevStatus) => !prevStatus);
  };
  const handleLongBreakNeed = () => {
    setBreakFreq((freq) => freq + 1);
    setLongBreakNeed(false);
    setBreakNeed(false);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <TimerUi
      time={time}
      times={{
        handleMinute,
        minutevalue: minute,
        handleSecond,
        secondvalue: second,
      }}
      run={run}
      handlestart={() => handleStart(second, minute)}
      handlepause={handlePause}
      handleresume={handleResume}
      handlereset={handleReset}
      status={status}
      handlebreak={handleBreak}
      handlelongbreak={handleLongBreak}
      breakfreq={BreakFreq}
      breakneed={breakNeed}
      longbreakneed={longBreakNeed}
      handlebreakneed={handleBreakNeed}
      handlelongbreakneed={handleLongBreakNeed}
      sessions={sessions}
      handleclick={handleClick}
      handleclose={handleClose}
      anchorEl={anchorEl}
      open={open}
    />
  );
}
