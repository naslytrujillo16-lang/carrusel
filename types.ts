export interface CarModel {
  id: number;
  make: string; // e.g. "Ferrari"
  modelNumber: string; // e.g. "458"
  tagline: string;
  color: string; // Hex code for dynamic SVG coloring
  secondaryColor: string;
  price: string;
  engine: string;
  speed: string;
  description: string;
}

export interface CarouselProps {
  cars: CarModel[];
}

export enum Direction {
  NEXT = 'NEXT',
  PREV = 'PREV'
}