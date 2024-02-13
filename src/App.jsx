import { useState } from 'react'
import './App.css'
import {
 
  KeyboardSensor,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,

} from "@dnd-kit/core";
import { DndContext, closestCorners } from '@dnd-kit/core';
import Column from './components/Column/Column';
import { arrayMove,sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import { Input } from './components/Input/Input';
function App() {
 const[tasks,setTasks]= useState([
  // { id: 1, title: "Add tests to homepage" },
  // { id: 2, title: "Fix styling in about section" },
  // { id: 3, title: "Learn how to center a div" },
 ])

 const addTask = (title) => {
  setTasks((tasks) => [...tasks, { id: tasks.length + 1, title }]);
};


 const sensors = useSensors(
  useSensor(PointerSensor),
  useSensor(KeyboardSensor,
    useSensor(TouchSensor), {
    coordinateGetter: sortableKeyboardCoordinates,
  })
);

  
 const getTaskPos = (id) => tasks.findIndex((task) => task.id === id);

 const handleDragEnd = event => {
  const {active, over } = event;

  if (active.id === over.id) return;

  setTasks((tasks) => {
    const originalPos = getTaskPos(active.id);
    const newPos = getTaskPos(over.id);

    return arrayMove(tasks, originalPos, newPos);
  });
 }
  // URADITI DA SE TASKOVI BRISU I KAD SE REFRES DA OSTANU  (LOCAL STORAGE) I NPR. KAD SE KLINE NA CHECKBOX DA PROMENI POZADINU KAO COMPLETE

  return (
    <div className='App'>
          <h1>My Tasks ✅</h1>
          <Input onSubmit={addTask}/>
          <DndContext sensors={sensors} onDragEnd={handleDragEnd} collisionDetection={closestCorners}>
           <Column tasks={tasks}/>
          </DndContext>
    </div>
  )
}

export default App
