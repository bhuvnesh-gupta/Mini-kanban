import { Droppable, Draggable } from '@hello-pangea/dnd';
import { useAppSelector } from './hooks';
import { selectColumnTasks } from './tasksSlice';
import type { ColumnId } from './types';
import TaskCard from './TaskCard';
import TaskForm from './TaskForm';

export default function Column({ id, title }: { id: ColumnId; title: string }) {
    const tasks = useAppSelector(selectColumnTasks(id));

    return (
        <div className="panel" style={{ padding: 12 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                <h3 className="section-title" style={{ margin: 0 }}>{title}</h3>
                <TaskForm mode="create" initial={{ column: id }} />
            </div>

            <Droppable droppableId={id}>
                {(provided) => (
                    <div ref={provided.innerRef} {...provided.droppableProps} style={{ minHeight: 40 }}>
                        {tasks.map((task, idx) => (
                            <Draggable key={task.id} draggableId={task.id} index={idx}>
                                {(provided, snapshot) => (
                                    <div
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        className="card task"
                                        style={{
                                            marginBottom: 10,
                                            boxShadow: snapshot.isDragging ? '0 0 0 2px var(--ring) inset' : undefined,
                                            ...provided.draggableProps.style
                                        }}
                                    >
                                        <TaskCard task={task} />
                                    </div>
                                )}
                            </Draggable>
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </div>
    );
}
