import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { LogIn, LogOut, Menu, X, CheckSquare, ListTodo, PlusSquare } from 'lucide-react'

const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handlelogout = () => {
        localStorage.removeItem('token')
        navigate('/login')
    }

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    }

    return (
        <nav className="relative bg-slate-950/95 backdrop-blur-lg border-b border-slate-800/50 shadow-xl sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center space-x-3 flex-shrink-0">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center shadow-lg">
                            <CheckSquare className="w-5 h-5 text-white" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-xl font-bold text-slate-100">
                                TaskFlow
                            </span>
                            <span className="text-xs text-slate-500 -mt-0.5">{(location.pathname === '/tasks' || location.pathname === '/create') ? 'Dashboard' : ''}</span>
                        </div>
                    </div>

                    {(location.pathname === '/tasks' || location.pathname === '/create') && (
                        <div className="hidden md:flex items-center space-x-2 flex-1 justify-center max-w-md">
                            <Link
                                to="/tasks"
                                className={`group flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${location.pathname === '/tasks'
                                    ? 'bg-slate-800/80 text-slate-100 shadow-md border border-slate-700/50'
                                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                                    }`}
                            >
                                <ListTodo className={`w-4 h-4 ${location.pathname === '/tasks' ? 'text-blue-400' : 'text-slate-500 group-hover:text-blue-400'}`} />
                                <span>My Tasks</span>
                            </Link>

                            <Link
                                to="/create"
                                className={`group flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${location.pathname === '/create'
                                    ? 'bg-slate-800/80 text-slate-100 shadow-md border border-slate-700/50'
                                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                                    }`}
                            >
                                <PlusSquare className={`w-4 h-4 ${location.pathname === '/create' ? 'text-blue-400' : 'text-slate-500 group-hover:text-blue-400'}`} />
                                <span>Create Task</span>
                            </Link>
                        </div>)}

                    {(location.pathname === "/tasks" || location.pathname === "/create") && (<div className="flex items-center space-x-3">
                        <div className="hidden md:block relative z-10">
                            {!localStorage.getItem('token') ? (
                                <Link
                                    to="/login"
                                    className="group relative inline-flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-medium shadow-lg transition-all duration-200"
                                >
                                    <LogIn className="w-4 h-4" />
                                    <span>Login</span>
                                </Link>
                            ) : (
                                <button
                                    onClick={handlelogout}
                                    className="group relative inline-flex items-center space-x-2 bg-slate-700 hover:bg-slate-600 text-slate-200 px-5 py-2 rounded-lg font-medium shadow-lg transition-all duration-200"
                                >
                                    <LogOut className="w-4 h-4" />
                                    <span>Logout</span>
                                </button>
                            )}
                        </div>

                        <button
                            onClick={toggleMenu}
                            className="md:hidden p-2 rounded-lg bg-slate-800/80 hover:bg-slate-700/80 transition-colors duration-200 relative z-10"
                        >
                            {isMenuOpen ? (
                                <X className="w-6 h-6 text-slate-200" />
                            ) : (
                                <Menu className="w-6 h-6 text-slate-200" />
                            )}
                        </button>
                    </div>)}
                </div>

                <div className={`md:hidden transition-all duration-300 ease-in-out ${isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                    } overflow-hidden`}>
                    {(location.pathname === "/tasks" || location.pathname === "/create") && (<div className="pt-4 pb-6 space-y-2">
                        <Link
                            to="/tasks"
                            onClick={() => setIsMenuOpen(false)}
                            className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${location.pathname === '/tasks'
                                ? 'bg-slate-800/80 text-slate-100 shadow-md border border-slate-700/50'
                                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                                }`}
                        >
                            <ListTodo className="w-4 h-4" />
                            <span>My Tasks</span>
                        </Link>

                        <Link
                            to="/create"
                            onClick={() => setIsMenuOpen(false)}
                            className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${location.pathname === '/create'
                                ? 'bg-slate-800/80 text-slate-100 shadow-md border border-slate-700/50'
                                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                                }`}
                        >
                            <PlusSquare className="w-4 h-4" />
                            <span>Create Task</span>
                        </Link>

                        <div className="pt-4 border-t border-slate-800">
                            {!localStorage.getItem('token') ? (
                                <Link
                                    to="/login"
                                    onClick={() => setIsMenuOpen(false)}
                                    className="flex items-center justify-center space-x-2 w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg font-medium shadow-lg transition-all duration-200"
                                >
                                    <LogIn className="w-5 h-5" />
                                    <span>Login</span>
                                </Link>
                            ) : (
                                <button
                                    onClick={() => {
                                        handlelogout();
                                        setIsMenuOpen(false);
                                    }}
                                    className="flex items-center justify-center space-x-2 w-full bg-slate-700 hover:bg-slate-600 text-slate-200 px-4 py-3 rounded-lg font-medium shadow-lg transition-all duration-200"
                                >
                                    <LogOut className="w-5 h-5" />
                                    <span>Logout</span>
                                </button>
                            )}
                        </div>
                    </div>)}
                </div>
            </div>

            <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
                <div className="absolute -top-4 -right-8 w-32 h-32 bg-blue-500/5 rounded-full blur-2xl"></div>
                <div className="absolute -bottom-4 -left-8 w-40 h-40 bg-slate-500/5 rounded-full blur-2xl"></div>
            </div>
        </nav>
    )
}

export default Navbar