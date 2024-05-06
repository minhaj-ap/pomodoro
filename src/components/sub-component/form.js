import { FormControl, Grid, TextField } from "@mui/material";
export default function InputForm(props) {
  const handleMinute = (e) => {
    const minute = e.target.value;
    props.handleminute(minute);
  };
  const handleSecond = (e) => {
    const second = e.target.value;
    props.handlesecond(second);
  };
  return (
    <form>
      <FormControl>
        <Grid container spacing={2} direction="column" justifyContent="center">
          <Grid item>
            <TextField
              id=""
              value={props.minute}
              label="Enter minutes"
              onChange={handleMinute}
            />
          </Grid>
          <Grid item>
            <TextField
              id=""
              value={props.second}
              label="Enter seconds"
              onChange={handleSecond}
            />
          </Grid>
        </Grid>
      </FormControl>
    </form>
  );
}
