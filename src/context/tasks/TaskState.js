import TaskContext from "./taskContext";
import { useState } from "react";

const TaskState = (props) => {

    const [tasks, setTasks] = useState([])

    const getTasks = async () => {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/tasks/fetchalltasks`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            }
        })
        const json = await response.json();
        setTasks(json)
    }

    const addTask = async (title, description, dueDate, priority) => {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/tasks/addtask`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({ title, description, dueDate, priority })
        })
        const json = await response.json();
        setTasks(tasks.concat(json))
    }

    const deleteTask = async (id) => {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/tasks/deletetask/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            }
        })
        const json = response.json();
        console.log(json);

        setTasks(tasks.filter((task) => { return task._id !== id }))
    }

    const updateTask = async (id, title, description, dueDate, priority, status) => {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/tasks/updatetask/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({ title, description, dueDate, priority, status })
        })
        const json = response.json();
        console.log(json);

        for (let index = 0; index < tasks.length; index++) {
            const task = tasks[index];
            if (task._id === id) {
                tasks[index].title = title;
                tasks[index].description = description;
                tasks[index].dueDate = dueDate;
                tasks[index].priority = priority;
                tasks[index].status = status;
                break;
            }
        }
        setTasks(JSON.parse(JSON.stringify(tasks)))
    }

    return (
        <>
            <TaskContext.Provider value={{ tasks, addTask, deleteTask, updateTask, getTasks }}>
                {props.children}
            </TaskContext.Provider>
        </>
    )
}

export default TaskState;