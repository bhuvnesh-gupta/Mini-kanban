import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './hooks';
import { seedExample, selectUI, toggleDark } from './tasksSlice';
import Board from './Board';
import Filters from './filters';
import ProgressBar from './ProgressBar';
import { MdOutlineModeNight } from "react-icons/md";
import { CiSun } from 'react-icons/ci';


export default function App() {
  const dispatch = useAppDispatch();
  const ui = useAppSelector((state) => selectUI(state));

  useEffect(() => {
    dispatch(seedExample());
  }, [dispatch]);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle('light', ui.darkMode === false);
  }, [ui.darkMode]);

  return (
    <div className="container">
      <header className="row" style={{ alignItems: 'center', marginBottom: 12 }}>
        <h1 style={{ margin: 0, fontSize: 22, fontWeight: 800, letterSpacing: 0.3 }}>Mini Kanban</h1>
        <div style={{ marginLeft: 'auto', display: 'flex', gap: 8 }}>
          <button className="icon-btn" onClick={() => dispatch(toggleDark())}>
            {ui.darkMode ? <MdOutlineModeNight /> : <CiSun />}
          </button>
          <a className="icon-btn" href="https://github.com/yourname/mini-kanban" target="_blank">Repo</a>
        </div>
      </header>

      <div className="panel" style={{ padding: 16, marginBottom: 16 }}>
        <ProgressBar />
        <div className="hr" />
        <Filters />
      </div>

      <Board />
    </div>
  );
}
