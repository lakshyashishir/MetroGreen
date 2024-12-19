import { SimpleMetroTicket } from "@/components/scan/delhi-metro-scanner";

export interface QRTicketData {
  fromStation: string;
  toStation: string;
  amount: number;
  date: string;
  tripId?: string;
  referenceId?: string;
}

export class QRProcessor {
  parseTicketData(qrData: SimpleMetroTicket | string): QRTicketData {
    if (typeof qrData === 'object') {
      return {
        fromStation: qrData.fromStation,
        toStation: qrData.toStation,
        amount: qrData.amount,
        date: qrData.date,
        tripId: this.generateTicketId()
      };
    }

    try {
      const jsonData = JSON.parse(qrData);
      return {
        fromStation: jsonData.fromStation || this.handleInvalidStation(),
        toStation: jsonData.toStation || this.handleInvalidStation(),
        amount: this.validateAmount(jsonData.amount),
        date: jsonData.date || this.getCurrentDate(),
        tripId: jsonData.tripId || this.generateTicketId()
      };
    } catch {
      return this.parseRawQRFormat(qrData);
    }
  }

  private parseRawQRFormat(qrData: string): QRTicketData {
    const cleanText = qrData.toString().trim();
    
    if (cleanText.includes("to")) {
      const [fromStation, toStation] = cleanText.split("to").map(s => s.trim());
      return {
        fromStation: fromStation || this.handleInvalidStation(),
        toStation: toStation || this.handleInvalidStation(),
        amount: this.calculateFare(fromStation, toStation),
        date: this.getCurrentDate(),
        tripId: this.generateTicketId()
      };
    }

    throw new Error('Invalid ticket format');
  }

  private handleInvalidStation(): never {
    throw new Error('Invalid station data');
  }

  private validateAmount(amount: string | number): number {
    const parsedAmount = parseFloat(String(amount));
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      throw new Error('Invalid fare amount');
    }
    return parsedAmount;
  }

  private getCurrentDate(): string {
    return new Date().toISOString().split('T')[0];
  }

  private generateTicketId(): string {
    return `TICKET-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  private calculateFare(fromStation: string, toStation: string): number {
    // Implement actual fare calculation logic here
    throw new Error('Fare calculation not implemented');
  }

  calculateCarbonSaved(fromStation: string, toStation: string): number {
    const CARBON_PER_KM = 164;
    const distance = this.calculateDistance(fromStation, toStation);
    return Math.round(CARBON_PER_KM * distance);
  }

  private calculateDistance(fromStation: string, toStation: string): number {
    // Implement actual distance calculation logic here
    throw new Error('Distance calculation not implemented');
  }
}

export const qrProcessor = new QRProcessor();