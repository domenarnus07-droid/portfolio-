import { Navbar } from "@/components/Navbar";
import { ScrollProgress } from "@/components/ScrollProgress";
import { Hero } from "@/components/Hero";
import { TechMarquee } from "@/components/TechMarquee";
import { Stats } from "@/components/Stats";
import { Projects } from "@/components/Projects";
import { Skills } from "@/components/Skills";
import { About } from "@/components/About";
import { Now } from "@/components/Now";
import { Timeline } from "@/components/Timeline";
import { FAQ } from "@/components/FAQ";
import { Contact } from "@/components/Contact";
import { CTA } from "@/components/CTA";
import { Footer } from "@/components/Footer";
import { ChatBot } from "@/components/ChatBot";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { CookieConsent } from "@/components/CookieConsent";

// Single-page portfolio.
export default function Home() {
  return (
    <>
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <TechMarquee />
        <Stats />
        <Projects />
        <Skills />
        <About />
        <Now />
        <Timeline />
        <FAQ />
        <Contact />
        <CTA />
      </main>
      <Footer />
      <ChatBot />
      <WhatsAppButton />
      <CookieConsent />
    </>
  );
}
