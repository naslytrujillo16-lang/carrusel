import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { CarModel, Direction } from '../types';
import { CarVisual, CarRefs } from './CarVisual';

interface CarouselProps {
  cars: CarModel[];
}

export const Carousel: React.FC<CarouselProps> = ({ cars }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  
  const transitionState = useRef<{
    prevIndex: number | null;
    direction: Direction;
  }>({ prevIndex: null, direction: Direction.NEXT });

  const currentCarRef = useRef<CarRefs>(null);
  const nextCarRef = useRef<CarRefs>(null);
  
  // Ref for the wrapper that moves up/down
  const carWrapperRef = useRef<HTMLDivElement>(null);
  // Ref for the details panel
  const detailsPanelRef = useRef<HTMLDivElement>(null);

  const handleNext = () => {
    if (isAnimating || showDetails) return;
    transitionState.current = { prevIndex: currentIndex, direction: Direction.NEXT };
    const nextIndex = (currentIndex + 1) % cars.length;
    animateTransition(nextIndex, Direction.NEXT);
  };

  const handlePrev = () => {
    if (isAnimating || showDetails) return;
    transitionState.current = { prevIndex: currentIndex, direction: Direction.PREV };
    const nextIndex = (currentIndex - 1 + cars.length) % cars.length;
    animateTransition(nextIndex, Direction.PREV);
  };

  const animateTransition = (nextIndex: number, direction: Direction) => {
    setIsAnimating(true);
    setCurrentIndex(nextIndex);
  };

  // 1. ANIMATION: Slide Car Left/Right
  useEffect(() => {
    if (transitionState.current.prevIndex === null) return; 

    const dir = transitionState.current.direction;
    const tl = gsap.timeline({
      onComplete: () => {
        setIsAnimating(false);
        if (currentCarRef.current?.container) {
          gsap.set(currentCarRef.current.container, { clearProps: 'all' });
        }
      }
    });

    const incomingCar = currentCarRef.current; 
    const outgoingCar = nextCarRef.current;    

    if (!incomingCar?.container || !outgoingCar?.container) return;

    const startX = dir === Direction.NEXT ? '140%' : '-140%';
    const endX = dir === Direction.NEXT ? '-140%' : '140%';

    gsap.set(incomingCar.container, { x: startX, opacity: 1, scale: 0.9 });
    gsap.set(outgoingCar.container, { x: '0%', opacity: 1, scale: 1 });

    tl.to(outgoingCar.container, {
      x: endX,
      opacity: 0,
      scale: 0.9,
      duration: 0.7,
      ease: "power2.inOut"
    }, "start");

    tl.to([outgoingCar.frontWheel, outgoingCar.rearWheel], {
      rotation: dir === Direction.NEXT ? -360 : 360, 
      transformOrigin: "center center",
      duration: 0.7,
      ease: "power2.inOut"
    }, "start");

    tl.to(incomingCar.container, {
      x: '0%',
      opacity: 1,
      scale: 1,
      duration: 0.7,
      ease: "power2.inOut"
    }, "start");

     tl.fromTo([incomingCar.frontWheel, incomingCar.rearWheel], 
      { rotation: 0 },
      {
        rotation: dir === Direction.NEXT ? -360 : 360,
        transformOrigin: "center center",
        duration: 0.7,
        ease: "power2.inOut"
      }, "start");

  }, [currentIndex]);

  // 2. ANIMATION: Show/Hide Details (Lift Car)
  useEffect(() => {
    if (showDetails) {
      // Lift Car Higher (from -30px initial to -120px)
      gsap.to(carWrapperRef.current, {
        y: -120, 
        scale: 0.85,
        duration: 0.5,
        ease: "power3.out"
      });
      // Show Details
      gsap.fromTo(detailsPanelRef.current, 
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.4, delay: 0.2, ease: "power2.out" }
      );
    } else {
      // Drop Car back to resting position (-30px)
      gsap.to(carWrapperRef.current, {
        y: -30,
        scale: 1,
        duration: 0.5,
        ease: "power3.inOut"
      });
      // Hide Details
      gsap.to(detailsPanelRef.current, {
        opacity: 0,
        y: 50,
        duration: 0.3,
        ease: "power2.in"
      });
    }
  }, [showDetails]);


  const prevIndex = transitionState.current.prevIndex;
  const currentCar = cars[currentIndex];
  
  return (
    <div className="relative w-full h-[600px] flex items-center justify-center">
      
      {/* 0. DYNAMIC LEFT SIDEBAR (Stars) */}
      <aside className="absolute left-0 top-1/2 -translate-y-1/2 w-24 hidden md:flex flex-col items-center justify-center gap-6 z-40">
         {[...Array(5)].map((_, i) => (
           <Star 
             key={i} 
             size={20} 
             fill={currentCar.color} 
             stroke="none" 
             className="animate-pulse"
             style={{ 
               filter: `drop-shadow(0 0 8px ${currentCar.color})`,
               animationDelay: `${i * 0.2}s`,
               opacity: 0.8
             }}
           />
         ))}
      </aside>

      {/* OVERLAY: Click anywhere to close details */}
      {showDetails && (
        <div 
          onClick={() => setShowDetails(false)}
          className="absolute inset-0 z-40 bg-black/20 cursor-pointer backdrop-blur-[2px] transition-all"
        ></div>
      )}

      {/* 1. TEXT LAYER (Behind Car) */}
      <div className="absolute top-[5%] w-full text-center z-0 flex flex-col items-center justify-center pointer-events-none select-none">
        <h3 className={`text-gray-500 uppercase tracking-[0.2em] font-bold text-xl mb-[-20px] md:mb-[-40px] relative z-10 transition-opacity duration-300 ${showDetails ? 'opacity-0' : 'opacity-100'}`}>
          {currentCar.make}
        </h3>
        <h1 
          className="text-[25vw] md:text-[12rem] font-bold text-[#444] leading-none tracking-tighter transition-all duration-500 font-[Oswald]"
          style={{ 
            opacity: isAnimating || showDetails ? 0.3 : 1,
            transform: showDetails ? 'scale(0.9) translateY(-20px)' : 'scale(1)'
          }}
        >
          {currentCar.modelNumber}
        </h1>
      </div>

      {/* 2. CAR LAYER CONTAINER (Wraps cars to lift them up) */}
      <div 
        ref={carWrapperRef}
        className="relative w-full max-w-5xl h-64 md:h-80 flex items-center justify-center z-30 pointer-events-none -mt-10 md:-mt-16 transform translate-y-[-30px]"
      >
        <div className="relative w-full h-full flex items-center justify-center perspective-1000">
          
          {/* Ghost Car (Leaving) */}
          {isAnimating && prevIndex !== null && (
            <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
               <CarVisual ref={nextCarRef} car={cars[prevIndex]} />
            </div>
          )}

          {/* Active Car (Entering/Stationary) */}
          <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
             <CarVisual ref={currentCarRef} car={currentCar} />
          </div>

        </div>
      </div>

      {/* 3. DETAILS PANEL (Appears under car) */}
      <div 
        ref={detailsPanelRef}
        className="absolute top-[55%] left-0 w-full flex items-center justify-center z-30 pointer-events-none opacity-0"
      >
        <div className="max-w-2xl text-center px-6">
          <h2 className="text-3xl md:text-4xl font-[Oswald] font-bold text-white mb-2">
            {currentCar.make} <span style={{ color: currentCar.color }}>{currentCar.modelNumber}</span>
          </h2>
          <div className="flex justify-center gap-6 text-sm text-gray-400 mb-4 font-mono uppercase tracking-widest">
            <span>{currentCar.engine}</span>
            <span className="w-px h-4 bg-gray-600"></span>
            <span>{currentCar.speed}</span>
          </div>
          <p className="text-gray-300 text-sm md:text-base leading-relaxed mb-6 font-light max-w-lg mx-auto">
            {currentCar.description}
          </p>
          <div className="text-2xl font-bold text-white">
            {currentCar.price}
          </div>
        </div>
      </div>

      {/* 4. NAVIGATION ARROWS (Hidden when details open) */}
      <button 
        onClick={handlePrev}
        disabled={isAnimating || showDetails}
        className={`absolute left-4 md:left-24 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-gray-500/20 text-gray-300 hover:bg-gray-500/40 hover:text-white transition-all z-20 ${showDetails ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
      >
        <ChevronLeft size={24} />
      </button>

      <button 
        onClick={handleNext}
        disabled={isAnimating || showDetails}
        className={`absolute right-4 md:right-24 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-gray-500/20 text-gray-300 hover:bg-gray-500/40 hover:text-white transition-all z-20 ${showDetails ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
      >
        <ChevronRight size={24} />
      </button>

      {/* 5. ACTIONS & DETAILS (Bottom Buttons) */}
      <div className="relative z-50 flex flex-col items-center gap-8 mt-10 transition-transform duration-500"
           style={{ transform: showDetails ? 'translateY(120px) opacity(0)' : 'translateY(0) opacity(1)' }}>
        
        {/* Buttons - HORIZONTAL ROW */}
        <div className="flex flex-row gap-6 items-center">
          <button 
            onClick={() => setShowDetails(true)}
            className="px-8 py-3 rounded border border-gray-500 text-gray-200 uppercase text-xs font-bold tracking-widest hover:bg-white hover:text-black hover:border-white transition-all duration-300 min-w-[160px]"
          >
            Show Details
          </button>
          
          <button 
            className="relative overflow-hidden px-8 py-3 rounded-sm bg-[#e62e3d] text-white uppercase text-xs font-bold tracking-widest hover:bg-red-700 shadow-[0_0_20px_rgba(230,46,61,0.5)] transition-all duration-300 group animate-[pulse_3s_infinite] min-w-[160px]"
          >
             <span className="relative z-10 group-hover:tracking-widest transition-all duration-300">COMPRAR</span>
             {/* Shine effect */}
             <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-20 group-hover:animate-shine" />
          </button>
        </div>

        {/* Pagination Dots */}
        <div className="flex gap-3 mt-4">
          {cars.map((_, idx) => (
            <div 
              key={idx}
              className={`rounded-full border border-gray-600 transition-all duration-300 ${
                idx === currentIndex ? 'w-2 h-2 bg-white' : 'w-1.5 h-1.5 bg-transparent'
              }`}
            />
          ))}
        </div>
      </div>

    </div>
  );
};