import { useState, useEffect } from "react";
import {
  AppBar,
  Typography,
  Toolbar,
  TextField,
  FormControl,
  Stack,
  Button,
  Grid,
  Alert,
  Popover,
} from "@mui/material";
export default function Countdown() {
  const [minute, setMinute] = useState();
  const [second, setSecond] = useState();
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
            setStatus("BREAK OF 1 MINS RUNNING");
          } else if (longBreak) {
            setStatus("BREAK OF 3 MINS ONGOING");
          } else {
            setStatus("TIMER RUNNING");
          }
          if (prevTime.minutes === 0 && prevTime.seconds === 0) {
            clearInterval(timer);
            if (!Break && longBreakNeed && BreakFreq >= 4) {
              setLongBreak(true);
            }
            console.log(breakNeed);
            if (breakNeed) {
              setBreak(true);
            }
            setStatus("TIMER NOT STARTED");
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
      setStatus("BREAK OF 1 MINS RUNNING");
      setTime({ minutes: 1, seconds: 0 });
      setRun(true);
      setBreakFreq((freq) => freq + 1);
    }
  }, [Break, longBreakNeed]);
  useEffect(() => {
    if (longBreak) {
      setBreak(false);
      console.log("Long break started");
      setStatus("BREAK OF 3 MINS ONGOING");
      setTime({ minutes: 3, seconds: 0 });
      setBreakNeed(false);
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
    console.log("break need triggered");
    setBreakNeed((prevStatus) => !prevStatus);
  };
  const handleLongBreakNeed = () => {
    setBreakFreq((freq) => freq + 1);
    setLongBreakNeed(false);
    setBreakNeed(false);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <Grid container direction="column" alignItems="center">
      <AppBar position="static" color="primary">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1, textAlign: "center" }}>
            POMODORO TIMER
          </Typography>
        </Toolbar>
      </AppBar>
      <Typography variant="h4">Timer:</Typography>
      <Typography variant="h2">{time.minutes + ":" + time.seconds}</Typography>
      <form>
        <FormControl>
          <Grid
            container
            spacing={2}
            direction="column"
            justifyContent="center"
          >
            <Grid item>
              <TextField
                id=""
                label="Enter minutes"
                value={minute}
                onChange={handleMinute}
              />
            </Grid>
            <Grid item>
              <TextField
                id=""
                label="Enter seconds"
                value={second}
                onChange={handleSecond}
              />
            </Grid>
          </Grid>
        </FormControl>
      </form>
      <Stack
        direction="row"
        spacing={2}
        sx={{ margin: "12px" }}
        justifyContent="center"
      >
        <Button variant="contained" onClick={handleStart}>
          {run ? "Restart" : "Start"}
        </Button>
        <Button variant="contained" onClick={run ? handlePause : handleResume}>
          {run ? "Pause" : "Resume"}
        </Button>
        <Button variant="contained" disabled={!run} onClick={handleReset}>
          Reset
        </Button>
      </Stack>
      <Stack
        direction="column"
        spacing={2}
        sx={{ marginX: "40px" }}
        justifyContent="center"
      >
        <Button variant="outlined" onClick={handleBreak}>
          Break
        </Button>
        <Button
          variant="outlined"
          disabled={sessions <= 0}
          onClick={handleLongBreak}
        >
          Long Break
        </Button>
      </Stack>
      {status === "TIMER RUNNING" &&
        time.seconds < 5 &&
        breakNeed &&
        BreakFreq < 4 && (
          <Alert
            severity="warning"
            action={
              <Button onClick={handleBreakNeed} color="inherit" size="small">
                Cancel
              </Button>
            }
          >
            Proceeding to short break in {time.seconds}
          </Alert>
        )}
      {status === "TIMER RUNNING" && longBreakNeed && BreakFreq >= 4 && (
        <Alert
          severity="warning"
          action={
            <Button onClick={handleLongBreakNeed} color="inherit" size="small">
              CANCEL
            </Button>
          }
        >
          Proceeding to long break in {time.seconds}
        </Alert>
      )}
      <br />
      <Typography variant="caption" color="initial">
        Status: {status}
      </Typography>
      <Typography variant="subtitle1" color="initial">
        Total breaks:{BreakFreq}
      </Typography>
      Total sessions:{sessions}
      <br />
      <Button
        variant="contained"
        onClick={handleClick}
        sx={{ marginTop: "10px" }}
      >
        KNOW HOW THIS WORKS.
      </Button>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <Typography sx={{ p: 2 }}>
          Each timer will be for 5 mins and it is followed by a 1 min short
          break, by achieving 4 short breaks ,after the next timer will be a
          long break for 3 mins.This is considered as one session.
        </Typography>
      </Popover>
    </Grid>
  );
}
