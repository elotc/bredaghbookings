import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export function StdForm({ title, children, action }: { title: string, children: React.ReactNode, action: (formData: FormData, id?: number) => void }) {
  return (
    <main className="space-y-4 bg-gray-100 p-2 m-2 rounded shadow">
      <h1 className="text-2xl font-bold mb-6">{title}</h1>
      <form action={action} className="space-y-4 bg-white p-6 rounded shadow">
        {children}
      </form>
    </main>
  );
}

export function StdFormInput(
  { name, label, type, defaultValue, onChange, required = true, readOnly = false, range, children }:
    {
      name: string,
      label: string,
      type: string,
      defaultValue?: string,
      onChange?: (value: string) => void,
      required?: boolean,
      readOnly?: boolean,
      range?: { min: number, max: number },
      children?: React.ReactNode
    }) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1" htmlFor={name}>{label}</label>
      <input
        id={name}
        name={name}
        type={type}
        defaultValue={defaultValue}
        required={required}
        min={range?.min}
        max={range?.max}
        onChange={e => onChange?.(e.target.value)}
        className="w-full border rounded px-3 py-2"
        readOnly={readOnly}
      />
      {children}
    </div>
  );
}

export function StdFormHidden({ name, defaultValue }: { name: string, defaultValue: string | number }) {
  return (
    <input
      type="hidden"
      id={name}
      name={name}
      defaultValue={defaultValue}
    />
  );
}

export function StdFormReadOnly({ name, label, defaultValue }: { name: string, label: string, defaultValue?: string }) {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium mb-1" htmlFor={name}>{label}</label>
      <input
        id={name}
        name={name}
        type="text"
        defaultValue={defaultValue}
        readOnly
        className="w-full border rounded px-3 py-2 cursor-not-allowed"
      />
    </div>
  );
}

export function StdFormSelect(
  {
    name,
    label,
    options,
    defaultValue,
    onChange,
    required = true,
    readOnly = false,
    multiple = false
  }: {
    name: string;
    label: string;
    options: { value: string | number; label: string }[];
    defaultValue?: string | number;
    onChange?: (value: string | number) => void;
    required?: boolean;
    readOnly?: boolean;
    multiple?: boolean;
  }) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1" htmlFor={name}>{label}</label>
      <select
        id={name}
        name={name}
        value={defaultValue}
        required={required}
        onChange={e => onChange?.(e.target.value)}
        disabled={readOnly}
        className="w-full border rounded px-3 py-2"
        multiple={multiple}
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


export function StdFormMetaText({ label, value }: { label: string, value: string }) {
  return (
    <div className="hidden md:block md:flex md:justify-between md:items-center md:mb-2">
      <span className="text-xs text-gray-600">{label}</span>
      <span className="text-xs font-medium">{value}</span>
    </div>
  );
}

export function StdFormButtonBar({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex p-1 md:justify-between">
      {children}
    </div>
  );
}

export function StdFormNavBtn({ ref, label = "Go" }: { ref: string, label?: string }) {
  return (
    <Link
      href={ref}
      className="
        flex p-2 mb-2 rounded 
        w-full md:w-auto md:mr-2
        justify-center
        bg-gray-300 text-gray-800 font-semibold
        hover:bg-gray-400
        "
    >
      <span className="">{label}</span>
    </Link>
  );
}

export function StdFormClickBtn({ onClick, label, disabled = false }: { onClick: () => void, label: string, disabled?: boolean }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
      flex p-2 mb-2 rounded 
      w-full md:w-auto md:mr-2
      justify-center
      bg-gray-300 text-gray-800 font-semibold
      hover:bg-gray-400
      ${disabled ? "opacity-50 cursor-not-allowed" : ""}
      `}
    >
      <span className="">{label}</span>
    </button>
  );
}

export function StdFormCancelBtn({ backRef, label = "Cancel" }: { backRef: string, label?: string }) {
  return (<StdFormNavBtn ref={backRef} label={label} />);
}

export function StdFormSubmitBtn({ disabled, children = "Submit" }: {
  disabled: boolean;
  children?: React.ReactNode;
}) {
  return (
    <button
      type="submit"
      disabled={disabled}
      className="
        p-2 mb-2 rounded
        w-full md:w-auto md:mr-2
        bg-[#003366] text-[#FFD700] font-semibold 
        transition-colors 
        hover:bg-[#002244] hover:text-yellow-300 
        disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {children}
    </button>
  );
}


export function StdFormError({ error }: { error: string }) {
  return (
    <div className="flex items-center mb-2">
      <ExclamationCircleIcon className="h-6 w-6 inline-block mr-2 text-red-600" />
      <span className="font-bold text-lg text-red-600">{error}</span>
    </div>
  );
}

export function StdFormFieldError({ error }: { error: string }) {
  return (
    <div className="flex items-center mb-2">
      <ExclamationCircleIcon className="h-6 w-6 inline-block mr-2 text-red-600" />
      <span className="font-bold text-lg text-red-600">{error}</span>
    </div>
  );
}

export function StdFormDivider({ text }: { text: string }) {
  return (
    <div className="relative flex pt-5 pb-2 items-center">
      <div className="flex-grow border-t border-gray-400"></div>
      <span className="flex-shrink mx-4 text-gray-400">{text}</span>
      <div className="flex-grow border-t border-gray-400"></div>
    </div>
  );
}