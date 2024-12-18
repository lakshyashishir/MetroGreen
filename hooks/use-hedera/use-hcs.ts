import { useState, useCallback } from 'react';
import { hcsService } from '@/lib/hedera/hcs-service';

export const useHCS = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const logMetroRide = useCallback(async (rideData: {
        userId: string;
        fromStation: string;
        toStation: string;
        carbonSaved: number;
        ticketId: string;
    }) => {
        setIsLoading(true);
        setError(null);
        try {
            return await hcsService.logMetroRide(rideData);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Error logging ride');
            throw err;
        } finally {
            setIsLoading(false);
        }
    }, []);

    const logRedemption = useCallback(async (redemptionData: {
        userId: string;
        merchantId: string;
        stationId: string;
        tokensSpent: number;
        redemptionValue: number;
    }) => {
        setIsLoading(true);
        setError(null);
        try {
            return await hcsService.logTokenRedemption(redemptionData);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Error logging redemption');
            throw err;
        } finally {
            setIsLoading(false);
        }
    }, []);

    return { logMetroRide, logRedemption, isLoading, error };
};