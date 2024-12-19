import { 
    TokenMintTransaction, 
    TokenId, 
    TransferTransaction,
    AccountId,
    AccountBalanceQuery
} from "@hashgraph/sdk";
import { getClient } from './client';

const RETRY_ATTEMPTS = 3;
const RETRY_DELAY = 2000;

export interface TokenMintResult {
    tokensAmount: number;
    mintTransactionId?: string;
    transferTransactionId?: string;
}

export class TokenService {
    private tokenId: string;

    constructor(tokenId?: string) {
        this.tokenId = tokenId || '';
    }

    private async retry<T>(
        operation: () => Promise<T>,
        attempts: number = RETRY_ATTEMPTS
    ): Promise<T> {
        for (let i = 0; i < attempts; i++) {
            try {
                return await operation();
            } catch (error: any) {
                if (i === attempts - 1) throw error; 
                
                if (error?.toString().includes('503')) {
                    console.log(`Attempt ${i + 1} failed, retrying in ${RETRY_DELAY}ms...`);
                    await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
                    continue;
                }
                throw error;
            }
        }
        throw new Error('All retry attempts failed');
    }

    getHashScanUrl(transactionId: string): string {
        const network = process.env.NEXT_PUBLIC_NETWORK || 'testnet';
        const baseUrl = network === 'mainnet' 
            ? 'https://hashscan.io/'
            : 'https://hashscan.io/testnet/';
        return `${baseUrl}transaction/${transactionId}`;
    }

    async mintTokens(receiverAccount: string, carbonGrams: number): Promise<TokenMintResult> {
        try {
            const client = getClient();
            const tokensToMint = Math.floor(carbonGrams / 10);
            let mintTxId, transferTxId;

            console.log('Minting tokens:', {
                tokenId: this.tokenId,
                receiverAccount,
                tokensToMint
            });

            // First mint tokens to treasury with retry
            const mintTx = await this.retry(async () => {
                const tx = await new TokenMintTransaction()
                    .setTokenId(TokenId.fromString(this.tokenId))
                    .setAmount(tokensToMint)
                    .execute(client);

                await tx.getReceipt(client);
                return tx;
            });

            mintTxId = mintTx.transactionId.toString();

            // Then transfer from treasury to user
            const treasuryId = AccountId.fromString(process.env.NEXT_PUBLIC_OPERATOR_ID!);
            const receiverId = AccountId.fromString(receiverAccount);

            console.log('Transferring tokens:', {
                from: treasuryId.toString(),
                to: receiverId.toString(),
                amount: tokensToMint
            });

            // Only do the transfer if the receiver is different from treasury
            if (treasuryId.toString() !== receiverId.toString()) {
                const transferTx = await this.retry(async () => {
                    const tx = await new TransferTransaction()
                        .addTokenTransfer(this.tokenId, treasuryId, -tokensToMint)
                        .addTokenTransfer(this.tokenId, receiverId, tokensToMint)
                        .execute(client);

                    await tx.getReceipt(client);
                    return tx;
                });

                transferTxId = transferTx.transactionId.toString();
            }

            return {
                tokensAmount: tokensToMint,
                mintTransactionId: mintTxId,
                transferTransactionId: transferTxId
            };
        } catch (error) {
            console.error('Token minting error:', error);
            throw error;
        }
    }

    async checkBalance(accountId: string) {
        return this.retry(async () => {
            const client = getClient();
            
            const query = new AccountBalanceQuery()
                .setAccountId(AccountId.fromString(accountId));
            
            const balance = await query.execute(client);
            const tokenBalance = balance.tokens ? balance.tokens.get(TokenId.fromString(this.tokenId)) || 0 : 0;

            return {
                accountId,
                tokens: tokenBalance.toString(),
                carbonGrams: Number(tokenBalance) * 10
            };
        });
    }
}

export const tokenService = new TokenService(process.env.NEXT_PUBLIC_TOKEN_ID);