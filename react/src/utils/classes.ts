import { LinkType, MetaType } from "../types/survey";

export function paginationClass(link: LinkType, ind: number, meta: MetaType) {
    const all = [
        "relative",
        "z-10",
        "inline-flex",
        "items-center",
        "border",
        "px-4",
        "py-2",
        "text-sm",
        "font-medium",
        "focus:z-20",
        "hover:bg-gray-50",
    ];

    const first = "rounded-l-md ";

    const last = "rounded-r-md";

    const active = ["border-indigo-500", "bg-indigo-50", "text-indigo-600"];

    if (ind === 0) {
        all.push(first);
    }

    if (ind === meta.links.length - 1) {
        all.push(last);
    }

    if (link.active) {
        all.push(...active);
    }

    return all.join(" ");
}
