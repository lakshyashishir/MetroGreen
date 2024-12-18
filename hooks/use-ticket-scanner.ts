"use client";

import { useState } from 'react';
import { recognizeText } from '@/lib/ocr/tesseract-worker';
import { parseTicketText } from '@/lib/ocr/ticket-parser';
import { preprocessImage } from '@/lib/ocr/image-processor';

interface TicketScannerResult {
  isProcessing: boolean;
  error: string | null;
  processImage: (file: File) => Promise<void>;
  processWebcamImage: (imageSrc: string) => Promise<void>;
  ticketData: any | null;
}

export function useTicketScanner(): TicketScannerResult {
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [ticketData, setTicketData] = useState<any | null>(null);

  const processImage = async (file: File) => {
    try {
      setIsProcessing(true);
      setError(null);
      
      // Preprocess the image
      const processedImage = await preprocessImage(file);
      
      // Perform OCR
      const text = await recognizeText(processedImage);
      
      // Parse ticket data
      const data = parseTicketText(text);
      setTicketData(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to process ticket');
    } finally {
      setIsProcessing(false);
    }
  };

  const processWebcamImage = async (imageSrc: string) => {
    try {
      setIsProcessing(true);
      setError(null);
      
      // Perform OCR directly on webcam image
      const text = await recognizeText(imageSrc);
      
      // Parse ticket data
      const data = parseTicketText(text);
      setTicketData(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to process ticket');
    } finally {
      setIsProcessing(false);
    }
  };

  return {
    isProcessing,
    error,
    processImage,
    processWebcamImage,
    ticketData
  };
}