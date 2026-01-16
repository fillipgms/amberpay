import { ChangeEvent, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

const Input = ({
    defaultValue,
    onChange,
    type = "text",
    name,
    id,
    icon,
    placeholder,
    className,
    readOnly,
}: {
    defaultValue?: string;
    onChange?: (evt: ChangeEvent<HTMLInputElement>) => void;
    type?: string;
    name?: string;
    id?: string;
    icon?: ReactNode;
    placeholder?: string;
    className?: string;
    readOnly?: boolean;
}) => {
    return (
        <div
            className={twMerge(
                "relative after:absolute after:left-0 after:block after:h-px after:w-full after:-bottom-1 after:bg-linear-to-r after:from-primary after:to-background/0",
                readOnly ? "opacity-50 pointer-events-none" : "",
                className
            )}
        >
            <input
                type={type}
                name={name}
                id={id}
                readOnly={readOnly}
                placeholder={placeholder}
                className="w-full py-1 pl-4 pr-8"
                defaultValue={defaultValue}
                onChange={onChange}
            />

            {icon}
        </div>
    );
};

export default Input;
