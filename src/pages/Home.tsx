import "./Home.css";
import {
  IonButton,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonList,
  IonItemSliding,
  IonItem,
  IonCheckbox,
  IonLabel,
  IonItemOptions,
  IonItemOption,
  IonIcon,
} from "@ionic/react";
import { trash, add } from "ionicons/icons";
import { useDialog } from "../hooks/useDialog";
import { useTaskContext } from "../contexts/TaskContext";

const Home: React.FC = () => {
  const { showPrompt } = useDialog();
  const { tasks, addTask, toggleTaskCompletion, deleteTask } = useTaskContext();

  const promptToAddTask = async () => {
    try {
      const taskTitle = await showPrompt("Add Task", "Enter task name:");
      if (taskTitle.trim() !== "") {
        const newTask = {
          taskId: tasks.length + 1,
          title: taskTitle,
          completed: false,
        };
        addTask(newTask);
      }
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const handleDeleteTask = (id: number) => {
    deleteTask(id);
  };

  const incompleteTasks = tasks.filter((task) => !task.completed);
  const completeTasks = tasks.filter((task) => task.completed);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle className="labels">My Tasks</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonList>
          <IonToolbar color="accent">
            <IonTitle className="labels">Incomplete</IonTitle>
          </IonToolbar>
          {incompleteTasks.map((task) => (
            <div>
              {" "}
              <IonItemSliding key={task.taskId}>
                <IonItem>
                  <IonCheckbox
                    slot="end"
                    checked={task.completed}
                    onIonChange={() => {
                      toggleTaskCompletion(task);
                    }}
                  ></IonCheckbox>
                  <IonLabel>{task.title}</IonLabel>
                </IonItem>
                <IonItemOptions side="end">
                  <IonItemOption
                    color="danger"
                    onClick={() => handleDeleteTask(task.taskId)}
                  >
                    <IonIcon slot="start" icon={trash}>
                      <IonLabel>Delete</IonLabel>
                    </IonIcon>
                  </IonItemOption>
                </IonItemOptions>
              </IonItemSliding>
            </div>
          ))}
        </IonList>
        <IonList>
          <IonToolbar color="accent">
            <IonTitle className="labels">Complete</IonTitle>
          </IonToolbar>
          {completeTasks.map((task) => (
            <IonItemSliding key={task.taskId}>
              <IonItem>
                <IonCheckbox
                  color= "accent"
                  slot="end"
                  checked={task.completed}
                  onIonChange={() => {
                    toggleTaskCompletion(task);
                  }}
                ></IonCheckbox>
                <IonLabel>{task.title}</IonLabel>
              </IonItem>
              <IonItemOptions side="end">
                <IonItemOption
                  color="danger"
                  onClick={() => handleDeleteTask(task.taskId)}
                >
                  <IonIcon slot="start" icon={trash}></IonIcon>
                </IonItemOption>
              </IonItemOptions>
            </IonItemSliding>
          ))}
        </IonList>
      </IonContent>
      <div>
        <IonButton color="dark" onClick={promptToAddTask}>
          Add Task
        </IonButton>
      </div>
    </IonPage>
  );
};

export default Home;
