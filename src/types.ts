export type Priority = "Low" | "Medium" | "High";
export type ColumnId = "todo" | "inProgress" | "done";

export interface Task {
  id: string;
  title: string;
  description: string;
  priority: Priority;
  dueDate: string;
  createdAt: string;
}

export type SortKey = "none" | "dueDate" | "priority";

export interface UIState {
  filter: "all" | "high" | "dueToday";
  search: string;
  darkMode: boolean;
  sortBy: Record<ColumnId, SortKey>;
}

export interface BoardState {
  columns: Record<ColumnId, string[]>;
  tasks: Record<string, Task>;
  ui: UIState;
}
