import React, { useContext, useState } from 'react'
import taskContext from '../context/tasks/taskContext';
import { Plus, FileText, Calendar, Flag } from 'lucide-react';

const AddTask = () => {
    const { addTask } = useContext(taskContext);
    const [task, setTask] = useState({ title: "", description: "", dueDate: "", priority: "medium" });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleClick = async (e) => {
        e.preventDefault();
        e.preventDefault();
        setIsSubmitting(true);

        try {
            await addTask(task.title, task.description, task.dueDate, task.priority);
            setTask({ title: "", description: "", dueDate: "", priority: "medium" });
        } catch (error) {
            console.error('Error adding task:', error);
        } finally {
            setIsSubmitting(false);
        }
    }

    const handleChange = (e) => {
        setTask({ ...task, [e.target.name]: e.target.value })
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 min-h-screen bg-slate-950">
            <div className="max-w-2xl mx-auto">
                <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                        <Plus className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-3xl font-bold text-slate-100 mb-2">
                        Create New Task
                    </h1>
                    <p className="text-slate-400 text-sm">
                        Add a new task to stay organized and productive
                    </p>
                </div>

                <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800/50 rounded-2xl shadow-2xl p-8">
                    <form className="space-y-6">
                        <div className="space-y-2">
                            <label htmlFor="title" className="block text-sm font-medium text-slate-300">
                                Task Title
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <FileText className="h-5 w-5 text-slate-500" />
                                </div>
                                <input
                                    type="text"
                                    id="title"
                                    name="title"
                                    value={task.title}
                                    onChange={handleChange}
                                    required
                                    className="block w-full pl-10 pr-4 py-3 bg-slate-800/50 border border-slate-700/50 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                    placeholder="Enter task title"
                                />
                            </div>
                            <p className="text-xs text-slate-500">
                                At least 3 characters required
                            </p>
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="desc" className="block text-sm font-medium text-slate-300">
                                Description
                            </label>
                            <textarea
                                id="desc"
                                name="description"
                                value={task.description}
                                onChange={handleChange}
                                required
                                rows="5"
                                className="block w-full px-4 py-3 bg-slate-800/50 border border-slate-700/50 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
                                placeholder="Describe your task in detail..."
                            />
                            <p className="text-xs text-slate-500">
                                At least 5 characters required
                            </p>
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="dueDate" className="block text-sm font-medium text-slate-300">
                                Due Date
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Calendar className="h-5 w-5 text-slate-500" />
                                </div>
                                <input
                                    type="date"
                                    id="dueDate"
                                    name="dueDate"
                                    value={task.dueDate}
                                    onChange={handleChange}
                                    className="block w-full pl-10 pr-4 py-3 bg-slate-800/50 border border-slate-700/50 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                />
                            </div>
                            <p className="text-xs text-slate-500">
                                Optional - set a deadline for this task
                            </p>
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="priority" className="block text-sm font-medium text-slate-300">
                                Priority Level
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Flag className="h-5 w-5 text-slate-500" />
                                </div>
                                <select
                                    id="priority"
                                    name="priority"
                                    value={task.priority}
                                    onChange={handleChange}
                                    className="block w-full pl-10 pr-4 py-3 bg-slate-800/50 border border-slate-700/50 rounded-lg text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 appearance-none cursor-pointer"
                                >
                                    <option value="low" className="bg-slate-900">Low Priority</option>
                                    <option value="medium" className="bg-slate-900">Medium Priority</option>
                                    <option value="high" className="bg-slate-900">High Priority</option>
                                </select>
                            </div>
                            <p className="text-xs text-slate-500">
                                Set the importance level for this task
                            </p>
                        </div>

                        <div className="pt-4">
                            <button
                                type="submit"
                                onClick={handleClick}
                                disabled={task.title.length < 3 || task.description.length < 5 || isSubmitting}
                                className="w-full flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 px-4 rounded-lg shadow-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-900"
                            >
                                {isSubmitting ? (
                                    <>
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                        <span>Creating Task...</span>
                                    </>
                                ) : (
                                    <>
                                        <Plus className="w-5 h-5" />
                                        <span>Create Task</span>
                                    </>
                                )}
                            </button>
                        </div>

                        <div className="text-center">
                            {task.title.length > 0 && task.title.length < 3 && (
                                <p className="text-red-400 text-sm">Title needs at least 3 characters</p>
                            )}
                            {task.description.length > 0 && task.description.length < 5 && (
                                <p className="text-red-400 text-sm">Description needs at least 5 characters</p>
                            )}
                            {task.title.length >= 3 && task.description.length >= 5 && (
                                <p className="text-green-400 text-sm">Ready to create your task!</p>
                            )}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AddTask