export const HEDERA_CONFIG = {
    operatorId: process.env.NEXT_PUBLIC_OPERATOR_ID || "",
    operatorKey: process.env.NEXT_PUBLIC_OPERATOR_KEY || "",
    tokenId: process.env.NEXT_PUBLIC_TOKEN_ID || "",
    topicId: process.env.NEXT_PUBLIC_TOPIC_ID || "",
    network: "testnet",
    mirrorNode: "https://testnet.mirrornode.hedera.com",
    contractId: process.env.NEXT_PUBLIC_CONTRACT_ID || "0.0.5287646",
};

export const convertEthAddressToHederaId = (ethAddress: string): string => {
    if (!ethAddress.startsWith('0x')) {
        return ethAddress; 
    }
    try {
        const decimal = BigInt(ethAddress);
        return `0.0.${decimal}`;
    } catch (error) {
        console.error('Error converting address:', error);
        throw new Error('Invalid contract address format');
    }
};