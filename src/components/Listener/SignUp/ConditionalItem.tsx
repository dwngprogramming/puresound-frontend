interface ConditionItemProps {
  met: boolean;
  label: string;
  isInvalid: boolean
}

const ConditionItem = ({met, label, isInvalid}: ConditionItemProps) => {
  return (
    <div className="flex items-center gap-2">
      {met ? (
        // icon tick
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="10"
                  fill="#51a2ff"
                  stroke="#51a2ff"
                  stroke-width="2"/>
          <path d="M16.0303 8.96967C16.3232 9.26256 16.3232 9.73744 16.0303 10.0303L11.0303 15.0303C10.7374 15.3232 10.2626 15.3232 9.96967 15.0303L7.96967 13.0303C7.67678 12.7374 7.67678 12.2626 7.96967 11.9697C8.26256 11.6768 8.73744 11.6768 9.03033 11.9697L10.5 13.4393L12.7348 11.2045L14.9697 8.96967C15.2626 8.67678 15.7374 8.67678 16.0303 8.96967Z"
                fill="white"/>
        </svg>
      ) : (
        // icon vòng tròn
        <svg width="14" height="14" viewBox="0 0 24 24" stroke="#d1d5dc" fill="none">
          <circle cx="12" cy="12" r="10" strokeWidth="2"/>
        </svg>
      )}
      <p className={`${isInvalid && !met ? 'text-red-500' : ''} text-sm text-gray-300`}>{label}</p>
    </div>
  )
};

export default ConditionItem;
