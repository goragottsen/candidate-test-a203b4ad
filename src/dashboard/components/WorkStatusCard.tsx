import { useSelector, useDispatch } from "react-redux";
import { DashboardRootState, DashboardDispatch } from "../store";
import { updateWorkStatus } from "../store/userSlice";
import { WorkStatus } from "../../shared/types";
import toast from "react-hot-toast"
import PillButton from "./PillButton";

export const WorkStatusCard = ({ className = "" }: { className?: string }) => {
  const { profile } = useSelector((state: DashboardRootState) => state.user);
  const dispatch = useDispatch<DashboardDispatch>();

  const statusLabels: Record<WorkStatus, string> = {
    looking: "Currently looking for work",
    passive: "Passively looking for work",
    not_looking: "Don't want to hear about work",
  };

  const handleChange = (value: WorkStatus) => {
    dispatch(updateWorkStatus(value));
    toast.success("Availability updated!");
  };

  return (
    <div className={`bg-white rounded-lg shadow-sm p-6 h-full ${className}`}>
      <h3 className="text-lg font-medium mb-4 pb-3 border-b border-gray-200">
        Your Work Status
      </h3>
      <div className="py-2">
        <p className="mb-4">Update your availability for new opportunities:</p>
        <div 
          role="radiogroup" 
          aria-label="Work status" 
          className="flex flex-wrap gap-2"
        >
          {Object.entries(statusLabels).map(([value, label]) => (
            <PillButton
              key={value}
              label={label}
              isActive={profile.workStatus === value}
              onClick={() => handleChange(value as WorkStatus)}
              isHighlighted={false}
              status={value as WorkStatus}
            />
          ))}
        </div>
        <p className="mt-4 text-gray-500">
          Your current status:{" "}
          <strong>{statusLabels[profile.workStatus]}</strong>
        </p>
      </div>
    </div>
  );
};
