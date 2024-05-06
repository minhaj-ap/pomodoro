function StatusChooser({ Break, longBreak }) {
  if (Break) {
    return "BREAK OF 1 MINS RUNNING";
  } else if (longBreak) {
    return "BREAK OF 3 MINS ONGOING";
  } else {
    return "TIMER RUNNING";
  }
}
export default StatusChooser;
