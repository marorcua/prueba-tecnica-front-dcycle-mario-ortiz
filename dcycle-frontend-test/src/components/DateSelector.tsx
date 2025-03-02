function DateSelector({
  value,
  min,
  max,
  action,
  title,
}: {
  value: string;
  min: string;
  max: string;
  title: string;
  action: (value: string) => void;
}) {
  return (
    <div>
      <label
        htmlFor={title}
        className="block text-sm font-medium text-gray-700"
      >
        {title}
      </label>
      <input
        type="date"
        id={title}
        value={value}
        min={min}
        max={max}
        onChange={(e) => action(e.target.value)}
        className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500"
      />
    </div>
  );
}

export default DateSelector;
