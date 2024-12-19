import { Client, AccountId, PrivateKey } from "@hashgraph/sdk";
import { HEDERA_CONFIG } from "@/config/hedera";

let client: Client;

export function getClient(): Client {
    if (client) return client;

    if (!HEDERA_CONFIG.operatorId || !HEDERA_CONFIG.operatorKey) {
        throw new Error("Environment variables operatorId and operatorKey are required.");
    }

    try {
        const operatorId = AccountId.fromString(HEDERA_CONFIG.operatorId);
        const operatorKey = PrivateKey.fromString(HEDERA_CONFIG.operatorKey);

        if (HEDERA_CONFIG.network === 'testnet') {
            client = Client.forTestnet().setMaxNodeAttempts(3);
            
            client.setMirrorNetwork([
                "testnet.mirrornode.hedera.com:443",
                "hcs.testnet.mirrornode.hedera.com:443"
            ]);
        } else {
            client = Client.forMainnet();
        }

        client.setOperator(operatorId, operatorKey);
        
        client.setRequestTimeout(10000); 

        return client;
    } catch (error) {
        console.error('Error initializing Hedera client:', error);
        throw new Error('Failed to initialize Hedera client');
    }
}

export const closeClient = () => {
    if (client) {
        client.close();
    }
};