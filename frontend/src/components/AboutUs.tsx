import { Camera, Heart, Award, Clock } from "lucide-react";

const stats = [
  { icon: <Camera size={20} />, value: "2,500+", label: "Ședințe foto" },
  { icon: <Heart size={20} />, value: "180+", label: "Nunți fotografiate" },
  { icon: <Award size={20} />, value: "12", label: "Premii internaționale" },
  { icon: <Clock size={20} />, value: "8+", label: "Ani de experiență" },
];

export default function AboutUs() {
  return (
    <section id="about" className="px-6 py-20 md:px-10 md:py-28">
      <div className="mx-auto w-full max-w-6xl">
        {/* heading */}
        <div className="mb-12 text-center md:mb-16">
          <p className="mb-3 text-sm font-medium tracking-[0.3em] uppercase text-gold-400">
            Cine Suntem
          </p>
          <h2 className="font-serif text-3xl font-semibold text-stone-100 sm:text-4xl md:text-5xl">
            Despre Noi
          </h2>
        </div>

        {/* continut principal — text + imagine */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-14 items-center">
          {/* coloana stanga - text */}
          <div>
            <h3 className="font-serif text-xl font-semibold text-stone-100 sm:text-2xl">
              Povestea din spatele obiectivului
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-stone-400 sm:text-base">
              LUMINA Studio a luat naștere în 2018 dintr-o pasiune simplă — dorința
              de a surprinde emoțiile autentice ale oamenilor. Am început cu o
              cameră veche și un apartament transformat în studio improvizat,
              undeva în centrul Chișinăului.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-stone-400 sm:text-base">
              Astăzi suntem o echipă de trei fotografi cu stiluri diferite, dar
              cu aceeași filozofie: fiecare cadru trebuie să spună o poveste. Nu
              ne interesează perfecțiunea artificială — ne interesează momentele
              reale, lumina naturală și expresiile care nu pot fi regizate.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-stone-400 sm:text-base">
              De la editorial fashion și portrete artistice până la nunți
              intimate, fiecare proiect e tratat cu aceeași atenție și dedicare.
              Colaborăm strâns cu fiecare client ca rezultatul final să reflecte
              personalitatea lor, nu un șablon generic.
            </p>

            {/* stats */}
            <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {stats.map((s) => (
                <div
                  key={s.label}
                  className="rounded-lg border border-stone-800 bg-stone-900/30 px-3 py-4 text-center"
                >
                  <span className="mx-auto mb-2 flex justify-center text-gold-400">
                    {s.icon}
                  </span>
                  <p className="font-serif text-xl font-bold text-stone-100">
                    {s.value}
                  </p>
                  <p className="mt-1 text-[11px] tracking-wide text-stone-500">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* coloana dreapta — imagine */}
          <div className="relative">
            <div className="overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1554048612-b6a482bc67e5?w=800&q=80"
                alt="Fotograful nostru in studio"
                className="w-full object-cover aspect-[3/4]"
              />
            </div>
            {/* accent decorativ */}
            <div className="absolute -bottom-4 -left-4 h-24 w-24 border border-gold-400/20 -z-10 hidden lg:block" />
          </div>
        </div>
      </div>
    </section>
  );
}