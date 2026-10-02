import { createFileRoute } from "@tanstack/react-router";
import { AboutSection } from "@/components/home/about-section";
import { BookingSection } from "@/components/home/booking-section";
import { Hero } from "@/components/home/hero";
import { HowItWorks } from "@/components/home/how-it-works";
import { ServicesSection } from "@/components/home/services-section";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  return (
    <main id="main">
      <Hero />
      <ServicesSection />
      <AboutSection />
      <HowItWorks />
      <BookingSection />
    </main>
  );
}
