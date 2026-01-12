import React from "react";

interface CheckboxProps {
    active: boolean,
    label: string,
    onChange: (checked: boolean) => void;
}

const Checkbox: React.FC<CheckboxProps> = ({ active, label, onChange }) => {
    return (
        <div>
            <label className="flex items-center gap-2 cursor-pointer">
                <input
                    type="checkbox"
                    checked={active}
                    onChange={(e) => onChange(e.target.checked)}
                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-500">{label}</span>
            </label>
        </div>
    );
};

export default Checkbox;
