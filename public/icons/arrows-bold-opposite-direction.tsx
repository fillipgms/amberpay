import * as React from "react";

type IconProps = React.SVGProps<SVGSVGElement> & {
    size?: number | string;
};

const ArrowsBoldOpositeDirection: React.FC<IconProps> = ({
    size = 20,
    ...props
}) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="29"
        height="29"
        fill="none"
        viewBox="0 0 29 29"
        {...props}
    >
        <g
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            clipPath="url(#clip0_109_38)"
        >
            <path
                stroke="currentColor"
                strokeOpacity="0.5"
                d="M17.324 8.132a.5.5 0 0 0 0-.707l-.707-.707a.5.5 0 0 0-.707 0l-6.01 6.01-2.122-2.121-.707 6.364 2.74-.266"
            ></path>
            <path
                fill="currentColor"
                strokeOpacity="0.5"
                stroke="currentColor"
                d="M20.506 17.678 14.85 12.02l6.364-.707z"
            ></path>
            <path
                fill="currentColor"
                stroke="currentColor"
                d="m10.96 20.153 7.425-7.425 1.414 1.414-7.424 7.425a.5.5 0 0 1-.708 0l-.707-.707a.5.5 0 0 1 0-.707"
            ></path>
        </g>
        <defs>
            <clipPath id="clip0_109_38">
                <path
                    fill="currentColor"
                    d="M0 14.142 14.142 0l14.142 14.142-14.142 14.142z"
                ></path>
            </clipPath>
        </defs>
    </svg>
);

export default ArrowsBoldOpositeDirection;
