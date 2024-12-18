import { useState, useCallback } from 'react';
import { ContractExecuteTransaction, ContractId } from "@hashgraph/sdk";
import { getClient } from '@/lib/hedera/client';
import { HEDERA_CONFIG } from '@/config/hedera';

export const useContract = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const verifyTicket = useCallback(async (
        stationId: string,
        userAddress: string,
        carbonSaved: number
    ) => {
        setIsLoading(true);
        setError(null);
        try {
            const client = getClient();
            const transaction = new ContractExecuteTransaction()
                .setContractId(ContractId.fromString(HEDERA_CONFIG.contractId))
                .setGas(100000)
                .setFunction(
                    "verifyTicket",
                    [stationId, userAddress, carbonSaved]
                );

            const response = await transaction.execute(client);
            return await response.getReceipt(client);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Error verifying ticket');
            throw err;
        } finally {
            setIsLoading(false);
        }
    }, []);

    return { verifyTicket, isLoading, error };
};