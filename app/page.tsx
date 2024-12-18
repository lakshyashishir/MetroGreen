import { HeroSection } from "@/components/home/hero-section";
import { ActionButtons } from "@/components/home/action-buttons";
import { FeaturesSection } from "@/components/home/features-section";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-green-50 to-green-100 dark:from-green-900 dark:to-green-950">
      <div className="container mx-auto px-4 py-8">
        <HeroSection />
        <ActionButtons />
        <FeaturesSection />
      </div>
    </main>
  );
}