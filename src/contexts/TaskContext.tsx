import React, { createContext, useContext } from "react";

export interface Task {
  taskId: number;
  title: string;
  completed: boolean;
}

export interface TaskContextProps {
  tasks: Task[];
  getTasks: () => void;
  addTask: (task: Task) => void;
  toggleTaskCompletion: (task: Task) => void;
  updateTask: (task: Task) => void;
  deleteTask: (id: number) => void;
}

const TaskContext = createContext<TaskContextProps>({
  tasks: [],
  getTasks: () => {},
  addTask: () => {},
  updateTask: () => {},
  toggleTaskCompletion: () => {},
  deleteTask: () => {},
});

export const useTaskContext = () => useContext(TaskContext);

export default TaskContext;
