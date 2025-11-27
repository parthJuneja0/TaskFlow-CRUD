import React from 'react';
import { Link } from 'react-router-dom';
import { LogIn, CheckSquare, Plus, Edit3, Shield, Zap, Globe, ArrowRight } from 'lucide-react';

const Home = () => {
    return (
        <div className="min-h-screen bg-slate-950">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 -left-20 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl"></div>
                <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-slate-700/10 rounded-full blur-3xl"></div>
                <div className="absolute top-3/4 left-1/3 w-64 h-64 bg-blue-400/5 rounded-full blur-3xl"></div>
            </div>

            <div className="relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
                    <div className="text-center">
                        <div className="w-24 h-24 bg-gradient-to-br from-blue-600 to-blue-800 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-2xl">
                            <CheckSquare className="w-12 h-12 text-white" />
                        </div>

                        <h1 className="text-5xl md:text-7xl font-bold mb-6">
                            <span className="text-slate-100">
                                TaskFlow
                            </span>
                        </h1>

                        <p className="text-xl md:text-2xl text-slate-300 mb-8 max-w-3xl mx-auto leading-relaxed">
                            Your ultimate task management solution for staying organized and productive.
                            <span className="text-blue-400"> Plan, track, and accomplish</span> your goals effortlessly.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
                            <Link
                                to="/login"
                                className="group flex items-center space-x-3 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-2xl transition-all duration-300"
                            >
                                <LogIn className="w-6 h-6" />
                                <span>Get Started</span>
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
                            </Link>

                            <Link
                                to="/signup"
                                className="flex items-center space-x-3 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 px-8 py-4 rounded-xl font-medium text-lg transition-all duration-300"
                            >
                                <span>Create Account</span>
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-100 mb-4">
                            Everything You Need
                        </h2>
                        <p className="text-slate-400 text-lg max-w-2xl mx-auto">
                            Powerful features designed to make task management simple and effective
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <div className="group bg-slate-900/50 backdrop-blur-xl border border-slate-800/50 rounded-2xl p-8 hover:bg-slate-800/50 transition-all duration-300">
                            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-200">
                                <Plus className="w-6 h-6 text-white" />
                            </div>
                            <h3 className="text-xl font-semibold text-slate-100 mb-3">Quick Task Creation</h3>
                            <p className="text-slate-400 leading-relaxed">
                                Instantly create tasks with title, description, due date, and priority. Get organized in seconds.
                            </p>
                        </div>

                        <div className="group bg-slate-900/50 backdrop-blur-xl border border-slate-800/50 rounded-2xl p-8 hover:bg-slate-800/50 transition-all duration-300">
                            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-200">
                                <Edit3 className="w-6 h-6 text-white" />
                            </div>
                            <h3 className="text-xl font-semibold text-slate-100 mb-3">Smart Organization</h3>
                            <p className="text-slate-400 leading-relaxed">
                                Filter by status and priority. Update tasks on the go. Keep everything under control.
                            </p>
                        </div>

                        <div className="group bg-slate-900/50 backdrop-blur-xl border border-slate-800/50 rounded-2xl p-8 hover:bg-slate-800/50 transition-all duration-300">
                            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-200">
                                <Shield className="w-6 h-6 text-white" />
                            </div>
                            <h3 className="text-xl font-semibold text-slate-100 mb-3">Secure & Private</h3>
                            <p className="text-slate-400 leading-relaxed">
                                Your tasks are protected with industry-standard security. Your data remains yours alone.
                            </p>
                        </div>

                        <div className="group bg-slate-900/50 backdrop-blur-xl border border-slate-800/50 rounded-2xl p-8 hover:bg-slate-800/50 transition-all duration-300">
                            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-200">
                                <Zap className="w-6 h-6 text-white" />
                            </div>
                            <h3 className="text-xl font-semibold text-slate-100 mb-3">Lightning Fast</h3>
                            <p className="text-slate-400 leading-relaxed">
                                Built for speed and performance. Create, edit, and manage thousands of tasks instantly.
                            </p>
                        </div>

                        <div className="group bg-slate-900/50 backdrop-blur-xl border border-slate-800/50 rounded-2xl p-8 hover:bg-slate-800/50 transition-all duration-300">
                            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-200">
                                <Globe className="w-6 h-6 text-white" />
                            </div>
                            <h3 className="text-xl font-semibold text-slate-100 mb-3">Access Anywhere</h3>
                            <p className="text-slate-400 leading-relaxed">
                                Cloud-based storage means your tasks are available wherever you are, on any device.
                            </p>
                        </div>

                        <div className="group bg-slate-900/50 backdrop-blur-xl border border-slate-800/50 rounded-2xl p-8 hover:bg-slate-800/50 transition-all duration-300">
                            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-200">
                                <CheckSquare className="w-6 h-6 text-white" />
                            </div>
                            <h3 className="text-xl font-semibold text-slate-100 mb-3">Priority Management</h3>
                            <p className="text-slate-400 leading-relaxed">
                                Set priorities and due dates to focus on what matters most. Never miss a deadline.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
                    <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800/50 rounded-3xl p-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-100 mb-6">
                            Ready to Get Productive?
                        </h2>
                        <p className="text-slate-300 text-lg mb-8 max-w-2xl mx-auto">
                            Join thousands of users who have transformed their productivity with TaskFlow.
                            Start your journey today.
                        </p>
                        <Link
                            to="/login"
                            className="inline-flex items-center space-x-3 bg-blue-600 hover:bg-blue-700 text-white px-10 py-4 rounded-xl font-semibold text-lg shadow-2xl transition-all duration-300"
                        >
                            <LogIn className="w-6 h-6" />
                            <span>Start Managing Tasks</span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;