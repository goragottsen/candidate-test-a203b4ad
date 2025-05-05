import { WorkStatus } from "../../shared/types";

interface PillButtonProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
  isHighlighted?: boolean;
  status?: WorkStatus;
}

const getStatusStyles = (status: WorkStatus, isActive: boolean) => {
    switch (status) {
      case 'looking':
        return isActive 
          ? 'bg-[var(--success-color)] border-[var(--success-color)] text-white hover:bg-[var(--success-color)]' 
          : 'bg-white border-[var(--success-light)] text-[var(--success-color)] hover:bg-[color-mix(in_srgb,var(--success-color)_5%,white)]';
      case 'passive':
        return isActive 
          ? 'bg-[var(--info-color)] border-[var(--info-color)] text-white hover:bg-[var(--info-color)]' 
          : 'bg-white border-[var(--info-light)] text-[var(--info-color)] hover:bg-[color-mix(in_srgb,var(--info-color)_5%,white)]';
      case 'not_looking':
        return isActive 
          ? 'bg-[var(--danger-color)] border-[var(--danger-color)] text-white hover:bg-[var(--danger-color)]' 
          : 'bg-white border-[var(--danger-light)] text-[var(--danger-color)] hover:bg-[color-mix(in_srgb,var(--danger-color)_5%,white)]';
      default:
        return isActive 
          ? 'bg-gray-500 border-gray-500 text-white hover:bg-gray-600' 
          : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50';
    }
  };

const PillButton = ({ 
  label, 
  isActive, 
  onClick, 
  isHighlighted = false,
  status
}: PillButtonProps) => (
  <div
    onClick={onClick}
    role="button"
    tabIndex={0}
    onKeyUp={(e) => e.key === 'Enter' && onClick()}
    className={`
      m-0 mb-2 mr-2
      px-4 py-2
      rounded-md
      border
      cursor-pointer
      flex items-center
      transition-all duration-200
      text-sm
      w-full
      ${status ? getStatusStyles(status, isActive) : ''}
      ${isHighlighted ? 'font-medium' : 'font-normal'}
    `}
  >
    {label}
  </div>
);

export default PillButton;