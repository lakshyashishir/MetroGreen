import { createWorker } from 'tesseract.js';

let worker: Tesseract.Worker | null = null;

export async function initializeWorker() {
  if (!worker) {
    worker = await createWorker('eng');
  }
  return worker;
}

export async function terminateWorker() {
  if (worker) {
    await worker.terminate();
    worker = null;
  }
}

export async function recognizeText(imageData: string | Uint8Array): Promise<string> {
  try {
    const currentWorker = await initializeWorker();
    const result = await currentWorker.recognize(imageData);
    return result.data.text;
  } catch (error) {
    console.error('OCR Processing Error:', error);
    throw new Error('Failed to process image');
  }
}