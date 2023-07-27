import { ReactNode } from "react";
import { Link } from "react-router-dom";

export enum Colors {
    RED = "red",
    INDIGO = "indigo",
    GREEN = "green",
}

type PropTypes = {
    color?: Colors;
    to?: string;
    circle?: boolean;
    href?: string;
    link?: boolean;
    target?: string;
    onClick?: () => void;
    children: ReactNode;
};

type ClassType = Array<string>;

const TButton = ({
    color = Colors.INDIGO,
    to = "",
    circle = false,
    href = "",
    link = false,
    target = "_blank",
    onClick,
    children,
}: PropTypes) => {
    let classes: ClassType = [
        "flex",
        "items-center",
        "whitespace-nowrap",
        "text-sm",
        "border",
        "border-2",
        "border-transparent",
    ];

    if (link) {
        classes = [...classes, "transition-colors"];

        switch (color) {
            case Colors.INDIGO:
                classes = [
                    ...classes,
                    "text-indigo-500",
                    "focus:border-indigo-500",
                ];
                break;

            case Colors.RED:
                classes = [...classes, "text-red-500", "focus:border-red-500"];
                break;
            default:
                break;
        }
    } else {
        classes = [
            ...classes,
            "text-white",
            "focus:ring-2",
            "focus:ring-offset-2",
        ];

        switch (color) {
            case Colors.INDIGO:
                classes = [
                    ...classes,
                    "bg-indigo-600",
                    "hover:bg-indigo-700",
                    "focus:ring-indigo-500",
                ];
                break;
            case Colors.RED:
                classes = [
                    ...classes,
                    "bg-red-600",
                    "hover:bg-red-700",
                    "focus:ring-red-500",
                ];
                break;
            case Colors.GREEN:
                classes = [
                    ...classes,
                    "bg-emerald-500",
                    "hover:bg-emerald-600",
                    "focus:ring-emerald-400",
                ];
                break;
        }
    }

    if (circle) {
        classes = [
            ...classes,
            "h-8",
            "w-8",
            "items-center",
            "justify-center",
            "rounded-full",
            "text-sm",
        ];
    } else {
        classes = [...classes, "p-0", "py-2", "px-4", "rounded-md"];
    }

    return (
        <>
            {href && (
                <a href={href} className={classes.join(" ")} target={target}>
                    {children}
                </a>
            )}
            {to && (
                <Link to={to} className={classes.join(" ")}>
                    {children}
                </Link>
            )}
            {!to && !href && (
                <button onClick={onClick} className={classes.join(" ")}>
                    {children}
                </button>
            )}
        </>
    );
};

export default TButton;
