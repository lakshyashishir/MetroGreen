import { TokenCreateTransaction, TokenMintTransaction, TokenType, TokenSupplyType, AccountId, TokenId, TransferTransaction, TokenBalanceQuery, TokenInfoQuery } from "@hashgraph/sdk";
import { getClient } from "./client";

export class TokenService {
    private tokenId: string;

    constructor(tokenId?: string) {
        this.tokenId = tokenId || '';
    }

    async createToken() {
        const client = getClient();
        const transaction = await new TokenCreateTransaction()
            .setTokenName("MetroGreen Token")
            .setTokenSymbol("MTG")
            .setDecimals(0)
            .setInitialSupply(0)
            .setTreasuryAccountId(AccountId.fromString(process.env.NEXT_PUBLIC_OPERATOR_ID!))
            .setSupplyType(TokenSupplyType.Infinite)
            .setTokenType(TokenType.FungibleCommon)
            .freezeWith(client);

        const response = await transaction.execute(client);
        const receipt = await response.getReceipt(client);
        this.tokenId = receipt.tokenId!.toString();
        return this.tokenId;
    }

    async mintTokens(receiverAccount: string, carbonGrams: number) {
        const client = getClient();
        const tokensToMint = Math.floor(carbonGrams / 10);

        const mintTx = await new TokenMintTransaction()
            .setTokenId(TokenId.fromString(this.tokenId))
            .setAmount(tokensToMint)
            .execute(client);

        await mintTx.getReceipt(client);

        const transferTx = await new TransferTransaction()
            .addTokenTransfer(this.tokenId, AccountId.fromString(process.env.NEXT_PUBLIC_OPERATOR_ID!), -tokensToMint)
            .addTokenTransfer(this.tokenId, AccountId.fromString(receiverAccount), tokensToMint)
            .execute(client);

        await transferTx.getReceipt(client);
        return tokensToMint;
    }

    async checkBalance(accountId: string) {
        const client = getClient();
        const balance = await new TokenBalanceQuery()
            .setAccountId(AccountId.fromString(accountId))
            .setTokenId(TokenId.fromString(this.tokenId))
            .execute(client);

        return {
            accountId,
            balance: balance.tokens.toString(),
            carbonGrams: Number(balance.tokens) * 10
        };
    }

    async getTokenInfo() {
        const client = getClient();
        const info = await new TokenInfoQuery()
            .setTokenId(TokenId.fromString(this.tokenId))
            .execute(client);

        return {
            name: info.name,
            symbol: info.symbol,
            totalSupply: info.totalSupply.toString(),
            decimals: info.decimals,
            treasury: info.treasury.toString()
        };
    }
}

export const tokenService = new TokenService(process.env.NEXT_PUBLIC_TOKEN_ID);