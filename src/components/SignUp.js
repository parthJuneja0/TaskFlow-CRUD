import React, { useState, useContext } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, UserPlus, Eye, EyeOff, User, LogIn as LoginIcon, AlertCircle, CheckCircle } from 'lucide-react';
import authContext from '../context/auth/authContext';
import { validatePassword, getPasswordStrength } from '../utils/passwordValidator';

const SignUp = () => {
    let navigate = useNavigate();
    const { signup } = useContext(authContext);
    const [credentials, setCredentials] = useState({ name: "", email: "", password: "" })
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [passwordErrors, setPasswordErrors] = useState([]);
    const [passwordStrength, setPasswordStrength] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        const validation = validatePassword(credentials.password);
        if (!validation.isValid) {
            setError("Please fix password requirements");
            setPasswordErrors(validation.errors);
            setIsLoading(false);
            return;
        }

        const result = await signup(credentials.name, credentials.email, credentials.password);

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

        if (e.target.name === 'password') {
            const validation = validatePassword(e.target.value);
            setPasswordErrors(validation.errors);
            if (e.target.value.length > 0) {
                setPasswordStrength(getPasswordStrength(e.target.value));
            } else {
                setPasswordStrength(null);
            }
        }
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
                            <UserPlus className="w-8 h-8 text-white" />
                        </div>
                        <h2 className="text-3xl font-bold text-slate-100 mb-2">
                            Create Account
                        </h2>
                        <p className="text-slate-400 text-sm">
                            Join us today and get started
                        </p>
                    </div>

                    {error && (
                        <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                            <p className="text-red-400 text-sm text-center">{error}</p>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <label htmlFor="name" className="block text-sm font-medium text-slate-300">
                                Full Name
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <User className="h-5 w-5 text-slate-500" />
                                </div>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={credentials.name}
                                    onChange={onChange}
                                    required
                                    className="block w-full pl-10 pr-4 py-3 bg-slate-800/50 border border-slate-700/50 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                    placeholder="Enter your full name"
                                />
                            </div>
                        </div>

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
                                    placeholder="Create a secure password"
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

                            {passwordStrength && (
                                <div className="mt-2">
                                    <div className="flex items-center justify-between mb-1">
                                        <span className="text-xs text-slate-400">Password Strength</span>
                                        <span className={`text-xs font-medium ${passwordStrength.color === 'red' ? 'text-red-400' :
                                            passwordStrength.color === 'yellow' ? 'text-yellow-400' :
                                                'text-green-400'
                                            }`}>
                                            {passwordStrength.text}
                                        </span>
                                    </div>
                                    <div className="w-full bg-slate-700/50 rounded-full h-1.5">
                                        <div
                                            className={`h-1.5 rounded-full transition-all duration-300 ${passwordStrength.color === 'red' ? 'bg-red-500 w-1/3' :
                                                passwordStrength.color === 'yellow' ? 'bg-yellow-500 w-2/3' :
                                                    'bg-green-500 w-full'
                                                }`}
                                        />
                                    </div>
                                </div>
                            )}

                            {credentials.password.length > 0 && (
                                <div className="mt-3 space-y-1.5">
                                    <p className="text-xs text-slate-400 font-medium">Password Requirements:</p>
                                    <div className="space-y-1">
                                        {[
                                            { text: "At least 8 characters", valid: credentials.password.length >= 8 },
                                            { text: "One uppercase letter", valid: /[A-Z]/.test(credentials.password) },
                                            { text: "One lowercase letter", valid: /[a-z]/.test(credentials.password) },
                                            { text: "One number", valid: /[0-9]/.test(credentials.password) },
                                            { text: "One special character", valid: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(credentials.password) }
                                        ].map((requirement, index) => (
                                            <div key={index} className="flex items-center space-x-2">
                                                {requirement.valid ? (
                                                    <CheckCircle className="w-3.5 h-3.5 text-green-400 flex-shrink-0" />
                                                ) : (
                                                    <AlertCircle className="w-3.5 h-3.5 text-slate-500 flex-shrink-0" />
                                                )}
                                                <span className={`text-xs ${requirement.valid ? 'text-green-400' : 'text-slate-500'}`}>
                                                    {requirement.text}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading || passwordErrors.length > 0}
                            className="w-full flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 px-4 rounded-lg shadow-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-900"
                        >
                            {isLoading ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                    <span>Creating Account...</span>
                                </>
                            ) : (
                                <>
                                    <UserPlus className="w-5 h-5" />
                                    <span>Create Account</span>
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
                                <span className="px-4 bg-slate-900/50 text-slate-500">Already have an account?</span>
                            </div>
                        </div>

                        <Link
                            to="/login"
                            className="mt-4 w-full flex items-center justify-center space-x-2 bg-slate-800/50 hover:bg-slate-700/50 border border-slate-700/50 text-slate-300 font-medium py-3 px-4 rounded-lg transition-all duration-300 group"
                        >
                            <LoginIcon className="w-5 h-5 text-blue-400 group-hover:text-blue-300 transition-colors duration-200" />
                            <span>Sign In Instead</span>
                        </Link>
                    </div>
                </div>

                <div className="absolute -top-4 -left-4 w-8 h-8 bg-blue-400/5 rounded-full blur-sm"></div>
                <div className="absolute -bottom-4 -right-4 w-12 h-12 bg-slate-400/5 rounded-full blur-sm"></div>
            </div>
        </div>
    )
}

export default SignUp