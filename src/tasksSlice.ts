import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { BoardState, ColumnId, Task, Priority, SortKey } from "./types";
import { isToday, parseISO } from "date-fns";

const nowISO = () => new Date().toISOString();

const initialState: BoardState = {
  columns: {
    todo: [],
    inProgress: [],
    done: [],
  },
  tasks: {},
  ui: {
    filter: "all",
    search: "",
    darkMode: false,
    sortBy: { todo: "none", inProgress: "none", done: "none" },
  },
};

const priorityRank = (p: Priority) => ({ High: 3, Medium: 2, Low: 1 }[p]);

function sortIds(ids: string[], tasks: Record<string, Task>, key: SortKey) {
  if (key === "none") return ids;
  const copy = [...ids];
  copy.sort((a, b) => {
    const taskA = tasks[a],
      taskB = tasks[b];
    if (key === "dueDate") {
      return (taskA?.dueDate ?? "").localeCompare(taskB?.dueDate ?? "");
    }
    if (key === "priority") {
      return priorityRank(taskB.priority) - priorityRank(taskA.priority);
    }
    return 0;
  });
  return copy;
}

const tasksSlice = createSlice({
  name: "board",
  initialState,
  reducers: {
    addTask: (
      state,
      {
        payload,
      }: PayloadAction<Omit<Task, "id" | "createdAt"> & { column: ColumnId }>
    ) => {
      const id = crypto.randomUUID();
      const task: Task = { ...payload, id, createdAt: nowISO() };
      state.tasks[id] = task;
      state.columns[payload.column].unshift(id);
    },
    updateTask: (
      state,
      { payload }: PayloadAction<Partial<Task> & { id: string }>
    ) => {
      const task = state.tasks[payload.id];
      if (!task) return;
      state.tasks[payload.id] = { ...task, ...payload };
    },
    deleteTask: (state, { payload }: PayloadAction<{ id: string }>) => {
      delete state.tasks[payload.id];
      (Object.keys(state.columns) as ColumnId[]).forEach((col) => {
        state.columns[col] = state.columns[col].filter(
          (taskid) => taskid !== payload.id
        );
      });
    },
    moveTask: (
      state,
      {
        payload,
      }: PayloadAction<{
        from: ColumnId;
        to: ColumnId;
        fromIndex: number;
        toIndex: number;
      }>
    ) => {
      const fromArr = state.columns[payload.from];
      const [moved] = fromArr.splice(payload.fromIndex, 1);
      state.columns[payload.to].splice(payload.toIndex, 0, moved);
    },
    reorderWithin: (
      state,
      {
        payload,
      }: PayloadAction<{ column: ColumnId; fromIndex: number; toIndex: number }>
    ) => {
      const arr = state.columns[payload.column];
      const [moved] = arr.splice(payload.fromIndex, 1);
      arr.splice(payload.toIndex, 0, moved);
    },
    setFilter: (
      state,
      { payload }: PayloadAction<BoardState["ui"]["filter"]>
    ) => {
      state.ui.filter = payload;
    },
    setSearch: (state, { payload }: PayloadAction<string>) => {
      state.ui.search = payload;
    },
    setSort: (
      state,
      { payload }: PayloadAction<{ column: ColumnId; sortBy: SortKey }>
    ) => {
      state.ui.sortBy[payload.column] = payload.sortBy;
    },
    toggleDark: (state) => {
      state.ui.darkMode = !state.ui.darkMode;
    },
    seedExample: (state) => {
      if (Object.keys(state.tasks).length) return;
      const mk = (
        title: string,
        priority: Priority,
        dueOffsetDays = 1
      ): Task => {
        const id = crypto.randomUUID();
        const dueDate = new Date();
        dueDate.setDate(dueDate.getDate() + dueOffsetDays);
        return {
          id,
          title,
          description: `${title} description`,
          priority,
          dueDate: dueDate.toISOString(),
          createdAt: nowISO(),
        };
      };
      const task1 = mk("Wireframes", "High", 0);
      const task2 = mk("API contract", "Medium", 2);
      const task3 = mk("Unit tests", "Low", 5);
      state.tasks = { [task1.id]: task1, [task2.id]: task2, [task3.id]: task3 };
      state.columns = {
        todo: [task1.id, task2.id],
        inProgress: [],
        done: [task3.id],
      };
    },
  },
});

export const {
  addTask,
  updateTask,
  deleteTask,
  moveTask,
  reorderWithin,
  setFilter,
  setSearch,
  setSort,
  toggleDark,
  seedExample,
} = tasksSlice.actions;

export default tasksSlice.reducer;

export const selectUI = (select: { board?: BoardState }) =>
  select.board?.ui ?? initialState.ui;

export const selectColumnTasks =
  (column: ColumnId) => (select: { board: BoardState }) => {
    const { tasks, columns, ui } = select.board;
    const ids = columns[column] || [];
    const filtered = ids.filter((id) => {
      const task = tasks[id];
      if (!task) return false;
      if (
        ui.search &&
        !task.title.toLowerCase().includes(ui.search.toLowerCase())
      )
        return false;
      if (ui.filter === "high" && task.priority !== "High") return false;
      if (ui.filter === "dueToday" && !isToday(parseISO(task.dueDate)))
        return false;
      return true;
    });
    return sortIds(filtered, tasks, ui.sortBy[column]).map((id) => tasks[id]);
  };

export const selectCounts = (select: { board: BoardState }) => {
  const total = Object.keys(select.board.tasks).length;
  const done = select.board.columns.done.length;
  return { total, done, pct: total ? Math.round((done / total) * 100) : 0 };
};
