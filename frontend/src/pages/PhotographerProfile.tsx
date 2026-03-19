import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Instagram, Facebook, Globe, Camera, Heart, Award, Calendar, ArrowRight } from "lucide-react";
import { teamMembers, photographers, portfolioImages } from "../data/mock";

export default function PhotographerProfile() {
  const { id } = useParams();
  const navigate = useNavigate();

  const member = teamMembers.find((m) => m.id === id);
  const photographer = photographers.find((p) => p.id === id);

  if (!member) {
    navigate("/404");
    return null;
  }

  const categoryMap: Record<string, string> = {
    "Editorial & Fashion": "fashion",
    "Nunți & Evenimente": "wedding",
    "Portrete Artistice": "portrait",
  };
  const category = categoryMap[member.role] || "all";
  const photos = portfolioImages.filter((img) => img.category === category);

  const stats = [
    { icon: <Camera size={16} />, value: `${photos.length * 80}+`, label: "Sedinte foto" },
    { icon: <Heart size={16} />, value: "98%", label: "Clienti multumiti" },
    { icon: <Award size={16} />, value: member.id === "alex" ? "5" : member.id === "maria" ? "4" : "3", label: "Premii" },
  ];

  const otherMembers = teamMembers.filter((m) => m.id !== id);

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100">
      {/* Fixed nav */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-stone-950/60 backdrop-blur-xl">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4 md:px-10">
          <button onClick={() => navigate("/")} className="flex cursor-pointer items-center gap-2 text-stone-400 transition-colors hover:text-gold-400">
            <ArrowLeft size={18} />
            <span className="text-sm font-medium hidden sm:inline">Inapoi la pagina principala</span>
          </button>
          <a href="/" className="font-serif text-xl font-semibold tracking-[0.2em] text-stone-100">
            LUMINA
          </a>
          <div className="w-20" />
        </div>
      </div>

      {/* ═══ HERO — fullscreen photo + overlay info ═══ */}
      <section className="relative min-h-screen flex items-end">
        {/* Background photo */}
        <div className="absolute inset-0">
         <img src={member.cover} alt={member.name} className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/70 to-stone-950/20" />
          <div className="absolute inset-0 bg-gradient-to-r from-stone-950/80 via-transparent to-transparent" />
        </div>

        {/* Content overlay */}
        <div className="relative z-10 w-full px-6 pb-16 pt-32 md:px-10 md:pb-24">
          <div className="mx-auto w-full max-w-6xl">
            <div className="max-w-2xl">
              {/* Role tag */}
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-gold-400/30 bg-gold-400/10 px-4 py-1.5 backdrop-blur-sm">
                <Camera size={12} className="text-gold-400" />
                <span className="text-xs font-medium tracking-[0.2em] uppercase text-gold-400">{member.role}</span>
              </div>

              {/* Name */}
              <h1 className="font-serif text-5xl font-semibold text-stone-50 sm:text-6xl lg:text-7xl">
                {member.name}
              </h1>

              {/* Bio */}
              <p className="mt-6 text-base leading-relaxed text-stone-300 sm:text-lg max-w-xl">
                {member.bio}
              </p>

              {/* Stats inline */}
              <div className="mt-8 flex flex-wrap gap-6">
                {stats.map((s) => (
                  <div key={s.label} className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full border border-gold-400/20 bg-gold-400/5 text-gold-400">
                      {s.icon}
                    </div>
                    <div>
                      <p className="font-serif text-lg font-bold text-stone-100">{s.value}</p>
                      <p className="text-[11px] tracking-wide text-stone-500">{s.label}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Social + CTA */}
              <div className="mt-8 flex flex-wrap items-center gap-4">
                {member.socials.instagram && (
                  <a href={member.socials.instagram} target="_blank" rel="noopener noreferrer" className="flex h-11 w-11 items-center justify-center rounded-full border border-stone-600/50 bg-stone-900/50 text-stone-300 backdrop-blur-sm transition-all hover:border-gold-400 hover:text-gold-400">
                    <Instagram size={16} />
                  </a>
                )}
                {member.socials.facebook && (
                  <a href={member.socials.facebook} target="_blank" rel="noopener noreferrer" className="flex h-11 w-11 items-center justify-center rounded-full border border-stone-600/50 bg-stone-900/50 text-stone-300 backdrop-blur-sm transition-all hover:border-gold-400 hover:text-gold-400">
                    <Facebook size={16} />
                  </a>
                )}
                {member.socials.website && (
                  <a href={member.socials.website} target="_blank" rel="noopener noreferrer" className="flex h-11 w-11 items-center justify-center rounded-full border border-stone-600/50 bg-stone-900/50 text-stone-300 backdrop-blur-sm transition-all hover:border-gold-400 hover:text-gold-400">
                    <Globe size={16} />
                  </a>
                )}
                <a href="#portofoliu" className="ml-2 inline-flex items-center gap-2 border border-gold-400/40 bg-gold-400/10 px-6 py-3 text-sm font-medium tracking-widest uppercase text-gold-400 backdrop-blur-sm transition-all duration-300 hover:border-gold-400 hover:bg-gold-400/20">
                  Vezi lucrarile
                  <ArrowRight size={14} />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10">
          <div className="h-12 w-px bg-gradient-to-b from-transparent via-gold-400/50 to-transparent animate-bounce" />
        </div>
      </section>

      {/* ═══ AVAILABILITY ═══ */}
      {photographer && (
        <section className="px-6 py-16 md:px-10">
          <div className="mx-auto w-full max-w-6xl">
            <div className="rounded-lg border border-stone-800 bg-stone-900/30 px-6 py-8 sm:px-10">
              <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-3">
                  <Calendar size={20} className="text-gold-400" />
                  <div>
                    <p className="text-sm font-semibold text-stone-100">Disponibilitate luna aceasta</p>
                    <p className="text-xs text-stone-500">Zilele marcate sunt deja rezervate</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {photographer.busyDates.map((date) => (
                    <span key={date} className="rounded-full border border-red-500/20 bg-red-500/5 px-3 py-1 text-xs font-medium text-red-400">
                      {new Date(date + "T00:00:00").toLocaleDateString("ro-RO", { day: "numeric", month: "short" })}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ═══ PORTFOLIO ═══ */}
      <section id="portofoliu" className="px-6 py-16 md:px-10 md:py-24">
        <div className="mx-auto w-full max-w-6xl">
          <div className="mb-12 text-center">
            <p className="mb-3 text-sm font-medium tracking-[0.3em] uppercase text-gold-400">
              Lucrari selectate
            </p>
            <h2 className="font-serif text-3xl font-semibold text-stone-100 sm:text-4xl">
              Portofoliul lui {member.name.split(" ")[0]}
            </h2>
          </div>

          <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
            {photos.map((img) => {
              const aspectClass = img.aspect === "tall" ? "aspect-[3/4]" : img.aspect === "wide" ? "aspect-[4/3]" : "aspect-square";
              return (
                <div key={img.id} className="group relative mb-4 overflow-hidden break-inside-avoid">
                  <div className={`relative overflow-hidden ${aspectClass}`}>
                    <img src={img.src} alt={img.alt} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105" />
                    <div className="absolute inset-0 flex items-end bg-gradient-to-t from-stone-950/80 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                      <div className="p-5">
                        <p className="text-xs font-medium tracking-[0.2em] uppercase text-gold-400">{img.category}</p>
                        <p className="mt-1 text-sm text-stone-300">{img.alt}</p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══ OTHER PHOTOGRAPHERS ═══ */}
      <section className="px-6 py-16 md:px-10 border-t border-stone-800/50">
        <div className="mx-auto w-full max-w-6xl">
          <div className="mb-10 text-center">
            <p className="text-sm font-medium tracking-[0.3em] uppercase text-stone-500">
              Descopera si
            </p>
            <h3 className="mt-2 font-serif text-2xl font-semibold text-stone-100">
              Ceilalti fotografi
            </h3>
          </div>

          <div className="flex justify-center gap-10 sm:gap-16">
            {otherMembers.map((m) => (
              <button key={m.id} onClick={() => navigate(`/photographer/${m.id}`)} className="group flex cursor-pointer flex-col items-center gap-3 transition-all duration-500">
                <div className="h-24 w-24 overflow-hidden rounded-full border-2 border-stone-700 transition-all duration-500 group-hover:border-gold-400 sm:h-28 sm:w-28">
                  <img src={m.avatar} alt={m.name} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                </div>
                <div className="text-center">
                  <p className="text-sm font-semibold text-stone-100 transition-colors group-hover:text-gold-400">{m.name}</p>
                  <p className="text-[11px] tracking-wide text-stone-500">{m.role}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-stone-800/50 px-6 py-8 text-center">
        <p className="text-sm text-stone-600">&copy; 2026 Lumina Studio. Toate drepturile rezervate.</p>
      </footer>
    </div>
  );
}