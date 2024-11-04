import React, { useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";

const Banner = () => {
    const [autoPlay, setAutoPlay] = useState(true);

    const handleSlideChange = (index) => {
        if (index === 3) {
            setAutoPlay(false);
        }
    };

    return (
        <div className="w-full">
            <style>
                {`
                @import url('https://fonts.googleapis.com/css2?family=PT+Serif:ital,wght@0,400;0,700;1,400;1,700&display=swap');

                .banner {
                    font-family: 'PT Serif', serif;
                }
                `}
            </style>

            <Carousel 
                autoPlay={autoPlay}
                infiniteLoop  
                interval={3000}
                showThumbs={false}  
                showStatus={false}  
                showIndicators={true}
                onChange={handleSlideChange} 
            >
                {/* Slide 1 - Project Overview */}
                <div className="relative banner">
                    <img className='w-full h-auto object-cover' src="https://images.unsplash.com/photo-1499914485622-a88fac536970?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bGFwdG9wfGVufDB8fDB8fHww" alt="Project Overview" />
                    <div className="absolute inset-0 bg-black bg-opacity-30 flex flex-col items-center justify-center p-4 md:p-8">
                        <h2 className="text-lg md:text-2xl lg:text-4xl font-bold text-white text-center">Project Overview</h2>
                        <p className="text-xs md:text-base lg:text-lg text-white text-center mt-2">Track project status, due dates, and overall progress in one unified dashboard.</p>
                    </div>
                </div>

                {/* Slide 2 - Task Organization */}
                <div className="relative banner">
                    <img className='w-full h-auto object-cover' src="https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDYyfHx8ZW58MHx8fHx8" alt="Task Organization" />
                    <div className="absolute inset-0 bg-black bg-opacity-30 flex flex-col items-center justify-center p-4 md:p-8">
                        <h2 className="text-lg md:text-2xl lg:text-4xl font-bold text-white text-center">Organize Tasks Effectively</h2>
                        <p className="text-xs md:text-base lg:text-lg text-white text-center mt-2">Easily view, add, and update tasks to keep your projects on track.</p>
                    </div>
                </div>

                {/* Slide 3 - Team Collaboration */}
                <div className="relative banner">
                    <img className='w-full h-auto object-cover' src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Y29sbGFib3JhdGlvbiUyMHByb2plY3R8ZW58MHx8fDB8fHww" alt="Team Collaboration" />
                    <div className="absolute inset-0 bg-black bg-opacity-30 flex flex-col items-center justify-center p-4 md:p-8">
                        <h2 className="text-lg md:text-2xl lg:text-4xl font-bold text-white text-center">Collaborate with Your Team</h2>
                        <p className="text-xs md:text-base lg:text-lg text-white text-center mt-2">Assign tasks, set priorities, and streamline communication within the project.</p>
                    </div>
                </div>

                {/* Slide 4 - Progress Tracking */}
                <div className="relative banner">
                    <img className='w-full h-auto object-cover' src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fHRpbWVsaW5lfGVufDB8fDB8fHww" alt="Progress Tracking" />
                    <div className="absolute inset-0 bg-black bg-opacity-30 flex flex-col items-center justify-center p-4 md:p-8">
                        <h2 className="text-lg md:text-2xl lg:text-4xl font-bold text-white text-center">Track Progress & Deadlines</h2>
                        <p className="text-xs md:text-base lg:text-lg text-white text-center mt-2">Stay updated with real-time status updates and Gantt chart views for easy tracking.</p>
                    </div>
                </div>
            </Carousel>
        </div>
    );
};

export default Banner;
