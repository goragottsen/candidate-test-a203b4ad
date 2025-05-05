import { WorkStatus } from "../../shared/types";

interface PillButtonProps {
  label: string|React.ReactNode;
  isActive: boolean;
  onClick: () => void;
  status?: WorkStatus;
}

const getStatusStyles = (status: WorkStatus, isActive: boolean) => {
    switch (status) {
      case 'looking':
        return isActive 
          ? 'bg-[var(--success-color)] text-white font-semibold border-2 border-[var(--success-color)]' 
          : 'bg-[color-mix(in_srgb,var(--success-color)_5%,white)] border-transparent';
      case 'passive':
        return isActive 
          ? 'bg-[var(--info-color)] text-white border-2 font-semibold border-[var(--info-color)]' 
          : 'bg-[color-mix(in_srgb,var(--info-color)_5%,white)] border-transparent';
      case 'not_looking':
        return isActive 
          ? 'bg-[var(--danger-color)] text-white border-2 font-semibold border-[var(--danger-color)]' 
          : 'bg-[color-mix(in_srgb,var(--danger-color)_5%,white)] border-transparent';
      default:
        return isActive 
          ? 'bg-gray-50 border-2 border-gray-500' 
          : 'bg-gray-50 border-transparent';
    }
  };

const PillButton = ({ 
  label, 
  isActive, 
  onClick,
  status
}: PillButtonProps) => (
  <div
    onClick={onClick}
    role="button"
    tabIndex={0}
    onKeyUp={(e) => e.key === 'Enter' && onClick()}
    className={`
      m-0 mb-2 mr-2
      p-[0.6em_1.2em]
      rounded-md
      border
      cursor-pointer
      flex items-center
      transition-all duration-200
      text-sm
      w-full
      ${status ? getStatusStyles(status, isActive) : ''}
    `}
  >
    {label}
  </div>
);

export default PillButton;