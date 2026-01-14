import { useEffect, useRef, useState, ReactNode } from "react";

interface DropdownProps {
    trigger: ReactNode;
    children: ReactNode;
    align?: "left" | "right";
}

const Dropdown: React.FC<DropdownProps> = ({
    trigger,
    children,
    align = "right"
}) => {
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div ref={dropdownRef} className="relative inline-block">
            <div onClick={() => setOpen(!open)} className="cursor-pointer">
                {trigger}
            </div>

            {open && (
                <div
                    className={`absolute mt-2 min-w-[11rem] rounded-md bg-white shadow-lg border z-50
                    ${align === "right" ? "right-0" : "left-0"}`}
                >
                    {children}
                </div>
            )}
        </div>
    );
};

export default Dropdown;
