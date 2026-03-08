import { useState, useRef } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Portfolio from "./components/Portfolio";
import Services from "./components/Services";
import Booking from "./components/Booking";
import Footer from "./components/Footer";
import type { ServicePackage } from "./data/mock";

function App() {
  
  };

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100">
      <Header />
      <main className="pt-[72px]">
        <Hero />
        <Portfolio />
        <Services onSelectPackage={handleSelectPackage} />
        <div ref={bookingRef}>
          <Booking preselectedPackage={preselectedPackage} />
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;
