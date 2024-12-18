"use client";

import { Card } from "@/components/ui/card";
import { Leaf } from "lucide-react";

interface TicketResultProps {
  ticketData: {
    date?: string;
    startStation?: string;
    endStation?: string;
    fareAmount?: number;
    carbonSaved?: number;
  } | null;
}

export function TicketResult({ ticketData }: TicketResultProps) {
  if (!ticketData) return null;

  return (
    <Card className="p-6 mt-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Ticket Details</h3>
        <Leaf className="h-5 w-5 text-green-600" />
      </div>
      
      <div className="space-y-3">
        {ticketData.date && (
          <div className="flex justify-between">
            <span className="text-gray-600">Date:</span>
            <span className="font-medium">{ticketData.date}</span>
          </div>
        )}
        
        {ticketData.startStation && ticketData.endStation && (
          <div className="flex justify-between">
            <span className="text-gray-600">Journey:</span>
            <span className="font-medium">
              {ticketData.startStation} → {ticketData.endStation}
            </span>
          </div>
        )}
        
        {ticketData.fareAmount && (
          <div className="flex justify-between">
            <span className="text-gray-600">Fare:</span>
            <span className="font-medium">₹{ticketData.fareAmount.toFixed(2)}</span>
          </div>
        )}
        
        {ticketData.carbonSaved && (
          <div className="flex justify-between text-green-600">
            <span>Carbon Saved:</span>
            <span className="font-medium">{ticketData.carbonSaved}g CO₂</span>
          </div>
        )}
      </div>
    </Card>
  );
}