export interface PortfolioImage {
  id: number;
  src: string;
  alt: string;
  category: "fashion" | "wedding" | "portrait";
  aspect: "tall" | "wide" | "square";
}
export const portfolioImages: PortfolioImage[] = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800&q=80",
    alt: "Editorial fashion în lumină de studio",
    category: "fashion",
    aspect: "tall",
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80",
    alt: "Moment intim de la ceremonia nunții",
    category: "wedding",
    aspect: "wide",
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=800&q=80",
    alt: "Portret artistic cu iluminare dramatică",
    category: "portrait",
    aspect: "tall",
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&q=80",
    alt: "High fashion editorial on location",
    category: "fashion",
    aspect: "square",
  },
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&q=80",
    alt: "Cuplu la nuntă în ora de aur",
    category: "wedding",
    aspect: "tall",
  },
  {
    id: 6,
    src: "https://images.unsplash.com/photo-1504703395950-b89145a5425b?w=800&q=80",
    alt: "Fashion editorial cu stil îndrăzneț",
    category: "fashion",
    aspect: "wide",
  },
  {
    id: 7,
    src: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&q=80",
    alt: "Portret cinematic în lumină naturală",
    category: "portrait",
    aspect: "square",
  },
  {
    id: 8,
    src: "https://images.unsplash.com/photo-1460978812857-470ed1c77af0?w=800&q=80",
    alt: "Detalii de nuntă și aranjamente florale",
    category: "wedding",
    aspect: "wide",
  },
  {
    id: 9,
    src: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&q=80",
    alt: "Portret de studio în stil editorial",
    category: "portrait",
    aspect: "tall",
  },
  {
    id: 10,
    src: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&q=80",
    alt: "Fashion model editorial runway",
    category: "fashion",
    aspect: "tall",
  },
  {
    id: 11,
    src: "https://images.unsplash.com/photo-1606216794079-73f85bbd57d5?w=800&q=80",
    alt: "Primul dans elegant la nuntă",
    category: "wedding",
    aspect: "square",
  },
  {
    id: 12,
    src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80",
    alt: "Portret masculin, compoziție artistică",
    category: "portrait",
    aspect: "wide",
  },
];


export interface ServicePackage {
  id: "standard" | "premium" | "editorial";
  name: string;
  price: number;
  currency: string;
  features: string[];
  highlighted: boolean;
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

/* ── Testimoniale ─────────────────────────── */
export interface Testimonial {
  id: number;
  name: string;
  role: string;
  avatar: string;
  text: string;
  rating: number;
}

export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Elena Moraru",
    role: "Mireasă, 2025",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80",
    text: "Maria a reușit să surprindă fiecare emoție de la nunta noastră. Fotografiile sunt de vis — le privim în fiecare seară și retrăim totul.",
    rating: 5,
  },
  {
    id: 2,
    name: "Andrei Ceban",
    role: "Model, Fashion Editorial",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80",
    text: "Colaborarea cu Alex a fost extraordinară. Știe exact cum să direcționeze și să creeze o atmosferă relaxată pe set. Rezultatele vorbesc de la sine.",
    rating: 5,
  },
  {
    id: 3,
    name: "Cristina Donici",
    role: "Portret de familie",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&q=80",
    text: "Victor a transformat o ședință foto simplă într-o experiență memorabilă. Copiii mei nici nu au observat camera — exact ce ne doream.",
    rating: 5,
  },
  {
    id: 4,
    name: "Ioana Rusu",
    role: "Corporate Branding",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&q=80",
    text: "Am avut nevoie de fotografii profesionale pentru echipa noastră. Lumina Studio a livrat peste așteptări — calitate impecabilă și punctualitate.",
    rating: 4,
  },
];


export const navLinks = [
  { label: "Portofoliu", href: "#portfolio" },
  { label: "Despre Noi", href: "#about" },
  { label: "Echipa", href: "#team" },
  { label: "Servicii", href: "#services" },
  { label: "Programare", href: "#booking" },
] as const;


export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  avatar: string;
  socials: {
    instagram?: string;
    facebook?: string;
    website?: string;
  };
}

export const teamMembers: TeamMember[] = [
  {
    id: "alex",
    name: "Alex Riva",
    role: "Editorial & Fashion",
    bio: "Cu un background în design grafic, Alex aduce o perspectivă unică fiecărei ședințe foto. Pasionat de jocul luminilor și al umbrelor, specialitatea lui sunt compozițiile îndrăznețe care spun povești fără cuvinte.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
    socials: {
      instagram: "https://instagram.com",
      website: "https://example.com",
    },
  },
  {
    id: "maria",
    name: "Maria Bell",
    role: "Nunți & Evenimente",
    bio: "Maria crede că cele mai bune fotografii de nuntă sunt cele neplănuite. Cu peste 180 de nunți în portofoliu, ea știe exact când să apese pe declanșator pentru a surprinde emoțiile sincere ale momentului.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80",
    socials: {
      instagram: "https://instagram.com",
      facebook: "https://facebook.com",
    },
  },
  {
    id: "victor",
    name: "Victor Night",
    role: "Portrete Artistice",
    bio: "Victor transformă fiecare portret într-o operă de artă. Inspirat de cinematografia clasică, stilul lui combină lumina naturală cu compoziții atent gândite, creând imagini care par desprinse din filme.",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80",
    socials: {
      instagram: "https://instagram.com",
      facebook: "https://facebook.com",
      website: "https://example.com",
    },
  },
];