import { Instagram, Facebook, Globe } from "lucide-react";
import { teamMembers } from "../data/mock";

export default function Team() {
  return (
    <section id="team" className="px-6 py-20 md:px-10 md:py-28">
      <div className="mx-auto w-full max-w-6xl">
        {/* heading */}
        <div className="mb-12 text-center md:mb-16">
          <p className="mb-3 text-sm font-medium tracking-[0.3em] uppercase text-gold-400">
            Echipa Noastră
          </p>
          <h2 className="font-serif text-3xl font-semibold text-stone-100 sm:text-4xl md:text-5xl">
            Oamenii din Spatele Camerei
          </h2>
        </div>

        {/* carduri */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {teamMembers.map((member) => (
            <div
              key={member.id}
              className="group flex flex-col border border-stone-800 bg-stone-900/30 overflow-hidden transition-all duration-500 hover:border-stone-700"
            >
              {/* imagine */}
              <div className="relative overflow-hidden aspect-[4/5]">
                <img
                  src={member.avatar}
                  alt={member.name}
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                {/* overlay cu social links la hover */}
                <div className="absolute inset-0 flex items-end justify-center bg-gradient-to-t from-stone-950/80 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                  <div className="mb-6 flex gap-3">
                    {member.socials.instagram && (
                      <a
                        href={member.socials.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex h-9 w-9 items-center justify-center rounded-full border border-stone-600 bg-stone-900/80 text-stone-300 transition-all hover:border-gold-400 hover:text-gold-400"
                      >
                        <Instagram size={15} />
                      </a>
                    )}
                    {member.socials.facebook && (
                      <a
                        href={member.socials.facebook}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex h-9 w-9 items-center justify-center rounded-full border border-stone-600 bg-stone-900/80 text-stone-300 transition-all hover:border-gold-400 hover:text-gold-400"
                      >
                        <Facebook size={15} />
                      </a>
                    )}
                    {member.socials.website && (
                      <a
                        href={member.socials.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex h-9 w-9 items-center justify-center rounded-full border border-stone-600 bg-stone-900/80 text-stone-300 transition-all hover:border-gold-400 hover:text-gold-400"
                      >
                        <Globe size={15} />
                      </a>
                    )}
                  </div>
                </div>
              </div>

              {/* text info */}
              <div className="p-5 sm:p-6">
                <h3 className="font-serif text-lg font-semibold text-stone-100">
                  {member.name}
                </h3>
                <p className="mt-1 text-xs font-medium tracking-wide uppercase text-gold-400">
                  {member.role}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-stone-400">
                  {member.bio}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
