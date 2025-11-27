import React, { useState, useContext } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, LogIn as LoginIcon, UserPlus, Eye, EyeOff } from 'lucide-react';
import authContext from '../context/auth/authContext';

const LogIn = () => {
    let navigate = useNavigate();
    const { login } = useContext(authContext);
    const [credentials, setCredentials] = useState({ email: "", password: "" })
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        const result = await login(credentials.email, credentials.password);

        if (result.success) {
            navigate('/tasks');
        } else {
            setError(result.error);
        }

        setIsLoading(false);
    }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
        if (error) setError("");
    }

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    }

    return (
        <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4 py-8">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 -left-20 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl"></div>
                <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-slate-700/10 rounded-full blur-3xl"></div>
                <div className="absolute top-3/4 left-1/3 w-64 h-64 bg-blue-400/5 rounded-full blur-3xl"></div>
            </div>

            <div className="relative w-full max-w-md">
                <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800/50 rounded-2xl shadow-2xl p-8">
                    <div className="text-center mb-8">
                        <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                            <LoginIcon className="w-8 h-8 text-white" />
                        </div>
                        <h2 className="text-3xl font-bold text-slate-100 mb-2">
                            Welcome Back
                        </h2>
                        <p className="text-slate-400 text-sm">
                            Sign in to your account to continue
                        </p>
                    </div>

                    {error && (
                        <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                            <p className="text-red-400 text-sm text-center">{error}</p>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <label htmlFor="email" className="block text-sm font-medium text-slate-300">
                                Email Address
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Mail className="h-5 w-5 text-slate-500" />
                                </div>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={credentials.email}
                                    onChange={onChange}
                                    required
                                    className="block w-full pl-10 pr-4 py-3 bg-slate-800/50 border border-slate-700/50 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                    placeholder="Enter your email"
                                />
                            </div>
                            <p className="text-xs text-slate-500 mt-1">
                                We'll never share your email with anyone else.
                            </p>
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="password" className="block text-sm font-medium text-slate-300">
                                Password
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock className="h-5 w-5 text-slate-500" />
                                </div>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    id="password"
                                    name="password"
                                    value={credentials.password}
                                    onChange={onChange}
                                    required
                                    className="block w-full pl-10 pr-12 py-3 bg-slate-800/50 border border-slate-700/50 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                    placeholder="Enter your password"
                                />
                                <button
                                    type="button"
                                    onClick={togglePasswordVisibility}
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-500 hover:text-slate-300 transition-colors duration-200"
                                >
                                    {showPassword ? (
                                        <EyeOff className="h-5 w-5" />
                                    ) : (
                                        <Eye className="h-5 w-5" />
                                    )}
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 px-4 rounded-lg shadow-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-900"
                        >
                            {isLoading ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                    <span>Signing In...</span>
                                </>
                            ) : (
                                <>
                                    <LoginIcon className="w-5 h-5" />
                                    <span>Sign In</span>
                                </>
                            )}
                        </button>
                    </form>

                    <div className="mt-8 text-center">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-slate-800"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-4 bg-slate-900/50 text-slate-500">Don't have an account?</span>
                            </div>
                        </div>

                        <Link
                            to="/signup"
                            className="mt-4 w-full flex items-center justify-center space-x-2 bg-slate-800/50 hover:bg-slate-700/50 border border-slate-700/50 text-slate-300 font-medium py-3 px-4 rounded-lg transition-all duration-300 group"
                        >
                            <UserPlus className="w-5 h-5 text-blue-400 group-hover:text-blue-300 transition-colors duration-200" />
                            <span>Create New Account</span>
                        </Link>
                    </div>
                </div>

                <div className="absolute -top-4 -left-4 w-8 h-8 bg-blue-400/5 rounded-full blur-sm"></div>
                <div className="absolute -bottom-4 -right-4 w-12 h-12 bg-slate-400/5 rounded-full blur-sm"></div>
            </div>
        </div>
    )
}

export default LogIn