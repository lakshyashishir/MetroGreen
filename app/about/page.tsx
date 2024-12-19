import React from 'react';
import { Train, Leaf, ArrowRight, QrCode } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Navbar } from "@/components/Navbar";

const HowItWorks = () => (
  <div className="grid md:grid-cols-3 gap-6 my-12">
    {[
      {
        icon: QrCode,
        title: "1. Scan QR",
        description: "Simply scan your metro ticket's QR code with our app for instant verification."
      },
      {
        icon: Leaf,
        title: "2. Earn Tokens",
        description: "Get Green Tokens for every verified journey based on distance traveled."
      },
      {
        icon: Train,
        title: "3. Redeem",
        description: "Use your tokens at partner stores across the metro network."
      }
    ].map((item, index) => (
      <Card key={index} className="p-6 bg-black/40 border border-gray-800 hover:border-green-500/50 transition-colors">
        <div className="flex items-center mb-4">
          <item.icon className="h-6 w-6 text-green-500 mr-2" />
          <h3 className="font-mono text-white">{item.title}</h3>
        </div>
        <p className="text-gray-400">{item.description}</p>
      </Card>
    ))}
  </div>
);

const Stats = () => (
  <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-8">
    {[
      { value: '50K+', label: 'Active Users' },
      { value: '120T', label: 'CO₂ Saved' },
      { value: '₹2M+', label: 'Rewards Given' },
      { value: '200+', label: 'Partner Stores' },
    ].map((stat, index) => (
      <div key={index} className="text-center">
        <div className="text-2xl font-bold text-green-500 mb-1">{stat.value}</div>
        <div className="text-sm text-gray-400">{stat.label}</div>
      </div>
    ))}
  </div>
);

const AboutPage = () => (
  <div className="min-h-screen bg-black pt-24">
    <div className="container mx-auto px-4 max-w-4xl">
      <div className="text-center mb-16">
        <div className="inline-flex items-center justify-center px-4 py-1.5 mb-4 bg-green-500/10 rounded-full border border-green-500/20 text-green-500">
          <Leaf className="h-4 w-4 mr-2" />
          About GreenMetro
        </div>
        <h1 className="text-4xl font-mono font-bold mb-4 text-white">
          Sustainable Transit Rewards
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Transforming daily commutes into rewards while building a more sustainable future.
        </p>
      </div>

      <HowItWorks />

      <section className="mb-16">
        <Card className="p-8 bg-black/40 border border-gray-800">
          <h2 className="text-2xl font-mono font-bold mb-4 text-white">Our Mission</h2>
          <p className="text-gray-400 mb-6">
            To incentivize sustainable urban mobility by rewarding metro commuters for their 
            environmentally conscious travel choices.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="border border-gray-800 rounded-lg p-6">
              <h3 className="font-mono font-bold mb-2 text-green-500">Environmental Impact</h3>
              <p className="text-gray-400">Reducing urban carbon emissions through incentivized public transit use.</p>
            </div>
            <div className="border border-gray-800 rounded-lg p-6">
              <h3 className="font-mono font-bold mb-2 text-green-500">Community Building</h3>
              <p className="text-gray-400">Creating a network of environmentally conscious travelers.</p>
            </div>
          </div>
        </Card>
      </section>

      <section className="mb-16">
        <Card className="p-8 bg-black/40 border border-gray-800">
          <h2 className="text-2xl font-mono font-bold mb-6 text-white text-center">Our Impact (obv it's fake but definitely possible)</h2>
          <Stats />
        </Card>
      </section>

      <section className="text-center py-16">
        <h2 className="text-2xl font-mono font-bold mb-4 text-white">Ready to Make Your Commute Count?</h2>
        <Button className="font-mono bg-green-500 hover:bg-green-600">
          Get Started <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </section>
    </div>
  </div>
);

export default function About() {
  return (
    <>
      <Navbar />
      <AboutPage />
    </>
  );
}