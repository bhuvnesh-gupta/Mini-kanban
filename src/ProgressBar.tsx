import { useAppSelector } from './hooks';
import { selectCounts } from './tasksSlice';

export default function ProgressBar() {
    const { total, done, percentage } = useAppSelector(selectCounts);
    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                <strong>Progress</strong>
                <span style={{ color: 'var(--muted)' }}>{done}/{total} done ({percentage}%)</span>
            </div>
            <div className="progress"><span style={{ width: `${percentage}%` }} /></div>
        </div>
    );
}
