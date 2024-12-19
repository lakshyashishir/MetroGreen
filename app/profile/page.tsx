import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  User, 
  Settings, 
  History,
  ExternalLink,
  Copy,
  ChevronRight
} from "lucide-react";
import { Navbar } from "../page";

export default function ProfilePage() {
  return (
    <>
    <Navbar />
    <main className="min-h-screen bg-black">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-mono text-white">Profile</h1>
          <Button 
            variant="outline" 
            className="font-mono text-green-500 border-green-500/50 hover:bg-green-500/10"
          >
            <Settings className="mr-2 h-4 w-4" /> Settings
          </Button>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card className="bg-black/50 backdrop-blur-md border border-gray-800">
            <div className="p-6">
              <h2 className="text-lg font-mono text-white mb-4">Account Details</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 font-mono">Account ID</span>
                  <div className="flex items-center space-x-2">
                    <code className="text-green-500 bg-green-500/10 px-2 py-1 rounded">
                      0.0.1234567
                    </code>
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      className="text-gray-400 hover:text-green-500"
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 font-mono">Total Rewards</span>
                  <span className="text-white font-mono">45 MTG</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 font-mono">Carbon Impact</span>
                  <span className="text-green-500 font-mono">450g CO₂</span>
                </div>
              </div>
            </div>
          </Card>

          <Card className="bg-black/50 backdrop-blur-md border border-gray-800">
            <div className="p-6">
              <h2 className="text-lg font-mono text-white mb-4">Quick Actions</h2>
              <div className="space-y-4">
                <Button 
                  variant="outline" 
                  className="w-full justify-between font-mono text-green-500 border-green-500/50 hover:bg-green-500/10"
                >
                  <span className="flex items-center">
                    <History className="mr-2 h-4 w-4" />
                    View Transaction History
                  </span>
                  <ChevronRight className="h-4 w-4" />
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-between font-mono text-green-500 border-green-500/50 hover:bg-green-500/10"
                >
                  <span className="flex items-center">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Explorer
                  </span>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </main>
    </>
  );
}