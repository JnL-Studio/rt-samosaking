import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import MenuSection from "@/components/MenuSection";
import StorytellingSection from "@/components/StorytellingSection";
import LunchboxSection from "@/components/LunchboxSection";
import ChutneySection from "@/components/ChutneySection";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";
import { LanguageProvider } from "@/lib/LanguageContext";

export default function Home() {
  return (
    <LanguageProvider>
      <Navigation />
      <main>
        <HeroSection />
        <StorytellingSection />
        <MenuSection />
        <LunchboxSection />
        <ChutneySection />
      </main>
      <Footer />
      <BackToTop />
    </LanguageProvider>
  );
}
