import React, { useContext, useState } from 'react'
import taskContext from '../context/tasks/taskContext';
import { Edit3, Trash2, Calendar, Flag, CheckCircle, Clock } from 'lucide-react';

const TaskItem = (props) => {
    const { task, handleClick } = props;
    const { deleteTask } = useContext(taskContext);
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = async () => {
        setIsDeleting(true);
        try {
            await deleteTask(task._id);
        } catch (error) {
            console.error('Error deleting task:', error);
        } finally {
            setIsDeleting(false);
        }
    };

    const formatDate = (dateString) => {
        if (!dateString) return 'No due date';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    };

    const getPriorityColor = (priority) => {
        switch (priority) {
            case 'high':
                return 'bg-red-500/10 text-red-400 border-red-500/20';
            case 'medium':
                return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20';
            case 'low':
                return 'bg-green-500/10 text-green-400 border-green-500/20';
            default:
                return 'bg-slate-500/10 text-slate-400 border-slate-500/20';
        }
    };

    const getStatusColor = (status) => {
        return status === 'completed'
            ? 'bg-green-500/10 text-green-400'
            : 'bg-blue-500/10 text-blue-400';
    };

    return (
        <div className="group relative">
            <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800/50 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-slate-800/50 p-6 h-full flex flex-col">
                <div className="flex items-start justify-between mb-4">
                    <h3 className="text-lg font-semibold text-slate-100 line-clamp-2 flex-1 mr-2">
                        {task.title}
                    </h3>

                    <div className="flex items-center space-x-2 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-200">
                        <button
                            onClick={() => handleClick(task)}
                            className="p-2 bg-blue-600/50 hover:bg-blue-600 rounded-lg text-slate-300 hover:text-white transition-all duration-200"
                            title="Edit task"
                        >
                            <Edit3 className="w-4 h-4" />
                        </button>

                        <button
                            onClick={handleDelete}
                            disabled={isDeleting}
                            className="p-2 bg-red-600/50 hover:bg-red-600 rounded-lg text-red-400 hover:text-white transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                            title="Delete task"
                        >
                            {isDeleting ? (
                                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                            ) : (
                                <Trash2 className="w-4 h-4" />
                            )}
                        </button>
                    </div>
                </div>

                <div className="flex-1 mb-4">
                    <p className="text-slate-400 text-sm line-clamp-4 leading-relaxed">
                        {task.description}
                    </p>
                </div>

                <div className="space-y-3 pt-4 border-t border-slate-800/50">
                    <div className="flex items-center justify-between">
                        <div className={`flex items-center space-x-1 px-2 py-1 rounded-md text-xs border ${getPriorityColor(task.priority)}`}>
                            <Flag className="w-3 h-3" />
                            <span className="capitalize">{task.priority || 'Medium'}</span>
                        </div>

                        <div className={`flex items-center space-x-1 px-2 py-1 rounded-md text-xs ${getStatusColor(task.status)}`}>
                            {task.status === 'completed' ? (
                                <>
                                    <CheckCircle className="w-3 h-3" />
                                    <span>Completed</span>
                                </>
                            ) : (
                                <>
                                    <Clock className="w-3 h-3" />
                                    <span>Pending</span>
                                </>
                            )}
                        </div>
                    </div>

                    <div className="flex items-center space-x-1 text-slate-500 text-xs">
                        <Calendar className="w-3 h-3" />
                        <span>{formatDate(task.dueDate)}</span>
                    </div>
                </div>

                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/5 to-slate-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
            </div>
        </div>
    )
}

export default TaskItem;