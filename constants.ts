import { CarModel } from './types';

// Lista Original (Colección)
export const CARS_COLLECTION: CarModel[] = [
  {
    id: 1,
    make: "FERRARI",
    modelNumber: "458",
    tagline: "Pure Italian Excellence",
    color: "#dc2626", // Red-600
    secondaryColor: "#991b1b",
    price: "$280,000",
    engine: "4.5L V8",
    speed: "0-60 3.0s",
    description: "The last naturally aspirated V8. Razor-sharp handling meets iconic Italian styling in a symphony of speed."
  },
  {
    id: 2,
    make: "PORSCHE",
    modelNumber: "911",
    tagline: "Timeless Machine",
    color: "#eab308", // Yellow
    secondaryColor: "#a16207",
    price: "$140,000",
    engine: "3.0L Twin-Turbo",
    speed: "0-60 3.2s",
    description: "The benchmark for sports cars. Perfectly balanced engineering designed for both the track and the daily drive."
  },
  {
    id: 3,
    make: "LAMBO",
    modelNumber: "SVJ",
    tagline: "Raging Bull",
    color: "#22c55e", // Green
    secondaryColor: "#15803d",
    price: "$517,000",
    engine: "6.5L V12",
    speed: "0-60 2.8s",
    description: "Aerodinamica Lamborghini Attiva. A brutal expression of power and aggressive aerodynamics."
  },
  {
    id: 4,
    make: "TESLA",
    modelNumber: "P100",
    tagline: "Electric Future",
    color: "#3b82f6", // Blue
    secondaryColor: "#1e3a8a",
    price: "$110,000",
    engine: "Dual Electric",
    speed: "0-60 1.99s",
    description: "Instant torque and silent speed. The future of automotive performance with cutting-edge autopilot tech."
  }
];

// Nueva Lista (Master)
export const CARS_MASTER: CarModel[] = [
  {
    id: 101,
    make: "MCLAREN",
    modelNumber: "720S",
    tagline: "Relentless Performance",
    color: "#f97316", // Orange-500
    secondaryColor: "#c2410c",
    price: "$310,000",
    engine: "4.0L V8 Twin-Turbo",
    speed: "0-60 2.8s",
    description: "A force of nature. Built around a carbon fibre Monocage II, offering extreme lightness and incredible strength."
  },
  {
    id: 102,
    make: "BUGATTI",
    modelNumber: "CHIRON",
    tagline: "Breaking Limits",
    color: "#2563eb", // Blue-600
    secondaryColor: "#1e40af",
    price: "$3,000,000",
    engine: "8.0L W16 Quad-Turbo",
    speed: "0-60 2.3s",
    description: "The fastest, most powerful, and exclusive production super sports car in BUGATTI's history."
  },
  {
    id: 103,
    make: "ASTON",
    modelNumber: "VALKYRIE",
    tagline: "F1 for the Road",
    color: "#14b8a6", // Teal-500
    secondaryColor: "#0f766e",
    price: "$3,200,000",
    engine: "6.5L V12 Hybrid",
    speed: "0-60 2.5s",
    description: "An incredibly special car with an otherworldly performance, developed in partnership with Red Bull Racing."
  },
  {
    id: 104,
    make: "KOENIGSEGG",
    modelNumber: "JESKO",
    tagline: "Megacar",
    color: "#e5e7eb", // Gray-200 (Whiteish)
    secondaryColor: "#9ca3af",
    price: "$3,000,000",
    engine: "5.0L V8 Twin-Turbo",
    speed: "0-60 2.5s",
    description: "The ultimate track weapon. Features the world's lightest V8 crankshaft and a 9-speed Light Speed Transmission."
  }
];