import React from 'react';

const SVGAnalyticsSparkline = () => {
  return (
    <svg
      width="500"
      height="200"
      viewBox="0 0 500 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="neonGradient" x1="0" y1="0" x2="500" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#00F2FF" />
          <stop offset="100%" stopColor="#A300FF" />
        </linearGradient>
      </defs>
      <path
        d="M0 150 Q 50 100, 100 120 T 200 130 T 300 140 T 400 100 T 500 110"
        stroke="url(#neonGradient)"
        strokeWidth="4"
        fill="transparent"
      />
    </svg>
  );
};

export default SVGAnalyticsSparkline;