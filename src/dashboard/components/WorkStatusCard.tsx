import { useSelector, useDispatch } from "react-redux";
import { DashboardRootState, DashboardDispatch } from "../store";
import { updateWorkStatus } from "../store/userSlice";
import { WorkStatus } from "../../shared/types";

export const WorkStatusCard = ({ className = "" }: { className?: string }) => {
  const { profile } = useSelector((state: DashboardRootState) => state.user);
  const dispatch = useDispatch<DashboardDispatch>();

  const statusLabels: Record<WorkStatus, string> = {
    looking: "Currently looking for work",
    passive: "Passively looking for work",
    not_looking: "Don't want to hear about work",
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(updateWorkStatus(e.target.value as WorkStatus));
  };

  return (
    <div className={`bg-white rounded-lg shadow-sm p-6 h-full ${className}`}>
      <h3 className="text-lg font-medium mb-4 pb-3 border-b border-gray-200">
        Your Work Status
      </h3>
      <div className="py-2">
        <p>Update your availability for new opportunities:</p>
        <select
          value={profile.workStatus}
          onChange={handleStatusChange}
          className="w-full p-3 border border-gray-200 rounded-md my-4 text-base"
        >
          <option value="looking">Currently looking for work</option>
          <option value="passive">Passively looking for work</option>
          <option value="not_looking">Don't want to hear about work</option>
        </select>
        <p className="mt-4 text-gray-500">
          Your current status:{" "}
          <strong>{statusLabels[profile.workStatus]}</strong>
        </p>
      </div>
    </div>
  );
};
