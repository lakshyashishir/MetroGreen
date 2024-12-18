import { useState, useCallback } from 'react';
import { tokenService } from '@/lib/hedera/token-service';

export const useToken = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const mintTokens = useCallback(async (accountId: string, carbonGrams: number) => {
        setIsLoading(true);
        setError(null);
        try {
            const result = await tokenService.mintTokens(accountId, carbonGrams);
            return result;
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Error minting tokens');
            throw err;
        } finally {
            setIsLoading(false);
        }
    }, []);

    const checkBalance = useCallback(async (accountId: string) => {
        setIsLoading(true);
        setError(null);
        try {
            return await tokenService.checkBalance(accountId);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Error checking balance');
            throw err;
        } finally {
            setIsLoading(false);
        }
    }, []);

    return { mintTokens, checkBalance, isLoading, error };
};