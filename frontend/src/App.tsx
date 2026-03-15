import { useState } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Portfolio from "./components/Portfolio";
import Services from "./components/Services";
import Process from "./components/Process";
import Testimonials from "./components/Testimonials";
import Footer from "./components/Footer";
import type { ServicePackage } from "./data/mock";
import AboutUs from "./components/AboutUs";
import BackToTop from "./components/BackToTop";
import Team from "./components/Team";
import Faq from "./components/Faq";
import CtaBanner from "./components/CtaBanner";
import Contact from "./components/Contact";
import BookingDrawer from "./components/BookingDrawer";
import AuthModal from "./components/AuthModal";
import { useAuth } from "./contexts/AuthContext";

function App() {
  const [preselectedPackage, setPreselectedPackage] = useState<ServicePackage | null>(null);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const { user } = useAuth();

  const requireAuth = (callback: () => void) => {
    if (!user) {
      setAuthOpen(true);
    } else {
      callback();
    }
  };

  const handleSelectPackage = (pkg: ServicePackage) => {
    requireAuth(() => {
      setPreselectedPackage(pkg);
      setBookingOpen(true);
    });
  };

  const handleOpenBooking = () => {
    requireAuth(() => {
      setPreselectedPackage(null);
      setBookingOpen(true);
    });
  };

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100">
      <Header onOpenBooking={handleOpenBooking} />
      <main className="pt-[72px]">
        <Hero />
        <Portfolio />
        <Services onSelectPackage={handleSelectPackage} />
        <Process />
        <Testimonials />
        <Team />
        <AboutUs />
        <Faq />
        <CtaBanner onOpenBooking={handleOpenBooking} />
      </main>
      <Contact />
      <Footer />
      <BackToTop />

      <BookingDrawer
        open={bookingOpen}
        onClose={() => setBookingOpen(false)}
        preselectedPackage={preselectedPackage}
      />

      <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} />
    </div>
  );
}

export default App;