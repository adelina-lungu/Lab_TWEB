import { useState, useRef } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Portfolio from "./components/Portfolio";
import Services from "./components/Services";
import Booking from "./components/Booking";
import Footer from "./components/Footer";
import type { ServicePackage } from "./data/mock";
import AboutUs from "./components/AboutUs";
import BackToTop from "./components/BackToTop";
import Process from "./components/Process";
import Team from "./components/Team"; 



function App() {
  const [preselectedPackage, setPreselectedPackage] =
    useState<ServicePackage | null>(null);
  const bookingRef = useRef<HTMLDivElement>(null);

  const handleSelectPackage = (pkg: ServicePackage) => {
    setPreselectedPackage(pkg);
    bookingRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100">
      <Header />
      <main className="pt-[72px]">
        <Hero />
        <Portfolio />
        <Services onSelectPackage={handleSelectPackage} />
        <Process />
        <Team />
        <AboutUs />
        <div ref={bookingRef}>
          <Booking preselectedPackage={preselectedPackage} />
        </div>
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
}

export default App;
