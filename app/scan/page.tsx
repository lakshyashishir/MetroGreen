"use client";

import React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Camera, ArrowLeft } from "lucide-react";
import Link from "next/link";
import Webcam from "react-webcam";
import { useToast } from "@/hooks/use-toast";

export default function ScanPage() {
  const [isCameraActive, setIsCameraActive] = useState(false);
  const { toast } = useToast();
  const webcamRef = React.useRef<Webcam>(null);

  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      // Here we'll add OCR processing
      toast({
        title: "Ticket Captured",
        description: "Processing your ticket...",
      });
    }
  }, [webcamRef, toast]);

  return (
    <div className="container mx-auto px-4 py-8">
      <Link href="/" className="inline-flex items-center mb-6 text-green-600 hover:text-green-700">
        <ArrowLeft className="mr-2" /> Back to Home
      </Link>

      <Card className="max-w-2xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6 text-center">Scan Your Metro Ticket</h1>
        
        <div className="aspect-video relative rounded-lg overflow-hidden mb-6">
          {isCameraActive ? (
            <Webcam
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
              <Camera className="h-12 w-12 text-gray-400" />
            </div>
          )}
        </div>

        <div className="flex justify-center gap-4">
          <Button
            variant={isCameraActive ? "destructive" : "default"}
            onClick={() => setIsCameraActive(!isCameraActive)}
          >
            {isCameraActive ? "Stop Camera" : "Start Camera"}
          </Button>
          {isCameraActive && (
            <Button onClick={capture}>
              Capture Ticket
            </Button>
          )}
        </div>
      </Card>
    </div>
  );
}