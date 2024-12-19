"use client";

import { Train, ArrowRight, Leaf } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import React from "react";
import { useAccount } from "wagmi";
import { useWeb3Modal } from "@web3modal/wagmi/react";

export const Navbar = () => {
  const { address, isConnected } = useAccount();
  const { open } = useWeb3Modal();

  const formatAddress = (addr: string | undefined) => {
    if (!addr) return "";
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  return (
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
            <Link
              href="/scan"
              className="text-sm text-gray-400 hover:text-green-500"
            >
              Open App
            </Link>
            {isConnected ? (
              <Button
                onClick={() => open()}
                className="font-mono bg-green-500 hover:bg-green-600 flex items-center"
              >
                {formatAddress(address)}
              </Button>
            ) : (
              <Button
                onClick={() => open()}
                className="font-mono bg-green-500 hover:bg-green-600 flex items-center"
              >
                Connect Wallet
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
