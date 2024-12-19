import React from "react";
import { Train, ArrowRight, Leaf } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const Navbar = () => (
  <nav className="fixed w-full z-50 bg-black/50 backdrop-blur-md border-b border-gray-800">
    <div className="container mx-auto px-4">
      <div className="flex items-center justify-between h-16">
        <Link className="flex items-center space-x-2" href={"/"}>
          <Train className="h-5 w-5 text-green-500" />
          <span className="font-mono text-white">GreenMetro</span>
        </Link>
        <div className="flex items-center space-x-6">
          <Link
            href="/about"
            className="text-sm text-gray-400 hover:text-green-500"
          >
            About
          </Link>
          <a
            href="/scan"
            className="font-mono text-white border-green-500 hover:bg-green-500/20"
          >
            Open App
          </a>
        </div>
      </div>
    </div>
  </nav>
);

const HeroSection = () => (
  <div className="min-h-screen flex items-center justify-center px-4 bg-black">
    <div className="text-center max-w-3xl mx-auto pt-16">
      <div className="inline-flex items-center justify-center px-4 py-1.5 mb-8 bg-green-500/10 rounded-full border border-green-500/20 text-sm text-green-500">
        <Leaf className="h-4 w-4 mr-2" />
        <span>Eco-Rewards</span>
      </div>
      <h1 className="text-4xl md:text-5xl font-mono mb-6 text-white">
        Turn your metro journeys
        <br />
        <span className="text-green-500">into rewards</span>
      </h1>
      <p className="text-gray-400 mb-8 max-w-2xl mx-auto font-mono text-sm">
        Join thousands of metro commuters who are earning rewards while saving
        the planet, one journey at a time
      </p>
      <div className="flex items-center justify-center space-x-4">
        <Button className="font-mono bg-green-500 hover:bg-green-600">
          Start Earning <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          className="font-mono text-white border-green-500 hover:bg-green-500/20"
        >
          Learn More <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  </div>
);

const Footer = () => (
  <footer className="py-8 border-t border-gray-800 bg-black">
    <div className="container mx-auto px-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-6">
          <Link
            href="https://discord.gg"
            className="text-sm text-gray-400 hover:text-green-500"
          >
            Discord
          </Link>
          <Link
            href="https://twitter.com"
            className="text-sm text-gray-400 hover:text-green-500"
          >
            Twitter
          </Link>
        </div>
        <div className="text-sm text-gray-600">Scroll Down ↓</div>
      </div>
    </div>
  </footer>
);

export default function Home() {
  return (
    <main className="min-h-screen bg-black">
      <Navbar />
      <HeroSection />
      <Footer />
    </main>
  );
}
