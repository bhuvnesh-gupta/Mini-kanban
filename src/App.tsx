import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './hooks';
import { seedExample, selectUI } from './tasksSlice';
import Board from './Board';
import Filters from './Filters';
import ProgressBar from './ProgressBar';
import Navbar from './Navbar';


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

    <>
      <Navbar />
      <div className="container">
        <div className="panel" style={{ padding: 16, marginBottom: 16 }}>
          <ProgressBar />
          <div className="hr" />
          <Filters />
        </div>
        <Board />
      </div >
    </>
  );
}
