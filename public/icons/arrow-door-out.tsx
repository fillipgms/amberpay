import * as React from "react";

type IconProps = React.SVGProps<SVGSVGElement> & {
    secondaryOpacity?: number;
};

const ArrowDoorOut: React.FC<IconProps> = ({
    secondaryOpacity = 0.8,
    ...props
}) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        {...props}
    >
        <path
            fill="currentColor"
            d="M3 14c0 1.195.703 2.217 1.714 2.7l2.993-2.993A1 1 0 0 0 8 13V7a1 1 0 0 0-.293-.707L4.714 3.3A2.99 2.99 0 0 0 3 6z"
        />

        <path
            d="M17 10h-6"
            stroke="currentColor"
            strokeOpacity={secondaryOpacity}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
        />

        <path
            d="M12.56 4.456A2.99 2.99 0 0 0 10 3H6a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h4a2.99 2.99 0 0 0 2.558-1.453"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
        />

        <path
            d="M14.25 12.5 17 10l-2.75-2.5"
            stroke="currentColor"
            strokeOpacity={secondaryOpacity}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
        />
    </svg>
);

export default ArrowDoorOut;
