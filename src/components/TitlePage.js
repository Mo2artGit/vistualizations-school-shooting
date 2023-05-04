import React from 'react';
import bg from '../images/bg.jpg';

const Title = () => {
    return (
        <div className="flex flex-col h-screen justify-center items-center">
            <img src={bg} alt="school bus"/>
            <h1 className="mt-2 text-4xl font-bold text-gray-800">School Shooting in the U.S.</h1>
        </div>
    );
};

export default Title;