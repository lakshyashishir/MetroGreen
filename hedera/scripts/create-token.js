const {
    TokenCreateTransaction,
    Client,
    TokenType,
    TokenSupplyType,
    AccountId,
    PrivateKey,
    TransactionId
  } = require("@hashgraph/sdk");
  require('dotenv').config();
  
  async function createToken() {
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
  
      console.log("Creating MetroGreen Token (MTG)...");
      console.log("Using account:", operatorId);
  
      let transaction = new TokenCreateTransaction()
        .setTokenName("MetroGreen Token")
        .setTokenSymbol("MTG")
        .setTokenType(TokenType.FungibleCommon)
        .setDecimals(0)
        .setInitialSupply(0)
        .setTreasuryAccountId(operatorAccountId)
        .setSupplyType(TokenSupplyType.Infinite)
        .setAdminKey(operatorPrivateKey.publicKey)
        .setSupplyKey(operatorPrivateKey.publicKey)
        .setTransactionId(TransactionId.generate(operatorAccountId))
        .setNodeAccountIds([new AccountId(3)]);
  
      console.log("Transaction created, freezing...");
      transaction = await transaction.freezeWith(client);
  
      console.log("Transaction frozen, signing...");
      const signedTx = await transaction.sign(operatorPrivateKey);
  
      console.log("Transaction signed, executing...");
      const txResponse = await signedTx.execute(client);
  
      console.log("Getting receipt...");
      const receipt = await txResponse.getReceipt(client);
      const tokenId = receipt.tokenId;
  
      console.log("\n✅ Token created successfully!");
      console.log("Token ID:", tokenId.toString());
      console.log("\nAdd this token ID to your .env file as NEXT_PUBLIC_TOKEN_ID");
  
      return tokenId;
    } catch (error) {
      console.error("\n❌ Error creating token:");
      console.error("Message:", error.message);
      if (error.status) {
        console.error("Status:", error.status.toString());
      }
      if (error.transactionId) {
        console.error("Transaction ID:", error.transactionId.toString());
      }
      throw error;
    } finally {
      if (client) {
        client.close();
      }
    }
  }
  
  createToken()
    .then(() => process.exit(0))
    .catch((error) => {
      process.exit(1);
    });