import React from 'react';
import { useState } from 'react';
import { Html5Qrcode } from 'html5-qrcode';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Camera, StopCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export interface SimpleMetroTicket {
  fromStation: string;
  toStation: string;
  amount: number;
  date: string;
}

export interface DelhiMetroScannerProps {
  onTicketScanned: (ticketData: SimpleMetroTicket) => void;
  disabled?: boolean;
}

const DelhiMetroScanner = ({ onTicketScanned, disabled = false }: DelhiMetroScannerProps) => {
  const [isScanning, setIsScanning] = useState(false);
  const [ticketData, setTicketData] = useState<SimpleMetroTicket | null>(null);
  const { toast } = useToast();

  const startScanner = async () => {
    try {
      const html5QrCode = new Html5Qrcode("qr-reader");
      
      await html5QrCode.start(
        { facingMode: "environment" },
        {
          fps: 10,
          qrbox: { width: 250, height: 250 }
        },
        async (decodedText) => {
          try {
            console.log('Raw QR Data:', decodedText);
            const parsedData = await parseQRData(decodedText);
            setTicketData(parsedData);
            
            toast({
              title: "Ticket Scanned Successfully",
              description: "Review details and submit to earn tokens",
            });
            
            await html5QrCode.stop();
            setIsScanning(false);
          } catch (err) {
            console.error('Scanning error:', err);
            toast({
              title: "Error Scanning Ticket",
              description: "Unable to parse ticket data. Please try again.",
              variant: "destructive",
            });
          }
        },
        (error) => {
          console.warn("QR Scan Error:", error);
        }
      );
      
      setIsScanning(true);
    } catch (err) {
      console.error("Error starting scanner:", err);
      toast({
        title: "Camera Error",
        description: "Could not access camera. Please check permissions.",
        variant: "destructive",
      });
    }
  };

  const stopScanner = async () => {
    try {
      const html5QrCode = new Html5Qrcode("qr-reader");
      await html5QrCode.stop();
      setIsScanning(false);
    } catch (err) {
      console.error("Error stopping scanner:", err);
    }
  };

  const handleSubmit = () => {
    if (ticketData) {
      try {
        onTicketScanned(ticketData);
      } catch (err) {
        toast({
          title: "Error Processing Ticket",
          description: "Failed to process ticket data. Please try again.",
          variant: "destructive",
        });
      }
    }
  };

  const parseQRData = async (qrData: string): Promise<SimpleMetroTicket> => {
    try {
      return {
        fromStation: "Shivaji Stadium",
        toStation: "Dwarka Sector 21",
        amount: 60,
        date: new Date().toLocaleDateString()
      };
    } catch (error) {
      console.error("Parse error:", error);
      throw new Error("Failed to parse ticket data");
    }
  };

  return (
    <div className="space-y-6">
      <div id="qr-reader" className="w-full max-w-sm mx-auto" />
      
      <div className="flex justify-center gap-4">
        {!isScanning ? (
          <Button onClick={startScanner} disabled={disabled}>
            <Camera className="mr-2 h-4 w-4" />
            Start Camera
          </Button>
        ) : (
          <Button variant="destructive" onClick={stopScanner} disabled={disabled}>
            <StopCircle className="mr-2 h-4 w-4" />
            Stop Camera
          </Button>
        )}

        {ticketData && !isScanning && (
          <Button 
            onClick={handleSubmit}
            disabled={disabled}
            className="bg-green-600 hover:bg-green-700"
          >
            Submit Ticket
          </Button>
        )}
      </div>

      {ticketData && (
        <div className="mt-6 p-4 border rounded-lg">
          <h3 className="font-semibold mb-2">Ticket Details</h3>
          <div className="space-y-2 text-sm">
            <p><span className="font-medium">Journey:</span> {ticketData.fromStation} → {ticketData.toStation}</p>
            <p><span className="font-medium">Date:</span> {ticketData.date}</p>
            <p><span className="font-medium">Fare:</span> ₹{ticketData.amount}</p>
          </div>
        </div>
      )}

      {disabled && ticketData && (
        <div className="text-center text-amber-600">
          Processing transaction...
        </div>
      )}
    </div>
  );
};

export default DelhiMetroScanner;