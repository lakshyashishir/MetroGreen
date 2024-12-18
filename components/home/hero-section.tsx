import { Leaf, Train } from "lucide-react";

export function HeroSection() {
  return (
    <div className="text-center mb-12">
      <div className="flex justify-center items-center mb-4">
        <Leaf className="h-12 w-12 text-green-600 dark:text-green-400" />
        <Train className="h-12 w-12 text-green-600 dark:text-green-400 ml-2" />
      </div>
      <h1 className="text-4xl font-bold text-green-800 dark:text-green-100 mb-4">
        GreenCommute
      </h1>
      <p className="text-xl text-green-700 dark:text-green-200 mb-8">
        Turn your metro journeys into eco-rewards
      </p>
    </div>
  );
}