export function format_ms_time(milliseconds: number, show_hour = true) {
  const seconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  const formattedHours = hours.toString().padStart(2, "0");
  const formattedMinutes = remainingMinutes.toString().padStart(2, "0");
  const formattedSeconds = remainingSeconds.toString().padStart(2, "0");

  if (show_hour) {
    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
  } else {

    return `${formattedMinutes}:${formattedSeconds}`;
  }
}

