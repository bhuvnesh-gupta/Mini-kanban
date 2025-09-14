import { useAppSelector } from './hooks';
import { selectCounts } from './tasksSlice';

export default function ProgressBar() {
    const { total, done, pct } = useAppSelector(selectCounts);
    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                <strong>Progress</strong>
                <span style={{ color: 'var(--muted)' }}>{done}/{total} done ({pct}%)</span>
            </div>
            <div className="progress"><span style={{ width: `${pct}%` }} /></div>
        </div>
    );
}
