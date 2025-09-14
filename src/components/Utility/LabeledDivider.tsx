interface LabeledDividerProps {
  label: string;
}

const LabeledDivider = ({label}: LabeledDividerProps) => {
  return (
    <div className="relative w-full flex justify-center items-center
  before:content-[''] before:w-full before:h-[1px] before:absolute before:bg-gray-600 before:top-1/2">
      <span className="relative px-4 bg-gray-900 text-white my-4 font-semibold">
        {label}
      </span>
    </div>
  )
}

export default LabeledDivider;
