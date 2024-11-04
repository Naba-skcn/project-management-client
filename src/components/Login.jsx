import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from './providers/AuthProvider';
import { AiFillGoogleCircle, AiFillGithub } from "react-icons/ai";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Helmet } from 'react-helmet';

const Login = () => {
    const { signInUser, signInWithGoogle, signInWithGithub } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;

        try {
            await signInUser(email, password);
            toast.success('Login successful!');
            e.target.reset();
            navigate('/');
        } catch (error) {
            console.error(error);
            toast.error('Login failed. Please check your email and password.');
        }
    };

    const handleGoogleSignIn = () => {
        signInWithGoogle()
            .then(() => {
                toast.success('Google Sign-In successful!');
                navigate('/');
            })
            .catch(error => {
                console.error(error);
                toast.error('Google Sign-In failed.');
            });
    };

    const handleGithubSignIn = () => {
        signInWithGithub()
            .then(() => {
                toast.success('GitHub Sign-In successful!');
                navigate('/');
            })
            .catch(error => {
                console.error(error);
                toast.error('GitHub Sign-In failed.');
            });
    };

    return (
        <>
            <style>
                {`
                @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');

                .hero {
                    position: relative;
                }

                .overlay {
                    background: rgba(0, 0, 0, 0.5);
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    z-index: 1;
                }

                .hero-content {
                    z-index: 2;
                    position: relative;
                }

                .card {
                    border-radius: 12px;
                    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
                    background: #ffffff;
                }

                .input, .btn {
                    border-radius: 8px;
                }

                .input {
                    padding: 10px;
                    font-size: 1rem;
                    border: 1px solid #ddd;
                }

                .btn {
                    font-size: 1rem;
                    padding: 10px;
                    background-color: #0d6efd;
                    color: #ffffff;
                    transition: background-color 0.3s ease;
                }

                .btn:hover {
                    background-color: #0b5ed7;
                }

                .auth-icons button:hover {
                    color: #0d6efd;
                }
                `}
            </style>
            <Helmet><title>TaskTrackr | Sign in</title></Helmet>
            <div className="hero font-serif min-h-screen bg-center bg-cover bg-[url('https://images.unsplash.com/photo-1683803063663-3b1f28d97297?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjh8fHByb2plY3QlMjBtYW5hZ2VtZW50fGVufDB8fDB8fHww')]">
                <div className="overlay"></div>
                <ToastContainer />
                <div className="hero-content mt-20 flex flex-col items-center px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-6">
                        <h1 className="text-3xl sm:text-4xl lg:text-4xl font-bold text-shadow-lg text-white">Welcome Back to TaskTrackr!</h1>
                        <p className="text-white font-semibold mt-2 text-sm sm:text-base lg:text-sm">Sign in to manage tasks, track progress, and collaborate with your team seamlessly.</p>
                    </div>
                    <div className="card shrink-0 w-full max-w-sm p-6 sm:p-8">
                        <form onSubmit={handleLogin} className="card-body">
                            <div className="form-control">
                                <label className="label font-semibold">Email</label>
                                <input type="email" placeholder="Your email" name="email" className="input input-bordered" required />
                            </div>
                            <div className="form-control mt-4">
                                <label className="label font-semibold">Password</label>
                                <input type="password" placeholder="Your password" name="password" className="input input-bordered" required />
                                <label className="label mt-2">
                                    <Link to="#" className="text-blue-500 hover:underline text-sm sm:text-base">Forgot password?</Link>
                                </label>
                            </div>
                            <div className="form-control mt-6">
                                <button type="submit" className="btn w-full">Sign In</button>
                            </div>
                        </form>
                        <p className="text-center font-semibold mt-4 text-sm sm:text-base">Or, sign in using...</p>
                        <div className="auth-icons flex gap-4 justify-center mt-2">
                            <button onClick={handleGoogleSignIn}><AiFillGoogleCircle className="text-blue-500 text-3xl cursor-pointer hover:text-blue-600" /></button>
                            <button onClick={handleGithubSignIn}><AiFillGithub className="text-blue-500 text-3xl cursor-pointer hover:text-blue-600" /></button>
                        </div>
                        <p className="text-center mt-4 text-sm sm:text-base">New here? <Link to="/register" className="text-blue-500 font-semibold hover:underline">Sign Up</Link></p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;
