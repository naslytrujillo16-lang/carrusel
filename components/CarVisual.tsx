import React, { forwardRef } from 'react';
import { CarModel } from '../types';

interface CarVisualProps {
  car: CarModel;
  className?: string;
}

export interface CarRefs {
  container: HTMLDivElement | null;
  chassis: SVGGElement | null;
  frontWheel: SVGGElement | null;
  rearWheel: SVGGElement | null;
}

export const CarVisual = forwardRef<CarRefs, CarVisualProps>(({ car, className = '' }, ref) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const chassisRef = React.useRef<SVGGElement>(null);
  const frontWheelRef = React.useRef<SVGGElement>(null);
  const rearWheelRef = React.useRef<SVGGElement>(null);

  React.useImperativeHandle(ref, () => ({
    container: containerRef.current,
    chassis: chassisRef.current,
    frontWheel: frontWheelRef.current,
    rearWheel: rearWheelRef.current,
  }));

  return (
    <div ref={containerRef} className={`relative w-full max-w-3xl mx-auto aspect-[16/7] select-none ${className}`}>
      <svg
        viewBox="0 0 600 220"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        <defs>
          <filter id="shadow-blur" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="5" />
            <feOffset dx="0" dy="10" result="offsetblur" />
            <feComponentTransfer>
              <feFuncA type="linear" slope="0.3" /> 
            </feComponentTransfer>
            <feMerge>
              <feMergeNode />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <linearGradient id={`grad-${car.id}`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor={car.secondaryColor} />
            <stop offset="50%" stopColor={car.color} />
            <stop offset="100%" stopColor={car.secondaryColor} />
          </linearGradient>
          {/* Floor Shadow for Dark Mode */}
          <radialGradient id="floorShadow" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
            <stop offset="0%" stopColor="#000" stopOpacity="0.8"/>
            <stop offset="100%" stopColor="#000" stopOpacity="0"/>
          </radialGradient>
        </defs>

        {/* Floor Shadow Ellipse */}
        <ellipse cx="300" cy="190" rx="280" ry="20" fill="url(#floorShadow)" />

        {/* LAYER 1: CHASSIS (Fixed Body) */}
        <g ref={chassisRef} id="chassis">
           <path
            d="M50,130 C50,130 60,100 120,90 L240,85 L300,50 L460,55 L520,95 L560,100 C560,100 590,105 590,130 L590,160 L570,160 C570,160 565,130 515,130 C465,130 460,160 460,160 L180,160 C180,160 175,130 125,130 C75,130 70,160 70,160 L50,160 Z"
            fill={`url(#grad-${car.id})`}
            stroke="rgba(255,255,255,0.2)"
            strokeWidth="1"
          />
          {/* Windows - darker for stealth look */}
          <path d="M250,88 L305,55 L450,60 L510,95 Z" fill="#000" opacity="0.6" />
          {/* Headlight */}
          <path d="M560,105 L580,110 L560,120 Z" fill="#fbbf24" filter="url(#shadow-blur)" />
          {/* Tail light */}
          <path d="M50,115 L60,115 L60,125 L50,120 Z" fill="#ef4444" />
        </g>

        {/* LAYER 2: REAR WHEEL */}
        <g ref={rearWheelRef} id="wheel-rear" transform-origin="125 160">
           <circle cx="125" cy="160" r="32" fill="#050505" />
           <circle cx="125" cy="160" r="28" fill="none" stroke="#333" strokeWidth="2" />
           {/* Rims - stylized star shape */}
           <path d="M125,135 L125,185 M100,160 L150,160 M108,142 L142,178 M142,142 L108,178" stroke="#999" strokeWidth="3" strokeLinecap="round" />
           <circle cx="125" cy="160" r="8" fill="#e62e3d" /> {/* Red Caliper Center */}
        </g>

        {/* LAYER 3: FRONT WHEEL */}
        <g ref={frontWheelRef} id="wheel-front" transform-origin="515 160">
           <circle cx="515" cy="160" r="32" fill="#050505" />
           <circle cx="515" cy="160" r="28" fill="none" stroke="#333" strokeWidth="2" />
           {/* Rims */}
           <path d="M515,135 L515,185 M490,160 L540,160 M498,142 L532,178 M532,142 L498,178" stroke="#999" strokeWidth="3" strokeLinecap="round" />
           <circle cx="515" cy="160" r="8" fill="#e62e3d" /> {/* Red Caliper Center */}
        </g>
      </svg>
    </div>
  );
});

CarVisual.displayName = 'CarVisual';