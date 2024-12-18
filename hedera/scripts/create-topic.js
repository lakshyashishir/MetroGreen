const {
    TopicCreateTransaction,
    Client,
    AccountId,
    PrivateKey
  } = require("@hashgraph/sdk");
  require('dotenv').config();
  
  async function createTopic() {
    try {
      const operatorId = process.env.NEXT_PUBLIC_OPERATOR_ID;
      const operatorKey = process.env.NEXT_PUBLIC_OPERATOR_KEY;
  
      if (!operatorId || !operatorKey) {
        throw new Error("Environment variables must be present");
      }
  
      const client = Client.forTestnet();
      const operatorAccountId = AccountId.fromString(operatorId);
      const operatorPrivateKey = PrivateKey.fromString(operatorKey);
      client.setOperator(operatorAccountId, operatorPrivateKey);
  
      console.log("Creating HCS Topic for MetroGreen...");
  
      const transaction = new TopicCreateTransaction()
        .setAdminKey(operatorPrivateKey)
        .setTopicMemo("MetroGreen Carbon Savings Logging")
        .freezeWith(client);
  
      const signTx = await transaction.sign(operatorPrivateKey);
      const txResponse = await signTx.execute(client);
  
      const receipt = await txResponse.getReceipt(client);
      const topicId = receipt.topicId;
  
      console.log("✅ Topic created successfully!");
      console.log("Topic ID:", topicId.toString());
      console.log("\nAdd this topic ID to your .env file as NEXT_PUBLIC_TOPIC_ID");
  
      return topicId;
    } catch (error) {
      console.error("❌ Error creating topic:", error);
      throw error;
    }
  }
  
  createTopic()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });