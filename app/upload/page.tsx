"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Upload } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export default function UploadPage() {
  const [isDragging, setIsDragging] = useState(false);
  const { toast } = useToast();

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDragging(true);
    } else if (e.type === "dragleave") {
      setIsDragging(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = Array.from(e.dataTransfer.files);
    if (files.length) {
      handleFiles(files);
    }
  };

  const handleFiles = (files: File[]) => {
    // Here we'll add file processing logic
    toast({
      title: "File Received",
      description: "Processing your ticket...",
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Link href="/" className="inline-flex items-center mb-6 text-green-600 hover:text-green-700">
        <ArrowLeft className="mr-2" /> Back to Home
      </Link>

      <Card className="max-w-2xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6 text-center">Upload Your Metro Ticket</h1>

        <div
          className={`border-2 border-dashed rounded-lg p-8 text-center ${
            isDragging
              ? "border-green-500 bg-green-50 dark:bg-green-900/20"
              : "border-gray-300 dark:border-gray-700"
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <p className="text-lg mb-2">Drag and drop your ticket image here</p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
            or click to select a file
          </p>
          <input
            type="file"
            className="hidden"
            onChange={(e) => {
              const files = Array.from(e.target.files || []);
              if (files.length) handleFiles(files);
            }}
            accept="image/*"
            id="file-upload"
          />
          <Button asChild>
            <label htmlFor="file-upload">Select File</label>
          </Button>
        </div>
      </Card>
    </div>
  );
}