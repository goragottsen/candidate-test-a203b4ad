import { useSelector, useDispatch } from "react-redux";
import { NavRootState, NavDispatch } from "../store";
import { updateWorkStatus } from "../store/userSlice";
import { WorkStatus } from "../../shared/types";
import { useState } from "react";
import toast from "react-hot-toast"
import PillButton from "../../dashboard/components/PillButton";

export const UserAvatar = () => {
  const { profile } = useSelector((state: NavRootState) => state.user);
  const dispatch = useDispatch<NavDispatch>();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const statusLabels: Record<WorkStatus, string> = {
    looking: "Currently looking for work",
    passive: "Passively looking for work",
    not_looking: "Don't want to hear about work",
  };

  const handleStatusChange = (status: WorkStatus) => {
    dispatch(updateWorkStatus(status));
    setDropdownOpen(false);
    toast.success("Availability updated!");
  };

  const handleClose = (e: React.MouseEvent<HTMLDivElement>) => {
      setDropdownOpen(false);
      e.stopPropagation();
  };

  return (
    <div className="relative">
      <div
        className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 rounded-md p-1.5 transition-colors"
        onClick={() => setDropdownOpen(!dropdownOpen)}
      >
        <img
          src={profile.avatar}
          alt={profile.name}
          className="w-10 h-10 rounded-full"
        />
        <div className="flex flex-col">
          <span className="font-medium text-sm">{profile.name}</span>
          <span className="text-xs text-gray-600">
            {statusLabels[profile.workStatus]}
          </span>
        </div>
      </div>

      {dropdownOpen && (
        <>
        <div 
          className="fixed inset-0 z-10"
          onClick={handleClose}
        />
        <div
          className="absolute bottom-full mb-1 left-0 bg-white shadow-lg rounded-md w-64 z-20 border border-gray-200"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="px-3 py-2 border-b border-gray-100">
              <h4 className="text-sm font-medium text-gray-600">
                Update your work status
              </h4>
            </div>
            <div className="p-3">
              <div className="flex flex-col gap-1">
                {Object.entries(statusLabels).map(([value, label]) => (
                  <PillButton
                    key={value}
                    label={label}
                    isActive={profile.workStatus === value}
                    onClick={() => handleStatusChange(value as WorkStatus)}
                    status={value as WorkStatus}
                  />
                ))}
              </div>
            </div>
        </div>
        </>
      )}
    </div>
  );
};
