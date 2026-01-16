import * as React from "react";

type IconProps = React.SVGProps<SVGSVGElement> & {
    secondaryOpacity?: number;
    wheight?: string;
};

const ArrowTrendDown: React.FC<IconProps> = ({
    secondaryOpacity = 0.8,
    wheight,
    ...props
}) => (
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
            d="M17 14 9.707 6.707a1 1 0 0 0-1.414 0L5.707 9.293a1 1 0 0 1-1.414 0L2 7"
        ></path>
        <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M17 7v7h-7"
        ></path>
    </svg>
);

export default ArrowTrendDown;
