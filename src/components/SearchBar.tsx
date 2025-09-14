type SearchBarProps = {
    label: string
    value: string
    placeholder?: string
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    style?: React.CSSProperties
}

export default function SearchBar({ label, value, placeholder, onChange, style }: SearchBarProps) {
    return (
        <div className="col" style={style}>
            <label>{label}</label>
            <input
                className="input"
                value={value}
                placeholder={placeholder}
                onChange={onChange}
            />
        </div>
    )
}