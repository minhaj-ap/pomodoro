import { useState } from "react";
export function useStates() {
  const [minute, setMinute] = useState(0);
  const [second, setSecond] = useState(0);
  const [time, setTime] = useState({ minutes: 0, seconds: 0 });
  const [Break, setBreak] = useState(false);
  const [BreakFreq, setBreakFreq] = useState(0);
  const [longBreak, setLongBreak] = useState(false);
  const [run, setRun] = useState(false);
  const [status, setStatus] = useState("TIMER NOT STARTED");
  const [breakNeed, setBreakNeed] = useState(true);
  const [longBreakNeed, setLongBreakNeed] = useState(true);
  const [sessions, setSessions] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);

  return {
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
  };
}
