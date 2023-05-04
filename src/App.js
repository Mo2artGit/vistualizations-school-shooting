import React from 'react';
import './App.css';
import TitlePage from './components/TitlePage';
import Vis1 from './components/Vis1';
import Vis2 from './components/Vis2';
import Vis3 from './components/Vis3';
import Footer from './components/Footer';
import { Link } from 'react-scroll';

const App = () => {

  return (
    <div className="app">
      <nav className="fixed bottom-0 w-full bg-gray-800 py-4">
        <ul className="flex justify-center space-x-8">
          <li>
            <Link to="title" smooth={true} duration={500} className="text-white hover:text-gray-400 cursor-pointer">Introduction</Link>
          </li>
          <li>
            <Link to="component1" smooth={true} duration={500} className="text-white hover:text-gray-400 cursor-pointer">1</Link>
          </li>
          <li>
            <Link to="component2" smooth={true} duration={500} className="text-white hover:text-gray-400 cursor-pointer">2</Link>
          </li>
          <li>
            <Link to="component3" smooth={true} duration={500} className="text-white hover:text-gray-400 cursor-pointer">3</Link>
          </li>
          <li>
            <Link to="footer" smooth={true} duration={500} className="text-white hover:text-gray-400 cursor-pointer">Source</Link>
          </li>
        </ul>
      </nav>
      <main className="flex flex-col min-h-screen">
        <section id="title" className="flex-grow bg-gray-200 h-screen">
          <TitlePage />
        </section>
        <section id="component1" className="flex-grow bg-gray-100 h-screen">
          <Vis1 />
        </section>
        <section id="component2" className="flex-grow bg-gray-200 h-screen">
          <Vis2 />
        </section>
        <section id="component3" className="flex-grow bg-gray-300 h-screen">
          <Vis3 />
        </section>
        <section id="footer" className="flex-grow bg-gray-100 h-screen">
          <Footer />
        </section>
      </main>
    </div>
  );
};

export default App;
