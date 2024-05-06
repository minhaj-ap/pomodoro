import { AppBar, Typography, Toolbar, Grid } from "@mui/material";
import InputForm from "../sub-component/form";
import ButtonUi from "../sub-component/ButtonUi";
import StatusAndPopover from "../sub-component/StatusAndPopover";

export default function TimerUi(props) {
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
      <Typography variant="h2">
        {props.time.minutes + ":" + props.time.seconds}
      </Typography>
      <InputForm
        minute={props.times.minutevalue}
        handleminute={props.times.handleMinute}
        second={props.times.secondvalue}
        handlesecond={props.times.handleSecond}
      />
      <ButtonUi
        run={props.run}
        handlestart={props.handlestart}
        handlepause={props.handlepause}
        handleresume={props.handleresume}
        handlereset={props.handlereset}
      />
      <StatusAndPopover
        status={props.status}
        time={props.time}
        breakNeed={props.breakneed}
        BreakFreq={props.breakfreq}
        handleBreakNeed={props.handlebreakneed}
        longBreakNeed={props.longbreakneed}
        handleLongBreakNeed={props.handlelongbreakneed}
        sessions={props.sessions}
        handleClick={props.handleclick}
        open={props.open}
        anchorEl={props.anchorEl}
        handleClose={props.handleclose}
      />
    </Grid>
  );
}
