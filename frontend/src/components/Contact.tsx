import { MapPin, Phone, Clock } from "lucide-react";

const contactInfo = [
  {
    icon: <MapPin size={18} />,
    label: "Adresa",
    value: "Str. Studentilor 9/11, Chisinau (UTM, Rascani)",
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
  return (
    <section id="contact" className="px-6 py-20 md:px-10 md:py-28">
      <div className="mx-auto w-full max-w-6xl">
        <div className="mb-12 text-center md:mb-16">
          <p className="mb-3 text-sm font-medium tracking-[0.3em] uppercase text-gold-400">
            Contacteaza-ne
          </p>
          <h2 className="font-serif text-3xl font-semibold text-stone-100 sm:text-4xl md:text-5xl">
            Unde Ne Gasesti
          </h2>
        </div>

        {/* Info cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 mb-8">
          {contactInfo.map((item) => (
            <div key={item.label} className="rounded-lg border border-stone-800 bg-stone-900/30 px-5 py-6 text-center transition-all duration-300 hover:border-stone-700">
              <span className="mx-auto mb-3 flex justify-center text-gold-400">{item.icon}</span>
              <p className="text-xs font-medium tracking-wide uppercase text-stone-500">{item.label}</p>
              <p className="mt-1.5 text-sm font-medium text-stone-200">{item.value}</p>
            </div>
          ))}
        </div>

        {/* Map */}
        <div className="rounded-lg border border-stone-800 overflow-hidden" style={{ height: "400px" }}>
          <iframe
            title="Locatia LUMINA Studio"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2720.5!2d28.8075!3d47.0365!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40c97c456a8c8b0d%3A0x7b3f3b1e3b3b3b3b!2sUniversitatea%20Tehnic%C4%83%20a%20Moldovei!5e0!3m2!1sro!2smd!4v1700000000000!5m2!1sro!2smd"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  );
}