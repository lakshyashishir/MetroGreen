import { Leaf, Trophy, Train } from "lucide-react";
import { Card } from "@/components/ui/card";

const features = [
  {
    icon: Leaf,
    title: "Track Impact",
    description: "Monitor your carbon savings in real-time",
  },
  {
    icon: Trophy,
    title: "Earn Rewards",
    description: "Convert savings into MetroGreen Tokens",
  },
  {
    icon: Train,
    title: "Station Rewards",
    description: "Redeem at any metro station vendor",
  },
];

export function FeaturesSection() {
  return (
    <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
      {features.map((feature, index) => (
        <Card key={index} className="p-6 text-center">
          <div className="flex justify-center mb-4">
            <feature.icon className="h-8 w-8 text-green-600 dark:text-green-400" />
          </div>
          <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            {feature.description}
          </p>
        </Card>
      ))}
    </div>
  );
}