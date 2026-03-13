import Hero from "../components/Hero";
import Portfolio from "../components/Portfolio";
import AboutUs from "../components/AboutUs";
import Team from "../components/Team";
import Services from "../components/Services";
import Booking from "../components/Booking";
import { useRef, useState } from "react";
import type { ServicePackage } from "../data/mock";

export default function HomePage() {
  const [preselectedPackage, setPreselectedPackage] =
    useState<ServicePackage | null>(null);
  const bookingRef = useRef<HTMLDivElement>(null);

  const handleSelectPackage = (pkg: ServicePackage) => {
    setPreselectedPackage(pkg);
    bookingRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <Hero />
      <Portfolio />
      <AboutUs />
      <Team />
      <Services onSelectPackage={handleSelectPackage} />
      <div ref={bookingRef}>
        <Booking preselectedPackage={preselectedPackage} />
      </div>
    </>
  );
}