import * as React from "react";

type IconProps = React.SVGProps<SVGSVGElement> & {
    size?: number | string;
};

const ArrowsOppositeDirection: React.FC<IconProps> = ({
    size = 20,
    ...props
}) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        fill="none"
        viewBox="0 0 20 20"
        {...props}
    >
        <path
            stroke="currentColor"
            strokeOpacity="0.5"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 16.5a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5V8h3l-4-5-1.75 2.125"
        ></path>
        <path
            fill="currentColor"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M3 12h8l-4 5z"
        ></path>
        <path
            fill="currentColor"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M8 3.5V14H6V3.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5"
        ></path>
    </svg>
);

export default ArrowsOppositeDirection;
