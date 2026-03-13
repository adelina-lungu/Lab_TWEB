import { MessageSquare, Palette, Camera, Send } from "lucide-react";

const steps = [
  {
    icon: <MessageSquare size={24} />,
    title: "Discuție",
    description:
      "Ne cunoaștem, discutăm viziunea ta și stabilim detaliile ședinței — locație, stil, durată.",
  },
  {
    icon: <Palette size={24} />,
    title: "Planificare",
    description:
      "Pregătim moodboard-ul, alegem locațiile și, la pachetele Premium+, oferim consultanță vestimentară.",
  },
  {
    icon: <Camera size={24} />,
    title: "Ședința Foto",
    description:
      "Ziua cea mare! Lucrăm într-o atmosferă relaxată, ghidându-te natural pentru cele mai bune cadre.",
  },
  {
    icon: <Send size={24} />,
    title: "Livrare",
    description:
      "Edităm cu atenție fiecare fotografie și livrăm galeria online în termenul stabilit.",
  },
];

export default function Process() {
  return (
    <section id="process" className="px-6 py-20 md:px-10 md:py-28">
      <div className="mx-auto w-full max-w-6xl">
        <div className="mb-12 text-center md:mb-16">
          <p className="mb-3 text-sm font-medium tracking-[0.3em] uppercase text-gold-400">
            Procesul Nostru
          </p>
          <h2 className="font-serif text-3xl font-semibold text-stone-100 sm:text-4xl md:text-5xl">
            Cum Lucrăm
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <div
              key={step.title}
              className="group relative rounded-lg border border-stone-800 bg-stone-900/30
                p-6 text-center transition-all duration-500 hover:border-stone-700 sm:p-8"
            >
              <span className="absolute top-4 right-4 font-serif text-3xl font-bold text-stone-800/60">
                0{i + 1}
              </span>

              <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full
                border border-gold-400/20 bg-gold-400/5 text-gold-400
                transition-all duration-500 group-hover:border-gold-400/40 group-hover:bg-gold-400/10">
                {step.icon}
              </div>

              <h3 className="font-serif text-lg font-semibold text-stone-100">
                {step.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-stone-400">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}