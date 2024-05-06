import { Alert, Button, Typography, Popover } from "@mui/material";
export default function StatusAndPopover(props) {
  return (
    <div>
      {props.status === "TIMER RUNNING" &&
        props.time.seconds < 5 &&
        props.breakNeed &&
        props.BreakFreq < 4 && (
          <Alert
            severity="warning"
            action={
              <Button
                onClick={props.handleBreakNeed}
                color="inherit"
                size="small"
              >
                Cancel
              </Button>
            }
          >
            Proceeding to short break in {props.time.seconds}
          </Alert>
        )}
      {props.status === "TIMER RUNNING" &&
        props.longBreakNeed &&
        props.BreakFreq >= 4 && (
          <Alert
            severity="warning"
            action={
              <Button
                onClick={props.handleLongBreakNeed}
                color="inherit"
                size="small"
              >
                CANCEL
              </Button>
            }
          >
            Proceeding to long break in {props.time.seconds}
          </Alert>
        )}
      <br />
      <Typography variant="caption" color="initial">
        Status: {props.status}
      </Typography>
      <Typography variant="subtitle1" color="initial">
        Total breaks:{props.BreakFreq}
      </Typography>
      Total sessions:{props.sessions}
      <br />
      <Button
        variant="contained"
        onClick={props.handleClick}
        sx={{ marginTop: "10px" }}
      >
        KNOW HOW THIS WORKS.
      </Button>
      <Popover
        open={props.open}
        anchorEl={props.anchorEl}
        onClose={props.handleClose}
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
    </div>
  );
}
