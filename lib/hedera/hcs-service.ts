import { TopicCreateTransaction, TopicMessageSubmitTransaction, TopicInfoQuery, AccountId, PrivateKey } from "@hashgraph/sdk";
import { getClient } from "./client";

export class HCSService {
    private topicId: string;

    constructor(topicId?: string) {
        this.topicId = topicId || '';
    }

    async createTopic() {
        const client = getClient();
        const transaction = await new TopicCreateTransaction()
            .setAdminKey(PrivateKey.fromString(process.env.NEXT_PUBLIC_OPERATOR_KEY!))
            .setTopicMemo("MetroGreen Carbon Savings")
            .execute(client);

        const receipt = await transaction.getReceipt(client);
        this.topicId = receipt.topicId!.toString();
        return this.topicId;
    }

    async submitMessage(message: any) {
        const client = getClient();
        const transaction = new TopicMessageSubmitTransaction({
            topicId: this.topicId,
            message: JSON.stringify(message),
        });

        const response = await transaction.execute(client);
        const receipt = await response.getReceipt(client);
        
        return {
            status: "success",
            timestamp: new Date(),
            sequenceNumber: receipt.topicSequenceNumber.toString()
        };
    }

    async logMetroRide(rideData: {
        userId: string;
        fromStation: string;
        toStation: string;
        carbonSaved: number;
        ticketId: string;
    }) {
        return this.submitMessage({
            type: "METRO_RIDE",
            timestamp: new Date().toISOString(),
            data: {
                ...rideData,
                tokensMinted: Math.floor(rideData.carbonSaved / 10)
            }
        });
    }

    async logTokenRedemption(redemptionData: {
        userId: string;
        merchantId: string;
        stationId: string;
        tokensSpent: number;
        redemptionValue: number;
    }) {
        return this.submitMessage({
            type: "TOKEN_REDEMPTION",
            timestamp: new Date().toISOString(),
            data: redemptionData
        });
    }
}

export const hcsService = new HCSService(process.env.NEXT_PUBLIC_TOPIC_ID);