
export interface PortfolioImage {
  id: number;
  src: string;
  alt: string;
  category: "fashion" | "wedding" | "portrait";
  aspect: "tall" | "wide" | "square";
}


export const servicePackages: ServicePackage[] = [
  {
    id: "standard",
    name: "Standard",
    price: 250,
    currency: "€",
    features: [
      "Ședință de 2 ore",
      "1 locație",
      "30 fotografii editate",
      "Galerie online",
      "Livrare în 5 zile lucrătoare",
    ],
    highlighted: false,
  },
  {
    id: "premium",
    name: "Premium",
    price: 500,
    currency: "€",
    features: [
      "Ședință de 4 ore",
      "2 locații",
      "80 fotografii editate",
      "Galerie online + printuri",
      "Consultanță vestimentară",
      "Livrare în 3 zile lucrătoare",
    ],
    highlighted: true,
  },
  {
    id: "editorial",
    name: "Editorial",
    price: 950,
    currency: "€",
    features: [
      "Ședință full-day (8h)",
      "Locații nelimitate",
      "150+ fotografii editate",
      "Album de lux inclus",
      "Styling & direcție creativă",
      "Livrare prioritară 48h",
    ],
    highlighted: false,
  },
];

export interface Photographer {
  id: string;
  name: string;
  specialty: string;
  avatar: string;
  busyDates: string[]; 
}

export const photographers: Photographer[] = [
  {
    id: "alex",
    name: "Alex Riva",
    specialty: "Editorial & Fashion",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80",
    busyDates: [
      "2026-03-05",
      "2026-03-07",
      "2026-03-12",
      "2026-03-15",
      "2026-03-20",
      "2026-03-25",
    ],
  },
  {
    id: "maria",
    name: "Maria Bell",
    specialty: "Nunți & Evenimente",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80",
    busyDates: [
      "2026-03-03",
      "2026-03-06",
      "2026-03-10",
      "2026-03-14",
      "2026-03-18",
      "2026-03-22",
      "2026-03-28",
    ],
  },
  {
    id: "victor",
    name: "Victor Night",
    specialty: "Portrete Artistice",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80",
    busyDates: [
      "2026-03-04",
      "2026-03-08",
      "2026-03-11",
      "2026-03-16",
      "2026-03-19",
      "2026-03-24",
    ],
  },
];


export const navLinks = [
  { label: "Portofoliu", href: "#portfolio" },
  { label: "Servicii", href: "#services" },
  { label: "Programare", href: "#booking" },
] as const;
