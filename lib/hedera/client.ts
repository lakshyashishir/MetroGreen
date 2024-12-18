import { Client, AccountId, PrivateKey } from "@hashgraph/sdk";
import { HEDERA_CONFIG } from "@/config/hedera";

let client: Client;

export function getHederaClient(): Client {
    if (client) return client;

    if (!HEDERA_CONFIG.operatorId || !HEDERA_CONFIG.operatorKey) {
        throw new Error("Environment variables operatorId and operatorKey are required.");
    }

    const operatorId = AccountId.fromString(HEDERA_CONFIG.operatorId);
    const operatorKey = PrivateKey.fromString(HEDERA_CONFIG.operatorKey);

    if (HEDERA_CONFIG.network === 'testnet') {
        client = Client.forTestnet();
    } else {
        client = Client.forMainnet();
    }

    client.setOperator(operatorId, operatorKey);
    return client;
}

export const getClient = () => {
    if (!client) {
        client = getHederaClient();
    }
    return client;
};