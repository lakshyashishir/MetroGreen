interface TicketData {
  date?: string;
  startStation?: string;
  endStation?: string;
  fareAmount?: number;
  carbonSaved?: number;
}

export function parseTicketText(text: string): TicketData {
  const data: TicketData = {};
  
  // Extract date (assuming format: DD/MM/YYYY or similar)
  const dateMatch = text.match(/\d{2}\/\d{2}\/\d{4}/);
  if (dateMatch) {
    data.date = dateMatch[0];
  }

  // Extract stations (assuming format: FROM: [station] TO: [station])
  const stationMatch = text.match(/FROM:\s*([^\n]+)\s*TO:\s*([^\n]+)/i);
  if (stationMatch) {
    data.startStation = stationMatch[1].trim();
    data.endStation = stationMatch[2].trim();
  }

  // Extract fare amount (assuming format: Rs. XX.XX or similar)
  const fareMatch = text.match(/Rs\.\s*(\d+(\.\d{2})?)/i);
  if (fareMatch) {
    data.fareAmount = parseFloat(fareMatch[1]);
  }

  // Calculate carbon savings (simplified example: 100g per km)
  // In a real application, this would use actual distance data
  if (data.fareAmount) {
    data.carbonSaved = Math.round(data.fareAmount * 64.6); // Example calculation
  }

  return data;
}