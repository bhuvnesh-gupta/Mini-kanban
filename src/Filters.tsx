/* eslint-disable @typescript-eslint/no-explicit-any */
import { useAppDispatch, useAppSelector } from './hooks';
import { selectUI, setFilter, setSearch, setSort } from './tasksSlice';
import type { ColumnId, SortKey } from './types';

export default function Filters() {
    const ui = useAppSelector(selectUI);
    const dispatch = useAppDispatch();

    const onSort = (column: ColumnId) => (e: React.ChangeEvent<HTMLSelectElement>) =>
        dispatch(setSort({ column, sortBy: e.target.value as SortKey }));

    return (
        <div className="row" style={{ alignItems: 'center' }}>
            <div className="col" style={{ maxWidth: 320 }}>
                <label>Search</label>
                <input
                    className="input"
                    placeholder="Search by title…"
                    value={ui.search}
                    onChange={(e) => dispatch(setSearch(e.target.value))}
                />
            </div>

            <div className="col" style={{ maxWidth: 320 }}>
                <label>Filter</label>
                <select className="select" value={ui.filter} onChange={(e) => dispatch(setFilter(e.target.value as any))}>
                    <option value="all">All tasks</option>
                    <option value="high">Only high-priority</option>
                    <option value="dueToday">Due today</option>
                </select>
            </div>

            <div className="col">
                <label>Sort: Todo</label>
                <select className="select" value={ui.sortBy.todo} onChange={onSort('todo')}>
                    <option value="none">None</option>
                    <option value="dueDate">By Due Date</option>
                    <option value="priority">By Priority</option>
                </select>
            </div>
            <div className="col">
                <label>Sort: In Progress</label>
                <select className="select" value={ui.sortBy.inProgress} onChange={onSort('inProgress')}>
                    <option value="none">None</option>
                    <option value="dueDate">By Due Date</option>
                    <option value="priority">By Priority</option>
                </select>
            </div>
            <div className="col">
                <label>Sort: Done</label>
                <select className="select" value={ui.sortBy.done} onChange={onSort('done')}>
                    <option value="none">None</option>
                    <option value="dueDate">By Due Date</option>
                    <option value="priority">By Priority</option>
                </select>
            </div>
        </div>
    );
}
