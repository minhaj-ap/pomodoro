function Timer(prevTime) {
  if (prevTime.minutes === 0 && prevTime.seconds === 0) {
    // clearInterval(timer);
    return false;
  } else if (prevTime.seconds === 0) {
    return { minutes: prevTime.minutes - 1, seconds: 59 };
  } else {
    return { minutes: prevTime.minutes, seconds: prevTime.seconds - 1 };
  }
}
export default Timer;
