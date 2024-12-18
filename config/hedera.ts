export const HEDERA_CONFIG = {
    operatorId: process.env.NEXT_PUBLIC_OPERATOR_ID || '',
    operatorKey: process.env.NEXT_PUBLIC_OPERATOR_KEY || '',
    tokenId: process.env.NEXT_PUBLIC_TOKEN_ID || '',
    topicId: process.env.NEXT_PUBLIC_TOPIC_ID || '',
    network: 'testnet',
    mirrorNode: 'https://testnet.mirrornode.hedera.com',
    contractId: process.env.NEXT_PUBLIC_CONTRACT_ID || ''
};

export const METRO_STATIONS = [
    { id: 'AIIMS', name: 'AIIMS', line: 'Yellow Line' },
    { id: 'HAUZKHAS', name: 'Hauz Khas', line: 'Yellow Line' },
    { id: 'MALVIYANAGAR', name: 'Malviya Nagar', line: 'Yellow Line' }
];