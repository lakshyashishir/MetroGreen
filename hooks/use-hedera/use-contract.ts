import { useState, useCallback, useEffect } from 'react';
import { ContractExecuteTransaction, ContractId, ContractFunctionParameters, ContractCallQuery } from "@hashgraph/sdk";
import { getClient } from '@/lib/hedera/client';
import { HEDERA_CONFIG } from '@/config/hedera';

const padAddress = (address: string): string => {
    const cleanAddress = address.replace('0.0.', '');
    return cleanAddress.padStart(40, '0');
};

export const useContract = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isAdmin, setIsAdmin] = useState<boolean | null>(null);

    const verifyTicket = useCallback(async (
        stationId: string,
        userAddress: string,
        carbonSaved: number
    ) => {
        setIsLoading(true);
        setError(null);
        try {
            console.log('Verifying ticket with params:', {
                stationId,
                userAddress,
                carbonSaved,
                contractId: HEDERA_CONFIG.contractId
            });

            // Convert Hedera account ID to Ethereum address format
            const ethAddress = "0x" + padAddress(userAddress);
            console.log('Converted address:', ethAddress);

            const client = getClient();
            
            const transaction = new ContractExecuteTransaction()
                .setContractId(ContractId.fromString(HEDERA_CONFIG.contractId))
                .setGas(300000)
                .setFunction(
                    "verifyTicket",
                    new ContractFunctionParameters()
                        .addString(stationId)
                        .addAddress(ethAddress) // Use converted address
                        .addUint256(carbonSaved)
                );

            console.log('Executing verifyTicket transaction...');
            const response = await transaction.execute(client);
            console.log('Getting transaction receipt...');
            return await response.getReceipt(client);
        } catch (err) {
            console.error('Contract error details:', err);
            setError(err instanceof Error ? err.message : 'Error verifying ticket');
            throw err;
        } finally {
            setIsLoading(false);
        }
    }, []);

    const addStation = useCallback(async (stationId: string) => {
        setIsLoading(true);
        setError(null);
        try {
            const client = getClient();
            console.log('Adding station with ID:', stationId);
            
            const transaction = new ContractExecuteTransaction()
                .setContractId(ContractId.fromString(HEDERA_CONFIG.contractId))
                .setGas(100000)
                .setFunction(
                    "addStation",
                    new ContractFunctionParameters()
                        .addString(stationId)
                );

            const response = await transaction.execute(client);
            const receipt = await response.getReceipt(client);
            console.log('Station addition receipt:', receipt);
            return receipt;
        } catch (err) {
            console.error('Error adding station:', err);
            throw err;
        } finally {
            setIsLoading(false);
        }
    }, []);

    const checkAdminStatus = useCallback(async () => {
        try {
            const client = getClient();
            
            const query = new ContractCallQuery()
                .setContractId(ContractId.fromString(HEDERA_CONFIG.contractId))
                .setGas(100000)
                .setFunction("delhiMetroAdmin", new ContractFunctionParameters());

            const response = await query.execute(client);
            const adminAddress = "0x" + Buffer.from(response.bytes).toString('hex').slice(-40);
            
            console.log('Contract Admin Address:', adminAddress);
            console.log('Our Operator ID:', HEDERA_CONFIG.operatorId);
            
            return true; // For testing
        } catch (err) {
            console.error('Error checking admin status:', err);
            return true; // For testing
        }
    }, []);

    useEffect(() => {
        checkAdminStatus().then(setIsAdmin);
    }, [checkAdminStatus]);

    return { 
        verifyTicket, 
        addStation, 
        isLoading, 
        error,
        isAdmin
    };
};