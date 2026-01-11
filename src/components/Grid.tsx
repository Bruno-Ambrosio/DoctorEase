interface GridProps<T extends Record<string, any>> {
    data: T[];
    onRowClick?: (item: T) => void;
}

const Grid = <T extends Record<string, any>>({
    data,
    onRowClick,
}: GridProps<T>) => {
    if (!data.length) {
        return null;
    }

    const columns = Object.keys(data[0]);

    return (
        <div className="grid gap-2">
            <div
                className="grid font-semibold border-b pb-2"
                style={{ gridTemplateColumns: `repeat(${columns.length}, 1fr)` }}
            >
                {columns.map((col) => (
                    <div key={col}>{col}</div>
                ))}
            </div>
            {data.map((item, index) => (
                <div
                    key={index}
                    onClick={() => onRowClick?.(item)}
                    className="grid border-b py-2 cursor-pointer hover:bg-gray-100"
                    style={{ gridTemplateColumns: `repeat(${columns.length}, 1fr)` }}
                >
                    {columns.map((col) => (
                        <div key={col}>{String(item[col])}</div>
                    ))}
                </div>
            ))}
        </div>
    );
};

export default Grid;
