import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
    icon?: ReactNode;
};

const Input = ({
    type = "text",
    icon,
    className,
    readOnly,
    ...props
}: InputProps) => {
    return (
        <div
            className={twMerge(
                "relative after:absolute after:left-0 after:block after:h-px after:w-full after:-bottom-1 after:bg-linear-to-r after:from-primary after:to-background/0",
                readOnly ? "opacity-50 pointer-events-none" : "",
                className,
            )}
        >
            <input
                type={type}
                readOnly={readOnly}
                className="w-full py-1 pl-4 pr-8"
                {...props}
            />

            {icon}
        </div>
    );
};

export default Input;
