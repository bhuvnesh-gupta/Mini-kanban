type SelectProps = {
    label: string
    value: string
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
    options: { value: string; label: string }[]
    style?: React.CSSProperties
}

export default function Select({ label, value, onChange, options, style }: SelectProps) {
    return (
        <div className="col" style={style}>
            <label>{label}</label>
            <select className="select" value={value} onChange={onChange}>
                {options.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                        {opt.label}
                    </option>
                ))}
            </select>
        </div>
    )
}