import { Stack, Button } from "@mui/material";
export default function ButtonUi(props) {
  return (
    <Stack
      direction="row"
      spacing={2}
      sx={{ margin: "12px" }}
      justifyContent="center"
    >
      <Button variant="contained" onClick={props.handlestart}>
        {props.run ? "Restart" : "Start"}
      </Button>
      <Button
        variant="contained"
        onClick={props.run ? props.handlepause : props.handleresume}
      >
        {props.run ? "Pause" : "Resume"}
      </Button>
      <Button
        variant="contained"
        disabled={!props.run}
        onClick={props.handlereset}
      >
        Reset
      </Button>
    </Stack>
  );
}
