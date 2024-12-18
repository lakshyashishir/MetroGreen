export interface MetroRide {
    userId: string;
    fromStation: string;
    toStation: string;
    carbonSaved: number;
    ticketId: string;
}

export interface TokenRedemption {
    userId: string;
    merchantId: string;
    stationId: string;
    tokensSpent: number;
    redemptionValue: number;
}

export interface Station {
    id: string;
    name: string;
    line: string;
    isActive: boolean;
    totalCarbonSaved: number;
    totalTokensMinted: number;
}

export interface Merchant {
    address: string;
    name: string;
    stationId: string;
    isActive: boolean;
    totalRedemptions: number;
}

export interface UserStats {
    carbonSaved: number;
    tokensEarned: number;
    tokensSpent: number;
    lastRide?: {
        from: string;
        to: string;
        carbonSaved: number;
        timestamp: string;
    };
}

export interface HCSMessage {
    type: 'METRO_RIDE' | 'TOKEN_REDEMPTION' | 'STATION_STATS';
    timestamp: string;
    data: MetroRide | TokenRedemption | Station;
}

export interface TokenInfo {
    name: string;
    symbol: string;
    totalSupply: string;
    decimals: number;
    treasury: string;
}