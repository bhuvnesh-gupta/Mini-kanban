# Mini Kanban Board (React + redux + css)

This is a small Kanban board fully responsive app I built using **React, TypeScript, Redux Toolkit and CSS for Designing**.  
It’s meant to show how I work with modern React tools, state management, and drag-and-drop.  
For the UI, I used **CSS with the same color combination from my current project** so it looks familiar and consistent.

## What it can do

- Three columns: **Todo**, **In Progress**, and **Done**
- Add tasks with a title, description, priority, and due date
- Edit or delete existing tasks
- Drag and drop tasks between columns
- Filter tasks (all, high priority, due today)
- Sort tasks in each column (by due date or priority)
- Search tasks by title
- Progress bar that shows how many tasks are done
- Dark mode toggle
- Saves everything in **localStorage**, so tasks don’t disappear on refresh

---

## Technologies used-

- React + TypeScript
- Redux Toolkit for state
- Plain CSS for UI Design, theming, and also for responsiveness as no particular specifications are there.
- @hello-pangea/dnd for drag and drop
- date-fns for date formatting

## How to run it-

clone the repositary or download the zip folder
cd mini kanban
npm install
npm run dev
