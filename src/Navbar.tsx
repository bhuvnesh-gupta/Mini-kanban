import React from 'react'
import { MdOutlineModeNight } from "react-icons/md";
import { CiSun } from 'react-icons/ci';
import { selectUI, toggleDark } from './tasksSlice';
import { useAppDispatch, useAppSelector } from './hooks';


function Navbar() {

    const dispatch = useAppDispatch();
    const ui = useAppSelector((state) => selectUI(state));

    return (
        <header className="row " style={{ alignItems: 'center', marginBottom: 12, padding: '16px 50px', borderBottom: '1px solid #333' }}>
            <h1 style={{ margin: 0, fontSize: 22, fontWeight: 800, letterSpacing: 0.3 }}>Mini Kanban</h1>
            <div style={{ marginLeft: 'auto', display: 'flex', gap: 8 }}>
                <button className="icon-btn" onClick={() => dispatch(toggleDark())}>
                    {ui.darkMode ? <MdOutlineModeNight /> : <CiSun />}
                </button>
            </div>
        </header>
    )
}

export default Navbar