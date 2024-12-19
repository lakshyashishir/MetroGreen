import { Card } from "@/components/ui/card";
import { Leaf } from "lucide-react";
import { QRTicketData } from "@/lib/ticket/ticket-parser";
import { qrProcessor } from "@/lib/ticket/qr-processor";

interface TicketResultProps {
  ticketData: QRTicketData;
}

export function TicketResult({ ticketData }: TicketResultProps) {
  const carbonSaved = qrProcessor.calculateCarbonSaved(
    ticketData.fromStation,
    ticketData.toStation
  );

  return (
    <Card className="p-6 mt-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Ticket Details</h3>
        <Leaf className="h-5 w-5 text-green-600" />
      </div>
      
      <div className="space-y-3">
        {ticketData.tripId && (
          <div className="flex justify-between">
            <span className="text-gray-600">Trip ID:</span>
            <span className="font-medium">{ticketData.tripId}</span>
          </div>
        )}
        
        <div className="flex justify-between">
          <span className="text-gray-600">Journey:</span>
          <span className="font-medium">
            {ticketData.fromStation} → {ticketData.toStation}
          </span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-gray-600">Date:</span>
          <span className="font-medium">{ticketData.date}</span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-gray-600">Fare:</span>
          <span className="font-medium">₹{ticketData.amount}</span>
        </div>
        
        <div className="flex justify-between text-green-600">
          <span>Carbon Saved:</span>
          <span className="font-medium">{carbonSaved}g CO₂</span>
        </div>
      </div>
    </Card>
  );
}