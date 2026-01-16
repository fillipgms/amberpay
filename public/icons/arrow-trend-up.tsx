import * as React from "react";

const ArrowTrendUp: React.FC<React.SVGProps<SVGElement>> = (props) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        fill="none"
        viewBox="0 0 20 20"
    >
        <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeOpacity="0.5"
            strokeWidth="2"
            d="m17 6-7.293 7.293a1 1 0 0 1-1.414 0l-2.586-2.586a1 1 0 0 0-1.414 0L2 13"
        ></path>
        <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M17 13V6h-7"
        ></path>
    </svg>
);

export default ArrowTrendUp;
