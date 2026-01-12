import React from "react";
import SyncIcon from '../assets/images/sync.png';
import SyncedIcon from '../assets/images/synced.png';

interface SyncButtonProps {
  synced: boolean;
  onChange: (value: boolean) => void;
}

const SyncButton: React.FC<SyncButtonProps> = ({ synced, onChange }) => {
  return (
    <button
      type="button"
      onClick={() => onChange(!synced)}
      className="text-2xl transition-transform duration-200 hover:scale-110"
      aria-label="Toggle status"
    >
      <img src={synced ? SyncedIcon : SyncIcon} alt="" />
    </button>
  );
};

export default SyncButton;
