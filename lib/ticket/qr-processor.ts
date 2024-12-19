export interface QRTicketData {
    fromStation: string;
    toStation: string;
    amount: number;
    date: string;
    tripId?: string;
    referenceId?: string;
  }
  
  export class QRProcessor {
    parseTicketData(qrData: string): QRTicketData {
      try {
        try {
          return JSON.parse(qrData);
        } catch {
          return this.parseRawQRFormat(qrData);
        }
      } catch (error) {
        throw new Error('Failed to parse ticket data: ' + error);
      }
    }
  
    private parseRawQRFormat(qrData: string): QRTicketData {
      const lines = qrData.split('\n');
      const journey = lines.find(l => l.includes('to'))?.split('to') || [];
      const amount = lines.find(l => l.includes('Amount'))?.match(/\d+(\.\d+)?/)?.[0];
      const tripId = lines.find(l => l.includes('Trip ID'))?.split(':')?.[1]?.trim();
  
      if (!journey[0] || !journey[1]) {
        throw new Error('Invalid ticket format');
      }
  
      return {
        fromStation: journey[0].trim(),
        toStation: journey[1].trim(),
        amount: amount ? parseFloat(amount) : 0,
        date: new Date().toISOString().split('T')[0],
        tripId,
      };
    }
  
    calculateCarbonSaved(fromStation: string, toStation: string): number {
      const CARBON_SAVINGS = {
        perKm: 164, 
        averageDistance: 5, 
      };
  
      return Math.round(CARBON_SAVINGS.perKm * CARBON_SAVINGS.averageDistance);
    }
  }
  
  export const qrProcessor = new QRProcessor();