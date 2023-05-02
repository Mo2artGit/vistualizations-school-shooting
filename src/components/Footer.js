// Footer.js - Component for displaying the footer of the page

import React from 'react';

const Footer = () => {
    return (
        <div className="flex flex-col h-screen justify-center items-center bg-gray-100">
            <h2 className="text-4xl font-bold text-gray-800">Presented by</h2>
            <p className="text-lg font-medium text-gray-600">Ryan Aclan</p>
            <p className="text-lg mb-2 font-medium text-gray-600">Raymond Chen</p>
            <h3 className="text-3xl font-bold text-gray-800">Source</h3>
            <p className="text-lg font-medium text-gray-600">https://www.kaggle.com/datasets/cid007/school-shooting-in-us</p>
            <p className="text-lg font-medium text-gray-600">https://www.kaggle.com/datasets/sujaykapadnis/school-shooting-data?select=dataset.csv</p>
        </div>
    );
};

export default Footer;