import { useState } from 'react';
import { qrProcessor, QRTicketData } from '@/lib/ticket/qr-processor';

interface TicketScannerResult {
  isProcessing: boolean;
  error: string | null;
  processQRCode: (qrData: string) => Promise<void>;
  ticketData: QRTicketData | null;
}

export function useTicketScanner(): TicketScannerResult {
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [ticketData, setTicketData] = useState<QRTicketData | null>(null);

  const processQRCode = async (qrData: string) => {
    try {
      setIsProcessing(true);
      setError(null);
      
      const parsedData = qrProcessor.parseTicketData(qrData);
      setTicketData(parsedData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to process QR code');
    } finally {
      setIsProcessing(false);
    }
  };

  return {
    isProcessing,
    error,
    processQRCode,
    ticketData
  };
}