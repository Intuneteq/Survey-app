import { paginationClass } from "../../utils/classes";

type PropsType = {
    meta: MetaType;
    onPageClick: (link: LinkType) => void;
};

export default function PaginationLinks({ meta, onPageClick }: PropsType) {
    function onClick(e: React.MouseEvent<HTMLElement>, link: LinkType) {
        e.preventDefault();
        if (!link.url) {
            return;
        }
        onPageClick(link);
    }

    return (
        <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6 shadow-md mt-4">
            <div className="flex flex-1 justify-between sm:hidden">
                <button
                    type="button"
                    onClick={(ev) => onClick(ev, meta.links[0])}
                    className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                    Previous
                </button>
                <button
                    type="button"
                    onClick={(ev) =>
                        onClick(ev, meta.links[meta.links.length - 1])
                    }
                    className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                    Next
                </button>
            </div>
            <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                <div>
                    <p className="text-sm text-gray-700">
                        Showing <span className="font-medium">{meta.from}</span>{" "}
                        to <span className="font-medium">{meta.to}</span> of
                        &nbsp;
                        <span className="font-medium">{meta.total}</span>{" "}
                        results
                    </p>
                </div>
                <div>
                    {meta.total > meta.per_page && (
                        <nav
                            className="isolate inline-flex -space-x-px rounded-md shadow-sm"
                            aria-label="Pagination"
                        >
                            {/* Current: "z-10 bg-indigo-50 border-indigo-500 text-indigo-600", Default: "bg-white border-gray-300 text-gray-500 hover:bg-gray-50" */}
                            {meta.links &&
                                meta.links.map((link, ind) => (
                                    <button
                                        type="button"
                                        // href="#"
                                        onClick={(ev) => onClick(ev, link)}
                                        key={ind}
                                        aria-current="page"
                                        className={paginationClass(
                                            link,
                                            ind,
                                            meta
                                        )}
                                        dangerouslySetInnerHTML={{
                                            __html: link.label,
                                        }}
                                    ></button>
                                ))}
                        </nav>
                    )}
                </div>
            </div>
        </div>
    );
}
