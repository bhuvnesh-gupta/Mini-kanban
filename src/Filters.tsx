
import SearchBar from './components/SearchBar'
import Select from './components/Select'
import { useAppDispatch, useAppSelector } from './hooks'
import { selectUI, setFilter, setSearch, setSort } from './tasksSlice'
import type { ColumnId, SortKey } from './types'

export default function Filters() {
    const ui = useAppSelector(selectUI)
    const dispatch = useAppDispatch()

    const onSort =
        (column: ColumnId) => (e: React.ChangeEvent<HTMLSelectElement>) =>
            dispatch(setSort({ column, sortBy: e.target.value as SortKey }))

    const filterOptions = [
        { value: 'all', label: 'All tasks' },
        { value: 'high', label: 'Only high-priority' },
        { value: 'dueToday', label: 'Due today' },
    ]

    const sortOptions = [
        { value: 'none', label: 'None' },
        { value: 'dueDate', label: 'By Due Date' },
        { value: 'priority', label: 'By Priority' },
    ]

    const sortColumns: { column: ColumnId; label: string; value: string }[] = [
        { column: 'todo', label: 'Sort: Todo', value: ui.sortBy.todo },
        { column: 'inProgress', label: 'Sort: In Progress', value: ui.sortBy.inProgress },
        { column: 'done', label: 'Sort: Done', value: ui.sortBy.done },
    ]

    return (
        <div className="row" style={{ alignItems: 'center' }}>
            <SearchBar
                label="Search"
                value={ui.search}
                placeholder="Search by title…"
                onChange={(e) => dispatch(setSearch(e.target.value))}
                style={{ maxWidth: 320 }}
            />

            <Select
                label="Filter"
                value={ui.filter}
                onChange={(e) => dispatch(setFilter(e.target.value as 'all' | 'high' | 'dueToday'))}
                options={filterOptions}
                style={{ maxWidth: 320 }}
            />

            {sortColumns.map(({ column, label, value }) => (
                <Select
                    key={column}
                    label={label}
                    value={value}
                    onChange={onSort(column)}
                    options={sortOptions}
                />
            ))}
        </div>
    )
}