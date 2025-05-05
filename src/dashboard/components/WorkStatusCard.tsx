import { useSelector, useDispatch } from "react-redux";
import { DashboardRootState, DashboardDispatch } from "../store";
import { updateWorkStatus } from "../store/userSlice";
import { WorkStatus } from "../../shared/types";
import toast from "react-hot-toast";
import { useEffect, useRef, useState } from "react";
import PillButton from "./PillButton";
import dropdownArrow from "../../assets/dropdown-arrow.svg";
import { statusLabels } from "../../shared/models/statusLabels";


export const WorkStatusCard = ({ className = "" }: { className?: string }) => {
  const { profile } = useSelector((state: DashboardRootState) => state.user);
  const dispatch = useDispatch<DashboardDispatch>();
  const [isEditing, setIsEditing] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Click outside handler
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsEditing(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    
    // Cleanup listener
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleChange = (value: WorkStatus) => {
    if (value !== profile.workStatus) {
      dispatch(updateWorkStatus(value));
      toast.success("Work status updated!");
    }
    setIsEditing(false);
  };

  return (
    <div className={`bg-white rounded-lg shadow-sm p-6 h-full ${className}`}>
      <h3 className="text-lg font-medium mb-4 pb-3 border-b border-gray-200">
        Your Work Status
      </h3>
      <div className="py-2" ref={wrapperRef}>
        <p className="mb-4">Update your availability for new opportunities:</p>

        {!isEditing ? (
          <div 
          onClick={() => setIsEditing(true)}
          className="cursor-pointer items-center gap-2 group"
        >
          <PillButton
            isActive={true}
            onClick={() => setIsEditing(true)}
            status={profile.workStatus}
            label={
              <div className="flex items-center gap-2 w-full">
                <span>{statusLabels[profile.workStatus]}</span>
                <img 
                  src={dropdownArrow} 
                  alt="Dropdown Arrow Icon" 
                  className="w-4 h-4 text-white group-hover:text-white transition-colors ml-auto"
                  style={{ filter: 'brightness(0) invert(1)' }}
                />
              </div>
            }
          />
          </div>
        ) : (
          <div className="space-y-2">
            {Object.entries(statusLabels).map(([value, label]) => (
              <PillButton
                key={value}
                label={label}
                isActive={profile.workStatus === value}
                onClick={() => handleChange(value as WorkStatus)}
                status={value as WorkStatus}
              />
            ))}
            <button
              onClick={() => setIsEditing(false)}
              className="w-full text-white"
            >
              Cancel
            </button>
          </div>
        )}

        <p className="mt-4 text-gray-500">
          Your current status: <strong>{statusLabels[profile.workStatus]}</strong>
        </p>
      </div>
    </div>
  );
};