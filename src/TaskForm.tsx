/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import { useAppDispatch } from './hooks';
import { addTask, updateTask } from './tasksSlice';
import type { ColumnId, Priority, Task } from './types';
import { MdAdd, MdEdit } from 'react-icons/md';

type CreateMode = { mode: 'create'; initial: { column: ColumnId } };
type EditMode = { mode: 'edit'; initial: { task: Task } };
type Props = CreateMode | EditMode;

export default function TaskForm(props: Props) {
    const dispatch = useAppDispatch();
    const [open, setOpen] = useState(false);

    const isEdit = props.mode === 'edit';
    const existing = isEdit ? props.initial.task : undefined;

    const [title, setTitle] = useState(existing?.title ?? '');
    const [description, setDescription] = useState(existing?.description ?? '');
    const [priority, setPriority] = useState<Priority>(existing?.priority ?? 'Low');
    const [dueDate, setDueDate] = useState(existing ? existing.dueDate.slice(0, 10) : new Date().toISOString().slice(0, 10));

    function reset() {
        setTitle(existing?.title ?? '');
        setDescription(existing?.description ?? '');
        setPriority(existing?.priority ?? 'Low');
        setDueDate(existing ? existing.dueDate.slice(0, 10) : new Date().toISOString().slice(0, 10));
    }

    function submit(e: React.FormEvent) {
        e.preventDefault();
        if (!title.trim()) return;

        if (isEdit) {
            dispatch(updateTask({
                id: existing!.id,
                title: title.trim(),
                description: description.trim(),
                priority,
                dueDate: new Date(dueDate).toISOString(),
            }));
        } else {
            dispatch(addTask({
                column: props.initial.column,
                title: title.trim(),
                description: description.trim(),
                priority,
                dueDate: new Date(dueDate).toISOString(),
            }));
            reset();
        }
        setOpen(false);
    }

    return (
        <>
            <button className="icon-btn edit " onClick={() => setOpen(true)}>
                {isEdit ? <MdEdit /> : <MdAdd />}
            </button>

            {open && (
                <div
                    style={{
                        position: 'fixed', inset: 0, background: 'rgba(0,0,0,.4)',
                        display: 'grid', placeItems: 'center', zIndex: 50
                    }}
                    onClick={() => setOpen(false)}
                >
                    <form
                        className="card"
                        style={{ padding: 16, width: 380, maxWidth: '90vw' }}
                        onClick={(e) => e.stopPropagation()}
                        onSubmit={submit}
                    >
                        <h3 style={{ marginTop: 0 }}>{isEdit ? 'Edit Task' : 'New Task'}</h3>

                        <label>Title</label>
                        <input className="input" value={title} onChange={(e) => setTitle(e.target.value)} required />

                        <div style={{ height: 8 }} />

                        <label>Description</label>
                        <textarea className="textarea" rows={3} value={description} onChange={(e) => setDescription(e.target.value)} />

                        <div style={{ height: 8 }} />

                        <div style={{ display: 'flex', gap: 12 }}>
                            <div style={{ flex: 1 }}>
                                <label>Priority</label>
                                <select className="select" value={priority} onChange={(e) => setPriority(e.target.value as any)}>
                                    <option>Low</option>
                                    <option>Medium</option>
                                    <option>High</option>
                                </select>
                            </div>
                            <div style={{ flex: 1 }}>
                                <label>Due Date</label>
                                <input className="input" type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
                            </div>
                        </div>

                        <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end', marginTop: 12 }}>
                            <button className="icon-btn delete" type="button" onClick={() => setOpen(false)}>Cancel</button>
                            <button className="icon-btn" type="submit">{isEdit ? 'Save' : 'Add'}</button>
                        </div>
                    </form>
                </div>
            )}
        </>
    );
}
