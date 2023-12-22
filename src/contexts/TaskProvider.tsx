import React, { useState, useEffect } from "react";
import axios, { AxiosError } from "axios";
import TaskContext from "./TaskContext";
import { Task } from "./TaskContext";

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    refreshTasks();
  }, []);

  const getTasks = () => {
    return axios
      .get("http://localhost:3000/api/tasks/")
      .then((response) => {
        setTasks(response.data);
      })
      .catch((error: AxiosError) => {
        console.error("Error fetching tasks:", error);
      });
  };

  const refreshTasks = () => {
    return axios.get("http://localhost:3000/api/tasks").then((response) => {
      setTasks(response.data);
    });
  };

  const addTask = (task: Task) => {
    axios
      .post("http://localhost:3000/api/tasks/", {
        title: task.title,
        completed: task.completed,
      })
      .then((response) => {
        refreshTasks();
        return new Promise((resolve) => resolve(response.data));
      })
      .catch((error: AxiosError) => {
        console.error("Error adding task:", error);
      });
  };

  const updateTask = (task: Task) => {
    return axios.put("http://localhost:3000/api/tasks/" + task.taskId, task);
  };
  const toggleTaskCompletion = async (task: Task) => {
    const updatedTask = { ...task, completed: !task.completed };
    await updateTask(updatedTask);
    await refreshTasks();
  };
  const deleteTask = (id: number) => {
    return axios
      .delete(`http://localhost:3000/api/tasks/${id}`)
      .then(refreshTasks)
      .catch((error) => {
        console.error("Error deleting task:", error);
      });
  };

  return (
    <TaskContext.Provider
      value={{ tasks, getTasks, toggleTaskCompletion, addTask, updateTask, deleteTask }}
    >
      {children}
    </TaskContext.Provider>
  );
};