"use client";
import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Leaf, 
  Ticket, 
  CreditCard, 
  RefreshCw,
  TrendingUp,
  Calendar 
} from "lucide-react";
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { Navbar } from "../page";

const mockData = [
  { month: 'Jan', carbonSaved: 450, tokens: 45 },
  { month: 'Feb', carbonSaved: 580, tokens: 58 },
  { month: 'Mar', carbonSaved: 620, tokens: 62 }
];

export default function DashboardPage() {
  return (
    <>
    <Navbar />
    <main className="min-h-screen bg-black">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-mono text-white">Your Impact</h1>
          <Button 
            variant="outline" 
            className="font-mono text-green-500 border-green-500/50 hover:bg-green-500/10"
          >
            <RefreshCw className="mr-2 h-4 w-4" /> Refresh
          </Button>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-black/50 backdrop-blur-md border border-gray-800">
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-mono text-gray-400 mb-1">Carbon Saved</p>
                  <p className="text-2xl font-mono text-green-500">450g CO₂</p>
                </div>
                <Leaf className="h-8 w-8 text-green-500/50" />
              </div>
            </div>
          </Card>

          <Card className="bg-black/50 backdrop-blur-md border border-gray-800">
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-mono text-gray-400 mb-1">Your Tokens</p>
                  <p className="text-2xl font-mono text-green-500">45 MTG</p>
                </div>
                <Ticket className="h-8 w-8 text-green-500/50" />
              </div>
            </div>
          </Card>

          <Card className="bg-black/50 backdrop-blur-md border border-gray-800">
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-mono text-gray-400 mb-1">Value</p>
                  <p className="text-2xl font-mono text-green-500">₹225</p>
                </div>
                <CreditCard className="h-8 w-8 text-green-500/50" />
              </div>
            </div>
          </Card>
        </div>

        <Card className="bg-black/50 backdrop-blur-md border border-gray-800 p-6 mb-8">
          <h2 className="text-xl font-mono text-white mb-6">Impact Timeline</h2>
          <div className="h-[300px] w-full">
            <LineChart
              width={800}
              height={300}
              data={mockData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <XAxis 
                dataKey="month" 
                stroke="#6B7280"
                tick={{ fill: "#6B7280" }}
              />
              <YAxis 
                stroke="#6B7280"
                tick={{ fill: "#6B7280" }}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: "#000", 
                  border: "1px solid #374151",
                  borderRadius: "0.375rem"
                }}
                labelStyle={{ color: "#6B7280" }}
              />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="carbonSaved" 
                stroke="#10B981" 
                name="Carbon Saved (g)"
              />
              <Line 
                type="monotone" 
                dataKey="tokens" 
                stroke="#6EE7B7" 
                name="Tokens Earned"
              />
            </LineChart>
          </div>
        </Card>
      </div>
    </main>
    </>
  );
}