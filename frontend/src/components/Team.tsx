import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { teamMembers } from "../data/mock";

export default function Team() {
  const navigate = useNavigate();

  return (
    <section id="team" className="px-6 py-20 md:px-10 md:py-28">
      <div className="mx-auto w-full max-w-6xl">
        <div className="mb-12 text-center md:mb-16">
          <p className="mb-3 text-sm font-medium tracking-[0.3em] uppercase text-gold-400">
            Echipa Noastra
          </p>
          <h2 className="font-serif text-3xl font-semibold text-stone-100 sm:text-4xl md:text-5xl">
            Oamenii din Spatele Camerei
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-sm text-stone-400 sm:text-base">
            Apasa pe fotograf pentru a-i vedea portofoliul complet.
          </p>
        </div>

        {/* Avatar bar */}
        <div className="flex flex-col items-center gap-10 sm:flex-row sm:justify-center sm:gap-16 lg:gap-24">
          {teamMembers.map((member) => (
            <button
              key={member.id}
              onClick={() => navigate(`/photographer/${member.id}`)}
              className="group flex cursor-pointer flex-col items-center gap-4 transition-all duration-500"
            >
              {/* Avatar ring */}
              <div className="relative">
                <div className="h-32 w-32 overflow-hidden rounded-full border-2 border-stone-700 transition-all duration-500 group-hover:border-gold-400 sm:h-40 sm:w-40">
                  <img
                    src={member.avatar}
                    alt={member.name}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                {/* Glow on hover */}
                <div className="absolute inset-0 rounded-full opacity-0 transition-opacity duration-500 group-hover:opacity-100 shadow-[0_0_30px_rgba(201,169,110,0.15)]" />
                {/* Arrow badge */}
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 flex h-8 w-8 items-center justify-center rounded-full border border-stone-700 bg-stone-900 text-stone-500 transition-all duration-300 group-hover:border-gold-400 group-hover:bg-gold-400 group-hover:text-stone-950">
                  <ArrowRight size={14} />
                </div>
              </div>

              {/* Name + role */}
              <div className="text-center">
                <p className="font-serif text-lg font-semibold text-stone-100 transition-colors duration-300 group-hover:text-gold-400">
                  {member.name}
                </p>
                <p className="mt-1 text-xs font-medium tracking-wide uppercase text-stone-500">
                  {member.role}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}