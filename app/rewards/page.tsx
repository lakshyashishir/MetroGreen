import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  ShoppingBag, 
  Coffee,
  ShoppingCart,
  ArrowRight
} from "lucide-react";
import { Navbar } from "@/components/Navbar";

const merchants = [
  {
    id: 1,
    name: "Metro Café",
    description: "Coffee and snacks at AIIMS station",
    minTokens: 10,
    discount: "20% off"
  },
  {
    id: 2,
    name: "Green Mart",
    description: "Eco-friendly products at Hauz Khas",
    minTokens: 20,
    discount: "₹100 off"
  },
  {
    id: 3,
    name: "Sustainable Eats",
    description: "Organic food court at Malviya Nagar",
    minTokens: 15,
    discount: "15% off"
  }
];

export default function RewardsPage() {
  return (
    <>
    <Navbar />
    <main className="min-h-screen bg-black">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-mono text-white">Available Rewards</h1>
          <div className="flex items-center space-x-2 text-gray-400 text-sm font-mono">
            <ShoppingBag className="h-4 w-4" />
            <span>Your Balance: 45 MTG</span>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {merchants.map((merchant) => (
            <Card 
              key={merchant.id} 
              className="bg-black/50 backdrop-blur-md border border-gray-800 hover:border-green-500/50 transition-colors"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-mono text-white">{merchant.name}</h3>
                  <Coffee className="h-5 w-5 text-green-500" />
                </div>
                <p className="text-sm text-gray-400 mb-4 font-mono">
                  {merchant.description}
                </p>
                <div className="flex justify-between items-center text-sm font-mono text-gray-400 mb-4">
                  <span>Min. Tokens: {merchant.minTokens} MTG</span>
                  <span className="text-green-500">{merchant.discount}</span>
                </div>
                <Button 
                  className="w-full font-mono bg-green-500/10 text-green-500 hover:bg-green-500/20 border border-green-500/50"
                >
                  Redeem Now <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </main>
    </>
  );
}