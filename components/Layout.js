import React, { Fragment } from 'react';
import Head from 'next/head';

import Title from './Title';
import Graph1 from './Graph1';
import Graph2 from './Graph2';
import Graph3 from './Graph3';

const Layout = ({ children }) => {
    return (
        <Fragment>
            <Head>
                <title>My Single Page Application</title>
            </Head>
            <nav className="fixed bottom-0 w-full bg-gray-900 py-4">
                <ul className="flex justify-center space-x-8">
                    <li>
                        <a href="#title" className="text-white hover:text-gray-400">Title</a>
                    </li>
                    <li>
                        <a href="#component1" className="text-white hover:text-gray-400">Component 1</a>
                    </li>
                    <li>
                        <a href="#component2" className="text-white hover:text-gray-400">Component 2</a>
                    </li>
                    <li>
                        <a href="#component3" className="text-white hover:text-gray-400">Component 3</a>
                    </li>
                </ul>
            </nav>
            <main className="flex flex-col min-h-screen">
                <section id="title" className="flex-grow bg-gray-300 h-screen">
                    <Title />
                </section>
                <section id="component1" className="flex-grow bg-gray-100 h-screen">
                    <Graph1 />
                </section>
                <section id="component2" className="flex-grow bg-gray-200 h-screen">
                    <Graph2 />
                </section>
                <section id="component3" className="flex-grow bg-gray-300 h-screen">
                    <Graph3 />
                </section>
            </main>
        </Fragment>
    );
};

export default Layout;
