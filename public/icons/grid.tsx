import * as React from "react";

type IconProps = React.SVGProps<SVGSVGElement> & {
    secondaryOpacity?: number;
    weight?: string;
};

const GridIcon: React.FC<IconProps> = ({
    secondaryOpacity = 0.8,
    weight,
    ...props
}) => {
    if (weight === "fill") {
        return (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="none"
                viewBox="0 0 20 20"
                {...props}
            >
                <path
                    fill="currentColor"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6.5 3h-2A1.5 1.5 0 0 0 3 4.5v2A1.5 1.5 0 0 0 4.5 8h2A1.5 1.5 0 0 0 8 6.5v-2A1.5 1.5 0 0 0 6.5 3"
                ></path>
                <path
                    fill="currentColor"
                    fillOpacity={secondaryOpacity}
                    stroke="currentColor"
                    strokeOpacity={secondaryOpacity}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15.5 3h-2A1.5 1.5 0 0 0 12 4.5v2A1.5 1.5 0 0 0 13.5 8h2A1.5 1.5 0 0 0 17 6.5v-2A1.5 1.5 0 0 0 15.5 3M6.5 12h-2A1.5 1.5 0 0 0 3 13.5v2A1.5 1.5 0 0 0 4.5 17h2A1.5 1.5 0 0 0 8 15.5v-2A1.5 1.5 0 0 0 6.5 12"
                ></path>
                <path
                    fill="currentColor"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15.5 12h-2a1.5 1.5 0 0 0-1.5 1.5v2a1.5 1.5 0 0 0 1.5 1.5h2a1.5 1.5 0 0 0 1.5-1.5v-2a1.5 1.5 0 0 0-1.5-1.5"
                ></path>
            </svg>
        );
    }

    return (
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
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6.5 3h-2A1.5 1.5 0 0 0 3 4.5v2A1.5 1.5 0 0 0 4.5 8h2A1.5 1.5 0 0 0 8 6.5v-2A1.5 1.5 0 0 0 6.5 3"
            ></path>
            <path
                stroke="currentColor"
                strokeOpacity={secondaryOpacity}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15.5 3h-2A1.5 1.5 0 0 0 12 4.5v2A1.5 1.5 0 0 0 13.5 8h2A1.5 1.5 0 0 0 17 6.5v-2A1.5 1.5 0 0 0 15.5 3M6.5 12h-2A1.5 1.5 0 0 0 3 13.5v2A1.5 1.5 0 0 0 4.5 17h2A1.5 1.5 0 0 0 8 15.5v-2A1.5 1.5 0 0 0 6.5 12"
            ></path>
            <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15.5 12h-2a1.5 1.5 0 0 0-1.5 1.5v2a1.5 1.5 0 0 0 1.5 1.5h2a1.5 1.5 0 0 0 1.5-1.5v-2a1.5 1.5 0 0 0-1.5-1.5"
            ></path>
        </svg>
    );
};

export default GridIcon;
