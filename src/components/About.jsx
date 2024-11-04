import React from 'react';

const AboutUs = () => {
    return (
        <div className="bg-gray-100 font-serif p-8 md:p-16">
            <div className="max-w-5xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-6">About TaskTrackr</h2>
                <p className="text-lg md:text-xl text-gray-700 text-center mb-4">
                    TaskTrackr is your ultimate project management solution, designed to help teams collaborate effectively and track progress seamlessly.
                </p>
                <p className="text-lg md:text-xl text-gray-700 text-center mb-8">
                    Our mission is to simplify project management, making it accessible and efficient for everyone, from startups to established enterprises.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-white shadow-md rounded-lg p-6">
                        <h3 className="text-2xl font-semibold mb-2">Our Vision</h3>
                        <p className="text-gray-600">
                            We envision a world where teams can work together effortlessly, breaking down barriers to collaboration and achieving their goals.
                        </p>
                    </div>
                    <div className="bg-white shadow-md rounded-lg p-6">
                        <h3 className="text-2xl font-semibold mb-2">Our Values</h3>
                        <p className="text-gray-600">
                            At TaskTrackr, we prioritize Innovation, Collaboration, and Integrity. We believe in fostering an inclusive environment that empowers teams to succeed.
                        </p>
                    </div>
                </div>
                <div className="mt-10 text-center">
                    <h3 className="text-2xl font-semibold mb-2">Join Our Community!</h3>
                    <p className="text-gray-600 mb-4">
                        Become a part of the TaskTrackr community and streamline your project management processes. Reach out to us to learn more about how we can help you.
                    </p>
                    <a href="/contact" className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300">
                        Contact Us
                    </a>
                </div>
            </div>
        </div>
    );
};

export default AboutUs;
