import React, { useContext, useEffect, useState } from 'react'
import taskContext from '../context/tasks/taskContext';
import TaskItem from './TaskItem';
import { useNavigate } from 'react-router-dom';
import { Edit3, X, Save, Calendar, Flag, FileText } from 'lucide-react';

const Tasks = () => {
    let navigate = useNavigate();
    const { tasks, getTasks, updateTask } = useContext(taskContext);

    useEffect(() => {
        if (localStorage.getItem('token')) {
            getTasks();
        }
        else {
            navigate("/login")
        }
    }, [])

    const [task, setTask] = useState({ title: "", description: "", dueDate: "", priority: "medium", status: "pending" });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [filterStatus, setFilterStatus] = useState('all');
    const [filterPriority, setFilterPriority] = useState('all');

    const handleClick = (currentTask) => {
        setTask(currentTask);
        setIsModalOpen(true);
    }

    const onChange = (e) => {
        setTask({ ...task, [e.target.name]: e.target.value })
    }

    const editTask = (e) => {
        e.preventDefault();
        updateTask(task._id, task.title, task.description, task.dueDate, task.priority, task.status);
        setIsModalOpen(false);
    }

    const closeModal = () => {
        setIsModalOpen(false);
    }

    useEffect(() => {
        const handleEsc = (event) => {
            if (event.keyCode === 27) {
                closeModal();
            }
        };
        document.addEventListener('keydown', handleEsc);
        return () => {
            document.removeEventListener('keydown', handleEsc);
        };
    }, []);

    const filteredTasks = tasks.filter(task => {
        const statusMatch = filterStatus === 'all' || task.status === filterStatus;
        const priorityMatch = filterPriority === 'all' || task.priority === filterPriority;
        return statusMatch && priorityMatch;
    });

    return (
        <div className="min-h-screen bg-slate-950">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 -left-20 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl"></div>
                <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-slate-700/10 rounded-full blur-3xl"></div>
                <div className="absolute top-3/4 left-1/3 w-64 h-64 bg-blue-400/5 rounded-full blur-3xl"></div>
            </div>

            <div className="relative">
                {isModalOpen && (
                    <div className="fixed inset-0 z-50 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4">
                            <div
                                className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
                                onClick={closeModal}
                            ></div>

                            <div className="relative bg-slate-900/95 backdrop-blur-xl border border-slate-800/50 rounded-2xl shadow-2xl w-full max-w-md p-6 transform transition-all">
                                <div className="flex items-center justify-between mb-6">
                                    <div className="flex items-center space-x-3">
                                        <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center">
                                            <Edit3 className="w-5 h-5 text-white" />
                                        </div>
                                        <h2 className="text-xl font-semibold text-slate-100">
                                            Edit Task
                                        </h2>
                                    </div>
                                    <button
                                        onClick={closeModal}
                                        className="p-2 rounded-lg bg-slate-800/80 hover:bg-slate-700/80 text-slate-400 hover:text-slate-200 transition-colors duration-200"
                                    >
                                        <X className="w-5 h-5" />
                                    </button>
                                </div>

                                <form className="space-y-4">
                                    <div className="space-y-2">
                                        <label htmlFor="title" className="block text-sm font-medium text-slate-300">
                                            Title
                                        </label>
                                        <input
                                            type="text"
                                            id="title"
                                            name="title"
                                            value={task.title}
                                            onChange={onChange}
                                            required
                                            className="block w-full px-4 py-3 bg-slate-800/50 border border-slate-700/50 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                            placeholder="Enter task title"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label htmlFor="desc" className="block text-sm font-medium text-slate-300">
                                            Description
                                        </label>
                                        <textarea
                                            id="desc"
                                            name="description"
                                            value={task.description}
                                            onChange={onChange}
                                            required
                                            rows="4"
                                            className="block w-full px-4 py-3 bg-slate-800/50 border border-slate-700/50 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
                                            placeholder="Enter task description"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label htmlFor="dueDate" className="block text-sm font-medium text-slate-300">
                                            Due Date
                                        </label>
                                        <input
                                            type="date"
                                            id="dueDate"
                                            name="dueDate"
                                            value={task.dueDate}
                                            onChange={onChange}
                                            className="block w-full px-4 py-3 bg-slate-800/50 border border-slate-700/50 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label htmlFor="priority" className="block text-sm font-medium text-slate-300">
                                            Priority
                                        </label>
                                        <select
                                            id="priority"
                                            name="priority"
                                            value={task.priority}
                                            onChange={onChange}
                                            className="block w-full px-4 py-3 bg-slate-800/50 border border-slate-700/50 rounded-lg text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                        >
                                            <option value="low" className="bg-slate-900">Low</option>
                                            <option value="medium" className="bg-slate-900">Medium</option>
                                            <option value="high" className="bg-slate-900">High</option>
                                        </select>
                                    </div>

                                    <div className="space-y-2">
                                        <label htmlFor="status" className="block text-sm font-medium text-slate-300">
                                            Status
                                        </label>
                                        <select
                                            id="status"
                                            name="status"
                                            value={task.status}
                                            onChange={onChange}
                                            className="block w-full px-4 py-3 bg-slate-800/50 border border-slate-700/50 rounded-lg text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                        >
                                            <option value="pending" className="bg-slate-900">Pending</option>
                                            <option value="completed" className="bg-slate-900">Completed</option>
                                        </select>
                                    </div>
                                </form>

                                <div className="flex items-center justify-end space-x-3 mt-6 pt-4 border-t border-slate-800">
                                    <button
                                        onClick={closeModal}
                                        className="px-4 py-2 bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700/50 text-slate-300 hover:text-slate-100 font-medium rounded-lg transition-all duration-200"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={editTask}
                                        disabled={task.title.length < 3 || task.description.length < 5}
                                        className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-lg shadow-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        <Save className="w-4 h-4" />
                                        <span>Update Task</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="mb-8">
                        <h2 className="text-3xl font-bold text-slate-100 mb-6">
                            My Tasks
                        </h2>

                        <div className="flex flex-col sm:flex-row gap-4 mb-6">
                            <div className="flex-1">
                                <label className="block text-sm font-medium text-slate-300 mb-2">Filter by Status</label>
                                <select
                                    value={filterStatus}
                                    onChange={(e) => setFilterStatus(e.target.value)}
                                    className="w-full px-4 py-2 bg-slate-900/50 border border-slate-800/50 rounded-lg text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="all" className="bg-slate-900">All Tasks</option>
                                    <option value="pending" className="bg-slate-900">Pending</option>
                                    <option value="completed" className="bg-slate-900">Completed</option>
                                </select>
                            </div>

                            <div className="flex-1">
                                <label className="block text-sm font-medium text-slate-300 mb-2">Filter by Priority</label>
                                <select
                                    value={filterPriority}
                                    onChange={(e) => setFilterPriority(e.target.value)}
                                    className="w-full px-4 py-2 bg-slate-900/50 border border-slate-800/50 rounded-lg text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="all" className="bg-slate-900">All Priorities</option>
                                    <option value="low" className="bg-slate-900">Low</option>
                                    <option value="medium" className="bg-slate-900">Medium</option>
                                    <option value="high" className="bg-slate-900">High</option>
                                </select>
                            </div>
                        </div>

                        {filteredTasks.length === 0 && (
                            <div className="text-center py-12">
                                <div className="w-24 h-24 bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl flex items-center justify-center mx-auto mb-4 opacity-50">
                                    <FileText className="w-12 h-12 text-white" />
                                </div>
                                <p className="text-slate-400 text-lg">No tasks to display</p>
                                <p className="text-slate-500 text-sm mt-2">Create your first task to get started</p>
                            </div>
                        )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {filteredTasks.map((task) => {
                            return <TaskItem key={task._id} task={task} handleClick={handleClick} />
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Tasks