import { DragDropContext, type DropResult } from '@hello-pangea/dnd';
import { useAppDispatch } from './hooks';
import { moveTask, reorderWithin } from './tasksSlice';
import Column from './Column';
import type { ColumnId } from './types';

const columns: { id: ColumnId; title: string }[] = [
    { id: 'todo', title: 'Todo' },
    { id: 'inProgress', title: 'In Progress' },
    { id: 'done', title: 'Done' },
];

export default function Board() {
    const dispatch = useAppDispatch();

    function onDragEnd(result: DropResult) {
        const { source, destination } = result;
        if (!destination) return;
        const from = source.droppableId as ColumnId;
        const to = destination.droppableId as ColumnId;

        if (from === to) {
            if (source.index !== destination.index) {
                dispatch(reorderWithin({ column: from, fromIndex: source.index, toIndex: destination.index }));
            }
        } else {
            dispatch(moveTask({ from, to, fromIndex: source.index, toIndex: destination.index }));
        }
    }

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <div className="row">
                {columns.map((c) => (
                    <div key={c.id} className="col">
                        <Column id={c.id} title={c.title} />
                    </div>
                ))}
            </div>
        </DragDropContext>
    );
}
