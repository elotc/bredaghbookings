
export function UserOrgSelect({ name, label, options, defaultValue, onChange, required = true, readOnly = false }: { name: string, label: string, options: { value: string, label: string }[], defaultValue?: string, onChange?: (value: string) => void, required?: boolean, readOnly?: boolean }) {
  return (
    <div>
      <select
        id={name}
        name={name}
        value={defaultValue}
        required={required}
        onChange={e => onChange?.(e.target.value)}
        disabled={readOnly}
        className=" border rounded px-3 py-2 text-sm"
      >
        {options.map(option => (
          <option
            key={option.value}
            value={option.value}
          >
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}