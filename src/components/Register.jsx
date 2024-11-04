import React, { useContext, useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from './providers/AuthProvider';
import { getAuth, updateProfile } from 'firebase/auth'; 
import { FaEye, FaRegEyeSlash } from "react-icons/fa";
import swal from 'sweetalert';
import { Helmet } from 'react-helmet';

const Register = () => {
    const { createUser, logout } = useContext(AuthContext);
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const formRef = useRef(null);
    const navigate = useNavigate();

    const handleSignOut = () => {
        logout()
        .then()
        .catch()
    }

    const handleRegister = async (e) => { 
        e.preventDefault();
        const name = e.target.name.value;
        const email = e.target.email.value;
        const photoURL = e.target.photoURL.value;
        const password = e.target.password.value;
        
        // Password verification rules
        const hasUppercase = /[A-Z]/.test(password);
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
        const hasLength = password.length >= 6;

        if (!(hasUppercase && hasSpecialChar && hasLength)) {
            setError('Password must contain at least one uppercase letter, one special character, and be at least 6 characters long.');
            return;
        }
        try {
            // Create user in Firebase
            const result = await createUser(email, password);
            // Update user profile 
            await updateProfile(getAuth().currentUser, { displayName: name, photoURL: photoURL });
            swal("Registration successful!");
            handleSignOut();
            formRef.current.reset(); 
             navigate('/login');
        } catch (error) {
            console.error(error);
            setError(error.message);
        }
    }

    return (
        <>
            <style>
                {`
                @import url('https://fonts.googleapis.com/css2?family=PT+Serif:ital,wght@0,400;0,700;1,400;1,700&display=swap');

                .hero {
                    position: relative;
                    min-height: 100vh; /* Ensures full height */
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
                    display: flex;
                    flex-direction: column;
                    justify-content: center; /* Center content vertically */
                    align-items: center; /* Center content horizontally */
                    padding: 20px; /* Add padding */
                }

                .card {
                    border-radius: 12px;
                    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
                    background: #ffffff;
                    width: 100%;
                    max-width: 400px; /* Set a max width for the card */
                    margin: 0 auto; /* Center the card */
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

                @media (max-width: 600px) {
                    .hero-content {
                        padding: 10px; /* Reduce padding on smaller screens */
                    }

                    .card {
                        width: 90%; /* Use more width on smaller screens */
                    }
                }
                `}
            </style>
            <Helmet><title>TaskTrackr | Sign up</title></Helmet>
            <div className="hero font-serif bg-center bg-cover bg-[url('https://images.unsplash.com/photo-1683803063663-3b1f28d97297?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjh8fHByb2plY3QlMjBtYW5hZ2VtZW50fGVufDB8fDB8fHww')]">
                <div className='overlay'></div>
                <div className="hero-content">
                    <div className="text-center">
                        <h1 className="text-4xl mt-20  font-bold text-white">Join TaskTrackr!</h1>
                    </div>
                    <p className='text-white text-center font-semibold text-sm'>Become a part of TaskTrackr today and simplify your project management journey. Collaborate, track, and achieve your goals efficiently! 🚀</p>
                    <div className="card shadow-2xl">
                        <form onSubmit={handleRegister} ref={formRef} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-semibold">Name</span>
                                </label>
                                <input type="text" placeholder="Your name" name='name' className="input input-bordered" required />
                                <label className="label">
                                    <span className="label-text font-semibold">Email</span>
                                </label>
                                <input type="email" placeholder="Email" name='email' className="input input-bordered" required />
                                <label className="label">
                                    <span className="label-text font-semibold">Photo URL</span>
                                </label>
                                <input type="url" placeholder="Your photo URL" name='photoURL' className="input input-bordered" required />
                            </div>
                            <div className="form-control relative">
                                <label className="label">
                                    <span className="label-text font-semibold">Password</span>
                                </label>
                                <input type={showPassword ? "text" : "password"} placeholder="Password" name='password' className="input input-bordered" required />
                                <span className='absolute top-[50px] right-2 cursor-pointer' onClick={() => setShowPassword(!showPassword)}>
                                    {showPassword ? <FaEye /> : <FaRegEyeSlash />}
                                </span>
                            </div>
                            <div className="form-control mt-6">
                                <button className="btn  text-[#2a9d8f]">Sign up</button>
                                {error && <p className="text-red-500 mt-2">{error}</p>}
                            </div>
                        </form>
                        <p className='text-center pb-8'>Already have an account? Please <Link to="/login" className="text-blue-500 font-semibold hover:underline">Sign In</Link></p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Register;
