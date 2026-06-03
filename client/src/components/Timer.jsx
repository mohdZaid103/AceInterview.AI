import React from 'react'
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

function Timer({ timeLeft, totalTime }) {
  const percentage = (timeLeft / totalTime) * 100;

  return (
    <div className="relative w-28 h-28">
      <CircularProgressbar
        value={percentage}
        text={`${timeLeft}s`}
        styles={buildStyles({
          textSize: "16px",
          pathColor:
            timeLeft > totalTime * 0.5
              ? "#3b82f6"
              : timeLeft > totalTime * 0.25
              ? "#8b5cf6"
              : "#ef4444",
          textColor: "#ffffff",
          trailColor: "#334155",
          strokeLinecap: "round",
        })}
      />

      <div className="absolute -inset-2 rounded-full bg-gradient-to-r from-blue-500/10 via-violet-500/10 to-cyan-500/10 blur-xl -z-10" />
    </div>
  );
}

export default Timer;