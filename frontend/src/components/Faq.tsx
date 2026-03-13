import { useState } from "react";
import { ChevronDown, Mail, HelpCircle } from "lucide-react";
import { faqItems } from "../data/mock";

export default function Faq() {
  const [openId, setOpenId] = useState<number | null>(null);

  const toggle = (id: number) =>
    setOpenId((prev) => (prev === id ? null : id));

  return (
    <section id="faq" className="px-6 py-20 md:px-10 md:py-28">
      <div className="mx-auto w-full max-w-6xl">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[380px_1fr] lg:gap-16 items-start">

          {/* LEFT — heading + CTA sticky */}
          <div className="lg:sticky lg:top-28">
            <p className="mb-3 text-sm font-medium tracking-[0.3em] uppercase text-gold-400">
              Întrebări
            </p>
            <h2 className="font-serif text-3xl font-semibold text-stone-100 sm:text-4xl lg:text-5xl">
              Întrebări
              <br />
              <span className="italic text-gold-400">Frecvente</span>
            </h2>
            <p className="mt-5 text-sm leading-relaxed text-stone-400 sm:text-base">
              Răspunsuri la cele mai comune întrebări despre serviciile noastre,
              proces și livrare.
            </p>

            {/* decorative icon */}
            <div className="mt-8 hidden lg:flex h-20 w-20 items-center justify-center rounded-full border border-gold-400/20 bg-gold-400/5">
              <HelpCircle size={32} className="text-gold-400/40" />
            </div>

            {/* contact CTA */}
            <div className="mt-8 rounded-lg border border-stone-800 bg-stone-900/30 px-5 py-6 sm:px-6">
              <div className="flex items-center gap-3 mb-3">
                <Mail size={18} className="text-gold-400" />
                <p className="font-serif text-base font-semibold text-stone-100">
                  Nu ai găsit răspunsul?
                </p>
              </div>
              <p className="text-sm text-stone-400">
                Scrie-ne și îți răspundem în mai puțin de 24 de ore.
              </p>
              <a href="mailto:contact@luminastudio.md" className="mt-4 inline-flex items-center gap-2 border border-gold-400/40 bg-gold-400/10 px-5 py-2.5 text-xs font-medium tracking-widest uppercase text-gold-400 transition-all duration-300 hover:border-gold-400 hover:bg-gold-400/20">
                <Mail size={12} />
                Contactează-ne
              </a>
            </div>
          </div>

          {/* RIGHT — accordion */}
          <div className="flex flex-col gap-3">
            {faqItems.map((item, i) => {
              const isOpen = openId === item.id;
              return (
                <div
                  key={item.id}
                  className={`rounded-lg border transition-all duration-300 ${
                    isOpen
                      ? "border-gold-400/30 bg-gold-400/5"
                      : "border-stone-800 bg-stone-900/30 hover:border-stone-700"
                  }`}
                >
                  <button
                    onClick={() => toggle(item.id)}
                    className="flex w-full cursor-pointer items-center gap-4 px-5 py-4 text-left sm:px-6"
                  >
                    {/* number */}
                    <span className={`shrink-0 font-serif text-lg font-bold transition-colors duration-300 ${isOpen ? "text-gold-400" : "text-stone-700"}`}>
                      0{i + 1}
                    </span>

                    <span className="flex-1 pr-2 text-sm font-medium text-stone-100 sm:text-base">
                      {item.question}
                    </span>

                    <ChevronDown
                      size={18}
                      className={`shrink-0 text-gold-400 transition-transform duration-300 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  <div
                    className={`grid transition-all duration-300 ${
                      isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="px-5 pb-5 pl-14 text-sm leading-relaxed text-stone-400 sm:px-6 sm:pl-16">
                        {item.answer}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}