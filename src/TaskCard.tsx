import { format, parseISO } from 'date-fns';
import { type Task } from './types';
import TaskForm from './TaskForm';
import { useAppDispatch } from './hooks';
import { deleteTask } from './tasksSlice';
import clsx from 'clsx';
import { MdOutlineDelete } from 'react-icons/md';

export default function TaskCard({ task }: { task: Task }) {
    const dispatch = useAppDispatch();
    const dueDate = format(parseISO(task.dueDate), 'dd MMM yyyy');

    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8 }}>
                <h4>{task.title}</h4>
                <div style={{ display: 'flex', gap: 6 }}>
                    <TaskForm mode="edit" initial={{ task }} />
                    <button className="icon-btn delete" onClick={() => dispatch(deleteTask({ id: task.id }))}><MdOutlineDelete /></button>
                </div>
            </div>
            <div style={{ color: 'var(--muted)', fontSize: 13, marginBottom: 8 }}>
                {task.description}
            </div>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center', fontSize: 12 }}>
                <span className={clsx('badge', task.priority.toLowerCase())}>{task.priority}</span>
                <span className="badge">Due: {dueDate}</span>
            </div>
        </>
    );
}
