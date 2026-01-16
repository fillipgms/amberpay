import * as React from "react";

type IconProps = React.SVGProps<SVGSVGElement> & {
    secondaryOpacity?: number;
    weight?: string;
};

const StarIcon: React.FC<IconProps> = ({
    secondaryOpacity = 0.8,
    weight,
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
            fill={weight === "fill" ? "currentColor" : "transparent"}
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m10.763 3.038 1.779 3.604 3.979.578a.851.851 0 0 1 .472 1.452l-2.879 2.806.68 3.962a.851.851 0 0 1-1.235.897l-3.558-1.87-3.558 1.87a.851.851 0 0 1-1.235-.897l.68-3.962-2.879-2.806a.852.852 0 0 1 .472-1.452l3.979-.578 1.779-3.604a.85.85 0 0 1 1.526 0z"
        ></path>
    </svg>
);

export default StarIcon;
