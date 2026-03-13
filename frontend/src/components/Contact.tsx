import { useState } from "react";
import { MapPin, Phone, Clock, Send, CheckCircle } from "lucide-react";

const contactInfo = [
  {
    icon: <MapPin size={18} />,
    label: "Adresă",
    value: "Str. Ștefan cel Mare 64, Chișinău",
  },
  {
    icon: <Phone size={18} />,
    label: "Telefon",
    value: "+373 60 123 456",
  },
  {
    icon: <Clock size={18} />,
    label: "Program",
    value: "Lun — Vin: 09:00 — 19:00",
  },
];

export default function Contact() {
  const [sent, setSent] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const canSubmit = name.trim() && email.trim() && message.trim();

  const handleSubmit = () => {
    if (canSubmit) setSent(true);
  };

  return (
    <section id="contact" className="px-6 py-20 md:px-10 md:py-28">
      <div className="mx-auto w-full max-w-6xl">
        <div className="mb-12 text-center md:mb-16">
          <p className="mb-3 text-sm font-medium tracking-[0.3em] uppercase text-gold-400">
            Contactează-ne
          </p>
          <h2 className="font-serif text-3xl font-semibold text-stone-100 sm:text-4xl md:text-5xl">
            Hai Să Vorbim
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">

          {/* LEFT — formular */}
          <div className="rounded-lg border border-stone-800 bg-stone-900/30 p-6 sm:p-8">
            {sent ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <CheckCircle size={48} className="text-gold-400 mb-4" />
                <h3 className="font-serif text-xl font-semibold text-stone-100">
                  Mesaj trimis!
                </h3>
                <p className="mt-2 text-sm text-stone-400">
                  Îți vom răspunde în mai puțin de 24 de ore.
                </p>
                <button onClick={() => { setSent(false); setName(""); setEmail(""); setMessage(""); }} className="mt-6 text-sm text-gold-400 underline underline-offset-4 cursor-pointer hover:text-gold-500 transition-colors">
                  Trimite alt mesaj
                </button>
              </div>
            ) : (
              <>
                <h3 className="font-serif text-lg font-semibold text-stone-100 mb-6">
                  Trimite-ne un mesaj
                </h3>

                <div className="flex flex-col gap-4">
                  <div>
                    <label className="mb-1.5 block text-xs font-medium tracking-wide text-stone-400">
                      Nume Complet
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="ex: Ion Popescu"
                      className="w-full rounded-lg border border-stone-800 bg-stone-950/60 px-4 py-2.5 text-sm text-stone-100 placeholder-stone-600 outline-none transition-colors focus:border-gold-400/50"
                    />
                  </div>

                  <div>
                    <label className="mb-1.5 block text-xs font-medium tracking-wide text-stone-400">
                      Email
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="email@exemplu.com"
                      className="w-full rounded-lg border border-stone-800 bg-stone-950/60 px-4 py-2.5 text-sm text-stone-100 placeholder-stone-600 outline-none transition-colors focus:border-gold-400/50"
                    />
                  </div>

                  <div>
                    <label className="mb-1.5 block text-xs font-medium tracking-wide text-stone-400">
                      Mesaj
                    </label>
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Descrie proiectul tău..."
                      rows={5}
                      className="w-full resize-none rounded-lg border border-stone-800 bg-stone-950/60 px-4 py-2.5 text-sm text-stone-100 placeholder-stone-600 outline-none transition-colors focus:border-gold-400/50"
                    />
                  </div>

                  <button
                    onClick={handleSubmit}
                    disabled={!canSubmit}
                    className={`mt-2 flex items-center justify-center gap-2 rounded-lg py-3.5 text-xs font-semibold tracking-widest uppercase transition-all duration-300 ${
                      canSubmit
                        ? "bg-gold-400 text-stone-950 cursor-pointer hover:bg-gold-500"
                        : "bg-stone-800/60 text-stone-600 cursor-not-allowed"
                    }`}
                  >
                    <Send size={14} />
                    Trimite Mesajul
                  </button>
                </div>
              </>
            )}
          </div>

          {/* RIGHT — info + harta */}
          <div className="flex flex-col gap-6">
            {/* contact cards */}
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              {contactInfo.map((item) => (
                <div
                  key={item.label}
                  className="rounded-lg border border-stone-800 bg-stone-900/30 px-4 py-5 text-center transition-all duration-300 hover:border-stone-700"
                >
                  <span className="mx-auto mb-2 flex justify-center text-gold-400">
                    {item.icon}
                  </span>
                  <p className="text-xs font-medium tracking-wide uppercase text-stone-500">
                    {item.label}
                  </p>
                  <p className="mt-1 text-sm font-medium text-stone-200">
                    {item.value}
                  </p>
                </div>
              ))}
            </div>

            {/* harta */}
            <div className="flex-1 min-h-[300px] rounded-lg border border-stone-800 overflow-hidden">
              <iframe
                title="Locația LUMINA Studio"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2719.8!2d28.8278!3d47.0245!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40c97c3628b769a1%3A0x37d1d6305749dd3c!2sStefan%20cel%20Mare%20si%20Sfant%20Boulevard%2C%20Chisinau!5e0!3m2!1sen!2smd!4v1700000000000!5m2!1sen!2smd"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: "300px" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}