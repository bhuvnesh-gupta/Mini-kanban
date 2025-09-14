import { configureStore } from "@reduxjs/toolkit";
import tasksReducer from "./tasksSlice";
import type { BoardState } from "./types";

const PERSIST_KEY = "mini-kanban-state";

function loadState() {
  try {
    const raw = localStorage.getItem(PERSIST_KEY);
    if (!raw) return undefined;
    const parsed = JSON.parse(raw);

    if (!parsed.board || !parsed.board.ui) return undefined;
    return parsed as { board: BoardState };
  } catch {
    return undefined;
  }
}

export const store = configureStore({
  reducer: {
    board: tasksReducer,
  },
  preloadedState: loadState(),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
