"use client";

import React from "react";
import { useState } from "react";
import { ArrowLeft, ExternalLink } from "lucide-react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import DelhiMetroScanner from "@/components/scan/delhi-metro-scanner";
import { useContract } from "@/hooks/use-hedera/use-contract";
import { useToken } from "@/hooks/use-hedera/use-token";
import { useHCS } from "@/hooks/use-hedera/use-hcs";
import { useToast } from "@/hooks/use-toast";
import { qrProcessor } from "@/lib/ticket/qr-processor";
import type { SimpleMetroTicket } from "@/components/scan/delhi-metro-scanner";
import type { TokenMintResult } from "@/lib/hedera/token-service";
import { Navbar } from "@/components/Navbar";

export default function ScanPage() {
  const { verifyTicket, addStation, isAdmin } = useContract();
  const [isProcessing, setIsProcessing] = useState(false);
  const [lastTransaction, setLastTransaction] = useState<{
    mintTxId?: string;
    transferTxId?: string;
  } | null>(null);

  const { mintTokens, getHashScanUrl } = useToken();
  const { logMetroRide } = useHCS();
  const { toast } = useToast();

  const handleTicketScanned = async (ticketData: SimpleMetroTicket) => {
    try {
      setIsProcessing(true);
      setLastTransaction(null);

      const carbonSaved = qrProcessor.calculateCarbonSaved(
        ticketData.fromStation,
        ticketData.toStation
      );

      // Verify ticket first
      await verifyTicket(
        ticketData.fromStation,
        process.env.NEXT_PUBLIC_OPERATOR_ID!,
        carbonSaved
      );

      // Mint tokens
      const result = await mintTokens(
        process.env.NEXT_PUBLIC_OPERATOR_ID!,
        carbonSaved
      );
      setLastTransaction({
        mintTxId: result.mintTransactionId,
        transferTxId: result.transferTransactionId,
      });

      toast({
        title: "Success! 🌱",
        description: (
          <div className="space-y-2">
            <p>
              Earned {result.tokensAmount} tokens for saving {carbonSaved}g CO₂
            </p>
            {result.mintTransactionId && (
              <a
                href={getHashScanUrl(result.mintTransactionId)}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:text-blue-600 flex items-center"
              >
                View on HashScan
              </a>
            )}
          </div>
        ),
        duration: 10000, // Show for 10 seconds
      });
    } catch (error) {
      console.error("Processing error:", error);
      toast({
        title: "Error Processing Ticket",
        description:
          error instanceof Error ? error.message : "Please try again",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="container h-screen bg-black mx-auto px-4 py-8">
        <Link
          href="/"
          className="inline-flex items-center mb-6 text-green-600 hover:text-green-700"
        >
          <ArrowLeft className="mr-2" /> Back to Home
        </Link>

        <Card className="max-w-2xl mx-auto p-6">
          <div className="space-y-6">
            <h1 className="text-2xl font-bold text-center">
              Scan Your Metro Ticket
            </h1>

            <p className="text-center text-gray-600 dark:text-gray-400">
              Scan your Delhi Metro ticket QR code to earn green tokens
            </p>

            <DelhiMetroScanner
              onTicketScanned={handleTicketScanned}
              disabled={isProcessing}
            />

            {isProcessing && (
              <div className="text-center py-4">
                <div className="animate-pulse text-green-600">
                  Processing blockchain transaction...
                </div>
              </div>
            )}

            {!isAdmin && (
              <div className="text-center text-amber-600">
                Warning: Not running as contract admin. Some functions may fail.
              </div>
            )}

            <div className="text-sm text-center text-gray-500 dark:text-gray-400">
              Make sure the QR code is clearly visible and well-lit
            </div>
          </div>
          {lastTransaction && (
            <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <h3 className="text-sm font-medium mb-2">Transaction Details</h3>
              <div className="space-y-2">
                {lastTransaction.mintTxId && (
                  <a
                    href={getHashScanUrl(lastTransaction.mintTxId)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-blue-500 hover:text-blue-600 flex items-center"
                  >
                    View Mint Transaction{" "}
                    <ExternalLink className="ml-1 h-3 w-3" />
                  </a>
                )}
                {lastTransaction.transferTxId && (
                  <a
                    href={getHashScanUrl(lastTransaction.transferTxId)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-blue-500 hover:text-blue-600 flex items-center"
                  >
                    View Transfer Transaction{" "}
                    <ExternalLink className="ml-1 h-3 w-3" />
                  </a>
                )}
              </div>
            </div>
          )}
        </Card>
      </div>
    </>
  );
}
