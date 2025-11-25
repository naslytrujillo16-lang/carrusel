import React, { useState } from 'react';
import { Carousel } from './components/Carousel';
import { CARS_COLLECTION, CARS_MASTER } from './constants';

type Category = 'COLLECTION' | 'MASTER';

export default function App() {
  const [activeCategory, setActiveCategory] = useState<Category>('COLLECTION');

  // Select cars based on active category
  const currentCars = activeCategory === 'COLLECTION' ? CARS_COLLECTION : CARS_MASTER;

  return (
    <main className="min-h-screen w-full flex flex-col bg-[#383838] text-white overflow-hidden relative selection:bg-red-500 selection:text-white">
      
      {/* HEADER */}
      <header className="w-full flex justify-between items-center z-50">
        {/* Red Box Logo */}
        <div className="bg-[#e62e3d] px-8 py-6 text-white font-bold tracking-wider text-sm md:text-base shadow-lg uppercase">
          DISTRIMATACHOS
        </div>

        {/* Top Navigation */}
        <nav className="hidden md:flex gap-10 text-[11px] font-semibold tracking-widest uppercase pr-10">
          <button 
            onClick={() => setActiveCategory('COLLECTION')}
            className={`transition-all duration-300 border-b-2 pb-1 ${
              activeCategory === 'COLLECTION' 
                ? 'text-white border-white' 
                : 'text-gray-400 border-transparent hover:text-white'
            }`}
          >
            Colección
          </button>
          
          <button 
            onClick={() => setActiveCategory('MASTER')}
            className={`transition-all duration-300 border-b-2 pb-1 ${
              activeCategory === 'MASTER' 
                ? 'text-white border-white' 
                : 'text-gray-400 border-transparent hover:text-white'
            }`}
          >
            Master
          </button>

          <a href="#" className="text-gray-400 hover:text-white transition-colors border-b-2 border-transparent hover:border-white pb-1">
            Ver Más
          </a>
        </nav>
      </header>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 flex relative w-full justify-center items-center">
        
        {/* CENTER CAROUSEL */}
        <section className="w-full h-full flex flex-col justify-center items-center">
          {/* Key prop ensures component resets when category changes */}
          <Carousel key={activeCategory} cars={currentCars} />
        </section>

        {/* RIGHT SPACER / Toggle Mockup - ABSOLUTE POSITIONING TO PREVENT SHIFT */}
         <div className="absolute right-0 h-full w-24 hidden md:flex flex-col items-center justify-end pb-10 z-40 pointer-events-none">
            {/* Toggle Switch Mockup (Pointer events allowed on the button itself) */}
            <div className="w-10 h-5 bg-red-600 rounded-full relative cursor-pointer opacity-50 hover:opacity-100 transition-opacity pointer-events-auto">
              <div className="absolute right-0.5 top-0.5 w-4 h-4 bg-white rounded-full shadow-sm"></div>
            </div>
         </div>
      </div>
      
    </main>
  );
}